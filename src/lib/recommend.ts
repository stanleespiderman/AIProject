import { RESULTS_MAX, RESULTS_MIN } from "./constants";
import type { EquipmentId, Exercise, MuscleGroup, VoteMap } from "./types";

/** How much each vote changes an exercise's chance of being picked. */
export const VOTE_WEIGHT = { liked: 3, neutral: 1, disliked: 0.25 } as const;
/** Exercises that only hit the muscle as a secondary are picked less often. */
const SECONDARY_MATCH_FACTOR = 0.5;
/**
 * While images are being rolled out, exercises with an approved image are shown first
 * whenever they qualify for the filters. Set to false to go back to a plain weighted draw.
 */
export const PRIORITIZE_APPROVED_IMAGES = true;

/** Gets first pick: has an approved image, and the user hasn't thumbed it down. */
export function isPrioritized(ex: Exercise, votes: VoteMap): boolean {
  return PRIORITIZE_APPROVED_IMAGES && !!ex.imageUrl && votes[ex.id] !== -1;
}

export function usesAvailableEquipment(ex: Exercise, equipment: EquipmentId[]): boolean {
  return ex.equipment.some((e) => equipment.includes(e));
}

/** Exercises filed under this muscle that the user can do with their equipment. */
export function primaryMatches(
  all: Exercise[],
  equipment: EquipmentId[],
  muscle: MuscleGroup,
): Exercise[] {
  return all.filter((ex) => ex.primaryMuscle === muscle && usesAvailableEquipment(ex, equipment));
}

/** Trains 3+ muscle groups. Used to top up "Full Body" results. */
export function isCompound(ex: Exercise): boolean {
  return ex.secondaryMuscles.length >= 2;
}

interface RecommendOptions {
  all: Exercise[];
  equipment: EquipmentId[];
  muscle: MuscleGroup;
  votes: VoteMap;
  /** Ids to avoid (e.g. the set on screen) so a shuffle feels fresh. Soft: used only if the pool allows. */
  avoid?: string[];
  random?: () => number;
}

/**
 * Picks RESULTS_MIN..RESULTS_MAX exercises matching both filters.
 * Primary-muscle matches come first; if there aren't enough, exercises that
 * train the muscle secondarily top up the list. Within each of those, exercises
 * with an approved image come first (see PRIORITIZE_APPROVED_IMAGES).
 * Votes bias the weighted draw.
 * May return fewer than RESULTS_MIN when the equipment/muscle combo is thin.
 */
export function recommend({
  all,
  equipment,
  muscle,
  votes,
  avoid = [],
  random = Math.random,
}: RecommendOptions): Exercise[] {
  const primary = primaryMatches(all, equipment, muscle);
  const secondary = all.filter(
    (ex) =>
      ex.primaryMuscle !== muscle &&
      usesAvailableEquipment(ex, equipment) &&
      (muscle === "fullBody"
        ? isCompound(ex) // nothing lists "fullBody" as secondary; big compound lifts fit instead
        : ex.secondaryMuscles.includes(muscle)),
  );

  const target = RESULTS_MIN + Math.floor(random() * (RESULTS_MAX - RESULTS_MIN + 1));

  const weight = (ex: Exercise, factor = 1) => {
    const v = votes[ex.id];
    const base = v === 1 ? VOTE_WEIGHT.liked : v === -1 ? VOTE_WEIGHT.disliked : VOTE_WEIGHT.neutral;
    return base * factor;
  };

  // Fill in tiers: fresh primary matches, then primary ones already on screen
  // (only if the pool is small), then exercises that hit the muscle secondarily.
  // Each tier is split so prioritized exercises (approved image) are drawn first.
  const onScreen = (ex: Exercise) => avoid.includes(ex.id);
  const first = (ex: Exercise) => isPrioritized(ex, votes);
  const split = (pool: Exercise[], factor: number): [Exercise[], number][] => [
    [pool.filter(first), factor],
    [pool.filter((ex) => !first(ex)), factor],
  ];
  const tiers: [Exercise[], number][] = [
    ...split(primary.filter((ex) => !onScreen(ex)), 1),
    ...split(primary.filter(onScreen), 1),
    ...split(secondary, SECONDARY_MATCH_FACTOR),
  ];

  const picked: Exercise[] = [];
  for (const [pool, factor] of tiers) {
    if (picked.length >= target) break;
    picked.push(...weightedSample(pool, target - picked.length, (ex) => weight(ex, factor), random));
  }

  return picked;
}

/** Weighted random sampling without replacement. */
export function weightedSample<T>(
  items: T[],
  count: number,
  weightOf: (item: T) => number,
  random: () => number = Math.random,
): T[] {
  const pool = items.map((item) => ({ item, w: Math.max(weightOf(item), 0) }));
  const out: T[] = [];

  while (out.length < count && pool.length > 0) {
    const total = pool.reduce((sum, p) => sum + p.w, 0);
    let roll = random() * total;
    let index = pool.length - 1;
    for (let i = 0; i < pool.length; i++) {
      roll -= pool[i].w;
      if (roll < 0) {
        index = i;
        break;
      }
    }
    out.push(pool[index].item);
    pool.splice(index, 1);
  }

  return out;
}

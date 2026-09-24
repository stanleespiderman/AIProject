import { RESULTS_MAX, RESULTS_MIN } from "./constants";
import type { EquipmentId, Exercise, MuscleGroup, VoteMap } from "./types";

/** How much each vote changes an exercise's chance of being picked. */
export const VOTE_WEIGHT = { liked: 3, neutral: 1, disliked: 0.25 } as const;
/** Exercises that only hit the muscle as a secondary are picked less often. */
const SECONDARY_MATCH_FACTOR = 0.5;

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
 * train the muscle secondarily top up the list. Votes bias the weighted draw.
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
  const onScreen = (ex: Exercise) => avoid.includes(ex.id);
  const tiers: [Exercise[], number][] = [
    [primary.filter((ex) => !onScreen(ex)), 1],
    [primary.filter(onScreen), 1],
    [secondary, SECONDARY_MATCH_FACTOR],
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

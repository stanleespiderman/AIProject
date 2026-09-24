export type EquipmentId =
  | "dumbbells"
  | "barbell"
  | "kettlebell"
  | "cables"
  | "machines"
  | "bands"
  | "bodyweight";

export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "arms"
  | "legs"
  | "glutes"
  | "core"
  | "fullBody";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Exercise {
  /** Stable, URL-safe id. Never change it once shipped: votes are stored against it. */
  id: string;
  name: string;
  /** The group this exercise is filed under in the muscle picker. */
  primaryMuscle: MuscleGroup;
  /** Other groups it trains. Used to top up results when a filter combo is thin. */
  secondaryMuscles: MuscleGroup[];
  /** Any ONE of these is enough to do the exercise (e.g. goblet squat: dumbbell or kettlebell). */
  equipment: EquipmentId[];
  difficulty: Difficulty;
  sets: number;
  /** Free text so it can hold ranges, times or per-side counts: "8-12", "30s", "10/side". */
  reps: string;
  /** 2-3 short, imperative cues. */
  formCues: string[];
  /** A YouTube *search* URL. Never a hard-coded video id. */
  videoUrl: string;
}

/** 1 = liked, -1 = disliked. Missing = neutral. */
export type Vote = 1 | -1;
export type VoteMap = Record<string, Vote>;

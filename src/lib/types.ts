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

/** Trainer sign-off state for an exercise's form content. */
export type ReviewStatus = "pending" | "approved";

export interface CommonMistake {
  mistake: string;
  fix: string;
}

export interface ExerciseImagePanel {
  /** START / END, or SET-UP / HOLD for static holds. */
  label: string;
  pose: string;
  /**
   * Alignment lines the image draws over the body (white lines with dots on the joints),
   * e.g. "one straight line from shoulder through hip to ankle". Added exercise by exercise;
   * without it, the prompt builder derives the lines from `angles`.
   */
  alignment?: string[];
  /** The joint angles that matter, e.g. "elbow ~90°". Data only: images no longer print numbers. */
  angles: string[];
}

/**
 * An angle that matters for the form, as a target with an acceptable range.
 * A good rep does not need to hit the target exactly; anything in [min, max] is fine.
 * DRAFT values: a certified trainer should confirm them (see reviewStatus).
 */
export interface AngleRange {
  /** Which image panel it belongs to: left = START / SET-UP, right = END / HOLD. */
  panel: "left" | "right";
  /** The approximate angle, matching one of the panel's `angles`, e.g. "knee ~90°". */
  label: string;
  /** Human wording for the card, e.g. "Knee at the bottom". */
  joint: string;
  target: number;
  min: number;
  max: number;
  /** The one angle per exercise that matters most. */
  key?: boolean;
  note?: string;
}

/** Everything needed to build an illustration prompt (see docs/exercise-image-design.md). */
export interface ExerciseImageSpec {
  camera: string;
  facing: string;
  equipmentToDraw: string;
  primaryMusclesToHighlight: string[];
  secondaryMusclesToHighlight: string[];
  leftPanel: ExerciseImagePanel;
  rightPanel: ExerciseImagePanel;
  angleNote: string;
  /**
   * Optional second image for form a single camera can't show (for example elbow flare in a
   * bench press needs a top view). Same layout and equipment, its own camera and panels.
   * Saved as public/exercises/<id>--<name>.webp.
   */
  extraView?: ExerciseImageExtraView;
}

export interface ExerciseImageExtraView {
  /** File suffix and view name: "top", "side", "front" or "rear". */
  name: "top" | "side" | "front" | "rear";
  camera: string;
  /** What this view shows that the main one can't, e.g. "how far the elbows flare". */
  purpose: string;
  leftPanel: ExerciseImagePanelView;
  rightPanel: ExerciseImagePanelView;
}

/** A panel of the extra view: no angle labels, alignment lines are required. */
export interface ExerciseImagePanelView {
  label: string;
  pose: string;
  alignment: string[];
}

/**
 * Form, safety and image content for one exercise.
 * Source of truth: docs/data/whatnext-exercise-form-data.json, compiled into
 * src/data/exerciseDetails.ts by `npm run build:details`.
 */
export interface ExerciseDetails {
  movementPattern: string;
  isStaticHold: boolean;
  /** Anatomical muscle names (the app-level groups live in primaryMuscle / secondaryMuscles). */
  muscles: { primary: string[]; secondary: string[] };
  equipmentDetail: string;
  setup: string[];
  execution: string[];
  breathing: string;
  /** Exactly 3 short cues. */
  formCues: string[];
  commonMistakes: CommonMistake[];
  safety: string[];
  rest: string;
  easierOption: string;
  harderOption: string;
  image: ExerciseImageSpec;
  /** Target and acceptable range for the angles that matter. Added exercise by exercise. */
  angleRanges?: AngleRange[];
  reviewStatus: ReviewStatus;
}

export interface Exercise
  extends Partial<Omit<ExerciseDetails, "formCues">> {
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
  /** 3 short, imperative cues. Comes from exerciseDetails.ts. */
  formCues: string[];
  /** A YouTube *search* URL. Never a hard-coded video id. */
  videoUrl: string;
}

/** The hand-edited part of an exercise (src/data/exercises.ts). Details are merged in on top. */
export type BaseExercise = Pick<
  Exercise,
  | "id"
  | "name"
  | "primaryMuscle"
  | "secondaryMuscles"
  | "equipment"
  | "difficulty"
  | "sets"
  | "reps"
  | "videoUrl"
>;

/** 1 = liked, -1 = disliked. Missing = neutral. */
export type Vote = 1 | -1;
export type VoteMap = Record<string, Vote>;

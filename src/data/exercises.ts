import type { BaseExercise, Exercise } from "@/lib/types";
import { youtubeSearchUrl } from "@/lib/youtube";
import { EXERCISE_DETAILS } from "./exerciseDetails";

/**
 * The exercise library. This file holds only the basics you edit by hand:
 * name, muscle groups, equipment, difficulty, sets and reps.
 *
 * Form cues, how-to steps, safety notes and image specs live in
 * src/data/exerciseDetails.ts (generated from docs/data/whatnext-exercise-form-data.json)
 * and are merged in below by id. See README > "Adding exercises".
 *
 * `id` and `videoUrl` are derived from `name` unless you pass them explicitly.
 */
type ExerciseInput = Omit<BaseExercise, "id" | "videoUrl"> &
  Partial<Pick<BaseExercise, "id" | "videoUrl">>;

function ex(input: ExerciseInput): BaseExercise {
  return {
    ...input,
    id: input.id ?? slugify(input.name),
    videoUrl: input.videoUrl ?? youtubeSearchUrl(input.name),
  };
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const BASE_EXERCISES: BaseExercise[] = [
  // ───────────────────────── CHEST ─────────────────────────
  ex({
    name: "Dumbbell Bench Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "8–12",
  }),
  ex({
    name: "Incline Dumbbell Press",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders", "arms"],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "8–10",
  }),
  ex({
    name: "Dumbbell Fly",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders"],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Dumbbell Floor Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Barbell Bench Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 4, reps: "5–8",
  }),
  ex({
    name: "Incline Barbell Bench Press",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders", "arms"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "6–10",
  }),
  ex({
    name: "Kettlebell Floor Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["kettlebell"], difficulty: "beginner", sets: 3, reps: "8–10/side",
  }),
  ex({
    name: "Squeeze Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms"],
    equipment: ["kettlebell", "dumbbells"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Cable Crossover",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders"],
    equipment: ["cables"], difficulty: "intermediate", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Low-to-High Cable Fly",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders"],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Standing Cable Chest Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "core"],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Machine Chest Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Pec Deck",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Band Chest Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Band Chest Fly",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15",
  }),
  ex({
    name: "Push-Up",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "shoulders", "core"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "10–15",
  }),
  ex({
    name: "Incline Push-Up",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Decline Push-Up",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders", "arms"],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "8–12",
  }),
  ex({
    name: "Chest Dip",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["bodyweight"], difficulty: "advanced", sets: 3, reps: "6–10",
  }),

  ex({
    name: "Barbell Floor Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "6–8",
  }),
  ex({
    name: "Kettlebell Push-Up",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "core"],
    equipment: ["kettlebell"], difficulty: "intermediate", sets: 3, reps: "8–12",
  }),
  ex({
    name: "Smith Machine Bench Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["machines"], difficulty: "intermediate", sets: 3, reps: "8–10",
  }),
  ex({
    name: "Incline Machine Press",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders", "arms"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Banded Push-Up",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "core"],
    equipment: ["bands"], difficulty: "intermediate", sets: 3, reps: "8–12",
  }),

  // ───────────────────────── BACK ─────────────────────────
  ex({
    name: "One-Arm Dumbbell Row",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10–12/side",
  }),
  ex({
    name: "Chest-Supported Dumbbell Row",
    primaryMuscle: "back", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Dumbbell Pullover",
    primaryMuscle: "back", secondaryMuscles: ["chest", "core"],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Barbell Bent-Over Row",
    primaryMuscle: "back", secondaryMuscles: ["arms", "glutes"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 4, reps: "6–10",
  }),
  ex({
    name: "Pendlay Row",
    primaryMuscle: "back", secondaryMuscles: ["arms", "legs"],
    equipment: ["barbell"], difficulty: "advanced", sets: 4, reps: "5–6",
  }),
  ex({
    name: "Single-Arm Kettlebell Row",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["kettlebell"], difficulty: "beginner", sets: 3, reps: "10/side",
  }),
  ex({
    name: "Kettlebell Gorilla Row",
    primaryMuscle: "back", secondaryMuscles: ["arms", "core"],
    equipment: ["kettlebell"], difficulty: "intermediate", sets: 3, reps: "8/side",
  }),
  ex({
    name: "Seated Cable Row",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Straight-Arm Cable Pulldown",
    primaryMuscle: "back", secondaryMuscles: ["core"],
    equipment: ["cables"], difficulty: "intermediate", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Lat Pulldown",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["machines", "cables"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Machine Seated Row",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Assisted Pull-Up",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "8–10",
  }),
  ex({
    name: "Band Pull-Apart",
    primaryMuscle: "back", secondaryMuscles: ["shoulders"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15–20",
  }),
  ex({
    name: "Band Seated Row",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Band Lat Pulldown",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Pull-Up",
    primaryMuscle: "back", secondaryMuscles: ["arms", "core"],
    equipment: ["bodyweight"], difficulty: "advanced", sets: 3, reps: "5–8",
  }),
  ex({
    name: "Chin-Up",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "5–8",
  }),
  ex({
    name: "Inverted Row",
    primaryMuscle: "back", secondaryMuscles: ["arms", "core"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "8–12",
  }),
  ex({
    name: "Superman",
    primaryMuscle: "back", secondaryMuscles: ["glutes"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "12",
  }),

  ex({
    name: "T-Bar Row",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "8–10",
  }),

  // ───────────────────────── SHOULDERS ─────────────────────────
  ex({
    name: "Dumbbell Shoulder Press",
    primaryMuscle: "shoulders", secondaryMuscles: ["arms"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "8–12",
  }),
  ex({
    name: "Dumbbell Lateral Raise",
    primaryMuscle: "shoulders", secondaryMuscles: [],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Dumbbell Rear Delt Fly",
    primaryMuscle: "shoulders", secondaryMuscles: ["back"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Arnold Press",
    primaryMuscle: "shoulders", secondaryMuscles: ["arms"],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "8–10",
  }),
  ex({
    name: "Barbell Overhead Press",
    primaryMuscle: "shoulders", secondaryMuscles: ["arms", "core"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 4, reps: "5–8",
  }),
  ex({
    name: "Landmine Press",
    primaryMuscle: "shoulders", secondaryMuscles: ["chest", "core"],
    equipment: ["barbell"], difficulty: "beginner", sets: 3, reps: "8–10/side",
  }),
  ex({
    name: "Kettlebell Overhead Press",
    primaryMuscle: "shoulders", secondaryMuscles: ["arms", "core"],
    equipment: ["kettlebell"], difficulty: "intermediate", sets: 3, reps: "6–8/side",
  }),
  ex({
    name: "Kettlebell Halo",
    primaryMuscle: "shoulders", secondaryMuscles: ["core"],
    equipment: ["kettlebell"], difficulty: "beginner", sets: 3, reps: "6 each way",
  }),
  ex({
    name: "Kettlebell Bottoms-Up Press",
    primaryMuscle: "shoulders", secondaryMuscles: ["arms", "core"],
    equipment: ["kettlebell"], difficulty: "advanced", sets: 3, reps: "5/side",
  }),
  ex({
    name: "Cable Lateral Raise",
    primaryMuscle: "shoulders", secondaryMuscles: [],
    equipment: ["cables"], difficulty: "intermediate", sets: 3, reps: "12–15/side",
  }),
  ex({
    name: "Face Pull",
    primaryMuscle: "shoulders", secondaryMuscles: ["back"],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Cable Front Raise",
    primaryMuscle: "shoulders", secondaryMuscles: ["chest"],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12",
  }),
  ex({
    name: "Machine Shoulder Press",
    primaryMuscle: "shoulders", secondaryMuscles: ["arms"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Reverse Pec Deck",
    primaryMuscle: "shoulders", secondaryMuscles: ["back"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Machine Lateral Raise",
    primaryMuscle: "shoulders", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Band Overhead Press",
    primaryMuscle: "shoulders", secondaryMuscles: ["arms"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Band Lateral Raise",
    primaryMuscle: "shoulders", secondaryMuscles: [],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15",
  }),
  ex({
    name: "Band Face Pull",
    primaryMuscle: "shoulders", secondaryMuscles: ["back"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15",
  }),
  ex({
    name: "Pike Push-Up",
    primaryMuscle: "shoulders", secondaryMuscles: ["arms"],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "6–10",
  }),
  ex({
    name: "Plank to Downward Dog",
    primaryMuscle: "shoulders", secondaryMuscles: ["core"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "10",
  }),

  ex({
    name: "Prone Y-T-W Raise",
    primaryMuscle: "shoulders", secondaryMuscles: ["back"],
    equipment: ["bodyweight", "dumbbells"], difficulty: "beginner", sets: 3, reps: "5 of each letter",
  }),

  // ───────────────────────── ARMS ─────────────────────────
  ex({
    name: "Dumbbell Biceps Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Hammer Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Incline Dumbbell Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "10",
  }),
  ex({
    name: "Dumbbell Overhead Triceps Extension",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Dumbbell Skull Crusher",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Barbell Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["barbell"], difficulty: "beginner", sets: 3, reps: "8–12",
  }),
  ex({
    name: "Close-Grip Bench Press",
    primaryMuscle: "arms", secondaryMuscles: ["chest", "shoulders"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "6–10",
  }),
  ex({
    name: "Barbell Skull Crusher",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "8–10",
  }),
  ex({
    name: "Kettlebell Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["kettlebell"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Kettlebell Overhead Triceps Extension",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["kettlebell"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Cable Triceps Pushdown",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Cable Biceps Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12",
  }),
  ex({
    name: "Overhead Cable Triceps Extension",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["cables"], difficulty: "intermediate", sets: 3, reps: "12",
  }),
  ex({
    name: "Machine Preacher Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Machine Triceps Dip",
    primaryMuscle: "arms", secondaryMuscles: ["chest"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Band Biceps Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15",
  }),
  ex({
    name: "Band Triceps Pushdown",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15",
  }),
  ex({
    name: "Bench Dip",
    primaryMuscle: "arms", secondaryMuscles: ["chest", "shoulders"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Diamond Push-Up",
    primaryMuscle: "arms", secondaryMuscles: ["chest"],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "8–12",
  }),

  ex({
    name: "Kettlebell Hammer Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["kettlebell"], difficulty: "beginner", sets: 3, reps: "10/side",
  }),
  ex({
    name: "Machine Triceps Extension",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "12",
  }),

  // ───────────────────────── LEGS ─────────────────────────
  ex({
    name: "Goblet Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes", "core"],
    equipment: ["dumbbells", "kettlebell"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Dumbbell Walking Lunge",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10/side",
  }),
  ex({
    name: "Dumbbell Bulgarian Split Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "8/side",
  }),
  ex({
    name: "Dumbbell Step-Up",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10/side",
  }),
  ex({
    name: "Barbell Back Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes", "core"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 4, reps: "5–8",
  }),
  ex({
    name: "Barbell Front Squat",
    primaryMuscle: "legs", secondaryMuscles: ["core", "glutes"],
    equipment: ["barbell"], difficulty: "advanced", sets: 4, reps: "5–6",
  }),
  ex({
    name: "Barbell Reverse Lunge",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "8/side",
  }),
  ex({
    name: "Double Kettlebell Front Squat",
    primaryMuscle: "legs", secondaryMuscles: ["core", "glutes"],
    equipment: ["kettlebell"], difficulty: "intermediate", sets: 3, reps: "8",
  }),
  ex({
    name: "Kettlebell Reverse Lunge",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["kettlebell"], difficulty: "beginner", sets: 3, reps: "8/side",
  }),
  ex({
    name: "Cable Goblet Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12",
  }),
  ex({
    name: "Leg Press",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Leg Extension",
    primaryMuscle: "legs", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Lying Leg Curl",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Hack Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["machines"], difficulty: "intermediate", sets: 3, reps: "8–10",
  }),
  ex({
    name: "Machine Calf Raise",
    primaryMuscle: "legs", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Band Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15",
  }),
  ex({
    name: "Band Good Morning",
    primaryMuscle: "legs", secondaryMuscles: ["glutes", "back"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Bodyweight Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "15–20",
  }),
  ex({
    name: "Reverse Lunge",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "10/side",
  }),
  ex({
    name: "Jump Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "8–10",
  }),
  ex({
    name: "Wall Sit",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "30–45s",
  }),
  ex({
    name: "Box Pistol Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes", "core"],
    equipment: ["bodyweight"], difficulty: "advanced", sets: 3, reps: "5/side",
  }),
  ex({
    name: "Standing Calf Raise",
    primaryMuscle: "legs", secondaryMuscles: [],
    equipment: ["bodyweight", "dumbbells"], difficulty: "beginner", sets: 3, reps: "15–20",
  }),

  ex({
    name: "Cable Split Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "10/side",
  }),
  ex({
    name: "Standing Cable Leg Curl",
    primaryMuscle: "legs", secondaryMuscles: [],
    equipment: ["cables"], difficulty: "intermediate", sets: 3, reps: "12/side",
  }),

  // ───────────────────────── GLUTES ─────────────────────────
  ex({
    name: "Dumbbell Romanian Deadlift",
    primaryMuscle: "glutes", secondaryMuscles: ["legs", "back"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Dumbbell Hip Thrust",
    primaryMuscle: "glutes", secondaryMuscles: ["legs"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "12",
  }),
  ex({
    name: "Barbell Hip Thrust",
    primaryMuscle: "glutes", secondaryMuscles: ["legs"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 4, reps: "8–10",
  }),
  ex({
    name: "Barbell Romanian Deadlift",
    primaryMuscle: "glutes", secondaryMuscles: ["legs", "back"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "8–10",
  }),
  ex({
    name: "Barbell Glute Bridge",
    primaryMuscle: "glutes", secondaryMuscles: ["legs"],
    equipment: ["barbell"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Kettlebell Swing",
    primaryMuscle: "glutes", secondaryMuscles: ["legs", "core", "back"],
    equipment: ["kettlebell"], difficulty: "intermediate", sets: 4, reps: "15",
  }),
  ex({
    name: "Kettlebell Sumo Deadlift",
    primaryMuscle: "glutes", secondaryMuscles: ["legs", "back"],
    equipment: ["kettlebell"], difficulty: "beginner", sets: 3, reps: "12",
  }),
  ex({
    name: "Single-Leg Romanian Deadlift",
    primaryMuscle: "glutes", secondaryMuscles: ["legs", "core"],
    equipment: ["kettlebell", "dumbbells"], difficulty: "intermediate", sets: 3, reps: "8/side",
  }),
  ex({
    name: "Cable Pull-Through",
    primaryMuscle: "glutes", secondaryMuscles: ["legs"],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Cable Glute Kickback",
    primaryMuscle: "glutes", secondaryMuscles: [],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12/side",
  }),
  ex({
    name: "Cable Hip Abduction",
    primaryMuscle: "glutes", secondaryMuscles: [],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12/side",
  }),
  ex({
    name: "Hip Abduction Machine",
    primaryMuscle: "glutes", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "15",
  }),
  ex({
    name: "45-Degree Back Extension",
    primaryMuscle: "glutes", secondaryMuscles: ["back", "legs"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Band Glute Bridge",
    primaryMuscle: "glutes", secondaryMuscles: ["legs"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15",
  }),
  ex({
    name: "Band Lateral Walk",
    primaryMuscle: "glutes", secondaryMuscles: ["legs"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "12 steps/side",
  }),
  ex({
    name: "Band Clamshell",
    primaryMuscle: "glutes", secondaryMuscles: [],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15/side",
  }),
  ex({
    name: "Glute Bridge",
    primaryMuscle: "glutes", secondaryMuscles: ["legs", "core"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "15",
  }),
  ex({
    name: "Single-Leg Glute Bridge",
    primaryMuscle: "glutes", secondaryMuscles: ["legs", "core"],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "10/side",
  }),
  ex({
    name: "Donkey Kick",
    primaryMuscle: "glutes", secondaryMuscles: ["core"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "15/side",
  }),

  // ───────────────────────── CORE ─────────────────────────
  ex({
    name: "Plank",
    primaryMuscle: "core", secondaryMuscles: ["shoulders"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "30–45s",
  }),
  ex({
    name: "Side Plank",
    primaryMuscle: "core", secondaryMuscles: ["glutes", "shoulders"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "20–30s/side",
  }),
  ex({
    name: "Dead Bug",
    primaryMuscle: "core", secondaryMuscles: [],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "8/side",
  }),
  ex({
    name: "Hollow Body Hold",
    primaryMuscle: "core", secondaryMuscles: [],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "20–30s",
  }),
  ex({
    name: "Hanging Knee Raise",
    primaryMuscle: "core", secondaryMuscles: ["arms"],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Mountain Climber",
    primaryMuscle: "core", secondaryMuscles: ["shoulders", "legs"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "30s",
  }),
  ex({
    name: "Weighted Russian Twist",
    primaryMuscle: "core", secondaryMuscles: [],
    equipment: ["dumbbells", "kettlebell"], difficulty: "intermediate", sets: 3, reps: "10/side",
  }),
  ex({
    name: "Suitcase Carry",
    primaryMuscle: "core", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["dumbbells", "kettlebell"], difficulty: "beginner", sets: 3, reps: "30 m/side",
  }),
  ex({
    name: "Barbell Rollout",
    primaryMuscle: "core", secondaryMuscles: ["shoulders", "back"],
    equipment: ["barbell"], difficulty: "advanced", sets: 3, reps: "6–8",
  }),
  ex({
    name: "Landmine Rotation",
    primaryMuscle: "core", secondaryMuscles: ["shoulders"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "8/side",
  }),
  ex({
    name: "Kettlebell Windmill",
    primaryMuscle: "core", secondaryMuscles: ["shoulders", "glutes"],
    equipment: ["kettlebell"], difficulty: "advanced", sets: 3, reps: "5/side",
  }),
  ex({
    name: "Cable Woodchop",
    primaryMuscle: "core", secondaryMuscles: ["shoulders"],
    equipment: ["cables"], difficulty: "intermediate", sets: 3, reps: "10/side",
  }),
  ex({
    name: "Pallof Press",
    primaryMuscle: "core", secondaryMuscles: ["shoulders"],
    equipment: ["cables", "bands"], difficulty: "beginner", sets: 3, reps: "10/side",
  }),
  ex({
    name: "Kneeling Cable Crunch",
    primaryMuscle: "core", secondaryMuscles: [],
    equipment: ["cables"], difficulty: "intermediate", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Ab Crunch Machine",
    primaryMuscle: "core", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Captain's Chair Leg Raise",
    primaryMuscle: "core", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "intermediate", sets: 3, reps: "10–12",
  }),
  ex({
    name: "Band Woodchop",
    primaryMuscle: "core", secondaryMuscles: ["shoulders"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "12/side",
  }),

  ex({
    name: "Weighted Woodchop",
    primaryMuscle: "core", secondaryMuscles: ["shoulders"],
    equipment: ["dumbbells", "kettlebell"], difficulty: "beginner", sets: 3, reps: "10/side",
  }),
  ex({
    name: "Rotary Torso Machine",
    primaryMuscle: "core", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10/side",
  }),
  ex({
    name: "Banded Dead Bug",
    primaryMuscle: "core", secondaryMuscles: ["shoulders"],
    equipment: ["bands"], difficulty: "intermediate", sets: 3, reps: "8/side",
  }),
  ex({
    name: "Band Kneeling Crunch",
    primaryMuscle: "core", secondaryMuscles: [],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15",
  }),

  // ───────────────────────── FULL BODY ─────────────────────────
  ex({
    name: "Dumbbell Thruster",
    primaryMuscle: "fullBody", secondaryMuscles: ["legs", "shoulders"],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "10",
  }),
  ex({
    name: "Dumbbell Renegade Row",
    primaryMuscle: "fullBody", secondaryMuscles: ["back", "core"],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "8/side",
  }),
  ex({
    name: "Dumbbell Clean and Press",
    primaryMuscle: "fullBody", secondaryMuscles: ["shoulders", "legs", "glutes"],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "8",
  }),
  ex({
    name: "Barbell Deadlift",
    primaryMuscle: "fullBody", secondaryMuscles: ["back", "glutes", "legs"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 4, reps: "5",
  }),
  ex({
    name: "Barbell Thruster",
    primaryMuscle: "fullBody", secondaryMuscles: ["legs", "shoulders"],
    equipment: ["barbell"], difficulty: "advanced", sets: 3, reps: "6–8",
  }),
  ex({
    name: "Landmine Squat to Press",
    primaryMuscle: "fullBody", secondaryMuscles: ["legs", "shoulders", "core"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "8/side",
  }),
  ex({
    name: "Kettlebell Clean and Press",
    primaryMuscle: "fullBody", secondaryMuscles: ["shoulders", "glutes"],
    equipment: ["kettlebell"], difficulty: "intermediate", sets: 3, reps: "6/side",
  }),
  ex({
    name: "Turkish Get-Up",
    primaryMuscle: "fullBody", secondaryMuscles: ["core", "shoulders"],
    equipment: ["kettlebell", "dumbbells"], difficulty: "advanced", sets: 3, reps: "2/side",
  }),
  ex({
    name: "Farmer's Carry",
    primaryMuscle: "fullBody", secondaryMuscles: ["core", "arms", "back"],
    equipment: ["dumbbells", "kettlebell"], difficulty: "beginner", sets: 3, reps: "30–40 m",
  }),
  ex({
    name: "Cable Squat to Row",
    primaryMuscle: "fullBody", secondaryMuscles: ["legs", "back"],
    equipment: ["cables"], difficulty: "intermediate", sets: 3, reps: "12",
  }),
  ex({
    name: "Rowing Machine Sprint",
    primaryMuscle: "fullBody", secondaryMuscles: ["back", "legs"],
    equipment: ["machines"], difficulty: "beginner", sets: 5, reps: "250 m",
  }),
  ex({
    name: "Air Bike Sprint",
    primaryMuscle: "fullBody", secondaryMuscles: ["legs"],
    equipment: ["machines"], difficulty: "beginner", sets: 6, reps: "20s on / 40s off",
  }),
  ex({
    name: "Band Thruster",
    primaryMuscle: "fullBody", secondaryMuscles: ["legs", "shoulders"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "12–15",
  }),
  ex({
    name: "Burpee",
    primaryMuscle: "fullBody", secondaryMuscles: ["chest", "legs", "core"],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "8–10",
  }),
  ex({
    name: "Bear Crawl",
    primaryMuscle: "fullBody", secondaryMuscles: ["core", "shoulders"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "20 m",
  }),
  ex({
    name: "Inchworm",
    primaryMuscle: "fullBody", secondaryMuscles: ["core", "shoulders", "legs"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "8",
  }),
  ex({
    name: "Squat Thrust",
    primaryMuscle: "fullBody", secondaryMuscles: ["legs", "core"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "10–12",
  }),
];

/**
 * The full exercise list used by the app: the hand-edited basics plus the merged details.
 * An exercise with no details entry still works (it just has no cues); `npm run check:data`
 * fails the build if that happens, so it is caught before shipping.
 */
export const EXERCISES: Exercise[] = BASE_EXERCISES.map((base) => {
  const details = EXERCISE_DETAILS[base.id];
  return details ? { ...base, ...details } : { ...base, formCues: [] };
});

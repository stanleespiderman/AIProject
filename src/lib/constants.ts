import type { Difficulty, EquipmentId, MuscleGroup } from "./types";

export const EQUIPMENT: { id: EquipmentId; label: string }[] = [
  { id: "dumbbells", label: "Dumbbells" },
  { id: "barbell", label: "Barbell" },
  { id: "kettlebell", label: "Kettlebell" },
  { id: "cables", label: "Cables" },
  { id: "machines", label: "Machines" },
  { id: "bands", label: "Resistance Bands" },
  { id: "bodyweight", label: "Bodyweight" },
];

export const MUSCLES: { id: MuscleGroup; label: string }[] = [
  { id: "chest", label: "Chest" },
  { id: "back", label: "Back" },
  { id: "shoulders", label: "Shoulders" },
  { id: "arms", label: "Arms" },
  { id: "legs", label: "Legs" },
  { id: "glutes", label: "Glutes" },
  { id: "core", label: "Core" },
  { id: "fullBody", label: "Full Body" },
];

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const MUSCLE_LABEL = Object.fromEntries(
  MUSCLES.map((m) => [m.id, m.label]),
) as Record<MuscleGroup, string>;

export const EQUIPMENT_IDS = EQUIPMENT.map((e) => e.id);
export const MUSCLE_IDS = MUSCLES.map((m) => m.id);

/** How many cards a results screen shows (inclusive range). */
export const RESULTS_MIN = 5;
export const RESULTS_MAX = 8;

export const DISCLAIMER =
  "Not medical advice. Use a weight you can control and consult a trainer if unsure.";

/** Every localStorage key the app uses, in one place. */
export const STORAGE_KEYS = {
  equipment: "whatnext:equipment",
  votes: "whatnext:votes",
  disclaimer: "whatnext:disclaimer-ack",
  shuffles: "whatnext:shuffles",
  pro: "whatnext:pro",
} as const;

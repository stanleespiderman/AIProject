import { EQUIPMENT_IDS, MUSCLE_IDS } from "./constants";
import type { EquipmentId, MuscleGroup } from "./types";

/**
 * Selections travel between screens in the URL (?eq=dumbbells,bands&m=chest)
 * so results are shareable, refresh-safe and work with the back button.
 */

export function parseEquipment(value: string | null): EquipmentId[] {
  if (!value) return [];
  return value
    .split(",")
    .filter((v): v is EquipmentId => (EQUIPMENT_IDS as string[]).includes(v));
}

export function parseMuscle(value: string | null): MuscleGroup | null {
  return value && (MUSCLE_IDS as string[]).includes(value) ? (value as MuscleGroup) : null;
}

export function muscleHref(equipment: EquipmentId[]): string {
  return `/muscle?eq=${equipment.join(",")}`;
}

export function resultsHref(equipment: EquipmentId[], muscle: MuscleGroup): string {
  return `/results?eq=${equipment.join(",")}&m=${muscle}`;
}

import type { MuscleGroup } from "../types";

/**
 * The on-device workout database. Stored as one JSON document under
 * STORAGE_KEYS.db. Bump DB_VERSION and add a step to `migrate()` in
 * ./index.ts whenever the shape changes.
 *
 * The server version of this schema (Postgres) is in
 * docs/plans/sessions-paywall-and-exercise-log.md.
 */
export const DB_VERSION = 1;

export interface Database {
  version: number;
  /** Oldest first. The live session, if any, is the last one with `endedAt: null`. */
  sessions: WorkoutSession[];
}

export interface WorkoutSession {
  id: string;
  /** 1-based count of sessions this user has started. Sessions 1–FREE_SESSIONS are free. */
  number: number;
  startedAt: string; // ISO
  endedAt: string | null; // null while the session is live
  endReason?: "user" | "timeout";
  exercises: ExerciseLog[];
}

/** One exercise started in a session. A snapshot, so history survives library edits. */
export interface ExerciseLog {
  id: string;
  exerciseId: string;
  name: string;
  primaryMuscle: MuscleGroup;
  sets: number;
  reps: string;
  startedAt: string; // ISO
  completedAt: string | null; // null if started but not marked done
}

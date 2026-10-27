"use client";

import {
  findActiveSession,
  newId,
  readDb,
  SESSION_MAX_MS,
  updateDb,
  type ExerciseLog,
  type WorkoutSession,
} from "./db";
import { deleteRemoteSession, pushSession } from "./db/remote";
import { canStartSession } from "./payments/usage";
import type { Exercise } from "./types";

export { SESSION_MAX_HOURS } from "./db";

/** A session ended sooner than this with nothing logged doesn't count towards the free ones. */
export const MIN_COUNTED_SESSION_MS = 60 * 1000;

/** Ends a live session that has run past SESSION_MAX_HOURS. Safe to call any time. */
export function closeStaleSession(): void {
  const active = findActiveSession(readDb());
  if (!active) return;
  const started = Date.parse(active.startedAt);
  if (Date.now() - started < SESSION_MAX_MS) return;
  endSession("timeout", new Date(started + SESSION_MAX_MS).toISOString());
}

export type StartSessionResult = { status: "started" | "resumed" } | { status: "paywall" };

/**
 * Starts a workout session, or resumes the live one.
 * Returns `paywall` when the free sessions are used up (send the user to /unlock).
 */
export function startSession(): StartSessionResult {
  closeStaleSession();
  if (findActiveSession(readDb())) return { status: "resumed" };
  if (!canStartSession()) return { status: "paywall" };
  const id = newId();
  updateDb((db) => ({
    ...db,
    sessions: [
      ...db.sessions,
      {
        id,
        number: db.sessions.length + 1,
        startedAt: new Date().toISOString(),
        endedAt: null,
        exercises: [],
      },
    ],
  }));
  void pushSession(id);
  return { status: "started" };
}

/**
 * Ends the live session. One ended within MIN_COUNTED_SESSION_MS with no
 * exercises logged is removed instead, so it doesn't use up a free session.
 */
export function endSession(reason: "user" | "timeout" = "user", at = new Date().toISOString()): void {
  const active = findActiveSession(readDb());
  if (!active) return;
  const tooShort = Date.parse(at) - Date.parse(active.startedAt) < MIN_COUNTED_SESSION_MS;
  if (active.exercises.length === 0 && tooShort) {
    updateDb((db) => ({ ...db, sessions: db.sessions.filter((s) => s.id !== active.id) }));
    void deleteRemoteSession(active.id);
    return;
  }
  updateActive((s) => ({ ...s, endedAt: at, endReason: reason }));
}

/** Logs that an exercise was started in the live session. No-op without one. */
export function startExercise(exercise: Exercise): void {
  const log: ExerciseLog = {
    id: newId(),
    exerciseId: exercise.id,
    name: exercise.name,
    primaryMuscle: exercise.primaryMuscle,
    sets: exercise.sets,
    reps: exercise.reps,
    startedAt: new Date().toISOString(),
    completedAt: null,
  };
  updateActive((s) => ({ ...s, exercises: [...s.exercises, log] }));
}

/** Marks a logged exercise as done. */
export function finishExercise(logId: string): void {
  const now = new Date().toISOString();
  updateActive((s) => ({
    ...s,
    exercises: s.exercises.map((e) => (e.id === logId ? { ...e, completedAt: now } : e)),
  }));
}

function updateActive(fn: (session: WorkoutSession) => WorkoutSession): void {
  const active = findActiveSession(readDb());
  if (!active) return;
  updateDb((db) => ({ ...db, sessions: db.sessions.map((s) => (s.id === active.id ? fn(s) : s)) }));
  void pushSession(active.id);
}

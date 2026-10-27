"use client";

import { findActiveSession, newId, readDb, updateDb, type ExerciseLog, type WorkoutSession } from "./db";
import { canStartSession } from "./payments/usage";
import type { Exercise } from "./types";

/** A session left open longer than this is closed automatically. */
export const SESSION_MAX_HOURS = 3;
const SESSION_MAX_MS = SESSION_MAX_HOURS * 60 * 60 * 1000;

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
  updateDb((db) => ({
    ...db,
    sessions: [
      ...db.sessions,
      {
        id: newId(),
        number: db.sessions.length + 1,
        startedAt: new Date().toISOString(),
        endedAt: null,
        exercises: [],
      },
    ],
  }));
  return { status: "started" };
}

export function endSession(reason: "user" | "timeout" = "user", at = new Date().toISOString()): void {
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
  updateDb((db) => {
    const active = findActiveSession(db);
    if (!active) return db;
    return { ...db, sessions: db.sessions.map((s) => (s === active ? fn(s) : s)) };
  });
}

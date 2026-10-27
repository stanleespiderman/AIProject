"use client";

import {
  findActiveSession,
  newId,
  readDb,
  SESSION_MAX_MS,
  updateDb,
  useDb,
  type ExerciseLog,
  type WorkoutSession,
} from "./db";
import { getAccount, useAccount } from "./account";
import { STORAGE_KEYS } from "./constants";
import { deleteRemoteSession, pushSession } from "./db/remote";
import { canStartSession } from "./payments/usage";
import { readJSON, useStoredState, writeJSON } from "./storage";
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

/**
 * The first session on a device works without an account; every session
 * after that needs sign-in (only when accounts are switched on).
 */
function signInRequired(account: ReturnType<typeof getAccount>, firstSessionUsed: boolean): boolean {
  return account.status !== "unconfigured" && account.status !== "signedIn" && firstSessionUsed;
}

// Sessions already on the device (e.g. from before this rule) also count as the first use.
export function signInRequiredToStart(): boolean {
  const used = readJSON<boolean>(STORAGE_KEYS.firstSessionUsed, false) || readDb().sessions.length > 0;
  return signInRequired(getAccount(), used);
}

export function useSignInRequiredToStart(): boolean {
  const [flag] = useStoredState<boolean>(STORAGE_KEYS.firstSessionUsed, false);
  const hasSessions = useDb().sessions.length > 0;
  return signInRequired(useAccount(), flag || hasSessions);
}

export type StartSessionResult = { status: "started" | "resumed" | "paywall" | "signin" };

/**
 * Starts a workout session, or resumes the live one.
 * Returns `signin` when this device has had its anonymous session (send the
 * user to /login), and `paywall` when the free sessions are used up (/unlock).
 */
export function startSession(): StartSessionResult {
  closeStaleSession();
  if (findActiveSession(readDb())) return { status: "resumed" };
  if (signInRequiredToStart()) return { status: "signin" };
  if (!canStartSession()) return { status: "paywall" };
  writeJSON(STORAGE_KEYS.firstSessionUsed, true);
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
    const db = updateDb((db) => ({ ...db, sessions: db.sessions.filter((s) => s.id !== active.id) }));
    void deleteRemoteSession(active.id);
    // A first session that didn't count doesn't use up the free try without an account either.
    if (db.sessions.length === 0) writeJSON(STORAGE_KEYS.firstSessionUsed, false);
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

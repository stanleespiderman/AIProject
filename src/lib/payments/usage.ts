"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useAuth } from "../auth";
import { STORAGE_KEYS } from "../constants";
import { readJSON, writeJSON } from "../storage";
import { getSupabase } from "../supabase/client";
import type { Exercise } from "../types";

/**
 * Workout sessions, access and the exercise log, all decided by the database.
 * The functions behind these calls (supabase/migrations/2026102*_*.sql) check the signed-in
 * user (or guest), a confirmed email, the free-workout limit and any paid entitlement.
 *
 * One shared store, so the live bar, the results screen and the tiles always agree.
 */

export type WorkoutStatus =
  | {
      ok: true;
      paid: boolean;
      /** A guest (anonymous sign-in) on their one free workout. */
      guest: boolean;
      finished: number;
      limit: number;
      active_id: string | null;
      active_started_at: string | null;
    }
  | {
      ok: false;
      reason:
        | "signed_out"
        | "email_unconfirmed"
        | "limit_reached"
        // The guest's one workout is done: create an account to go on.
        | "signup_required"
        // Signed out, and this device already had its guest workout (or guest sign-in is off).
        | "guest_unavailable"
        | "error";
      finished?: number;
      limit?: number;
    };

/** An exercise started in the running workout (row of public.exercise_logs). */
export interface ExerciseLog {
  id: string;
  exercise_id: string;
  name: string;
  primary_muscle: string;
  sets: number;
  reps: string;
  started_at: string;
  completed_at: string | null;
}

interface State {
  status: WorkoutStatus | null; // null while loading
  logs: ExerciseLog[];
}

let state: State = { status: null, logs: [] };
let loadedFor: string | null | undefined; // user id the state belongs to (undefined: nothing loaded)
const listeners = new Set<() => void>();

function set(next: Partial<State>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

function guestUsedOnThisDevice(): boolean {
  return readJSON<boolean>(STORAGE_KEYS.guestUsed, false);
}

async function call(fn: "workout_status" | "start_workout" | "finish_workout"): Promise<WorkoutStatus> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, reason: "error" };
  const { data, error } = await supabase.rpc(fn);
  if (error || !data) return { ok: false, reason: "error" };
  return data as WorkoutStatus;
}

async function loadLogs(workoutId: string | null): Promise<ExerciseLog[]> {
  const supabase = getSupabase();
  if (!supabase || !workoutId) return [];
  const { data } = await supabase
    .from("exercise_logs")
    .select("id, exercise_id, name, primary_muscle, sets, reps, started_at, completed_at")
    .eq("workout_id", workoutId)
    .order("started_at");
  return (data ?? []) as ExerciseLog[];
}

async function apply(status: WorkoutStatus) {
  const activeId = status.ok ? status.active_id : null;
  set({ status, logs: await loadLogs(activeId) });
}

async function load(userId: string | null) {
  loadedFor = userId;
  if (!userId) {
    set({ status: { ok: false, reason: guestUsedOnThisDevice() ? "guest_unavailable" : "signed_out" }, logs: [] });
    return;
  }
  await apply(await call("workout_status"));
}

export async function refreshWorkout(): Promise<void> {
  await apply(await call("workout_status"));
}

/**
 * Starts a workout (or returns the running one). Signed out, the first workout on this
 * device runs as a guest (Supabase anonymous sign-in); later ones need an account.
 */
export async function startWorkout(): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    if (guestUsedOnThisDevice()) {
      set({ status: { ok: false, reason: "guest_unavailable" } });
      return;
    }
    const { data: guest, error } = await supabase.auth.signInAnonymously();
    if (error || !guest.user) {
      // Anonymous sign-ins are switched off in Supabase: fall back to "sign in to start".
      set({ status: { ok: false, reason: "guest_unavailable" } });
      return;
    }
    writeJSON(STORAGE_KEYS.guestUsed, true);
    // Claim the new user now, so the sign-in event doesn't trigger a second load that could land after the start.
    loadedFor = guest.user.id;
  }
  await apply(await call("start_workout"));
}

export async function finishWorkout(): Promise<void> {
  await apply(await call("finish_workout"));
}

/** Logs that an exercise was started in the running workout. */
export async function startExercise(exercise: Exercise): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  const { data: id, error } = await supabase.rpc("log_exercise_start", {
    p_exercise_id: exercise.id,
    p_name: exercise.name,
    p_primary_muscle: exercise.primaryMuscle,
    p_sets: exercise.sets,
    p_reps: exercise.reps,
  });
  if (error || typeof id !== "string") {
    // Most likely the workout ended meanwhile (another tab, or the 3 hour limit).
    await refreshWorkout();
    return;
  }
  const log: ExerciseLog = {
    id,
    exercise_id: exercise.id,
    name: exercise.name,
    primary_muscle: exercise.primaryMuscle,
    sets: exercise.sets,
    reps: exercise.reps,
    started_at: new Date().toISOString(),
    completed_at: null,
  };
  set({ logs: [...state.logs, log] });
}

export async function finishExercise(logId: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  const { error } = await supabase.rpc("log_exercise_done", { p_log_id: logId });
  if (error) return;
  const now = new Date().toISOString();
  set({ logs: state.logs.map((l) => (l.id === logId ? { ...l, completed_at: l.completed_at ?? now } : l)) });
}

/** The shared workout state for the signed-in user (or guest). Loads it on first use and on account changes. */
export function useWorkout(): State {
  const { status: authStatus, user } = useAuth();
  const userId = user?.id ?? null;
  const snapshot = useSyncExternalStore(subscribe, () => state, () => state);

  useEffect(() => {
    if (authStatus === "loading" || loadedFor === userId) return;
    void load(userId);
  }, [authStatus, userId]);

  return authStatus === "loading" || loadedFor !== userId ? { status: null, logs: [] } : snapshot;
}

/** Status plus actions (kept for the unlock page and the results gate). */
export function useWorkoutStatus() {
  const { status } = useWorkout();
  return { status, refresh: refreshWorkout, start: startWorkout, finish: finishWorkout };
}

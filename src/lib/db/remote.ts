"use client";

/**
 * Syncs the on-device workout database with Supabase for signed-in users.
 * The device stays the source of truth while you train (works offline);
 * every change is pushed in the background, and on sign-in / app start the
 * two sides are merged. Tables: supabase/migrations/*_accounts.sql.
 */

import { getSupabase } from "../supabase";
import { closeOrphanedSessions, isUuid, newId, readDb, updateDb } from "./index";
import type { ExerciseLog, WorkoutSession } from "./schema";

interface SessionRow {
  id: string;
  started_at: string;
  ended_at: string | null;
  end_reason: "user" | "timeout" | null;
  exercise_logs?: LogRow[];
}

interface LogRow {
  id: string;
  session_id: string;
  exercise_id: string;
  name: string;
  primary_muscle: ExerciseLog["primaryMuscle"];
  sets: number;
  reps: string;
  started_at: string;
  completed_at: string | null;
}

async function signedInClient() {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session ? supabase : null;
}

// Pushes run one at a time, so an older snapshot never lands after a newer one.
let queue: Promise<unknown> = Promise.resolve();
function enqueue(task: () => Promise<void>): Promise<void> {
  const next = queue.then(task).catch((err) => {
    // Offline or a transient error: the next full sync pushes everything again.
    console.warn("[whatnext] sync failed", err);
  });
  queue = next;
  return next;
}

async function upsertSessions(sessions: WorkoutSession[]): Promise<void> {
  const supabase = await signedInClient();
  if (!supabase || sessions.length === 0) return;

  const { error: sErr } = await supabase.from("workout_sessions").upsert(
    sessions.map((s) => ({
      id: s.id,
      started_at: s.startedAt,
      ended_at: s.endedAt,
      end_reason: s.endReason ?? null,
    })),
  );
  if (sErr) throw sErr;

  const logs = sessions.flatMap((s) =>
    s.exercises.map((e) => ({
      id: e.id,
      session_id: s.id,
      exercise_id: e.exerciseId,
      name: e.name,
      primary_muscle: e.primaryMuscle,
      sets: e.sets,
      reps: e.reps,
      started_at: e.startedAt,
      completed_at: e.completedAt,
    })),
  );
  if (logs.length === 0) return;
  const { error: lErr } = await supabase.from("exercise_logs").upsert(logs);
  if (lErr) throw lErr;
}

/** Background push of one session after a local change. No-op when signed out. */
export function pushSession(sessionId: string): Promise<void> {
  return enqueue(async () => {
    const session = readDb().sessions.find((s) => s.id === sessionId);
    if (session) await upsertSessions([session]);
  });
}

export function deleteRemoteSession(sessionId: string): Promise<void> {
  return enqueue(async () => {
    const supabase = await signedInClient();
    if (!supabase) return;
    const { error } = await supabase.from("workout_sessions").delete().eq("id", sessionId);
    if (error) throw error;
  });
}

/**
 * Two-way merge: pulls the account's sessions (e.g. from another phone) into
 * this device, then uploads everything this device has. Call on sign-in and
 * on app start while signed in.
 */
export function syncAll(): Promise<void> {
  return enqueue(async () => {
    const supabase = await signedInClient();
    if (!supabase) return;

    const { data, error } = await supabase
      .from("workout_sessions")
      .select("id, started_at, ended_at, end_reason, exercise_logs(*)")
      .order("started_at");
    if (error) throw error;

    const merged = updateDb((db) => {
      // Ids from older builds may not be UUIDs; give them one before upload.
      const local = db.sessions.map((s) =>
        isUuid(s.id) ? s : { ...s, id: newId(), exercises: s.exercises.map((e) => ({ ...e, id: newId() })) },
      );
      const byId = new Map(local.map((s) => [s.id, s]));
      // This device wins for sessions it already has; it is where they are edited.
      for (const row of (data ?? []) as SessionRow[]) {
        if (!byId.has(row.id)) byId.set(row.id, fromRow(row));
      }
      const sessions = [...byId.values()]
        .sort((a, b) => Date.parse(a.startedAt) - Date.parse(b.startedAt))
        .map((s, i) => ({ ...s, number: i + 1 }));
      return { ...db, sessions: closeOrphanedSessions(sessions) };
    });

    await upsertSessions(merged.sessions);
  });
}

/** Postgres returns "…+00:00"; the app stores "…Z". */
const iso = (t: string) => new Date(t).toISOString();

function fromRow(row: SessionRow): WorkoutSession {
  return {
    id: row.id,
    number: 0, // renumbered after the merge
    startedAt: iso(row.started_at),
    endedAt: row.ended_at && iso(row.ended_at),
    ...(row.end_reason ? { endReason: row.end_reason } : {}),
    exercises: (row.exercise_logs ?? [])
      .sort((a, b) => Date.parse(a.started_at) - Date.parse(b.started_at))
      .map((l) => ({
        id: l.id,
        exerciseId: l.exercise_id,
        name: l.name,
        primaryMuscle: l.primary_muscle,
        sets: l.sets,
        reps: l.reps,
        startedAt: iso(l.started_at),
        completedAt: l.completed_at && iso(l.completed_at),
      })),
  };
}

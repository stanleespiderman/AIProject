"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../auth";
import { getSupabase } from "../supabase/client";

/**
 * Workout sessions and access, all decided by the database.
 * The functions behind these calls (supabase/migrations/20261027000000_*.sql) check the
 * signed-in user, a confirmed email, the free-workout limit and any paid entitlement.
 */

export type WorkoutStatus =
  | { ok: true; paid: boolean; finished: number; limit: number; active_id: string | null }
  | { ok: false; reason: "signed_out" | "email_unconfirmed" | "limit_reached" | "error"; finished?: number; limit?: number };

async function call(fn: "workout_status" | "start_workout" | "finish_workout"): Promise<WorkoutStatus> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, reason: "error" };
  const { data, error } = await supabase.rpc(fn);
  if (error || !data) return { ok: false, reason: "error" };
  return data as WorkoutStatus;
}

/** Current status for the signed-in user, plus actions that update it. */
export function useWorkoutStatus() {
  const { status: authStatus, user } = useAuth();
  const [status, setStatus] = useState<WorkoutStatus | null>(null);
  const userId = user?.id ?? null;

  useEffect(() => {
    let cancelled = false;
    if (authStatus === "loading") return;
    if (!userId) {
      void Promise.resolve().then(() => !cancelled && setStatus({ ok: false, reason: "signed_out" }));
      return;
    }
    void call("workout_status").then((s) => !cancelled && setStatus(s));
    return () => {
      cancelled = true;
    };
  }, [authStatus, userId]);

  const refresh = useCallback(async () => setStatus(await call("workout_status")), []);
  const start = useCallback(async () => setStatus(await call("start_workout")), []);
  const finish = useCallback(async () => setStatus(await call("finish_workout")), []);

  return { status: authStatus === "loading" ? null : status, refresh, start, finish };
}

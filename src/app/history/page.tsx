"use client";

import { useEffect, useState } from "react";
import { BottomBar } from "@/components/BottomBar";
import { Check } from "@/components/icons";
import { StepHeader } from "@/components/StepHeader";
import { ButtonLink } from "@/components/ui/Button";
import { formatDuration } from "@/components/WorkoutBar";
import { useAuth } from "@/lib/auth";
import { MUSCLE_LABEL } from "@/lib/constants";
import { useWorkout, type ExerciseLog } from "@/lib/payments/usage";
import { getSupabase } from "@/lib/supabase/client";
import type { MuscleGroup } from "@/lib/types";

interface WorkoutRow {
  id: string;
  started_at: string;
  finished_at: string | null;
  exercise_logs: ExerciseLog[];
}

/** Past workouts and the exercises done in each (public.workouts + public.exercise_logs). */
export default function HistoryPage() {
  const { status: authStatus, user } = useAuth();
  const { status } = useWorkout();
  const [rows, setRows] = useState<WorkoutRow[] | null>(null);
  const userId = user?.id ?? null;
  const activeId = status?.ok ? status.active_id : null;

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase || !userId) return;
    let cancelled = false;
    void supabase
      .from("workouts")
      .select("id, started_at, finished_at, exercise_logs(id, exercise_id, name, primary_muscle, sets, reps, started_at, completed_at)")
      .order("started_at", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        if (!cancelled) setRows((data ?? []) as WorkoutRow[]);
      });
    return () => {
      cancelled = true;
    };
    // Reload when a workout starts or finishes.
  }, [userId, activeId]);

  const signedOut = !getSupabase() || (authStatus === "out" && !userId);

  return (
    <>
      <StepHeader backHref="/" step="History" title="Your workouts" />

      {signedOut ? (
        <p className="rounded-2xl border border-line bg-panel p-4 text-muted">
          Sign in to see your workouts. Each one, and the exercises you did, is saved to your account.
        </p>
      ) : rows === null ? (
        <p className="text-muted">One sec…</p>
      ) : rows.length === 0 ? (
        <p className="rounded-2xl border border-line bg-panel p-4 text-muted">
          No workouts yet. Start one from the results screen and tap Start exercise on the moves you do.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((w) => (
            <WorkoutSummary key={w.id} workout={w} />
          ))}
        </div>
      )}

      <BottomBar>
        <ButtonLink href={signedOut ? "/account" : "/equipment"}>{signedOut ? "Sign in" : "Pick a workout"}</ButtonLink>
      </BottomBar>
    </>
  );
}

function WorkoutSummary({ workout }: { workout: WorkoutRow }) {
  const started = new Date(workout.started_at);
  const seconds = workout.finished_at
    ? Math.round((Date.parse(workout.finished_at) - started.getTime()) / 1000)
    : null;
  const logs = [...workout.exercise_logs].sort((a, b) => a.started_at.localeCompare(b.started_at));
  const done = logs.filter((l) => l.completed_at).length;

  return (
    <article className="rounded-3xl border border-line bg-panel p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display text-xl font-extrabold uppercase">
          {started.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
        </h2>
        <span className="text-sm text-muted">
          {started.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted">
        {seconds === null ? <span className="font-semibold text-volt">Live now</span> : formatDuration(seconds)}
        {" · "}
        {done} of {logs.length} {logs.length === 1 ? "exercise" : "exercises"} done
      </p>
      {logs.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {logs.map((l) => (
            <li key={l.id} className="flex items-center gap-3 text-[15px]">
              <span
                className={`grid size-5 shrink-0 place-items-center rounded-full ${
                  l.completed_at ? "bg-easy/20 text-easy" : "border border-line"
                }`}
              >
                {l.completed_at && <Check width={12} height={12} strokeWidth={3} />}
              </span>
              <span className="min-w-0 flex-1">
                {l.name}
                <span className="text-muted">
                  {" · "}
                  {MUSCLE_LABEL[l.primary_muscle as MuscleGroup] ?? l.primary_muscle} · {l.sets} × {l.reps}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

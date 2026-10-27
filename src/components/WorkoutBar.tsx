"use client";

import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { finishWorkout, useWorkout } from "@/lib/payments/usage";
import { cloudEnabled } from "@/lib/supabase/client";

/** Sticky bar while a workout is running, on every screen: timer, exercises done, Finish. */
export function WorkoutBar() {
  if (!cloudEnabled) return null;
  return <Bar />;
}

function Bar() {
  const router = useRouter();
  const { status, logs } = useWorkout();
  const now = useNowSeconds();
  const [busy, setBusy] = useState(false);

  if (!status?.ok || !status.active_id || !status.active_started_at) return null;

  const elapsed = Math.max(now - Math.floor(Date.parse(status.active_started_at) / 1000), 0);
  const done = logs.filter((l) => l.completed_at).length;

  const finish = async () => {
    setBusy(true);
    await finishWorkout();
    setBusy(false);
    router.push("/history");
  };

  return (
    <div className="sticky top-0 z-20 -mx-4 flex items-center gap-3 border-b border-line bg-ink/95 px-4 py-2 backdrop-blur">
      <span className="size-2.5 shrink-0 animate-pulse rounded-full bg-volt" aria-hidden="true" />
      <p className="flex-1 text-sm leading-tight">
        <span className="font-semibold">Workout live</span>
        <span className="text-muted">
          {" · "}
          <span className="tabular-nums">{now ? formatDuration(elapsed) : "--:--"}</span>
          {" · "}
          {done} done
        </span>
      </p>
      <button
        type="button"
        onClick={() => void finish()}
        disabled={busy}
        className="h-10 rounded-xl border border-heat/50 px-3 font-display text-base font-extrabold tracking-wide text-heat uppercase transition active:scale-95 disabled:opacity-50"
      >
        {busy ? "…" : "Finish"}
      </button>
    </div>
  );
}

export function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

function subscribeClock(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}

/** Current time in whole seconds, ticking every second. 0 on the server. */
function useNowSeconds(): number {
  return useSyncExternalStore(
    subscribeClock,
    () => Math.floor(Date.now() / 1000),
    () => 0,
  );
}

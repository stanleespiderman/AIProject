"use client";

import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { useActiveSession } from "@/lib/db";
import { closeStaleSession, endSession } from "@/lib/session";
import { Stop } from "./icons";

/** Sticky bar shown while a workout session is live: timer, progress and End session. */
export function SessionBar() {
  const router = useRouter();
  const session = useActiveSession();
  const now = useNowSeconds();

  // Close a session that was left open past the time limit when the app is reopened.
  useEffect(() => {
    closeStaleSession();
  }, []);

  if (!session) return null;

  const elapsed = Math.max(now - Math.floor(Date.parse(session.startedAt) / 1000), 0);
  const done = session.exercises.filter((e) => e.completedAt).length;

  const end = () => {
    endSession();
    router.push("/history");
  };

  return (
    <div className="sticky top-0 z-20 -mx-4 flex items-center gap-3 border-b border-line bg-ink/95 px-4 py-2 backdrop-blur">
      <span className="size-2.5 shrink-0 animate-pulse rounded-full bg-volt" aria-hidden="true" />
      <p className="flex-1 text-sm leading-tight">
        <span className="font-semibold">Session {session.number}</span>
        <span className="text-muted">
          {" · "}
          <span className="tabular-nums">{now ? formatDuration(elapsed) : "--:--"}</span>
          {" · "}
          {done} done
        </span>
      </p>
      <button
        type="button"
        onClick={end}
        className="flex h-10 items-center gap-1.5 rounded-xl border border-heat/50 px-3 font-display text-base font-extrabold tracking-wide text-heat uppercase transition active:scale-95"
      >
        <Stop width={14} height={14} /> End session
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

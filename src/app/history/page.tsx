"use client";

import { BottomBar } from "@/components/BottomBar";
import { Check } from "@/components/icons";
import { formatDuration } from "@/components/SessionBar";
import { SessionButton } from "@/components/SessionButton";
import { StepHeader } from "@/components/StepHeader";
import { MUSCLE_LABEL } from "@/lib/constants";
import { useSessionHistory, type WorkoutSession } from "@/lib/db";
import { useHydrated } from "@/lib/storage";

export default function HistoryPage() {
  const hydrated = useHydrated();
  const sessions = useSessionHistory();

  return (
    <>
      <StepHeader backHref="/" step="History" title="Your sessions" />

      {hydrated && sessions.length === 0 && (
        <p className="rounded-2xl border border-line bg-panel p-4 text-muted">
          No sessions yet. Start one and the exercises you do will show up here.
        </p>
      )}

      <div className="flex flex-col gap-4">
        {hydrated && sessions.map((s) => <SessionSummary key={s.id} session={s} />)}
      </div>

      <BottomBar>
        <SessionButton />
      </BottomBar>
    </>
  );
}

function SessionSummary({ session }: { session: WorkoutSession }) {
  const started = new Date(session.startedAt);
  const live = session.endedAt === null;
  const seconds = live ? null : Math.round((Date.parse(session.endedAt!) - started.getTime()) / 1000);
  const done = session.exercises.filter((e) => e.completedAt).length;

  return (
    <article className="rounded-3xl border border-line bg-panel p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display text-2xl font-extrabold uppercase">Session {session.number}</h2>
        <span className="text-sm text-muted">
          {started.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          {" · "}
          {started.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted">
        {live ? <span className="font-semibold text-volt">Live now</span> : formatDuration(seconds!)}
        {" · "}
        {done} of {session.exercises.length} done
        {session.endReason === "timeout" && " · auto-ended"}
      </p>

      {session.exercises.length > 0 && (
        <ul className="mt-4 space-y-2">
          {session.exercises.map((e) => (
            <li key={e.id} className="flex items-center gap-3 text-[15px]">
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-full ${
                  e.completedAt ? "bg-easy/20 text-easy" : "border border-line text-muted"
                }`}
              >
                {e.completedAt && <Check width={14} height={14} strokeWidth={3} />}
              </span>
              <span className="flex-1">
                {e.name}
                <span className="text-muted">
                  {" · "}
                  {MUSCLE_LABEL[e.primaryMuscle]} · {e.sets} × {e.reps}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BottomBar } from "@/components/BottomBar";
import { ExerciseCard } from "@/components/ExerciseCard";
import { ArrowRight, Shuffle } from "@/components/icons";
import { SessionButton } from "@/components/SessionButton";
import { StepHeader } from "@/components/StepHeader";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EXERCISES } from "@/data/exercises";
import { EQUIPMENT, MUSCLE_LABEL, RESULTS_MIN } from "@/lib/constants";
import { useActiveSession, type WorkoutSession } from "@/lib/db";
import { muscleHref, parseEquipment, parseMuscle, resultsHref } from "@/lib/params";
import { recommend } from "@/lib/recommend";
import { finishExercise, startExercise } from "@/lib/session";
import { useHydrated } from "@/lib/storage";
import type { EquipmentId, MuscleGroup } from "@/lib/types";
import { readVotes, useVotes } from "@/lib/votes";

export function ResultsView() {
  const params = useSearchParams();
  const equipment = parseEquipment(params.get("eq"));
  const muscle = parseMuscle(params.get("m"));
  // Results are random and read localStorage, so render them in the browser only.
  const hydrated = useHydrated();
  const session = useActiveSession();

  if (!muscle || equipment.length === 0) {
    return (
      <>
        <StepHeader backHref="/" title="Lost?" subtitle="That link is missing your equipment or muscle group." />
        <ButtonLink href="/equipment">
          Start over <ArrowRight />
        </ButtonLink>
      </>
    );
  }

  if (!hydrated) return <ResultsSkeleton />;

  // Exercises are part of a workout session: no live session, no results.
  if (!session) {
    return (
      <>
        <StepHeader
          backHref={muscleHref(equipment)}
          step={MUSCLE_LABEL[muscle]}
          title={<>Start a session</>}
          subtitle="Your exercises are ready. Start a session to see them and log what you do."
        />
        <BottomBar>
          <SessionButton next={resultsHref(equipment, muscle)} />
        </BottomBar>
      </>
    );
  }

  // Remount (and re-roll) whenever the filters change.
  return (
    <ResultsList key={`${equipment.join()}|${muscle}`} equipment={equipment} muscle={muscle} session={session} />
  );
}

interface ResultsListProps {
  equipment: EquipmentId[];
  muscle: MuscleGroup;
  session: WorkoutSession;
}

function ResultsList({ equipment, muscle, session }: ResultsListProps) {
  const { votes, toggle } = useVotes();

  const roll = (avoid: string[] = []) =>
    recommend({ all: EXERCISES, equipment, muscle, votes: readVotes(), avoid });

  // Votes are read once per roll, so voting never reshuffles the cards on screen.
  const [list, setList] = useState(() => roll());
  const [round, setRound] = useState(0);

  const shuffle = () => {
    setList(roll(list.map((ex) => ex.id)));
    setRound((r) => r + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const kit = EQUIPMENT.filter((e) => equipment.includes(e.id)).map((e) => e.label).join(", ");
  // Latest log per exercise in this session (an exercise can be done more than once).
  const logs = new Map(session.exercises.map((log) => [log.exerciseId, log]));

  return (
    <>
      <StepHeader
        backHref={muscleHref(equipment)}
        step={MUSCLE_LABEL[muscle]}
        title={<>Your next {list.length} moves</>}
        subtitle={<>With: {kit}</>}
      />

      {list.length < RESULTS_MIN && (
        <p className="mb-4 rounded-2xl border border-mid/40 bg-mid/10 p-4 text-sm text-fg/90">
          Only {list.length} {list.length === 1 ? "match" : "matches"} for this combo.{" "}
          <Link href="/equipment" className="font-semibold text-mid underline underline-offset-4">
            Add more equipment
          </Link>{" "}
          for more variety.
        </p>
      )}

      <div className="flex flex-col gap-4">
        {list.map((ex, i) => (
          <ExerciseCard
            key={`${round}-${ex.id}`}
            exercise={ex}
            index={i}
            vote={votes[ex.id]}
            onVote={(v) => toggle(ex.id, v)}
            log={logs.get(ex.id)}
            onStart={() => startExercise(ex)}
            onDone={finishExercise}
          />
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        👍 = see it more often · 👎 = see it less
      </p>

      <BottomBar>
        <Button onClick={shuffle}>
          <Shuffle /> Shuffle
        </Button>
        <p className="mt-2 text-center text-xs text-muted">
          {session.exercises.length === 0
            ? "Tap Start exercise on a card to log it"
            : "Done here? End your session at the top"}
        </p>
      </BottomBar>
    </>
  );
}

export function ResultsSkeleton() {
  return (
    <div className="flex flex-col gap-4 pt-24" aria-busy="true" aria-label="Loading exercises">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-72 animate-pulse rounded-3xl border border-line bg-panel" />
      ))}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BottomBar } from "@/components/BottomBar";
import { ExerciseCard } from "@/components/ExerciseCard";
import { ArrowRight, Lock, Shuffle } from "@/components/icons";
import { StepHeader } from "@/components/StepHeader";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EXERCISES } from "@/data/exercises";
import { EQUIPMENT, MUSCLE_LABEL, RESULTS_MIN } from "@/lib/constants";
import { consumeShuffle, useShufflesLeft } from "@/lib/payments/usage";
import { muscleHref, parseEquipment, parseMuscle } from "@/lib/params";
import { recommend } from "@/lib/recommend";
import { useHydrated } from "@/lib/storage";
import type { EquipmentId, MuscleGroup } from "@/lib/types";
import { readVotes, useVotes } from "@/lib/votes";

export function ResultsView() {
  const params = useSearchParams();
  const equipment = parseEquipment(params.get("eq"));
  const muscle = parseMuscle(params.get("m"));
  // Results are random and read localStorage, so render them in the browser only.
  const hydrated = useHydrated();

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

  // Remount (and re-roll) whenever the filters change.
  return <ResultsList key={`${equipment.join()}|${muscle}`} equipment={equipment} muscle={muscle} />;
}

function ResultsList({ equipment, muscle }: { equipment: EquipmentId[]; muscle: MuscleGroup }) {
  const router = useRouter();
  const { votes, toggle } = useVotes();
  const shufflesLeft = useShufflesLeft();

  const roll = (avoid: string[] = []) =>
    recommend({ all: EXERCISES, equipment, muscle, votes: readVotes(), avoid });

  // Votes are read once per roll, so voting never reshuffles the cards on screen.
  const [list, setList] = useState(() => roll());
  const [round, setRound] = useState(0);

  const shuffle = () => {
    if (!consumeShuffle()) {
      router.push("/unlock");
      return;
    }
    setList(roll(list.map((ex) => ex.id)));
    setRound((r) => r + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const kit = EQUIPMENT.filter((e) => equipment.includes(e.id)).map((e) => e.label).join(", ");
  const outOfShuffles = shufflesLeft === 0;

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
          />
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        👍 = see it more often · 👎 = see it less
      </p>

      <BottomBar>
        {outOfShuffles ? (
          <ButtonLink href="/unlock">
            <Lock /> Unlock more shuffles
          </ButtonLink>
        ) : (
          <Button onClick={shuffle}>
            <Shuffle /> Shuffle
          </Button>
        )}
        <p className="mt-2 text-center text-xs text-muted">
          {shufflesLeft === Infinity
            ? "NextSet: unlimited shuffles"
            : outOfShuffles
              ? "No free shuffles left today"
              : `${shufflesLeft} free ${shufflesLeft === 1 ? "shuffle" : "shuffles"} left today`}
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

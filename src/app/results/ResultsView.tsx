"use client";

import Link from "next/link";
import { useState } from "react";
import { BottomBar } from "@/components/BottomBar";
import { ExerciseTile } from "@/components/ExerciseTile";
import { InstallBanner } from "@/components/InstallBanner";
import { ArrowRight, Shuffle } from "@/components/icons";
import { StepHeader } from "@/components/StepHeader";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EXERCISES } from "@/data/exercises";
import { DIFFICULTY_LABEL, EQUIPMENT, MUSCLE_LABEL, RESULTS_MIN } from "@/lib/constants";
import { levelHref, parseEquipment, parseLevel, parseMuscle, resultsHref } from "@/lib/params";
import { recommend } from "@/lib/recommend";
import { useHydrated } from "@/lib/storage";
import type { Difficulty, EquipmentId, MuscleGroup } from "@/lib/types";
import { readVotes, useVotes } from "@/lib/votes";
import { useSearchParams } from "next/navigation";

export function ResultsView() {
  const params = useSearchParams();
  const equipment = parseEquipment(params.get("eq"));
  const muscle = parseMuscle(params.get("m"));
  const level = parseLevel(params.get("lv"));
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
  return (
    <ResultsList key={`${equipment.join()}|${muscle}|${level ?? "any"}`} equipment={equipment} muscle={muscle} level={level} />
  );
}

function ResultsList({
  equipment,
  muscle,
  level,
}: {
  equipment: EquipmentId[];
  muscle: MuscleGroup;
  level: Difficulty | null;
}) {
  const { votes, toggle } = useVotes();

  const roll = (avoid: string[] = []) =>
    recommend({ all: EXERCISES, equipment, muscle, level, votes: readVotes(), avoid });

  // Votes are read once per roll, so voting never reshuffles the tiles on screen.
  const [list, setList] = useState(() => roll());
  const [round, setRound] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);

  const shuffle = () => {
    setList(roll(list.map((ex) => ex.id)));
    setRound((r) => r + 1);
    setOpenId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTile = (id: string) => {
    const opening = openId !== id;
    setOpenId(opening ? id : null);
    // The open tile moves to the top of the grid, so bring the top into view.
    if (opening) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // The open tile always comes first; the rest keep their order below it.
  const ordered = [...list].sort((a, b) => Number(b.id === openId) - Number(a.id === openId));

  const kit = EQUIPMENT.filter((e) => equipment.includes(e.id)).map((e) => e.label).join(", ");

  return (
    <>
      <StepHeader
        backHref={levelHref(equipment, muscle, level)}
        step={`${MUSCLE_LABEL[muscle]} · ${level ? DIFFICULTY_LABEL[level] : "Any level"}`}
        title={<>Your next {list.length} moves</>}
        subtitle={<>With: {kit}</>}
      />

      {list.length < RESULTS_MIN && (
        <p className="mb-4 rounded-2xl border border-mid/40 bg-mid/10 p-4 text-sm text-fg/90">
          Only {list.length} {list.length === 1 ? "match" : "matches"} for this combo.{" "}
          {level && (
            <>
              <Link href={resultsHref(equipment, muscle)} className="font-semibold text-mid underline underline-offset-4">
                Show any level
              </Link>{" "}
              or{" "}
            </>
          )}
          <Link href="/equipment" className="font-semibold text-mid underline underline-offset-4">
            {level ? "add" : "Add"} more equipment
          </Link>{" "}
          for more variety.
        </p>
      )}

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {ordered.map((ex, i) => (
          <ExerciseTile
            key={`${round}-${ex.id}`}
            exercise={ex}
            index={i}
            open={openId === ex.id}
            onToggle={() => toggleTile(ex.id)}
            vote={votes[ex.id]}
            onVote={(v) => toggle(ex.id, v)}
          />
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        Tap a tile for sets, form cues and video
      </p>

      <InstallBanner title="Liked it? Add it to your home screen" className="mt-6" />

      <BottomBar>
        <Button onClick={shuffle}>
          <Shuffle /> Shuffle
        </Button>
      </BottomBar>
    </>
  );
}

export function ResultsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 pt-24" aria-busy="true" aria-label="Loading exercises">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-28 animate-pulse rounded-3xl border border-line bg-panel" />
      ))}
    </div>
  );
}

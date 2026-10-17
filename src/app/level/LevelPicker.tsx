"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BottomBar } from "@/components/BottomBar";
import { ArrowRight, Check } from "@/components/icons";
import { StepHeader } from "@/components/StepHeader";
import { ButtonLink } from "@/components/ui/Button";
import { EXERCISES } from "@/data/exercises";
import { EQUIPMENT, LEVELS, MUSCLE_LABEL, type LevelChoice } from "@/lib/constants";
import { muscleHref, parseEquipment, parseLevel, parseMuscle, resultsHref } from "@/lib/params";
import { eligible } from "@/lib/recommend";

const DOTS: Record<LevelChoice, { filled: number; color: string }> = {
  any: { filled: 3, color: "text-volt" },
  beginner: { filled: 1, color: "text-easy" },
  intermediate: { filled: 2, color: "text-mid" },
  advanced: { filled: 3, color: "text-heat" },
};

export function LevelPicker() {
  const params = useSearchParams();
  const equipment = parseEquipment(params.get("eq"));
  const muscle = parseMuscle(params.get("m"));
  const [level, setLevel] = useState<LevelChoice>(parseLevel(params.get("lv")) ?? "any");

  if (!muscle || equipment.length === 0) {
    return (
      <>
        <StepHeader backHref="/equipment" step="Step 3 / 3" title="Hold up" />
        <p className="text-muted">Pick your equipment and a muscle first.</p>
        <ButtonLink href="/equipment" className="mt-6">
          Start over <ArrowRight />
        </ButtonLink>
      </>
    );
  }

  const countFor = (id: LevelChoice) => eligible(EXERCISES, equipment, muscle, id === "any" ? null : id).length;
  const kit = EQUIPMENT.filter((e) => equipment.includes(e.id)).map((e) => e.label).join(", ");
  const selectedCount = countFor(level);

  return (
    <>
      <StepHeader
        backHref={muscleHref(equipment)}
        step="Step 3 / 3"
        title={
          <>
            How hard
            <br />
            today?
          </>
        }
        subtitle="Pick a level, or keep it open for a mix."
      />

      <div role="radiogroup" aria-label="Skill level" className="grid gap-2.5">
        {LEVELS.map((l) => {
          const count = countFor(l.id);
          const active = l.id === level;
          const disabled = count === 0;
          const dots = DOTS[l.id];
          return (
            <button
              key={l.id}
              type="button"
              role="radio"
              aria-checked={active}
              disabled={disabled}
              onClick={() => setLevel(l.id)}
              className={`flex items-center gap-4 rounded-3xl border-2 p-4 text-left transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-35 ${
                active ? "border-volt bg-volt/10" : "border-line bg-panel"
              }`}
            >
              <span className={`flex w-7 shrink-0 flex-col items-center gap-1 ${dots.color}`} aria-hidden="true">
                {[3, 2, 1].map((i) => (
                  <i key={i} className={`size-2.5 rounded-full bg-current ${i <= dots.filled ? "" : "opacity-20"}`} />
                ))}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-2xl leading-none font-extrabold uppercase">{l.label}</span>
                <span className="mt-1 block text-sm text-muted">{disabled ? "No moves for this combo" : l.blurb}</span>
              </span>
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-full border-2 ${
                  active ? "border-volt bg-volt text-ink" : "border-line text-transparent"
                }`}
                aria-hidden="true"
              >
                <Check width={14} height={14} strokeWidth={3} />
              </span>
            </button>
          );
        })}
      </div>

      <BottomBar>
        <ButtonLink
          href={resultsHref(equipment, muscle, level === "any" ? null : level)}
          aria-disabled={selectedCount === 0}
          className={selectedCount === 0 ? "pointer-events-none opacity-40" : ""}
        >
          Show my moves <ArrowRight />
        </ButtonLink>
        <p className="mt-2 text-center text-xs text-muted">
          {MUSCLE_LABEL[muscle]} · {kit}
        </p>
      </BottomBar>
    </>
  );
}

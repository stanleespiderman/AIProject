"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "@/components/icons";
import { StepHeader } from "@/components/StepHeader";
import { ButtonLink } from "@/components/ui/Button";
import { EXERCISES } from "@/data/exercises";
import { MUSCLES } from "@/lib/constants";
import { parseEquipment, resultsHref } from "@/lib/params";
import { isCompound, usesAvailableEquipment } from "@/lib/recommend";
import type { MuscleGroup } from "@/lib/types";

export function MusclePicker() {
  const equipment = parseEquipment(useSearchParams().get("eq"));

  if (equipment.length === 0) {
    return (
      <>
        <StepHeader backHref="/equipment" step="Step 2 / 2" title="Hold up" />
        <p className="text-muted">Pick your equipment first so we know what you can do.</p>
        <ButtonLink href="/equipment" className="mt-6">
          Pick equipment <ArrowRight />
        </ButtonLink>
      </>
    );
  }

  const available = EXERCISES.filter((ex) => usesAvailableEquipment(ex, equipment));
  const countFor = (m: MuscleGroup) =>
    available.filter(
      (ex) =>
        ex.primaryMuscle === m ||
        (m === "fullBody" ? isCompound(ex) : ex.secondaryMuscles.includes(m)),
    ).length;

  return (
    <>
      <StepHeader
        backHref="/equipment"
        step="Step 2 / 2"
        title="Hit what?"
        subtitle="Pick one. We'll do the rest."
      />

      <div className="grid grid-cols-2 gap-2.5">
        {MUSCLES.map((m) => {
          const count = countFor(m.id);
          const disabled = count === 0;
          return (
            <Link
              key={m.id}
              href={resultsHref(equipment, m.id)}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : undefined}
              className={`group flex min-h-28 flex-col justify-between rounded-3xl border border-line bg-panel p-4 transition active:scale-[0.97] ${
                disabled ? "pointer-events-none opacity-35" : "hover:border-volt active:border-volt active:bg-volt active:text-ink"
              }`}
            >
              <span className="font-display text-3xl leading-none font-extrabold uppercase italic">{m.label}</span>
              <span className="flex items-center justify-between text-sm text-muted group-active:text-ink">
                {disabled ? "No moves" : `${count} moves`}
                {!disabled && <ArrowRight width={18} height={18} className="text-volt group-active:text-ink" />}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="h-8" />
    </>
  );
}

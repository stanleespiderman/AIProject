"use client";

import { useState } from "react";
import type { ExerciseDetails } from "@/lib/types";

const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * The exact muscle parts worked. Closed, it shows only a "Muscle parts worked" button.
 * Tapping it fades the button away to the right while the parts slide in from the left,
 * main muscle first (highlighted). Tapping the main muscle folds it back.
 */
export function MuscleParts({ parts }: { parts: ExerciseDetails["muscleParts"] }) {
  const hasMore = parts.secondary.length > 0;
  // With nothing else to reveal there is no button: just show the parts.
  const [shown, setShown] = useState(!hasMore);

  const chips = [
    ...parts.primary.map((label) => ({ label, main: true })),
    ...parts.secondary.map((label) => ({ label, main: false })),
  ];

  return (
    <div className="mt-3 grid items-center">
      {hasMore && (
        <button
          type="button"
          aria-expanded={shown}
          tabIndex={shown ? -1 : 0}
          onClick={() => setShown(true)}
          className={`col-start-1 row-start-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-volt/45 bg-volt/10 py-1 pr-2.5 pl-3 text-[11px] font-semibold tracking-widest whitespace-nowrap text-volt uppercase ${
            shown ? "pointer-events-none translate-x-7 opacity-0" : "opacity-100"
          }`}
          style={{
            transitionProperty: "opacity, transform",
            transitionDuration: "280ms, 500ms",
            transitionTimingFunction: `ease, ${EASE_OUT}`,
            transitionDelay: shown ? "0ms" : "140ms",
          }}
        >
          Muscle parts worked
          <PlusIcon />
        </button>
      )}

      <div
        className={`col-start-1 row-start-1 flex flex-wrap gap-1.5 ${shown ? "" : "pointer-events-none"}`}
        aria-hidden={!shown}
      >
        {chips.map((chip, i) => {
          const style = {
            transitionProperty: "opacity, transform",
            transitionDuration: "300ms, 500ms",
            transitionTimingFunction: `ease, ${EASE_OUT}`,
            transitionDelay: `${i * 70}ms`,
          };
          const tone = chip.main
            ? "border-volt/40 bg-volt/10 text-volt"
            : "border-line text-muted";
          const motion = shown ? "opacity-100" : "-translate-x-8 opacity-0";
          const base = `rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tone} ${motion}`;

          if (i === 0 && hasMore) {
            return (
              <button
                key={chip.label}
                type="button"
                tabIndex={shown ? 0 : -1}
                onClick={() => setShown(false)}
                aria-label={`${chip.label}. Hide the other muscle parts`}
                className={base}
                style={style}
              >
                {chip.label}
              </button>
            );
          }
          return (
            <span key={chip.label} className={base} style={style}>
              {chip.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width={11} height={11} fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

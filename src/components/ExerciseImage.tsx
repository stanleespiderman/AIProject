"use client";

import Image from "next/image";
import { useState } from "react";
import { EXERCISE_IMAGES } from "@/data/exerciseImages";
import type { Exercise } from "@/lib/types";

/**
 * The start / end illustration for a card. When an exercise has a second view (for example a
 * top view of a bench press), a small toggle switches between them. Renders nothing when the
 * exercise has no image yet, so cards without one look exactly as before.
 */
export function ExerciseImage({ exercise, preload }: { exercise: Exercise; preload?: boolean }) {
  const views = EXERCISE_IMAGES[exercise.id];
  const [active, setActive] = useState(0);
  if (!views?.length) return null;

  const view = views[active] ?? views[0];
  const start = exercise.image?.leftPanel.label ?? "Start";
  const end = exercise.image?.rightPanel.label ?? "End";

  return (
    <figure className="mt-4">
      <div className="overflow-hidden rounded-2xl border border-line bg-ink">
        <Image
          key={view.src}
          src={view.src}
          alt={`${exercise.name}, ${view.label.toLowerCase()} view: ${start.toLowerCase()} position on the left, ${end.toLowerCase()} position on the right`}
          width={1536}
          height={1024}
          sizes="(max-width: 448px) 100vw, 448px"
          quality={90}
          preload={preload}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-2 flex items-center gap-2 text-[11px] font-semibold tracking-wider text-muted uppercase">
        <span className="flex-1 text-center">{start}</span>
        <span aria-hidden="true">→</span>
        <span className="flex-1 text-center">{end}</span>
      </figcaption>
      {views.length > 1 && (
        <div role="group" aria-label="Camera view" className="mt-2 flex gap-1 rounded-xl bg-panel-2 p-1">
          {views.map((v, i) => (
            <button
              key={v.view}
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={`min-h-9 flex-1 rounded-lg text-sm font-semibold transition ${
                i === active ? "bg-volt text-ink" : "text-muted hover:text-fg"
              }`}
            >
              {v.label} view
            </button>
          ))}
        </div>
      )}
    </figure>
  );
}

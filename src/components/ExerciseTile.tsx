import Image from "next/image";
import { EXERCISE_IMAGES } from "@/data/exerciseImages";
import { MUSCLE_LABEL } from "@/lib/constants";
import type { Exercise, Vote } from "@/lib/types";
import { FeedbackLink } from "./FeedbackLink";
import { HowToDoIt } from "./HowToDoIt";
import { Close, Play } from "./icons";
import { MuscleParts } from "./MuscleParts";
import { buttonClasses } from "./ui/Button";
import { DifficultyDots } from "./ui/DifficultyDots";
import { VoteButtons } from "./VoteButtons";

interface ExerciseTileProps {
  exercise: Exercise;
  open: boolean;
  onToggle: () => void;
  vote: Vote | undefined;
  onVote: (vote: Vote) => void;
  /** Stagger for the entrance animation. */
  index: number;
}

/**
 * One exercise. Closed it is a small tile: difficulty dots, name, muscle groups.
 * Open it takes the full row and shows the image (when there is one), form cues,
 * the exact muscle parts, sets x reps, the how-to and the actions.
 */
export function ExerciseTile({ exercise, open, onToggle, vote, onVote, index }: ExerciseTileProps) {
  const { id, name, difficulty, primaryMuscle, secondaryMuscles, sets, reps, formCues, muscleParts, videoUrl } = exercise;
  const image = EXERCISE_IMAGES[id];

  return (
    <article
      className={`relative min-w-0 overflow-hidden rounded-3xl border bg-panel ${
        open ? "col-span-full animate-grow border-volt" : "animate-rise border-line"
      }`}
      style={open ? undefined : { animationDelay: `${index * 40}ms` }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className={`flex w-full flex-col gap-2 p-3 text-left ${open ? "pr-14 pb-2.5" : "min-h-28 active:bg-panel-2"}`}
      >
        <DifficultyDots level={difficulty} className={open ? "[&>i]:size-[7px]" : ""} />
        <span className={`font-display leading-none font-extrabold text-balance uppercase [overflow-wrap:anywhere] ${open ? "text-3xl" : "text-xl"}`}>
          {name}
        </span>
        <span className={`flex flex-wrap gap-1 ${open ? "" : "mt-auto"}`}>
          <span className="rounded-full border border-volt/40 bg-volt/10 px-2 py-0.5 text-[10.5px] font-semibold text-volt">
            {MUSCLE_LABEL[primaryMuscle]}
          </span>
          {secondaryMuscles.map((m) => (
            <span key={m} className="rounded-full border border-line px-2 py-0.5 text-[10.5px] font-semibold text-muted">
              {MUSCLE_LABEL[m]}
            </span>
          ))}
        </span>
      </button>

      {open && (
        <>
          <button
            type="button"
            onClick={onToggle}
            aria-label={`Close ${name}`}
            className="absolute top-2 right-2 grid size-8 place-items-center rounded-full border border-line bg-panel-2 text-muted transition hover:text-fg active:scale-90"
          >
            <Close width={14} height={14} strokeWidth={3} />
          </button>

          <div className="px-3 pb-4 lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              {image && (
                <div className="relative mb-2.5 aspect-[3/2] overflow-hidden rounded-2xl border border-line bg-black">
                  <Image
                    src={image}
                    alt={`${name}: start and end position, working muscles highlighted`}
                    fill
                    sizes="(max-width: 1023px) 100vw, 480px"
                    className="object-cover"
                  />
                </div>
              )}

              <ul className="space-y-2">
                {formCues.map((cue) => (
                  <li key={cue} className="flex gap-3 text-[15px] leading-snug">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-volt" aria-hidden="true" />
                    {cue}
                  </li>
                ))}
              </ul>

              {muscleParts && <MuscleParts parts={muscleParts} />}
            </div>

            <div>
              <div className="mt-3 flex items-baseline gap-2 rounded-2xl bg-panel-2 px-4 py-2 lg:mt-0">
                <span className="font-display text-3xl font-extrabold text-volt">{sets}</span>
                <span className="font-display text-xl font-semibold text-muted">×</span>
                <span className="font-display text-3xl font-extrabold text-volt">{reps}</span>
                <span className="ml-auto text-[10px] tracking-wider text-muted uppercase">sets × reps</span>
              </div>

              <HowToDoIt exercise={exercise} />

              <div className="mt-4 flex items-center gap-2">
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses("secondary", "md", "flex-1")}
                >
                  <Play width={18} height={18} className="text-volt" />
                  Watch form
                </a>
                <VoteButtons exerciseName={name} vote={vote} onVote={onVote} />
              </div>

              <FeedbackLink
                kind="exercise"
                exercise={id}
                className="mt-3 inline-flex min-h-11 items-center text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
              >
                Something wrong with this exercise?
              </FeedbackLink>
            </div>
          </div>
        </>
      )}
    </article>
  );
}

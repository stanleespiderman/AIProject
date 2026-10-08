import { MUSCLE_LABEL } from "@/lib/constants";
import type { Exercise, Vote } from "@/lib/types";
import { Play } from "./icons";
import { buttonClasses } from "./ui/Button";
import { DifficultyBadge } from "./ui/DifficultyBadge";
import { HowToDoIt } from "./HowToDoIt";
import { VoteButtons } from "./VoteButtons";

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  vote: Vote | undefined;
  onVote: (vote: Vote) => void;
}

export function ExerciseCard({ exercise, index, vote, onVote }: ExerciseCardProps) {
  const { name, primaryMuscle, secondaryMuscles, difficulty, sets, reps, formCues, videoUrl } = exercise;

  return (
    <article
      className="animate-rise rounded-3xl border border-line bg-panel p-5"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-display text-4xl leading-none font-extrabold text-muted/30 italic" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <DifficultyBadge level={difficulty} />
      </div>

      <h2 className="mt-3 font-display text-3xl leading-tight font-extrabold uppercase">{name}</h2>
      <p className="mt-1 text-sm text-muted">
        <span className="font-semibold text-fg">{MUSCLE_LABEL[primaryMuscle]}</span>
        {secondaryMuscles.length > 0 && <> · also {secondaryMuscles.map((m) => MUSCLE_LABEL[m]).join(", ")}</>}
      </p>

      <div className="mt-4 flex items-baseline gap-2 rounded-2xl bg-panel-2 px-4 py-3">
        <span className="font-display text-4xl font-extrabold text-volt">{sets}</span>
        <span className="font-display text-2xl font-semibold text-muted">×</span>
        <span className="font-display text-4xl font-extrabold text-volt">{reps}</span>
        <span className="ml-auto text-xs tracking-wider text-muted uppercase">sets × reps</span>
      </div>

      <ul className="mt-4 space-y-2">
        {formCues.map((cue) => (
          <li key={cue} className="flex gap-3 text-[15px] leading-snug">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-volt" aria-hidden="true" />
            {cue}
          </li>
        ))}
      </ul>

      <HowToDoIt exercise={exercise} />

      <div className="mt-5 flex items-center gap-2">
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
    </article>
  );
}

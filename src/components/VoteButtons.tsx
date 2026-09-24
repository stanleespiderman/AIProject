import type { Vote } from "@/lib/types";
import { ThumbDown, ThumbUp } from "./icons";

interface VoteButtonsProps {
  exerciseName: string;
  vote: Vote | undefined;
  onVote: (vote: Vote) => void;
}

export function VoteButtons({ exerciseName, vote, onVote }: VoteButtonsProps) {
  const btn = "grid size-12 place-items-center rounded-2xl border transition active:scale-90";
  return (
    <div className="flex gap-2">
      <button
        type="button"
        aria-pressed={vote === 1}
        aria-label={`More like ${exerciseName}`}
        onClick={() => onVote(1)}
        className={`${btn} ${vote === 1 ? "border-volt bg-volt/15 text-volt" : "border-line text-muted hover:text-fg"}`}
      >
        <ThumbUp filled={vote === 1} className={vote === 1 ? "animate-pop" : ""} />
      </button>
      <button
        type="button"
        aria-pressed={vote === -1}
        aria-label={`Less like ${exerciseName}`}
        onClick={() => onVote(-1)}
        className={`${btn} ${vote === -1 ? "border-heat bg-heat/15 text-heat" : "border-line text-muted hover:text-fg"}`}
      >
        <ThumbDown filled={vote === -1} className={vote === -1 ? "animate-pop" : ""} />
      </button>
    </div>
  );
}

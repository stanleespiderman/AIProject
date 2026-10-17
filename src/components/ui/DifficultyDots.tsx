import { DIFFICULTY_LABEL } from "@/lib/constants";
import type { Difficulty } from "@/lib/types";

const color: Record<Difficulty, string> = {
  beginner: "text-easy",
  intermediate: "text-mid",
  advanced: "text-heat",
};
const filled: Record<Difficulty, number> = { beginner: 1, intermediate: 2, advanced: 3 };

/** Difficulty as three dots, filled by level and coloured green / amber / red. */
export function DifficultyDots({ level, className = "" }: { level: Difficulty; className?: string }) {
  return (
    <span
      role="img"
      aria-label={DIFFICULTY_LABEL[level]}
      title={DIFFICULTY_LABEL[level]}
      className={`inline-flex gap-[3px] ${color[level]} ${className}`}
    >
      {[1, 2, 3].map((i) => (
        <i key={i} className={`size-1.5 rounded-full bg-current ${i <= filled[level] ? "" : "opacity-20"}`} />
      ))}
    </span>
  );
}

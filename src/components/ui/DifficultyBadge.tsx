import { DIFFICULTY_LABEL } from "@/lib/constants";
import type { Difficulty } from "@/lib/types";

const styles: Record<Difficulty, string> = {
  beginner: "text-easy border-easy/40 bg-easy/10",
  intermediate: "text-mid border-mid/40 bg-mid/10",
  advanced: "text-heat border-heat/40 bg-heat/10",
};

const bars: Record<Difficulty, number> = { beginner: 1, intermediate: 2, advanced: 3 };

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[level]}`}
    >
      <span className="flex items-end gap-0.5" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-1 rounded-sm bg-current ${i <= bars[level] ? "" : "opacity-25"}`}
            style={{ height: 4 + i * 2 }}
          />
        ))}
      </span>
      {DIFFICULTY_LABEL[level]}
    </span>
  );
}

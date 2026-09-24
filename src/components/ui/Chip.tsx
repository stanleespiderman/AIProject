import { Check } from "../icons";

interface ChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

/** Large, thumb-friendly toggle chip for multi-select lists. */
export function Chip({ label, selected, onToggle }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`flex min-h-14 items-center justify-between gap-3 rounded-2xl border px-4 text-left text-base font-semibold transition active:scale-[0.97] ${
        selected
          ? "border-volt bg-volt text-ink"
          : "border-line bg-panel text-fg hover:border-muted"
      }`}
    >
      <span>{label}</span>
      <span
        className={`grid size-6 shrink-0 place-items-center rounded-full border transition ${
          selected ? "border-ink bg-ink text-volt" : "border-line"
        }`}
      >
        {selected && <Check width={14} height={14} strokeWidth={3} />}
      </span>
    </button>
  );
}

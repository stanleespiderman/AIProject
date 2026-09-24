"use client";

import { BottomBar } from "@/components/BottomBar";
import { ArrowRight } from "@/components/icons";
import { StepHeader } from "@/components/StepHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { EQUIPMENT, EQUIPMENT_IDS, STORAGE_KEYS } from "@/lib/constants";
import { muscleHref } from "@/lib/params";
import { useStoredState } from "@/lib/storage";
import type { EquipmentId } from "@/lib/types";

const NONE: EquipmentId[] = [];

export default function EquipmentPage() {
  // Remembered across visits so regulars can tap straight through.
  const [selected, setSelected] = useStoredState<EquipmentId[]>(STORAGE_KEYS.equipment, NONE);

  const toggle = (id: EquipmentId) =>
    setSelected(selected.includes(id) ? selected.filter((e) => e !== id) : [...selected, id]);

  const allSelected = selected.length === EQUIPMENT_IDS.length;
  // Keep a stable order in the URL regardless of tap order.
  const ordered = EQUIPMENT_IDS.filter((id) => selected.includes(id));

  return (
    <>
      <StepHeader
        backHref="/"
        step="Step 1 / 2"
        title="What's free?"
        subtitle="Tap everything you can grab right now."
      />

      <div className="grid grid-cols-1 gap-2.5">
        {EQUIPMENT.map((e) => (
          <Chip key={e.id} label={e.label} selected={selected.includes(e.id)} onToggle={() => toggle(e.id)} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setSelected(allSelected ? [] : EQUIPMENT_IDS)}
        className="mt-4 h-12 self-start px-1 text-sm font-semibold text-muted underline-offset-4 hover:text-fg hover:underline"
      >
        {allSelected ? "Clear all" : "I have everything"}
      </button>

      <BottomBar>
        <ButtonLink
          href={muscleHref(ordered)}
          aria-disabled={ordered.length === 0}
          tabIndex={ordered.length === 0 ? -1 : undefined}
          className={ordered.length === 0 ? "pointer-events-none opacity-40" : ""}
        >
          {ordered.length === 0 ? "Pick at least one" : `Next · ${ordered.length} selected`}
          {ordered.length > 0 && <ArrowRight />}
        </ButtonLink>
      </BottomBar>
    </>
  );
}

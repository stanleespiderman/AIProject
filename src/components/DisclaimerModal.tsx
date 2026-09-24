"use client";

import { DISCLAIMER, STORAGE_KEYS } from "@/lib/constants";
import { useHydrated, useStoredState } from "@/lib/storage";
import { Button } from "./ui/Button";

/** One-time safety notice, shown on the first visit until acknowledged. */
export function DisclaimerModal() {
  const hydrated = useHydrated();
  const [acknowledged, setAcknowledged] = useStoredState<boolean>(STORAGE_KEYS.disclaimer, false);

  if (!hydrated || acknowledged) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
    >
      <div className="w-full max-w-md animate-rise rounded-3xl border border-line bg-panel p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <p className="font-display text-sm font-semibold tracking-widest text-volt uppercase">Before you lift</p>
        <h2 id="disclaimer-title" className="mt-1 font-display text-3xl font-extrabold uppercase italic">
          Train smart
        </h2>
        <p className="mt-3 text-fg/90">{DISCLAIMER}</p>
        <Button className="mt-6" onClick={() => setAcknowledged(true)} autoFocus>
          Got it
        </Button>
      </div>
    </div>
  );
}

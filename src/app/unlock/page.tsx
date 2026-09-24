"use client";

import { useState } from "react";
import { BottomBar } from "@/components/BottomBar";
import { Check } from "@/components/icons";
import { StepHeader } from "@/components/StepHeader";
import { Button } from "@/components/ui/Button";
import { formatInr, PLANS, startCheckout, useIsPro, type PlanId } from "@/lib/payments";
import { FREE_SHUFFLES_PER_DAY } from "@/lib/payments/usage";

const perks = ["Unlimited shuffles, every day", "Every new exercise we add", "Supports a small indie app"];

export default function UnlockPage() {
  const pro = useIsPro();
  const [plan, setPlan] = useState<PlanId>("lifetime");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const checkout = async () => {
    setBusy(true);
    setMessage(null);
    const result = await startCheckout(plan);
    setBusy(false);
    if (result.status === "unavailable") setMessage(result.message);
  };

  const selected = PLANS.find((p) => p.id === plan)!;

  return (
    <>
      <StepHeader
        backHref="/equipment"
        step="NextSet"
        title={
          <>
            Unlock
            <br />
            <span className="text-volt">NextSet</span>
          </>
        }
        subtitle={
          pro
            ? "You're on NextSet. Shuffle away."
            : `Free plan: ${FREE_SHUFFLES_PER_DAY} shuffles a day. NextSet: no limits.`
        }
      />

      <ul className="space-y-2">
        {perks.map((perk) => (
          <li key={perk} className="flex items-center gap-3">
            <span className="grid size-6 place-items-center rounded-full bg-volt text-ink">
              <Check width={14} height={14} strokeWidth={3} />
            </span>
            {perk}
          </li>
        ))}
      </ul>

      <div role="radiogroup" aria-label="Choose a plan" className="mt-6 grid gap-3">
        {PLANS.map((p) => {
          const active = p.id === plan;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setPlan(p.id)}
              className={`flex items-center justify-between rounded-3xl border-2 p-5 text-left transition active:scale-[0.98] ${
                active ? "border-volt bg-volt/10" : "border-line bg-panel"
              }`}
            >
              <span>
                <span className="block font-display text-2xl font-extrabold uppercase">{p.name}</span>
                <span className="text-sm text-muted">{p.blurb}</span>
              </span>
              <span className="text-right">
                <span className="block font-display text-3xl font-extrabold">{formatInr(p.priceInr)}</span>
                <span className="text-xs text-muted">{p.billing === "monthly" ? "per month" : "one-time"}</span>
              </span>
            </button>
          );
        })}
      </div>

      {message && (
        <p role="status" className="mt-4 rounded-2xl border border-line bg-panel-2 p-4 text-sm">
          {message}
        </p>
      )}

      <BottomBar>
        <Button onClick={checkout} disabled={busy || pro}>
          {pro ? "You're unlocked" : busy ? "One sec…" : `Continue · ${formatInr(selected.priceInr)}`}
        </Button>
        <p className="mt-2 text-center text-xs text-muted">Or come back tomorrow for more free shuffles.</p>
      </BottomBar>
    </>
  );
}

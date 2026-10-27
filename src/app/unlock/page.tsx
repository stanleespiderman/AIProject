"use client";

import { useState } from "react";
import { BottomBar } from "@/components/BottomBar";
import { Check } from "@/components/icons";
import { StepHeader } from "@/components/StepHeader";
import { Button } from "@/components/ui/Button";
import { formatInr, PLANS, startCheckout, useIsPro } from "@/lib/payments";
import { FREE_SESSIONS } from "@/lib/payments/usage";

const perks = [
  "Unlimited workout sessions",
  "Your full exercise history",
  "Every new exercise we add",
  "Supports a small indie app",
];

export default function UnlockPage() {
  const pro = useIsPro();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const plan = PLANS[0];

  const checkout = async () => {
    setBusy(true);
    setMessage(null);
    const result = await startCheckout(plan.id);
    setBusy(false);
    if (result.status === "unavailable") setMessage(result.message);
  };

  return (
    <>
      <StepHeader
        backHref="/"
        step="Full access"
        title={
          <>
            Unlock
            <br />
            <span className="text-volt">WhatNext?</span>
          </>
        }
        subtitle={
          pro
            ? "You have full access. Train away."
            : `Your first ${FREE_SESSIONS} sessions are free. After that, one payment unlocks everything.`
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

      <div className="mt-6 flex items-center justify-between rounded-3xl border-2 border-volt bg-volt/10 p-5">
        <span>
          <span className="block font-display text-2xl font-extrabold uppercase">{plan.name}</span>
          <span className="text-sm text-muted">{plan.blurb}</span>
        </span>
        <span className="text-right">
          <span className="block font-display text-3xl font-extrabold">{formatInr(plan.priceInr)}</span>
          <span className="text-xs text-muted">one-time</span>
        </span>
      </div>

      {message && (
        <p role="status" className="mt-4 rounded-2xl border border-line bg-panel-2 p-4 text-sm">
          {message}
        </p>
      )}

      <BottomBar>
        <Button onClick={checkout} disabled={busy || pro}>
          {pro ? "You're unlocked" : busy ? "One sec…" : `Pay ${formatInr(plan.priceInr)}`}
        </Button>
        <p className="mt-2 text-center text-xs text-muted">No subscription. Pay once, keep it.</p>
      </BottomBar>
    </>
  );
}

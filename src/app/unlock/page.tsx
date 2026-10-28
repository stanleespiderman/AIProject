"use client";

import { useEffect, useState } from "react";
import { BottomBar } from "@/components/BottomBar";
import { Check } from "@/components/icons";
import { StepHeader } from "@/components/StepHeader";
import { Button, ButtonLink } from "@/components/ui/Button";
import { formatInr, PLAN, startCheckout } from "@/lib/payments";
import { useWorkoutStatus } from "@/lib/payments/usage";
import { cloudEnabled } from "@/lib/supabase/client";

const perks = ["Unlimited workouts, forever", "Every new exercise we add", "Supports a small indie app"];

export default function UnlockPage() {
  const { status, refresh } = useWorkoutStatus();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const paid = status?.ok === true && status.paid;
  const free = status?.ok === true ? `${status.finished} of ${status.limit} free workouts used.` : "5 workouts are free.";

  // After Dodo sends the customer back, the webhook can take a few seconds to land.
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("status") || paid) return;
    const id = window.setInterval(() => void refresh(), 3000);
    const stop = window.setTimeout(() => window.clearInterval(id), 30000);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(stop);
    };
  }, [paid, refresh]);

  const checkout = async () => {
    setBusy(true);
    setMessage(null);
    const result = await startCheckout();
    if (result.status === "unavailable") {
      setBusy(false);
      setMessage(result.message);
    }
  };

  // Guests and signed-out visitors need a real account first: the purchase is saved to it.
  const signedOut =
    (status?.ok === false && ["signed_out", "guest_unavailable", "signup_required"].includes(status.reason)) ||
    (status?.ok === true && status.guest);
  const canBuy = cloudEnabled && !paid && status?.ok === true;

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
        subtitle={paid ? "You're on NextSet. Workout away." : free}
      />

      <p role="note" className="mb-5 rounded-2xl border border-volt/40 bg-volt/10 p-4 text-sm">
        Test Mode demo. No real money is charged. Use Dodo test payment details only.
      </p>

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
          <span className="block font-display text-2xl font-extrabold uppercase">{PLAN.name}</span>
          <span className="text-sm text-muted">{PLAN.blurb}</span>
        </span>
        <span className="text-right">
          <span className="block font-display text-3xl font-extrabold">{formatInr(PLAN.priceInr)}</span>
          <span className="text-xs text-muted">one-time</span>
        </span>
      </div>

      {message && (
        <p role="status" className="mt-4 rounded-2xl border border-line bg-panel-2 p-4 text-sm">
          {message}
        </p>
      )}

      <BottomBar>
        {signedOut || !cloudEnabled ? (
          <ButtonLink href="/account">{status?.ok === true && status.guest ? "Create account to unlock" : "Sign in to unlock"}</ButtonLink>
        ) : (
          <Button onClick={checkout} disabled={busy || !canBuy}>
            {paid ? "You're unlocked" : busy ? "One sec…" : `Continue · ${formatInr(PLAN.priceInr)}`}
          </Button>
        )}
        <p className="mt-2 text-center text-xs text-muted">Payments are handled by Dodo Payments.</p>
      </BottomBar>
    </>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BottomBar } from "@/components/BottomBar";
import { Check } from "@/components/icons";
import { StepHeader } from "@/components/StepHeader";
import { Button, ButtonLink } from "@/components/ui/Button";
import { refreshEntitlement, useAccount } from "@/lib/account";
import { formatInr, PLANS, startCheckout, useIsPro } from "@/lib/payments";
import { FREE_SESSIONS } from "@/lib/payments/usage";

const perks = [
  "Unlimited workout sessions",
  "Your full exercise history",
  "Every new exercise we add",
  "Supports a small indie app",
];

export default function UnlockPage() {
  const router = useRouter();
  const pro = useIsPro();
  const account = useAccount();
  // A purchase is saved to an account, so buying needs one (when accounts are switched on).
  const needsSignIn = account.status === "signedOut";
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const plan = PLANS[0];

  const checkout = async () => {
    setBusy(true);
    setMessage(null);
    const result = await startCheckout(plan.id);
    if (result.status === "redirecting") return; // stay busy while the browser leaves
    setBusy(false);
    if (result.status === "signin") router.push("/login?next=/unlock");
    else if (result.status === "owned") await refreshEntitlement();
    else setMessage(result.message);
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
        {needsSignIn ? (
          <>
            <ButtonLink href="/login?next=/unlock">Sign in to buy</ButtonLink>
            <p className="mt-2 text-center text-xs text-muted">
              Your purchase is saved to your account, so it works on any phone.
            </p>
          </>
        ) : (
          <>
            <Button onClick={checkout} disabled={busy || pro || account.status === "loading"}>
              {pro ? "You're unlocked" : busy ? "One sec…" : `Pay ${formatInr(plan.priceInr)}`}
            </Button>
            <p className="mt-2 text-center text-xs text-muted">
              {account.status === "signedIn" ? (
                <>
                  Buying as {account.email} ·{" "}
                  <Link href="/account" className="underline underline-offset-4">
                    not you?
                  </Link>
                </>
              ) : (
                "No subscription. Pay once, keep it."
              )}
            </p>
          </>
        )}
      </BottomBar>
    </>
  );
}

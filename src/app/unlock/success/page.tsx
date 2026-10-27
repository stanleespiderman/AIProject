"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { BottomBar } from "@/components/BottomBar";
import { StepHeader } from "@/components/StepHeader";
import { ButtonLink } from "@/components/ui/Button";
import { refreshEntitlement } from "@/lib/account";
import { useIsPro } from "@/lib/payments";

const POLL_MS = 2000;
const POLL_TRIES = 30; // about a minute

/**
 * Dodo Payments sends the buyer back here. The redirect itself proves
 * nothing: access is granted by the webhook, so this page just waits for
 * the purchase to show up on the account.
 */
export default function UnlockSuccessPage() {
  return (
    <Suspense>
      <PaymentResult />
    </Suspense>
  );
}

function PaymentResult() {
  const pro = useIsPro();
  const status = useSearchParams().get("status");
  const failed = status === "failed" || status === "cancelled";
  const [gaveUp, setGaveUp] = useState(false);

  useEffect(() => {
    if (pro || failed) return;
    let tries = 0;
    const id = window.setInterval(() => {
      tries += 1;
      void refreshEntitlement();
      if (tries >= POLL_TRIES) {
        window.clearInterval(id);
        setGaveUp(true);
      }
    }, POLL_MS);
    void refreshEntitlement();
    return () => window.clearInterval(id);
  }, [pro, failed]);

  if (pro) {
    return (
      <>
        <StepHeader
          backHref="/"
          step="Full access"
          title={
            <>
              You&apos;re
              <br />
              <span className="text-volt">unlocked</span>
            </>
          }
          subtitle="Unlimited sessions, on any phone you sign in to. Thanks for supporting WhatNext?"
        />
        <BottomBar>
          <ButtonLink href="/">Start training</ButtonLink>
        </BottomBar>
      </>
    );
  }

  if (failed) {
    return (
      <>
        <StepHeader backHref="/unlock" step="Payment" title="Payment didn't go through" subtitle="You haven't been charged. Try again whenever you're ready." />
        <BottomBar>
          <ButtonLink href="/unlock">Try again</ButtonLink>
        </BottomBar>
      </>
    );
  }

  return (
    <>
      <StepHeader
        backHref="/"
        step="Payment"
        title={gaveUp ? "Still confirming" : "Confirming payment…"}
        subtitle={
          gaveUp
            ? "Your payment is taking longer than usual to confirm. It will unlock automatically; check your account in a few minutes. If you were charged and it doesn't unlock, reply to your receipt email."
            : "This usually takes a few seconds. Keep this page open."
        }
      />
      {gaveUp && (
        <BottomBar>
          <ButtonLink href="/account">Go to account</ButtonLink>
        </BottomBar>
      )}
    </>
  );
}

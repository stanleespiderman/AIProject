"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { StepHeader } from "@/components/StepHeader";
import { Button, ButtonLink } from "@/components/ui/Button";
import { cloudEnabled } from "@/lib/supabase/client";
import { useWorkoutStatus } from "@/lib/payments/usage";

/**
 * Wraps the results screen. With accounts turned on, results show only during a
 * started workout; starting one is checked by the database (free limit or paid access).
 * A workout can start as a guest; before the next one, an account is needed.
 * Without accounts configured, results are shown as before.
 */
export function WorkoutGate({ children }: { children: (finish: (() => void) | null) => ReactNode }) {
  if (!cloudEnabled) return <>{children(null)}</>;
  return <Gate>{children}</Gate>;
}

function Gate({ children }: { children: (finish: (() => void) | null) => ReactNode }) {
  const router = useRouter();
  const { status, start, finish } = useWorkoutStatus();
  const [busy, setBusy] = useState(false);

  const begin = async () => {
    setBusy(true);
    await start();
    setBusy(false);
  };

  if (!status) {
    return <p className="pt-24 text-center text-muted">One sec…</p>;
  }

  if (!status.ok && status.reason === "signed_out") {
    return (
      <>
        <StepHeader
          backHref="/equipment"
          title="Ready?"
          subtitle="5 workouts are free, and you can start without an account. Tap Start exercise on the moves you do."
        />
        <Button onClick={() => void begin()} disabled={busy}>
          {busy ? "One sec…" : "Start workout"}
        </Button>
        <p className="mt-3 text-center text-sm text-muted">
          Have an account?{" "}
          <Link href="/account" className="font-semibold text-fg underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </>
    );
  }

  if (!status.ok && (status.reason === "signup_required" || status.reason === "guest_unavailable")) {
    return (
      <>
        <StepHeader
          backHref="/equipment"
          title="Keep training"
          subtitle={
            status.reason === "signup_required"
              ? "Sign in to continue. Your workout and history are saved to your account, and your 5 free workouts carry on."
              : "Sign in or create a free account to start a workout. 5 workouts are free."
          }
        />
        <ButtonLink href="/account">{status.reason === "signup_required" ? "Sign in to continue" : "Sign in or create account"}</ButtonLink>
      </>
    );
  }

  if (!status.ok && status.reason === "email_unconfirmed") {
    return (
      <>
        <StepHeader backHref="/equipment" title="Confirm your email" subtitle="Open the link we emailed you, then come back and refresh." />
        <ButtonLink href="/account">Go to account</ButtonLink>
      </>
    );
  }

  // Free workouts used up: show the paywall straight away instead of a Start button that would refuse.
  const outOfFree = status.ok && !status.paid && !status.active_id && status.finished >= status.limit;
  if ((!status.ok && status.reason === "limit_reached") || outOfFree) {
    return (
      <>
        <StepHeader
          backHref="/equipment"
          title="Free workouts used"
          subtitle={`You've finished your ${status.limit ?? 5} free workouts. Unlock NextSet to keep going.`}
        />
        <ButtonLink href="/unlock">See NextSet</ButtonLink>
      </>
    );
  }

  if (!status.ok) {
    return (
      <>
        <StepHeader backHref="/equipment" title="Something went wrong" subtitle="We couldn't check your account. Try again in a moment." />
        <Button onClick={() => void begin()} disabled={busy}>
          Try again
        </Button>
      </>
    );
  }

  if (!status.active_id) {
    return (
      <>
        <StepHeader
          backHref="/equipment"
          title="Ready?"
          subtitle={
            status.paid
              ? "You're on NextSet. Start a workout to see your moves."
              : `${status.finished} of ${status.limit} free workouts used.`
          }
        />
        <Button onClick={() => void begin()} disabled={busy}>
          {busy ? "One sec…" : "Start workout"}
        </Button>
        {!status.paid && (
          <p className="mt-3 text-center text-xs text-muted">
            A workout counts once you press Finish (or after 3 hours). <Link href="/unlock" className="underline underline-offset-4">Unlock NextSet</Link>
          </p>
        )}
      </>
    );
  }

  return (
    <>
      {children(() => {
        void finish().then(() => router.push("/history"));
      })}
    </>
  );
}

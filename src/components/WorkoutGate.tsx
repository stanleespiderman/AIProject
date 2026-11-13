"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { StepHeader } from "@/components/StepHeader";
import { Button, ButtonLink } from "@/components/ui/Button";
import { cloudEnabled } from "@/lib/supabase/client";
import { useWorkoutStatus } from "@/lib/payments/usage";

/**
 * Wraps the results screen. With accounts turned on, results show only during a
 * started workout; starting one is checked by the database (free limit or paid access).
 * Without accounts configured, results are shown as before.
 */
export function WorkoutGate({ children }: { children: (finish: (() => void) | null) => ReactNode }) {
  if (!cloudEnabled) return <>{children(null)}</>;
  return <Gate>{children}</Gate>;
}

function Gate({ children }: { children: (finish: (() => void) | null) => ReactNode }) {
  const { status, start, finish } = useWorkoutStatus();

  if (!status) {
    return <p className="pt-24 text-center text-muted">One sec…</p>;
  }

  if (!status.ok && status.reason === "signed_out") {
    return (
      <>
        <StepHeader backHref="/equipment" title="Sign in to start" subtitle="Your workouts and access are saved to your account." />
        <ButtonLink href="/account">Sign in or create account</ButtonLink>
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

  if (!status.ok && status.reason === "limit_reached") {
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
        <Button onClick={() => void start()}>Try again</Button>
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
        <Button onClick={() => void start()}>Start workout</Button>
        {!status.paid && (
          <p className="mt-3 text-center text-xs text-muted">
            A workout counts once you press Finish. <Link href="/unlock" className="underline underline-offset-4">Unlock NextSet</Link>
          </p>
        )}
      </>
    );
  }

  return <>{children(() => void finish())}</>;
}

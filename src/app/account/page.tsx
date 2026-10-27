"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BottomBar } from "@/components/BottomBar";
import { StepHeader } from "@/components/StepHeader";
import { Button, ButtonLink } from "@/components/ui/Button";
import { signOut, useAccount } from "@/lib/account";
import { useDb } from "@/lib/db";
import { formatInr, PLANS, useIsPro } from "@/lib/payments";
import { FREE_SESSIONS, useFreeSessionsLeft } from "@/lib/payments/usage";

export default function AccountPage() {
  const router = useRouter();
  const account = useAccount();
  const pro = useIsPro();
  const left = useFreeSessionsLeft();
  const sessions = useDb().sessions;
  const [busy, setBusy] = useState(false);

  if (account.status === "loading") {
    return <StepHeader backHref="/" step="Account" title="Account" />;
  }

  if (account.status !== "signedIn") {
    return (
      <>
        <StepHeader
          backHref="/"
          step="Account"
          title="Account"
          subtitle={
            account.status === "unconfigured"
              ? "Accounts aren't switched on yet."
              : "Sign in to buy full access and keep your workout history on any phone."
          }
        />
        {account.status === "signedOut" && (
          <BottomBar>
            <ButtonLink href="/login?next=/account">Sign in</ButtonLink>
          </BottomBar>
        )}
      </>
    );
  }

  const exercisesDone = sessions.flatMap((s) => s.exercises).filter((e) => e.completedAt).length;

  const out = async () => {
    setBusy(true);
    await signOut();
    router.replace("/");
  };

  return (
    <>
      <StepHeader backHref="/" step="Account" title="Account" subtitle={account.email} />

      <div className="grid gap-3">
        <div className="rounded-3xl border border-line bg-panel p-5">
          <p className="text-sm text-muted">Plan</p>
          <p className="mt-1 font-display text-3xl font-extrabold uppercase">
            {pro ? <span className="text-volt">Full access</span> : "Free"}
          </p>
          <p className="mt-1 text-sm text-muted">
            {pro ? "Unlimited sessions, forever." : `${left} of ${FREE_SESSIONS} free sessions left`}
          </p>
          {!pro && (
            <ButtonLink href="/unlock" size="md" className="mt-4 w-full">
              Unlock · {formatInr(PLANS[0].priceInr)}
            </ButtonLink>
          )}
        </div>

        <Link href="/history" className="rounded-3xl border border-line bg-panel p-5 transition hover:border-muted">
          <p className="text-sm text-muted">Training</p>
          <p className="mt-1 font-display text-3xl font-extrabold uppercase">
            {sessions.length} {sessions.length === 1 ? "session" : "sessions"}
          </p>
          <p className="mt-1 text-sm text-muted">{exercisesDone} exercises done · see history</p>
        </Link>
      </div>

      <BottomBar>
        <Button variant="secondary" onClick={out} disabled={busy}>
          {busy ? "Signing out…" : "Sign out"}
        </Button>
        <p className="mt-2 text-center text-xs text-muted">Your purchase and history stay saved in your account.</p>
      </BottomBar>
    </>
  );
}

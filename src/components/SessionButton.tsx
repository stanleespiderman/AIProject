"use client";

import { useRouter } from "next/navigation";
import { useAccount } from "@/lib/account";
import { useActiveSession } from "@/lib/db";
import { formatInr, PLANS } from "@/lib/payments";
import { FREE_SESSIONS, useFreeSessionsLeft } from "@/lib/payments/usage";
import { startSession, useSignInRequiredToStart } from "@/lib/session";
import { useHydrated } from "@/lib/storage";
import { ArrowRight, Lock } from "./icons";
import { Button, ButtonLink } from "./ui/Button";

/**
 * The main call to action: Start session, Continue session, or Unlock once
 * the free sessions are used up. `next` is where to go after starting.
 */
export function SessionButton({ next = "/equipment" }: { next?: string }) {
  const router = useRouter();
  const hydrated = useHydrated();
  const active = useActiveSession();
  const left = useFreeSessionsLeft();
  const account = useAccount();
  const needsSignIn = useSignInRequiredToStart();

  // Wait for Supabase to restore the sign-in, so signed-in users never see "Sign in".
  if (!hydrated || account.status === "loading") return <Button disabled>Start session</Button>;

  if (active) {
    return (
      <>
        <ButtonLink href={next}>
          Continue session <ArrowRight />
        </ButtonLink>
        <p className="mt-2 text-center text-xs text-muted">Session {active.number} is live</p>
      </>
    );
  }

  if (needsSignIn) {
    return (
      <>
        <ButtonLink href={`/login?next=${encodeURIComponent(next)}`}>
          Sign in to keep training <ArrowRight />
        </ButtonLink>
        <p className="mt-2 text-center text-xs text-muted">
          Free, no password. Your history and free sessions are saved to your account.
        </p>
      </>
    );
  }

  if (left === 0) {
    return (
      <>
        <ButtonLink href="/unlock">
          <Lock /> Unlock · {formatInr(PLANS[0].priceInr)}
        </ButtonLink>
        <p className="mt-2 text-center text-xs text-muted">You&apos;ve used your {FREE_SESSIONS} free sessions</p>
      </>
    );
  }

  const start = () => {
    const result = startSession();
    if (result.status === "signin") router.push(`/login?next=${encodeURIComponent(next)}`);
    else router.push(result.status === "paywall" ? "/unlock" : next);
  };

  return (
    <>
      <Button onClick={start}>
        Start session <ArrowRight />
      </Button>
      <p className="mt-2 text-center text-xs text-muted">
        {left === Infinity
          ? "Full access: unlimited sessions"
          : `${left} of ${FREE_SESSIONS} free sessions left`}
      </p>
    </>
  );
}

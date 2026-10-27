"use client";

import { useRouter } from "next/navigation";
import { useActiveSession } from "@/lib/db";
import { formatInr, PLANS } from "@/lib/payments";
import { FREE_SESSIONS, useFreeSessionsLeft } from "@/lib/payments/usage";
import { startSession } from "@/lib/session";
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

  if (!hydrated) return <Button disabled>Start session</Button>;

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
    router.push(result.status === "paywall" ? "/unlock" : next);
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

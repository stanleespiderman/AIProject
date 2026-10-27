"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { BottomBar } from "@/components/BottomBar";
import { StepHeader } from "@/components/StepHeader";
import { Button } from "@/components/ui/Button";
import { safeNext, sendSignInEmail, useAccount, verifySignInCode } from "@/lib/account";

const input =
  "h-14 w-full rounded-2xl border border-line bg-panel-2 px-4 text-lg text-fg outline-none placeholder:text-muted focus:border-volt";

export function LoginForm() {
  const router = useRouter();
  const next = safeNext(useSearchParams().get("next"), "/account");
  const account = useAccount();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Already signed in (or just signed in with the code): carry on.
  useEffect(() => {
    if (account.status === "signedIn") router.replace(next);
  }, [account.status, next, router]);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const result = await sendSignInEmail(email.trim(), next);
    setBusy(false);
    if (result.error) setError(result.error);
    else setSent(true);
  };

  const verify = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const result = await verifySignInCode(email.trim(), code.trim());
    setBusy(false);
    if (result.error) setError(result.error);
  };

  if (account.status === "unconfigured") {
    return (
      <StepHeader backHref="/" step="Account" title="Coming soon" subtitle="Accounts aren't switched on yet." />
    );
  }

  return (
    <>
      <StepHeader
        backHref="/"
        step="Account"
        title={sent ? "Check your email" : "Sign in"}
        subtitle={
          sent ? (
            <>
              We sent a link to <span className="text-fg">{email}</span>. Tap it on this phone, or type the
              6-digit code from the email.
            </>
          ) : (
            "Your purchase and workout history are saved to your account, so they follow you to any phone. No password needed."
          )
        }
      />

      {!sent ? (
        <form id="email-form" onSubmit={send}>
          <label htmlFor="email" className="mb-2 block text-sm text-muted">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={input}
          />
        </form>
      ) : (
        <form id="code-form" onSubmit={verify}>
          <label htmlFor="code" className="mb-2 block text-sm text-muted">
            6-digit code
          </label>
          <input
            id="code"
            required
            autoComplete="one-time-code"
            inputMode="numeric"
            pattern="[0-9]{6,10}"
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`${input} tracking-[0.3em]`}
          />
          <button
            type="button"
            onClick={() => {
              setSent(false);
              setCode("");
              setError(null);
            }}
            className="mt-3 text-sm text-muted underline underline-offset-4"
          >
            Use a different email
          </button>
        </form>
      )}

      {error && (
        <p role="alert" className="mt-4 rounded-2xl border border-heat/40 bg-heat/10 p-4 text-sm">
          {error}
        </p>
      )}

      <BottomBar>
        <Button type="submit" form={sent ? "code-form" : "email-form"} disabled={busy}>
          {busy ? "One sec…" : sent ? "Sign in" : "Email me a sign-in link"}
        </Button>
      </BottomBar>
    </>
  );
}

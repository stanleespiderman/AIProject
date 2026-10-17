"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { StepHeader } from "@/components/StepHeader";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import { getSupabase } from "@/lib/supabase/client";

const MIN_PASSWORD = 8;

/** Landing page for the reset link in the email. Supabase signs the user in from the link, then we set the new password. */
export default function ResetPasswordPage() {
  const { status } = useAuth();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < MIN_PASSWORD) {
      setError(`Use at least ${MIN_PASSWORD} characters.`);
      return;
    }
    setBusy(true);
    const { error } = (await getSupabase()?.auth.updateUser({ password })) ?? { error: new Error("no client") };
    setBusy(false);
    if (error) setError("Couldn't save that password. The link may have expired: request a new one.");
    else setDone(true);
  };

  if (done) {
    return (
      <>
        <StepHeader backHref="/" title="Password updated" />
        <ButtonLink href="/account">Continue</ButtonLink>
      </>
    );
  }

  if (status !== "in") {
    return (
      <>
        <StepHeader backHref="/account" title="Reset password" />
        <p className="text-muted">
          {status === "loading"
            ? "One sec…"
            : "Open this page from the link in your reset email. It may have expired."}
        </p>
        {status === "out" && (
          <Link href="/account" className="mt-4 inline-block font-semibold text-volt underline underline-offset-4">
            Request a new link
          </Link>
        )}
      </>
    );
  }

  return (
    <>
      <StepHeader backHref="/account" title="New password" subtitle="Choose a password you haven't used elsewhere." />
      <form onSubmit={submit} className="grid gap-3" noValidate>
        <input
          id="new-password"
          type="password"
          autoComplete="new-password"
          placeholder={`New password (${MIN_PASSWORD}+ characters)`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="New password"
          className="h-14 w-full rounded-2xl border border-line bg-panel px-4 text-base text-fg placeholder:text-muted/60 focus:border-volt focus:outline-none"
        />
        {error && (
          <p role="alert" className="rounded-2xl border border-heat/40 bg-heat/10 p-3 text-sm">
            {error}
          </p>
        )}
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : "Save password"}
        </Button>
      </form>
    </>
  );
}

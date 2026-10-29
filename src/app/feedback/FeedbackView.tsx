"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/icons";
import { StepHeader } from "@/components/StepHeader";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EXERCISES } from "@/data/exercises";
import { FEEDBACK_KINDS, FEEDBACK_LIMITS, isFeedbackKind, type FeedbackKind } from "@/lib/feedback";
import { cloudEnabled, getSupabase } from "@/lib/supabase/client";

const field =
  "w-full rounded-2xl border border-line bg-panel px-4 text-base text-fg placeholder:text-muted/60 focus:border-volt focus:outline-none";

/** Only follow in-app paths back, never another site. */
function safePath(value: string | null): string | null {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : null;
}

export function FeedbackView() {
  const params = useSearchParams();
  const from = safePath(params.get("from"));
  const exercise = EXERCISES.find((e) => e.id === params.get("ex"));
  const initialKind = params.get("kind");

  const [kind, setKind] = useState<FeedbackKind | null>(
    isFeedbackKind(initialKind) ? initialKind : exercise ? "exercise" : null,
  );
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot, hidden from people
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const backHref = from ?? "/";
  const trimmed = message.trim();
  const ready = kind !== null && trimmed.length >= FEEDBACK_LIMITS.messageMin;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!ready || busy) return;
    setBusy(true);
    setError(null);
    try {
      // Signed-in users send their session so the feedback is linked to their account.
      const session = (await getSupabase()?.auth.getSession())?.data.session;
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({ kind, message: trimmed, email, exerciseId: exercise?.id, page: from, website }),
      });
      const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) setError(data.error ?? "Couldn't send that. Try again in a minute.");
      else setSent(true);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  if (!cloudEnabled) {
    return (
      <>
        <StepHeader backHref={backHref} step="Feedback" title="Tell us" />
        <p className="rounded-2xl border border-mid/40 bg-mid/10 p-4 text-sm">
          Feedback isn&apos;t set up on this deployment yet.
        </p>
      </>
    );
  }

  if (sent) {
    return (
      <>
        <StepHeader backHref={backHref} step="Feedback" title="Thanks!" subtitle="Got it. Thanks for helping make WhatNxt better." />
        {email && <p className="mb-6 text-sm text-muted">If we need more detail, we&apos;ll email {email}.</p>}
        <ButtonLink href={backHref}>
          {from ? "Back to where you were" : "Back to the app"} <ArrowRight />
        </ButtonLink>
      </>
    );
  }

  return (
    <>
      <StepHeader
        backHref={backHref}
        step="Feedback"
        title={exercise ? "Report a problem" : "Tell us"}
        subtitle={
          exercise ? (
            <>
              About <span className="font-semibold text-fg">{exercise.name}</span>. What&apos;s wrong with it?
            </>
          ) : (
            "Wrong exercise info, something broken, or an idea. It all helps."
          )
        }
      />

      <form onSubmit={submit} className="grid gap-5" noValidate>
        <fieldset>
          <legend className="mb-2 text-xs font-semibold tracking-widest text-volt uppercase">What&apos;s it about?</legend>
          <div className="grid gap-2">
            {FEEDBACK_KINDS.map((k) => (
              <label
                key={k.id}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition ${
                  kind === k.id ? "border-volt bg-volt/10" : "border-line bg-panel hover:border-muted"
                }`}
              >
                <input
                  type="radio"
                  name="kind"
                  value={k.id}
                  checked={kind === k.id}
                  onChange={() => setKind(k.id)}
                  className="mt-1 accent-[var(--color-volt)]"
                />
                <span>
                  <span className="block font-semibold">{k.label}</span>
                  {k.hint && <span className="block text-sm text-muted">{k.hint}</span>}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="grid gap-2">
          <span className="text-xs font-semibold tracking-widest text-volt uppercase">Details</span>
          <textarea
            rows={5}
            required
            maxLength={FEEDBACK_LIMITS.messageMax}
            placeholder={
              kind === "exercise"
                ? "e.g. The picture shows the knees past the toes, or the reps are too high for beginners"
                : kind === "bug"
                  ? "What did you tap, what did you expect, and what happened?"
                  : "Tell us more"
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${field} py-3 leading-snug`}
          />
          <span className="text-right text-xs text-muted">
            {message.length}/{FEEDBACK_LIMITS.messageMax}
          </span>
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-semibold tracking-widest text-volt uppercase">Email (optional)</span>
          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={FEEDBACK_LIMITS.email}
            placeholder="Only if you'd like a reply"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${field} h-14`}
          />
        </label>

        {/* Honeypot: hidden from people and screen readers, bots fill it in. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />

        {error && (
          <p role="alert" className="rounded-2xl border border-heat/40 bg-heat/10 p-3 text-sm">
            {error}
          </p>
        )}

        <Button type="submit" disabled={!ready || busy}>
          {busy ? "Sending…" : "Send feedback"}
        </Button>
      </form>
    </>
  );
}

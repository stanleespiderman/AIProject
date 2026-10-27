"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/icons";
import { StepHeader } from "@/components/StepHeader";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import { STORAGE_KEYS } from "@/lib/constants";
import { useStoredState } from "@/lib/storage";
import { getSupabase } from "@/lib/supabase/client";
import type { VoteMap } from "@/lib/types";

const MIN_PASSWORD = 8;
const field =
  "h-14 w-full rounded-2xl border border-line bg-panel px-4 text-base text-fg placeholder:text-muted/60 focus:border-volt focus:outline-none";

export function AccountView() {
  const { status, user } = useAuth();
  const supabase = getSupabase();

  if (!supabase) {
    return (
      <>
        <StepHeader backHref="/" title="Accounts" />
        <p className="rounded-2xl border border-mid/40 bg-mid/10 p-4 text-sm">
          Accounts aren&apos;t set up on this deployment yet. Everything still works and is saved on this device.
        </p>
      </>
    );
  }

  if (status === "loading") return <StepHeader backHref="/" title="Account" />;
  // A guest (anonymous sign-in, used for the first free workout) sees the sign-up form,
  // which upgrades the same user so their workout is kept.
  if (status === "in" && user && !user.is_anonymous) {
    return <SignedIn email={user.email ?? ""} name={user.user_metadata?.display_name as string | undefined} />;
  }
  return <SignedOut guest={status === "in" && !!user?.is_anonymous} />;
}

function SignedIn({ email, name }: { email: string; name?: string }) {
  const [votes] = useStoredState<VoteMap>(STORAGE_KEYS.votes, {});
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const voted = Object.keys(votes).length;

  const signOut = async () => {
    setBusy(true);
    await getSupabase()?.auth.signOut();
    setBusy(false);
  };

  const deleteAccount = async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    setBusy(true);
    setDeleteError(null);
    try {
      const { data } = await supabase.auth.getSession();
      const res = await fetch("/api/account/delete", {
        method: "POST",
        headers: { Authorization: `Bearer ${data.session?.access_token ?? ""}` },
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setDeleteError(body?.error ?? "Couldn't delete the account. Try again.");
        return;
      }
      // The account is gone on the server; end the local session too.
      await supabase.auth.signOut({ scope: "local" });
    } catch {
      setDeleteError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <StepHeader backHref="/" step="Account" title={name ? `Hi, ${name}` : "You're in"} subtitle={email} />
      <ul className="space-y-2 text-sm text-muted">
        <li className="rounded-2xl border border-line bg-panel p-4">
          Your equipment and your 👍/👎 votes ({voted} so far) are saved to your account and follow you to any device.
        </li>
      </ul>
      <ButtonLink href="/equipment" className="mt-6">
        Pick a workout <ArrowRight />
      </ButtonLink>
      <ButtonLink href="/history" variant="secondary" size="md" className="mt-3 w-full">
        Your workouts
      </ButtonLink>
      <Button variant="secondary" size="md" onClick={signOut} disabled={busy} className="mt-3 w-full">
        {busy ? "Signing out…" : "Sign out"}
      </Button>
      <p className="mt-3 text-xs text-muted">
        Signing out clears your saved picks from this device. They stay in your account.
      </p>

      <section className="mt-10 border-t border-line pt-6">
        <h2 className="font-display text-xl font-extrabold tracking-wide uppercase">Delete account</h2>
        {!confirming ? (
          <>
            <p className="mt-2 text-sm text-muted">
              Permanently removes your email, saved equipment and votes. This can&apos;t be undone.
            </p>
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="mt-3 h-11 text-sm font-semibold text-heat underline-offset-4 hover:underline"
            >
              Delete my account
            </button>
          </>
        ) : (
          <div className="mt-2 rounded-2xl border border-heat/40 bg-heat/10 p-4">
            <p className="text-sm">
              Delete <span className="font-semibold">{email}</span> and all its data forever?
            </p>
            {deleteError && (
              <p role="alert" className="mt-2 text-sm font-semibold text-heat">
                {deleteError}
              </p>
            )}
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={deleteAccount}
                disabled={busy}
                className="h-11 flex-1 rounded-2xl bg-heat font-display text-lg font-extrabold tracking-wide text-ink uppercase disabled:opacity-50"
              >
                {busy ? "Deleting…" : "Yes, delete"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirming(false);
                  setDeleteError(null);
                }}
                disabled={busy}
                className="h-11 flex-1 rounded-2xl border border-line font-display text-lg font-extrabold tracking-wide uppercase disabled:opacity-50"
              >
                Keep it
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function SignedOut({ guest = false }: { guest?: boolean }) {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">(guest ? "signup" : "signin");
  // A guest signs up by adding an email to their current (anonymous) user; Supabase only
  // allows a password once that email is confirmed, so it's chosen on /account/reset.
  const upgradingGuest = guest && mode === "signup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const switchMode = (next: typeof mode) => {
    setMode(next);
    setError(null);
    setNotice(null);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase) return;
    setError(null);
    setNotice(null);

    if (mode !== "forgot" && !upgradingGuest && password.length < MIN_PASSWORD) {
      setError(`Use at least ${MIN_PASSWORD} characters for your password.`);
      return;
    }

    setBusy(true);
    try {
      if (upgradingGuest) {
        const { error } = await supabase.auth.updateUser(
          { email, data: name.trim() ? { display_name: name.trim() } : undefined },
          { emailRedirectTo: `${window.location.origin}/account/reset` },
        );
        if (error) setError(friendly(error.message));
        else setNotice("Check your email and tap the link to confirm it, then choose a password. Your workout is kept.");
      } else if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError(friendly(error.message));
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: name.trim() ? { display_name: name.trim() } : undefined,
            emailRedirectTo: `${window.location.origin}/account`,
          },
        });
        if (error) setError(friendly(error.message));
        // No session yet means the project requires email confirmation.
        else if (!data.session) setNotice("Check your email and tap the link to finish creating your account.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/account/reset`,
        });
        if (error) setError(friendly(error.message));
        else setNotice("If that email has an account, a reset link is on its way.");
      }
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  const titles = { signin: "Welcome back", signup: guest ? "Keep training" : "Save your picks", forgot: "Reset password" } as const;
  const subtitles = {
    signin: "Sign in to save your workouts and access on any device.",
    signup: guest
      ? "Create a free account to keep your first workout and get 4 more free ones. No spam."
      : "Free account. No spam. Your picks follow you across devices.",
    forgot: "We'll email you a link to set a new password.",
  } as const;

  return (
    <>
      <StepHeader backHref="/" step="Account" title={titles[mode]} subtitle={subtitles[mode]} />

      <form onSubmit={submit} className="grid gap-3" noValidate>
        {mode === "signup" && (
          <input
            id="name"
            type="text"
            autoComplete="given-name"
            placeholder="First name (optional)"
            maxLength={60}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field}
            aria-label="First name"
          />
        )}
        <input
          id="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={field}
          aria-label="Email"
        />
        {mode !== "forgot" && !upgradingGuest && (
          <input
            id="password"
            type="password"
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            placeholder={mode === "signup" ? `Password (${MIN_PASSWORD}+ characters)` : "Password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={field}
            aria-label="Password"
          />
        )}

        {error && (
          <p role="alert" className="rounded-2xl border border-heat/40 bg-heat/10 p-3 text-sm">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="rounded-2xl border border-volt/40 bg-volt/10 p-3 text-sm">
            {notice}
          </p>
        )}

        <Button type="submit" disabled={busy || !email}>
          {busy ? "One sec…" : mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
        </Button>
      </form>

      <div className="mt-5 flex flex-col items-start gap-1 text-sm">
        {mode !== "signin" && (
          <button type="button" onClick={() => switchMode("signin")} className="h-11 text-muted underline-offset-4 hover:text-fg hover:underline">
            I already have an account
          </button>
        )}
        {mode !== "signup" && (
          <button type="button" onClick={() => switchMode("signup")} className="h-11 text-muted underline-offset-4 hover:text-fg hover:underline">
            Create an account
          </button>
        )}
        {mode === "signin" && (
          <button type="button" onClick={() => switchMode("forgot")} className="h-11 text-muted underline-offset-4 hover:text-fg hover:underline">
            Forgot password?
          </button>
        )}
      </div>
      <p className="mt-4 text-xs text-muted">
        {guest && mode === "signin"
          ? "Signing in to an existing account doesn't carry over your guest workout."
          : "Your first workout needs no account. After that, a verified email is required. 5 workouts are free."}
      </p>
    </>
  );
}

/** Supabase's messages are written for developers; say it plainly. */
function friendly(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login")) return "That email and password don't match.";
  if (m.includes("already registered") || m.includes("already been registered")) return "That email already has an account. Try signing in.";
  if (m.includes("email not confirmed")) return "Confirm your email first. We sent you a link.";
  if (m.includes("fetch") || m.includes("network")) return "Couldn't reach the server. Check your connection and try again.";
  if (m.includes("rate limit") || m.includes("too many")) return "Too many tries. Wait a minute and try again.";
  if (m.includes("password")) return "That password isn't strong enough. Try a longer one.";
  if (m.includes("valid email") || m.includes("invalid email")) return "That doesn't look like an email address.";
  return "Something went wrong. Please try again.";
}

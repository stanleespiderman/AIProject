"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { cloudEnabled } from "@/lib/supabase/client";

/** Home-screen entry to the account page: "Sign in" or the user's initial. Hidden when accounts aren't configured. */
export function AccountLink() {
  const { status, user } = useAuth();
  if (!cloudEnabled) return null;

  // Guests (anonymous, started without an account) still see "Sign in".
  if (status === "in" && user && !user.is_anonymous) {
    const name = (user.user_metadata?.display_name as string | undefined) || user.email || "?";
    return (
      <Link
        href="/account"
        aria-label="Your account"
        className="grid size-9 place-items-center rounded-full bg-volt font-display text-lg font-extrabold text-ink uppercase"
      >
        {name.charAt(0)}
      </Link>
    );
  }
  return (
    <Link
      href="/account"
      className={`rounded-full border border-line px-3 py-1 text-xs font-semibold text-fg transition hover:border-muted ${status === "loading" ? "opacity-0" : ""}`}
    >
      Sign in
    </Link>
  );
}

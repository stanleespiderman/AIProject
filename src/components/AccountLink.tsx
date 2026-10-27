"use client";

import Link from "next/link";
import { useAccount } from "@/lib/account";

/** Header pill: "Account" when signed in, "Sign in" otherwise. Hidden in local-only mode. */
export function AccountLink() {
  const account = useAccount();
  if (account.status === "unconfigured" || account.status === "loading") return null;
  const signedIn = account.status === "signedIn";
  return (
    <Link
      href={signedIn ? "/account" : "/login?next=/account"}
      className={`rounded-full border px-3 py-1 text-xs transition ${
        signedIn ? "border-volt/50 text-volt" : "border-line text-muted hover:text-fg"
      }`}
    >
      {signedIn ? "Account" : "Sign in"}
    </Link>
  );
}

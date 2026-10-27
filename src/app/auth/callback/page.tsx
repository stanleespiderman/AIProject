"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StepHeader } from "@/components/StepHeader";
import { ButtonLink } from "@/components/ui/Button";
import { safeNext } from "@/lib/account";
import { getSupabase } from "@/lib/supabase";

/**
 * Where the email sign-in link lands (?code=...&next=...). The Supabase
 * client finishes the sign-in by itself (detectSessionInUrl); this page
 * waits for it, then moves on.
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const [failed, setFailed] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = safeNext(params.get("next"), "/account");
    const supabase = getSupabase();
    if (!supabase) {
      router.replace("/");
      return;
    }
    supabase.auth.getSession().then(({ data, error }) => {
      if (data.session) router.replace(next);
      else
        setFailed(
          params.get("error_description") ??
            error?.message ??
            "This link didn't work. Open it on the same phone and browser you requested it from, or use the 6-digit code.",
        );
    });
  }, [router]);

  if (!failed) {
    return <StepHeader backHref="/" step="Account" title="Signing you in…" />;
  }

  return (
    <>
      <StepHeader backHref="/" step="Account" title="Link expired" subtitle={failed} />
      <ButtonLink href="/login">Try again</ButtonLink>
    </>
  );
}

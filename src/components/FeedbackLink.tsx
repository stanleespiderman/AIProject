"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { feedbackHref, type FeedbackKind } from "@/lib/feedback";
import { cloudEnabled } from "@/lib/supabase/client";

/**
 * Opens the feedback form and remembers the current page, so the report says where it came from.
 * Renders nothing when Supabase isn't configured: there would be nowhere to send it.
 */
export function FeedbackLink({
  kind,
  exercise,
  className,
  children,
}: {
  kind?: FeedbackKind;
  exercise?: string;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  if (!cloudEnabled) return null;
  const href = feedbackHref({ kind, exercise });

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        const { pathname, search } = window.location;
        router.push(pathname === "/feedback" ? href : feedbackHref({ kind, exercise, from: pathname + search }));
      }}
    >
      {children}
    </Link>
  );
}

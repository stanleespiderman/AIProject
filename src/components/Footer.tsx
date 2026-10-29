import { DISCLAIMER } from "@/lib/constants";
import { cloudEnabled } from "@/lib/supabase/client";
import { FeedbackLink } from "./FeedbackLink";

export function Footer() {
  return (
    <footer className="border-t border-line py-6 text-xs leading-relaxed text-muted">
      <p>
        <strong className="font-semibold text-fg">Heads up:</strong> {DISCLAIMER}
      </p>
      {cloudEnabled && (
        <p className="mt-2">
          Something wrong or got an idea?{" "}
          <FeedbackLink className="font-semibold text-fg underline underline-offset-4 hover:text-volt">Send feedback</FeedbackLink>
        </p>
      )}
      <p className="mt-2 opacity-70">© {new Date().getFullYear()} WhatNxt</p>
    </footer>
  );
}

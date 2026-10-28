"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/lib/constants";
import { useQr } from "@/lib/qr";
import { useHydrated, useStoredState } from "@/lib/storage";
import { Close } from "./icons";

/** Matches Tailwind's `lg`: the width where the layout switches to the desktop version. */
const DESKTOP_QUERY = "(min-width: 1024px)";
const BANNER_SNOOZE_DAYS = 1;
const TOAST_VISIBLE_MS = 20_000;
const TOAST_SEEN_KEY = "whatnext:desktop-toast-seen";

function snoozed(dismissedAt: number | null): boolean {
  return dismissedAt !== null && Date.now() - dismissedAt < BANNER_SNOOZE_DAYS * 24 * 60 * 60 * 1000;
}

/** A slim strip across the top of desktop screens. Hidden below the `lg` breakpoint, so phones never see it. */
export function DesktopBanner() {
  const hydrated = useHydrated();
  const [dismissedAt, setDismissedAt] = useStoredState<number | null>(STORAGE_KEYS.desktopBanner, null);

  if (!hydrated || snoozed(dismissedAt)) return null;

  return (
    <aside aria-label="Best on a phone" className="relative hidden bg-volt text-ink lg:block">
      <div className="mx-auto flex max-w-5xl items-center gap-4 py-2.5 pr-12">
        <PhoneGlyph />
        <p className="flex-1 text-sm leading-snug">
          <strong className="font-display text-lg font-extrabold tracking-wide uppercase">Best on your phone.</strong>{" "}
          Made for one-handed use between sets. It works here, but it&apos;s at its best on mobile.
        </p>
        <Link
          href="/install"
          className="shrink-0 rounded-xl bg-ink px-4 py-2 font-display text-base font-extrabold tracking-wide text-volt uppercase transition hover:opacity-90 active:scale-95"
        >
          Open on phone
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setDismissedAt(Date.now())}
        aria-label="Dismiss for today"
        className="absolute top-1/2 right-4 grid size-8 -translate-y-1/2 place-items-center rounded-full transition hover:bg-ink/10 active:scale-90"
      >
        <Close width={14} height={14} strokeWidth={3} />
      </button>
    </aside>
  );
}

/**
 * A pop-up in the corner of desktop screens with a QR code for the page you are on,
 * so you can carry on from your phone. Shown once per browser session, after the safety notice.
 */
export function DesktopToast() {
  const pathname = usePathname();
  const [disclaimerAck] = useStoredState<boolean>(STORAGE_KEYS.disclaimer, false);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  // The home screen and /install already show a QR code of their own.
  const skip = pathname === "/" || pathname.startsWith("/install");
  const qr = useQr(open && !skip, () => window.location.href, 240, [pathname]);

  useEffect(() => {
    if (!disclaimerAck || skip || !window.matchMedia(DESKTOP_QUERY).matches) return;
    try {
      if (window.sessionStorage.getItem(TOAST_SEEN_KEY)) return;
    } catch {
      // Storage blocked: it may show again on the next page load, which is fine.
    }
    const id = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(TOAST_SEEN_KEY, "1");
      } catch {}
      setOpen(true);
    }, 2500);
    return () => window.clearTimeout(id);
  }, [disclaimerAck, skip]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => setOpen(false), TOAST_VISIBLE_MS);
    return () => window.clearTimeout(id);
  }, [open]);

  if (!open || skip) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed right-6 bottom-6 z-40 hidden w-80 animate-rise rounded-3xl border border-line bg-panel p-4 shadow-2xl shadow-black/60 lg:block"
    >
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close"
        className="absolute top-2 right-2 grid size-8 place-items-center rounded-full text-muted transition hover:text-fg active:scale-90"
      >
        <Close width={14} height={14} strokeWidth={3} />
      </button>
      <p className="font-display text-sm font-semibold tracking-widest text-volt uppercase">Better on mobile</p>
      <p className="mt-1 pr-6 font-display text-2xl leading-tight font-extrabold uppercase">Carry on from your phone</p>
      <div className="mt-3 flex items-center gap-4">
        <div className="grid size-28 shrink-0 place-items-center rounded-2xl bg-white p-1.5">
          {qr ? (
            <Image src={qr} alt="QR code that opens this page on your phone" width={100} height={100} unoptimized className="size-24" />
          ) : (
            <span className="text-xs text-ink">…</span>
          )}
        </div>
        <p className="text-sm text-muted">Scan with your phone&apos;s camera. This exact screen opens there.</p>
      </div>
      <button
        type="button"
        onClick={() => void copy()}
        className="mt-3 h-10 w-full rounded-xl border border-line font-semibold transition hover:border-muted active:scale-95"
      >
        {copied ? "Link copied" : "Copy link instead"}
      </button>
    </div>
  );
}

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={26} height={26} fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </svg>
  );
}

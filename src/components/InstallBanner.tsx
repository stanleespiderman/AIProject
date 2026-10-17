"use client";

import Image from "next/image";
import { useHydrated, useStoredState } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";
import { dismissInstall, promptInstall, useInstallMode } from "@/lib/install";
import { Close } from "./icons";

/**
 * A dismissible banner asking people to add WhatNxt to their home screen.
 * Android / Chrome: an Install button opens the browser's own dialog.
 * iPhone / iPad: shows the Share > Add to Home Screen steps.
 * Waits for the first-run safety notice so the two never stack.
 */
export function InstallBanner({ title = "Keep WhatNxt on your home screen", className = "" }: { title?: string; className?: string }) {
  const hydrated = useHydrated();
  const mode = useInstallMode();
  const [disclaimerAck] = useStoredState<boolean>(STORAGE_KEYS.disclaimer, false);

  if (!hydrated || !disclaimerAck || mode === "hidden") return null;

  return (
    <aside
      aria-label="Install WhatNxt"
      className={`relative flex animate-rise items-center gap-3 rounded-3xl border border-line bg-panel p-3 pr-11 ${className}`}
    >
      <Image src="/icons/icon-192.png" alt="" width={48} height={48} className="size-12 shrink-0 rounded-2xl" />
      <div className="min-w-0 flex-1">
        <p className="font-display text-lg leading-tight font-extrabold uppercase">{title}</p>
        {mode === "native" ? (
          <p className="text-sm text-muted">Opens full screen, one tap away.</p>
        ) : (
          <p className="text-sm text-muted">
            Tap <ShareIcon /> then <span className="font-semibold text-fg">Add to Home Screen</span>.
          </p>
        )}
      </div>
      {mode === "native" && (
        <button
          type="button"
          onClick={() => void promptInstall()}
          className="h-10 shrink-0 rounded-xl bg-volt px-4 font-display text-base font-extrabold tracking-wide text-ink uppercase transition active:scale-95"
        >
          Install
        </button>
      )}
      <button
        type="button"
        onClick={dismissInstall}
        aria-label="Not now"
        className="absolute top-1.5 right-1.5 grid size-8 place-items-center rounded-full text-muted transition hover:text-fg active:scale-90"
      >
        <Close width={14} height={14} strokeWidth={3} />
      </button>
    </aside>
  );
}

/** The iOS "share" glyph: a box with an arrow leaving the top. */
function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="the Share button"
      role="img"
      className="inline -translate-y-0.5 text-volt"
    >
      <path d="M12 15V3M8 7l4-4 4 4M6 11H5a1 1 0 00-1 1v8a1 1 0 001 1h14a1 1 0 001-1v-8a1 1 0 00-1-1h-1" />
    </svg>
  );
}

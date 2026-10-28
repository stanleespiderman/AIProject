"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Check } from "@/components/icons";
import { StepHeader } from "@/components/StepHeader";
import { Button, ButtonLink } from "@/components/ui/Button";
import { promptInstall, useInstallContext } from "@/lib/install";
import { useHydrated } from "@/lib/storage";

/**
 * A shareable page (put /install in a bio, a message or a QR code) that shows only the
 * steps that work on the visitor's phone. Browsers never allow a link to add a site to
 * the home screen on its own, so this page walks the person through their device's steps.
 */
export function InstallView() {
  const hydrated = useHydrated();
  const { platform, inApp, standalone, canPrompt } = useInstallContext();

  return (
    <>
      <StepHeader backHref="/" step="Get the app" title={<>Add it to your<br />home screen</>} subtitle="Opens full screen, one tap from your phone. No app store." />

      <div className="flex items-center gap-4 rounded-3xl border border-line bg-panel p-4">
        <Image src="/icons/icon-192.png" alt="" width={64} height={64} className="size-16 shrink-0 rounded-2xl" />
        <div>
          <p className="font-display text-2xl leading-none font-extrabold uppercase">
            What<span className="text-volt">Nxt</span>
          </p>
          <p className="mt-1 text-sm text-muted">Your next set in 10 seconds</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {!hydrated ? (
          <div className="h-40 animate-pulse rounded-3xl border border-line bg-panel" aria-busy="true" />
        ) : standalone ? (
          <Done />
        ) : inApp ? (
          <InAppBrowser platform={platform} />
        ) : platform === "ios" ? (
          <IosSteps />
        ) : platform === "android" ? (
          <AndroidSteps canPrompt={canPrompt} />
        ) : (
          <DesktopHelp canPrompt={canPrompt} />
        )}
      </div>

      <p className="mt-8 text-center text-xs text-muted">
        Free to install. 5 workouts are free. Remove it any time like any other icon.
      </p>
    </>
  );
}

function Done() {
  return (
    <div className="rounded-3xl border border-volt/40 bg-volt/10 p-5">
      <p className="flex items-center gap-2 font-display text-2xl font-extrabold uppercase">
        <Check className="text-volt" /> You&apos;re already using the app
      </p>
      <p className="mt-1 text-sm text-muted">WhatNxt is on your home screen. Nothing more to do.</p>
      <ButtonLink href="/equipment" className="mt-4">
        Pick a workout <ArrowRight />
      </ButtonLink>
    </div>
  );
}

function IosSteps() {
  return (
    <>
      <Step n={1} title="Tap the Share button" detail="The square with an arrow, at the bottom of Safari (top right on iPad).">
        <ShareGlyph />
      </Step>
      <Step n={2} title="Choose “Add to Home Screen”" detail="Scroll down the list if you don't see it.">
        <PlusSquare />
      </Step>
      <Step n={3} title="Tap Add" detail="WhatNxt now sits on your home screen with the green arrows icon.">
        <span className="rounded-xl bg-volt px-4 py-2 text-sm font-bold text-ink">Add</span>
      </Step>
      <p className="rounded-2xl border border-line bg-panel p-4 text-sm text-muted">
        Not seeing Share? Open this page in <span className="font-semibold text-fg">Safari</span> first. It works in Chrome on iOS 16.4 and newer too.
      </p>
      <CopyLink />
    </>
  );
}

function AndroidSteps({ canPrompt }: { canPrompt: boolean }) {
  return (
    <>
      {canPrompt && (
        <div className="rounded-3xl border border-volt/40 bg-volt/10 p-5">
          <p className="font-display text-2xl font-extrabold uppercase">One tap</p>
          <p className="mt-1 text-sm text-muted">Your browser can install it for you.</p>
          <Button className="mt-4" onClick={() => void promptInstall()}>
            Install the app
          </Button>
        </div>
      )}
      <p className={`font-display text-sm font-semibold tracking-widest text-muted uppercase ${canPrompt ? "mt-2" : ""}`}>
        {canPrompt ? "Or by hand" : "How to"}
      </p>
      <Step n={1} title="Open the browser menu" detail="Tap the three dots, at the top right in Chrome.">
        <span className="font-display text-3xl leading-none font-extrabold text-volt" aria-hidden="true">⋮</span>
      </Step>
      <Step n={2} title="Tap “Install app” or “Add to Home screen”" detail="The wording depends on your browser.">
        <PlusSquare />
      </Step>
      <Step n={3} title="Confirm" detail="Tap Install or Add. The icon appears on your home screen.">
        <span className="rounded-xl bg-volt px-4 py-2 text-sm font-bold text-ink">Install</span>
      </Step>
      <CopyLink />
    </>
  );
}

function InAppBrowser({ platform }: { platform: string }) {
  return (
    <>
      <div className="rounded-3xl border border-mid/40 bg-mid/10 p-5">
        <p className="font-display text-2xl font-extrabold uppercase">Open it in your browser first</p>
        <p className="mt-1 text-sm text-fg/90">
          This page is open inside another app (Instagram, Facebook, TikTok...), and those can&apos;t add things to your home screen.
        </p>
      </div>
      <Step n={1} title="Open this page in your browser" detail={platform === "ios" ? "Tap the ••• or the compass icon, then “Open in Safari”." : "Tap the ⋮ or ••• menu, then “Open in Chrome” or “Open in browser”."}>
        <span className="font-display text-3xl leading-none font-extrabold text-volt" aria-hidden="true">↗</span>
      </Step>
      <Step n={2} title="Come back to this page" detail="You'll see the exact steps for your phone.">
        <Check className="text-volt" />
      </Step>
      <p className="text-sm text-muted">Easier: copy the link and paste it into Safari or Chrome.</p>
      <CopyLink />
    </>
  );
}

function DesktopHelp({ canPrompt }: { canPrompt: boolean }) {
  const [qr, setQr] = useState<string | null>(null);

  // The QR library loads only on this branch (desktop visitors).
  useEffect(() => {
    let cancelled = false;
    void import("qrcode")
      .then((m) => m.toDataURL(`${window.location.origin}/install`, { width: 360, margin: 1, color: { dark: "#09090c", light: "#ffffff" } }))
      .then((url) => {
        if (!cancelled) setQr(url);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className="rounded-3xl border border-line bg-panel p-5">
        <p className="font-display text-2xl font-extrabold uppercase">Best on your phone</p>
        <p className="mt-1 text-sm text-muted">Point your phone&apos;s camera at this code to open this page there.</p>
        <div className="mt-4 grid size-44 place-items-center rounded-2xl bg-white p-2">
          {qr ? <Image src={qr} alt="QR code for this page" width={160} height={160} unoptimized className="size-40" /> : <span className="text-xs text-ink">…</span>}
        </div>
      </div>
      {canPrompt && (
        <Button variant="secondary" onClick={() => void promptInstall()}>
          Or install on this computer
        </Button>
      )}
      <CopyLink />
    </>
  );
}

function CopyLink() {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/install`);
      setState("copied");
    } catch {
      setState("failed"); // clipboard blocked: the link is shown so it can be selected by hand
    }
  };
  return (
    <div className="mt-1">
      <Button variant="secondary" size="md" className="w-full" onClick={copy}>
        {state === "copied" ? "Link copied" : "Copy link to this page"}
      </Button>
      {state === "failed" && (
        <p className="mt-2 text-center text-sm text-muted select-all">
          {typeof window !== "undefined" ? `${window.location.origin}/install` : ""}
        </p>
      )}
    </div>
  );
}

function Step({ n, title, detail, children }: { n: number; title: string; detail: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-line bg-panel p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-volt font-display text-xl font-extrabold text-ink">{n}</span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-xl leading-tight font-extrabold uppercase">{title}</p>
        <p className="mt-0.5 text-sm text-muted">{detail}</p>
      </div>
      <div className="grid w-14 shrink-0 place-items-center text-volt">{children}</div>
    </div>
  );
}

function ShareGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={30} height={30} fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-label="Share" role="img">
      <path d="M12 15V3M8 7l4-4 4 4M6 11H5a1 1 0 00-1 1v8a1 1 0 001 1h14a1 1 0 001-1v-8a1 1 0 00-1-1h-1" />
    </svg>
  );
}

function PlusSquare() {
  return (
    <svg viewBox="0 0 24 24" width={26} height={26} fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

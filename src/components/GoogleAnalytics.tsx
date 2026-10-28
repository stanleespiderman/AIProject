"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useHydrated, useStoredState } from "@/lib/storage";

const MEASUREMENT_ID = "G-8T3T8W6BGY";
const CONSENT_KEY = "whatnxt-google-analytics-consent";
const PUBLIC_PAGES: Record<string, string> = {
  "/": "Home",
  "/equipment": "Equipment",
  "/muscle": "Muscle",
  "/level": "Level",
  "/results": "Results",
  "/install": "Install",
};

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  whatnxtGaReady?: boolean;
  [key: `ga-disable-${string}`]: boolean;
};

/** Optional, consent-gated measurement. Never send query strings or account data. */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useStoredState<string | null>(CONSENT_KEY, null);
  const hydrated = useHydrated();
  const ready = hydrated && ["whatnxt.me", "www.whatnxt.me"].includes(window.location.hostname);
  const [showSettings, setShowSettings] = useState(false);
  const allowedPage = Object.hasOwn(PUBLIC_PAGES, pathname);

  useEffect(() => {
    if (!ready) return;
    const w = window as unknown as AnalyticsWindow;
    if (consent !== "granted" || !allowedPage) {
      w[`ga-disable-${MEASUREMENT_ID}`] = true;
      return;
    }
    const page = {
      page_location: `https://www.whatnxt.me${pathname}`,
      page_title: `WhatNxt | ${PUBLIC_PAGES[pathname]}`,
      page_referrer: "",
    };
    w[`ga-disable-${MEASUREMENT_ID}`] = false;
    if (!w.whatnxtGaReady) {
      w.dataLayer = w.dataLayer || [];
      // Google's queue uses the native arguments object.
      // eslint-disable-next-line prefer-rest-params
      w.gtag = function () { w.dataLayer!.push(arguments); };
      w.gtag("consent", "default", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      w.gtag("js", new Date());
      w.gtag("config", MEASUREMENT_ID, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        ...page,
      });
      const script = document.createElement("script");
      script.id = "whatnxt-google-analytics";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
      document.head.appendChild(script);
      w.whatnxtGaReady = true;
    }
    // Update global values too, so automatic engagement events cannot inherit raw URLs.
    w.gtag?.("set", page);
    w.gtag?.("event", "page_view", { ...page, send_to: MEASUREMENT_ID });
  }, [ready, consent, pathname, allowedPage]);

  function choose(value: "granted" | "denied") {
    setConsent(value);
    setShowSettings(false);
    if (value === "denied") {
      const w = window as unknown as AnalyticsWindow;
      w[`ga-disable-${MEASUREMENT_ID}`] = true;
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.split("=")[0].trim();
        if (name === "_ga" || name.startsWith("_ga_")) {
          for (const domain of ["", "; domain=whatnxt.me", "; domain=.whatnxt.me", `; domain=${window.location.hostname}`]) {
            document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
          }
        }
      }
      if (w.whatnxtGaReady) window.location.reload();
    }
  }

  if (!ready || !allowedPage) return null;
  return (
    <aside aria-label="Google Analytics preferences" className="mx-auto w-full max-w-md px-4 pb-5 lg:max-w-5xl text-xs leading-relaxed text-muted">
      {consent === null || showSettings ? (
        <div className="rounded-2xl border border-line bg-panel p-4">
          <p className="font-semibold text-fg">Optional Google Analytics</p>
          <p className="mt-2">Google Analytics helps us understand visits. If you allow it, Google receives a cookie ID and basic usage data. We don&apos;t send your exercise selections or account details. Optional analytics stays off until you allow it.</p>
          <p className="mt-2">Your choice is saved on this device. You can change it here at any time. <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline">Google privacy policy</a>.</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="button" className="rounded-xl bg-volt px-4 py-2 font-semibold text-ink" onClick={() => choose("granted")}>Allow analytics</button>
            <button type="button" className="rounded-xl border border-line px-4 py-2 text-fg" onClick={() => choose("denied")}>No thanks</button>
          </div>
        </div>
      ) : (
        <button type="button" className="underline" onClick={() => setShowSettings(true)}>Google Analytics preferences</button>
      )}
    </aside>
  );
}

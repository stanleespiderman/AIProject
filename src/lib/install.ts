"use client";

import { useSyncExternalStore } from "react";
import { STORAGE_KEYS } from "./constants";
import { readJSON, writeJSON } from "./storage";

/**
 * "Add to home screen" state.
 *  - Android / desktop Chrome fire `beforeinstallprompt`; we keep the event and call it from our own button.
 *  - iOS Safari has no such event, so we show the manual steps (Share > Add to Home Screen).
 *  - Nothing shows when already installed or after the user dismissed it.
 */
export type InstallMode = "hidden" | "native" | "ios";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/** Shown again this many days after a dismissal. */
const DISMISS_DAYS = 30;

let deferred: BeforeInstallPromptEvent | null = null;
let installed = false;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

// Registered as soon as this module loads (InstallBoot imports it from the layout),
// because the browser fires the event once and only once per page load.
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as BeforeInstallPromptEvent;
    notify();
  });
  window.addEventListener("appinstalled", () => {
    installed = true;
    deferred = null;
    notify();
  });
}

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIOS(): boolean {
  const ua = navigator.userAgent;
  // iPadOS reports itself as a Mac, so also check for touch.
  return /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function dismissedRecently(): boolean {
  const at = readJSON<number | null>(STORAGE_KEYS.installDismissed, null);
  return at !== null && Date.now() - at < DISMISS_DAYS * 24 * 60 * 60 * 1000;
}

function getMode(): InstallMode {
  if (installed || isStandalone() || dismissedRecently()) return "hidden";
  if (deferred) return "native";
  if (isIOS()) return "ios";
  return "hidden";
}

export type Platform = "ios" | "android" | "desktop";

export interface InstallContext {
  platform: Platform;
  /** Opened inside Instagram, Facebook, TikTok etc., where installing isn't possible. */
  inApp: boolean;
  /** Already running as an installed app. */
  standalone: boolean;
  /** The browser has offered its install dialog (Android / desktop Chrome). */
  canPrompt: boolean;
}

function detectPlatform(): Platform {
  if (isIOS()) return "ios";
  return /Android/i.test(navigator.userAgent) ? "android" : "desktop";
}

function isInAppBrowser(): boolean {
  return /FBAN|FBAV|FB_IAB|Instagram|Line\/|Twitter|TikTok|musical_ly|Snapchat|MicroMessenger|LinkedInApp|Pinterest|; wv\)/i.test(navigator.userAgent);
}

/** One string so useSyncExternalStore sees a stable snapshot between changes. */
function contextKey(): string {
  return [detectPlatform(), isInAppBrowser() ? 1 : 0, installed || isStandalone() ? 1 : 0, deferred ? 1 : 0].join(":");
}

/** The device and browser, for the /install page. Ignores dismissals. Server and first render say "desktop". */
export function useInstallContext(): InstallContext {
  const key = useSyncExternalStore(subscribe, contextKey, () => "desktop:0:0:0");
  const [platform, inApp, standalone, canPrompt] = key.split(":");
  return { platform: platform as Platform, inApp: inApp === "1", standalone: standalone === "1", canPrompt: canPrompt === "1" };
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useInstallMode(): InstallMode {
  return useSyncExternalStore(subscribe, getMode, () => "hidden" as InstallMode);
}

/** Opens the browser's install dialog (Android / desktop Chrome). */
export async function promptInstall(): Promise<void> {
  if (!deferred) return;
  const event = deferred;
  deferred = null; // the event can only be used once
  await event.prompt();
  const { outcome } = await event.userChoice;
  if (outcome === "dismissed") dismissInstall();
  notify();
}

/** Hide the banner for DISMISS_DAYS. */
export function dismissInstall(): void {
  writeJSON(STORAGE_KEYS.installDismissed, Date.now());
  notify();
}

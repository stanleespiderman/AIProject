"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * Tiny typed wrapper around localStorage.
 * - Every access is try/catch'd (private mode, blocked storage, SSR).
 * - Writes notify subscribers in this tab, so hooks re-render instantly.
 */

const CHANGE_EVENT = "whatnext:storage";

export function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function readJSON<T>(key: string, fallback: T): T {
  const raw = readRaw(key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable: the app still works, it just won't remember.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: key }));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange); // other tabs
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * React hook for a JSON value in localStorage.
 * Renders `fallback` on the server and during hydration, then the stored value.
 */
export function useStoredState<T>(
  key: string,
  fallback: T,
): [T, (next: T) => void] {
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(key),
    () => null,
  );

  const value = useMemo<T>(() => {
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
    // `fallback` is often an inline literal; only the stored string matters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw]);

  const set = useCallback((next: T) => writeJSON(key, next), [key]);
  return [value, set];
}

const noopSubscribe = () => () => {};

/** False on the server and during hydration, true once running in the browser. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

"use client";

import { STORAGE_KEYS } from "../constants";
import { readJSON, useStoredState, writeJSON } from "../storage";
import { isPro, useIsPro } from "./index";

/** Free shuffles per calendar day (user's local time). */
export const FREE_SHUFFLES_PER_DAY = 3;

interface ShuffleUsage {
  date: string; // YYYY-MM-DD, local
  count: number;
}

function today(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function usedToday(usage: ShuffleUsage | null): number {
  return usage && usage.date === today() ? usage.count : 0;
}

/**
 * Tries to spend one shuffle. Returns false when the free quota is used up
 * (the caller should send the user to /unlock). Pro users are never limited.
 */
export function consumeShuffle(): boolean {
  if (isPro()) return true;
  const used = usedToday(readJSON<ShuffleUsage | null>(STORAGE_KEYS.shuffles, null));
  if (used >= FREE_SHUFFLES_PER_DAY) return false;
  writeJSON<ShuffleUsage>(STORAGE_KEYS.shuffles, { date: today(), count: used + 1 });
  return true;
}

/** Remaining free shuffles today; `Infinity` for Pro users. */
export function useShufflesLeft(): number {
  const pro = useIsPro();
  const [usage] = useStoredState<ShuffleUsage | null>(STORAGE_KEYS.shuffles, null);
  if (pro) return Infinity;
  return Math.max(FREE_SHUFFLES_PER_DAY - usedToday(usage), 0);
}

"use client";

import { startedSessionCount, useDb } from "../db";
import { isPro, useIsPro } from "./index";

/** Workout sessions a free user can start, in total (not per day). */
export const FREE_SESSIONS = 5;

/** True if the user may start another session. Pro users are never limited. */
export function canStartSession(): boolean {
  return isPro() || startedSessionCount() < FREE_SESSIONS;
}

/** Free sessions not yet started; `Infinity` for Pro users. */
export function useFreeSessionsLeft(): number {
  const pro = useIsPro();
  const started = useDb().sessions.length;
  if (pro) return Infinity;
  return Math.max(FREE_SESSIONS - started, 0);
}

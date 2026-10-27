"use client";

/**
 * ─── WORKOUT DATABASE ────────────────────────────────────────────
 * The only module that knows where sessions and exercise logs are
 * stored (localStorage today). To move to a server database, re-implement
 * these exports against an API; nothing else needs to change.
 * ─────────────────────────────────────────────────────────────────
 */

import { STORAGE_KEYS } from "../constants";
import { readJSON, useStoredState, writeJSON } from "../storage";
import { DB_VERSION, type Database, type WorkoutSession } from "./schema";

export type { Database, ExerciseLog, WorkoutSession } from "./schema";

const EMPTY: Database = { version: DB_VERSION, sessions: [] };

function migrate(db: Database): Database {
  // Add a step here when DB_VERSION goes up, e.g. `if (db.version < 2) { ... }`.
  return Array.isArray(db?.sessions) ? db : EMPTY;
}

export function readDb(): Database {
  return migrate(readJSON<Database>(STORAGE_KEYS.db, EMPTY));
}

/** Read, change, write. Return the updated database from `fn`. */
export function updateDb(fn: (db: Database) => Database): Database {
  const next = fn(readDb());
  writeJSON<Database>(STORAGE_KEYS.db, next);
  return next;
}

export function newId(): string {
  // randomUUID needs a secure context; plain http on a LAN (phone testing) doesn't have one.
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function findActiveSession(db: Database): WorkoutSession | null {
  const last = db.sessions.at(-1);
  return last && last.endedAt === null ? last : null;
}

/** Every session the user has ever started, including the live one. */
export function startedSessionCount(): number {
  return readDb().sessions.length;
}

export function useDb(): Database {
  const [db] = useStoredState<Database>(STORAGE_KEYS.db, EMPTY);
  return migrate(db);
}

export function useActiveSession(): WorkoutSession | null {
  return findActiveSession(useDb());
}

/** Newest first. */
export function useSessionHistory(): WorkoutSession[] {
  return [...useDb().sessions].reverse();
}

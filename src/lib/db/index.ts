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

/** A UUID v4 (the server tables use uuid ids). */
export function newId(): string {
  // randomUUID needs a secure context; plain http on a LAN (phone testing) doesn't have one.
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

export function isUuid(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

/** A session left open longer than this is closed automatically. */
export const SESSION_MAX_HOURS = 3;
export const SESSION_MAX_MS = SESSION_MAX_HOURS * 60 * 60 * 1000;

/**
 * Only the newest session may be live. After merging sessions from two
 * devices, close any older one still open (at its time limit, or when the
 * next session started, whichever is first). Expects oldest-first order.
 */
export function closeOrphanedSessions(sessions: WorkoutSession[]): WorkoutSession[] {
  return sessions.map((s, i) => {
    const next = sessions[i + 1];
    if (s.endedAt !== null || !next) return s;
    const end = Math.min(Date.parse(s.startedAt) + SESSION_MAX_MS, Date.parse(next.startedAt));
    return { ...s, endedAt: new Date(end).toISOString(), endReason: "timeout" };
  });
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

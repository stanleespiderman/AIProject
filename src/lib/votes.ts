"use client";

import { STORAGE_KEYS } from "./constants";
import { readJSON, useStoredState } from "./storage";
import type { Vote, VoteMap } from "./types";

const EMPTY: VoteMap = {};

export function readVotes(): VoteMap {
  return readJSON<VoteMap>(STORAGE_KEYS.votes, EMPTY);
}

/** Thumbs up/down per exercise id. Tapping the same vote again clears it. */
export function useVotes() {
  const [votes, setVotes] = useStoredState<VoteMap>(STORAGE_KEYS.votes, EMPTY);

  const toggle = (id: string, vote: Vote) => {
    const next = { ...votes };
    if (next[id] === vote) delete next[id];
    else next[id] = vote;
    setVotes(next);
  };

  return { votes, toggle };
}

"use client";

import { useEffect } from "react";
import { initAccount } from "@/lib/account";

/** Starts Supabase Auth once per page load: restores the session, syncs purchases and history. */
export function AccountSync() {
  useEffect(() => {
    initAccount();
  }, []);
  return null;
}

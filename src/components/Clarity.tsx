"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PROJECT_ID = "z4c46g2dam";
/** Never recorded: account details and what people type into feedback. */
const PRIVATE_PATHS = ["/account", "/feedback"];

type ClarityWindow = Window & { clarity?: ((...args: unknown[]) => void) & { q?: unknown[] } };

/**
 * Microsoft Clarity session recording on whatnxt.me, paused on private pages.
 * Checked on every in-app navigation, not just the first page load, so moving
 * from the results to the account page stops the recording.
 */
export function Clarity() {
  const pathname = usePathname();

  useEffect(() => {
    if (!["whatnxt.me", "www.whatnxt.me"].includes(window.location.hostname)) return;
    const isPrivate = PRIVATE_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
    const w = window as ClarityWindow;

    if (w.clarity) {
      w.clarity(isPrivate ? "stop" : "start");
      return;
    }
    // Load only once someone is on a public page, so a visit that starts on /account is never recorded.
    if (isPrivate) return;
    const queue: unknown[] = [];
    w.clarity = Object.assign((...args: unknown[]) => void queue.push(args), { q: queue });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${PROJECT_ID}`;
    document.head.appendChild(script);
  }, [pathname]);

  return null;
}

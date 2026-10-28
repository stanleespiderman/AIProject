"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** The pick-and-lift flow gets a wider canvas on desktop. Forms and the paywall stay a phone-width column. */
const WIDE_ON_DESKTOP = new Set(["/", "/equipment", "/muscle", "/level", "/results"]);

export function AppShell({ children }: { children: ReactNode }) {
  const wide = WIDE_ON_DESKTOP.has(usePathname());
  return (
    <div className={`mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 ${wide ? "lg:max-w-5xl" : ""}`}>
      {children}
    </div>
  );
}

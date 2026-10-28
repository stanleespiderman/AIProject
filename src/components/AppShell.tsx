import type { ReactNode } from "react";

/** A phone-width column that opens up to a wider canvas on desktop. */
export function AppShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 lg:max-w-5xl">{children}</div>;
}

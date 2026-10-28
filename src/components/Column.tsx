import type { ReactNode } from "react";

/** Forms and single-purpose screens: a centred, readable column on desktop instead of stretching across the page. */
export function Column({ children }: { children: ReactNode }) {
  return <div className="mx-auto flex w-full flex-1 flex-col lg:max-w-xl">{children}</div>;
}

import type { ReactNode } from "react";

/**
 * Primary actions pinned to the bottom of the screen, within thumb reach.
 * Sticky (not fixed) so it never covers the footer at the end of the page.
 */
export function BottomBar({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 mt-auto bg-gradient-to-t from-ink from-70% to-transparent px-4 pt-6 pb-[max(1rem,env(safe-area-inset-bottom))]">
      {children}
    </div>
  );
}

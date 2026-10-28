"use client";

import Image from "next/image";
import { useQr } from "@/lib/qr";
import { useHydrated } from "@/lib/storage";

/** Desktop-only card on the home screen: a phone-shaped frame with a QR code to open the app on a phone. */
export function PhonePanel() {
  const hydrated = useHydrated();
  const qr = useQr(hydrated, () => window.location.origin, 320, []);

  return (
    <aside
      aria-label="Open WhatNxt on your phone"
      className="hidden w-full max-w-xs flex-col items-center justify-self-center rounded-[2.75rem] border-2 border-line bg-panel px-7 pt-4 pb-9 text-center lg:flex"
    >
      <span className="mb-7 h-1.5 w-16 rounded-full bg-line" aria-hidden="true" />
      <p className="font-display text-sm font-semibold tracking-widest text-volt uppercase">Built for mobile</p>
      <p className="mt-1 font-display text-4xl leading-[0.95] font-extrabold uppercase italic">Best on your phone</p>
      <div className="mt-6 grid size-48 place-items-center rounded-3xl bg-white p-3">
        {qr ? (
          <Image src={qr} alt="QR code that opens WhatNxt on your phone" width={168} height={168} unoptimized className="size-42" />
        ) : (
          <span className="text-xs text-ink">…</span>
        )}
      </div>
      <p className="mt-5 text-sm text-muted">Point your camera here. It&apos;s made for one hand, between sets.</p>
      <p className="mt-3 text-xs text-muted">Or carry on here. Everything works on desktop too.</p>
    </aside>
  );
}

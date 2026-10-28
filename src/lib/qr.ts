"use client";

import { useEffect, useState } from "react";

/**
 * A QR code (PNG data URL) for `url()`, or null while it loads. The library is only
 * fetched when `enabled` is true, so phone visitors never download it.
 * `url` is read in the browser each time `deps` change, e.g. the current route.
 */
export function useQr(enabled: boolean, url: () => string, size: number, deps: unknown[]): string | null {
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    void import("qrcode")
      .then((m) => m.toDataURL(url(), { width: size, margin: 1, color: { dark: "#09090c", light: "#ffffff" } }))
      .then((dataUrl) => {
        if (!cancelled) setQr(dataUrl);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
    // `url` and `size` are inline values; the caller lists what actually changes them.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);

  return qr;
}

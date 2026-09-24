import { DISCLAIMER } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-line py-6 text-xs leading-relaxed text-muted">
      <p>
        <strong className="font-semibold text-fg">Heads up:</strong> {DISCLAIMER}
      </p>
      <p className="mt-2 opacity-70">© {new Date().getFullYear()} WhatNext?</p>
    </footer>
  );
}

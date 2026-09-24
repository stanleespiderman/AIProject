import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronLeft } from "./icons";

interface StepHeaderProps {
  backHref: string;
  step?: string;
  title: ReactNode;
  subtitle?: ReactNode;
}

export function StepHeader({ backHref, step, title, subtitle }: StepHeaderProps) {
  return (
    <header className="pt-4 pb-6">
      <div className="flex items-center justify-between">
        <Link
          href={backHref}
          aria-label="Back"
          className="-ml-2 grid size-12 place-items-center rounded-full text-muted transition hover:text-fg active:scale-90"
        >
          <ChevronLeft />
        </Link>
        {step && (
          <span className="font-display text-sm font-semibold tracking-widest text-muted uppercase">
            {step}
          </span>
        )}
      </div>
      <h1 className="mt-2 font-display text-5xl leading-[0.9] font-extrabold uppercase italic">{title}</h1>
      {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
    </header>
  );
}

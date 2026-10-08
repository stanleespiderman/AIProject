import type { ReactNode } from "react";
import type { Exercise } from "@/lib/types";
import { Check } from "./icons";

/**
 * The detailed form guidance for a card, tucked into a native <details> so the card stays
 * glanceable: closed = one tap target; open = setup, execution, breathing, mistakes, safety.
 */
export function HowToDoIt({ exercise }: { exercise: Exercise }) {
  const { setup, execution } = exercise;
  if (!setup?.length || !execution?.length) return null;

  const {
    muscles,
    equipmentDetail,
    breathing,
    commonMistakes,
    safety,
    rest,
    easierOption,
    harderOption,
    reviewStatus,
  } = exercise;

  return (
    <details className="group mt-4 rounded-2xl border border-line bg-panel-2/60">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 font-display text-lg font-extrabold tracking-wide uppercase [&::-webkit-details-marker]:hidden">
        How to do it
        <svg
          viewBox="0 0 24 24"
          width={20}
          height={20}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="shrink-0 text-volt transition group-open:rotate-180"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>

      <div className="space-y-5 px-4 pt-1 pb-5 text-[15px] leading-snug">
        {reviewStatus !== "approved" && (
          <p className="rounded-xl border border-mid/40 bg-mid/10 px-3 py-2 text-xs text-fg/90">
            Guidance pending trainer review. Use a weight you can control.
          </p>
        )}

        {equipmentDetail && (
          <Section title="What you need">
            <p>{capitalise(equipmentDetail)}</p>
          </Section>
        )}

        <Section title="Set up">
          <Steps items={setup} />
        </Section>

        <Section title="Do it">
          <Steps items={execution} />
        </Section>

        {breathing && (
          <Section title="Breathing">
            <p>{breathing}</p>
          </Section>
        )}

        {commonMistakes && commonMistakes.length > 0 && (
          <Section title="Avoid this">
            <ul className="space-y-2">
              {commonMistakes.map((m, i) => (
                <li key={`${i}-${m.mistake}`} className="flex gap-3">
                  <span className="mt-0.5 font-bold text-heat" aria-hidden="true">
                    ×
                  </span>
                  <span>
                    <span className="font-semibold">{m.mistake}</span>
                    <span className="text-muted">: {m.fix}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {safety && safety.length > 0 && (
          <Section title="Stay safe">
            <ul className="space-y-2">
              {safety.map((note, i) => (
                <li key={`${i}-${note}`} className="flex gap-3">
                  <Check width={16} height={16} className="mt-0.5 shrink-0 text-volt" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {(muscles || rest || easierOption || harderOption) && (
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-line pt-4 text-sm">
            {muscles && (
              <>
                <dt className="text-muted">Muscles</dt>
                <dd>
                  <span className="font-semibold">{muscles.primary.join(", ")}</span>
                  {muscles.secondary.length > 0 && (
                    <span className="text-muted"> · also {muscles.secondary.join(", ")}</span>
                  )}
                </dd>
              </>
            )}
            {rest && (
              <>
                <dt className="text-muted">Rest</dt>
                <dd>{rest}</dd>
              </>
            )}
            {easierOption && (
              <>
                <dt className="text-muted">Easier</dt>
                <dd>{easierOption}</dd>
              </>
            )}
            {harderOption && (
              <>
                <dt className="text-muted">Harder</dt>
                <dd>{harderOption}</dd>
              </>
            )}
          </dl>
        )}
      </div>
    </details>
  );
}

/** The data writes some phrases in lower case ("a bench or box…"); show them as sentences. */
function capitalise(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 text-xs font-semibold tracking-widest text-volt uppercase">{title}</h3>
      {children}
    </section>
  );
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2">
      {items.map((step, i) => (
        <li key={`${i}-${step}`} className="flex gap-3">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-line text-xs font-bold">
            {i + 1}
          </span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}

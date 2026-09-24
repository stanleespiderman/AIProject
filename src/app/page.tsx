import { BottomBar } from "@/components/BottomBar";
import { ArrowRight } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { EXERCISES } from "@/data/exercises";

const steps = [
  { n: "01", label: "Pick your kit" },
  { n: "02", label: "Pick a muscle" },
  { n: "03", label: "Lift" },
];

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-between pt-6">
        <span className="font-display text-xl font-extrabold tracking-wide uppercase italic">
          What<span className="text-volt">Next?</span>
        </span>
        <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
          {EXERCISES.length}+ moves
        </span>
      </div>

      <section className="flex flex-1 flex-col justify-center py-10">
        <p className="inline-block w-fit -skew-x-12 bg-volt px-2 font-display text-sm font-extrabold tracking-widest text-ink uppercase">
          No signup. No plan needed.
        </p>
        <h1 className="mt-5 font-display text-[4.25rem] leading-[0.85] font-extrabold uppercase italic">
          Bored
          <br />
          mid-
          <br />
          workout?
        </h1>
        <p className="mt-6 text-xl leading-snug text-fg/90">
          Get your next set in <span className="font-semibold text-volt">10 seconds.</span>
        </p>

        <ol className="mt-10 grid grid-cols-3 gap-2">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-line bg-panel p-3">
              <span className="font-display text-2xl font-extrabold text-volt italic">{s.n}</span>
              <p className="mt-1 text-sm leading-tight text-muted">{s.label}</p>
            </li>
          ))}
        </ol>
      </section>

      <BottomBar>
        <ButtonLink href="/equipment">
          Start
          <ArrowRight />
        </ButtonLink>
      </BottomBar>
    </>
  );
}

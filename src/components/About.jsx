import SlideIn from "./ui/SlideIn";
import ScrollTypedText from "./ui/ScrollTypedText";
import AnimatedCounter from "./ui/AnimatedCounter";
import SplitText from "./ui/SplitText";
import FloatingWatermark from "./ui/FloatingWatermark";

const STATS = [
  { label: "Completed Builds", value: 5, suffix: "+" },
  { label: "Credentials & Awards", value: 6, suffix: "" },
  { label: "Year Engineering Focus", value: 1, suffix: " yr" },
];

const FACTS = [
  { k: "Primary Focus", v: "Laravel APIs & React Architecture" },
  { k: "Core Database", v: "MySQL, Relational Schema & Indexing" },
  { k: "Styling & Motion", v: "Tailwind CSS & Framer Motion" },
  { k: "Creative Tools", v: "Figma, Adobe Lightroom, Unity" },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-32 sm:px-10">
      <FloatingWatermark text="CRAFTSMAN" direction="left" speed={0.35} />

      <div className="relative z-10 grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* Left column: Bio & Typed Text */}
        <SlideIn direction="left">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
            About
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] text-fg sm:text-4xl">
            <SplitText text="Engineering Modern Web Products" />
          </h2>

          <div className="mt-6">
            <ScrollTypedText
              text="Saya adalah Rendra Gadhing — seorang junior developer berdedikasi yang fokus merancang skema API Laravel yang kokoh serta antarmuka React yang interaktif, bersih, dan cepat. Senang membedah logika database, optimasi query, dan menghadirkan pengalaman pengguna yang mulus."
              className="text-[15px] text-fg-muted"
            />
          </div>

          {/* Metric counters */}
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-semibold text-fg sm:text-3xl">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-fg-dim">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </SlideIn>

        {/* Right column: Technical Facts Card */}
        <SlideIn direction="right" delay={0.3}>
          <div className="rounded-xl border border-line bg-bg-900/40 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="font-mono text-[11px] uppercase tracking-widest text-fg-soft">
                Profile Specifications
              </span>
              <span className="font-mono text-[11px] text-accent">
                02 // SPECS
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {FACTS.map((f) => (
                <div
                  key={f.k}
                  className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-4 last:border-0 last:pb-0"
                >
                  <span className="font-mono text-[12px] text-fg-muted">{f.k}</span>
                  <span className="text-right font-mono text-[12px] text-fg-soft font-medium">
                    {f.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SlideIn>
      </div>
    </section>
  );
}

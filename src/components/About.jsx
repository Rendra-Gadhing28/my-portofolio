import { motion } from "framer-motion";

const FACTS = [
  { k: "focus", v: "Laravel + React products" },
  { k: "experience", v: "1 year experience using Laravel" },
  { k : "another experience", v: "1 year experience with Lightroom" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28 sm:px-10 sm:py-36">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg-muted">
            <span className="text-fg-dim">// </span>about
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-fg sm:text-4xl">
            Seorang junior developer
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-fg-muted">
            Saya adalah Rendra Gadhing — seorang junior developer back-end / front-end yang menghabiskan sebagian besar waktu membuat schema API Laravel dan interface React.
            
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
          className="rounded-2xl border border-line bg-bg-900/40 p-6 font-mono text-[13px] sm:p-8"
        >
          <p className="text-fg-dim">
            <span className="text-signal">$</span> whoami --verbose
          </p>
          <div className="mt-5 space-y-3.5">
            {FACTS.map((f, i) => (
              <motion.div
                key={f.k}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-baseline justify-between gap-4 border-b border-line/70 pb-3.5 last:border-0 last:pb-0"
              >
                <span className="text-fg-dim">{f.k}</span>
                <span className="text-right text-fg-soft">{f.v}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

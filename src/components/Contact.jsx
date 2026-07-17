import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/rendra-gadhing28" },
  { label: "Instagram", href: "https://instagram.com/rendra_gadhing28" },
  { label: "Whatsapp", href: "https://wa.me/62895366900501" },
];

export default function Contact() {
  return (
    <footer id="contact" className="mx-auto max-w-6xl px-6 pb-16 pt-4 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="rounded-3xl border border-line bg-bg-900/40 px-8 py-16 text-center sm:px-16 sm:py-24"
      >
        <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg-muted">
          <span className="text-fg-dim">// </span>get in touch
        </p>
        <h2 className="mx-auto mt-6 max-w-lg font-display text-3xl font-medium tracking-tight text-fg sm:text-5xl">
          Have something worth building?
        </h2>
        <p className="mx-auto mt-5 max-w-sm text-[15px] leading-relaxed text-fg-muted">
          I take on a small number of freelance and contract projects each
          quarter. If the timing's right, let's talk.
        </p>

        <div className="mt-10 flex justify-center">
          <MagneticButton href="mailto:hello@gadhingrendra@gmail.com">
            hello@gadhingrendra@gmail.com
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 11L11 3M11 3H4.5M11 3V9.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MagneticButton>
        </div>
      </motion.div>

      <div className="mt-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-mono text-[11px] tracking-wide text-fg-dim">
          © 2026 Rendra Gadhing — built with React, Tailwind, Lenis &amp; Motion
        </p>
        <div className="flex items-center gap-6">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted transition-colors duration-300 hover:text-accent-soft"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

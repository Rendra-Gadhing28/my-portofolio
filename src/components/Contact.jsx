import SlideIn from "./ui/SlideIn";
import ScrollTypedText from "./ui/ScrollTypedText";
import SplitText from "./ui/SplitText";
import MagneticButton from "./MagneticButton";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/rendra-gadhing28" },
  { label: "Instagram", href: "https://www.instagram.com/hey_you_whats_up_bung?igsh=MTV6am14enZmeHJwZA==" },
  { label: "WhatsApp", href: "https://wa.me/62895366900501" },
];

export default function Contact() {
  return (
    <footer id="contact" className="mx-auto max-w-6xl px-6 pt-8 pb-24 sm:px-10">
      <SlideIn direction="up" delay={0.15}>
        <div className="rounded-2xl border border-line bg-bg-900/40 px-8 py-16 text-center sm:px-16 sm:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
            Get in Touch
          </p>

          <h2 className="mx-auto mt-6 max-w-lg font-display text-3xl font-semibold tracking-[-0.02em] text-fg sm:text-5xl">
            <SplitText text="Have something worth building?" />
          </h2>

          <div className="mx-auto mt-5 max-w-md">
            <ScrollTypedText
              text="Terbuka untuk kolaborasi proyek freelance, pembuatan aplikasi web full-stack, maupun diskusi arsitektur sistem. Mari hubungi saya untuk konsultasi ide Anda."
              className="text-[15px] text-fg-muted"
            />
          </div>

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
        </div>
      </SlideIn>

      {/* Clean Signature Footer */}
      <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-line pt-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-mono text-[12px] text-fg-soft">
            &copy; 2026 Rendra Gadhing
          </p>
          <p className="mt-1 font-mono text-[11px] text-fg-dim">
            Built with React, Tailwind &amp; Motion
          </p>
        </div>

        <div className="flex items-center gap-6">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted transition-colors duration-200 hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

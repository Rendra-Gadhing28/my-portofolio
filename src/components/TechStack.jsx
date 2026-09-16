import LogoLoop from "./logo/LogoLoop";
import SplitText from "./ui/SplitText";

export default function TechStack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <div className="mb-8 flex items-center justify-between border-b border-line pb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
          Technologies &amp; Tools
        </p>
        <span className="font-mono text-[11px] tracking-widest text-fg-dim">
          01 // STACK
        </span>
      </div>
      <LogoLoop />
    </section>
  );
}

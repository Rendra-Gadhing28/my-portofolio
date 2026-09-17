import { motion, useTransform } from "framer-motion";

const FRAMES = [
  { title: "KASIR GO (POS)", tag: "React POS App", year: "2026" },
  { title: "SIJAR INVENTORY", tag: "Laravel + React", year: "2026" },
  { title: "AL-MUQODDAS", tag: "React Platform", year: "2026" },
  { title: "YALIA SALON", tag: "Interactive Web", year: "2026" },
  { title: "GARDEN PALACE", tag: "Unity 2D Engine", year: "2025" },
  { title: "TECHCOMFEST", tag: "UI/UX Finalist", year: "2026" },
  { title: "WADHWANI IGNITE", tag: "Venture Idea", year: "2026" },
  { title: "SYSTEM ARCHITECTURE", tag: "Database & API", year: "2026" },
];

export default function FilmStrip({ progress }) {
  // Translate film strip from 0% to -65% as progress goes from 0 to 1
  const x = useTransform(progress, [0, 1], ["5%", "-68%"]);
  const scale = useTransform(progress, [0, 0.8, 1], [1, 1, 1.08]);

  return (
    <motion.div
      style={{ scale }}
      className="relative flex w-full items-center justify-center overflow-hidden py-6"
    >
      <motion.div
        style={{ x }}
        className="flex items-center gap-5 whitespace-nowrap pl-10"
      >
        {FRAMES.map((item, idx) => (
          <div
            key={idx}
            className="group relative flex h-[190px] w-[260px] sm:h-[220px] sm:w-[320px] flex-shrink-0 flex-col justify-between rounded-md border border-line-strong bg-bg-900 p-4 shadow-xl select-none"
          >
            {/* Top sprocket perforation holes */}
            <div className="flex justify-between border-b border-line pb-2.5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-2.5 w-3.5 rounded-sm bg-bg-950 border border-line"
                />
              ))}
            </div>

            {/* Frame content */}
            <div className="my-auto py-2">
              <span className="font-mono text-[10px] tracking-widest text-accent uppercase">
                {item.year} // FRAME 0{idx + 1}
              </span>
              <h4 className="mt-1 font-display text-base font-semibold tracking-tight text-fg sm:text-lg">
                {item.title}
              </h4>
              <p className="mt-1 font-mono text-[11px] text-fg-muted">
                {item.tag}
              </p>
            </div>

            {/* Bottom sprocket perforation holes */}
            <div className="flex justify-between border-t border-line pt-2.5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-2.5 w-3.5 rounded-sm bg-bg-950 border border-line"
                />
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

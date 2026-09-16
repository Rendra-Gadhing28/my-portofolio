import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_CINEMATIC } from "../../constants/animation";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1200; // 1.2s smooth initial loading

    const update = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(update);
      } else {
        setTimeout(() => {
          onComplete?.();
        }, 250);
      }
    };

    const frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE_CINEMATIC } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-950 px-6 font-mono select-none"
    >
      <div className="w-full max-w-xs space-y-4">
        <div className="flex items-center justify-between text-xs tracking-widest text-fg-muted uppercase">
          <span>Loading</span>
          <span className="text-fg tabular-nums">{progress}%</span>
        </div>
        <div className="h-[1px] w-full overflow-hidden bg-line">
          <motion.div
            className="h-full bg-accent"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

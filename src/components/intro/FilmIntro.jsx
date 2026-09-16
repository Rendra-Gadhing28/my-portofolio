import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import FilmStrip from "./FilmStrip";
import { EASE_CINEMATIC } from "../../constants/animation";

export default function FilmIntro({ onFinish }) {
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { damping: 28, stiffness: 140, mass: 0.5 });
  const [completed, setCompleted] = useState(false);
  const accumulatedDelta = useRef(0);
  const targetThreshold = 900; // Scroll distance to complete intro

  // Split curtain translations
  const leftCurtainX = useTransform(smoothProgress, [0, 0.4, 1], ["0%", "-35%", "-100%"]);
  const rightCurtainX = useTransform(smoothProgress, [0, 0.4, 1], ["0%", "35%", "100%"]);
  const filmOpacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.2, 1, 1, 0]);
  const hintOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);

  useEffect(() => {
    // Lock Lenis scroll if active
    if (window.__lenis) {
      window.__lenis.stop();
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let touchStartY = 0;

    const handleWheel = (e) => {
      e.preventDefault();
      accumulatedDelta.current = Math.max(0, Math.min(targetThreshold, accumulatedDelta.current + e.deltaY));
      const currentPct = accumulatedDelta.current / targetThreshold;
      progress.set(currentPct);

      if (currentPct >= 1 && !completed) {
        setCompleted(true);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const currentY = e.touches[0].clientY;
      const delta = (touchStartY - currentY) * 1.8;
      touchStartY = currentY;

      accumulatedDelta.current = Math.max(0, Math.min(targetThreshold, accumulatedDelta.current + delta));
      const currentPct = accumulatedDelta.current / targetThreshold;
      progress.set(currentPct);

      if (currentPct >= 1 && !completed) {
        setCompleted(true);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      document.body.style.overflow = prevOverflow;
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [progress, completed]);

  useEffect(() => {
    if (completed) {
      sessionStorage.setItem("portfolio_intro_seen", "true");
      const timeout = setTimeout(() => {
        if (window.__lenis) {
          window.__lenis.start();
        }
        document.body.style.overflow = "";
        onFinish?.();
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [completed, onFinish]);

  return (
    <AnimatePresence>
      {!completed && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.7, ease: EASE_CINEMATIC } }}
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-bg-950 select-none"
        >
          {/* Center film strip layer */}
          <motion.div
            style={{ opacity: filmOpacity }}
            className="absolute inset-x-0 z-10 flex flex-col items-center justify-center"
          >
            <div className="mb-4 text-center">
              <span className="font-mono text-[11px] tracking-[0.25em] text-fg-dim uppercase">
                MEMORIES &amp; ARCHIVES
              </span>
            </div>
            <FilmStrip progress={smoothProgress} />
          </motion.div>

          {/* Left Curtain */}
          <motion.div
            style={{ x: leftCurtainX }}
            className="absolute inset-y-0 left-0 z-20 flex w-1/2 items-center justify-end border-r border-line bg-bg-950 pr-4 sm:pr-8"
          >
            <motion.div style={{ opacity: hintOpacity }} className="text-right">
              <p className="font-display text-lg font-semibold tracking-tight text-fg sm:text-2xl">
                Rendra Gadhing
              </p>
              <p className="font-mono text-[11px] tracking-widest text-fg-muted uppercase">
                Scroll to Open &rarr;
              </p>
            </motion.div>
          </motion.div>

          {/* Right Curtain */}
          <motion.div
            style={{ x: rightCurtainX }}
            className="absolute inset-y-0 right-0 z-20 flex w-1/2 items-center justify-start border-l border-line bg-bg-950 pl-4 sm:pl-8"
          >
            <motion.div style={{ opacity: hintOpacity }} className="text-left">
              <p className="font-display text-lg font-semibold tracking-tight text-accent sm:text-2xl">
                Selected Works
              </p>
              <p className="font-mono text-[11px] tracking-widest text-fg-muted uppercase">
                &larr; 2025 - 2026
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

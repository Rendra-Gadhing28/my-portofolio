import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  // Fast inner point
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const dotX = useSpring(rawX, { stiffness: 900, damping: 50 });
  const dotY = useSpring(rawY, { stiffness: 900, damping: 50 });

  // Trailing soft ring
  const trailX = useSpring(rawX, { stiffness: 220, damping: 28, mass: 0.6 });
  const trailY = useSpring(rawY, { stiffness: 220, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    let rafId;
    function move(e) {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        rawX.set(e.clientX);
        rawY.set(e.clientY);
      });
    }

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId);
    };
  }, [rawX, rawY]);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing soft ring (GPU-friendly solid border without backdrop-blur) */}
      <motion.div
        style={{ x: trailX, y: trailY }}
        className="pointer-events-none fixed left-0 top-0 z-[69] hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/[0.03] lg:block will-change-transform"
      />
      {/* Sharp core dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent lg:block will-change-transform"
      />
    </>
  );
}

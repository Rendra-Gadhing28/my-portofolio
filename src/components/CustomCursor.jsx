import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  // Fast inner point
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const dotX = useSpring(rawX, { stiffness: 800, damping: 50 });
  const dotY = useSpring(rawY, { stiffness: 800, damping: 50 });

  // Trailing glow ring
  const trailX = useSpring(rawX, { stiffness: 180, damping: 24, mass: 0.8 });
  const trailY = useSpring(rawY, { stiffness: 180, damping: 24, mass: 0.8 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    function move(e) {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    }

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [rawX, rawY]);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing soft glow ring */}
      <motion.div
        style={{ x: trailX, y: trailY }}
        className="pointer-events-none fixed left-0 top-0 z-[69] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-[1px] lg:block"
      />
      {/* Sharp core dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent lg:block"
      />
    </>
  );
}

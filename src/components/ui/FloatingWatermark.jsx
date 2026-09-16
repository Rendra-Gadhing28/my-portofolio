import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FloatingWatermark({
  text = "",
  direction = "right",
  speed = 0.35,
  className = "",
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const range = direction === "right" ? [-80 * speed, 80 * speed] : [80 * speed, -80 * speed];
  const x = useTransform(scrollYProgress, [0, 1], range);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-x-0 overflow-hidden leading-none select-none z-0 ${className}`}
    >
      <motion.p
        style={{ x }}
        className="whitespace-nowrap font-display text-[14vw] font-bold uppercase tracking-tighter text-fg/[0.03]"
      >
        {text}
      </motion.p>
    </div>
  );
}

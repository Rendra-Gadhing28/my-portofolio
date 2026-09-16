import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";

export default function CloudDivider({ className = "" }) {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 100, mass: 0.8 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const normalized = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      mouseX.set(normalized);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  // Mouse horizontal parallax offsets
  const layer1X = useTransform(smoothMouseX, [-1, 1], [-12, 12]);
  const layer2X = useTransform(smoothMouseX, [-1, 1], [-24, 24]);
  const layer3X = useTransform(smoothMouseX, [-1, 1], [-40, 40]);

  // Scroll vertical drift offsets
  const layer1Y = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [-45, 45]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none relative h-[180px] w-full overflow-hidden select-none sm:h-[220px] ${className}`}
      aria-hidden="true"
    >
      {/* Layer 1: Deep ambient mist (furthest, slow) */}
      <motion.div
        style={{ x: layer1X, y: layer1Y }}
        className="absolute inset-0 opacity-[0.07]"
      >
        <div
          className="absolute -inset-x-20 top-0 h-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse 65% 45% at 30% 50%, rgba(200, 205, 220, 0.6), transparent 70%), radial-gradient(ellipse 55% 40% at 75% 55%, rgba(196, 165, 118, 0.3), transparent 70%)",
          }}
        />
      </motion.div>

      {/* Layer 2: Mid dense cloud puff (medium speed) */}
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className="absolute inset-0 opacity-[0.09]"
      >
        <div
          className="absolute -inset-x-32 top-6 h-full blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse 45% 35% at 50% 60%, rgba(220, 225, 235, 0.7), transparent 65%), radial-gradient(ellipse 35% 30% at 15% 40%, rgba(210, 215, 225, 0.5), transparent 60%), radial-gradient(ellipse 40% 32% at 85% 65%, rgba(210, 215, 225, 0.5), transparent 60%)",
          }}
        />
      </motion.div>

      {/* Layer 3: Foreground wisps (fastest drift, sharpest) */}
      <motion.div
        style={{ x: layer3X, y: layer3Y }}
        className="absolute inset-0 opacity-[0.06]"
      >
        <div
          className="absolute -inset-x-24 top-12 h-full blur-xl"
          style={{
            background:
              "radial-gradient(ellipse 50% 25% at 40% 70%, rgba(240, 242, 250, 0.8), transparent 60%), radial-gradient(ellipse 35% 20% at 70% 60%, rgba(230, 235, 245, 0.7), transparent 60%)",
          }}
        />
      </motion.div>

      {/* Soft edge fade top & bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-950 via-transparent to-bg-950" />
    </div>
  );
}

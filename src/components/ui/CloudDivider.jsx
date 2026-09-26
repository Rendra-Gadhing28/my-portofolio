import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";

export default function CloudDivider({ className = "" }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 35, stiffness: 90, mass: 0.8 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Pause calculation when offscreen
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "100px 0px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let rafId;
    const handleMouseMove = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const normalized = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseX.set(normalized);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible, mouseX]);

  // Optimized lightweight parallax offsets
  const layer1X = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const layer2X = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
  const layer1Y = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none relative h-[140px] w-full overflow-hidden select-none sm:h-[180px] ${className}`}
      aria-hidden="true"
    >
      {isVisible && (
        <>
          {/* Layer 1: Ambient deep mist */}
          <motion.div
            style={{ x: layer1X, y: layer1Y }}
            className="absolute inset-0 opacity-[0.06] will-change-transform"
          >
            <div
              className="absolute -inset-x-16 top-0 h-full blur-xl"
              style={{
                background:
                  "radial-gradient(ellipse 60% 45% at 30% 50%, rgba(200, 205, 220, 0.5), transparent 70%), radial-gradient(ellipse 50% 40% at 75% 55%, rgba(196, 165, 118, 0.25), transparent 70%)",
              }}
            />
          </motion.div>

          {/* Layer 2: Foreground soft cloud puff */}
          <motion.div
            style={{ x: layer2X, y: layer2Y }}
            className="absolute inset-0 opacity-[0.08] will-change-transform"
          >
            <div
              className="absolute -inset-x-20 top-4 h-full blur-lg"
              style={{
                background:
                  "radial-gradient(ellipse 45% 35% at 50% 60%, rgba(220, 225, 235, 0.6), transparent 65%), radial-gradient(ellipse 35% 30% at 15% 40%, rgba(210, 215, 225, 0.4), transparent 60%)",
              }}
            />
          </motion.div>
        </>
      )}

      {/* Smooth top & bottom edge blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-950 via-transparent to-bg-950 pointer-events-none" />
    </div>
  );
}

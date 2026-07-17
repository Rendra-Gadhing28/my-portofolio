import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Lanyard from "../components/lanyard/Lanyard";

const DOTS = Array.from({ length: 48 }, (_, i) => ({
  x: (i % 8) * 44 + 14,
  y: Math.floor(i / 8) * 44 + 14,
  id: i,
}));

export default function HeroOrb() {
  const wrapRef = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  const gridX = useTransform(sx, [0, 1], [10, -10]);
  const gridY = useTransform(sy, [0, 1], [10, -10]);

  function handleMove(e) {
    const rect = wrapRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative flex h-[420px] w-full items-center justify-center sm:h-[520px] lg:h-full"
    >
      {/* particle grid, parallax layer */}
      <motion.svg
        style={{ x: gridX, y: gridY }}
        viewBox="0 0 480 480"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]"
      >
        {DOTS.map((d, i) => (
          <motion.circle
            key={d.id}
            cx={d.x}
            cy={d.y}
            r={1.3}
            fill="var(--color-fg-dim)"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.5, 0.15] }}
            transition={{
              duration: 3.4,
              repeat: Infinity,
              delay: (i % 8) * 0.15 + Math.floor(i / 8) * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.svg>

      {/* ambient glow */}
      <div
        className="absolute h-[280px] w-[280px] rounded-full blur-[100px] sm:h-[340px] sm:w-[340px]"
        style={{ background: "radial-gradient(circle, rgba(196,165,118,0.20), transparent 70%)" }}
      />

      {/* 3D lanyard card */}
      <div className="absolute inset-0">
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>
    </div>
  );
}
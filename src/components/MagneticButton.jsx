import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({
  children,
  onClick,
  href,
  variant = "solid",
  className = "",
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({ x: relX * 0.35, y: relY * 0.45 });
  }

  function handleLeave() {
    setPos({ x: 0, y: 0 });
  }

  const base =
    "relative inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 cursor-pointer select-none";
  const solid =
    "bg-fg text-bg-950 hover:bg-accent-soft";
  const ghost =
    "border border-line-strong text-fg hover:border-accent-soft/60 hover:text-accent-soft";

  const Comp = href ? motion.a : motion.button;

  return (
    <Comp
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      className={`${base} ${variant === "solid" ? solid : ghost} ${className}`}
    >
      <motion.span
        animate={{ x: pos.x * 0.4, y: pos.y * 0.4 }}
        transition={{ type: "spring", stiffness: 150, damping: 12 }}
        className="inline-flex items-center gap-3"
      >
        {children}
      </motion.span>
    </Comp>
  );
}

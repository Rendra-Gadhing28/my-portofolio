import { useRef, useCallback } from "react";

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.06)",
  spotlightRadius = 300,
  ...props
}) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--spotlight-x", `${x}px`);
    cardRef.current.style.setProperty("--spotlight-y", `${y}px`);
    cardRef.current.style.setProperty("--spotlight-opacity", "1");
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--spotlight-opacity", "0");
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        "--spotlight-x": "-999px",
        "--spotlight-y": "-999px",
        "--spotlight-opacity": "0",
        "--spotlight-radius": `${spotlightRadius}px`,
        "--spotlight-color": spotlightColor,
      }}
      className={`relative overflow-hidden rounded-xl border border-line bg-bg-900/50 transition-colors duration-300 hover:border-line-strong will-change-transform ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: "var(--spotlight-opacity)",
          background: `radial-gradient(var(--spotlight-radius) circle at var(--spotlight-x) var(--spotlight-y), var(--spotlight-color), transparent 70%)`,
        }}
      />
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}

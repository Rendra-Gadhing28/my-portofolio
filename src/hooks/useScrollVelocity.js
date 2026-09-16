import { useState, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useScrollVelocity() {
  const rawVelocity = useMotionValue(0);
  const smoothVelocity = useSpring(rawVelocity, {
    damping: 30,
    stiffness: 180,
    mass: 0.5,
  });

  useEffect(() => {
    let timeout;
    const handleScroll = (e) => {
      const v = e.detail?.velocity || 0;
      rawVelocity.set(v);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        rawVelocity.set(0);
      }, 90);
    };

    window.addEventListener("lenis-scroll", handleScroll);
    return () => {
      window.removeEventListener("lenis-scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [rawVelocity]);

  return { rawVelocity, smoothVelocity };
}

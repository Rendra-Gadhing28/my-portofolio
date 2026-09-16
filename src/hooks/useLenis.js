import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.4,
      lerp: 0.06,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
    });

    window.__lenis = lenis;
    window.__lenisVelocity = 0;

    lenis.on("scroll", (e) => {
      window.__lenisVelocity = e.velocity || 0;
      window.dispatchEvent(
        new CustomEvent("lenis-scroll", {
          detail: {
            velocity: e.velocity || 0,
            scroll: e.scroll || 0,
            progress: e.progress || 0,
          },
        })
      );
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      window.__lenis = undefined;
      window.__lenisVelocity = 0;
    };
  }, []);
}

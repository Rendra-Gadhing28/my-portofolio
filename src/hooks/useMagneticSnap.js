import { useEffect } from "react";

export function useMagneticSnap(sectionIds = ["top", "stack", "work", "about", "certificates", "contact"]) {
  useEffect(() => {
    let snapTimeout;

    const handleScroll = (e) => {
      clearTimeout(snapTimeout);
      const velocity = Math.abs(e.detail?.velocity || 0);

      // Only engage snap when scroll has practically stopped
      if (velocity < 0.2) {
        snapTimeout = setTimeout(() => {
          if (!window.__lenis) return;
          const currentScroll = window.__lenis.scroll;
          const viewportH = window.innerHeight;

          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (!el) continue;
            const targetTop = el.offsetTop - 40;
            const distance = Math.abs(currentScroll - targetTop);

            // Proximity threshold: within 60px of the section boundary
            if (distance > 10 && distance < 75) {
              window.__lenis.scrollTo(el, {
                offset: -40,
                duration: 0.7,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              });
              break;
            }
          }
        }, 180);
      }
    };

    window.addEventListener("lenis-scroll", handleScroll);
    return () => {
      window.removeEventListener("lenis-scroll", handleScroll);
      clearTimeout(snapTimeout);
    };
  }, [sectionIds]);
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_CINEMATIC } from "../../constants/animation";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollY = e.detail?.scroll || window.scrollY || 0;
      setVisible(scrollY > 400);
    };

    window.addEventListener("lenis-scroll", handleScroll);
    return () => window.removeEventListener("lenis-scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleClick}
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          transition={{ duration: 0.45, ease: EASE_CINEMATIC }}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-bg-900/80 text-fg-soft backdrop-blur-md transition-colors duration-200 hover:border-accent hover:text-accent focus:outline-none"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 11.5V2.5M2.5 7L7 2.5L11.5 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

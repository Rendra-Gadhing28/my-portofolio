import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "home", href: "#top" },
  { label: "Projects", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function go(e, href) {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -32, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.15 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-line bg-bg-950/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <a
          href="#top"
          onClick={(e) => go(e, "#top")}
          className="font-display text-[15px] font-medium tracking-tight text-fg"
        >
          Rendra Gadhing
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className="group relative font-mono text-[12.5px] uppercase tracking-[0.12em] text-fg-muted transition-colors duration-300 hover:text-fg"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent-soft transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            className="hidden rounded-full border border-line-strong px-4 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-fg-soft transition-colors duration-300 hover:border-accent-soft/60 hover:text-accent-soft sm:inline-flex"
          >
            Say hi
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-fg md:hidden"
          >
            <span className="relative block h-3 w-4">
              <motion.span
                className="absolute left-0 top-0 h-px w-4 bg-fg"
                animate={open ? { rotate: 45, top: 6 } : { rotate: 0, top: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
              <motion.span
                className="absolute left-0 bottom-0 h-px w-4 bg-fg"
                animate={open ? { rotate: -45, bottom: 6 } : { rotate: 0, bottom: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 flex flex-col justify-center gap-2 bg-bg-950/98 px-8 backdrop-blur-md md:hidden"
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.06 * i }}
                className="border-b border-line py-5 font-display text-3xl font-medium tracking-tight text-fg"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => go(e, "#contact")}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.06 * LINKS.length }}
              className="mt-8 font-mono text-[12px] uppercase tracking-[0.14em] text-accent-soft"
            >
              Say hi →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

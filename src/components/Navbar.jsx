import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import rendra from "../assets/my-diri.png";
import { EASE_CINEMATIC } from "../constants/animation";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "Projects", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Certificate", href: "#certificate" },
  { label: "Contact", href: "#contact" },
];

function NavItem({ link, activeHover, setActiveHover, onClick }) {
  const itemRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    setActiveHover(null);
  };

  return (
    <motion.li
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActiveHover(link.href)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className="relative"
    >
      <a
        href={link.href}
        onClick={(e) => onClick(e, link.href)}
        className="relative block px-3 py-1 font-mono text-[12px] uppercase tracking-[0.14em] text-fg-muted transition-colors duration-200 hover:text-fg"
      >
        {link.label}
        {activeHover === link.href && (
          <motion.span
            layoutId="nav-underline"
            className="absolute inset-x-3 -bottom-1 h-[1.5px] bg-accent"
            transition={{ duration: 0.35, ease: EASE_CINEMATIC }}
          />
        )}
      </a>
    </motion.li>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
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

  const menuOverlay = (
    <div
      className={`fixed inset-0 z-[90] overflow-y-auto overscroll-contain bg-bg-950/98 backdrop-blur-md transition-opacity duration-300 md:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex min-h-[100dvh] flex-col justify-start py-20 gap-2 px-8">
        {LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => go(e, link.href)}
            style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
            className={`border-b border-line py-4 font-display text-2xl font-semibold tracking-tight text-fg transition-all duration-300 ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => go(e, "#contact")}
          style={{ transitionDelay: open ? `${LINKS.length * 50}ms` : "0ms" }}
          className={`mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-accent transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Say hi &rarr;
        </a>
      </div>
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-bg-950/85 backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-line-strong">
            <img
              src={rendra}
              alt="Rendra Gadhing"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <a
            href="#top"
            onClick={(e) => go(e, "#top")}
            className="font-display text-[15px] font-semibold tracking-tight text-fg"
          >
            Rendra Gadhing
            <span className="text-accent">.</span>
          </a>
        </div>

        <ul className="hidden items-center gap-2 md:flex">
          {LINKS.map((link) => (
            <NavItem
              key={link.href}
              link={link}
              activeHover={activeHover}
              setActiveHover={setActiveHover}
              onClick={go}
            />
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            className="hidden rounded-full border border-line-strong px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-soft transition-colors duration-200 hover:border-accent hover:text-accent sm:inline-flex"
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
              <span
                className={`absolute left-0 h-px w-4 bg-fg transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0 rotate-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-fg transition-all duration-300 ${
                  open ? "bottom-1.5 -rotate-45" : "bottom-0 rotate-0"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {typeof document !== "undefined" && createPortal(menuOverlay, document.body)}
    </header>
  );
}

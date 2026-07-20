import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import rendra from '../assets/my-diri.png'

const LINKS = [
  { label: "Home", href: "#top" },
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

  const menuOverlay = (
    <div
      className={`fixed inset-0 z-[90] overflow-y-auto overscroll-contain bg-bg-950/98 backdrop-blur-md transition-opacity duration-300 md:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex min-h-[100dvh] flex-col justify-start py-18 gap-1.5 px-8">
        {LINKS.map((link, i) => (
           <a
            key={link.href}
            href={link.href}
            onClick={(e) => go(e, link.href)}
            style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
            className={`border-b border-line py-5 font-display text-2xl font-medium tracking-tight text-fg transition-all duration-300 ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {link.label}
          </a>
        ))}
         <a
          href="#contact"
          onClick={(e) => go(e, "#contact")}
          style={{ transitionDelay: open ? `${LINKS.length * 60}ms` : "0ms" }}
          className={`mt-8 font-mono text-[12px] uppercase tracking-[0.14em] text-accent-soft transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Say hi →
        </a>
      </div>
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-500 ${
        scrolled ? "border-b border-line bg-bg-950/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 lg:py-5 sm:px-10">
       
       <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-line-strong">
          <img src={rendra} alt="Rendra Gadhing" className="absolute inset-0 h-full w-full object-cover" />
        </div>
         <a
          href="#top"
          onClick={(e) => go(e, "#top")}
          className="font-display text-[15px] font-medium tracking-tight text-fg"
        >
          Rendra Gadhing
          <span className="text-accent">.</span>
        </a>
        </div>
        <ul className="hidden items-center gap-3 lg:gap-9 md:flex">
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
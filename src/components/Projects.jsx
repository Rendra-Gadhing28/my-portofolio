import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SpotlightCard from "./ui/SpotlightCard";
import SplitText from "./ui/SplitText";
import FloatingWatermark from "./ui/FloatingWatermark";
import { useScrollVelocity } from "../hooks/useScrollVelocity";

const PROJECTS = [
  {
    name: "Kasir Go",
    status: "Live",
    desc: "Aplikasi Point of Sale (POS) kasir modern berbasis web untuk efisiensi pencatatan katalog produk, transaksi kasir, dan kalkulasi pembayaran realtime.",
    tags: ["React", "JavaScript", "Tailwind CSS", "POS System"],
    year: "2026",
    url: "https://kasir-go-delta.vercel.app/",
  },
  {
    name: "Booking Yalia Beauty Salon",
    status: "Coming Soon",
    desc: "Aplikasi booking online untuk Yalia Beauty Salon yang memungkinkan pelanggan reservasi perawatan, memilih terapis, dan pembayaran terintegrasi.",
    tags: ["Laravel", "MySQL", "Tailwind CSS", "OAuth", "Midtrans"],
    year: "2026",
    url: "https://github.com/rendra-gadhing28/PRA-UKK",
  },
  {
    name: "Sijar",
    status: "Live",
    desc: "Sistem peminjaman barang dan inventaris terpadu berbasis web guna meningkatkan efisiensi pendataan aset dan tracking riwayat peminjaman.",
    tags: ["Laravel", "MySQL", "React", "Tailwind CSS"],
    year: "2026",
    url: "https://sijarr.vercel.app/",
  },
  {
    name: "Al-Muqoddas",
    status: "Live",
    desc: "Portal ekstrakurikuler dan kegiatan santri dengan integrasi form dinamis Google Sheets dan AppScript untuk pencatatan otomatis realtime.",
    tags: ["React", "JavaScript", "Tailwind CSS", "AppScript"],
    year: "2026",
    url: "https://al-muqoddas.vercel.app/",
  },
  {
    name: "Yalia Beauty Salon",
    status: "Live",
    desc: "Landing page modern untuk salon kecantikan dengan katalog layanan interaktif, peta lokasi Leaflet terintegrasi, dan direct booking via WhatsApp.",
    tags: ["React", "Leaflet", "JavaScript", "Tailwind CSS"],
    year: "2026",
    url: "https://yalia-beauty-salon.vercel.app/",
  },
  {
    name: "Garden Palace",
    status: "Engine",
    desc: "Game petualangan platformer 2D dengan mekanisme teka-teki logika, mekanik fisika interaktif, dan visual pixel art retro.",
    tags: ["Unity", "C#", "Itch.io", "Game Engine"],
    year: "2025",
    url: "https://github.com/rendra-gadhing28/PJBL_Kelompok-1",
  },
];

export default function Projects() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [maxScrollX, setMaxScrollX] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { smoothVelocity } = useScrollVelocity();
  const skewY = useTransform(smoothVelocity, [-15, 15], [-2.5, 2.5]);

  // Recalculate track distance on resize
  const updateScrollWidth = useCallback(() => {
    if (!trackRef.current) return;
    const trackWidth = trackRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    // Extra offset so the last card has comfortable right padding
    const extraPadding = viewportWidth < 640 ? 40 : 80;
    const scrollDistance = Math.max(0, trackWidth - viewportWidth + extraPadding);
    setMaxScrollX(scrollDistance);
  }, []);

  useEffect(() => {
    updateScrollWidth();
    window.addEventListener("resize", updateScrollWidth);
    return () => window.removeEventListener("resize", updateScrollWidth);
  }, [updateScrollWidth]);

  // Dynamic pixel horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScrollX]);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative h-[360vh] sm:h-[320vh] w-full"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden bg-bg-950 px-4 sm:px-10">
        <FloatingWatermark text="PROJECTS" direction="right" speed={0.3} />

        {/* Section Header */}
        <div className="relative z-10 mx-auto w-full max-w-6xl pt-4 pb-6 sm:pt-6 sm:pb-8">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                Selected Work
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-4xl">
                <SplitText text="Recent Builds" />
              </h2>
            </div>
            <span className="font-mono text-[11px] tracking-widest text-fg-dim hidden sm:inline">
              [ HORIZONTAL SCROLL &rarr; ]
            </span>
          </div>
        </div>

        {/* Horizontal Card Track */}
        <motion.div
          ref={trackRef}
          style={{ x, skewY }}
          className="relative z-10 flex gap-4 sm:gap-6 pl-2 sm:pl-16 pr-8 will-change-transform"
        >
          {PROJECTS.map((p) => (
            <SpotlightCard
              key={p.name}
              className="group flex h-[390px] w-[84vw] max-w-[340px] flex-shrink-0 flex-col justify-between p-6 sm:h-[420px] sm:w-[440px] sm:max-w-none sm:p-7 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
                    {p.year}
                  </span>
                  <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-muted">
                    {p.status}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-fg transition-colors duration-200 group-hover:text-accent sm:mt-5 sm:text-3xl">
                  {p.name}
                </h3>

                <p className="mt-3 text-[13.5px] leading-[1.7] text-fg-muted sm:mt-4 sm:text-[14px] sm:leading-[1.75]">
                  {p.desc}
                </p>
              </div>

              <div>
                <div className="mb-5 flex flex-wrap gap-1.5 sm:mb-6 sm:gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-bg-950/60 px-2.5 py-0.5 font-mono text-[10.5px] text-fg-soft sm:px-3 sm:py-1 sm:text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-fg transition-colors duration-200 group-hover:text-accent sm:text-[12px]"
                >
                  <span>Explore Project</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path d="M3 11L11 3H4.5M11 3V9.5" />
                  </svg>
                </a>
              </div>
            </SpotlightCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

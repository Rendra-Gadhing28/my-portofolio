import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SpotlightCard from "./ui/SpotlightCard";
import SplitText from "./ui/SplitText";
import FloatingWatermark from "./ui/FloatingWatermark";
import { useScrollVelocity } from "../hooks/useScrollVelocity";
import { EASE_CINEMATIC } from "../constants/animation";

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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { smoothVelocity } = useScrollVelocity();
  const skewY = useTransform(smoothVelocity, [-15, 15], [-3, 3]);

  // Horizontal track movement for 6 project cards
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-76%"]);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative h-[320vh] w-full"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden bg-bg-950 px-6 sm:px-10">
        <FloatingWatermark text="PROJECTS" direction="right" speed={0.4} />

        {/* Section Header */}
        <div className="relative z-10 mx-auto w-full max-w-6xl pt-6 pb-8">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                Selected Work
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.02em] text-fg sm:text-4xl">
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
          style={{ x, skewY }}
          className="relative z-10 flex gap-6 pl-4 sm:pl-16"
        >
          {PROJECTS.map((p, i) => (
            <SpotlightCard
              key={p.name}
              className="group flex h-[380px] w-[320px] flex-shrink-0 flex-col justify-between p-7 sm:h-[420px] sm:w-[440px] transition-all duration-300"
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

                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-fg transition-colors duration-200 group-hover:text-accent sm:text-3xl">
                  {p.name}
                </h3>

                <p className="mt-4 text-[14px] leading-[1.75] text-fg-muted">
                  {p.desc}
                </p>
              </div>

              <div>
                <div className="mb-6 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-bg-950/60 px-3 py-1 font-mono text-[11px] text-fg-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-fg transition-colors duration-200 group-hover:text-accent"
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
                    <path d="M3 11L11 3M11 3H4.5M11 3V9.5" />
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

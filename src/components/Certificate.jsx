import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import wadhwaniImg from "../assets/certificates/wadhwani-ignite-bootcamp.jpg";
import techcomfestImg from "../assets/certificates/techcomfest-uiux.jpg";
import beyondConservationImg from "../assets/certificates/beyond-conservation.jpg";
import kemitraanJaImg from "../assets/certificates/kemitraan-junior-achievement.jpg";
import penerapanAiImg from "../assets/certificates/penerapan-ai.jpg";
import dampakAi from "../assets/certificates/Dampak-AI.jpg";

const CERTIFICATES = [
  {
    title: "Ignite Bootcamp — Venture Idea Development Indonesia",
    issuer: "Wadhwani Foundation",
    date: "08 Jan 2026",
    desc: "Pelatihan ideation, prototyping, business modeling, dan financial planning selama 10 jam.",
    image: wadhwaniImg,
  },
  {
    title: "TechComFest UI/UX Competition 2026 — Sync Reality",
    issuer: "Politeknik Negeri Semarang",
    date: "20 Jan 2026",
    desc: "Peserta kompetisi UI/UX bertema \"Shaping the Future of Digital Experience\".",
    image: techcomfestImg,
  },
   {
    title: "Program Kemitraan Junior Achievement Indonesia",
    issuer: "Junior Achievement Indonesia",
    date: "6 Oktober 2025",
    desc: "Sertifikat kemitraan/partisipasi program. Lengkapi tanggal sesuai teks asli sertifikat.",
    image: kemitraanJaImg,
  },
  {
    title: "Menciptakan Dampak dengan AI",
    issuer: "—",
    date: "6 Oktober 2025",
    desc: "Sertifikat partisipasi. Lengkapi issuer/tanggal sesuai teks asli sertifikat.",
    image: dampakAi,
  },
  {
    title: "Beyond Conservation",
    issuer: "—",
    date: "29 September 2025",
    desc: "Sertifikat partisipasi. Lengkapi issuer/tanggal sesuai teks asli sertifikat.",
    image: beyondConservationImg,
  },
  {
    title: "Penerapan Artificial Intelligence",
    issuer: "—",
    date: "29 September 2025",
    desc: "Sertifikat partisipasi. Lengkapi issuer/tanggal sesuai teks asli sertifikat.",
    image: penerapanAiImg,
  }
];

function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M5 2H2v3M9 2h3v3M12 9v3H9M2 9v3h3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 3l10 10M13 3L3 13"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CertificateCard({ cert, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group text-left rounded-2xl border border-line bg-white/[0.03] transition-colors duration-300 hover:border-accent-soft/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-soft/60"
    >
      <span className="relative block aspect-video w-full overflow-hidden rounded-t-2xl">
        {/* blurred backdrop fill: bikin sertifikat portrait tetap "tegak" tanpa bar kosong polos */}
        <img
          src={cert.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
        />
        <img
          src={cert.image}
          alt={cert.title}
          className="relative z-10 h-full w-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />

        {/* corner mounts — nod ke motif kartu/lanyard di Hero */}
        <span className="pointer-events-none absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-fg/15" />
        <span className="pointer-events-none absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-fg/15" />
        <span className="pointer-events-none absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-fg/15" />
        <span className="pointer-events-none absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-fg/15" />

        <span className="absolute right-3 top-3 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-line-strong bg-bg-950/70 text-fg-soft opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <ExpandIcon />
        </span>
      </span>

      <span className="block px-5 py-4">
        <span className="block font-display text-[15px] font-medium leading-snug text-fg">
          {cert.title}
        </span>
        <span className="mt-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-dim">
          <span>{cert.issuer}</span>
          {cert.date !== "—" && (
            <>
              <span className="text-fg-dim/50">·</span>
              <span>{cert.date}</span>
            </>
          )}
        </span>
      </span>
    </button>
  );
}

function Lightbox({ cert, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-bg-950/92 p-6 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-fg-soft transition-colors duration-300 hover:border-accent-soft/60 hover:text-accent-soft"
      >
        <CloseIcon />
      </button>

      <div
        className="flex max-h-full max-w-3xl flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={cert.image}
          alt={cert.title}
          className="max-h-[75vh] w-auto rounded-lg border border-line-strong object-contain"
        />
        <div className="text-center">
          <p className="font-display text-base font-medium text-fg">{cert.title}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-dim">
            {cert.issuer}
            {cert.date !== "—" && ` · ${cert.date}`}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Certificates() {
  const [active, setActive] = useState(null);

  return (
    <section
      id="certificate"
      className="mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:py-32"
    >
      <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg-muted">
        <span className="text-fg-dim">// </span>
        Certificates &amp; Achievements
      </p>

      <h2 className="mt-5 max-w-xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg sm:text-5xl">
        Sertifikat &amp; Pencapaian
      </h2>

      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-fg-muted">
        Kumpulan sertifikat dari bootcamp, kompetisi, dan program kemitraan
        yang saya ikuti untuk terus mengasah kemampuan di bidang pengembangan
        software dan produk digital.
      </p>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATES.map((cert) => (
          <CertificateCard
            key={cert.title}
            cert={cert}
            onOpen={() => setActive(cert)}
          />
        ))}
      </div>

      {active && <Lightbox cert={active} onClose={() => setActive(null)} />}
    </section>
  );
}
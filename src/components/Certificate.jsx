import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PerspectiveCard from "./ui/PerspectiveCard";
import SlideIn from "./ui/SlideIn";
import SplitText from "./ui/SplitText";
import FloatingWatermark from "./ui/FloatingWatermark";

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
    desc: 'Peserta kompetisi UI/UX bertema "Shaping the Future of Digital Experience".',
    image: techcomfestImg,
  },
  {
    title: "Program Kemitraan Junior Achievement Indonesia",
    issuer: "Junior Achievement Indonesia",
    date: "6 Oktober 2025",
    desc: "Sertifikat kemitraan/partisipasi program kesiapan kerja dan kewirausahaan.",
    image: kemitraanJaImg,
  },
  {
    title: "Menciptakan Dampak dengan AI",
    issuer: "Kementerian Kominfo",
    date: "6 Oktober 2025",
    desc: "Sertifikat partisipasi workshop implementasi kecerdasan buatan.",
    image: dampakAi,
  },
  {
    title: "Beyond Conservation",
    issuer: "Yayasan Konservasi",
    date: "29 September 2025",
    desc: "Sertifikat partisipasi program lingkungan dan digital sustainability.",
    image: beyondConservationImg,
  },
  {
    title: "Penerapan Artificial Intelligence",
    issuer: "Indonesia AI Forum",
    date: "29 September 2025",
    desc: "Sertifikat pembelajaran dasar pengenalan dan penerapan algoritma AI.",
    image: penerapanAiImg,
  },
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
    <PerspectiveCard maxTilt={8} className="group">
      <button
        type="button"
        onClick={onOpen}
        className="flex h-full w-full flex-col text-left focus-visible:outline-none"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-bg-950/80">
          <img
            src={cert.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-xl"
          />
          <img
            src={cert.image}
            alt={cert.title}
            className="relative z-10 h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute right-3 top-3 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-line-strong bg-bg-950/80 text-fg-soft opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
            <ExpandIcon />
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-between p-5">
          <h3 className="font-display text-[15px] font-semibold leading-snug text-fg transition-colors duration-200 group-hover:text-accent">
            {cert.title}
          </h3>
          <div className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-dim">
            <span>{cert.issuer}</span>
            {cert.date !== "—" && (
              <>
                <span>·</span>
                <span>{cert.date}</span>
              </>
            )}
          </div>
        </div>
      </button>
    </PerspectiveCard>
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
      className="fixed inset-0 z-[110] flex items-center justify-center bg-bg-950/92 p-6 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-fg-soft transition-colors duration-200 hover:border-accent hover:text-accent"
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
          <p className="font-display text-base font-semibold text-fg">
            {cert.title}
          </p>
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
      className="relative mx-auto max-w-6xl px-6 py-32 sm:px-10"
    >
      <FloatingWatermark text="RECOGNITION" direction="right" speed={0.35} />

      <div className="relative z-10">
        <SlideIn direction="left">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
            Certificates &amp; Achievements
          </p>

          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] text-fg sm:text-4xl">
            <SplitText text="Credentials &amp; Recognition" />
          </h2>

          <p className="mt-4 max-w-md text-[15px] leading-[1.75] text-fg-muted">
            Dokumentasi pelatihan, sertifikasi kompetensi, dan keikutsertaan kompetisi dalam memperdalam penguasaan rekayasa perangkat lunak.
          </p>
        </SlideIn>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATES.map((cert) => (
            <CertificateCard
              key={cert.title}
              cert={cert}
              onOpen={() => setActive(cert)}
            />
          ))}
        </div>
      </div>

      {active && <Lightbox cert={active} onClose={() => setActive(null)} />}
    </section>
  );
}

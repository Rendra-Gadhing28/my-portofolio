import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * ProfessionalIDCard
 * -------------------
 * A dark, "space-elegant" identity card.
 *
 * Design language:
 *  - Base: near-black navy surface with soft glassmorphism
 *  - Signature element: a slow-drifting twin-hue "aurora ribbon"
 *    behind the content, paired with a metallic smart-chip and a
 *    holographic seal — nods to the physical vocabulary of a real ID card.
 *  - Accent hues: ice-cyan (#4FD8E8) -> soft violet (#9B87F5) only.
 *    One warm/green accent is reserved for the live status dot.
 *
 * Usage:
 *   <ProfessionalIDCard
 *     orgName="NOVA DYNAMICS"
 *     name="Elena Voss"
 *     role="Senior Systems Architect"
 *     department="Applied Research"
 *     idNumber="AX-2847-931"
 *     validThru="12/2028"
 *     status="ACTIVE"
 *     photoUrl={undefined} // optional image URL
 *   />
 *
 * Requires: npm install framer-motion
 */

function AuroraWave({ reduceMotion }) {
  // Two duplicated wave paths side-by-side (viewBox width 900, drawn twice = 1800)
  // translated from 0 to -900 for a perfectly seamless, very slow horizontal drift.
  const wavePath =
    "M0,60 C 75,30 150,90 225,60 C 300,30 375,90 450,60 C 525,30 600,90 675,60 C 750,30 825,90 900,60 L900,160 L0,160 Z";

  return (
    <div className="idcard-wave-layer" aria-hidden="true">
      <motion.svg
        className="idcard-wave idcard-wave--back"
        viewBox="0 0 1800 160"
        preserveAspectRatio="none"
        initial={{ x: 0 }}
        animate={reduceMotion ? { x: 0 } : { x: -900 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 46, ease: "linear", repeat: Infinity }
        }
      >
        <defs>
          <linearGradient id="auroraViolet" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9B87F5" stopOpacity="0" />
            <stop offset="50%" stopColor="#9B87F5" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#9B87F5" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={wavePath} fill="url(#auroraViolet)" />
        <path d={wavePath} fill="url(#auroraViolet)" transform="translate(900,0)" />
      </motion.svg>

      <motion.svg
        className="idcard-wave idcard-wave--front"
        viewBox="0 0 1800 160"
        preserveAspectRatio="none"
        initial={{ x: -300 }}
        animate={reduceMotion ? { x: -300 } : { x: -1200 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 34, ease: "linear", repeat: Infinity }
        }
      >
        <defs>
          <linearGradient id="auroraCyan" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4FD8E8" stopOpacity="0" />
            <stop offset="50%" stopColor="#4FD8E8" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#4FD8E8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={wavePath} fill="url(#auroraCyan)" />
        <path d={wavePath} fill="url(#auroraCyan)" transform="translate(900,0)" />
      </motion.svg>
    </div>
  );
}

function Starfield({ reduceMotion }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        top: Math.round(8 + Math.random() * 84),
        left: Math.round(4 + Math.random() * 92),
        size: Math.random() > 0.8 ? 2 : 1,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 3,
      })),
    []
  );

  return (
    <div className="idcard-stars" aria-hidden="true">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="idcard-star"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
          animate={reduceMotion ? { opacity: 0.35 } : { opacity: [0.15, 0.8, 0.15] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}
    </div>
  );
}

function SmartChip() {
  return (
    <div className="idcard-chip" aria-hidden="true">
      <div className="idcard-chip-grid">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function HoloSeal({ reduceMotion }) {
  return (
    <motion.div
      className="idcard-seal"
      animate={reduceMotion ? {} : { rotate: 360 }}
      transition={reduceMotion ? {} : { duration: 18, ease: "linear", repeat: Infinity }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40" width="34" height="34">
        <circle cx="20" cy="20" r="17" fill="none" stroke="url(#sealRing)" strokeWidth="1.4" strokeDasharray="3 4" />
        <defs>
          <linearGradient id="sealRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4FD8E8" />
            <stop offset="100%" stopColor="#9B87F5" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

export default function ProfessionalIDCard({
  orgName = "NOVA DYNAMICS",
  name = "Elena Voss",
  role = "Senior Systems Architect",
  department = "Applied Research Division",
  idNumber = "AX-2847-931",
  validThru = "12/2028",
  status = "ACTIVE",
  photoUrl,
}) {
  const reduceMotion = useReducedMotion();
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="idcard-scope">
      <style>{`
        .idcard-scope {
          --void: #060710;
          --card-bg: #0a0b14;
          --surface-glass: rgba(255,255,255,0.035);
          --border-soft: rgba(148,163,184,0.14);
          --text-primary: #f5f7fa;
          --text-secondary: #97a3b6;
          --text-mono: #c7d1e0;
          --cyan: #4fd8e8;
          --violet: #9b87f5;
          --active: #5fe3a0;
          --font-display: 'Space Grotesk', 'Segoe UI', sans-serif;
          --font-body: 'Inter', 'Segoe UI', sans-serif;
          --font-mono: 'JetBrains Mono', 'Courier New', monospace;
          display: inline-block;
        }

        .idcard-outer {
          position: relative;
          width: min(400px, 92vw);
          aspect-ratio: 1.586 / 1;
        }

        .idcard-halo {
          position: absolute;
          inset: -18%;
          border-radius: 40%;
          background: conic-gradient(from 0deg, var(--cyan), var(--violet), transparent 55%, var(--cyan));
          filter: blur(38px);
          opacity: 0.35;
          pointer-events: none;
        }

        .idcard-border-wrap {
          position: relative;
          height: 100%;
          border-radius: 22px;
          padding: 1.4px;
          background: linear-gradient(120deg,
            rgba(79,216,232,0.18),
            rgba(155,135,245,0.65),
            rgba(79,216,232,0.18)
          );
          background-size: 220% 220%;
          animation: idcardShimmer 7s ease-in-out infinite;
          box-shadow:
            0 0 40px -12px rgba(155,135,245,0.35),
            0 0 90px -30px rgba(79,216,232,0.25),
            0 18px 40px -20px rgba(0,0,0,0.7);
        }

        @keyframes idcardShimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .idcard-surface {
          position: relative;
          height: 100%;
          border-radius: 20.6px;
          overflow: hidden;
          background:
            radial-gradient(120% 140% at 0% 0%, rgba(155,135,245,0.10), transparent 55%),
            radial-gradient(120% 140% at 100% 100%, rgba(79,216,232,0.08), transparent 55%),
            var(--surface-glass) padding-box,
            var(--card-bg);
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          border: 1px solid var(--border-soft);
          display: flex;
          flex-direction: column;
          padding: 18px 20px 16px;
          font-family: var(--font-body);
        }

        .idcard-wave-layer {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        .idcard-wave { position: absolute; bottom: -6%; left: 0; width: 200%; height: 62%; }
        .idcard-wave--back { filter: blur(6px); opacity: 0.8; }
        .idcard-wave--front { filter: blur(2px); }

        .idcard-vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(6,7,16,0.05) 0%, rgba(6,7,16,0.55) 78%, rgba(6,7,16,0.75) 100%);
        }

        .idcard-stars { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .idcard-star {
          position: absolute;
          border-radius: 50%;
          background: #e8edf7;
        }

        .idcard-content { position: relative; z-index: 2; display: flex; flex-direction: column; height: 100%; }

        .idcard-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .idcard-eyebrow {
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.18em;
          color: var(--text-secondary);
          text-transform: uppercase;
        }
        .idcard-orgname {
          font-family: var(--font-display);
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--text-primary);
          margin-top: 1px;
        }
        .idcard-status {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.12em;
          color: var(--active);
          background: rgba(95,227,160,0.08);
          border: 1px solid rgba(95,227,160,0.25);
          padding: 3px 8px 3px 6px;
          border-radius: 999px;
        }
        .idcard-status-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--active);
          box-shadow: 0 0 0 0 rgba(95,227,160,0.5);
          animation: idcardPulse 2.2s ease-in-out infinite;
        }
        @keyframes idcardPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(95,227,160,0.45); opacity: 1; }
          50% { box-shadow: 0 0 0 4px rgba(95,227,160,0); opacity: 0.65; }
        }

        .idcard-body {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 14px;
        }

        .idcard-left { display: flex; flex-direction: column; align-items: center; gap: 8px; }

        .idcard-chip {
          width: 30px;
          height: 22px;
          border-radius: 4px;
          background: linear-gradient(155deg, #cfd6e3 0%, #8a93a8 45%, #4b5468 100%);
          box-shadow: inset 0 0 3px rgba(0,0,0,0.5), 0 0 8px rgba(79,216,232,0.15);
          padding: 3px;
        }
        .idcard-chip-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 2px;
          width: 100%;
          height: 100%;
        }
        .idcard-chip-grid span {
          border: 0.5px solid rgba(20,24,34,0.55);
          border-radius: 1px;
        }

        .idcard-avatar {
          position: relative;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #161a28, #0c0d16);
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.02em;
        }
        .idcard-avatar::before {
          content: "";
          position: absolute;
          inset: -2.5px;
          border-radius: 50%;
          padding: 2.5px;
          background: conic-gradient(from 120deg, var(--cyan), var(--violet), var(--cyan));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        .idcard-avatar img {
          width: 100%; height: 100%; border-radius: 50%; object-fit: cover;
        }

        .idcard-right { flex: 1; min-width: 0; }
        .idcard-name {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.01em;
          line-height: 1.15;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .idcard-role {
          margin-top: 3px;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--cyan);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .idcard-dept {
          margin-top: 2px;
          font-size: 10px;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .idcard-divider {
          margin-top: 14px;
          height: 1px;
          background: linear-gradient(90deg, rgba(148,163,184,0.28), rgba(148,163,184,0.02));
        }

        .idcard-bottom-row {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .idcard-field-label {
          font-family: var(--font-mono);
          font-size: 8px;
          letter-spacing: 0.14em;
          color: var(--text-secondary);
          text-transform: uppercase;
        }
        .idcard-field-value {
          margin-top: 2px;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.06em;
          color: var(--text-mono);
        }

        .idcard-seal {
          position: absolute;
          right: 16px;
          bottom: 14px;
          width: 34px;
          height: 34px;
          z-index: 2;
          opacity: 0.85;
        }

        @media (prefers-reduced-motion: reduce) {
          .idcard-border-wrap { animation: none; }
          .idcard-status-dot { animation: none; }
        }
      `}</style>

      <div className="idcard-outer">
        <motion.div
          className="idcard-halo"
          animate={reduceMotion ? {} : { rotate: 360 }}
          transition={reduceMotion ? {} : { duration: 42, ease: "linear", repeat: Infinity }}
        />

        <div className="idcard-border-wrap">
          <div className="idcard-surface">
            <AuroraWave reduceMotion={reduceMotion} />
            <Starfield reduceMotion={reduceMotion} />
            <div className="idcard-vignette" />

            <div className="idcard-content">
              <div className="idcard-top-row">
                <div>
                  <div className="idcard-eyebrow">Identification</div>
                  <div className="idcard-orgname">{orgName}</div>
                </div>
                <div className="idcard-status">
                  <span className="idcard-status-dot" />
                  {status}
                </div>
              </div>

              <div className="idcard-body">
                <div className="idcard-left">
                  <SmartChip />
                  <div className="idcard-avatar">
                    {photoUrl ? <img src={photoUrl} alt={name} /> : initials}
                  </div>
                </div>
                <div className="idcard-right">
                  <div className="idcard-name">{name}</div>
                  <div className="idcard-role">{role}</div>
                  <div className="idcard-dept">{department}</div>
                </div>
              </div>

              <div className="idcard-divider" />

              <div className="idcard-bottom-row">
                <div>
                  <div className="idcard-field-label">ID No.</div>
                  <div className="idcard-field-value">{idNumber}</div>
                </div>
                <div>
                  <div className="idcard-field-label">Valid Thru</div>
                  <div className="idcard-field-value">{validThru}</div>
                </div>
              </div>
            </div>

            <HoloSeal reduceMotion={reduceMotion} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Optional preview wrapper — drop this in a page to see the card
 * centered on a dark backdrop. Not required for using the card itself.
 */
export function IDCardShowcase() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(60% 60% at 50% 40%, #0c0e18 0%, #05060c 70%, #030308 100%)",
        padding: "40px",
      }}
    >
      <ProfessionalIDCard />
    </div>
  );
}
import { motion, useTransform } from "framer-motion";
import Typewriter from "./Typewriter";
import MagneticButton from "./MagneticButton";
import Lanyard from "../assets/Lanyard/lanyard2.png";
import TiltedCard from "./TiltedCard";
import SplitText from "./ui/SplitText";
import { useScrollVelocity } from "../hooks/useScrollVelocity";
import { EASE_CINEMATIC } from "../constants/animation";

export default function Hero() {
  const { smoothVelocity } = useScrollVelocity();
  const skewY = useTransform(smoothVelocity, [-15, 15], [-3.5, 3.5]);

  function scrollToWork(e) {
    e.preventDefault();
    const el = document.querySelector("#work");
    if (window.__lenis && el) {
      window.__lenis.scrollTo(el, { offset: -32, duration: 1.3 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <motion.section
      id="top"
      style={{ skewY }}
      className="relative mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-6 px-6 pt-36 pb-20 sm:px-10 lg:grid-cols-2 lg:gap-14 lg:pt-32"
    >
      {/* Left: Interactive Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE_CINEMATIC, delay: 0.1 }}
        className="order-2 flex justify-center lg:order-1 lg:justify-start mb-10 lg:mb-0"
      >
        <TiltedCard
          imageSrc={Lanyard}
          altText="Rendra Gadhing"
          captionText="Rendra Gadhing"
          containerHeight="426px"
          containerWidth="260px"
          imageHeight="426px"
          imageWidth="260px"
          rotateAmplitude={14}
          scaleOnHover={1.04}
          showMobileWarning={false}
          showTooltip={false}
          displayOverlayContent
          overlayContent={
            <div className="rounded-md border border-line bg-bg-950/80 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-fg-soft backdrop-blur-sm">
              Software Engineer
            </div>
          }
        />
      </motion.div>

      {/* Right: Typography & Introduction */}
      <div className="order-1 lg:order-2">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_CINEMATIC, delay: 0.05 }}
          className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg-muted"
        >
          Backend &amp; Frontend Developer
        </motion.p>

        <h1 className="mt-6 font-display text-[13vw] font-semibold leading-[0.98] tracking-[-0.02em] text-fg sm:text-6xl lg:text-[4.2rem]">
          <SplitText text="Rendra" delay={0.12} />
          <br />
          <SplitText text="Gadhing" delay={0.25} />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_CINEMATIC, delay: 0.35 }}
          className="mt-7 flex items-center gap-2.5"
        >
          <span className="font-mono text-lg text-accent sm:text-xl">&gt;</span>
          <Typewriter
            className="font-mono text-lg text-fg-soft sm:text-xl"
            words={[
              "Backend & Frontend Developer",
              "Laravel & React Engineer",
              "API & Database Architect",
            ]}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_CINEMATIC, delay: 0.45 }}
          className="mt-7 max-w-md text-[15px] leading-[1.75] text-fg-muted"
        >
          Siswa SMKN 8 Semarang keahlian Pengembangan Perangkat Lunak dan Gim. Berpengalaman membangun sistem web berbasis schema API Laravel dan antarmuka React yang terstruktur, cepat, dan teruji.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_CINEMATIC, delay: 0.55 }}
          className="mt-10 flex items-center gap-6"
        >
          <MagneticButton onClick={scrollToWork}>
            View My Work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 11L11 3M11 3H4.5M11 3V9.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MagneticButton>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector("#contact");
              if (window.__lenis && el) window.__lenis.scrollTo(el, { offset: -32, duration: 1.2 });
            }}
            className="font-mono text-[12px] uppercase tracking-[0.14em] text-fg-muted underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-fg"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

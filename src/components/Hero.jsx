import { motion } from "framer-motion";
import HeroOrb from "./HeroOrb";
import Typewriter from "./Typewriter";
import MagneticButton from "./MagneticButton";
import ProfessionalIDCard from "./Professionalidcard";
import Lanyard from "../assets/Lanyard/lanyard2.png";
import TiltedCard from "./TiltedCard";
import Particles from "./ui/particles";


const springIn = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", stiffness: 100, damping: 15, delay },
});

function scrollToWork(e) {
  e.preventDefault();
  const el = document.querySelector("#work");
  if (window.__lenis && el) {
    window.__lenis.scrollTo(el, { offset: -32, duration: 1.3 });
  } else if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-4 px-6 pt-32 pb-16 sm:px-10 lg:grid-cols-2 lg:gap-12 lg:pt-24"
    >
     
      {/* Left: visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.1 }}
        className="order-2 lg:order-1 flex justify-center lg:order-1 lg:justify-start mb-14 lg:mb-0"
      >
       <TiltedCard
          imageSrc={Lanyard}
          altText="Rendra Gadhing"
          captionText="Rendra Gadhing"
          containerHeight="426px"
          containerWidth="260px"
          imageHeight="426px" 
          imageWidth="260px"
          rotateAmplitude={16}
          scaleOnHover={1.05}
          showMobileWarning={false}
          showTooltip
          displayOverlayContent
          overlayContent={
            <p className="tilted-card-demo-text text-blue-800 text-md">
              Rendra Gadhing
            </p>
        } 
      />
      </motion.div>

      {/* Right: typography */}
      <div className="order-2 lg:order-2">
        <motion.p
          {...springIn(0.05)}
          className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg-muted"
        >
          <span className="text-fg-dim">// </span>
          Backend &amp; Frontend Developer
        </motion.p>

        <motion.h1
          {...springIn(0.16)}
          className="mt-6 font-display text-[13vw] font-medium leading-[0.98] tracking-tight text-fg sm:text-6xl lg:text-[4.2rem]"
        >
          Rendra
          <br />
          Gadhing
        </motion.h1>

        <motion.div {...springIn(0.3)} className="mt-7 flex items-center gap-2.5">
          <span className="font-mono text-lg text-accent-soft sm:text-xl">&gt;</span>
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
          {...springIn(0.42)}
          className="mt-7 max-w-md text-[15px] leading-relaxed text-fg-muted"
        >
         Saya adalah Rendra Gadhing Pamungkas seorang siswa dari SMKN 8 Semarang jurusan Pengembangan Perangkat Lunak dan Gim yang telah berpegalaman dalam membangun aplikasi berbasis web menggunakan Laravel dan React selama setahun ini.
        </motion.p>

        <motion.div {...springIn(0.54)} className="mt-10 flex items-center gap-5">
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
              if (window.__lenis && el) window.__lenis.scrollTo(el, { offset: -32 });
            }}
            className="font-mono text-[12.5px] uppercase tracking-[0.1em] text-fg-muted underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-fg"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}

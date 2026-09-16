import { useState, useEffect } from "react";
import useLenis from "./hooks/useLenis";
import { useMagneticSnap } from "./hooks/useMagneticSnap";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import About from "./components/About";
import Certificate from "./components/Certificate";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import ClickSpark from "./components/ui/ClickSpark";
import CloudDivider from "./components/ui/CloudDivider";
import ScrollToTop from "./components/ui/ScrollToTop";
import Preloader from "./components/intro/Preloader";
import FilmIntro from "./components/intro/FilmIntro";

export default function App() {
  useLenis();
  useMagneticSnap(["top", "stack", "work", "about", "certificate", "contact"]);

  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Check if intro was already experienced in this session
    const seen = sessionStorage.getItem("portfolio_intro_seen");
    if (seen === "true") {
      setShowIntro(false);
    }
  }, []);

  const handlePreloadComplete = () => {
    setLoading(false);
    const seen = sessionStorage.getItem("portfolio_intro_seen");
    if (seen !== "true") {
      setShowIntro(true);
    }
  };

  const handleIntroFinish = () => {
    setShowIntro(false);
  };

  return (
    <div className="relative min-h-screen bg-bg-950 text-fg antialiased selection:bg-accent-dim selection:text-fg">
      <div className="noise-overlay" />

      {loading && <Preloader onComplete={handlePreloadComplete} />}
      {!loading && showIntro && <FilmIntro onFinish={handleIntroFinish} />}

      <ClickSpark
        sparkColor="rgba(255, 255, 255, 0.7)"
        sparkSize={8}
        sparkRadius={14}
        sparkCount={6}
        duration={350}
      >
        <ScrollProgress />
        <CustomCursor />
        <ScrollToTop />
        <Navbar />

        <main>
          <Hero />
          <CloudDivider />
          <TechStack />
          <CloudDivider />
          <Projects />
          <CloudDivider />
          <About />
          <CloudDivider />
          <Certificate />
          <CloudDivider />
        </main>

        <Contact />
      </ClickSpark>
    </div>
  );
}

import useLenis from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";

export default function App() {
  useLenis();

  return (
    <div className="relative min-h-screen bg-bg-950">
      <div className="noise-overlay" />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <Projects />
        
        <About />
      </main>
      <Contact />
    </div>
  );
}

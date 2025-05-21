"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Volunteering from "./components/Volunteering";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import HackathonSection from "./components/Hackathon";
import IntroOverlay from "./components/IntroOverlay";
import Publications from "./components/Publications";

function App() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      showOverlay || isModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showOverlay, isModalOpen]);

  const handleOverlayComplete = () => {
    setShowOverlay(false);
  };

  if (!hasMounted) return null;

  return (
    <>
      {showOverlay && (
        <IntroOverlay
          visible={showOverlay}
          onComplete={handleOverlayComplete}
        />
      )}

      {!showOverlay && (
        <main className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500 scroll-smooth">
          <Navbar isModalOpen={isModalOpen} />
          <Hero />
          <Experience />
          <Education />
          <Publications />
          <Volunteering />
          <Skills />
          <Projects setIsModalOpen={setIsModalOpen} />
          <HackathonSection />
          <Contact />
        </main>
      )}
    </>
  );
}

export default App;

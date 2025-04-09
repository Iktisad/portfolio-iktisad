"use client";

import { useEffect, useState } from "react";

const TransitionCurtain = () => {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const heroSection = document.getElementById("hero-section");
    const experienceSection = document.getElementById("experience");

    const handleScroll = () => {
      if (!heroSection || !experienceSection) return;

      const heroBottom = heroSection.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;

      const scrollProgress = Math.min(
        Math.max(1 - heroBottom / viewportHeight, 0),
        1
      );
      setProgress(scrollProgress);

      if (scrollProgress > 0.1) {
        setActive(true); // ✨ Start showing curtain only when scrolled ~10% past hero bottom
      } else {
        setActive(false); // Curtain hidden initially
      }

      // Fade in Experience after curtain passes
      if (scrollProgress >= 0.95) {
        experienceSection.classList.add("opacity-100", "scale-100");
        experienceSection.classList.remove("opacity-0", "scale-95");
      } else {
        experienceSection.classList.remove("opacity-100", "scale-100");
        experienceSection.classList.add("opacity-0", "scale-95");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="transition-curtain"
      className={`fixed inset-0 pointer-events-none transition-transform duration-700 ${
        active ? "z-50" : "z-0"
      }`}
      style={{
        transform: `translateY(${(1 - progress) * 100}%)`,
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(240,240,240,1))",
      }}
    >
      {/* Mist or petals can be added here */}
    </div>
  );
};

export default TransitionCurtain;

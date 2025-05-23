"use client";

import { useEffect, useState } from "react";
import { FloatingDock } from "./FloatingDock";
import { useDynamicSakura } from "../hooks/useDynamicSakura";
import { useStaticSakura } from "../hooks/useStaticSakura";

const Hero = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHeroText, setShowHeroText] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // run once on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Always call both hooks
  useStaticSakura("static-sakura-layer", 1000);
  useDynamicSakura("dyname-sakura-layer", 4000); // Will not run if mobile

  const handleFlip = () => {
    if (window.innerWidth < 768) {
      setIsFlipped((prev) => !prev);
    }
  };

  useEffect(() => {
    // Animate hero heading after mount
    const delay = setTimeout(() => {
      setShowHeroText(true);
    }, 300); // delay for a smooth fade-in
    return () => clearTimeout(delay);
  }, []);

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden font-['M_PLUS_Rounded_1c'] pt-24 pb-12"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-rose-200 via-indigo-100 to-blue-200 dark:from-gray-900 dark:via-gray-700 dark:to-rose-600 opacity-30 aurora-bg animate-aurora " />

      {/* Sakura Blossom Background */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-no-repeat bg-left-top opacity-10 dark:opacity-25 bg-[length:980px_980px] bg-[url('/imgs/mobile_cherry_blossom.png')] md:bg-[url('/imgs/cherry_blossom.svg')] dark:bg-[url('/imgs/black_cherry_blossom_rsize.svg')]" />
      {/* Static Sakura Layer */}
      <div
        id="static-sakura-layer"
        className="absolute inset-0 z-[2] pointer-events-none"
      />

      {/* Dynamic Petals Layer */}
      <div
        id="dynamic-sakura-layer"
        className="absolute inset-0 z-[3] pointer-events-none"
      />

      {/* Main Hero Content */}
      <div
        id="hero-main"
        className="relative z-10 flex flex-col-reverse md:flex-row items-center md:justify-between px-6 max-w-6xl w-full mx-auto"
      >
        <div className="text-center text-gray-700 dark:text-white md:text-left space-y-5 max-w-xl">
          {/* Animated Hero Heading */}
          <h1
            className={`${
              showHeroText
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-6 scale-95"
            } transition-all duration-1000 ease-out text-4xl md:text-6xl font-['Orbitron'] font-bold uppercase leading-tight tracking-wide drop-shadow-md`}
          >
            Iktisad Rashid
          </h1>
          {/* 👇 Mobile-only Floating Dock right after name */}
          {isMobile && (
            <div className="mt-10 mb-10">
              <FloatingDock />
            </div>
          )}

          <p className="text-lg md:text-xl">
            I build intelligent web systems that blend creativity with
            performance.
          </p>

          <p className="text-base text-gray-800 dark:text-gray-100 leading-relaxed">
            I’m a full-stack Software Engineer with 3+ years of experience
            building real-world products—from EHR platforms to CMS tools. I love
            working across the stack, integrating AI, and crafting clean,
            functional experiences. When I’m not coding, I’m probably cooking,
            watching anime, or learning a new life skill.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
            {/* See my work */}
            <a
              href="#projects"
              className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform shadow-md"
            >
              See My Work
            </a>
            {/* Download my resume */}
            <a
              href="/resume.html"
              target="_bank"
              rel="noopener noreferrer"
              className="group relative w-auto cursor-pointer overflow-hidden rounded-full border-2 border-orange-600 dark:border-white backdrop-blur-xs px-6 py-3 text-orange-600 dark:text-white font-normal shadow-md transition-all duration-300 ease-in-out hover:bg-orange-500 hover:text-white flex items-center justify-center"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-orange-500 dark:bg-white transition-transform duration-300 group-hover:scale-[100.8]"></div>
                <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
                  Download Resume
                </span>
              </div>

              <div className="absolute top-0 left-0 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white dark:hover:text-orange-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <span className="font-normal">Download Resume</span>
                <img
                  src="/imgs/download.svg"
                  alt="Download Icon"
                  className="w-5 h-5 dark:hidden"
                />
                <img
                  src="/imgs/download-dark.svg"
                  alt="Download Icon Dark"
                  className="w-5 h-5 hidden dark:inline-block"
                />
              </div>
            </a>
            {/* 👇 Desktop-only FloatingDock stays inside buttons */}
            {!isMobile && <FloatingDock />}
          </div>
        </div>

        {/* Flipping Profile Image */}
        <div className="mt-5 mb-10 md:mt-0 md:ml-10 relative">
          <div
            className="relative w-60 h-60 md:w-80 md:h-80 perspective"
            onClick={handleFlip}
          >
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded-full md:hidden pointer-events-none animate-pulse z-20">
              Tap to Flip
            </div>
            <div
              className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                isFlipped ? "rotate-y-180" : ""
              } md:hover:rotate-y-180`}
            >
              <div className="absolute w-full h-full backface-hidden">
                <img
                  src="/imgs/profile_img.png"
                  alt="Animated Iktisad"
                  className="w-full h-full object-cover rounded-full border-4 border-orange-500 shadow-xl dark:border-orange-400 dark:shadow-[0_0_20px_5px_rgba(251,146,60,0.7)]"
                />
              </div>
              <div className="absolute w-full h-full rotate-y-180 backface-hidden">
                <img
                  src="/imgs/me.png"
                  alt="Real Iktisad"
                  className="w-full h-full object-cover rounded-full border-4 border-orange-500 shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

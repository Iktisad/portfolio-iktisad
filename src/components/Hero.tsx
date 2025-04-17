"use client";

import { useEffect, useState } from "react";
import { FloatingDock } from "./FloatingDock";
import { useSakura } from "../hooks/useSakura";

const Hero = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHeroText, setShowHeroText] = useState(false);

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
  useSakura("static-sakura-layer", "sakura-layer", true);

  
  
  
  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden font-['M_PLUS_Rounded_1c'] pt-24 pb-12"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-200 via-indigo-100 to-blue-200 dark:from-gray-900 dark:via-gray-700 dark:to-rose-600 opacity-40 blur-2xl aurora-bg animate-aurora" />

      {/* Sakura Blossom Background */}
      <div className="absolute inset-0 bg-[url('/imgs/cherry_blossom.svg')] bg-[length:980px_980px] dark:bg-[url('/imgs/black_cherry_blossom.svg')] bg-no-repeat bg-left-top opacity-10 dark:opacity-25 pointer-events-none" />

      {/* Static Sakura Layer */}
      <div
        id="static-sakura-layer"
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Dynamic Petals Layer */}
      <div
        id="sakura-layer"
        className="absolute inset-0 pointer-events-none z-0"
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
          <div className="block md:hidden mt-10 mb-10">
            <FloatingDock />
          </div>
          <p className="text-lg md:text-xl">
            I build intelligent web systems that blend creativity with
            performance.
          </p>

          <p className="text-base text-gray-800 dark:text-gray-100 leading-relaxed">
            I'm a Software Engineer with 3+ years of experience building backend
            systems and full-stack apps. From EHR platforms to publication CMS
            tools, I craft software that solves real problems.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
            <a
              href="#projects"
              className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform shadow-md"
            >
              See My Work
            </a>

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

              <div className="absolute top-0 left-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white dark:hover:text-orange-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
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
            <div className="hidden md:block">
              <FloatingDock />
            </div>
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
                  className="w-full h-full object-cover rounded-full border-4 border-orange-500 shadow-xl dark:border-orange-400 dark:shadow-[0_0_20px_5px_rgba(251,146,60,0.7)] md:dark:shadow-[0_0_12px_2px_rgba(251,146,60,0.4)] md:dark:hover:shadow-[0_0_20px_5px_rgba(251,146,60,0.7)]"
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

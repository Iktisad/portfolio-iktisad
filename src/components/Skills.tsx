"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useState, useEffect, useMemo } from "react";
import data from "../data/data.json";

const skills = data.skills;

const Skills = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hovering, setHovering] = useState(false);

  const [sectionRef, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);

    const darkQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
    const handleDarkModeChange = (e: MediaQueryListEvent) =>
      setIsDarkMode(e.matches);
    if (darkQuery) {
      setIsDarkMode(darkQuery.matches);
      darkQuery.addEventListener("change", handleDarkModeChange);
    }

    return () => {
      window.removeEventListener("mousemove", move);
      if (darkQuery) darkQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, []);

  const animationValues = useMemo(
    () =>
      skills.map(() => ({
        randomX: (Math.random() - 0.5) * 800,
        randomY: (Math.random() - 0.5) * 800,
        initialRotate: Math.random() * 720 - 360,
        finalRotate: (Math.random() - 0.5) * 20,
      })),
    []
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      {/* Lamp Effect - Only Dark Mode */}
      {isDarkMode && (
        <motion.div
          animate={{
            width: hovering ? 500 : 400,
            height: hovering ? 500 : 400,
            opacity: hovering ? 1 : 0.8,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="pointer-events-none absolute z-30 mix-blend-soft-light"
          style={{
            top: position.y - (hovering ? 250 : 200) + window.scrollY,
            left: position.x - (hovering ? 250 : 200) + window.scrollX,
            willChange: "transform, opacity",
            transform: "translateZ(0)",
            WebkitTransform: "translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="absolute w-full h-full bg-gradient-radial from-orange-300/30 via-orange-400/50 to-transparent rounded-full blur-3xl" />
        </motion.div>
      )}

      {/* Sakura Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/imgs/petals/sakura_1.svg"
          className="sakura-petal blur-md scale-150 left-[10%] top-0 absolute"
          style={{ "--i": 0 } as React.CSSProperties}
        />
        <img
          src="/imgs/petals/sakura_2.png"
          className="sakura-petal blur-sm scale-125 left-[25%] top-0 absolute"
          style={{ "--i": 1 } as React.CSSProperties}
        />
        <img
          src="/imgs/petals/sakura_3.png"
          className="sakura-petal scale-100 left-[50%] top-0 absolute"
          style={{ "--i": 2 } as React.CSSProperties}
        />
        <img
          src="/imgs/petals/sakura_1.svg"
          className="sakura-petal scale-75 left-[70%] top-0 absolute"
          style={{ "--i": 3 } as React.CSSProperties}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold mb-16 text-left font-['Orbitron']">
          Skills
        </h2>

        <div className="relative">
          {/* Skills Cards */}
          <div className="flex flex-wrap gap-3 lg:gap-6 mt-10">
            {skills.map((skill, idx) => {
              const { randomX, randomY, initialRotate, finalRotate } =
                animationValues[idx];

              return (
                <motion.div
                  key={idx}
                  initial={{
                    opacity: 0,
                    x: randomX,
                    y: randomY,
                    rotate: initialRotate,
                    scale: 0.4,
                    filter: "blur(10px)",
                  }}
                  animate={
                    inView
                      ? {
                          opacity: 1,
                          x: 0,
                          y: 0,
                          rotate: finalRotate,
                          scale: 1,
                          filter: "blur(0px)",
                        }
                      : {}
                  }
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 15,
                    mass: 1,
                    delay: idx * 0.07,
                  }}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  className="w-28 h-40 relative bg-white dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center transform hover:scale-110 transition-all origin-center border-2 border-orange-400 shadow-[0_0_12px_2px_rgba(251,146,60,0.4)] hover:shadow-[0_0_20px_5px_rgba(251,146,60,0.7)]"
                >
                  {"iconClass" in skill && skill.iconClass ? (
                    <i className={`${skill.iconClass} text-4xl mb-3`} />
                  ) : "iconUrl" in skill && skill.iconUrl ? (
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      className="w-10 h-10 mb-3 object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-10 h-10 mb-3 bg-gray-300 rounded-full" />
                  )}
                  <h4 className="text-center font-semibold text-xs text-gray-700 dark:text-gray-300">
                    {skill.name}
                  </h4>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

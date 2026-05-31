
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useState, useEffect, useRef, useMemo } from "react";
import data from "../data/data.json";
import { SectionTransition } from "./SectionTransition";
import { Momiji } from "./Momiji";
import { useDarkMode } from "../hooks/useDarkMode";

const skills = data.skills;

const Skills = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDarkMode = useDarkMode();
  const [hovering, setHovering] = useState(false);
  const rafRef = useRef<number>();

  const [sectionRef, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
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
      className="relative py-20 overflow-hidden bg-gradient-to-b from-amber-100/15 via-surface to-surface dark:from-transparent dark:via-transparent dark:to-transparent"
    >
      <Momiji />
      {/* Lamp / Sunbeam — dark: interactive lamp, light: static afternoon sunbeam */}
      {isDarkMode ? (
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
          <div className="absolute w-full h-full bg-gradient-radial from-accent-muted/30 via-accent-muted/50 to-transparent rounded-full blur-3xl" />
        </motion.div>
      ) : (
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(251,211,141,0.22) 0%, rgba(251,191,36,0.08) 40%, transparent 70%)",
          }}
        />
      )}

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
                  className="w-28 h-40 relative bg-surface-raised rounded-xl flex flex-col items-center justify-center transform hover:scale-110 transition-all origin-center border-2 border-accent-muted shadow-glow-sm hover:shadow-glow-lg"
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
                    <div className="w-10 h-10 mb-3 bg-edge rounded-full" />
                  )}
                  <h4 className="text-center font-semibold text-xs text-on-surface-muted">
                    {skill.name}
                  </h4>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <SectionTransition />
    </section>
  );
};

export default Skills;

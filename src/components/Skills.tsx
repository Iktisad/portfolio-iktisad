"use client";

import { motion, useAnimation } from "framer-motion";
import React, { useState, useEffect } from "react";

const skills = [
  { name: "React.js", iconClass: "devicon-react-original text-sky-400" },
  {
    name: "Next.js",
    iconClass: "devicon-nextjs-original-wordmark dark:text-white",
  },
  { name: "Node.js", iconClass: "devicon-nodejs-plain text-green-600" },
  { name: "TypeScript", iconClass: "devicon-typescript-plain text-blue-500" },
  { name: "TailwindCSS", iconClass: "devicon-tailwindcss-plain text-sky-400" },
  { name: "Docker", iconClass: "devicon-docker-plain text-blue-500" },
  { name: "MongoDB", iconClass: "devicon-mongodb-plain text-green-700" },
  {
    name: "Google Cloud",
    iconClass: "devicon-googlecloud-plain text-yellow-500",
  },
  { name: "Python", iconClass: "devicon-python-plain text-yellow-400" },
  { name: "Firebase", iconClass: "devicon-firebase-plain text-orange-400" },
];

const Skills = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);

    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkQuery.matches);
    const handleDarkModeChange = (e: MediaQueryListEvent) =>
      setIsDarkMode(e.matches);
    darkQuery.addEventListener("change", handleDarkModeChange);

    return () => {
      window.removeEventListener("mousemove", move);
      darkQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative bg-gray-50 dark:bg-gray-900 py-32 overflow-hidden"
    >
      {/* Lamp Effect - Only Dark Mode */}
      {isDarkMode && (
        <motion.div
          animate={{
            width: hovering ? 500 : 400,
            height: hovering ? 500 : 400,
            opacity: hovering ? 1 : 0.8,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="pointer-events-none fixed z-30 mix-blend-soft-light"
          style={{
            left: position.x - (hovering ? 250 : 200),
            top: position.y - (hovering ? 250 : 200),
          }}
        >
          <div className="absolute w-full h-full bg-gradient-radial from-orange-300/30 via-orange-400/50 to-transparent rounded-full blur-3xl" />
        </motion.div>
      )}

      {/* Sakura Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/imgs/sakura.svg"
          className="sakura-petal blur-md scale-150 left-[10%] top-0 absolute"
          style={{ "--i": 0 } as React.CSSProperties}
        />
        <img
          src="/imgs/cherry_blossom_petal_1.png"
          className="sakura-petal blur-sm scale-125 left-[25%] top-0 absolute"
          style={{ "--i": 1 } as React.CSSProperties}
        />
        <img
          src="/imgs/cherry_blossom_petal_2.png"
          className="sakura-petal scale-100 left-[50%] top-0 absolute"
          style={{ "--i": 2 } as React.CSSProperties}
        />
        <img
          src="/imgs/sakura.svg"
          className="sakura-petal scale-75 left-[70%] top-0 absolute"
          style={{ "--i": 3 } as React.CSSProperties}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold mb-16 text-left text-gray-800 dark:text-white font-['Orbitron']">
          Skills
        </h2>

        <div className="relative">
          <div className="absolute top-0 left-6 bottom-0 w-1 bg-orange-400 dark:bg-orange-600 rounded-full" />
          <div className="flex flex-wrap gap-6 mt-10 pl-14">
            {skills.map((skill, idx) => {
              const rotate = (idx - skills.length / 2) * 4;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  className="w-28 h-40 relative bg-white dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center transform hover:scale-110 transition-all origin-bottom border-2 border-orange-400 shadow-[0_0_12px_2px_rgba(251,146,60,0.4)] hover:shadow-[0_0_20px_5px_rgba(251,146,60,0.7)]"
                  style={{
                    rotate: `${rotate}deg`,
                  }}
                >
                  <i className={`${skill.iconClass} text-4xl mb-3`} />
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

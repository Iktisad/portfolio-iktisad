"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useState, useEffect } from "react";

const skills = [
  { name: "Java", iconClass: "devicon-java-plain text-red-600" },
  { name: "C Sharp", iconClass: "devicon-csharp-plain colored" },
  { name: "Node.js", iconClass: "devicon-nodejs-plain text-green-600" },
  { name: "TypeScript", iconClass: "devicon-typescript-plain text-blue-500" },
  { name: "JavaScript", iconClass: "devicon-javascript-plain text-yellow-400" },
  { name: "Python", iconClass: "devicon-python-plain text-yellow-400" },
  { name: "PHP", iconClass: "devicon-php-plain colored" },
  {
    name: "Next.js",
    iconClass: "devicon-nextjs-original-wordmark dark:text-white",
  },
  { name: "MySQL", iconClass: "devicon-mysql-plain text-blue-500" },
  { name: "MongoDB", iconClass: "devicon-mongodb-plain text-green-700" },
  { name: "PostgreSQL", iconClass: "devicon-postgresql-plain text-blue-500" },
  { name: "Firebase", iconClass: "devicon-firebase-plain text-orange-400" },
  { name: "React.js", iconClass: "devicon-react-original text-sky-400" },
  {
    name: "Vue JS",
    iconClass: "devicon-vuejs-plain colored dark:text-white",
  },
  { name: "TailwindCSS", iconClass: "devicon-tailwindcss-plain text-sky-400" },
  { name: "Docker", iconClass: "devicon-docker-plain text-blue-500" },
  {
    name: "Google Cloud",
    iconClass: "devicon-googlecloud-plain text-yellow-500",
  },
  {
    name: "AWS",
    iconClass:
      "devicon-amazonwebservices-plain-wordmark colored text-orange-400",
  },
  {
    name: "DigitalOcean",
    iconClass: "devicon-digitalocean-plain text-blue-400",
  },

  // Not in devicon → use external CDN images
  {
    name: "ChatGPT API",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  },
  {
    name: "Cohere AI",
    iconUrl: "/imgs/cohere-color.svg",
  },
];

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
    if (darkQuery) {
      setIsDarkMode(darkQuery.matches);
      const handleDarkModeChange = (e: MediaQueryListEvent) =>
        setIsDarkMode(e.matches);
      darkQuery.addEventListener("change", handleDarkModeChange);
      return () => darkQuery.removeEventListener("change", handleDarkModeChange);
    }

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative bg-white dark:bg-gray-900 py-20 overflow-hidden"
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
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
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
          {/* Vertical Line */}
          {/* <div className="absolute top-0 left-6 bottom-0 w-1 bg-orange-400 dark:bg-orange-600 rounded-full" /> */}

          {/* Skills Cards */}
          <div className="flex flex-wrap gap-3 lg:gap-6 mt-10">
            {skills.map((skill, idx) => {
              const randomX = (Math.random() - 0.5) * 800;
              const randomY = (Math.random() - 0.5) * 800;
              const initialRotate = Math.random() * 720 - 360;
              const finalRotate = (Math.random() - 0.5) * 20;

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
                  {skill.iconClass ? (
                    <i className={`${skill.iconClass} text-4xl mb-3`} />
                  ) : skill.iconUrl ? (
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

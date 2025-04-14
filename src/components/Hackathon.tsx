"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

const hackathons = [
  {
    title: "Bagel Hacks 2025",
    project: "ReadCheckAI",
    description:
      "Developed a real-time fact-checking Chrome extension that highlights potentially inaccurate claims and suggests verified sources. Built a working prototype using Node.js, Express, TypeScript, and Cohere’s NLP APIs within 24 hours under tight constraints.",
    award: "Top 5 Finalist",
    svg: "/imgs/trophy.svg",
    link: "https://devpost.com/software/readcheck-ai",
  },
  {
    title: "ConUHacks 2025",
    project: "Wildfire Response and Prediction",
    description:
      "Built a wildfire response scheduling and prediction prototype during ConUHacks, addressing SAP’s challenge using real-time data analysis and optimization strategies.",
    award: "SAP Sponsor Challenge Attempted",
    svg: "/imgs/star.svg",
    link: "https://devpost.com/software/conuhacks_sap_challenge",
  },
];

const HackathonSection = () => {
  return (
    <section
      id="hackathons"
      className="relative py-32 bg-gradient-to-br from-white via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
    >
      {/* Background Floating Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-8 h-8 rounded-full bg-orange-300 opacity-20 blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-6 h-6 rounded-full bg-orange-400 opacity-20 blur-2xl animate-ping" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 z-5">
        <h2 className="text-4xl font-bold text-left mb-16 text-gray-800 dark:text-white font-['Orbitron'] tracking-wide">
          Hackathons
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {hackathons.map((hack, index) => (
            <HackathonCard key={index} {...hack} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const HackathonCard = ({
  title,
  project,
  description,
  award,
  svg,
  link,
  index,
}: {
  title: string;
  project: string;
  description: string;
  award: string;
  svg: string;
  link: string;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5); // start at center
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [12, -12]); // sharper tilt
  const rotateY = useTransform(mouseX, [0, 1], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = (e.clientX - bounds.left) / bounds.width;
    const y = (e.clientY - bounds.top) / bounds.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: "1000px", // better perspective
      }}
      initial={{ opacity: 0, x: -80 }} // slide from left
      whileInView={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 80 }} // slide out to right
      transition={{
        type: "spring",
        stiffness: 300, // snappier spring
        damping: 20,
      }}
      viewport={{ once: true }}
      className="relative group rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md p-6 border-2 border-orange-400 shadow-[0_0_12px_2px_rgba(251,146,60,0.4)] hover:shadow-[0_0_20px_5px_rgba(251,146,60,0.7)] transition-all duration-300 overflow-hidden"
    >
      {/* Award Badge */}
      <motion.div
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2,
          delay: index * 0.5,
          ease: "easeInOut",
        }}
        className="absolute flex space-x-2 top-6 left-6 bg-orange-400 dark:bg-orange-700/30 dark:text-orange-300 text-white text-xs font-bold px-3 py-1 rounded-full shadow"
      >
        <img className="h-4 w-4" src={svg} alt="star" /> <span> {award}</span>
      </motion.div>

      <div className="pt-10 flex flex-col h-full justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            {title}
          </h3>
          <p className="text-sm text-orange-500 dark:text-orange-400 mb-3 font-semibold">
            {project}
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">
            {description}
          </p>
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-400 hover:underline font-semibold"
        >
          View Project →
        </a>
      </div>
    </motion.div>
  );
};

export default HackathonSection;

"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

const hackathons = [
  {
    title: "Bagel Hacks 2025",
    description:
      "Built an AI-powered travel buddy suggesting real-time personalized itineraries based on events and weather.",
    award: "🏆 Top 5 Finalist",
    link: "https://devpost.com/software/travel-buddy-ai",
  },
  {
    title: "ConUHacks 2025",
    description:
      "Designed a mentor-mentee matchmaking app using GraphQL APIs, focusing on underrepresented communities.",
    award: "🌟 SAP Sponsor Challenge Attempted",
    link: "#",
  },

  {
    title: "Jack Hacks 2025",
    description:
      "Created a decentralized voting platform using zk-SNARKs for anonymous, secure elections.",
    award: "🔒 Best Privacy Award",
    link: "https://ethglobal.com/showcase/votechain",
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
        <div className="absolute top-10 left-10 w-8 h-8 rounded-full bg-orange-300 opacity-20 blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-6 h-6 rounded-full bg-orange-400 opacity-20 blur-2xl animate-ping"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 z-10">
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
  description,
  award,
  link,
  index,
}: {
  title: string;
  description: string;
  award: string;
  link: string;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);

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
        transformPerspective: "1200px",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 14 }}
      viewport={{ once: true }}
      className="relative group rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md p-6 border border-orange-300  dark:border-orange-700 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
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
        className="absolute top-6 left-6 bg-orange-400 dark:bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow"
      >
        {award}
      </motion.div>

      <div className="pt-10 flex flex-col h-full justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            {title}
          </h3>

          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">
            {description}
          </p>
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-500 hover:underline font-semibold"
        >
          View Project →
        </a>
      </div>
    </motion.div>
  );
};

export default HackathonSection;

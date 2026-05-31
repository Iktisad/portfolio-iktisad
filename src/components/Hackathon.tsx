"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import data from "../data/data.json";
import { SectionTransition } from "./SectionTransition";

const hackathons = data.hackathons;

const HackathonSection = () => {
  return (
    <section
      id="hackathons"
      className="relative py-20 bg-gradient-to-br from-surface via-surface-raised to-surface-raised dark:from-surface dark:via-surface-raised dark:to-surface overflow-hidden"
    >
      {/* Background Floating Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-8 h-8 rounded-full bg-accent-muted opacity-20 blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-6 h-6 rounded-full bg-accent-muted opacity-20 blur-2xl animate-ping" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 z-5">
        <h2 className="text-4xl font-bold text-left mb-16 text-on-surface font-['Orbitron'] tracking-wide">
          Hackathons
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {hackathons.map((hack, index) => (
            <HackathonCard key={index} {...hack} index={index} />
          ))}
        </div>
      </div>

      <SectionTransition />
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
      className="relative group rounded-2xl bg-surface-raised/40 dark:bg-surface/20 backdrop-blur-md p-6 border-2 border-accent-muted shadow-glow-sm hover:shadow-glow-lg transition-all duration-300 overflow-hidden"
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
        className="absolute flex space-x-2 top-6 left-6 bg-accent-muted dark:bg-accent-subtle/30 dark:text-accent-muted text-white text-xs font-bold px-3 py-1 rounded-full shadow"
      >
        <img className="h-4 w-4" src={svg} alt="star" /> <span> {award}</span>
      </motion.div>

      <div className="pt-10 flex flex-col h-full justify-between">
        <div>
          <h3 className="text-2xl font-bold text-on-surface mb-3">
            {title}
          </h3>
          <p className="text-sm text-accent dark:text-accent-muted mb-3 font-semibold">
            {project}
          </p>
          <p className="text-on-surface-muted text-sm leading-relaxed mb-6">
            {description}
          </p>
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-muted hover:underline font-semibold"
        >
          View Project →
        </a>
      </div>
    </motion.div>
  );
};

export default HackathonSection;

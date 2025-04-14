"use client";

import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import ProjectModal from "./ProjectModal";

interface ExpandableProjectCardProps {
  thumbnail: string;
  title: string;
  shortDescription: string;
  fullDescription: {
    type: "paragraph" | "points";
    content: string | string[];
  }[];
  tech: string[];
  images: string[];
  buttonText: string;
  buttonLink: string;
}

const ExpandableProjectCard: React.FC<ExpandableProjectCardProps> = ({
  thumbnail,
  title,
  shortDescription,
  fullDescription,
  tech,
  images,
  buttonText,
  buttonLink,
}) => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    const card = cardRef.current;
    const shadow = shadowRef.current;
    if (!card || !shadow) return;

    card.style.transition = "transform 0.2s ease-out";
    card.style.transformOrigin = "top center";
    card.style.transform = `
      perspective(1400px)
      rotateX(30deg)
      scale(0.90)
    `;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const shadow = shadowRef.current;
    if (!card || !shadow) return;

    card.style.transition = "transform 0.4s ease";
    card.style.transformOrigin = "center center";
    card.style.transform = `
      perspective(1400px)
      rotateX(0deg)
      scale(1)
    `;

    shadow.style.transition =
      "opacity 0.4s ease-out, transform 0.4s ease-out, background 0.4s ease-out";
    shadow.style.opacity = "0";
    shadow.style.background = "transparent";
    shadow.style.transform = "scale(1)";
  };

  return (
    <>
      <div className="relative h-full" onClick={() => setOpen(true)}>
        {/* Orange Glow Shadow */}
        <div
          ref={shadowRef}
          className="absolute inset-0 z-0 rounded-3xl opacity-0 blur-3xl transition-all duration-300"
        ></div>

        {/* Card */}
        <motion.div
          ref={cardRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative z-10 w-full h-full bg-white dark:bg-gray-800 rounded-3xl overflow-hidden cursor-pointer border-2 border-orange-400 shadow-[0_0_12px_2px_rgba(251,146,60,0.4)] hover:shadow-[0_0_20px_5px_rgba(251,146,60,0.7)] p-6 flex flex-col justify-between transition-transform"
        >
          {/* Top: Image */}
          <div className="w-full h-40 rounded-xl mb-4 overflow-hidden bg-neutral-50 dark:bg-orange-300">
            <img
              src={thumbnail}
              alt="Project Preview"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Middle: Title and Short Description */}
          <div className="flex-1 w-full">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white font-['Orbitron'] mb-2">
              {title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {shortDescription}
            </p>
          </div>

          {/* Bottom: Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-4">
            {tech.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-semibold bg-orange-100 text-orange-600 dark:bg-orange-700/30 dark:text-orange-300 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      {open && (
        <ProjectModal
          isOpen={open}
          onClose={() => setOpen(false)}
          project={{
            title,
            description: fullDescription,
            images,
            tech,
            link: buttonLink,
            text: buttonText,
          }}
        />
      )}
    </>
  );
};

export default ExpandableProjectCard;

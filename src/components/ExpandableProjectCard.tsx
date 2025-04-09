"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import ProjectModal from "./ProjectModal";

interface ExpandableProjectCardProps {
  title: string;
  shortDescription: string;
  fullDescription: string;
  tech: string[];
  images: string[];
  buttonText: string;
  buttonLink: string;
}

const ExpandableProjectCard: React.FC<ExpandableProjectCardProps> = ({
  title,
  shortDescription,
  fullDescription,
  tech,
  images,
  buttonText,
  buttonLink,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{
          scale: 1.03,
          boxShadow: "0 10px 30px rgba(255, 150, 150, 0.2)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onClick={() => setOpen(true)}
        className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-md cursor-pointer border border-orange-300 dark:border-orange-700 p-6 flex flex-col items-start justify-between gap-4 hover:ring-2 hover:ring-orange-400 transition-all"
      >
        {/* Placeholder Image */}
        <div className="w-full h-40 bg-gradient-to-br from-orange-100 via-pink-100 to-rose-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 rounded-xl mb-4 animate-pulse" />

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white font-['Orbitron']">
          {title}
        </h3>

        {/* Short Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {shortDescription}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-2">
          {tech.map((t, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs font-semibold bg-orange-100 text-orange-600 dark:bg-orange-800 dark:text-orange-300 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>

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
          }}
        />
      )}
    </>
  );
};

export default ExpandableProjectCard;

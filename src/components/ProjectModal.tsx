"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    images: string[];
    tech: string[];
    link?: string;
  } | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  if (!project) return null;

  useEffect(() => {
    // Close on ESC key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    // 👉 LOCK BODY SCROLL when modal opens
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-100"
          onClick={onClose} // Clicking backdrop closes modal
        >
          <motion.div
            initial={{ scale: 0, borderRadius: "100px" }}
            animate={{ scale: 1, borderRadius: "32px" }}
            exit={{ scale: 0, borderRadius: "100px" }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 18,
              mass: 0.7,
            }}
            className="relative bg-white dark:bg-neutral-900 max-w-4xl w-full mx-6 p-8 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()} // Stop click bubbling
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-3xl text-gray-700 dark:text-gray-200 hover:text-red-500"
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white font-['Orbitron']">
              {project.title}
            </h2>

            {/* Images */}
            <div className="flex overflow-x-auto gap-6 mb-8 scrollbar-hide">
              {project.images.map((img, idx) => (
                <div
                  key={idx}
                  className="min-w-[300px] h-48 rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0 shadow-md"
                >
                  <img
                    src={img}
                    alt="Project preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-base md:text-lg">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1 bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-orange-300 text-sm font-semibold rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Visit Project Link */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full text-center transition-all duration-300"
              >
                Visit Project →
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;

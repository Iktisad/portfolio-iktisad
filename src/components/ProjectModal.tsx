"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: { type: "paragraph" | "points"; content: string | string[] }[];
    images: string[];
    tech: string[];
    link?: string;
    text?: string;
  } | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [previewImageIndex, setPreviewImageIndex] = useState<number | null>(
    null
  );
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);

  if (!project) return null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (previewImageIndex !== null) {
        if (e.key === "ArrowLeft" && previewImageIndex > 0) {
          setPreviewImageIndex((prev) => (prev !== null ? prev - 1 : prev));
        } else if (
          e.key === "ArrowRight" &&
          previewImageIndex < project.images.length - 1
        ) {
          setPreviewImageIndex((prev) => (prev !== null ? prev + 1 : prev));
        } else if (e.key === "Escape") {
          setPreviewImageIndex(null);
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewImageIndex, project.images.length, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const el = imageContainerRef.current;
    if (el) {
      const totalScrollableWidth = el.scrollWidth;
      const visibleWidth = el.clientWidth;
      setScrollable(totalScrollableWidth > visibleWidth);
    }
  }, [project.images.length]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => {
            if (previewImageIndex !== null) {
              setPreviewImageIndex(null);
            } else {
              onClose();
            }
          }}
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
            className="relative bg-white mt-12 dark:bg-neutral-900 max-w-4xl w-full mx-6 p-8 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Main Modal Button */}
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

            {/* Images Scroll Section */}
            <div className="relative mb-8">
              <div
                ref={imageContainerRef}
                className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-2 py-4"
              >
                {project.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    style={{ rotate: Math.random() * 20 - 10 }}
                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 100 }}
                    whileTap={{ scale: 1.05, rotate: 0, zIndex: 100 }}
                    onClick={() => setPreviewImageIndex(idx)}
                    className="rounded-xl p-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-md shrink-0 snap-center cursor-pointer"
                  >
                    <img
                      src={img}
                      alt="Project Preview"
                      className="rounded-lg w-28 h-28 md:w-48 md:h-48 object-cover"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Fading gradient edges */}
              {scrollable && (
                <>
                  <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white dark:from-neutral-900 to-transparent pointer-events-none" />
                  <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white dark:from-neutral-900 to-transparent pointer-events-none" />
                </>
              )}
            </div>

            {/* Description */}
            <div className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-base md:text-lg space-y-4">
              {project.description.map((item, idx) => {
                if (item.type === "paragraph") {
                  return (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      {item.content as string}
                    </motion.p>
                  );
                }
                if (item.type === "points") {
                  return (
                    <motion.ul
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="list-disc list-inside pl-5 space-y-2"
                    >
                      {(item.content as string[]).map((point, pointIdx) => (
                        <motion.li
                          key={pointIdx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + pointIdx * 0.05 }}
                        >
                          {point}
                        </motion.li>
                      ))}
                    </motion.ul>
                  );
                }
                return null;
              })}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1 bg-orange-100 text-orange-700 dark:bg-amber-600/80 dark:text-orange-100 text-sm font-semibold rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Visit Button */}
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-orange-500/80 hover:bg-amber-600 text-white font-bold rounded-full text-center transition-all duration-300"
              >
                {project.text || "Visit Project "}
              </a>
            )}
          </motion.div>

          {/* Fullscreen Image Preview */}
          <AnimatePresence>
            {previewImageIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
                onClick={() => setPreviewImageIndex(null)}
              >
                <div
                  className="relative flex items-center justify-center w-full h-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Left Arrow */}
                  {previewImageIndex > 0 && (
                    <button
                      onClick={() =>
                        setPreviewImageIndex((prev) =>
                          prev !== null ? prev - 1 : prev
                        )
                      }
                      className="absolute left-6 text-gray-400 text-5xl hover:text-orange-400 transition"
                    >
                      &#8592;
                    </button>
                  )}

                  {/* Image */}
                  <motion.img
                    key={previewImageIndex}
                    src={project.images[previewImageIndex]}
                    alt="Fullscreen Preview"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
                  />

                  {/* Right Arrow */}
                  {previewImageIndex < project.images.length - 1 && (
                    <button
                      onClick={() =>
                        setPreviewImageIndex((prev) =>
                          prev !== null ? prev + 1 : prev
                        )
                      }
                      className="absolute right-6 text-gray-400 text-5xl hover:text-orange-400 transition"
                    >
                      &#8594;
                    </button>
                  )}

                  {/* Close */}
                  <button
                    onClick={() => setPreviewImageIndex(null)}
                    className="absolute top-6 right-6 mt-20 md:mt-0 text-white text-3xl hover:text-red-400 transition"
                  >
                    &times;
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;

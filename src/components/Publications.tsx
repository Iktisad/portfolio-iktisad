"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import data from "../data/data.json";

const publicationsData = data.publications;

const Publications: React.FC = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
        } else {
          controls.start({ opacity: 0, y: 30, transition: { duration: 0.6 } });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [controls]);

  return (
    <motion.section
      id="publications"
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      className="relative py-16 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold mb-16 text-left font-['Orbitron']">
          Publications
        </h2>

        <div className="relative">
          <div className="absolute top-0 left-6 bottom-0 w-1 bg-orange-400 dark:bg-orange-600 rounded-full" />

          <div className="flex flex-col space-y-16 pl-14">
            {publicationsData.map((publication, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={controls}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-9.5 top-2 w-4 h-4 bg-orange-400 dark:bg-orange-600 rounded-full group-hover:scale-125 transition-transform" />

                <div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                    {publication.journal.publishedDate}
                  </div>

                  <h3 className="text-2xl font-bold leading-snug mb-2">
                    {publication.title}
                  </h3>

                  <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-2">
                    {publication.journal.name}
                  </p>

                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {publication.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {publication.methods.map((method, i) => (
                      <span
                        key={i}
                        className="inline-block bg-orange-100 dark:bg-orange-700/30 text-orange-700 dark:text-orange-300 text-xs font-semibold px-3 py-1 rounded-full shadow-sm hover:scale-105 transition-transform"
                      >
                        {method}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-sm mt-4">
                    <a
                      href={publication.links.mdpi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 dark:text-orange-400 font-semibold hover:underline"
                    >
                      DOI → {publication.identifiers.DOI}
                    </a>
                    <a
                      href={publication.links.pmc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 dark:text-orange-400 font-semibold hover:underline"
                    >
                      PMCID → {publication.identifiers.PMCID}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Publications;

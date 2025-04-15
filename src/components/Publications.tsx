"use client";

import { motion } from "framer-motion";

const publicationsData = [
  {
    title: "A Study on AI Algorithms for Real-Time Systems",
    journal: "Journal of Computer Science and Technology",
    year: 2023,
    description:
      "A comprehensive study on various AI algorithms optimized for real-time systems, with a focus on deep learning and reinforcement learning models.",
    link: "https://example.com/publication1",
  },
];

const Publications: React.FC = () => {
  return (
    <motion.section
      id="publications"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="relative bg-white dark:bg-gray-900 py-16 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-4xl font-bold mb-16 text-left text-gray-800 dark:text-white font-['Orbitron']">
          Publications
        </h2>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute top-0 left-6 bottom-0 w-1 bg-orange-400 dark:bg-orange-600 rounded-full" />

          {/* Publication Entries */}
          <div className="flex flex-col space-y-16 pl-14">
            {publicationsData.map((publication, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-9.5 top-2 w-4 h-4 bg-orange-400 dark:bg-orange-600 rounded-full group-hover:scale-125 transition-transform" />

                <div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                    {publication.year}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                    {publication.title}
                  </h3>
                  <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-3">
                    {publication.journal}
                  </p>
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {publication.description}
                  </p>
                  <a
                    href={publication.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 dark:text-orange-400 font-semibold hover:underline"
                  >
                    Read Full Publication
                  </a>
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

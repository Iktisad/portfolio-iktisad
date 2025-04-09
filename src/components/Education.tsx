"use client";

import { motion } from "framer-motion";
import React from "react";

const Education: React.FC = () => {
  const educationData = [
    {
      date: "2023 – 2024",
      degree: "Master of Engineering in Quality Systems Engineering",
      institution: "Concordia University — Montreal, QC",
    },
    {
      date: "2015 – 2020",
      degree: "Bachelor of Science in Computer Science",
      institution: "BRAC University — Dhaka, Bangladesh",
    },
  ];

  return (
    <section
      id="education"
      className="relative bg-white dark:bg-gray-900 py-32 overflow-hidden"
    >
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
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-4xl font-bold mb-16 text-left text-gray-800 dark:text-white font-['Orbitron']">
          Education
        </h2>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute top-0 left-6 bottom-0 w-1 bg-orange-400 dark:bg-orange-600 rounded-full" />

          {/* Education Entries */}
          <div className="flex flex-col space-y-16 pl-14">
            {educationData.map((edu, index) => (
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
                    {edu.date}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-3">
                    {edu.institution}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

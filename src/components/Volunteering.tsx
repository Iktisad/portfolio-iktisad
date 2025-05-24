"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";

const volunteeringExperiences = [
  {
    date: "2023 – 2024",
    title: "Vice President Internal",
    organization:
      "Bangladeshi Graduate Student Association (BDGSA) – Concordia University",
    description: `Represented the Bangladeshi graduate student community at Concordia University in official capacities. Organized cultural, academic, and networking events, and collaborated across student associations to enhance student engagement and support.`,
  },
  // Add more entries here later
];

const Volunteering: React.FC = () => {
  const [sectionRef, inView] = useInView({ threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 1 } });
    } else {
      controls.start({ opacity: 0, y: 60, transition: { duration: 0.5 } });
    }
  }, [inView, controls]);

  return (
    <motion.section
      id="volunteering"
      ref={sectionRef}
      initial={{ opacity: 0, y: 60 }}
      animate={controls}
      className="relative py-20 overflow-hidden"
    >
      {/* Sakura Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/imgs/petals/sakura_1.svg"
          className="sakura-petal blur-md scale-150 left-[10%] top-0 absolute"
          style={{ "--i": 0 } as React.CSSProperties}
        />
        <img
          src="/imgs/petals/sakura_2.png"
          className="sakura-petal blur-sm scale-125 left-[25%] top-0 absolute"
          style={{ "--i": 1 } as React.CSSProperties}
        />
        <img
          src="/imgs/petals/sakura_3.png"
          className="sakura-petal scale-100 left-[50%] top-0 absolute"
          style={{ "--i": 2 } as React.CSSProperties}
        />
        <img
          src="/imgs/petals/sakura_1.svg"
          className="sakura-petal scale-75 left-[70%] top-0 absolute"
          style={{ "--i": 3 } as React.CSSProperties}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold mb-16 text-left text-gray-800 dark:text-white font-['Orbitron']">
          Volunteering & Leadership
        </h2>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute top-0 left-6 bottom-0 w-1 bg-orange-400 dark:bg-orange-600 rounded-full" />

          {/* Volunteering Entries */}
          <div className="flex flex-col space-y-16 pl-14">
            {volunteeringExperiences.map((volunteer, index) => (
              <VolunteeringEntry
                key={index}
                volunteer={volunteer}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const VolunteeringEntry: React.FC<{
  volunteer: {
    date: string;
    title: string;
    organization: string;
    description: string;
  };
  index: number;
}> = ({ volunteer, index }) => {
  const [entryRef, inView] = useInView({ threshold: 0.3 });
  const entryControls = useAnimation();

  useEffect(() => {
    if (inView) {
      entryControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay: index * 0.1 },
      });
    } else {
      entryControls.start({ opacity: 0, y: 50, transition: { duration: 0.5 } });
    }
  }, [inView, entryControls, index]);

  return (
    <motion.div
      ref={entryRef}
      animate={entryControls}
      initial={{ opacity: 0, y: 50 }}
      className="relative group"
    >
      {/* Timeline Dot */}
      <div className="absolute -left-9.5 top-2 w-4 h-4 bg-orange-400 dark:bg-orange-600 rounded-full group-hover:scale-125 transition-transform" />

      <div>
        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
          {volunteer.date}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {volunteer.title}
        </h3>
        <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-3">
          {volunteer.organization}
        </p>
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {volunteer.description}
        </p>
      </div>
    </motion.div>
  );
};

export default Volunteering;

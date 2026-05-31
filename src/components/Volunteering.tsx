"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";
import data from "../data/data.json";
import { Bamboo } from "./Bamboo";
import { Fireflies } from "./Fireflies";

const volunteeringExperiences = data.volunteering;

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
      <Bamboo />
      <Fireflies />
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold mb-16 text-left text-on-surface font-['Orbitron']">
          Volunteering & Leadership
        </h2>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute top-0 left-6 bottom-0 w-1 bg-accent-muted dark:bg-accent-strong rounded-full" />

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
      <div className="absolute -left-9.5 top-2 w-4 h-4 bg-accent-muted dark:bg-accent-strong rounded-full group-hover:scale-125 transition-transform" />

      <div>
        <div className="text-xs font-semibold text-on-surface-subtle mb-1">
          {volunteer.date}
        </div>
        <h3 className="text-2xl font-bold text-on-surface">
          {volunteer.title}
        </h3>
        <p className="text-sm italic text-on-surface-subtle mb-3">
          {volunteer.organization}
        </p>
        <p className="text-base text-on-surface-muted leading-relaxed">
          {volunteer.description}
        </p>
      </div>
    </motion.div>
  );
};

export default Volunteering;

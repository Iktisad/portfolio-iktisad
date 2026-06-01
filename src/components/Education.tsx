
import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import data from "../data/data.json";
import { Cranes } from "./Cranes";

// Define types for EducationData
type EducationData = {
  date: string;
  degree: string;
  institution: string;
  courses: string[]; // Array of courses
};

const Education: React.FC = () => {
  const educationData: EducationData[] = data.education;

  const fadeControls = useAnimation();
  const sectionRef = useRef(null);

  // IntersectionObserver logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fadeControls.start({
              opacity: 1,
              y: 0,
              transition: { duration: 0.8 },
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3, // When 30% of the element is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [fadeControls]);

  return (
    <motion.section
      id="education"
      ref={sectionRef}
      initial={{ opacity: 0, y: 60 }}
      animate={fadeControls}
      className="relative pt-24 pb-24 overflow-hidden bg-gradient-to-b from-amber-50/20 via-surface to-surface dark:from-transparent dark:via-transparent dark:to-transparent"
    >
      <Cranes />
      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-4xl font-bold mb-10 text-left font-['Orbitron']">
          Education
        </h2>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute top-0 left-6 bottom-0 w-1 bg-accent-muted dark:bg-accent-strong rounded-full" />

          {/* Education Entries */}
          <div className="flex flex-col space-y-16 pl-14">
            {educationData.map((edu, index) => (
              <EducationEntry key={index} edu={edu} index={index} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const EducationEntry = React.memo(
  ({ edu, index }: { edu: EducationData; index: number }) => {
    const fadeControls = useAnimation();
    const entryRef = useRef(null);
    const hasAnimated = useRef(false);
    const isMobile = useRef(false);

    useEffect(() => {
      // Set isMobile only once on mount
      isMobile.current = window.innerWidth <= 768;
    }, []);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          const isInView = entry.isIntersecting;

          if (isInView && !hasAnimated.current) {
            fadeControls.start({
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: index * 0.2 },
            });
            hasAnimated.current = true;
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.3 }
      );

      if (entryRef.current) observer.observe(entryRef.current);

      return () => {
        if (entryRef.current) observer.unobserve(entryRef.current);
      };
    }, [index, fadeControls]);

    return (
      <motion.section
        ref={entryRef}
        animate={fadeControls}
        initial={{ opacity: 0, y: 50 }}
        className="relative group"
      >
        {/* Timeline Dot */}
        <div className="absolute -left-9.5 top-2 w-4 h-4 bg-accent-muted dark:bg-accent-strong rounded-full group-hover:scale-125 transition-transform" />

        <div>
          <div className="text-xs font-semibold text-on-surface-subtle mb-1">
            {edu.date}
          </div>
          <h3 className="text-2xl font-bold leading-snug">{edu.degree}</h3>
          <p className="text-sm italic text-on-surface-subtle mb-3">
            {edu.institution}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {edu.courses.map((course, i) => (
              <span
                key={i}
                className="inline-block bg-accent-subtle text-accent-strong dark:bg-accent-subtle/10 dark:text-accent-muted text-xs font-semibold px-3 py-1 rounded-full shadow-sm hover:scale-105 transition-transform"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </motion.section>
    );
  }
);

export default Education;

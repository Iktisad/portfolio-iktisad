"use client";
import React from "react"; // Add this import if you're using JSX in this file
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

// Define types for EducationData
type EducationData = {
  date: string;
  degree: string;
  institution: string;
  courses: string[]; // Array of courses
};

const Education: React.FC = () => {
  // Education data with type annotation
  const educationData: EducationData[] = [
    {
      date: "2023 – 2024",
      degree: "Master of Engineering in Quality Systems Engineering",
      institution: "Concordia University — Montreal, QC",
      courses: [
        "Six Sigma and Lean",
        "Statistical Quality Control",
        "Project Management",
        "Software Quality Assurance",
      ],
    },
    {
      date: "2015 – 2020",
      degree: "Bachelor of Science in Computer Science",
      institution: "BRAC University — Dhaka, Bangladesh",
      courses: [
        "Data Structures and Algorithms",
        "Database Systems",
        "Artificial Intelligence",
        "Software Engineering",
        "Operating Systems",
      ],
    },
  ];

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
          } else {
            fadeControls.start({
              opacity: 0,
              y: 60,
              transition: { duration: 0.8 },
            });
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
      className="relative bg-white dark:bg-gray-900 py-20 overflow-hidden"
    >
      {/* Sakura Background (Lazy Load Images) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <LazyImage
          src="/imgs/sakura.svg"
          className="sakura-petal blur-md scale-100 left-[10%] top-0"
        />
        <LazyImage
          src="/imgs/cherry_blossom_petal_1.png"
          className="sakura-petal blur-sm scale-100 left-[30%] top-0"
        />
      </div>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-4xl font-bold mb-10 text-left text-gray-800 dark:text-white font-['Orbitron']">
          Education
        </h2>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute top-0 left-6 bottom-0 w-1 bg-orange-400 dark:bg-orange-600 rounded-full" />

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

// Memoized Education Entry to avoid re-rendering
const EducationEntry = React.memo(
  ({ edu, index }: { edu: EducationData; index: number }) => {
    const fadeControls = useAnimation();
    const entryRef = useRef(null);

    // IntersectionObserver for each entry
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              fadeControls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: index * 0.2 },
              });
            } else {
              fadeControls.start({
                opacity: 0,
                y: 50,
                transition: { duration: 0.8 },
              });
            }
          });
        },
        {
          threshold: 0.3, // Trigger when 30% of the element is in view
        }
      );

      if (entryRef.current) {
        observer.observe(entryRef.current);
      }

      return () => {
        if (entryRef.current) {
          observer.unobserve(entryRef.current);
        }
      };
    }, [index, fadeControls]);

    return (
      <motion.div
        ref={entryRef}
        animate={fadeControls}
        initial={{ opacity: 0, y: 50 }}
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
          {/* Relevant Courses */}
          <div className="flex flex-wrap gap-2 mt-4">
            {edu.courses.map((course, i) => (
              <span
                key={i}
                className="inline-block bg-orange-100 dark:bg-orange-700/30 text-orange-700 dark:text-orange-300 text-xs font-semibold px-3 py-1 rounded-full shadow-sm hover:scale-105 transition-transform"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }
);

// Lazy Image Component to load images only when they are in view
const LazyImage = ({ src, className }: { src: string; className: string }) => (
  <img src={src} className={className} loading="lazy" alt="Sakura Blossom" />
);

export default Education;

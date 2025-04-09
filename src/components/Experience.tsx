"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";

const experiences = [
  {
    date: "Aug 2024 – Present",
    title: "Full Stack Developer",
    company: "BANGLA (Voluntary)",
    points: [
      "Built REST APIs with Node.js, SQLite, and Google Drive integration.",
      "Deployed full CMS system on DigitalOcean using NGINX.",
      "Automated content publishing workflows for articles & media.",
    ],
  },
  {
    date: "Jan 2022 – Dec 2022",
    title: "Software Engineer II (Team Lead)",
    company: "Rainier Technologies",
    points: [
      "Led a team of 4 developers to build a scalable cloud EHR system.",
      "Optimized DB query performance by 40%.",
      "Established CI/CD pipelines using Docker, Jenkins, and GitHub Actions.",
    ],
  },
  {
    date: "Jan 2021 – Dec 2021",
    title: "Software Engineer I",
    company: "Rainier Technologies",
    points: [
      "Built Node.js microservices and backend APIs for internal tools.",
      "Enhanced frontend apps with React.js, improving UX by 30%.",
      "Wrote automated unit tests achieving 85% coverage.",
    ],
  },
  {
    date: "Sep 2020 – Dec 2020",
    title: "Software Engineer Intern",
    company: "Rainier Technologies",
    points: [
      "Developed Vue.js dashboards based on Figma designs.",
      "Cleaned, processed, and visualized large datasets using Python (Pandas).",
      "Refactored and optimized backend Java modules.",
    ],
  },
];

const Experience: React.FC = () => {
  const [sectionRef, inView] = useInView({ threshold: 0.2 });
  const fadeControls = useAnimation();

  // Fade in the section content once it's in view
  useEffect(() => {
    if (inView) {
      fadeControls.start({ opacity: 1, y: 0, transition: { duration: 1 } });
    } else {
      fadeControls.start({ opacity: 0, y: 60, transition: { duration: 0.5 } });
    }
  }, [inView, fadeControls]);

  return (
    <motion.section
      id="experience"
      ref={sectionRef}
      initial={{ opacity: 0, y: 60 }}
      animate={fadeControls}
      className="relative bg-gray-50 dark:bg-gray-900 py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-4xl font-bold mb-16 text-gray-800 dark:text-white font-['Orbitron']">
          My Work Experience
        </h2>

        <div className="relative">
          {/* Vertical timeline line on the left */}
          <div className="absolute top-0 left-6 bottom-0 w-1 bg-orange-400 dark:bg-orange-600 rounded-full" />

          {/* Experience Entries */}
          <div className="flex flex-col space-y-16 pl-14">
            {experiences.map((exp, index) => (
              <ExperienceEntry key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const ExperienceEntry: React.FC<{
  exp: { date: string; title: string; company: string; points: string[] };
  index: number;
}> = ({ exp, index }) => {
  const [entryRef, inView] = useInView({ threshold: 0.3 });
  const entryControls = useAnimation();

  // Fade in each entry individually
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
      {/* Dot for the timeline — same left-6 as line, no transforms needed */}
      <div className="absolute -left-9.5 top-2 w-4 h-4 bg-orange-400 dark:bg-orange-600 rounded-full group-hover:scale-125 transition-transform" />

      <div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          {exp.date}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {exp.title}
        </h3>
        <p className="italic text-sm text-gray-500 dark:text-gray-400 mb-3">
          {exp.company}
        </p>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-1">
          {exp.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Experience;

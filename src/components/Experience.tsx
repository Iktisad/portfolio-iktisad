"use client";

import { motion } from "framer-motion";

import { useRef, useState, useEffect } from "react";
interface ExperienceItem {
  date: string;
  title: string;
  company: string;
  location: string;
  points: string[]; // Explicitly define that points is an array of strings
}
const experiences: ExperienceItem[] = [
  {
    date: "Aug 2024 – Present",
    title: "Full Stack Developer  (Voluntary - On call)",
    company: "B.A.N.G.L.A Bengali Magazine Portfolio and CMS",
    location: "Montreal, Canada",
    points: [
      "Designed and developed a magazine portfolio site to showcase community articles, photos, and videos, ensuring responsiveness and accessibility.",
      "Developed REST API service in Node.js & SQLite for real-time content management, handling 2,000+ requests/day.",
      "Deployed and configured a DigitalOcean Droplet with NGINX, supporting 1,000+ concurrent readers.",
      "Implemented rate limiting (20 requests/IP) to ensure stability and prevent overload.",
      "Automated content publishing workflows for 50+ articles and media files using Google Sheets and Drive.",
      "Developed 30+ Postman test scripts, automating API validation and reducing manual verification time by 40%",
    ],
  },
  {
    date: "Jan 2022 – Dec 2022",
    title: "Software Engineer II (Team Lead)",
    company: "Rainier Technologies",
    location: "Dhaka, Bangladesh",
    points: [
      "Supervised the development and integration of a cloud-based EHR system for managing patient data, billing, and appointment scheduling, handling 10,000+ patient records across multiple clinics.",
      "Refactored database, reducing query response time from 1.5 seconds to 0.9 seconds, improving system performance by 40%.",
      "Developed a medicine search module using MeiliSearch, reducing search latency by 60% for real-time data retrieval by doctors.",
      "Implemented secure authentication (JWT & RBAC), ensuring data integrity and user role management.",
      "Built CI/CD pipelines with Jenkins and Docker, reducing deployment failures by 30%.",
    ],
  },
  {
    date: "Jan 2021 – Dec 2021",
    title: "Software Engineer I",
    company: "Rainier Technologies",
    location: "Dhaka, Bangladesh",
    points: [
      "Developed and maintained RESTful APIs to enable seamless data exchange between Java and Node.js services.",
      "Delivered 5+ features per sprint within a SCRUM environment, developing front-end billing interfaces and back-end payment services to enhance user experience.",
      "Created automated tests and regression testing suites, reducing post-deployment issues by 80%.",
      "Reviewed and refactored 1,500+ lines of C# and JavaScript code, ensuring adherence to coding standards and improving system stability and application load speed by 20%.",
      "Assisted in database design and query optimization, reducing data retrieval latency by 30%.",
    ],
  },
  {
    date: "Sep 2020 – Dec 2020",
    title: "Software Engineer Intern",
    company: "Rainier Technologies",
    location: "Dhaka, Bangladesh",
    points: [
      "Translated Figma designs into responsive appointment interfaces using Vue.js and TailwindCSS, accelerating frontend development and improving user engagement.",
      "Processed 5,000+ patient data entries with Python, improving data quality and insights.",
      "Collaborated with senior developers to refactor legacy Java code, improving system performance and reducing technical debt.",
    ],
  },
];

const Experience = () => {
  const [sectionInView, setSectionInView] = useState(false);
  const sectionRef = useRef(null);

  // Detect when the experience section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setSectionInView(entry.isIntersecting),
      {
        threshold: window.innerWidth <= 768 ? 0.1 : 0.2, // Adjusted threshold for mobile screens
      }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="experience"
      className="relative bg-gray-50 dark:bg-gray-900 py-20 overflow-hidden will-change-transform"
      initial={{ opacity: 0, y: 70 }}
      animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 70 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold mb-16 text-gray-800 dark:text-white font-['Orbitron']">
          My Work Experience
        </h2>

        <div className="relative">
          {/* Vertical timeline */}
          <div className="absolute top-0 left-6 bottom-0 w-1 bg-orange-400 dark:bg-orange-600 rounded-full" />

          {/* Experience List */}
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

interface ExperienceEntryProps {
  exp: ExperienceItem; // Using the ExperienceItem type here
  index: number;
}

const ExperienceEntry = ({ exp, index }: ExperienceEntryProps) => {
  const [entryInView, setEntryInView] = useState(false);
  const entryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setEntryInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (entryRef.current) {
      observer.observe(entryRef.current);
    }
    return () => {
      if (entryRef.current) {
        observer.unobserve(entryRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={entryRef}
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: entryInView ? 1 : 0,
        y: entryInView ? 0 : 50,
      }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      {/* Timeline Dot */}
      <div className="absolute -left-9.5 top-2 w-4 h-4 bg-orange-400 dark:bg-orange-600 rounded-full group-hover:scale-125 transition-transform" />

      <div>
        <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">
          {exp.date}
        </div>

        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
          {exp.title}
        </h3>

        {/* Company + Location */}
        <div className="flex items-center flex-wrap gap-2 mb-3">
          <p className="italic text-sm text-gray-500 dark:text-gray-400">
            {exp.company}
          </p>
          <span className="text-xs md:text-sm text-gray-400 dark:text-gray-500">
            |
          </span>
          <div className="flex items-center text-xs md:text-sm text-gray-500 dark:text-gray-400">
            <img
              src="/imgs/location_pin.svg"
              alt="Location"
              className="w-4 h-4 mr-1"
            />
            {exp.location}
          </div>
        </div>

        <ul className="list-disc ml-5 space-y-1 text-gray-700 dark:text-gray-300">
          {exp.points.map((point, idx) => (
            <li key={idx}>{point}</li> // Explicitly typing point as string
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Experience;

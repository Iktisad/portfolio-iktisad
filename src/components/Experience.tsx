"use client";
import React, { useEffect, useRef, useState } from "react";
import data from "../data/data.json";

interface ExperienceItem {
  date: string;
  title: string;
  company: string;
  location: string;
  points: string[];
}

const experiences: ExperienceItem[] = data.experiences;

function useInView({
  threshold = 0.4,
  once = true,
}: { threshold?: number; once?: boolean } = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setHasBeenInView(true);
          if (once && currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      { threshold },
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, once]);

  return [ref, once ? hasBeenInView : inView] as const;
}

const Experience: React.FC = () => {
  const [sectionRef, sectionInView] = useInView({
    threshold: 0.15,
    once: true,
  });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      style={{
        transform: sectionInView ? "translateY(0)" : "translateY(50px)",
        opacity: sectionInView ? 1 : 0,
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
    >
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold mb-10 text-left font-['Orbitron']">
          My Work Experience
        </h2>

        <div className="relative">
          <div className="absolute top-0 left-6 bottom-0 w-1 bg-orange-400 dark:bg-orange-600 rounded-full" />
          <div className="flex flex-col space-y-16 pl-14">
            {experiences.map((exp, index) => (
              <ExperienceEntry key={index} exp={exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceEntry = React.memo(({ exp }: { exp: ExperienceItem }) => {
  const [ref, inView] = useInView({ threshold: 0.4, once: true });

  return (
    <div
      ref={ref}
      className="relative group"
      style={{
        transform: inView ? "translateY(0)" : "translateY(50px)",
        opacity: inView ? 1 : 0,
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
    >
      {/* Timeline Dot */}
      <div className="absolute -left-9.5 top-2 w-4 h-4 bg-orange-400 dark:bg-orange-600 rounded-full group-hover:scale-125 transition-transform" />

      <div>
        <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">
          {exp.date}
        </div>
        <h3 className="text-2xl font-bold">{exp.title}</h3>
        <div className="text-sm italic text-gray-500 dark:text-gray-400 mb-2">
          {exp.company} — {exp.location}
        </div>
        <ul className="list-disc ml-5 space-y-1 text-gray-700 dark:text-gray-300 text-base">
          {exp.points.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
});
export default Experience;

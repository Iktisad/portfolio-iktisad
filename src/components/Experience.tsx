import React from "react";
import { useInView } from "react-intersection-observer";
import data from "../data/data.json";
import { Lanterns } from "./Lanterns";
import { JapaneseHouse } from "./JapaneseHouse";

interface ExperienceItem {
  date: string;
  title: string;
  company: string;
  location: string;
  points: string[];
}

const experiences: ExperienceItem[] = data.experiences;

const Experience: React.FC = () => {
  const [sectionRef, sectionInView] = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative pt-28 pb-24 overflow-hidden bg-gradient-to-b from-amber-100/25 via-surface to-surface dark:from-transparent dark:via-transparent dark:to-transparent"
      style={{
        transform: sectionInView ? "translateY(0)" : "translateY(50px)",
        opacity: sectionInView ? 1 : 0,
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
    >
      <JapaneseHouse />
      <Lanterns />
      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold mb-10 text-left font-['Orbitron']">
          My Work Experience
        </h2>

        <div className="relative">
          <div className="absolute top-0 left-6 bottom-0 w-1 bg-accent-muted dark:bg-accent-strong rounded-full" />
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
  const [ref, inView] = useInView({ threshold: 0.4, triggerOnce: true });

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
      <div className="absolute -left-9.5 top-2 w-4 h-4 bg-accent-muted dark:bg-accent-strong rounded-full group-hover:scale-125 transition-transform" />

      <div>
        <div className="text-xs md:text-sm text-on-surface-muted mb-1">
          {exp.date}
        </div>
        <h3 className="text-2xl font-bold">{exp.title}</h3>
        <div className="text-sm italic text-on-surface-subtle mb-2">
          {exp.company} — {exp.location}
        </div>
        <ul className="list-disc ml-5 space-y-1 text-on-surface-muted text-base">
          {exp.points.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
});
export default Experience;

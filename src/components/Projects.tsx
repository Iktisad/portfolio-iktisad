"use client";

import ExpandableProjectCard from "../components/ExpandableProjectCard";

const Projects = () => {
  const projects = [
    {
      title: "Cloud EHR System",
      shortDescription: "Built a cloud-based EHR system serving 10K+ patients.",
      fullDescription:
        "Created a secure cloud-based system using .NET and MSSQL to manage healthcare data for over 10,000 patients, with real-time analytics and scalable architecture.",
      tech: [".NET", "MSSQL", "Docker"],
      images: ["/imgs/cloud-ehr-system-image.png"],
      buttonText: "View Details →",
      buttonLink: "#",
    },
    {
      title: "Magazine Portfolio API",
      shortDescription:
        "Created REST API for multilingual CMS and media workflows.",
      fullDescription:
        "Built a REST API using Node.js and SQLite for a multilingual magazine, enabling seamless content and media workflows with Google Cloud integration.",
      tech: ["Node.js", "SQLite", "Google Cloud"],
      images: ["/imgs/magazine-portfolio-api-image.png"],
      buttonText: "View GitHub →",
      buttonLink: "#",
    },
    {
      title: "AI-Powered Chatbot",
      shortDescription: "Developed a chatbot for customer service using NLP.",
      fullDescription:
        "An AI-powered chatbot using Python and TensorFlow, handling customer queries with natural language understanding, sentiment analysis, and dynamic responses.",
      tech: ["Python", "TensorFlow", "NLP"],
      images: ["/imgs/ai-chatbot-image.png"],
      buttonText: "View GitHub →",
      buttonLink: "#",
    },
    {
      title: "Personal Finance App",
      shortDescription:
        "Built a personal finance tracking app with real-time analytics.",
      fullDescription:
        "Designed a personal finance app with real-time spending analytics using React, Node.js, and MongoDB. Delivered seamless UX and rich data insights.",
      tech: ["React", "Node.js", "MongoDB"],
      images: ["/imgs/personal-finance-app-image.png"],
      buttonText: "View Details →",
      buttonLink: "#",
    },
  ];

  return (
    <section
      id="projects"
      className="relative bg-gray-50 dark:bg-gray-900 py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-4xl font-bold mb-16 text-left text-gray-800 dark:text-white font-['Orbitron']">
          Projects
        </h2>

        <div className="relative">
          {/* Vertical timeline line */}
          {/* <div className="absolute top-0 left-6 bottom-0 w-1 bg-orange-400 dark:bg-orange-600 rounded-full" /> */}

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <ExpandableProjectCard
                key={index}
                title={project.title}
                shortDescription={project.shortDescription}
                fullDescription={project.fullDescription}
                tech={project.tech}
                images={project.images}
                buttonText={project.buttonText}
                buttonLink={project.buttonLink}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

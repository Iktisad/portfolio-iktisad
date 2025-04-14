"use client";

import ExpandableProjectCard from "../components/ExpandableProjectCard";
// import { motion } from "framer-motion";
interface ProjectDescription {
  type: "paragraph" | "points";
  content: string | string[];
}

interface Project {
  thumbnail: string;
  title: string;
  shortDescription: string;
  fullDescription: ProjectDescription[];
  tech: string[];
  images: string[];
  buttonText: string;
  buttonLink: string;
}
const Projects = () => {
  const projects: Project[] = [
    {
      thumbnail: "/imgs/cloudehr.png",
      title: "EHR Cloud System",
      shortDescription:
        "Modern cloud EHR solution tailored for dental care, improving patient management and clinical efficiency.",
      fullDescription: [
        {
          type: "paragraph",
          content:
            "Cloud EHR System is a comprehensive, cloud-based Electronic Health Record (EHR) platform designed specifically for dental care practices. The system enables secure storage, management, and retrieval of patient records while streamlining workflows like appointment scheduling, treatment planning, and billing.",
        },
        {
          type: "points",
          content: [
            ".NET services for authentication, authorization, and patient management APIs.",
            "Node.js and Express.js services for real-time data processing and appointment scheduling logic.",
            "Frontend developed with Vue JS for responsive and dynamic user interfaces.",
            "MSSQL for structured data like patient profiles and billing records.",
            "MongoDB for storing treatment notes, media files, and logs.",
            "Docker for containerization, enabling smooth deployment and scalability.",
          ],
        },
        {
          type: "paragraph",
          content:
            "The system prioritizes data privacy, regulatory compliance, and operational efficiency to meet the demands of modern dental practices.",
        },
      ],
      tech: [
        ".NET",
        "Node Js",
        "Express",
        "Javascript",
        "MSSQL",
        "MongoDB",
        "Docker",
      ],
      images: [
        "/assets/ehr/sample-1.png",
        "/assets/ehr/sample-2.png",
        "/assets/ehr/sample-3.png",
        "/assets/ehr/sample-4.png",
      ],
      buttonText: "View Details →",
      buttonLink: "#",
    },
    {
      thumbnail: "/imgs/banglaglocalorg.png",
      title: "Bengali Magazine Portfolio & CMS",
      shortDescription:
        "A Bengali diaspora magazine portfolio and CMS for publishing articles, showcasing art and culture, and managing media content.",
      fullDescription: [
        {
          type: "paragraph",
          content:
            "Built a RESTful API using Node.js and SQLite to power a trilingual magazine platform supporting English, French, and Bangla natively. The system enables seamless content publishing, media management, and integrates with Google Cloud for scalable hosting and storage. Website form submissions are handled through Google Sheets, where submission data is recorded and linked to uploaded media files stored in Google Drive. I also collaborated on the frontend development using Vue.js, contributing to the creation of an intuitive, user-friendly interface. SQLite is used for caching user data and managing session persistence, while the Node.js backend processes, validates, and filters incoming form submissions to ensure smooth data handling across the platform.",
        },
      ],
      tech: [
        "Node.js",
        "VueJS",
        "SQLite",
        "Google Drive",
        "Google Sheets",
        "Firebase",
      ],
      images: [
        "/assets/banglaglocal/sample-1.png",
        "/assets/banglaglocal/sample-2.png",
        "/assets/banglaglocal/sample-3.png",
        "/assets/banglaglocal/sample-4.png",
      ],
      buttonText: "View Live →",
      buttonLink: "https://www.banglaglocal.org",
    },
    {
      thumbnail: "/imgs/ReadCheckAI_logo_1.png",
      title: "ReadCheckAI",
      shortDescription:
        "Real-time fact-checking Chrome extension that flags questionable claims and offers verified sources to combat online misinformation.",
      fullDescription: [
        {
          type: "paragraph",
          content:
            "ReadCheckAI is a Chrome extension that detects potentially inaccurate statements and recommends verified sources in real-time. Initially prototyped at ConUHacks 2024, the project has evolved with improved NLP models, enhanced UI/UX, and plans for public launch. Built with Node.js, Express, TypeScript, and Cohere’s AI APIs, focusing on scalability, accuracy, and seamless user experience.",
        },
      ],
      tech: [
        "Cohere AI",
        "LLM",
        "Node.js",
        "Express",
        "Typescript",
        "Javascript",
        "Chrome Extension",
      ],
      images: ["/imgs/ReadCheckAI_logo_1.png"],
      buttonText: "View on Devpost →",
      buttonLink: "https://devpost.com/software/readcheck-ai",
    },
    {
      thumbnail: "/imgs/thumbnail.png",
      title: "Roamly AI",
      shortDescription:
        "Smart AI recommender that curates activities and meals based on real-time location, time, and weather data.",
      fullDescription: [
        {
          type: "paragraph",
          content:
            "Built as part of an academic project, this real-time AI-powered travel companion recommends activities and meals based on live user context, integrating OpenWeather and Google Maps APIs. A hybrid recommendation engine trained on 30,000 users enhanced relevance, while WebSocket notifications ensured real-time updates. Developed using Vue.js, Node.js, Express, Flask, and MongoDB with a RESTful API architecture.",
        },
      ],
      tech: [
        "AI",
        "VueJS",
        "NodeJS",
        "Express",
        "Javascript",
        "Python",
        "Flask",
        "OpenWeather",
        "Google Maps",
      ],
      images: [
        "/assets/roamly/sample-1.png",
        "/assets/roamly/sample-2.png",
        "/assets/roamly/sample-3.png",
        "/assets/roamly/sample-4.png",
      ],
      buttonText: "View GitHub →",
      buttonLink: "https://github.com/Iktisad/Roamly",
    },
    {
      thumbnail: "/imgs/restaurant_recommender.png",
      title: "Dining Advisor",
      shortDescription:
        "A personalized restaurant recommender system utilizing collaborative filtering to deliver tailored dining suggestions based on user preferences.",
      fullDescription: [
        {
          type: "paragraph",
          content:
            "The AI Restaurant Recommender offers personalized dining suggestions based on individual user preferences, enhancing the dining experience through tailored recommendations.",
        },
        {
          type: "points",
          content: [
            "Leveraged collaborative filtering to optimize recommendation accuracy.",
            "Designed a fault-tolerant backend ensuring seamless integration of components and high availability during peak usage.",
            "Crafted an intuitive and engaging Vue.js frontend to optimize user experience.",
            "Conducted iterative user testing to refine system performance and improve accuracy.",
            "Optimized backend for efficient data retrieval and real-time responsiveness.",
          ],
        },
        {
          type: "paragraph",
          content:
            "The system focuses on delivering high accuracy, fault tolerance, and a smooth, engaging user experience even during high-demand periods.",
        },
      ],
      tech: [
        "Vue.js",
        "Node.js",
        "Express",
        "Collaborative Filtering",
        "PostgreSQL",
        "Python",
        "Flask",
      ],
      images: [
        "/assets/restaurant_recommender/sample-1.jpeg",
        "/assets/restaurant_recommender/sample-2.jpeg",
        "/assets/restaurant_recommender/sample-3.jpeg",
        "/assets/restaurant_recommender/sample-4.jpg",
        "/assets/restaurant_recommender/sample-5.jpg",
      ],
      buttonText: "View Github →",
      buttonLink: "https://github.com/Iktisad/feasthub-recommender-api",
    },
    {
      thumbnail: "/imgs/turtlelogo_thumbnail.jpeg", // Replace with actual thumbnail image path
      title: "Torque Dark Theme for VSCode",
      shortDescription:
        "A soothing dark theme for VSCode, designed with a balanced blend of high contrast colors to reduce eye strain and improve readability.",
      fullDescription: [
        {
          type: "paragraph",
          content:
            "Torque Dark Theme is a carefully crafted dark theme for Visual Studio Code, built to enhance your coding experience with a clean and calming design. It blends soothing dark backgrounds with high-contrast accent colors for improved readability and reduced eye strain during long coding sessions.",
        },
        {
          type: "points",
          content: [
            "Supports bracket pair colorization for better nested code comprehension.",
            "Recommended with popular fonts like Cascadia Code and Fira Code.",
          ],
        },
      ],
      tech: ["VS Code", "Theme Design", "UI/UX", "Color Theory", "JSON"],
      images: ["/assets/torque/sample-1.png", "/assets/torque/sample-2.png"], // Replace with your real preview screenshot
      buttonText: "View on Marketplace →",
      buttonLink:
        "https://marketplace.visualstudio.com/items?itemName=IktisadRashid.torque-dark-theme",
    },
  ];

  return (
    <section
      id="projects"
      className="relative bg-gray-50 dark:bg-gray-900 py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold mb-16 text-left text-gray-800 dark:text-white font-['Orbitron']">
          Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {projects.map((project, index) => (
            <ExpandableProjectCard
              key={index}
              thumbnail={project.thumbnail}
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
    </section>
  );
};

export default Projects;

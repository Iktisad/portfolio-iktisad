// App.tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Volunteering from "./components/Volunteering";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import HackathonSection from "./components/Hackathon";
// import TransitionCurtain from "./components/TransitionCurtain";

function App() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500 scroll-smooth">
      <Navbar />
      <Hero />
      <Experience />
      <Education />
      <Volunteering />
      <Skills />
      <Projects />
      <HackathonSection />
      <Contact />
      {/* Other sections */}
    </main>
  );
}

export default App;

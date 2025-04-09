import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  console.log("Navigation " + theme);
  return (
    <header
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50
     w-fit px-6 py-3 backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-white/20 rounded-full shadow-lg"
    >
      <nav className="flex space-x-6 items-center text-sm md:text-base text-gray-700 dark:text-gray-300">
        <a
          href="#hero-section"
          className="font-medium hover:text-orange-400 transition"
        >
          Home
        </a>
        <a
          href="#experience"
          className="font-medium hover:text-orange-400 transition"
        >
          Experience
        </a>
        <a
          href="#skills"
          className="font-medium hover:text-orange-400 transition"
        >
          Skills
        </a>
        <a
          href="#projects"
          className="font-medium hover:text-orange-400 transition"
        >
          Projects
        </a>
        <a
          href="#education"
          className="font-medium hover:text-orange-400 transition"
        >
          Education
        </a>
        <a
          href="#contact"
          className="font-medium hover:text-orange-400 transition"
        >
          Contact
        </a>

        {/* Dark Mode Button */}
        <button onClick={toggleTheme}>{theme === "dark" ? "🌗" : "🌓"}</button>
      </nav>
    </header>
  );
};

export default Navbar;

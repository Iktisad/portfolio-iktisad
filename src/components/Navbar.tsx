"use client";

import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "#hero-section", label: "Home" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#volunteering", label: "Volunteering" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#hackathons", label: "Hackathons" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className="fixed lg:top-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 z-50
        w-fit px-6 py-3 backdrop-blur-md bg-white/30 dark:bg-gray-800/30
        border-b lg:border border-white/20 md:rounded-full shadow-lg flex items-center justify-between lg:space-x-6 space-x-4"
      >
        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center space-x-6 text-sm md:text-base text-gray-700 dark:text-gray-300">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-medium hover:text-orange-400 transition"
            >
              {link.label}
            </a>
          ))}

          {/* Dark Mode Toggle (Desktop) */}
          <button
            onClick={toggleTheme}
            className="w-6 h-6 text-gray-700 dark:text-gray-300 ml-4"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </nav>

        {/* Mobile Navbar */}
        <div className="flex md:hidden items-center justify-between w-screen px-4">
          {/* Hamburger on Left */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <HamburgerIcon />
          </button>

          {/* Toggle on Right (Mobile) */}
          <button
            onClick={toggleTheme}
            className="w-6 h-6 text-gray-700 dark:text-gray-300"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      {/* AnimatePresence for smooth mount/unmount */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Slide In Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 80 }}
              className="fixed top-0 left-0 h-full w-64 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md shadow-lg z-50 flex flex-col p-8 space-y-6 md:hidden"
            >
              <div className="flex justify-end">
                {/* Close Icon */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 dark:text-gray-300"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Menu Links */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                  hidden: {},
                }}
                className="flex flex-col gap-6 mt-4"
              >
                {links.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="text-xl font-semibold text-gray-700 dark:text-gray-300 hover:text-orange-500 transition"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

const HamburgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#facc15"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="5" fill="#facc15" />
    <g strokeLinecap="round">
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </g>
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-full h-full"
  >
    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
  </svg>
);

import { motion } from "framer-motion";
import React, { useEffect } from "react";

const Contact: React.FC = () => {
  useEffect(() => {
    // Animate Sakura petals gently left-right
    const petals = document.querySelectorAll(".footer-sakura");

    petals.forEach((petal, index) => {
      const duration = 12 + Math.random() * 8;
      petal.animate(
        [
          { transform: `translateX(0px) translateY(0px)` },
          {
            transform: `translateX(${
              Math.random() > 0.5 ? 10 : -10
            }px) translateY(5px)`,
          },
          { transform: `translateX(0px) translateY(0px)` },
        ],
        {
          duration: duration * 1000,
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );
    });
  }, []);

  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1 }}
      className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 py-16 px-6 relative overflow-hidden"
    >
      {/* Sakura Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/sakura.svg"
          className="footer-sakura opacity-10 scale-150 left-[10%] top-[5%] absolute"
          style={{ "--i": 0 } as React.CSSProperties}
        />
        <img
          src="/sakura.svg"
          className="footer-sakura opacity-10 scale-100 left-[85%] top-[20%] absolute"
          style={{ "--i": 1 } as React.CSSProperties}
        />
      </div>

      {/* Optional subtle mist (extra glow layer) */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent dark:from-gray-700/20"></div>

      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 font-['Orbitron']">
          Get In Touch
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Open to new opportunities, collaborations, and interesting projects.
          Feel free to connect!
        </p>

        <div className="flex justify-center flex-wrap gap-6 mb-10">
          {/* Buttons */}
          {[
            {
              href: "mailto:iktisad.rashid@gmail.com",
              label: "Email",
              color: "bg-orange-500 hover:bg-orange-600",
              icon: "devicon-google-plain",
            },
            {
              href: "https://linkedin.com/in/iktisad-rashid",
              label: "LinkedIn",
              color: "bg-blue-600 hover:bg-blue-700",
              icon: "devicon-linkedin-plain",
            },
            {
              href: "https://github.com/Iktisad",
              label: "GitHub",
              color: "bg-gray-700 hover:bg-gray-900",
              icon: "devicon-github-original",
            },
            {
              href: "https://www.facebook.com/Iktisad",
              label: "Facebook",
              color: "bg-blue-500 hover:bg-blue-600",
              icon: "devicon-facebook-plain",
            },
            {
              href: "https://www.instagram.com/iktisad_rashid/",
              label: "Instagram",
              color: "bg-gray-500 hover:bg-gray-600",
              image: "./instagram.svg",
            },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 ${social.color} text-white px-6 py-3 rounded-full transition transform shadow-md`}
            >
              {social.icon ? (
                <i className={`${social.icon} text-2xl`}></i>
              ) : (
                <img
                  src={social.image}
                  alt={social.label}
                  className="h-6 w-6"
                />
              )}
              {social.label}
            </motion.a>
          ))}
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          &copy; 2025 Iktisad Rashid. All Rights Reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Contact;

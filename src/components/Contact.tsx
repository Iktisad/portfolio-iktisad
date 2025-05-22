"use client";

import { motion } from "framer-motion";
import React, { useEffect } from "react";
const socials = [
  {
    href: "mailto:iktisad.rashid@gmail.com",
    label: "Email",
    color: "bg-orange-500 dark:bg-amber-600 hover:bg-orange-600",
    image: "/imgs/mail_2.svg",
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
    image: "/imgs/instagram.svg",
  },
];
const Contact: React.FC = () => {
  useEffect(() => {
    const spawnPetals = () => {
      const container = document.getElementById("footer-sakura-layer");
      if (!container) return;

      const createPetal = () => {
        const depthLayers = [
          { scale: 1.2, speed: 0.6, blur: "1px", opacity: 0.8 }, // Foreground
          { scale: 1.0, speed: 0.4, blur: "1.5px", opacity: 0.6 }, // Midground
          { scale: 0.8, speed: 0.25, blur: "2px", opacity: 0.4 }, // Background
        ];

        const layer =
          depthLayers[Math.floor(Math.random() * depthLayers.length)];
        const petal = document.createElement("img");
        petal.src =
          Math.random() > 0.5
            ? "/imgs/petals/sakura_1.svg"
            : "/imgs/petals/sakura_2.png";
        petal.className = "absolute pointer-events-none footer-sakura";

        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.top = `-${Math.random() * 100}px`;
        petal.style.width = `${18 * layer.scale}px`;
        petal.style.height = `${18 * layer.scale}px`;
        petal.style.opacity = `${layer.opacity}`;
        petal.style.filter = `blur(${layer.blur})`;

        container.appendChild(petal);

        // Animate fall
        const baseX = Math.random() > 0.5 ? 20 : -20;
        const driftMultiplier = 1 + Math.random();
        const duration = 12000 / layer.speed + Math.random() * 3000;

        petal.animate(
          [
            { transform: `translate(0px, 0px) rotate(0deg)` },
            { transform: `translate(${baseX}px, 300px) rotate(45deg)` },
            {
              transform: `translate(${
                baseX * driftMultiplier
              }px, 600px) rotate(90deg)`,
            },
            {
              transform: `translate(${
                baseX * driftMultiplier * 2
              }px, 900px) rotate(135deg)`,
            },
          ],
          {
            duration,
            iterations: 1,
            easing: "linear",
          }
        ).onfinish = () => {
          petal.remove();
        };
      };

      setInterval(createPetal, 1500);
    };

    spawnPetals();
  }, []);

  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1 }}
      className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 py-20 px-6 relative overflow-hidden"
    >
      {/* Sakura Petal Layer */}
      <div
        id="footer-sakura-layer"
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      />

      {/* Optional subtle mist */}
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

        {/* Social Buttons */}
        <div className="flex justify-center flex-wrap gap-6 mb-10">
          {socials.map((social, index) => (
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

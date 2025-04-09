"use client";

import { useEffect } from "react";

const Hero = () => {
  useEffect(() => {
    const introOverlay = document.getElementById("intro-overlay");
    const heroMain = document.getElementById("hero-main");
    const staticLayer = document.getElementById("static-sakura-layer");
    const dynamicLayer = document.getElementById("sakura-layer");
    const aurora = document.querySelector(".aurora-bg");

    const petalImages = [
      "/imgs/sakura.svg",
      "/imgs/cherry_blossom_petal_1.png",
      "/imgs/cherry_blossom_petal_2.png",
    ];

    const createStaticPetals = () => {
      const staticDepthSettings = [
        { count: 2, scale: 1.2, blur: "2px", opacity: 0.7 },
        { count: 1, scale: 1.0, blur: "1.5px", opacity: 0.5 },
        { count: 2, scale: 0.8, blur: "0.5px", opacity: 0.4 },
      ];

      staticDepthSettings.forEach((layer) => {
        for (let i = 0; i < layer.count; i++) {
          const petal = document.createElement("img");
          petal.src =
            petalImages[Math.floor(Math.random() * petalImages.length)];
          petal.className = "sakura-petal";
          petal.style.top = `${Math.random() * -10}vh`;
          petal.style.left = `${Math.random() * 100}vw`;
          petal.style.transform = `scale(${layer.scale}) rotate(${
            Math.random() * 360
          }deg)`;
          petal.style.filter = `blur(${layer.blur})`;
          petal.style.opacity = `${layer.opacity}`;
          petal.style.animation = `sakura-fall ${
            18 + Math.random() * 6
          }s linear infinite`;
          staticLayer?.appendChild(petal);
        }
      });
    };

    const spawnOrganicPetals = () => {
      const petals: {
        el: HTMLImageElement;
        x: number;
        y: number;
        speedX: number;
        speedY: number;
        rotation: number;
        rotationSpeed: number;
      }[] = [];

      const createPetal = () => {
        if (!dynamicLayer) return;
        const petal = document.createElement("img");
        petal.src = petalImages[Math.floor(Math.random() * petalImages.length)];
        petal.className = "petal";
        petal.style.position = "absolute";

        const size = 18 + Math.random() * 12;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.opacity = `${0.3 + Math.random() * 0.4}`;

        dynamicLayer.appendChild(petal);

        petals.push({
          el: petal,
          x: Math.random() * window.innerWidth,
          y: -50,
          speedX: Math.random() * 0.4 - 0.2,
          speedY: 0.7 + Math.random() * 1.0,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 1.5 - 0.75,
        });
      };

      const animate = () => {
        petals.forEach((petal, index) => {
          petal.x += petal.speedX + Math.sin(petal.y / 80) * 0.3;
          petal.y += petal.speedY;
          petal.rotation += petal.rotationSpeed;

          const el = petal.el;
          el.style.transform = `translate(${petal.x}px, ${petal.y}px) rotate(${petal.rotation}deg)`;

          if (petal.y > window.innerHeight + 50) {
            el.remove();
            petals.splice(index, 1);
          }
        });

        requestAnimationFrame(animate);
      };

      setInterval(createPetal, 2000);
      animate();
    };

    const setupScrollParallax = () => {
      let ticking = false;

      window.addEventListener("scroll", () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const petals = document.querySelectorAll(".sakura-petal, .petal");
            const aurora = document.querySelector(".aurora-bg");
            const heroMain = document.getElementById("hero-main");

            // Move Aurora background very slightly
            if (aurora) {
              (aurora as HTMLElement).style.transform = `translateY(${
                scrollY * 0.1
              }px)`;
            }

            // Move each static sakura petal
            petals.forEach((petal, index) => {
              if (!petal.classList.contains("petal")) {
                (petal as HTMLElement).style.transform = `translateY(${
                  scrollY * 0.08 + index * 4
                }px) rotate(${scrollY * 0.1 + index * 45}deg)`;
              }
            });

            // Move the main Hero content a little
            if (heroMain) {
              (heroMain as HTMLElement).style.transform = `translateY(${
                scrollY * 0.15
              }px)`;
            }

            ticking = false;
          });
          ticking = true;
        }
      });
    };

    // Fade intro overlay
    setTimeout(() => {
      introOverlay?.style.setProperty("display", "none");
      heroMain?.style.setProperty("opacity", "1");
      heroMain?.style.setProperty("transition", "opacity 4s ease");
    }, 3000);

    createStaticPetals();
    spawnOrganicPetals();
    setupScrollParallax();
  }, []);

  return (
    <section
      id="hero-section"
      className="relative h-screen flex items-center justify-center overflow-hidden font-['M_PLUS_Rounded_1c']"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-200 via-indigo-100 to-blue-200 dark:from-gray-900 dark:via-gray-700 dark:to-rose-600 opacity-40 blur-2xl aurora-bg animate-aurora" />

      {/* Sakura Blossom Background */}
      <div className="absolute inset-0 bg-[url('/imgs/cherry_blossom.svg')] bg-[length:980px_980px] dark:bg-[url('/imgs/black_cherry_blossom.svg')] bg-no-repeat bg-left-top opacity-10 dark:opacity-25 pointer-events-none" />

      {/* Static Sakura Layer */}
      <div
        id="static-sakura-layer"
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Dynamic Petals Layer */}
      <div
        id="sakura-layer"
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Intro Overlay */}
      <div
        id="intro-overlay"
        className="absolute inset-0 bg-black z-50 flex items-center justify-center"
      >
        <h1 className="text-white text-4xl md:text-6xl font-['Orbitron'] typed-text animate-typewriter">
          Iktisad Rashid
        </h1>
      </div>

      {/* Main Hero Content */}
      <div
        id="hero-main"
        className="relative z-10 flex flex-col md:flex-row items-center md:justify-between px-6 max-w-6xl w-full opacity-0"
      >
        <div className="text-center text-gray-700 dark:text-white md:text-left space-y-5 max-w-xl">
          <h1 className="text-4xl md:text-6xl font-['Orbitron'] font-bold uppercase leading-tight tracking-wide drop-shadow-md">
            Iktisad Rashid
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            I build intelligent web systems that blend creativity with
            performance.
          </p>
          <p className="text-base max-w-md">
            I'm a Software Engineer with 3+ years of experience building backend
            systems and full-stack apps. From EHR platforms to publication CMS
            tools, I craft software that solves real problems.
          </p>
          <div className="space-x-4 mt-6">
            <a
              href="#projects"
              className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition transform hover:scale-105 shadow-md"
            >
              See My Work
            </a>
            <a
              href="/resume.pdf"
              download
              className="border border-orange-600 text-orange-600 dark:border-white dark:text-white px-6 py-3 rounded-full hover:bg-white hover:text-orange-500 dark:hover:text-orange-500 transition transform hover:scale-105 shadow"
            >
              Download Resume
            </a>
          </div>
        </div>

        <div className="mt-10 md:mt-0 md:ml-10 relative">
          <img
            src="/imgs/profile_img.png"
            alt="Iktisad Rashid"
            className="w-64 h-64 rounded-full object-cover border-4 border-orange-500 shadow-xl transition hover:scale-105 hover:shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

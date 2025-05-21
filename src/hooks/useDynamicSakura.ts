import { useEffect } from "react";

export const useDynamicSakura = (containerId: string, interval = 5000) => {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    const petalImages = [
      "/imgs/petals/sakura_1.svg",
      "/imgs/petals/sakura_2.png",
      "/imgs/petals/sakura_3.png",
    ];

    const createPetal = () => {
      const petal = document.createElement("img");
      petal.src = petalImages[Math.floor(Math.random() * petalImages.length)];
      petal.className = "absolute pointer-events-none";

      const scale = 0.8 + Math.random() * 0.6;
      const opacity = 0.4 + Math.random() * 0.5;
      const blur = `${Math.random()}px`;

      Object.assign(petal.style, {
        left: `${Math.random() * 100}vw`,
        top: `-${Math.random() * 100}px`,
        width: `${18 * scale}px`,
        height: `${18 * scale}px`,
        opacity: `${opacity}`,
        filter: `blur(${blur})`,
        zIndex: "0",
      });

      container.appendChild(petal);

      const driftX = (Math.random() - 0.5) * 60;
      const driftY = 600 + Math.random() * 300;
      const rotation = 90 + Math.random() * 180;
      const duration = 10000 + Math.random() * 5000;

      petal.animate(
        [
          { transform: `translate(0, 0) rotate(0deg)` },
          {
            transform: `translate(${driftX * 0.33}px, ${
              driftY * 0.33
            }px) rotate(${rotation * 0.33}deg)`,
          },
          {
            transform: `translate(${driftX * 0.66}px, ${
              driftY * 0.66
            }px) rotate(${rotation * 0.66}deg)`,
          },
          {
            transform: `translate(${driftX}px, ${driftY}px) rotate(${rotation}deg)`,
          },
        ],
        {
          duration,
          iterations: 1,
          easing: "ease-in-out",
        }
      ).onfinish = () => {
        petal.remove();
      };
    };

    const preFillCount = 20;
    for (let i = 0; i < preFillCount; i++) {
      createPetal();
    }

    const timer = setInterval(createPetal, interval);
    return () => clearInterval(timer);
  }, [containerId, interval]);
};

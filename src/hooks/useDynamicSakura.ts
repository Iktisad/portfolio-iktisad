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

    const depthLayers = [
      { scale: 1.2, speed: 0.7, blur: "1px", opacity: 0.8 },
      { scale: 1.0, speed: 0.8, blur: "1.5px", opacity: 0.6 },
      { scale: 0.8, speed: 0.5, blur: "2px", opacity: 0.4 },
    ];

    const createPetal = () => {
      const layer = depthLayers[Math.floor(Math.random() * depthLayers.length)];
      const petal = document.createElement("img");

      petal.src = petalImages[Math.floor(Math.random() * petalImages.length)];
      petal.className = "absolute pointer-events-none";

      Object.assign(petal.style, {
        left: `${Math.random() * 100}vw`,
        top: `-${Math.random() * 100}px`,
        width: `${18 * layer.scale}px`,
        height: `${18 * layer.scale}px`,
        opacity: `${layer.opacity}`,
        filter: `blur(${layer.blur})`,
        zIndex: 0,
      });

      container.appendChild(petal);

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

    const timer = setInterval(createPetal, interval);
    return () => clearInterval(timer);
  }, [containerId, interval]);
};

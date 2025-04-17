import { useEffect } from "react";

export const useSakura = (
  staticLayerId: string,
  dynamicLayerId: string,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled) return;

    const staticLayer = document.getElementById(staticLayerId);
    const dynamicLayer = document.getElementById(dynamicLayerId);
    const isMobile = window.innerWidth < 768;

    const petalImages = [
      "/imgs/sakura.svg",
      "/imgs/cherry_blossom_petal_1.png",
      "/imgs/cherry_blossom_petal_2.png",
    ];

    const maxPetals = isMobile ? 5 : 20;
    const petals: any[] = [];
    let animationFrameId: number;
    let intervalId: ReturnType<typeof setInterval>;

    const createStaticPetals = () => {
      if (!staticLayer || isMobile) return;

      const settings = [
        { count: 2, scale: 1.2, blur: "2px", opacity: 0.7 },
        { count: 1, scale: 1.0, blur: "1.5px", opacity: 0.5 },
        { count: 2, scale: 0.8, blur: "0.5px", opacity: 0.4 },
      ];

      settings.forEach(({ count, scale, blur, opacity }) => {
        for (let i = 0; i < count; i++) {
          const petal = document.createElement("img");
          petal.src =
            petalImages[Math.floor(Math.random() * petalImages.length)];
          Object.assign(petal.style, {
            top: `${Math.random() * -10}vh`,
            left: `${Math.random() * 100}vw`,
            transform: `scale(${scale}) rotate(${Math.random() * 360}deg)`,
            filter: `blur(${blur})`,
            opacity: `${opacity}`,
            animation: `sakura-fall ${18 + Math.random() * 6}s linear infinite`,
            position: "absolute",
            pointerEvents: "none",
          });
          petal.className = "sakura-petal";
          staticLayer.appendChild(petal);
        }
      });
    };

    const createPetal = () => {
      if (!dynamicLayer || petals.length >= maxPetals) return;

      const petal = document.createElement("img");
      petal.src = petalImages[Math.floor(Math.random() * petalImages.length)];
      petal.className = "petal";

      const size = isMobile ? 14 + Math.random() * 6 : 18 + Math.random() * 12;

      Object.assign(petal.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        opacity: `${0.3 + Math.random() * 0.3}`,
        pointerEvents: "none",
      });

      dynamicLayer.appendChild(petal);

      petals.push({
        el: petal,
        x: Math.random() * window.innerWidth,
        y: -50,
        speedX: isMobile
          ? Math.random() * 0.2 - 0.1
          : Math.random() * 0.4 - 0.2,
        speedY: isMobile
          ? 0.6 + Math.random() * 0.8
          : 0.7 + Math.random() * 1.0,
        rotation: Math.random() * 360,
        rotationSpeed: isMobile
          ? Math.random() * 1 - 0.5
          : Math.random() * 1.5 - 0.75,
      });
    };

    const animate = () => {
      petals.forEach((petal, i) => {
        petal.x += petal.speedX + Math.sin(petal.y / 80) * 0.3;
        petal.y += petal.speedY;
        petal.rotation += petal.rotationSpeed;
        petal.el.style.transform = `translate(${petal.x}px, ${petal.y}px) rotate(${petal.rotation}deg)`;
        if (petal.y > window.innerHeight + 50) {
          petal.el.remove();
          petals.splice(i, 1);
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    createStaticPetals();
    intervalId = setInterval(createPetal, isMobile ? 3000 : 8000);
    animate();

    return () => {
      clearInterval(intervalId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [staticLayerId, dynamicLayerId, enabled]);
};

import { useEffect } from "react";

export const useDynamicSakura = (containerId: string, interval = 5000) => {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    const petalImages = [
      "/imgs/sakura.svg",
      "/imgs/cherry_blossom_petal_1.png",
      "/imgs/cherry_blossom_petal_2.png",
    ];

    const maxPetals = 15;
    const petals: any[] = [];
    let animationFrameId: number;
    let spawnTimer: ReturnType<typeof setInterval> | null = null;

    const createPetal = () => {
      if (!container || petals.length >= maxPetals) return;

      const size = 18 + Math.random() * 10;
      const baseX = Math.random() * window.innerWidth;
      const petal = document.createElement("img");
      petal.src = petalImages[Math.floor(Math.random() * petalImages.length)];
      petal.className = "pointer-events-none absolute";

      Object.assign(petal.style, {
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(${baseX}px, -40px) rotate(0deg)`,
        opacity: "0",
        transition: "opacity 1s ease-in",
        willChange: "transform, opacity",
        zIndex: 0,
      });

      container.appendChild(petal);
      requestAnimationFrame(() => {
        petal.style.opacity = `${0.4 + Math.random() * 0.3}`;
      });

      petals.push({
        el: petal,
        x: baseX,
        y: -40,
        sway: 20 + Math.random() * 15,
        freq: 0.005 + Math.random() * 0.002,
        speedY: 0.8 + Math.random() * 0.6,
        rot: Math.random() * 360,
        rotSpeed: Math.random() * 1.2 - 0.6,
        life: 0,
      });
    };

    const animate = () => {
      petals.forEach((p, i) => {
        p.life += 1;
        p.y += p.speedY;
        p.rot += p.rotSpeed;
        const swayX = p.x + Math.sin(p.life * p.freq) * p.sway;

        p.el.style.transform = `translate(${swayX}px, ${p.y}px) rotate(${p.rot}deg)`;

        if (p.y > window.innerHeight + 40) p.el.style.opacity = "0";
        if (p.y > window.innerHeight + 100) {
          p.el.remove();
          petals.splice(i, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    createPetal();
    spawnTimer = setInterval(createPetal, interval);
    animate();

    return () => {
      if (spawnTimer) clearInterval(spawnTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [containerId, interval]);
};

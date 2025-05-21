import { useEffect, useRef } from "react";

interface SakuraCanvasProps {
  className?: string;
}

const petalImages = [
  "/imgs/petals/sakura_1.svg",
  "/imgs/petals/sakura_2.png",
  "/imgs/petals/sakura_3.png",
];

const swayClasses = [
  "animate-petal-sway-left",
  "animate-petal-sway-right",
  "animate-petal-sway-zigzag",
];

const SakuraCanvas = ({ className }: SakuraCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const petalCount = 25;
    const petals: HTMLImageElement[] = [];

    for (let i = 0; i < petalCount; i++) {
      const img = document.createElement("img");
      img.src = petalImages[Math.floor(Math.random() * petalImages.length)];
      img.className = `sakura-petal animate-sakura-fall ${
        swayClasses[Math.floor(Math.random() * swayClasses.length)]
      }`;
      img.style.left = `${Math.random() * 100}%`;
      img.style.top = `${Math.random() * -20}vh`;
      img.style.animationDelay = `${Math.random() * 5}s`;
      img.style.animationDuration = `${6 + Math.random() * 6}s`;
      petals.push(img);
      container.appendChild(img);
    }

    return () => {
      petals.forEach((petal) => container.removeChild(petal));
    };
  }, []);

  return <div ref={containerRef} className={`${className ?? ""}`} />;
};

export default SakuraCanvas;

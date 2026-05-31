// Outer div handles drift movement, inner div handles blink — animations run independently
import { useEffect, useState } from "react";

interface FireflyConfig {
  left: string;
  top: string;
  size: number;
  blinkDuration: number;
  moveDuration: number;
  moveVariant: 1 | 2 | 3 | 4;
  delay: number;
}

const FIREFLIES: FireflyConfig[] = [
  { left: "15%", top: "20%", size: 6, blinkDuration: 1.8, moveDuration: 8,  moveVariant: 1, delay: 0   },
  { left: "30%", top: "55%", size: 5, blinkDuration: 2.2, moveDuration: 10, moveVariant: 2, delay: 1.5 },
  { left: "45%", top: "30%", size: 7, blinkDuration: 1.5, moveDuration: 9,  moveVariant: 3, delay: 0.8 },
  { left: "60%", top: "65%", size: 5, blinkDuration: 2.0, moveDuration: 11, moveVariant: 4, delay: 2.2 },
  { left: "72%", top: "25%", size: 6, blinkDuration: 1.7, moveDuration: 8,  moveVariant: 1, delay: 3.0 },
  { left: "22%", top: "70%", size: 4, blinkDuration: 2.5, moveDuration: 12, moveVariant: 2, delay: 1.0 },
  { left: "55%", top: "45%", size: 5, blinkDuration: 1.9, moveDuration: 9,  moveVariant: 3, delay: 4.0 },
  { left: "80%", top: "50%", size: 6, blinkDuration: 2.1, moveDuration: 10, moveVariant: 4, delay: 0.5 },
  { left: "38%", top: "15%", size: 4, blinkDuration: 1.6, moveDuration: 11, moveVariant: 1, delay: 2.8 },
  { left: "65%", top: "80%", size: 5, blinkDuration: 2.3, moveDuration: 8,  moveVariant: 2, delay: 3.5 },
  { left: "10%", top: "45%", size: 6, blinkDuration: 1.8, moveDuration: 9,  moveVariant: 3, delay: 1.8 },
  { left: "85%", top: "35%", size: 4, blinkDuration: 2.0, moveDuration: 12, moveVariant: 4, delay: 0.3 },
];

function GlowDot({ size, isDarkMode }: { size: number; isDarkMode: boolean }) {
  if (isDarkMode) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(253,224,71,0.95) 0%, rgba(251,191,36,0.5) 50%, transparent 70%)`,
          boxShadow: `0 0 ${size * 1.5}px ${size * 0.8}px rgba(251,191,36,0.4), 0 0 ${size * 3}px ${size * 1.5}px rgba(251,191,36,0.15)`,
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: size + 2,
        height: size + 2,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(255,182,193,0.7) 0%, rgba(255,218,215,0.4) 55%, transparent 75%)`,
      }}
    />
  );
}

export function Fireflies() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 z-[3] pointer-events-none hidden md:block">
      {FIREFLIES.map(({ left, top, size, blinkDuration, moveDuration, moveVariant, delay }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left,
            top,
            animation: `firefly-drift-${moveVariant} ${moveDuration}s ease-in-out ${delay}s infinite`,
          }}
        >
          <div
            style={{
              animation: `firefly-blink ${blinkDuration}s ease-in-out ${delay * 0.5}s infinite`,
            }}
          >
            <GlowDot size={size} isDarkMode={isDarkMode} />
          </div>
        </div>
      ))}
    </div>
  );
}

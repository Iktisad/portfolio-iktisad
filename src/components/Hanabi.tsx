// Hanabi (花火) — firework sparkle bursts at night, festival confetti in daylight.
import { useEffect, useState } from "react";

interface BurstPoint {
  left: string;
  top: string;
  burstDelay: number;
  burstDuration: number;
  particleSize: number;
}

const BURST_POINTS: BurstPoint[] = [
  { left: "15%", top: "30%", burstDelay: 0,   burstDuration: 3.5, particleSize: 14 },
  { left: "45%", top: "65%", burstDelay: 1.2, burstDuration: 4.0, particleSize: 12 },
  { left: "70%", top: "25%", burstDelay: 2.5, burstDuration: 3.8, particleSize: 16 },
  { left: "88%", top: "55%", burstDelay: 0.8, burstDuration: 3.2, particleSize: 12 },
];

// 8 directions: N, NE, E, SE, S, SW, W, NW
const DIRECTIONS = [0, 45, 90, 135, 180, 225, 270, 315] as const;

const DARK_COLORS = [
  { bg: "rgba(253,224,71,0.95)",  shadow: "0 0 6px 2px rgba(251,191,36,0.5)"   },
  { bg: "rgba(251,191,36,0.9)",   shadow: "0 0 5px 2px rgba(249,115,22,0.45)"  },
  { bg: "rgba(249,115,22,0.85)",  shadow: "0 0 7px 2px rgba(251,191,36,0.4)"   },
  { bg: "rgba(254,240,138,0.9)",  shadow: "0 0 5px 2px rgba(251,191,36,0.5)"   },
];

const LIGHT_COLORS = [
  { bg: "rgba(255,105,135,0.9)",  shadow: undefined },  // sakura pink
  { bg: "rgba(100,180,255,0.85)", shadow: undefined },  // sky blue
  { bg: "rgba(255,165,50,0.9)",   shadow: undefined },  // warm amber
  { bg: "rgba(140,210,130,0.85)", shadow: undefined },  // spring green
];

export function Hanabi() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const colors = isDarkMode ? DARK_COLORS : LIGHT_COLORS;

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none hidden md:block">
      {BURST_POINTS.map(({ left, top, burstDelay, burstDuration, particleSize }, bi) => {
        const size = isDarkMode ? particleSize : particleSize + 2;
        return (
          <div key={bi} style={{ position: "absolute", left, top }}>
            {DIRECTIONS.map((deg, pi) => {
              const color = colors[pi % colors.length];
              return (
                <div
                  key={pi}
                  style={{
                    position: "absolute",
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${color.bg}, ${isDarkMode ? "rgba(249,115,22,0.3)" : "transparent"} 60%, transparent)`,
                    boxShadow: color.shadow,
                    transform: "translate(-50%, -50%)",
                    animation: `spark-fly-${deg} ${burstDuration}s ease-out ${burstDelay + pi * 0.05}s infinite`,
                    animationFillMode: "backwards",
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

import { useEffect, useState } from "react";

const SCREENS = {
  mobile: {
    viewBox: "0 0 400 100",
    string:  "M0,22 Q100,12 200,22 Q300,32 400,20",
    lanterns: [
      { x: 70,  delay: 0   },
      { x: 200, delay: 0.7 },
      { x: 330, delay: 1.3 },
    ],
  },
  tablet: {
    viewBox: "0 0 768 100",
    string:  "M0,22 Q192,12 384,22 Q576,32 768,20",
    lanterns: [
      { x: 96,  delay: 0   },
      { x: 240, delay: 0.8 },
      { x: 384, delay: 0.4 },
      { x: 528, delay: 1.1 },
      { x: 672, delay: 0.6 },
    ],
  },
  desktop: {
    viewBox: "0 0 1440 100",
    string:  "M0,22 Q360,12 720,22 Q1080,32 1440,20",
    lanterns: [
      { x: 90,   delay: 0   },
      { x: 270,  delay: 0.6 },
      { x: 450,  delay: 1.2 },
      { x: 630,  delay: 0.3 },
      { x: 810,  delay: 0.9 },
      { x: 990,  delay: 1.5 },
      { x: 1170, delay: 0.5 },
      { x: 1350, delay: 1.1 },
    ],
  },
} as const;

export function Lanterns() {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(() => {
    const w = window.innerWidth;
    return w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop";
  });

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setScreenSize(w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { viewBox, string, lanterns } = SCREENS[screenSize];

  return (
    <div className="absolute top-0 inset-x-0 z-[5] pointer-events-none">
      <svg
        viewBox={viewBox}
        width="100%"
        height="100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="lantern-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* String */}
        <path
          d={string}
          stroke="rgba(249,115,22,0.35)"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Lanterns */}
        {lanterns.map(({ x, delay }, i) => (
          <g key={i} transform={`translate(${x}, 22)`} filter="url(#lantern-glow)" opacity="0.8">
            <g
              style={{
                animation: `lantern-sway 3.5s ease-in-out ${delay}s infinite`,
                transformBox: "fill-box",
                transformOrigin: "50% 0%",
              }}
            >
              <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(249,115,22,0.45)" strokeWidth="0.8" />
              <rect x="-8" y="12" width="16" height="5" rx="2.5" fill="rgba(249,115,22,0.85)" />
              <path
                d="M-8,17 C-16,24 -16,46 -8,54 L8,54 C16,46 16,24 8,17 Z"
                fill="rgba(249,115,22,0.12)"
                stroke="rgba(249,115,22,0.55)"
                strokeWidth="0.8"
              />
              <ellipse cx="0" cy="35" rx="7" ry="12" fill="rgba(251,191,36,0.22)" />
              <path d="M-13,24 Q0,21 13,24" stroke="rgba(249,115,22,0.35)" strokeWidth="0.7" fill="none" />
              <path d="M-15,35 Q0,32 15,35" stroke="rgba(249,115,22,0.35)" strokeWidth="0.7" fill="none" />
              <path d="M-13,46 Q0,43 13,46" stroke="rgba(249,115,22,0.35)" strokeWidth="0.7" fill="none" />
              <rect x="-8" y="54" width="16" height="5" rx="2.5" fill="rgba(249,115,22,0.85)" />
              <line x1="-3" y1="59" x2="-4" y2="74" stroke="rgba(249,115,22,0.4)" strokeWidth="0.7" />
              <line x1="0"  y1="59" x2="0"  y2="76" stroke="rgba(249,115,22,0.5)" strokeWidth="0.7" />
              <line x1="3"  y1="59" x2="4"  y2="74" stroke="rgba(249,115,22,0.4)" strokeWidth="0.7" />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}

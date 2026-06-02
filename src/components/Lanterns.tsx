import { useEffect, useState } from "react";

// Lantern positions as fractions (0–1) of their tier's ideal width.
// Multiplied by actual window.innerWidth at render → x_scale = y_scale = 1 always.
const DESKTOP_FRACS = {
  x: [90, 270, 450, 630, 810, 990, 1170, 1350].map(v => v / 1440),
  delays: [0, 0.6, 1.2, 0.3, 0.9, 1.5, 0.5, 1.1],
};
const TABLET_FRACS = {
  x: [96, 240, 384, 528, 672].map(v => v / 768),
  delays: [0, 0.8, 0.4, 1.1, 0.6],
};
const MOBILE_FRACS = {
  x: [70, 200, 330].map(v => v / 400),
  delays: [0, 0.7, 1.3],
};

export function Lanterns() {
  const [width, setWidth] = useState(window.innerWidth);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(() => {
    const w = window.innerWidth;
    return w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop";
  });

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setWidth(w);
      setScreenSize(w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const fracs = screenSize === "mobile" ? MOBILE_FRACS : screenSize === "tablet" ? TABLET_FRACS : DESKTOP_FRACS;
  const lanterns = fracs.x.map((frac, i) => ({
    x: Math.round(width * frac),
    delay: fracs.delays[i],
  }));

  const W = width;
  const string = `M0,22 Q${Math.round(W * 0.25)},12 ${Math.round(W * 0.5)},22 Q${Math.round(W * 0.75)},32 ${W},20`;

  return (
    <div className="absolute top-0 inset-x-0 z-[5] pointer-events-none">
      <svg
        viewBox={`0 0 ${W} 100`}
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

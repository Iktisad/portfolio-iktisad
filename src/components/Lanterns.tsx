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
          <filter id="lantern-glow" x="-150%" y="-100%" width="400%" height="320%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4"  result="tightBlur" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="wideBlur"  />
            <feMerge>
              <feMergeNode in="wideBlur"  />
              <feMergeNode in="tightBlur" />
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
          <g key={i} transform={`translate(${x}, 22)`} filter="url(#lantern-glow)" opacity="0.9">
            <g
              style={{
                animation: `lantern-sway 3.5s ease-in-out ${delay}s infinite`,
                transformBox: "fill-box",
                transformOrigin: "50% 0%",
              }}
            >
              <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(249,115,22,0.45)" strokeWidth="0.8" />
              <rect x="-9" y="12" width="18" height="5" rx="2.5" fill="rgba(249,115,22,0.85)" />
              <path
                d="M-9,17 C-18,24 -18,46 -9,54 L9,54 C18,46 18,24 9,17 Z"
                fill="rgba(249,115,22,0.34)"
                stroke="rgba(249,115,22,0.55)"
                strokeWidth="0.8"
              />
              <ellipse cx="0" cy="35" rx="18" ry="20" fill="rgba(251,191,36,0.14)" />
              <ellipse cx="0" cy="35" rx="9"  ry="13" fill="rgba(251,191,36,0.38)" />
              <path d="M-15,24 Q0,21 15,24" stroke="rgba(249,115,22,0.35)" strokeWidth="0.7" fill="none" />
              <path d="M-17,35 Q0,32 17,35" stroke="rgba(249,115,22,0.35)" strokeWidth="0.7" fill="none" />
              <path d="M-15,46 Q0,43 15,46" stroke="rgba(249,115,22,0.35)" strokeWidth="0.7" fill="none" />
              <rect x="-9" y="54" width="18" height="5" rx="2.5" fill="rgba(249,115,22,0.85)" />
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

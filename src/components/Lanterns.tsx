import { useDarkMode } from "../hooks/useDarkMode";

const LANTERNS = [
  { x: 90,   delay: 0 },
  { x: 270,  delay: 0.6 },
  { x: 450,  delay: 1.2 },
  { x: 630,  delay: 0.3 },
  { x: 810,  delay: 0.9 },
  { x: 990,  delay: 1.5 },
  { x: 1170, delay: 0.5 },
  { x: 1350, delay: 1.1 },
];

export function Lanterns() {
  const isDarkMode = useDarkMode();

  const bodyFill  = isDarkMode ? "rgba(249,115,22,0.28)" : "rgba(249,115,22,0.32)";
  const innerGlow = isDarkMode ? "rgba(251,191,36,0.60)" : "rgba(255,200,150,0.35)";

  return (
    <div className="absolute top-0 inset-x-0 z-[5] pointer-events-none hidden md:block">
      <svg
        viewBox="0 0 1440 100"
        width="100%"
        height="100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="lantern-glow" x="-150%" y="-100%" width="400%" height="320%">
            {/* Tight halo — stays close to the lantern shape */}
            <feGaussianBlur in="SourceGraphic" stdDeviation={isDarkMode ? 4 : 2} result="tightBlur" />
            {/* Wide ambient bloom — light cast into the surrounding air */}
            <feGaussianBlur in="SourceGraphic" stdDeviation={isDarkMode ? 12 : 5} result="wideBlur" />
            <feMerge>
              <feMergeNode in="wideBlur" />
              <feMergeNode in="tightBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* String */}
        <path
          d="M0,22 Q360,12 720,22 Q1080,32 1440,20"
          stroke="rgba(249,115,22,0.35)"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Lanterns */}
        {LANTERNS.map(({ x, delay }, i) => (
          <g key={i} transform={`translate(${x}, 22)`} filter="url(#lantern-glow)" opacity="0.95">
            <g
              style={{
                animation: `lantern-sway 3.5s ease-in-out ${delay}s infinite`,
                transformBox: "fill-box",
                transformOrigin: "50% 0%",
              }}
            >
              {/* Hanging thread */}
              <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(249,115,22,0.45)" strokeWidth="0.8" />
              {/* Top cap */}
              <rect x="-8" y="12" width="16" height="5" rx="2.5" fill="rgba(249,115,22,0.85)" />
              {/* Body */}
              <path
                d="M-8,17 C-16,24 -16,46 -8,54 L8,54 C16,46 16,24 8,17 Z"
                fill={bodyFill}
                stroke="rgba(249,115,22,0.55)"
                strokeWidth="0.8"
              />
              {/* Outer ambient halo */}
              <ellipse cx="0" cy="35" rx="14" ry="20" fill={isDarkMode ? "rgba(251,191,36,0.10)" : "rgba(255,200,150,0.08)"} />
              {/* Inner warm glow */}
              <ellipse cx="0" cy="35" rx="8" ry="13" fill={innerGlow} />
              {/* Ribs */}
              <path d="M-13,24 Q0,21 13,24" stroke="rgba(249,115,22,0.35)" strokeWidth="0.7" fill="none" />
              <path d="M-15,35 Q0,32 15,35" stroke="rgba(249,115,22,0.35)" strokeWidth="0.7" fill="none" />
              <path d="M-13,46 Q0,43 13,46" stroke="rgba(249,115,22,0.35)" strokeWidth="0.7" fill="none" />
              {/* Bottom cap */}
              <rect x="-8" y="54" width="16" height="5" rx="2.5" fill="rgba(249,115,22,0.85)" />
              {/* Tassel — 3 strands */}
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

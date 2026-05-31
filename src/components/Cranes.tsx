// Paths derived from Wikimedia "Origami - Crane.svg" (CC BY-SA 3.0, Binnette/Inkscape)
// Original viewBox bounds: x 123–1871, y 117–1473 → using "50 67 1870 1457"
// Layers: aile gauche (left wing), aile droite (right wing), fond cou (neck/head), queue (tail), dos droit (body back)

interface CraneConfig {
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  flip: boolean;
  opacity: number;
}

const CRANES: CraneConfig[] = [
  { left: "4%",  top: "30%", size: 44, delay: 0,   duration: 13, flip: false, opacity: 0.65 },
  { left: "16%", top: "62%", size: 30, delay: 2.8, duration: 16, flip: true,  opacity: 0.45 },
  { left: "30%", top: "18%", size: 38, delay: 1.2, duration: 11, flip: false, opacity: 0.55 },
  { left: "46%", top: "72%", size: 24, delay: 4.2, duration: 18, flip: true,  opacity: 0.35 },
  { left: "62%", top: "28%", size: 40, delay: 0.6, duration: 14, flip: false, opacity: 0.60 },
  { left: "76%", top: "55%", size: 32, delay: 3.2, duration: 15, flip: true,  opacity: 0.50 },
  { left: "88%", top: "22%", size: 36, delay: 1.8, duration: 12, flip: false, opacity: 0.55 },
  { left: "52%", top: "48%", size: 26, delay: 5.5, duration: 17, flip: false, opacity: 0.40 },
];

function CraneSvg({ size, flip, opacity }: { size: number; flip: boolean; opacity: number }) {
  // viewBox fits all paths with ~50px margin; aspect ratio 1870:1457 ≈ 1.283:1
  const h = Math.round(size / 1.283);
  return (
    <svg
      width={size}
      height={h}
      viewBox="50 67 1870 1457"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? "scaleX(-1)" : undefined, opacity }}
    >
      {/* Left wing (aile gauche) */}
      <path
        d="M 340.9244,144.02737 L 728.85858,1024.4931 L 887.69971,1032.8368 Z"
        fill="rgba(249,115,22,0.68)"
      />
      {/* Right wing (aile droite) */}
      <path
        d="M 1870.8025,257.78645 L 1024.2947,653.76624 L 928.83526,860.34243 L 1280.5738,1200.432 L 1531.1534,1049.0332 Z"
        fill="rgba(249,115,22,0.72)"
      />
      {/* Body back (dos droit) */}
      <path
        d="M 1164.2857,1473.4286 L 1552.8571,966.28572 L 1518.5714,943.42858 L 1075.7143,1226.2857 Z"
        fill="rgba(249,115,22,0.58)"
      />
      {/* Neck + head (fond cou) */}
      <path
        d="M 797.01035,928.4015 L 619.72857,878.14642 L 122.98606,1123.3609 L 1098.2883,1328.4218 L 1204.1649,1296.9177 L 1007.3745,1143.3115 Z"
        fill="rgba(249,115,22,0.82)"
      />
      {/* Tail (queue) */}
      <path
        d="M 1220.7143,1442 L 1584.1334,1013.3358 L 1539.4725,957.56962 L 1178.3429,1400.774 Z"
        fill="rgba(249,115,22,0.88)"
      />
    </svg>
  );
}

export function Cranes() {
  return (
    <div className="absolute inset-0 z-[2] pointer-events-none hidden md:block">
      {CRANES.map(({ left, top, size, delay, duration, flip, opacity }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left,
            top,
            animation: `crane-float ${duration}s ease-in-out ${delay}s infinite`,
            animationFillMode: "backwards",
          }}
        >
          <CraneSvg size={size} flip={flip} opacity={opacity} />
        </div>
      ))}
    </div>
  );
}

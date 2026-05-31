// Momiji (紅葉) — falling autumn maple leaves drifting down through the Skills section

interface LeafConfig {
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  fallVariant: 1 | 2 | 3 | 4;
  color: string;
  opacity: number;
}

const LEAVES: LeafConfig[] = [
  { left: "5%",  top: "-2%", size: 28, delay: 0,   duration: 12, fallVariant: 1, color: "rgba(249,115,22,1)",  opacity: 0.65 },
  { left: "18%", top: "5%",  size: 22, delay: 2.5, duration: 14, fallVariant: 2, color: "rgba(239,68,68,1)",   opacity: 0.55 },
  { left: "32%", top: "-1%", size: 30, delay: 1.0, duration: 11, fallVariant: 3, color: "rgba(251,191,36,1)",  opacity: 0.60 },
  { left: "48%", top: "3%",  size: 20, delay: 3.8, duration: 15, fallVariant: 4, color: "rgba(249,115,22,1)",  opacity: 0.50 },
  { left: "62%", top: "-1%", size: 26, delay: 0.7, duration: 13, fallVariant: 1, color: "rgba(239,68,68,1)",   opacity: 0.55 },
  { left: "75%", top: "4%",  size: 24, delay: 2.0, duration: 12, fallVariant: 2, color: "rgba(251,191,36,1)",  opacity: 0.60 },
  { left: "88%", top: "-2%", size: 18, delay: 4.5, duration: 16, fallVariant: 3, color: "rgba(249,115,22,1)",  opacity: 0.45 },
  { left: "40%", top: "8%",  size: 32, delay: 1.5, duration: 10, fallVariant: 4, color: "rgba(234,88,12,1)",   opacity: 0.55 },
  { left: "55%", top: "2%",  size: 22, delay: 5.0, duration: 14, fallVariant: 1, color: "rgba(251,191,36,1)",  opacity: 0.50 },
];

function MomijiLeaf({ size, color, opacity }: { size: number; color: string; opacity: number }) {
  // 5-lobed maple leaf: viewBox="-50 -65 100 140", aspect ratio 100:140
  const height = Math.round(size * 1.4);
  return (
    <svg
      width={size}
      height={height}
      viewBox="-50 -65 100 140"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      {/* Leaf body — 5 lobes traced clockwise from body bottom */}
      <path
        d="M0,55
           C-5,45 -10,35 -8,22
           C-18,25 -38,22 -46,10
           C-38,5 -28,8 -20,15
           C-26,2 -36,-14 -32,-28
           C-25,-22 -20,-12 -16,-4
           C-18,-18 -10,-45 0,-60
           C10,-45 18,-18 16,-4
           C20,-12 25,-22 32,-28
           C36,-14 26,2 20,15
           C28,8 38,5 46,10
           C38,22 18,25 8,22
           C10,35 5,45 0,55
           Z"
        fill={color}
      />
      {/* Stem */}
      <line x1="0" y1="55" x2="0" y2="70" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function Momiji() {
  return (
    <div className="absolute inset-0 z-[2] pointer-events-none hidden md:block">
      {LEAVES.map(({ left, top, size, delay, duration, fallVariant, color, opacity }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left,
            top,
            animation: `momiji-fall-${fallVariant} ${duration}s ease-in ${delay}s infinite`,
            animationFillMode: "backwards",
          }}
        >
          <MomijiLeaf size={size} color={color} opacity={opacity} />
        </div>
      ))}
    </div>
  );
}

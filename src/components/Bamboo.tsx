// Bamboo stalks with nodes and alternating leaves, rooted at section bottom
// Color controlled via CSS currentColor — uses text-green-* Tailwind classes on wrapper

interface StalkConfig {
  left: string;
  height: number;
  delay: number;
  duration: number;
}

const STALKS: StalkConfig[] = [
  { left: "1%",  height: 520, delay: 0,   duration: 4.5 },
  { left: "5%",  height: 680, delay: 1.3, duration: 5.3 },
  { left: "9%",  height: 440, delay: 0.6, duration: 3.9 },
  { left: "91%", height: 610, delay: 0.4, duration: 4.8 },
  { left: "95%", height: 720, delay: 1.6, duration: 5.6 },
  { left: "99%", height: 490, delay: 0.9, duration: 4.1 },
];

// Node positions as fractions of stalk height
const NODE_FRACTIONS = [0.22, 0.42, 0.62, 0.82];

function StalkSvg({ height }: { height: number }) {
  const nodes = NODE_FRACTIONS.map((f) => Math.round(f * height));

  return (
    <svg
      width="56"
      height={height}
      viewBox={`0 0 56 ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main stalk */}
      <rect x="22" y="0" width="12" height={height} rx="5" fill="currentColor" opacity="0.85" />

      {nodes.map((y, i) => (
        <g key={i}>
          {/* Node ring — slightly wider than stalk */}
          <rect x="19" y={y - 3} width="18" height="6" rx="3" fill="currentColor" opacity="1" />

          {/* Left leaf — alternates prominence */}
          <path
            d={`M28,${y} C18,${y - 5} 4,${y - 8} 0,${y - 22} C8,${y - 12} 20,${y - 4} 28,${y}`}
            fill="currentColor"
            opacity={i % 2 === 0 ? "0.65" : "0.40"}
          />

          {/* Right leaf */}
          <path
            d={`M28,${y} C38,${y - 5} 52,${y - 8} 56,${y - 22} C48,${y - 12} 36,${y - 4} 28,${y}`}
            fill="currentColor"
            opacity={i % 2 === 0 ? "0.40" : "0.65"}
          />
        </g>
      ))}
    </svg>
  );
}

export function Bamboo() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none hidden md:block text-green-700/30 dark:text-green-400/20">
      {STALKS.map(({ left, height, delay, duration }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left,
            bottom: 0,
            transformOrigin: "bottom center",
            animation: `bamboo-sway ${duration}s ease-in-out ${delay}s infinite`,
          }}
        >
          <StalkSvg height={height} />
        </div>
      ))}
    </div>
  );
}

// Hanabi (花火) — firework sparkle bursts. Each burst point emits 8 particles radially,
// looping with staggered delays so they feel like intermittent fireworks overhead.

interface BurstPoint {
  left: string;
  top: string;
  burstDelay: number;
  burstDuration: number;
  particleSize: number;
}

const BURST_POINTS: BurstPoint[] = [
  { left: "15%", top: "30%", burstDelay: 0,   burstDuration: 3.5, particleSize: 5 },
  { left: "45%", top: "65%", burstDelay: 1.2, burstDuration: 4.0, particleSize: 4 },
  { left: "70%", top: "25%", burstDelay: 2.5, burstDuration: 3.8, particleSize: 6 },
  { left: "88%", top: "55%", burstDelay: 0.8, burstDuration: 3.2, particleSize: 4 },
];

// 8 directions: N, NE, E, SE, S, SW, W, NW
const DIRECTIONS = [0, 45, 90, 135, 180, 225, 270, 315] as const;

const PARTICLE_COLORS = [
  "rgba(253,224,71,0.95)",   // gold
  "rgba(251,191,36,0.9)",    // amber
  "rgba(249,115,22,0.85)",   // orange
  "rgba(255,237,153,0.95)",  // pale gold
];

export function Hanabi() {
  return (
    <div className="absolute inset-0 z-[2] pointer-events-none hidden md:block">
      {BURST_POINTS.map(({ left, top, burstDelay, burstDuration, particleSize }, bi) => (
        <div key={bi} style={{ position: "absolute", left, top }}>
          {DIRECTIONS.map((deg, pi) => (
            <div
              key={pi}
              style={{
                position: "absolute",
                width: particleSize,
                height: particleSize,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${PARTICLE_COLORS[pi % PARTICLE_COLORS.length]}, rgba(249,115,22,0.3) 60%, transparent)`,
                boxShadow: `0 0 ${particleSize + 2}px ${Math.ceil(particleSize / 2)}px rgba(251,191,36,0.35)`,
                transform: "translate(-50%, -50%)",
                animation: `spark-fly-${deg} ${burstDuration}s ease-out ${burstDelay + pi * 0.05}s infinite`,
                animationFillMode: "backwards",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Shooting stars for the hanami night sky — sparse diagonal streaks, at most 1–2 visible at once

interface StarConfig {
  left: string;
  top: string;
  tailWidth: number;
  duration: number;
  delay: number;
  angle: number;
}

const STARS: StarConfig[] = [
  { left: "15%", top: "10%", tailWidth: 120, duration: 1.0, delay: 0,  angle: -35 },
  { left: "40%", top: "5%",  tailWidth: 90,  duration: 0.8, delay: 4,  angle: -30 },
  { left: "65%", top: "20%", tailWidth: 140, duration: 1.2, delay: 8,  angle: -38 },
  { left: "25%", top: "35%", tailWidth: 80,  duration: 0.9, delay: 13, angle: -32 },
  { left: "75%", top: "15%", tailWidth: 110, duration: 1.1, delay: 7,  angle: -36 },
  { left: "50%", top: "30%", tailWidth: 100, duration: 0.8, delay: 17, angle: -33 },
];

export function ShootingStars() {
  return (
    <div className="absolute inset-0 z-[2] pointer-events-none hidden md:block">
      {STARS.map(({ left, top, tailWidth, duration, delay, angle }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left,
            top,
            width: tailWidth,
            height: 2,
            transform: `rotate(${angle}deg)`,
            transformOrigin: "right center",
            background: "linear-gradient(to right, transparent, rgba(251,191,36,0.85), rgba(255,255,255,0.95))",
            boxShadow: "0 0 4px 1px rgba(251,191,36,0.5)",
            borderRadius: 2,
            animation: `shooting-star ${duration}s ease-out ${delay}s infinite`,
            animationFillMode: "backwards",
          }}
        />
      ))}
    </div>
  );
}

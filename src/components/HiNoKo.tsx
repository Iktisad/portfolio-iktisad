// Hi no Ko (火の粉) — ember sparks rising from fire.
// Two-layer animation: outer sway (X air current), inner rise (Y + scale + opacity).
// Decoupled frequencies create authentic fire physics vs the single-keyframe diagonal drift.
import { useEffect, useState } from "react";

interface EmberConfig {
  left: string;
  top: string;
  size: number;
  riseVariant: 1 | 2 | 3 | 4;
  swayVariant: 1 | 2 | 3 | 4;
  duration: number;
  swayDuration: number;
  delay: number;
}

const EMBERS: EmberConfig[] = [
  { left: "8%",  top: "75%", size: 5, riseVariant: 1, swayVariant: 2, duration: 5.0, swayDuration: 2.4, delay: 0    },
  { left: "15%", top: "85%", size: 4, riseVariant: 2, swayVariant: 1, duration: 6.5, swayDuration: 1.8, delay: 2.1  },
  { left: "22%", top: "70%", size: 6, riseVariant: 3, swayVariant: 3, duration: 4.8, swayDuration: 2.8, delay: 4.8  },
  { left: "30%", top: "90%", size: 3, riseVariant: 4, swayVariant: 2, duration: 7.0, swayDuration: 2.1, delay: 1.3  },
  { left: "38%", top: "80%", size: 5, riseVariant: 1, swayVariant: 4, duration: 5.5, swayDuration: 3.2, delay: 7.2  },
  { left: "45%", top: "75%", size: 4, riseVariant: 2, swayVariant: 3, duration: 6.0, swayDuration: 2.5, delay: 3.5  },
  { left: "52%", top: "88%", size: 7, riseVariant: 3, swayVariant: 1, duration: 4.5, swayDuration: 1.9, delay: 9.0  },
  { left: "58%", top: "72%", size: 3, riseVariant: 4, swayVariant: 4, duration: 7.5, swayDuration: 2.7, delay: 0.8  },
  { left: "65%", top: "82%", size: 5, riseVariant: 1, swayVariant: 2, duration: 5.2, swayDuration: 3.0, delay: 5.6  },
  { left: "70%", top: "68%", size: 4, riseVariant: 2, swayVariant: 3, duration: 6.8, swayDuration: 2.2, delay: 11.0 },
  { left: "75%", top: "90%", size: 6, riseVariant: 3, swayVariant: 4, duration: 4.2, swayDuration: 1.8, delay: 2.8  },
  { left: "80%", top: "78%", size: 3, riseVariant: 4, swayVariant: 1, duration: 7.2, swayDuration: 2.6, delay: 8.4  },
  { left: "88%", top: "85%", size: 5, riseVariant: 1, swayVariant: 3, duration: 5.8, swayDuration: 2.9, delay: 6.3  },
  { left: "92%", top: "72%", size: 4, riseVariant: 2, swayVariant: 2, duration: 6.2, swayDuration: 2.0, delay: 14.0 },
  { left: "20%", top: "60%", size: 3, riseVariant: 3, swayVariant: 4, duration: 5.0, swayDuration: 3.1, delay: 12.5 },
  { left: "48%", top: "65%", size: 6, riseVariant: 4, swayVariant: 1, duration: 4.8, swayDuration: 2.3, delay: 1.7  },
  { left: "68%", top: "58%", size: 4, riseVariant: 1, swayVariant: 3, duration: 6.5, swayDuration: 2.6, delay: 16.0 },
  { left: "85%", top: "62%", size: 5, riseVariant: 2, swayVariant: 4, duration: 5.3, swayDuration: 1.9, delay: 10.2 },
];

function Ember({ size, isDarkMode }: { size: number; isDarkMode: boolean }) {
  if (isDarkMode) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,160,30,0.95) 0%, rgba(249,115,22,0.7) 50%, transparent 80%)`,
          boxShadow: `0 0 ${size * 2}px ${size}px rgba(251,191,36,0.5), 0 0 ${size * 4}px ${size * 2}px rgba(249,115,22,0.2)`,
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(234,88,12,0.9) 0%, rgba(249,115,22,0.6) 60%, transparent 80%)`,
      }}
    />
  );
}

export function HiNoKo() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none hidden md:block">
      {EMBERS.map(({ left, top, size, riseVariant, swayVariant, duration, swayDuration, delay }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left,
            top,
            animation: `ember-sway-${swayVariant} ${swayDuration}s ease-in-out infinite`,
          }}
        >
          <div
            style={{
              animation: `ember-rise-${riseVariant} ${duration}s ease-out ${delay}s infinite`,
              animationFillMode: "backwards",
            }}
          >
            <Ember size={size} isDarkMode={isDarkMode} />
          </div>
        </div>
      ))}
    </div>
  );
}

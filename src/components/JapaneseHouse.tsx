// Traditional Japanese minka silhouette — a house built on experience.
// Anchored at bottom-right of the Experience section at very low opacity.
export function JapaneseHouse() {
  return (
    <div
      className="absolute bottom-0 right-0 z-[2] pointer-events-none w-[200px] md:w-[460px] opacity-[0.09] dark:opacity-[0.13] text-on-surface"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 520 310"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ground line */}
        <rect x="0" y="304" width="520" height="4" rx="2" fill="currentColor" />

        {/* Engawa — veranda step at base */}
        <rect x="52" y="291" width="416" height="13" rx="1" fill="currentColor" fillOpacity="0.65" />

        {/* Left side wing */}
        <rect x="26" y="244" width="76" height="47" fill="currentColor" fillOpacity="0.38" />
        <line x1="26" y1="266" x2="102" y2="266" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.45" />

        {/* Main house body */}
        <rect x="100" y="213" width="320" height="78" fill="currentColor" fillOpacity="0.42" />

        {/* Shoji screen — vertical dividers */}
        <line x1="180" y1="213" x2="180" y2="291" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="260" y1="213" x2="260" y2="291" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="340" y1="213" x2="340" y2="291" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />

        {/* Shoji screen — horizontal rail */}
        <line x1="100" y1="252" x2="420" y2="252" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />

        {/* Lower eave overhang — wider than body, slight upturn at corners */}
        <path
          d="M 94,210
             L 38,218
             Q 20,228 38,223
             L 482,223
             Q 500,228 482,218
             L 426,210
             Z"
          fill="currentColor"
          fillOpacity="0.52"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeOpacity="0.6"
          strokeLinejoin="round"
        />

        {/* Main roof — steep pitch with sori (curved eave upturn) at corners */}
        <path
          d="M 260,72
             L 466,204
             Q 490,214 472,208
             L 48,208
             Q 30,214 54,204
             Z"
          fill="currentColor"
          fillOpacity="0.72"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.88"
          strokeLinejoin="round"
        />

        {/* Ridge cap (onigawara) — ornament at the roof peak */}
        <rect x="238" y="62" width="44" height="15" rx="3" fill="currentColor" />
        {/* Ridge end tabs */}
        <rect x="224" y="68" width="18" height="8" rx="2" fill="currentColor" fillOpacity="0.7" />
        <rect x="278" y="68" width="18" height="8" rx="2" fill="currentColor" fillOpacity="0.7" />
      </svg>
    </div>
  );
}

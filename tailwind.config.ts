// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // 👈 tell Tailwind to use class-based dark mode
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

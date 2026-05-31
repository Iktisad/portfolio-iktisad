import { useEffect, useState } from "react";

export function useDarkMode(): boolean {
  const [isDarkMode, setIsDarkMode] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return isDarkMode;
}

"use client";

import { useEffect, useMemo, useState } from "react";

interface IntroOverlayProps {
  visible: boolean;
  onComplete: () => void;
}

const greetings = [
  "dummy text",
  "Hi! I am Iktisad",
  "Purpose > process.",
  "Good interfaces speak to you.",
  "Invisible systems. Visible values.",
  "Let’s turn ideas into impact.",
];

// Timing constants
const TYPING_SPEED = 50;
const ERASING_SPEED = 30;
const PAUSE_DURATION = 1000;
const INTRO_DELAY = 300;

const getTotalDuration = () =>
  greetings.reduce(
    (sum, phrase) => sum + phrase.length * TYPING_SPEED + PAUSE_DURATION,
    0
  );

const IntroOverlay: React.FC<IntroOverlayProps> = ({ visible, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentPhrase = useMemo(() => greetings[index], [index]);

  // Lock scroll while visible
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  // Trigger fade-in and typing
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setFadeIn(true);
      setTyping(true);
    }, INTRO_DELAY);
    return () => clearTimeout(timer);
  }, [visible]);

  // Continuous progress bar
  useEffect(() => {
    if (!visible) return;

    const totalDuration = getTotalDuration();
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / totalDuration) * 100, 100));
      if (elapsed < totalDuration) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [visible]);

  // Typing handler
  useEffect(() => {
    if (!typing || !visible) return;

    if (charIndex < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + currentPhrase[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, TYPING_SPEED);
      return () => clearTimeout(timeout);
    } else {
      const pause = setTimeout(() => setTyping(false), PAUSE_DURATION);
      return () => clearTimeout(pause);
    }
  }, [charIndex, typing, currentPhrase, visible]);

  // Erasing handler
  useEffect(() => {
    if (typing || !visible) return;

    if (charIndex > 0) {
      const timeout = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, ERASING_SPEED);
      return () => clearTimeout(timeout);
    } else {
      const next = index + 1;
      if (next >= greetings.length) {
        setTimeout(onComplete, 500);
      } else {
        setIndex(next);
        setTyping(true);
        setText("");
      }
    }
  }, [charIndex, typing, index, visible, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`absolute inset-0 bg-black z-50 flex flex-col items-center justify-center px-4 sm:px-6 transition-opacity duration-700 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Typing Line */}
      <h1
        className="text-white font-medium font-['Orbitron'] text-center h-16 whitespace-nowrap flex items-center"
        style={{ fontSize: "clamp(1.25rem, 5vw, 2.75rem)" }}
        aria-live="polite"
      >
        {text}
        <span className="ml-1 w-[6px] h-6 bg-white animate-pulse rounded-sm" />
      </h1>

      {/* Percentage Display */}
      <div className="text-xs sm:text-sm text-white mt-5 mb-2 tracking-widest font-mono opacity-80">
        {Math.floor(progress)}%
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md sm:max-w-xl h-3 bg-orange-900/20 rounded-full overflow-hidden relative">
        <div
          className="absolute h-full bg-orange-400 rounded-full transition-all ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="mt-6 px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm text-white border border-white rounded-full hover:bg-white hover:text-black transition active:scale-95"
      >
        Skip Intro
      </button>
    </div>
  );
};

export default IntroOverlay;

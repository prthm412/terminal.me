"use client";

import { useState, useEffect } from "react";

interface TerminalTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
}

export default function TerminalText({
  text,
  speed = 50,
  onComplete,
  className = "",
  showCursor = true,
}: TerminalTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && (
        <span
          className={`inline-block w-[10px] h-[1.1em] bg-accent ml-0.5 align-middle${done ? " animate-blink" : ""}`}
          aria-hidden="true"
        />
      )}
    </span>
  );
}

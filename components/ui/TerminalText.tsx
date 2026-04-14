"use client";

import { useState, useEffect, useRef } from "react";

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

  // Keep a ref so the typing effect doesn't need onComplete as a dependency.
  // Without this, every parent re-render creates a new onComplete reference,
  // which restarts the animation on every phase change.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

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
        onCompleteRef.current?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]); // intentionally excludes onComplete — handled via ref above

  return (
    <span className={className}>
      {displayed}
      {showCursor && (
        <span
          className={`inline-block w-[10px] h-[1.1em] bg-accent ml-0.5 align-middle${
            done ? " animate-blink" : ""
          }`}
          aria-hidden="true"
        />
      )}
    </span>
  );
}

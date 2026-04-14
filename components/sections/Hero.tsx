"use client";

import { useState } from "react";
import { ExternalLink, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import TerminalText from "@/components/ui/TerminalText";

// ✏️ Fill in your details here
const NAME = "prathmesh";
const TAGLINE = "Building systems where performance meets perception.";
const GITHUB_URL = "https://github.com/prthm412";
const LINKEDIN_URL = "https://linkedin.com/in/prthmmthr";

export default function Hero() {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 hero-dot-grid"
    >
      <div className="w-full max-w-5xl space-y-5">
        {/* Line 1 — greeting */}
        <p className="font-mono text-2xl md:text-4xl font-semibold text-fg">
          <TerminalText
            text={`> hello, i'm ${NAME}.`}
            speed={55}
            showCursor={phase === 0}
            onComplete={() => setPhase(1)}
          />
        </p>

        {/* Line 2 — tagline, starts after line 1 finishes */}
        {phase >= 1 && (
          <p className="font-mono text-lg md:text-2xl text-muted">
            <TerminalText
              text={`> ${TAGLINE}`}
              speed={35}
              showCursor={phase === 1}
              onComplete={() => setPhase(2)}
            />
          </p>
        )}

        {/* Social links — appear after both lines finish */}
        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center gap-6 pt-4"
          >
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-muted hover:text-accent transition-colors duration-200 flex items-center gap-1.5"
            >
              <ExternalLink size={13} />
              github
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-muted hover:text-accent transition-colors duration-200 flex items-center gap-1.5"
            >
              <ExternalLink size={13} />
              linkedin
            </a>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator — bottom center */}
      {phase === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs text-muted tracking-widest">scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={14} className="text-muted" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

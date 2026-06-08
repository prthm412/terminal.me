import React, { useState, useEffect } from 'react';

const BOOT_LINES = [
  { text: '> INITIALIZING PORTFOLIO.EXE',     delay: 0 },
  { text: '> LOADING ASSETS...............OK', delay: 320 },
  { text: '> MOUNTING RENDER PIPELINE....OK',  delay: 620 },
  { text: '> COMPILING SHADERS............OK', delay: 900 },
  { text: '> LOADING PLAYER DATA..........OK', delay: 1180 },
  { text: '> WELCOME, VISITOR.',               delay: 1500 },
];
const DISMISS_AT = 2100;

const BootSequence = ({ onDone }) => {
  const [visible, setVisible] = useState([]);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const saved = (() => {
      try { return JSON.parse(localStorage.getItem('portfolio-settings') || '{}'); }
      catch { return {}; }
    })();
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (mq || saved.reduceMotion) { onDone(); return; }

    const timers = BOOT_LINES.map((ln, i) =>
      setTimeout(() => setVisible(v => [...v, i]), ln.delay)
    );
    const t1 = setTimeout(() => setExiting(true), DISMISS_AT);
    const t2 = setTimeout(() => onDone(), DISMISS_AT + 480);
    return () => { [...timers, t1, t2].forEach(clearTimeout); };
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'IBM Plex Mono', monospace",
      opacity: exiting ? 0 : 1,
      transition: exiting ? 'opacity 0.48s ease' : 'none',
      pointerEvents: exiting ? 'none' : 'all',
    }}>
      <div style={{ width: 400, padding: '0 1rem' }}>
        {BOOT_LINES.map((ln, i) => (
          <div key={i} style={{
            fontSize: 13,
            letterSpacing: '0.04em',
            marginBottom: 7,
            color: i === BOOT_LINES.length - 1 ? '#F59E0B' : '#6b7280',
            opacity: visible.includes(i) ? 1 : 0,
            transition: 'opacity 0.18s ease',
          }}>
            {ln.text}
            {i === visible[visible.length - 1] && i < BOOT_LINES.length - 1 && (
              <span style={{ animation: 'blink 0.65s step-end infinite', marginLeft: 3 }}>_</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BootSequence;

import React, { useEffect, useRef, useState } from 'react';

const Cursor = ({ accent }) => {
  const elRef  = useRef(null);
  const [mode, setMode] = useState('default');

  useEffect(() => {
    const onMove = (e) => {
      if (elRef.current) {
        elRef.current.style.transform = `translate(${e.clientX - 18}px,${e.clientY - 18}px)`;
      }
    };

    const CLICK = 'a,button,.skill-tag,.project-card-h,input,textarea,[role="button"],' +
      '.email-display,.quest-btn,.nav-marker,.terminal-nav-btn,.gear-btn,' +
      '.theme-opt,.toggle-btn,.color-swatch,.send-btn,.hud-btn,' +
      '.social-link,.term-dot,.settings-close,.quest-btn,.proj-arrow';
    const GRAB = '.terminal-titlebar';
    const TEXT = 'p,h1,h2,h3,h4,li,.hero-bio,.about-bio,.term-line,.project-desc,' +
      '.hero-name,.contact-tagline,.stat-value,.stat-label,.term-title,.project-name';

    const getMode = (t) => {
      if (!t) return 'default';
      if (t.closest(GRAB))  return 'grab';
      if (t.closest(CLICK)) return 'hover';
      if (t.closest(TEXT))  return 'text';
      return 'default';
    };

    const onOver = (e) => setMode(getMode(e.target));
    const onOut  = (e) => setMode(getMode(e.relatedTarget));

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
    };
  }, []);

  const c     = accent || '#F59E0B';
  const hover = mode === 'hover';
  const text  = mode === 'text';
  const grab  = mode === 'grab';

  return (
    <div
      ref={elRef}
      style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99999,
        width: 36, height: 36, pointerEvents: 'none',
        filter: `drop-shadow(0 0 5px ${c}88)`,
        willChange: 'transform',
      }}
    >
      <svg viewBox="0 0 36 36" width="36" height="36">
        <circle cx="18" cy="18" r="1.5" fill={c}/>
        <circle cx="18" cy="18" r="4"   fill="none" stroke={c} strokeWidth="1.2"/>
        <line x1="4"  y1="18" x2="12" y2="18" stroke={c} strokeWidth="1" opacity="0.85"/>
        <line x1="24" y1="18" x2="32" y2="18" stroke={c} strokeWidth="1" opacity="0.85"/>
        <line x1="18" y1="4"  x2="18" y2="12" stroke={c} strokeWidth="1" opacity="0.85"/>
        <line x1="18" y1="24" x2="18" y2="32" stroke={c} strokeWidth="1" opacity="0.85"/>
        <g style={{ opacity: hover ? 1 : 0, transition: 'opacity 0.12s' }}>
          <polyline points="3,9 3,3 9,3"      fill="none" stroke={c} strokeWidth="1.6" strokeLinejoin="miter"/>
          <polyline points="27,3 33,3 33,9"    fill="none" stroke={c} strokeWidth="1.6" strokeLinejoin="miter"/>
          <polyline points="3,27 3,33 9,33"    fill="none" stroke={c} strokeWidth="1.6" strokeLinejoin="miter"/>
          <polyline points="27,33 33,33 33,27" fill="none" stroke={c} strokeWidth="1.6" strokeLinejoin="miter"/>
        </g>
        <g style={{ opacity: text ? 0.9 : 0, transition: 'opacity 0.12s' }}>
          <line x1="12" y1="11" x2="24" y2="11" stroke={c} strokeWidth="1.5"/>
          <line x1="12" y1="25" x2="24" y2="25" stroke={c} strokeWidth="1.5"/>
        </g>
        <g style={{ opacity: grab ? 0.85 : 0, transition: 'opacity 0.12s' }} fill={c}>
          <rect x="15" y="4"  width="2" height="5"/>
          <rect x="18" y="3"  width="2" height="6"/>
          <rect x="21" y="4"  width="2" height="5"/>
          <rect x="14" y="9"  width="10" height="6"/>
          <rect x="12" y="10" width="2"  height="4"/>
        </g>
      </svg>
    </div>
  );
};

export default Cursor;

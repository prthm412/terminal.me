import React, { useState, useEffect, useCallback } from 'react';
import Background    from './portfolio-bg';
import Cursor        from './portfolio-cursor';
import BootSequence  from './portfolio-boot';
import FloatingTerminal from './portfolio-terminal';
import Projects      from './portfolio-projects';
import {
  Nav, Hero, About, Skills, Settings,
  Contact, Footer, PixelDivider,
} from './portfolio-components';

const DEFAULT = {
  theme: 'dark', accent: '#F59E0B',
  reduceMotion: false, scanLines: false, crtFilter: false,
};

const App = () => {
  const [booted, setBooted]     = useState(false);
  const [settings, setSettings] = useState(() => {
    try { return { ...DEFAULT, ...JSON.parse(localStorage.getItem('portfolio-settings') || '{}') }; }
    catch { return DEFAULT; }
  });
  const [settingsOpen, setSettingsOpen]   = useState(false);
  const [terminalOpen, setTerminalOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedSkills, setSelectedSkills] = useState(new Set());

  /* ── apply settings to DOM ── */
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', settings.theme);
    root.style.setProperty('--accent', settings.accent);
    const h = settings.accent;
    const r = parseInt(h.slice(1,3),16), g = parseInt(h.slice(3,5),16), b = parseInt(h.slice(5,7),16);
    root.style.setProperty('--accent-glow', `rgba(${r},${g},${b},0.22)`);
    root.style.setProperty('--accent-dim',  `rgba(${r},${g},${b},0.08)`);
    document.body.classList.toggle('scanlines',     settings.scanLines);
    document.body.classList.toggle('reduce-motion', settings.reduceMotion);
    try { localStorage.setItem('portfolio-settings', JSON.stringify(settings)); } catch {}
  }, [settings]);

  /* ── scroll reveal ── */
  useEffect(() => {
    if (!booted) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [booted]);

  /* ── active nav section ── */
  useEffect(() => {
    if (!booted) return;
    const ids = ['hero','about','skills','projects','contact'];
    const navObs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.35 }
    );
    const lineObs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.05 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) { navObs.observe(el); lineObs.observe(el); }
    });
    return () => { navObs.disconnect(); lineObs.disconnect(); };
  }, [booted]);

  /* ── skill filter ── */
  const toggleSkill = useCallback((skill) => {
    setSelectedSkills(prev => {
      const next = new Set(prev);
      if (next.has(skill)) next.delete(skill); else next.add(skill);
      if (next.size === 1) setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 120);
      return next;
    });
  }, []);

  /* ── boot gate ── */
  if (!booted) return <BootSequence onDone={() => setBooted(true)} />;

  return (
    <>
      <Background accent={settings.accent} reduceMotion={settings.reduceMotion} />
      <Cursor accent={settings.accent} />

      <Nav
        active={activeSection}
        onNav={setActiveSection}
        onSettings={() => setSettingsOpen(true)}
        onTerminal={() => setTerminalOpen(o => !o)}
      />

      <main>
        <Hero />
        <PixelDivider />
        <About />
        <PixelDivider />
        <Skills selectedSkills={selectedSkills} onToggleSkill={toggleSkill} />
        <PixelDivider />
        <Projects selectedSkills={selectedSkills} />
        <PixelDivider />
        <Contact />
      </main>

      <Footer />

      <FloatingTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />

      <Settings
        open={settingsOpen}
        settings={settings}
        onChange={setSettings}
        onClose={() => setSettingsOpen(false)}
      />

      {settings.crtFilter && <div className="crt-overlay" aria-hidden="true" />}
    </>
  );
};

export default App;

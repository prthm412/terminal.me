import React, { useState, useEffect, useRef } from 'react';
import PORTFOLIO_DATA from '../data/portfolio-data';

/* ── Pixel-art icons (16×16) ── */
const IconLang  = () => <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect x="5" y="2" width="2" height="2"/><rect x="3" y="4" width="2" height="2"/><rect x="1" y="6" width="2" height="2"/><rect x="1" y="8" width="2" height="2"/><rect x="3" y="10" width="2" height="2"/><rect x="5" y="12" width="2" height="2"/><rect x="9" y="2" width="2" height="2"/><rect x="11" y="4" width="2" height="2"/><rect x="13" y="6" width="2" height="2"/><rect x="13" y="8" width="2" height="2"/><rect x="11" y="10" width="2" height="2"/><rect x="9" y="12" width="2" height="2"/></svg>;
const IconGfx   = () => <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect x="7" y="1" width="2" height="2"/><rect x="5" y="3" width="2" height="2"/><rect x="9" y="3" width="2" height="2"/><rect x="3" y="5" width="2" height="2"/><rect x="11" y="5" width="2" height="2"/><rect x="1" y="7" width="2" height="2"/><rect x="13" y="7" width="2" height="2"/><rect x="1" y="9" width="14" height="2"/></svg>;
const IconML    = () => <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect x="0" y="2" width="3" height="3"/><rect x="0" y="7" width="3" height="3"/><rect x="0" y="12" width="3" height="3"/><rect x="6" y="5" width="3" height="3"/><rect x="6" y="10" width="3" height="3"/><rect x="12" y="7" width="3" height="3"/><rect x="3" y="3" width="3" height="1"/><rect x="3" y="8" width="3" height="1"/><rect x="3" y="13" width="3" height="1"/><rect x="9" y="6" width="3" height="1"/><rect x="9" y="11" width="3" height="1"/></svg>;
const IconData  = () => <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect x="1" y="8" width="2" height="6"/><rect x="4" y="5" width="2" height="9"/><rect x="7" y="7" width="2" height="7"/><rect x="10" y="2" width="2" height="12"/><rect x="13" y="4" width="2" height="10"/><rect x="0" y="14" width="16" height="1"/></svg>;
const IconTools = () => <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect x="9" y="0" width="5" height="2"/><rect x="11" y="2" width="3" height="2"/><rect x="9" y="2" width="2" height="4"/><rect x="7" y="4" width="2" height="2"/><rect x="5" y="6" width="2" height="2"/><rect x="3" y="8" width="2" height="2"/><rect x="1" y="10" width="2" height="2"/><rect x="0" y="12" width="5" height="4"/></svg>;

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
    <rect x="4" y="0" width="2" height="2"/>
    <rect x="10" y="0" width="2" height="2"/>
    <rect x="2" y="2" width="12" height="2"/>
    <rect x="0" y="4" width="16" height="2"/>
    <rect x="0" y="6" width="4" height="2"/>
    <rect x="6" y="6" width="4" height="2"/>
    <rect x="12" y="6" width="4" height="2"/>
    <rect x="0" y="8" width="16" height="2"/>
    <rect x="2" y="10" width="12" height="2"/>
    <rect x="2" y="12" width="2" height="2"/>
    <rect x="6" y="12" width="4" height="2"/>
    <rect x="12" y="12" width="2" height="2"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
    <rect x="2" y="2" width="2" height="2"/>
    <rect x="2" y="6" width="2" height="6"/>
    <rect x="6" y="6" width="6" height="2"/>
    <rect x="6" y="8" width="2" height="4"/>
    <rect x="10" y="8" width="2" height="4"/>
  </svg>
);

const PixelPersonIcon = () => (
  <svg viewBox="0 0 10 12" width="9" height="11" fill="currentColor">
    <rect x="3" y="0" width="4" height="4"/>
    <rect x="2" y="4" width="6" height="5"/>
    <rect x="1" y="9" width="3" height="3"/>
    <rect x="6" y="9" width="3" height="3"/>
  </svg>
);

const PixelTermIcon = () => (
  <svg viewBox="0 0 12 9" width="11" height="9" fill="currentColor">
    <rect x="0" y="0" width="12" height="1"/>
    <rect x="0" y="0" width="1"  height="9"/>
    <rect x="11" y="0" width="1" height="9"/>
    <rect x="0" y="8" width="12" height="1"/>
    <rect x="2" y="3" width="2"  height="1"/>
    <rect x="2" y="4" width="1"  height="1"/>
    <rect x="5" y="3" width="5"  height="1"/>
  </svg>
);

const GpuIcon = () => (
  <svg viewBox="0 0 14 10" width="13" height="10" fill="currentColor">
    <rect x="2" y="2" width="10" height="6"/>
    <rect x="0" y="3" width="2"  height="1"/>
    <rect x="0" y="5" width="2"  height="1"/>
    <rect x="12" y="3" width="2" height="1"/>
    <rect x="12" y="5" width="2" height="1"/>
    <rect x="4" y="0" width="1"  height="2"/>
    <rect x="6" y="0" width="1"  height="2"/>
    <rect x="8" y="0" width="1"  height="2"/>
    <rect x="5" y="3" width="4"  height="4" fill="var(--bg)"/>
    <rect x="6" y="4" width="2"  height="2"/>
  </svg>
);

export const SwordShieldIcon = () => (
  <svg viewBox="0 0 18 16" width="16" height="14" fill="currentColor">
    <rect x="4" y="0" width="2" height="8"/>
    <rect x="2" y="5" width="6" height="2"/>
    <rect x="4" y="8" width="2" height="4"/>
    <rect x="9"  y="0" width="7" height="1"/>
    <rect x="8"  y="1" width="1" height="8"/>
    <rect x="15" y="1" width="1" height="8"/>
    <rect x="9"  y="9" width="7" height="1"/>
    <rect x="10" y="10" width="5" height="1"/>
    <rect x="11" y="11" width="3" height="1"/>
    <rect x="12" y="12" width="1" height="1"/>
  </svg>
);

const EnvelopeIcon = () => (
  <svg viewBox="0 0 16 12" width="14" height="11" fill="none" style={{flexShrink:0}}>
    <rect x="1" y="1" width="14" height="10" stroke="currentColor" strokeWidth="1.5"
      fill="currentColor" fillOpacity="0.1"/>
    <polyline points="1,1 8,7 15,1" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const SignalSentStamp = () => (
  <div className="signal-sent-stamp">
    <svg viewBox="0 0 10 10" width="10" height="10" fill="currentColor">
      <rect x="4" y="0" width="2" height="3"/>
      <rect x="2" y="3" width="6" height="2"/>
      <rect x="0" y="5" width="10" height="3"/>
      <rect x="3" y="8" width="4" height="2"/>
    </svg>
    SIGNAL SENT ✓
  </div>
);

const AvatarPixelCorners = () => (
  <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:2}}>
    <svg viewBox="0 0 12 12" width="12" height="12" style={{position:'absolute',top:5,left:5}} fill="var(--accent)" opacity="0.65">
      <rect x="0" y="0" width="2" height="8"/><rect x="2" y="0" width="6" height="2"/>
    </svg>
    <svg viewBox="0 0 12 12" width="12" height="12" style={{position:'absolute',top:5,right:5}} fill="var(--accent)" opacity="0.65">
      <rect x="10" y="0" width="2" height="8"/><rect x="4" y="0" width="6" height="2"/>
    </svg>
    <svg viewBox="0 0 12 12" width="12" height="12" style={{position:'absolute',bottom:5,left:5}} fill="var(--accent)" opacity="0.65">
      <rect x="0" y="4" width="2" height="8"/><rect x="2" y="10" width="6" height="2"/>
    </svg>
    <svg viewBox="0 0 12 12" width="12" height="12" style={{position:'absolute',bottom:5,right:5}} fill="var(--accent)" opacity="0.65">
      <rect x="10" y="4" width="2" height="8"/><rect x="4" y="10" width="6" height="2"/>
    </svg>
  </div>
);

const PlayerBadge = () => (
  <div className="player-badge">
    <PixelPersonIcon/>
    PLAYER
  </div>
);

const SKILL_ICONS = { LANG: IconLang, GFX: IconGfx, ML: IconML, DATA: IconData, TOOLS: IconTools };
const SKILL_COLS  = ['skill-cat-0','skill-cat-1','skill-cat-2','skill-cat-3','skill-cat-4'];

/* ── HudBox ── */
export const HudBox = ({ children, className = '', style = {} }) => (
  <div className={`hud-box ${className}`} style={{ position: 'relative', ...style }}>
    <span className="hud-corner tl"/><span className="hud-corner tr"/>
    <span className="hud-corner bl"/><span className="hud-corner br"/>
    {children}
  </div>
);

/* ── SectionHeader ── */
export const SectionHeader = ({ index, label, icon }) => (
  <div className="section-header">
    {icon && <span style={{display:'flex',alignItems:'center',flexShrink:0}}>{icon}</span>}
    <span>// {String(index).padStart(2,'0')}. {label}</span>
  </div>
);

/* ── PixelDivider ── */
export const PixelDivider = () => (
  <div className="pixel-divider" aria-hidden="true">
    <span className="pdiv-line"/>
    <span className="pdiv-dot"/>
    <span className="pdiv-line"/>
    <span className="pdiv-dot"/>
    <span className="pdiv-line"/>
    <span className="pdiv-dot"/>
    <span className="pdiv-line"/>
  </div>
);

/* ── Nav ── */
export const Nav = ({ active, onNav, onSettings, onTerminal }) => {
  const { handle } = PORTFOLIO_DATA;
  const sections = [
    { id: 'about',    n: '01', label: 'ABOUT'   },
    { id: 'skills',   n: '02', label: 'SKILLS'  },
    { id: 'projects', n: '03', label: 'QUESTS'  },
    { id: 'contact',  n: '04', label: 'CONTACT' },
  ];
  return (
    <nav className="navbar">
      <div className="navbar-logo"><em>{handle || 'PLAYER_NAME'}</em></div>
      <div className="navbar-nav">
        {sections.map(s => (
          <button
            key={s.id}
            className={`nav-marker${active === s.id ? ' active' : ''}`}
            onClick={() => {
              document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              onNav(s.id);
            }}
          >[ {s.n} {s.label} ]</button>
        ))}
      </div>
      <div className="navbar-right">
        <button className="terminal-nav-btn" onClick={onTerminal}>
          <PixelTermIcon/>
          <span className="term-blink">▌</span>TERMINAL
        </button>
        <button className="gear-btn" onClick={onSettings} title="Settings">⚙</button>
      </div>
    </nav>
  );
};

/* ── Hero ── */
export const Hero = () => {
  const { name, title, bio, status, contact } = PORTFOLIO_DATA;
  return (
    <section id="hero" data-screen-label="Hero">
      <div className="hero-inner">
        <HudBox style={{ width: 172, height: 172, flexShrink: 0 }}>
          <div className="avatar-box">
            <AvatarPixelCorners/>
            <div className="avatar-inner">
              <div className="avatar-placeholder-icon">◈</div>
              <span>AVATAR<br/>180 × 180</span>
            </div>
          </div>
        </HudBox>
        <div>
          <div className="hero-eyebrow">PLAYER CARD // ACTIVE</div>
          <PlayerBadge/>
          <h1 className="hero-name">{name}<span className="cursor">_</span></h1>
          <div className="hero-class">Class: {title}</div>
          <p className="hero-bio">{bio}</p>
          <div className="status-badge">
            <span className="status-pulse"/>[ {status} ]
          </div>
          <div className="social-row">
            <a href={contact.github}            className="social-link" target="_blank" rel="noreferrer" title="GitHub"><GitHubIcon/></a>
            <a href={contact.linkedin}          className="social-link" target="_blank" rel="noreferrer" title="LinkedIn"><LinkedInIcon/></a>
            <a href={`mailto:${contact.email}`} className="social-link">[ @ ]</a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── About ── */
export const About = () => {
  const { name, title, status, about } = PORTFOLIO_DATA;
  return (
    <section id="about" data-screen-label="About">
      <div className="about-split">
        <div className="about-left">
          <div className="about-char-card">
            <HudBox>
              <div className="avatar-box" style={{ width: 150, height: 150 }}>
                <AvatarPixelCorners/>
                <div className="avatar-inner">
                  <div className="avatar-placeholder-icon">◈</div>
                  <span style={{ fontSize: 9 }}>AVATAR<br/>180 × 180</span>
                </div>
              </div>
            </HudBox>
            <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
              <div className="about-card-name">{name}</div>
              <div className="about-card-class">{title}</div>
              <div className="status-badge" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                <span className="status-pulse"/>[ {status} ]
              </div>
            </div>
          </div>
        </div>
        <div className="about-right">
          <SectionHeader index={1} label="ABOUT — CHARACTER LORE" />
          <p className="about-bio reveal">{about.bio}</p>
          <div className="reveal">
            {about.stats.map(s => (
              <HudBox key={s.label}>
                <div className="stat-box">
                  <span className="stat-label">{s.label}</span>
                  <span className="stat-value">{s.value}</span>
                </div>
              </HudBox>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Skills ── */
export const Skills = ({ selectedSkills, onToggleSkill, onClearSkills }) => {
  const { skills } = PORTFOLIO_DATA;
  return (
    <section id="skills" data-screen-label="Skills">
      <div className="section">
        <SectionHeader index={2} label="SKILLS — STAT SHEET" />
        <div className="skills-grid reveal">
          {Object.entries(skills).map(([key, cat], i) => {
            const Icon = SKILL_ICONS[key];
            return (
              <div key={key} className={`skill-category ${SKILL_COLS[i]}`}>
                <div className="skill-cat-head">
                  <span className="skill-rune">{cat.rune}</span>
                  {Icon && <span className="skill-icon"><Icon/></span>}
                  <span className="skill-cat-label">{cat.label}</span>
                </div>
                <div className="skill-tags">
                  {cat.items.map(item => (
                    <button
                      key={item}
                      className={`skill-tag${selectedSkills.has(item) ? ' active' : ''}`}
                      onClick={() => onToggleSkill(item)}
                    >{item}</button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {selectedSkills.size > 0 && (
          <button className="clear-filter-btn" onClick={onClearSkills}>
            [ CLEAR FILTER ]
          </button>
        )}
      </div>
    </section>
  );
};

/* ── Settings ── */
const ACCENT_COLORS = [
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Cyan',  value: '#06B6D4' },
  { name: 'Green', value: '#10B981' },
  { name: 'Red',   value: '#EF4444' },
];

export const Settings = ({ open, settings, onChange, onClose }) => {
  const upd = (k, v) => onChange({ ...settings, [k]: v });
  return (
    <div className={`settings-backdrop${open ? ' open' : ''}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={`settings-panel${open ? ' open' : ''}`}>
        <div className="settings-head">
          <span>// SYSTEM SETTINGS</span>
          <button className="settings-close" onClick={onClose}>✕</button>
        </div>
        <div className="settings-group">
          <div className="settings-group-lbl">DISPLAY MODE</div>
          <div className="theme-row">
            {['dark','light'].map(t => (
              <button key={t} className={`theme-opt${settings.theme===t?' active':''}`} onClick={() => upd('theme',t)}>
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="settings-group">
          <div className="settings-group-lbl">ACCENT COLOR</div>
          <div className="color-swatches">
            {ACCENT_COLORS.map(c => (
              <div key={c.value} className={`color-swatch${settings.accent===c.value?' active':''}`}
                style={{ background: c.value }} title={c.name} onClick={() => upd('accent', c.value)}/>
            ))}
          </div>
        </div>
        {[{key:'reduceMotion',label:'REDUCE MOTION'},{key:'scanLines',label:'SCAN LINES'},{key:'crtFilter',label:'CRT FILTER'}].map(({key,label}) => (
          <div className="settings-group" key={key}>
            <div className="toggle-row">
              <span>{label}</span>
              <button className={`toggle-btn${settings[key]?' on':''}`} onClick={() => upd(key, !settings[key])}>
                {settings[key]?'ON':'OFF'}
              </button>
            </div>
          </div>
        ))}
        <div style={{fontSize:9,color:'var(--text-dim)',letterSpacing:'0.1em',marginTop:'auto',paddingTop:'1rem',borderTop:'1px solid var(--border)'}}>
          PORTFOLIO.EXE v2.0.0
        </div>
      </div>
    </div>
  );
};

/* ── Contact ── */
export const Contact = () => {
  const { contact } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [sent, setSent]     = useState(false);
  const [sendErr, setSendErr] = useState('');
  const [form, setForm]     = useState({ name:'', email:'', message:'' });

  const copyEmail = () => {
    navigator.clipboard.writeText(contact.email)
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); })
      .catch(() => { setCopied(false); });
  };
  const handleSend = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSendErr('');
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (response.ok) {
        setSent(true);
        setForm({ name:'', email:'', message:'' });
        setTimeout(() => setSent(false), 5000);
      } else {
        setSendErr('TRANSMISSION FAILED — TRY AGAIN');
        setTimeout(() => setSendErr(''), 4000);
      }
    } catch {
      setSendErr('NO SIGNAL — CHECK CONNECTION');
      setTimeout(() => setSendErr(''), 4000);
    }
  };

  return (
    <section id="contact" data-screen-label="Contact">
      <div className="section">
        <SectionHeader index={4} label="CONTACT — SEND SIGNAL" />
        <div className="contact-center reveal">
          <p className="contact-tagline">Currently accepting new quests.</p>
          <div className="email-display" onClick={copyEmail}>
            <span style={{display:'flex',alignItems:'center',gap:'8px',color:'var(--accent)'}}>
              <EnvelopeIcon/>
              {contact.email}
            </span>
            <span className="email-copy-hint">{copied ? '✓ COPIED' : 'CLICK TO COPY'}</span>
          </div>
          <div className="contact-socials">
            <a href={contact.github}   className="hud-btn" target="_blank" rel="noreferrer">[ GITHUB ]</a>
            <a href={contact.linkedin} className="hud-btn" target="_blank" rel="noreferrer">[ LINKEDIN ]</a>
          </div>
          <form className="contact-form" onSubmit={handleSend}>
            <div className="form-row">
              <input  className="form-field" placeholder="NAME"  value={form.name}
                onChange={e => setForm(f=>({...f,name:e.target.value}))}/>
              <input  className="form-field" placeholder="EMAIL" type="email" value={form.email}
                onChange={e => setForm(f=>({...f,email:e.target.value}))}/>
            </div>
            <textarea className="form-field" placeholder="MESSAGE" rows={4} value={form.message}
              onChange={e => setForm(f=>({...f,message:e.target.value}))}/>
            {sent
              ? (
                <div style={{display:'flex',flexDirection:'column',gap:'0.4rem',alignItems:'flex-start'}}>
                  <SignalSentStamp/>
                  <div className="form-success">I'll respond within 24 hrs.</div>
                </div>
              )
              : (
                <div style={{display:'flex',flexDirection:'column',gap:'0.4rem',alignItems:'flex-start'}}>
                  <button type="submit" className="send-btn">SEND SIGNAL</button>
                  {sendErr && <div style={{fontSize:'9px',color:'var(--red)',letterSpacing:'0.1em'}}>{sendErr}</div>}
                </div>
              )
            }
          </form>
        </div>
      </div>
    </section>
  );
};

/* ── Footer ── */
export const Footer = () => {
  const { skills, projects } = PORTFOLIO_DATA;
  const vertexCount = Object.values(skills).reduce((n, c) => n + c.items.length, 0);
  return (
    <footer>
      <div className="footer-pixel-row" aria-hidden="true">
        {'• • • • • • •'.split(' ').map((d, i) => <span key={i}>{d}</span>)}
      </div>
      <div className="footer-stats">
        <GpuIcon/>
        <span className="fstat-sep"> </span>
        PORTFOLIO.EXE
        <span className="fstat-sep">|</span>
        BUILD v1.0.0
        <span className="fstat-sep">|</span>
        VRAM: ∞
        <span className="fstat-sep">|</span>
        FPS: 60
        <span className="fstat-sep">|</span>
        DRAW CALLS: {projects.length}
        <span className="fstat-sep">|</span>
        VERTICES: {vertexCount}
        <span className="fstat-sep">|</span>
        © {PORTFOLIO_DATA.name}
      </div>
    </footer>
  );
};

import React, { useState, useEffect, useRef, useMemo } from 'react';
import PORTFOLIO_DATA from '../data/portfolio-data';
import { HudBox, SectionHeader, SwordShieldIcon } from './portfolio-components';

const QuestStamp = () => (
  <div className="quest-stamp">
    <svg viewBox="0 0 8 10" width="7" height="9" fill="currentColor">
      <rect x="3" y="0" width="2" height="6"/>
      <rect x="1" y="3" width="6" height="2"/>
      <rect x="3" y="6" width="2" height="4"/>
    </svg>
    MAIN QUEST
  </div>
);

const PaperBadge = () => (
  <div className="paper-badge">PAPER SUBMITTED</div>
);

const AcuityVisual = ({ hovered }) => {
  const W = 276, H = 340, pad = 8;
  const zW = (W - pad * 2) / 3;
  const makeZone = (x0, y0, w, h, cols, rows) => {
    let d = '';
    const cw = w/cols, ch = h/rows;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const ax=(x0+c*cw).toFixed(1), ay=(y0+r*ch).toFixed(1);
      const bx=(x0+(c+1)*cw).toFixed(1), by=(y0+(r+1)*ch).toFixed(1);
      d += `M${ax},${ay}L${bx},${ay}L${ax},${by}Z`;
      d += `M${bx},${ay}L${bx},${by}L${ax},${by}Z`;
    }
    return d;
  };
  const d1 = useMemo(() => makeZone(pad,pad,zW-2,H-pad*2,8,12),[]);
  const d2 = useMemo(() => makeZone(pad+zW+2,pad,zW-2,H-pad*2,4,6),[]);
  const d3 = useMemo(() => makeZone(pad+zW*2+4,pad,zW-4,H-pad*2,2,3),[]);
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <linearGradient id="lodG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="var(--accent)" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.2"/>
        </linearGradient>
        <clipPath id="meshClip"><rect x={pad} y={pad} width={W-pad*2} height={H-pad*2}/></clipPath>
      </defs>
      <line x1={pad+zW}     y1={pad+4} x2={pad+zW}     y2={H-pad-4} stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      <line x1={pad+zW*2+2} y1={pad+4} x2={pad+zW*2+2} y2={H-pad-4} stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      <path d={d1} fill="none" stroke="url(#lodG)" strokeWidth="0.65" clipPath="url(#meshClip)"/>
      <path d={d2} fill="none" stroke="url(#lodG)" strokeWidth="1.0"  clipPath="url(#meshClip)"/>
      <path d={d3} fill="none" stroke="url(#lodG)" strokeWidth="1.6"  clipPath="url(#meshClip)"/>
      {hovered && (
        <rect x="0" y="0" width="40" height={H} fill="url(#swpG)"
          style={{ animation: 'scanSweep 1.1s ease-in-out forwards' }}/>
      )}
      <defs>
        <linearGradient id="swpG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="var(--accent)" stopOpacity="0"/>
          <stop offset="50%"  stopColor="var(--accent)" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <text x={pad+zW*0.5}   y={H-3} textAnchor="middle" fill="var(--accent)" fontSize="7" opacity="0.55" fontFamily="IBM Plex Mono">HIGH POLY</text>
      <text x={pad+zW*1.5+2} y={H-3} textAnchor="middle" fill="var(--accent)" fontSize="7" opacity="0.4"  fontFamily="IBM Plex Mono">MED POLY</text>
      <text x={pad+zW*2.5+4} y={H-3} textAnchor="middle" fill="var(--accent)" fontSize="7" opacity="0.28" fontFamily="IBM Plex Mono">LOW POLY</text>
    </svg>
  );
};

const PathifyVisual = () => (
  <svg width="100%" height="100%" viewBox="0 0 276 340">
    <defs>
      <pattern id="grdP" width="18" height="18" patternUnits="userSpaceOnUse">
        <path d="M18 0L0 0 0 18" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="0.5"/>
      </pattern>
      <style>{`
        .pa { stroke-dasharray:370; stroke-dashoffset:370; animation: tracePath 3.2s ease-in-out infinite; }
        .da { animation: destAppear 3.2s ease-in-out infinite; }
      `}</style>
    </defs>
    <rect width="276" height="340" fill="url(#grdP)"/>
    <rect x="12"  y="30"  width="80" height="55" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
    <rect x="90"  y="130" width="88" height="55" fill="rgba(255,255,255,0.02)"  stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
    <rect x="174" y="230" width="80" height="55" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
    <polyline points="52,57 138,57 138,157 214,157 214,257" fill="none" stroke="var(--accent)" strokeOpacity="0.1" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round"/>
    <polyline className="pa" points="52,57 138,57 138,157 214,157 214,257" fill="none" stroke="var(--accent)" strokeOpacity="0.9" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
    <circle cx="52"  cy="57"  r="5" fill="var(--accent)"/>
    <circle className="da" cx="214" cy="257" r="4" fill="var(--accent)"/>
    <text x="52"  y="24"  textAnchor="middle" fill="var(--accent)" fontSize="9" fontFamily="IBM Plex Mono">START</text>
    <text className="da" x="214" y="220" textAnchor="middle" fill="var(--accent)" fontSize="9" fontFamily="IBM Plex Mono">DEST</text>
  </svg>
);

const DIFF = [
  { t:'normal',  n:'01', c:'def process_commit(diff, meta):' },
  { t:'normal',  n:'02', c:'  features = extract_features(diff)' },
  { t:'removed', n:'03', c:'-  threshold = 0.72' },
  { t:'normal',  n:'04', c:'  risk = model.predict(features)' },
  { t:'flagged', n:'05', c:'  if risk > threshold:', s:'HIGH' },
  { t:'removed', n:'06', c:'-  return basic_flag(risk)' },
  { t:'flagged', n:'07', c:'    log_bug(risk_score=risk)', s:'HIGH' },
  { t:'normal',  n:'08', c:'  return {"risk": risk}' },
];

const BugSageVisual = () => (
  <div style={{padding:'14px',fontFamily:"'IBM Plex Mono',monospace",fontSize:'11px',lineHeight:'1.55',height:'100%',overflowY:'auto',display:'flex',flexDirection:'column',gap:'1px'}}>
    {DIFF.map((ln,i) => (
      <div key={i} style={{display:'flex',gap:'8px',padding:'2px 5px',
        background: ln.t==='removed'?'rgba(239,68,68,0.1)':ln.t==='flagged'?'rgba(245,158,11,0.07)':'transparent',
        borderLeft: ln.t==='flagged'?'2px solid var(--accent)':ln.t==='removed'?'2px solid #EF4444':'2px solid transparent'}}>
        <span style={{color:'#444',minWidth:'16px',userSelect:'none'}}>{ln.n}</span>
        <span style={{flex:1,color:ln.t==='removed'?'#EF4444':ln.t==='flagged'?'var(--accent)':'#6b7280'}}>{ln.c}</span>
        {ln.s && <span style={{color:'var(--accent)',fontSize:'8px',opacity:0.75,alignSelf:'center'}}>{ln.s}</span>}
      </div>
    ))}
    <div style={{marginTop:'10px',padding:'8px',border:'1px solid rgba(245,158,11,0.25)'}}>
      <div style={{fontSize:'8.5px',color:'#555',letterSpacing:'0.12em',marginBottom:'6px'}}>SEVERITY ANALYSIS</div>
      {[{label:'RISK SCORE',w:'78%',col:'#EF4444'},{label:'CONFIDENCE',w:'91%',col:'var(--accent)'}].map(m => (
        <div key={m.label} style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px'}}>
          <span style={{fontSize:'8px',color:'#555',minWidth:'72px'}}>{m.label}</span>
          <div style={{flex:1,background:'rgba(255,255,255,0.05)',height:'3px'}}>
            <div style={{width:m.w,height:'100%',background:m.col,opacity:0.8}}/>
          </div>
          <span style={{fontSize:'8px',color:m.col}}>{m.w}</span>
        </div>
      ))}
    </div>
  </div>
);

const ProjectCard = ({ project, selectedSkills }) => {
  const [hovered, setHovered] = useState(false);
  const isFiltered = selectedSkills.size > 0;
  const hasMatch   = isFiltered && project.tags.some(t => selectedSkills.has(t));
  const dimmed     = isFiltered && !hasMatch;
  const Visual     = { lod: AcuityVisual, pathfinding: PathifyVisual, diff: BugSageVisual }[project.visual];

  return (
    <HudBox>
      <div
        className={`project-card-h${dimmed ? ' dimmed' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {project.id === 'bugsage' ? <PaperBadge/> : <QuestStamp/>}
        <div className="project-visual">
          {Visual && <Visual hovered={hovered}/>}
        </div>
        <div className="project-info">
          <div className="project-name">{project.name}</div>
          <p className="project-desc">{project.description}</p>
          <div className="project-tags">
            {project.tags.map(t => (
              <span key={t} className={`project-tag${selectedSkills.has(t) ? ' hl' : ''}`}>{t}</span>
            ))}
          </div>
          <div className="project-footer">
            <a href={project.github} className="quest-btn" target="_blank" rel="noreferrer">VIEW QUEST →</a>
            {project.badge && <span className="project-badge">{project.badge}</span>}
          </div>
        </div>
      </div>
    </HudBox>
  );
};

const Projects = ({ selectedSkills }) => {
  const { projects } = PORTFOLIO_DATA;
  return (
    <section id="projects" data-screen-label="Projects">
      <div className="projects-scroll-outer">
        <div className="projects-scroll-header">
          <SectionHeader index={3} label="QUESTS — COMPLETED" icon={<SwordShieldIcon/>}/>
          {selectedSkills.size > 0 && (
            <p className="projects-filter-hint">
              Filtering by: <em>{[...selectedSkills].join(', ')}</em>
            </p>
          )}
        </div>
        <div className="projects-stack">
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} selectedSkills={selectedSkills}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

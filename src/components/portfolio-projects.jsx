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

/* ── Mediq: real-time scheduler + pub/sub ── */
const MediqVisual = () => {
  const GRID = [
    [1, 1, 0, 1, 0],
    [0, 1, 1, 0, 1],
    [1, 0, 2, 1, 0],
  ];
  const SLOTS = ['09:00','10:00','11:00','12:00','13:00'];
  const DRS   = ['DR·A','DR·B','DR·C'];
  const CW=38, CH=22, CG=3, GX=38, GY=44;
  const HX=138, HY=205;
  const CLIENTS = [[54,258],[138,270],[222,258]];
  const mkPath = ([cx,cy]) => `M${HX},${HY} L${cx},${cy}`;

  return (
    <svg width="100%" height="100%" viewBox="0 0 276 340" fontFamily="IBM Plex Mono, monospace">
      <defs>
        <style>{`
          .mq-book { animation: mqBook 1.5s ease-in-out infinite; }
          @keyframes mqBook {
            0%,100% { fill-opacity:.1; stroke-opacity:.4; }
            50%      { fill-opacity:.6; stroke-opacity:1;  }
          }
          .mq-lbl  { animation: mqLbl  1.5s ease-in-out infinite; }
          @keyframes mqLbl { 0%,100%{opacity:.35} 50%{opacity:1} }
        `}</style>
      </defs>

      {/* ── Header bar ── */}
      <rect x="0" y="0" width="276" height="26" fill="var(--accent)" fillOpacity=".07"/>
      <line x1="0" y1="26" x2="276" y2="26" stroke="var(--accent)" strokeOpacity=".2" strokeWidth="1"/>
      <text x="10" y="17" fill="var(--accent)" fontSize="8.5" letterSpacing=".14em">MEDIQ SCHEDULER</text>
      <circle cx="245" cy="13" r="3" fill="var(--green)">
        <animate attributeName="opacity" values="1;.2;1" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <text x="251" y="17" fill="var(--green)" fontSize="7.5" letterSpacing=".1em">LIVE</text>

      {/* ── Time slot headers ── */}
      {SLOTS.map((s,i) => (
        <text key={s} x={GX+i*(CW+CG)+CW/2} y={GY-7}
          textAnchor="middle" fill="var(--text-dim)" fontSize="7" letterSpacing=".04em">{s}</text>
      ))}

      {/* ── Schedule grid ── */}
      {DRS.map((dr,r) => (
        <g key={dr}>
          <text x={GX-6} y={GY+r*(CH+CG)+CH/2+3}
            textAnchor="end" fill="var(--text-dim)" fontSize="7.5" letterSpacing=".04em">{dr}</text>
          {GRID[r].map((val,c) => {
            const x=GX+c*(CW+CG), y=GY+r*(CH+CG);
            const isNew=val===2, booked=val>=1;
            return (
              <g key={c}>
                <rect x={x} y={y} width={CW} height={CH}
                  fill="var(--accent)" fillOpacity={isNew?.1:booked?.18:0}
                  stroke="var(--accent)" strokeOpacity={booked?.55:.18} strokeWidth="1"
                  className={isNew?'mq-book':''}/>
                {isNew && (
                  <text x={x+CW/2} y={y+CH/2+3} textAnchor="middle"
                    fill="var(--accent)" fontSize="6.5" letterSpacing=".1em"
                    className="mq-lbl">● LIVE</text>
                )}
              </g>
            );
          })}
        </g>
      ))}

      {/* ── Queue bar ── */}
      {(()=>{
        const qy=GY+3*(CH+CG)+6;
        return (<g>
          <line x1="0" y1={qy} x2="276" y2={qy} stroke="var(--border-bright)" strokeOpacity=".5"/>
          <rect x="0" y={qy} width="276" height="22" fill="var(--accent)" fillOpacity=".03"/>
          <text x="10" y={qy+14} fill="var(--text-dim)" fontSize="7.5" letterSpacing=".1em">QUEUE</text>
          <rect x="52" y={qy+7} width="80" height="5" fill="var(--border)" opacity=".4"/>
          <rect x="52" y={qy+7} width="56" height="5" fill="var(--accent)" opacity=".5"/>
          <text x="138" y={qy+14} fill="var(--accent)" fontSize="7.5" letterSpacing=".08em">4 WAITING</text>
          <text x="217" y={qy+14} fill="var(--green)" fontSize="7" letterSpacing=".05em">+1 LIVE</text>
          <line x1="0" y1={qy+22} x2="276" y2={qy+22} stroke="var(--border-bright)" strokeOpacity=".5"/>
        </g>);
      })()}

      {/* ── Pub/sub label ── */}
      {(()=>{
        const ty=GY+3*(CH+CG)+42;
        return (
          <text x="10" y={ty} fill="var(--text-dim)" fontSize="7.5" letterSpacing=".09em">
            REDIS PUB/SUB — 3 CLIENTS CONNECTED
          </text>
        );
      })()}

      {/* ── Connection lines ── */}
      {CLIENTS.map((c,i)=>(
        <line key={i} x1={HX} y1={HY} x2={c[0]} y2={c[1]}
          stroke="var(--accent)" strokeOpacity=".18" strokeWidth="1"/>
      ))}

      {/* ── Animated message dots (hub → clients) ── */}
      {CLIENTS.map((c,i)=>(
        <circle key={i} r="2.5" fill="var(--accent)">
          <animateMotion path={mkPath(c)} dur="1.5s" begin={`${i*0.48}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" begin={`${i*0.48}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* ── Hub ── */}
      <rect x={HX-20} y={HY-11} width="40" height="22"
        fill="var(--accent)" fillOpacity=".1" stroke="var(--accent)" strokeOpacity=".55" strokeWidth="1"/>
      <text x={HX} y={HY+4} textAnchor="middle" fill="var(--accent)" fontSize="7.5" letterSpacing=".1em">REDIS</text>

      {/* ── Client nodes ── */}
      {CLIENTS.map(([cx,cy],i)=>(
        <g key={i}>
          <rect x={cx-16} y={cy-9} width="32" height="18"
            fill="var(--surface2)" stroke="var(--accent)" strokeOpacity=".35" strokeWidth="1"/>
          <text x={cx} y={cy+4} textAnchor="middle" fill="var(--text-dim)" fontSize="7" letterSpacing=".06em">
            {['ADMIN','DOC','PAT'][i]}
          </text>
        </g>
      ))}

      {/* ── Event log ── */}
      {(()=>{
        const ey=293;
        return (<g>
          <line x1="0" y1={ey} x2="276" y2={ey} stroke="var(--border-bright)" strokeOpacity=".4"/>
          <text x="10" y={ey+13} fill="var(--text-dim)" fontSize="6.5" letterSpacing=".06em">
            BOOKED: DR·C / 11:00 · PUSHED 3 CLIENTS
          </text>
          <text x="10" y={ey+26} fill="var(--text-dim)" fontSize="6.5" letterSpacing=".06em" opacity=".5">
            ROLE: ADMIN · JWT ✓ · AUDIT LOGGED
          </text>
        </g>);
      })()}
    </svg>
  );
};

const ProjectCard = ({ project, selectedSkills }) => {
  const [hovered, setHovered] = useState(false);
  const isFiltered = selectedSkills.size > 0;
  const hasMatch   = isFiltered && project.tags.some(t => selectedSkills.has(t));
  const dimmed     = isFiltered && !hasMatch;
  const Visual     = { lod: AcuityVisual, pathfinding: PathifyVisual, diff: BugSageVisual, mediq: MediqVisual }[project.visual];

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

import React, { useState, useEffect, useRef } from 'react';
import PORTFOLIO_DATA from '../data/portfolio-data';

const processCommand = (raw) => {
  const cmd = raw.trim().toLowerCase();
  const d = PORTFOLIO_DATA;
  const o = (text, type = 'output') => ({ text, type });
  const br = () => o('');

  switch (cmd) {
    case 'help': return [br(),o('AVAILABLE COMMANDS','accent'),o('─────────────────────────────────────────','dim'),
      o('  whoami          Personal information'),o('  skills          Skill set'),o('  projects        Project overview'),
      o('  quest --list    Detailed quest log'),o('  status          Current availability'),o('  stack           Tech stack'),
      o('  academics       Education details'),o('  github          GitHub profile link'),o('  contact         Contact info'),
      o('  clear           Clear terminal','dim'),br(),o('TIP: Try "sudo hire me"','dim'),br()];

    case 'whoami': return [br(),
      o('┌──────────────────────────────────────────────┐','dim'),
      o(`│  NAME      ${d.name.padEnd(34)}│`),
      o(`│  CLASS     Game & Systems Developer          │`),
      o(`│  LOCATION  ${d.location.padEnd(34)}│`),
      o(`│  STATUS    OPEN TO OPPORTUNITIES             │`,'accent'),
      o('└──────────────────────────────────────────────┘','dim'),br()];

    case 'status': return [br(),o('[●] ONLINE','success'),
      o('AVAILABILITY    : OPEN TO OPPORTUNITIES','accent'),
      o(`CURRENT_QUEST   : ${d.about.stats.find(s=>s.label==='BUILDING')?.value||'N/A'}`),
      o('RESPONSE_TIME   : < 24 HRS'),
      o('PREFERRED_ROLE  : Systems / Graphics / ML Engineer'),br()];

    case 'skills': {
      const lines=[br(),o('SKILL REGISTRY','accent'),o('─────────────────────────────────────────','dim')];
      Object.entries(d.skills).forEach(([,cat])=>{
        lines.push(o(`  [${cat.rune}] ${cat.label.toUpperCase().padEnd(32)}`,'accent'));
        lines.push(o(`      ${cat.items.join(', ')}`));
      });
      lines.push(br()); return lines;
    }

    case 'projects': return [br(),o('COMPLETED QUESTS','accent'),o('─────────────────────────────────────────','dim'),
      ...d.projects.map((p,i)=>o(`  [${String(i+1).padStart(2,'0')}] ${p.name.padEnd(12)}— ${p.description.slice(0,50)}…`)),
      br(),o('Type "quest --list" for details.','dim'),br()];

    case 'quest --list': return d.projects.flatMap((p,i)=>[br(),
      o(`┌─ [${String(i+1).padStart(2,'0')}] ${p.name} ${'─'.repeat(38-p.name.length)}┐`,'dim'),
      o(`│  ${p.description.slice(0,47).padEnd(47)}│`),
      o(`│  TAGS: ${p.tags.slice(0,4).join(', ')}${p.tags.length>4?'…':''}`.padEnd(49)+'│','dim'),
      o(`│  REPO: ${p.github.padEnd(41)}│`,'accent'),
      o(`└${'─'.repeat(50)}┘`,'dim')]);

    case 'stack': return [br(),o('FULL TECH STACK','accent'),o('─────────────────────────────────────────','dim'),
      o('  SYSTEMS    :: C++17, GLSL, Vulkan API, CMake'),
      o('  ML / DATA  :: Python 3, PyTorch, ONNX, NumPy, Pandas'),
      o('  GRAPHICS   :: GLFW, GLM, ImGui, real-time 3D rendering'),
      o('  TOOLS      :: Git, Docker, Visual Studio, W&B, Nsight'),br()];

    case 'academics': return [br(),o('ACADEMIC RECORD','accent'),o('─────────────────────────────────────────','dim'),
      ...d.about.stats.map(s=>o(`  ${s.label.padEnd(12)}: ${s.value}`)),br()];

    case 'github':
      if (typeof window !== 'undefined') window.open(d.contact.github, '_blank');
      return [br(),o('GITHUB PROFILE','accent'),o(`→  ${d.contact.github}`),br(),o('Opening in new tab...','dim'),br()];

    case 'contact': return [br(),o('CONTACT INFORMATION','accent'),o('─────────────────────────────────────────','dim'),
      o(`  EMAIL     : ${d.contact.email}`),o(`  GITHUB    : ${d.contact.github}`),o(`  LINKEDIN  : ${d.contact.linkedin}`),br()];

    case 'sudo hire me': return [br(),o('[sudo] password for recruiter: ••••••••','dim'),br(),
      o('✓ Authentication successful.','success'),o('INITIATING HIRE SEQUENCE...','accent'),
      o('  ▸ Parsing candidate profile.............. OK','dim'),
      o('  ▸ Verifying skill requirements........... OK','dim'),
      o('  ▸ Generating offer letter................ OK','dim'),
      o('  ▸ Calendar invite: Technical Interview... OK','dim'),br(),
      o('╔══════════════════════════════════════════════╗','accent'),
      o('║  STATUS: HIRED.exe  —  ACCESS GRANTED  ✓    ║','accent'),
      o('╚══════════════════════════════════════════════╝','accent'),br(),
      o('Scroll down to send a message →','dim'),br()];

    case '': return [];
    default: return [o(`command not found: ${raw}. Type 'help'.`,'error')];
  }
};

const FloatingTerminal = ({ open, onClose }) => {
  const [pos, setPos]             = useState({ x: 0, y: 0 });
  const [centered, setCentered]   = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [lines, setLines]         = useState([
    { text: 'portfolio@system:~$ — TERMINAL v2.0', type: 'dim' },
    { text: 'Type "help" for available commands.', type: 'dim' },
    { text: '', type: 'output' },
  ]);
  const [input, setInput]     = useState('');
  const [cmdHist, setCmdHist] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);

  const panelRef = useRef(null);
  const dragRef  = useRef({ on: false, sx: 0, sy: 0, px: 0, py: 0 });
  const bodyRef  = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && !centered && panelRef.current) {
      const w = panelRef.current.offsetWidth  || 580;
      const h = panelRef.current.offsetHeight || 420;
      setPos({ x: Math.max(0,(window.innerWidth-w)/2), y: Math.max(0,(window.innerHeight-h)/2) });
      setCentered(true);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current.on) return;
      setPos({ x: dragRef.current.px + e.clientX - dragRef.current.sx,
               y: dragRef.current.py + e.clientY - dragRef.current.sy });
    };
    const onUp = () => { dragRef.current.on = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  const startDrag = (e) => {
    dragRef.current = { on: true, sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y };
    e.preventDefault();
  };

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const submit = (cmd) => {
    const t = cmd.trim();
    if (t.toLowerCase() === 'clear') { setLines([]); }
    else {
      const out = processCommand(t);
      setLines(prev => [...prev, { text: `portfolio@system:~$ ${t}`, type: 'prompt' }, ...out]);
    }
    if (t) setCmdHist(h => [...h, t]);
    setHistIdx(-1); setInput('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') { submit(input); }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const ni = Math.min(histIdx+1, cmdHist.length-1);
      setHistIdx(ni); if (ni >= 0) setInput(cmdHist[cmdHist.length-1-ni]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const ni = Math.max(histIdx-1, -1);
      setHistIdx(ni); setInput(ni < 0 ? '' : cmdHist[cmdHist.length-1-ni]);
    }
  };

  const closeTerminal = () => { setMinimized(false); onClose(); };

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      className="floating-terminal open"
      style={{ left: pos.x, top: pos.y, minHeight: minimized ? 0 : undefined }}
    >
      <div className="terminal-titlebar" onMouseDown={startDrag}>
        <div className="term-dots">
          <div className="term-dot r" onClick={closeTerminal} title="Close"/>
          <div className="term-dot y" onClick={() => setMinimized(m => !m)} title={minimized ? 'Restore' : 'Minimise'}/>
          <div className="term-dot g" title="—"/>
        </div>
        <div className="term-title">portfolio@system:~$</div>
        {minimized && <div style={{marginLeft:'auto',fontSize:9,color:'var(--text-dim)',letterSpacing:'0.1em'}}>MINIMISED</div>}
      </div>

      {!minimized && (
        <>
          <div className="terminal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
            {lines.map((ln, i) => <div key={i} className={`term-line ${ln.type}`}>{ln.text}</div>)}
          </div>
          <div className="terminal-input-row">
            <span className="term-prompt-label">portfolio@system:~$</span>
            <input ref={inputRef} className="term-input" value={input}
              onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
              spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off"
              aria-label="Terminal input"/>
          </div>
        </>
      )}
    </div>
  );
};

export default FloatingTerminal;

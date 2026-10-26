import React, { useState, useEffect, useRef } from 'react';
import PORTFOLIO_DATA from '../data/portfolio-data';

const NODES = {
  feedA:   { x:8,   y:8,   w:48, h:14, label:'FEED A',      type:'sys', desc:'Primary market data feed (UDP multicast).' },
  feedB:   { x:8,   y:28,  w:48, h:14, label:'FEED B',      type:'sys', desc:'Redundant backup feed for packet-loss recovery.' },
  handler: { x:90,  y:14,  w:56, h:22, label:'FEED HANDLER',type:'sys', desc:'Parses raw packets into normalized market events.' },
  queue1:  { x:168, y:19,  w:30, h:12, label:'Q1',          type:'q',   desc:'Lock-free SPSC queue: handler → book.' },
  book:    { x:120, y:56,  w:64, h:30, label:'ORDER BOOK',  type:'sys', desc:'Maintains live bid/ask price levels.' },
  strategy:{ x:206, y:56,  w:64, h:30, label:'STRATEGY',    type:'strat', desc:'Market-making strategy quoting bid/ask.' },
  queue2:  { x:206, y:94,  w:30, h:12, label:'Q2',          type:'q',   desc:'Lock-free SPSC queue: strategy → exchange.' },
  exchange:{ x:178, y:120, w:92, h:30, label:'SIM EXCHANGE',type:'sys', desc:'Simulated matching engine with risk checks & latency.' },
  queue3:  { x:150, y:94,  w:30, h:12, label:'Q3',          type:'q',   desc:'Return path queue: exchange fills → strategy.' },
};

const EDGES = [
  { x1:56, y1:15, x2:90, y2:20, dash:'0' },
  { x1:56, y1:35, x2:90, y2:28, dash:'0' },
  { x1:146,y1:25, x2:168,y2:25, dash:'0' },
  { x1:198,y1:25, x2:152,y2:56, dash:'0' },
  { x1:184,y1:71, x2:206,y2:71, dash:'0' },
  { x1:238,y1:86, x2:221,y2:94, dash:'0' },
  { x1:221,y1:106,x2:224,y2:120,dash:'0' },
  { x1:178,y1:135,x2:165,y2:100,dash:'2,2' },
  { x1:165,y1:94, x2:238,y2:86, dash:'2,2' },
];

const CAPTIONS = [
  'Market data arrives on two redundant feeds.',
  'A packet is lost on feed A; feed B covers it.',
  'Bytes are parsed into market events.',
  'The order book updates buys and sells.',
  'The strategy quotes a bid and an ask.',
  'The exchange checks risk and applies delay.',
  'Orders fill only when their turn comes.',
  'Fills update position and profit.',
  'Every hop is timed in nanoseconds.',
];

function lerp(a, b, t) { return a + (b - a) * t; }

function computeFrame(step, p) {
  const out = {
    dotA: { x: -10, y: -10, opacity: 0, xOpacity: 0 },
    dotB: { x: -10, y: -10, opacity: 0 },
    chip: { x: -20, y: -20, opacity: 0, label: '', textX: -20, textY: -20 },
    glowId: null,
    bars: [0.5, 0.5, 0.5, 0.5],
    highlightBars: false,
    bidAskOpacity: 0,
    exchangeCheck: 0,
    exchangePause: 0,
    countdownText: '',
    exchangeFlash: 0,
    sequential: -1,
  };
  if (step === 0) {
    out.dotA = { x: lerp(56, 90, p), y: lerp(15, 20, p), opacity: 1, xOpacity: 0 };
    out.dotB = { x: lerp(56, 90, p), y: lerp(35, 28, p), opacity: 1 };
    if (p > 0.85) out.glowId = 'handler';
  } else if (step === 1) {
    if (p < 0.5) { out.dotA = { x: lerp(56, 73, p * 2), y: lerp(15, 17, p * 2), opacity: 1, xOpacity: p > 0.35 ? 1 : 0 }; }
    else { out.dotA = { x: 73, y: 17, opacity: 0, xOpacity: 0 }; }
    out.dotB = { x: lerp(56, 90, p), y: lerp(35, 28, p), opacity: 1 };
    if (p > 0.8) out.glowId = 'handler';
  } else if (step === 2) {
    out.chip = { x: lerp(146, 168, p), y: 20.5, opacity: 1, label: 'EVENT', textX: lerp(146, 168, p) + 13, textY: 25 };
    out.glowId = 'queue1';
  } else if (step === 3) {
    out.chip = { x: lerp(170, 133, p), y: lerp(20.5, 68, p), opacity: 1, label: 'EVENT', textX: lerp(170, 133, p) + 13, textY: lerp(20.5, 68, p) + 4.5 };
    out.highlightBars = p > 0.4;
    out.bars = out.highlightBars ? [0.7, 0.4, 0.6, 0.3] : [0.5, 0.5, 0.5, 0.5];
    out.glowId = 'book';
  } else if (step === 4) {
    out.bidAskOpacity = Math.min(1, p * 2);
    out.glowId = 'strategy';
  } else if (step === 5) {
    if (p < 0.5) out.chip = { x: lerp(238, 221, p * 2), y: lerp(86, 94, p * 2), opacity: 1, label: 'ORDER', textX: lerp(238, 221, p * 2) + 13, textY: lerp(86, 94, p * 2) - 4 };
    else out.chip = { x: lerp(221, 224, (p - 0.5) * 2), y: lerp(100, 120, (p - 0.5) * 2), opacity: 1, label: 'ORDER', textX: lerp(221, 224, (p - 0.5) * 2) + 13, textY: lerp(100, 120, (p - 0.5) * 2) - 4 };
    out.exchangeCheck = p > 0.75 ? 1 : 0;
    out.exchangePause = p > 0.9 ? 1 : 0;
    out.glowId = 'exchange';
  } else if (step === 6) {
    if (p < 0.3) out.countdownText = '3';
    else if (p < 0.55) out.countdownText = '2';
    else if (p < 0.8) out.countdownText = '1';
    else out.countdownText = 'FILL';
    out.exchangeFlash = p > 0.85 ? (1 - (p - 0.85) / 0.15) * 0.9 : 0;
    out.glowId = 'exchange';
  } else if (step === 7) {
    if (p < 0.5) out.chip = { x: lerp(178, 165, p * 2), y: lerp(135, 100, p * 2), opacity: 1, label: 'FILL', textX: lerp(178, 165, p * 2) + 13, textY: lerp(135, 100, p * 2) - 4 };
    else out.chip = { x: lerp(165, 238, (p - 0.5) * 2), y: lerp(100, 86, (p - 0.5) * 2), opacity: 1, label: 'FILL', textX: lerp(165, 238, (p - 0.5) * 2) + 13, textY: lerp(100, 86, (p - 0.5) * 2) - 4 };
    out.glowId = 'strategy';
  } else if (step === 8) {
    const seq = Math.min(4, Math.floor(p * 5));
    out.sequential = seq;
    out.glowId = ['handler', 'queue1', 'book', 'strategy', 'exchange'][seq];
  }
  return out;
}

const SEQ_LABELS = ['PARSE', 'QUEUE', 'BOOK', 'STRAT', 'EXCH'];

const MONO = "'IBM Plex Mono',monospace";
const nodeText = { fill: 'var(--accent)', fontFamily: MONO, letterSpacing: '0.02em' };
const qText = { fill: 'var(--text-muted)', fontFamily: MONO, letterSpacing: '0.02em' };

/* anchor with hover state in place of style-hover */
const CardLink = ({ href, base, hover, children }) => {
  const [h, setH] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ textDecoration: 'none', ...base, ...(h ? hover : null) }}
    >
      {children}
    </a>
  );
};

const TickForgeCard = () => {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === 'tickforge');
  const { name, description, tags, highlights, metrics, github } = project;

  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [captionFade, setCaptionFade] = useState(false);
  const [posCount, setPosCount] = useState(0);
  const [pnlCount, setPnlCount] = useState(0);
  const [gridHover, setGridHover] = useState(false);
  const [pauseHover, setPauseHover] = useState(false);

  const startTime = useRef(0);
  const filled = useRef(false);
  const stepRef = useRef(0);
  const live = useRef({ paused, reducedMotion, hoveredNode });
  live.current = { paused, reducedMotion, hoveredNode };

  useEffect(() => {
    const mql = window.matchMedia('(max-width:750px)');
    const rmq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMql = () => setIsMobile(mql.matches);
    const onRmq = () => setReducedMotion(rmq.matches);
    mql.addEventListener('change', onMql);
    rmq.addEventListener('change', onRmq);
    onMql();
    onRmq();

    startTime.current = performance.now();
    filled.current = false;
    let fadeTimer;

    const tick = () => {
      const { paused: p, reducedMotion: r, hoveredNode: h } = live.current;
      if (p || r || h) return;
      const stepDur = 1300, totalSteps = 9;
      const elapsed = performance.now() - startTime.current;
      const cycle = elapsed % (stepDur * totalSteps);
      const stepIdx = Math.floor(cycle / stepDur);
      const prog = (cycle % stepDur) / stepDur;
      if (stepIdx !== stepRef.current) {
        stepRef.current = stepIdx;
        setStep(stepIdx);
        setProgress(prog);
        setCaptionFade(true);
        clearTimeout(fadeTimer);
        fadeTimer = setTimeout(() => setCaptionFade(false), 60);
        if (stepIdx === 0) { setPosCount(0); setPnlCount(0); }
      } else {
        setProgress(prog);
      }
      if (stepIdx === 7 && prog > 0.85 && !filled.current) {
        filled.current = true;
        setPosCount(c => c + 1);
        setPnlCount(c => c + 1);
      }
      if (stepIdx !== 7) filled.current = false;
    };
    const timer = setInterval(tick, 40);

    return () => {
      clearInterval(timer);
      clearTimeout(fadeTimer);
      mql.removeEventListener('change', onMql);
      rmq.removeEventListener('change', onRmq);
    };
  }, []);

  const curStep = reducedMotion ? 0 : step;
  const curProgress = reducedMotion ? 0 : progress;
  const frame = computeFrame(curStep, curProgress);
  const hovered = hoveredNode;

  const glowNode = frame.glowId && !hovered ? NODES[frame.glowId] : null;
  const pulse = 0.4 + Math.abs(Math.sin(curProgress * Math.PI * 3)) * 0.6;
  const glow = glowNode
    ? { x: glowNode.x - 1, y: glowNode.y - 1, w: glowNode.w + 2, h: glowNode.h + 2, opacity: pulse }
    : { x: -10, y: -10, w: 0, h: 0, opacity: 0 };

  const bookNode = NODES.book;
  const barColors = ['var(--text-muted)', 'var(--accent)', 'var(--accent)', 'var(--text-muted)'];
  const bookBars = frame.bars.map((wFrac, i) => ({
    x: bookNode.x + 6, y: bookNode.y + 6 + i * 6, w: Math.max(6, wFrac * (bookNode.w - 12)),
    color: frame.highlightBars && (i === 1 || i === 2) ? 'var(--accent)' : barColors[i],
  }));

  const stopwatch = SEQ_LABELS.map((label, i) => {
    const lit = frame.sequential >= i;
    return { label, bg: lit ? 'var(--accent-dim)' : 'var(--surface2)', color: lit ? 'var(--accent)' : 'var(--text-muted)' };
  });

  const tooltipNode = hovered ? NODES[hovered] : null;
  const cLabel = frame.chip.label, cOp = frame.chip.opacity;
  const cd = curStep === 6 ? frame.countdownText : '';

  const gridStyle = isMobile
    ? { display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '300px 1fr', minHeight: '300px', width: '100%', border: '1px solid var(--border)', transition: 'border-color 0.2s ease, box-shadow 0.2s ease' }
    : { display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: '380px', width: '100%', border: '1px solid var(--border)', transition: 'border-color 0.2s ease, box-shadow 0.2s ease' };
  const gridHoverStyle = gridHover ? { borderColor: 'var(--accent)', boxShadow: '0 0 40px var(--accent-glow)' } : null;

  const hoverProps = (id) => ({
    onMouseEnter: () => setHoveredNode(id),
    onMouseLeave: () => setHoveredNode(null),
  });

  const posText = '+' + posCount;
  const pnlText = '+' + '∙'.repeat(Math.max(1, pnlCount));
  const caption = reducedMotion ? CAPTIONS[0] : CAPTIONS[curStep];
  const readme = github && github !== '#' ? `${github}#readme` : '#';

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{ ...gridStyle, ...gridHoverStyle }}
        onMouseEnter={() => setGridHover(true)}
        onMouseLeave={() => setGridHover(false)}
      >
        {/* LEFT PANE */}
        <div style={{ position: 'relative', background: 'var(--surface2)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: MONO }}>

          <div style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 3, padding: '2px 6px', border: '1px solid var(--accent)', color: 'var(--accent)', fontSize: '7px', letterSpacing: '0.08em', background: 'var(--surface2)' }}>SIMULATED</div>

          <svg viewBox="0 0 300 156" style={{ flex: 1, minHeight: 0, width: '100%', display: 'block' }}>
            <defs>
              <marker id="tf-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" fillOpacity="0.35"/>
              </marker>
            </defs>

            {/* edges */}
            {EDGES.map((e, i) => (
              <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="0.8" strokeDasharray={e.dash} markerEnd="url(#tf-arrow)"/>
            ))}
            <text x="62" y="27" fontSize="5.5" fill="var(--text-muted)" fontFamily="IBM Plex Mono, monospace">feeds A+B</text>

            {/* nodes */}
            <g {...hoverProps('feedA')}>
              <rect x="8" y="8" width="48" height="14" style={{ fill: 'var(--surface)', stroke: 'var(--accent)', strokeWidth: 1 }}/>
              <text x="32" y="15" fontSize="8" textAnchor="middle" dominantBaseline="middle" style={nodeText}>FEED A</text>
            </g>
            <g {...hoverProps('feedB')}>
              <rect x="8" y="28" width="48" height="14" style={{ fill: 'var(--surface)', stroke: 'var(--accent)', strokeWidth: 1 }}/>
              <text x="32" y="35" fontSize="8" textAnchor="middle" dominantBaseline="middle" style={nodeText}>FEED B</text>
            </g>
            <g {...hoverProps('handler')}>
              <rect x="90" y="14" width="56" height="22" style={{ fill: 'var(--surface)', stroke: 'var(--accent)', strokeWidth: 1 }}/>
              <text x="118" y="25" fontSize="8" textAnchor="middle" dominantBaseline="middle" style={nodeText}>FEED HANDLER</text>
            </g>
            <g {...hoverProps('queue1')}>
              <rect x="168" y="19" width="30" height="12" style={{ fill: 'transparent', stroke: 'var(--border)', strokeWidth: 1 }}/>
              <text x="183" y="25" fontSize="6" textAnchor="middle" dominantBaseline="middle" style={qText}>Q1</text>
            </g>
            <g {...hoverProps('book')}>
              <rect x="120" y="56" width="64" height="30" style={{ fill: 'var(--surface)', stroke: 'var(--accent)', strokeWidth: 1 }}/>
              <text x="152" y="71" fontSize="8" textAnchor="middle" dominantBaseline="middle" style={nodeText}>ORDER BOOK</text>
            </g>
            <g {...hoverProps('strategy')}>
              <rect x="206" y="56" width="64" height="30" style={{ fill: 'var(--accent-dim)', stroke: 'var(--accent)', strokeWidth: 1 }}/>
              <text x="238" y="71" fontSize="8" textAnchor="middle" dominantBaseline="middle" style={nodeText}>STRATEGY</text>
            </g>
            <g {...hoverProps('queue2')}>
              <rect x="206" y="94" width="30" height="12" style={{ fill: 'transparent', stroke: 'var(--border)', strokeWidth: 1 }}/>
              <text x="221" y="100" fontSize="6" textAnchor="middle" dominantBaseline="middle" style={qText}>Q2</text>
            </g>
            <g {...hoverProps('exchange')}>
              <rect x="178" y="120" width="92" height="30" style={{ fill: 'var(--surface)', stroke: 'var(--accent)', strokeWidth: 1 }}/>
              <text x="224" y="135" fontSize="8" textAnchor="middle" dominantBaseline="middle" style={nodeText}>SIM EXCHANGE</text>
            </g>
            <g {...hoverProps('queue3')}>
              <rect x="150" y="94" width="30" height="12" style={{ fill: 'transparent', stroke: 'var(--border)', strokeWidth: 1 }}/>
              <text x="165" y="100" fontSize="6" textAnchor="middle" dominantBaseline="middle" style={qText}>Q3</text>
            </g>

            {/* active glow ring */}
            <rect x={glow.x} y={glow.y} width={glow.w} height={glow.h} style={{ fill: 'none', stroke: 'var(--accent)', strokeWidth: 1.5, opacity: glow.opacity, pointerEvents: 'none' }}/>

            {/* order book bars */}
            {bookBars.map((b, i) => (
              <rect key={i} x={b.x} y={b.y} width={b.w} height="3" style={{ fill: b.color, pointerEvents: 'none' }}/>
            ))}

            {/* bid/ask markers */}
            <text x="200" y="68" fontSize="6" textAnchor="middle" style={{ fill: 'var(--accent)', opacity: frame.bidAskOpacity, fontFamily: MONO }}>BID</text>
            <text x="252" y="68" fontSize="6" textAnchor="middle" style={{ fill: 'var(--accent)', opacity: frame.bidAskOpacity, fontFamily: MONO }}>ASK</text>

            {/* feed dots */}
            <circle cx={frame.dotA.x} cy={frame.dotA.y} r="2.2" style={{ fill: 'var(--accent)', opacity: frame.dotA.opacity, pointerEvents: 'none' }}/>
            <text x={frame.dotA.x} y={frame.dotA.y} fontSize="7" textAnchor="middle" dominantBaseline="middle" style={{ fill: 'var(--red)', opacity: frame.dotA.xOpacity, pointerEvents: 'none' }}>×</text>
            <circle cx={frame.dotB.x} cy={frame.dotB.y} r="2.2" style={{ fill: 'var(--accent)', opacity: frame.dotB.opacity, pointerEvents: 'none' }}/>

            {/* traveling chip */}
            <g style={{ opacity: frame.chip.opacity, pointerEvents: 'none' }}>
              <rect x={frame.chip.x} y={frame.chip.y} width="26" height="9" style={{ fill: 'var(--surface2)', stroke: 'var(--accent)', strokeWidth: 0.8 }}/>
              <text x={frame.chip.textX} y={frame.chip.textY} fontSize="5" textAnchor="middle" dominantBaseline="middle" style={{ fill: 'var(--accent)', opacity: cLabel === 'EVENT' ? cOp : 0, fontFamily: MONO }}>EVENT</text>
              <text x={frame.chip.textX} y={frame.chip.textY} fontSize="5" textAnchor="middle" dominantBaseline="middle" style={{ fill: 'var(--accent)', opacity: cLabel === 'ORDER' ? cOp : 0, fontFamily: MONO }}>ORDER</text>
              <text x={frame.chip.textX} y={frame.chip.textY} fontSize="5" textAnchor="middle" dominantBaseline="middle" style={{ fill: 'var(--accent)', opacity: cLabel === 'FILL' ? cOp : 0, fontFamily: MONO }}>FILL</text>
            </g>

            {/* exchange status icons */}
            <text x="224" y="131" fontSize="7" textAnchor="middle" style={{ fill: 'var(--accent)', opacity: frame.exchangeCheck, pointerEvents: 'none' }}>✓</text>
            <text x="245" y="131" fontSize="6" textAnchor="middle" style={{ fill: 'var(--text-muted)', opacity: frame.exchangePause, pointerEvents: 'none' }}>⏱</text>
            <text x="224" y="142" fontSize="6" textAnchor="middle" style={{ fill: 'var(--accent)', opacity: cd === '3' ? 1 : 0, fontFamily: MONO, pointerEvents: 'none' }}>3</text>
            <text x="224" y="142" fontSize="6" textAnchor="middle" style={{ fill: 'var(--accent)', opacity: cd === '2' ? 1 : 0, fontFamily: MONO, pointerEvents: 'none' }}>2</text>
            <text x="224" y="142" fontSize="6" textAnchor="middle" style={{ fill: 'var(--accent)', opacity: cd === '1' ? 1 : 0, fontFamily: MONO, pointerEvents: 'none' }}>1</text>
            <text x="224" y="142" fontSize="6" textAnchor="middle" style={{ fill: 'var(--accent)', opacity: cd === 'FILL' ? 1 : 0, fontFamily: MONO, pointerEvents: 'none' }}>FILL</text>
            <rect x="178" y="120" width="92" height="30" style={{ fill: 'var(--accent)', opacity: frame.exchangeFlash, pointerEvents: 'none' }}/>
          </svg>

          {tooltipNode && (
            <div style={{
              position: 'absolute', zIndex: 4,
              left: `${Math.min(60, (tooltipNode.x / 300) * 100)}%`,
              top: `${((tooltipNode.y + tooltipNode.h) / 156) * 100}%`,
              maxWidth: '180px', padding: '6px 8px', background: 'var(--surface)', border: '1px solid var(--accent)',
              color: 'var(--text)', fontSize: '8px', lineHeight: 1.4, fontFamily: MONO, pointerEvents: 'none',
            }}>{tooltipNode.desc}</div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '1px', height: '16px', flexShrink: 0 }}>
            {stopwatch.map(s => (
              <div key={s.label} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: s.bg, borderRight: '1px solid var(--border)' }}>
                <span style={{ fontSize: '6px', color: s.color, letterSpacing: '0.05em' }}>{s.label}</span>
              </div>
            ))}
          </div>

          <div style={{ position: 'relative', height: '22px', flexShrink: 0, background: 'var(--surface)', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
            <span style={{ fontSize: '8px', color: 'var(--accent)', transition: 'opacity 0.25s ease', opacity: captionFade ? 0 : 1 }}>{caption}</span>
            <span style={{ marginLeft: 'auto', fontSize: '7px', color: 'var(--text-muted)' }}>POS: {posText} &nbsp; PnL: {pnlText}</span>
          </div>

          <button
            onClick={() => setPaused(p => !p)}
            onMouseEnter={() => setPauseHover(true)}
            onMouseLeave={() => setPauseHover(false)}
            style={{
              position: 'absolute', bottom: '24px', right: '4px', zIndex: 5, background: 'var(--surface)',
              border: `1px solid ${pauseHover ? 'var(--accent)' : 'var(--border)'}`, color: 'var(--accent)',
              fontSize: '9px', padding: '2px 5px', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: MONO,
            }}
          >
            <span>{paused ? '▶' : '⏸'}</span>
            <span style={{
              width: pauseHover ? '34px' : 0, overflow: 'hidden', opacity: pauseHover ? 1 : 0,
              transition: 'all 0.15s ease', whiteSpace: 'nowrap', fontSize: '7px',
            }}>{paused ? 'PLAY' : 'PAUSE'}</span>
          </button>
        </div>

        {/* RIGHT PANE */}
        <div style={{ background: 'var(--surface)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '18px', fontFamily: MONO, color: 'var(--text)', minWidth: 0 }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--text)' }}>{name}</h3>
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 7px', border: '1px solid var(--accent)' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--accent)', transform: 'rotate(45deg)', flexShrink: 0 }}/>
              <span style={{ fontSize: '8px', color: 'var(--accent)', letterSpacing: '0.08em' }}>SYS QUEST</span>
            </div>
          </div>

          <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>{description}</p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {metrics.map(m => (
              <div key={m.label} style={{ flex: 1, minWidth: '90px', background: 'var(--surface2)', border: '1px solid var(--border)', padding: '8px 10px' }}>
                <div style={{ fontSize: '8px', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '4px' }}>{m.label}</div>
                <div style={{ fontSize: '11px', color: 'var(--accent)' }}>{m.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {tags.map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 8px', border: '1px solid var(--border)', borderRadius: '2px' }}>
                <div style={{ width: '4px', height: '4px', background: 'var(--accent)', flexShrink: 0 }}/>
                <span style={{ fontSize: '10.5px', color: 'var(--text)' }}>{t}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '9px', color: 'var(--accent)', letterSpacing: '0.12em' }}>BENCHMARKS</div>
            {highlights.map((h, i) => (
              <div key={i} style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', gap: '6px' }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0 }}>•</span>
                <span>{h.pre}<span style={{ color: 'var(--accent)' }}>{h.bracket}</span>{h.post}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontStyle: 'italic' }}>Simulation only: no real exchange, no real money.</div>

          <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', flexWrap: 'wrap' }}>
            <CardLink
              href={github}
              base={{ padding: '9px 16px', border: '1px solid var(--accent)', color: 'var(--accent)', fontSize: '11px', letterSpacing: '0.04em', transition: 'box-shadow 0.2s ease' }}
              hover={{ boxShadow: '0 0 20px var(--accent-glow)' }}
            >VIEW QUEST →</CardLink>
            <CardLink
              href={readme}
              base={{ padding: '9px 16px', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.04em' }}
              hover={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >README →</CardLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TickForgeCard;

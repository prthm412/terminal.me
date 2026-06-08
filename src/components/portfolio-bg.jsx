import React, { useEffect, useRef } from 'react';

const Background = ({ accent, reduceMotion }) => {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const stRef     = useRef({
    particles: null,
    mouse: { x: -9999, y: -9999 },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const st  = stRef.current;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      if (!st.particles) {
        st.particles = Array.from({ length: 55 }, () => {
          const ox = Math.random() * canvas.width;
          const oy = Math.random() * canvas.height;
          return {
            ox, oy, x: ox, y: oy,
            vx: (Math.random() - 0.5) * 0.38,
            vy: (Math.random() - 0.5) * 0.38,
            r:  Math.random() * 1.2 + 0.6,
            pox: 0, poy: 0, pvx: 0, pvy: 0,
          };
        });
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove  = (e) => { st.mouse.x = e.clientX; st.mouse.y = e.clientY; };
    const onClick = (e) => {
      const mx = e.clientX, my = e.clientY;
      st.particles.forEach(p => {
        const dx = p.ox - mx, dy = p.oy - my;
        const d  = Math.hypot(dx, dy);
        if (d < 240 && d > 1) {
          const f = (1 - d / 240) * 10;
          p.pvx += (dx / d) * f;
          p.pvy += (dy / d) * f;
        }
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick);

    const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';
    const bgFill = () => isDark() ? '#0a0a0a' : '#eeece7';

    const drawGrid = () => {
      const W = canvas.width, H = canvas.height;
      const vpX = W * 0.5, vpY = H * 0.46;
      const dk  = isDark();
      ctx.strokeStyle = dk ? accent : '#1a1a2e';
      ctx.lineWidth   = dk ? 0.6 : 0.7;

      for (let i = 0; i <= 20; i++) {
        const x  = (i / 20) * W;
        const da = Math.abs(i / 20 - 0.5);
        ctx.globalAlpha = dk
          ? Math.max(0.06, 0.20 - da * 0.09)
          : Math.max(0.04, 0.17 - da * 0.08);
        ctx.beginPath();
        ctx.moveTo(vpX, vpY);
        ctx.lineTo(x, H);
        ctx.stroke();
      }

      for (let i = 1; i <= 11; i++) {
        const t  = i / 11;
        const y  = vpY + (H - vpY) * Math.pow(t, 1.7);
        const sf = (y - vpY) / (H - vpY);
        ctx.globalAlpha = dk
          ? 0.20 * (1 - t * 0.45)
          : 0.17 * (1 - t * 0.45);
        ctx.beginPath();
        ctx.moveTo(vpX - sf * vpX, y);
        ctx.lineTo(vpX + sf * (W - vpX), y);
        ctx.stroke();
      }
    };

    const drawParticles = () => {
      const W  = canvas.width, H  = canvas.height;
      const LINK     = 130;
      const ATT_R    = 120;
      const MAX_PULL = 18;
      const SPRING   = 0.045;
      const DAMP     = 0.80;
      const mx = st.mouse.x, my = st.mouse.y;
      const dk = isDark();
      const pc = dk ? accent : '#1a1a2e';

      if (!reduceMotion) {
        st.particles.forEach(p => {
          p.ox += p.vx; p.oy += p.vy;
          if (p.ox < -20) p.ox = W + 20;
          if (p.ox > W + 20) p.ox = -20;
          if (p.oy < -20) p.oy = H + 20;
          if (p.oy > H + 20) p.oy = -20;

          p.pvx += -p.pox * SPRING;
          p.pvy += -p.poy * SPRING;
          p.pvx *= DAMP; p.pvy *= DAMP;
          p.pox += p.pvx; p.poy += p.pvy;

          const dx = mx - p.ox, dy = my - p.oy;
          const d  = Math.hypot(dx, dy);
          let ax = 0, ay = 0;
          if (d < ATT_R && d > 1) {
            const factor = Math.pow(1 - d / ATT_R, 2);
            ax = (dx / d) * factor * MAX_PULL;
            ay = (dy / d) * factor * MAX_PULL;
          }

          p.x = p.ox + ax + p.pox;
          p.y = p.oy + ay + p.poy;
        });
      } else {
        st.particles.forEach(p => { p.x = p.ox; p.y = p.oy; });
      }

      ctx.strokeStyle = pc;
      ctx.lineWidth   = 0.55;
      for (let i = 0; i < st.particles.length; i++) {
        for (let j = i + 1; j < st.particles.length; j++) {
          const a = st.particles[i], b = st.particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            const nearA = Math.hypot(mx - a.ox, my - a.oy) < ATT_R;
            const nearB = Math.hypot(mx - b.ox, my - b.oy) < ATT_R;
            const boost = (nearA || nearB) ? 0.18 : 0;
            ctx.globalAlpha = (dk ? 0.27 + boost : 0.21 + boost) * (1 - d / LINK);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = pc;
      st.particles.forEach(p => {
        const near = Math.hypot(mx - p.ox, my - p.oy) < ATT_R;
        ctx.globalAlpha = dk
          ? (near ? 0.55 : 0.28)
          : (near ? 0.42 : 0.22);
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? p.r + 0.5 : p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const tick = () => {
      ctx.globalAlpha = 1;
      ctx.fillStyle   = bgFill();
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      drawParticles();
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(animRef.current);
    };
  }, [accent, reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none', display: 'block',
      }}
    />
  );
};

export default Background;

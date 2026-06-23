import { useRef, useEffect } from 'react';

// Celestial Field — replaces PCB canvas.
// Renders a slow-drifting gold + silver star constellation with:
//   • ~120 particles at varying brightness & size
//   • Faint constellation lines between close neighbours
//   • Gentle parallax on mouse move
//   • Twinkling (opacity pulse) on a random subset

export function CelestialCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    const GOLD   = '#C9963A';
    const SILVER = '#9CA3AF';
    const PARTICLE_COUNT = 120;
    const CONNECT_DIST   = 110;
    const TWINKLE_RATIO  = 0.25; // fraction that twinkle

    let raf;
    let width, height, dpr;

    const resize = () => {
      dpr    = window.devicePixelRatio || 1;
      width  = window.innerWidth;
      height = document.documentElement.scrollHeight || window.innerHeight;
      canvas.width  = width  * dpr;
      canvas.height = height * dpr;
      canvas.style.width  = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();

    // ── Particle factory ──
    const makeParticle = () => {
      const isGold = Math.random() < 0.4;
      const twinkles = Math.random() < TWINKLE_RATIO;
      return {
        x:        Math.random() * width,
        y:        Math.random() * height,
        r:        0.8 + Math.random() * 2.0,
        speedX:   (Math.random() - 0.5) * 0.06,
        speedY:   (Math.random() - 0.5) * 0.06,
        parallax: 0.05 + Math.random() * 0.15,
        color:    isGold ? GOLD : SILVER,
        // base opacity — gold brighter, silver subtler
        baseOpacity: isGold
          ? 0.25 + Math.random() * 0.50
          : 0.15 + Math.random() * 0.35,
        opacity: 0,
        // Twinkling
        twinkles,
        twinklePeriod: twinkles ? 2000 + Math.random() * 4000 : 0,
        twinklePhase:  Math.random() * Math.PI * 2,
      };
    };

    let particles = Array.from({ length: PARTICLE_COUNT }, makeParticle);

    // Mouse parallax state
    let mouseX = width  / 2;
    let mouseY = height / 2;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY + window.scrollY;
    };

    window.addEventListener('resize',    resize,      { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let lastTime = 0;

    const draw = (timestamp) => {
      const dt = Math.min(timestamp - lastTime, 50); // cap at 50ms
      lastTime = timestamp;

      ctx.clearRect(0, 0, width, height);

      const scrollY = window.scrollY;

      // ── Update + draw particles ──
      particles.forEach(p => {
        // Drift
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.x < -4) p.x = width + 4;
        if (p.x > width  + 4) p.x = -4;
        if (p.y < -4) p.y = height + 4;
        if (p.y > height + 4) p.y = -4;

        // Parallax offset against mouse centre
        const mx = (mouseX - width  / 2) * p.parallax * 0.012;
        const my = (mouseY - scrollY - height / 2) * p.parallax * 0.012;

        const rx = p.x + mx;
        const ry = p.y - scrollY + my;

        // Twinkle
        if (p.twinkles) {
          const t = (timestamp / p.twinklePeriod + p.twinklePhase) % (Math.PI * 2);
          p.opacity = p.baseOpacity * (0.5 + 0.5 * Math.sin(t));
        } else {
          p.opacity = p.baseOpacity;
        }

        // Draw star dot
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(rx, ry, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Soft glow on gold stars
        if (p.color === GOLD && p.r > 1.5) {
          const grd = ctx.createRadialGradient(rx, ry, 0, rx, ry, p.r * 4);
          grd.addColorStop(0, 'rgba(201,150,58,0.25)');
          grd.addColorStop(1, 'rgba(201,150,58,0)');
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(rx, ry, p.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      // ── Constellation lines between nearby particles ──
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const ax = a.x + (mouseX - width  / 2) * a.parallax * 0.012;
        const ay = a.y - scrollY + (mouseY - scrollY - height / 2) * a.parallax * 0.012;

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const bx = b.x + (mouseX - width  / 2) * b.parallax * 0.012;
          const by = b.y - scrollY + (mouseY - scrollY - height / 2) * b.parallax * 0.012;

          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.045;
            ctx.globalAlpha  = alpha;
            ctx.strokeStyle  = GOLD;
            ctx.lineWidth    = 0.5;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize',    resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
}

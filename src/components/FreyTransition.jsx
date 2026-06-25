import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { GOLD, GOLD_BRIGHT, GOLD_GLOW } from '../data';
import { BinaryRain } from './BinaryRain';

/* ── Gold spark particles that fire during power-up ── */
function Spark({ delay, x, y }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none z-10"
      style={{
        width: 3,
        height: 3,
        left: `${50 + x}%`,
        top: `${50 + y}%`,
        backgroundColor: GOLD_BRIGHT,
        boxShadow: `0 0 8px ${GOLD_BRIGHT}`
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale:   [0, 2, 1, 0],
        x: [0, x * 6, x * 10],
        y: [0, y * 6, y * 10],
      }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        repeatDelay: 1 + Math.random() * 2,
      }}
    />
  );
}

export function FreyTransition() {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const [isPowered, setIsPowered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  // Camera scale — dolly in/hold/out
  const cameraScale = useTransform(smoothProgress,
    [0,   0.15, 0.35, 0.6,  0.8,  1],
    [1,   1,    1.6,  1.6,  1,    0.8]
  );

  // Power-up intensity
  const glowIntensity = useTransform(smoothProgress,
    [0, 0.3, 0.42, 0.55, 0.65, 0.8],
    [0, 0,   1,    1,    1,    0]
  );

  // FREY text colour: stone dim → gold bright
  const textColor = useTransform(glowIntensity, (g) =>
    g > 0.5 ? '#ffffff' : 'rgba(232,161,32,0.05)'
  );

  // Gold text glow pulse
  const textShadow = useTransform(glowIntensity, (g) =>
    g > 0
      ? `0 0 ${g * 50}px ${GOLD}, 0 0 ${g * 100}px ${GOLD}80, 0 0 ${g * 180}px ${GOLD}40`
      : 'none'
  );

  // Subtitle (tagline) appears during hold phase
  const subtitleOpacity = useTransform(smoothProgress,
    [0, 0.4, 0.48, 0.6, 0.72],
    [0, 0,   1,    1,   0]
  );

  // Gold horizontal power line
  const powerLineWidth = useTransform(glowIntensity, [0, 0.5, 1], ['0%', '25%', '65%']);

  // Overall section fade
  const sectionOpacity = useTransform(smoothProgress,
    [0, 0.05, 0.85, 1],
    [0, 1,    1,    0]
  );

  // Binary Rain Opacity
  const binaryRainOpacity = useTransform(glowIntensity, [0, 1], [0.01, 0.15]);

  // Track powered state for sparks
  useEffect(() => {
    const unsub = smoothProgress.on('change', (v) => {
      setIsPowered(v > 0.38 && v < 0.72);
    });
    return unsub;
  }, [smoothProgress]);

  // Canvas — gold constellation traces converging to center
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const cx = w / 2;
    const cy = h / 2;

    // Generate PCB-style converging traces in gold
    const generateTraces = () => {
      const traces = [];
      const vias   = [];
      const grid   = 20;
      const numBuses = 18;

      for (let b = 0; b < numBuses; b++) {
        const angle  = (b / numBuses) * Math.PI * 2 + Math.random() * 0.2;
        const startR = Math.max(w, h) * 0.8;
        const sx = Math.round((cx + Math.cos(angle) * startR) / grid) * grid;
        const sy = Math.round((cy + Math.sin(angle) * startR) / grid) * grid;

        const numLines = 1 + Math.floor(Math.random() * 3);
        const spacing  = 8;
        let px = sx, py = sy;
        const master = [{ x: px, y: py }];

        while (Math.hypot(cx - px, cy - py) > 100) {
          const dx = cx - px;
          const dy = cy - py;
          const step  = (2 + Math.floor(Math.random() * 5)) * grid;
          const mType = Math.floor(Math.random() * 3);
          let nx = px, ny = py;

          if      (mType === 0 && Math.abs(dx) > grid) { nx += Math.sign(dx) * step; }
          else if (mType === 1 && Math.abs(dy) > grid) { ny += Math.sign(dy) * step; }
          else {
            const diag = Math.min(Math.abs(dx), Math.abs(dy), step);
            nx += Math.sign(dx) * diag;
            ny += Math.sign(dy) * diag;
          }
          px = nx; py = ny;
          master.push({ x: px, y: py });
          if (master.length > 25) break;
        }
        master.push({ x: cx, y: cy });

        const dx0   = master[1].x - master[0].x;
        const dy0   = master[1].y - master[0].y;
        const len0  = Math.hypot(dx0, dy0) || 1;
        const normX = -dy0 / len0;
        const normY =  dx0 / len0;

        for (let l = 0; l < numLines; l++) {
          const off  = (l - (numLines - 1) / 2) * spacing;
          const path = master.map(p => ({ x: p.x + normX * off, y: p.y + normY * off }));
          traces.push(path);
          if (Math.random() > 0.3) vias.push(path[0]);
        }
      }
      return { traces, vias };
    };

    const pcbData = generateTraces();

    let pendingFrame = null;

    const draw = () => {
      const progress = smoothProgress.get();
      ctx.clearRect(0, 0, w, h);

      const traceProgress = Math.min(1, progress / 0.35);
      const powered       = progress > 0.38 && progress < 0.72;

      ctx.lineCap  = 'round';
      ctx.lineJoin = 'round';

      pcbData.traces.forEach((path) => {
        const drawLen = Math.floor(path.length * traceProgress);
        if (drawLen < 2) return;

        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let j = 1; j < drawLen; j++) ctx.lineTo(path[j].x, path[j].y);

        if (powered) {
          // Gold outer glow
          ctx.strokeStyle  = GOLD;
          ctx.lineWidth    = 5;
          ctx.globalAlpha  = 0.25;
          ctx.stroke();
          // Gold core
          ctx.strokeStyle  = GOLD_BRIGHT;
          ctx.lineWidth    = 2;
          ctx.globalAlpha  = 0.8;
          ctx.stroke();
        } else {
          ctx.strokeStyle  = `rgba(232,161,32,${0.05 + traceProgress * 0.15})`;
          ctx.lineWidth    = 1.5;
          ctx.globalAlpha  = 1.0;
          ctx.stroke();
        }
      });

      if (traceProgress > 0.1) {
        pcbData.vias.forEach(v => {
          ctx.globalAlpha = powered ? 0.9 : (0.1 + traceProgress * 0.15);
          ctx.fillStyle   = powered ? GOLD_BRIGHT : 'rgba(232,161,32,0.4)';
          ctx.beginPath();
          ctx.arc(v.x, v.y, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#0a0a0a';
          ctx.beginPath();
          ctx.arc(v.x, v.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      ctx.globalAlpha = 1.0;

      if (powered) {
        const gSize = 150;
        const grd   = ctx.createRadialGradient(cx, cy, 0, cx, cy, gSize);
        grd.addColorStop(0, `${GOLD}30`);
        grd.addColorStop(0.5, `${GOLD}10`);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(cx - gSize, cy - gSize, gSize * 2, gSize * 2);
      }
    };

    const requestDraw = () => {
      if (!pendingFrame) {
        pendingFrame = requestAnimationFrame(() => {
          draw();
          pendingFrame = null;
        });
      }
    };

    const unsub = smoothProgress.on('change', requestDraw);
    requestDraw();
    window.addEventListener('resize', resize);

    return () => {
      unsub();
      if (pendingFrame) cancelAnimationFrame(pendingFrame);
      window.removeEventListener('resize', resize);
    };
  }, [smoothProgress]);

  // Pre-generate spark positions
  const sparks = Array.from({ length: 15 }, () => ({
    x: (Math.random() - 0.5) * 40,
    y: (Math.random() - 0.5) * 25,
    delay: Math.random() * 1.5,
  }));

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0a0a0a]"
      style={{ height: '300vh' }}
    >
      <motion.div
        className="sticky top-0 w-full h-screen overflow-hidden"
        style={{ opacity: sectionOpacity }}
      >
        {/* Background Grain */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.05,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />

        {/* Dynamic Binary Rain Background */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
          style={{ opacity: binaryRainOpacity }}
        >
          <BinaryRain opacity={1} speed={1.2} density={1.5} color={GOLD} active={true} />
        </motion.div>

        {/* Camera rig */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ scale: cameraScale }}
        >
          {/* Gold trace canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {/* Central content */}
          <div className="relative z-10 flex flex-col items-center justify-center px-12 py-16">
            {/* Darkness mask behind text */}
            <div
              className="absolute inset-0 pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(circle, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.85) 50%, rgba(10,10,10,0) 75%)',
                transform: 'scale(1.4)',
                filter: 'blur(12px)',
              }}
            />

            {/* FREY wordmark */}
            <motion.h2
              style={{
                fontFamily: "'Anton', sans-serif",
                color: textColor,
                textShadow: textShadow,
                letterSpacing: '0.18em',
              }}
              className="text-7xl sm:text-8xl md:text-[10rem] lg:text-[13rem] uppercase select-none pointer-events-none leading-none z-20 relative"
            >
              FREY
            </motion.h2>

            {/* Tagline — shown during powered hold */}
            <motion.p
              style={{
                opacity: subtitleOpacity,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: '#ffffff',
                textShadow: `0 0 10px ${GOLD}`,
                letterSpacing: '0.2em',
                fontStyle: 'italic',
              }}
              className="text-sm sm:text-base md:text-xl mt-3 sm:mt-5 font-light z-20 relative"
            >
              Build with Frey.
            </motion.p>

            {/* Gold power line */}
            <motion.div
              className="mt-6 h-[2px] rounded-full z-20 relative"
              style={{
                background: `linear-gradient(90deg, transparent, ${GOLD_BRIGHT}, transparent)`,
                width: powerLineWidth,
                opacity: glowIntensity,
                boxShadow: useTransform(glowIntensity, (g) =>
                  `0 0 ${g * 30}px ${GOLD}`
                ),
              }}
            />

            {/* Sparks */}
            {isPowered &&
              sparks.map((s, i) => (
                <Spark key={i} delay={s.delay} x={s.x} y={s.y} />
              ))}
          </div>
        </motion.div>

        {/* Gold scan line — stays in screen-space */}
        <motion.div
          className="absolute left-0 w-full h-[2px] pointer-events-none z-30 mix-blend-screen"
          style={{
            top: useTransform(smoothProgress, [0.38, 0.55], ['30%', '70%']),
            opacity: useTransform(glowIntensity, [0, 0.5, 1], [0, 0.8, 0]),
            background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            boxShadow: `0 0 20px ${GOLD_BRIGHT}`,
          }}
        />
      </motion.div>
    </section>
  );
}

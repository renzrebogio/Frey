import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

const GOLD        = '#C9963A';
const GOLD_BRIGHT = '#E8B84B';
const GOLD_GLOW   = '#F5D27A';

/* ── Animated Counter ── */
function AnimatedCounter({ value, inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) { setCount(0); return; }
    const end = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(end)) return;
    const duration = 2000;
    const start    = performance.now();
    const tick = (now) => {
      const t    = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      setCount(end * ease);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  const suffix  = value.replace(/[0-9.]/g, '');
  const display = count < 10 && count % 1 !== 0 ? count.toFixed(1) : Math.floor(count);
  return <>{display}{suffix}</>;
}

/* ── Capability Card ── */
function CapabilityCard({ icon, id, label, title, desc, index, containerRef }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  const isEven      = index % 2 === 0;
  const xOffset     = isEven ? -80 : 80;
  const rotateOffset = isEven ? -6 : 6;

  const opacity  = useTransform(scrollYProgress, [0, 0.4, 0.7], [0, 0.3, 1]);
  const x        = useTransform(scrollYProgress, [0, 0.5, 0.8], [xOffset, xOffset * 0.3, 0]);
  const y        = useTransform(scrollYProgress, [0, 0.5, 0.8], [60, 20, 0]);
  const rotate   = useTransform(scrollYProgress, [0, 0.6, 0.9], [rotateOffset, rotateOffset * 0.2, 0]);
  const scale    = useTransform(scrollYProgress, [0, 0.5, 0.8], [0.92, 0.96, 1]);
  const blur     = useTransform(scrollYProgress, [0, 0.4, 0.7], [3, 1, 0]);
  const borderGlow = useTransform(scrollYProgress, [0.6, 0.9], [0, 0.6]);
  const filterStyle = useTransform(blur, v => `blur(${v}px)`);

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        x,
        y,
        rotate,
        scale,
        filter: filterStyle,
        willChange: 'transform, opacity, filter',
      }}
      className="relative bg-[#0C0C10]/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 group text-left overflow-hidden shadow-2xl gold-border-card"
    >
      {/* Gold border glow on scroll-in */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          opacity: borderGlow,
          boxShadow: `inset 0 0 30px rgba(201,150,58,0.08), 0 0 20px rgba(201,150,58,0.06)`,
          borderRadius: 'inherit',
        }}
      />

      <div className="flex justify-between items-start mb-12 relative z-10">
        {/* Gold icon container */}
        <div
          style={{
            color: GOLD_BRIGHT,
            backgroundColor: 'rgba(201,150,58,0.1)',
            border: '1px solid rgba(201,150,58,0.2)',
          }}
          className="p-4 rounded-2xl transition-all duration-300 group-hover:bg-[rgba(201,150,58,0.16)]"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            {icon}
          </svg>
        </div>
        <span
          style={{ color: 'rgba(201,150,58,0.4)', fontFamily: "'Inter', sans-serif" }}
          className="font-mono text-xs tracking-widest group-hover:text-[#C9963A] transition-all duration-300"
        >
          {id} / {label}
        </span>
      </div>

      <h3
        className="text-2xl font-bold tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10"
        style={{ color: '#F8F8F6' }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed text-left relative z-10"
        style={{ color: 'rgba(156,163,175,0.8)' }}
      >
        {desc}
      </p>
    </motion.div>
  );
}

/* ── Floating Gold Particles ── */
function FloatingParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let raf;
    let width  = window.innerWidth;
    let height = canvas.parentElement.offsetHeight;

    const handleResize = () => {
      width  = window.innerWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width  = width  * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    handleResize();

    const particles = Array.from({ length: 40 }, () => ({
      x:       Math.random() * width,
      y:       Math.random() * height,
      size:    2 + Math.random() * 5,
      speedX:  (Math.random() - 0.5) * 0.25,
      speedY:  (Math.random() - 0.5) * 0.25,
      parallax: 0.2 + Math.random() * 1,
      opacity: 0.03 + Math.random() * 0.07,
      isGold:  Math.random() < 0.4,
      type:    Math.floor(Math.random() * 3),
      angle:   Math.random() * Math.PI * 2,
    }));

    let mouseX = -1000, mouseY = -1000;
    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('resize',    handleResize);
    window.addEventListener('mousemove', onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const scrollY = window.scrollY;

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < -20)        p.x = width  + 20;
        if (p.x > width + 20)  p.x = -20;
        if (p.y < -20)        p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const ry = p.y - scrollY * p.parallax * 0.3;
        const dx = mouseX - p.x;
        const dy = mouseY - ry;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.x -= (dx / dist) * 1.2;
          p.y -= (dy / dist) * 1.2;
        }

        const color = p.isGold ? GOLD : '#9CA3AF';
        ctx.save();
        ctx.translate(p.x, ry);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle   = color;
        ctx.strokeStyle = color;
        ctx.lineWidth   = 0.8;

        if (p.type === 0) {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 1) {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize',    handleResize);
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}

/* ── Main Section ── */
export function Capabilities() {
  const containerRef = useRef(null);
  const headerRef    = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ['start end', 'center center'],
  });

  const headerOpacity = useTransform(headerScroll, [0, 0.4, 0.7], [0, 0.5, 1]);
  const headerY       = useTransform(headerScroll, [0, 0.5, 0.8], [100, 30, 0]);
  const headerScale   = useTransform(headerScroll, [0, 0.6, 0.9], [0.95, 0.98, 1]);

  const statsRef    = useRef(null);
  const statsInView = useInView(statsRef, { margin: '-100px' });

  const { scrollYProgress: statsScroll } = useScroll({
    target: statsRef,
    offset: ['start end', 'center center'],
  });

  const statsOpacity = useTransform(statsScroll, [0, 0.4, 0.7], [0, 0.4, 1]);
  const statsY       = useTransform(statsScroll, [0, 0.5, 0.8], [80, 20, 0]);
  const statsScale   = useTransform(statsScroll, [0, 0.5, 0.8], [0.9, 0.96, 1]);

  // Stats power-on glow
  const statsGlow = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  const CARDS = [
    {
      id: '01', label: 'DISCOVERY',
      title: 'Front-End Layout Engineering',
      desc: 'We build interactive, lightning-fast UI systems. Our frontend architecture establishes solid typographic scales, fluid layout patterns, and robust state-driven React flows.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.303.197-1.591 1.591M21.75 12h-2.25m-.197 5.303-1.591-1.591M12 21.75V19.5m-5.303-.197 1.591-1.591M2.25 12h2.25m-.197-5.303 1.591 1.591" />,
    },
    {
      id: '02', label: 'EMBEDDED & IOT',
      title: 'IoT Systems & Embedded Hardware',
      desc: 'We engineer specialized microcontroller nodes, sensors, and embedded systems interfaces. From real-time telemetry streaming to firmware integration, we build robust physical computing layers.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />,
    },
    {
      id: '03', label: 'RESEARCH & OPS',
      title: 'Quantitative UX Research & Planning',
      desc: 'Every digital asset needs rigorous validation. We map user testing parameters, optimize friction points, and manage operational planning documentation to satisfy rigorous product specs.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v12m0 0H9m3 0h3m-3-12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
    },
    {
      id: '04', label: 'WEBSITES',
      title: 'Interactive Websites & Web Apps',
      desc: 'We design and develop high-speed, interactive web platforms using modern web technologies. Our websites feature responsive visual hierarchy, fluid page motion, and optimized performance.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />,
    },
  ];

  const statsBoxShadow = useTransform(statsGlow, (v) =>
    `0 0 ${v * 50}px rgba(201,150,58,${(v * 0.15).toFixed(2)})`
  );
  const statsBorderColor = useTransform(statsGlow, (v) => {
    const a = Math.round(v * 100).toString(16).padStart(2, '0');
    return v > 0.05 ? `rgba(201,150,58,${(v * 0.35).toFixed(2)})` : 'rgba(255,255,255,0.06)';
  });

  return (
    <section
      ref={containerRef}
      id="discover"
      className="relative w-full bg-transparent text-white py-24 sm:py-32 select-text overflow-hidden"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundImage: `radial-gradient(circle at 80% 20%, rgba(201,150,58,0.04), transparent 40%), radial-gradient(circle at 10% 80%, rgba(146,113,42,0.03), transparent 50%)`,
      }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.04,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Ambient gold blobs */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full opacity-[0.015] blur-3xl pointer-events-none"
        style={{ backgroundColor: GOLD }} />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full opacity-[0.01] blur-3xl pointer-events-none"
        style={{ backgroundColor: GOLD_BRIGHT }} />

      <FloatingParticles />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-20">

        {/* Header */}
        <motion.div
          ref={headerRef}
          style={{
            opacity: headerOpacity,
            y: headerY,
            scale: headerScale,
            willChange: 'transform, opacity',
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-20 bg-[#09090B]/60 backdrop-blur-sm p-6 sm:p-12 rounded-3xl"
          style2={{ border: '1px solid rgba(201,150,58,0.08)' }}
        >
          <div className="lg:col-span-5">
            <span
              style={{ color: GOLD, fontFamily: "'Inter', sans-serif" }}
              className="text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase block mb-4"
            >
              FREY SOFTWARE SERVICES
            </span>
            <h2
              style={{ fontFamily: "'Anton', sans-serif" }}
              className="text-white text-5xl sm:text-7xl lg:text-8xl leading-none uppercase"
            >
              WHAT WE DO
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-8">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: 'rgba(209,213,219,0.8)',
                fontSize: 'clamp(18px, 2.5vw, 22px)',
                lineHeight: 1.65,
              }}
              className="font-light italic mb-6"
            >
              We are a group of computer engineering classmates united by the same vision of producing innovative, high-performance software solutions — specializing in IoT systems, embedded hardware, and modern, pixel-perfect interactive websites.
            </p>
            <div
              style={{ background: `linear-gradient(90deg, ${GOLD}, ${GOLD_BRIGHT})` }}
              className="w-20 h-[1px]"
            />
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24">
          {CARDS.map((card, i) => (
            <CapabilityCard
              key={card.id}
              {...card}
              index={i}
              containerRef={containerRef}
            />
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          ref={statsRef}
          className="backdrop-blur-md py-12 px-6 rounded-2xl grid grid-cols-2 lg:grid-cols-4 gap-8 relative shadow-2xl"
          style={{
            opacity: statsOpacity,
            y: statsY,
            scale: statsScale,
            willChange: 'transform, opacity',
            boxShadow: statsBoxShadow,
            borderColor: statsBorderColor,
            border: '1px solid',
            backgroundColor: 'rgba(12,12,16,0.8)',
          }}
        >
          {[
            { label: 'SYSTEMS DEPLOYED',    val: '240+' },
            { label: 'DAILY COMPILATIONS',  val: '1.2K' },
            { label: 'LINES OF CODE',       val: '18M+' },
            { label: 'COMPLEX BUILDS',      val: '40+'  },
          ].map((stat, i) => (
            <div key={i} className="text-center lg:text-left relative z-10">
              <span
                style={{ color: 'rgba(107,114,128,0.6)', fontFamily: "'Inter', sans-serif" }}
                className="block font-mono text-xs tracking-wider mb-2"
              >
                {stat.label}
              </span>
              <span
                style={{
                  fontFamily: "'Anton', sans-serif",
                  color: GOLD_GLOW,
                  letterSpacing: '0.04em',
                }}
                className="text-4xl sm:text-5xl font-black block"
              >
                <AnimatedCounter value={stat.val} inView={statsInView} />
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { GOLD, GOLD_BRIGHT } from "../data";

/* ── Animated Counter ── */
function AnimatedCounter({ value, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }
    const end = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(end)) return;
    const duration = 2000;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      setCount(end * ease);
      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  const suffix = value.replace(/[0-9.]/g, "");
  const display =
    count < 10 && count % 1 !== 0 ? count.toFixed(1) : Math.floor(count);

  return (
    <>
      {display}
      {suffix}
    </>
  );
}

/* ── Capability Card ── */
function CapabilityCard({ icon, label, title, desc, index, inView }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const cardSpawnVariants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      y: 80,
      clipPath: "inset(100% 0% 0% 0%)",
      filter: "blur(12px) brightness(2)",
    },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      filter: "blur(0px) brightness(1)",
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
        delay: i * 0.18,
      },
    }),
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardSpawnVariants}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition:
          "transform 250ms cubic-bezier(0.215, 0.610, 0.355, 1), border-color 300ms ease, box-shadow 300ms ease",
      }}
      className="relative bg-[#0b0b0b]/95 backdrop-blur-md rounded-xl p-8 sm:p-10 group text-left overflow-hidden border border-[rgba(232,161,32,0.03)] hover:border-[rgba(232,161,32,0.3)] hover:shadow-[0_0_40px_rgba(232,161,32,0.07)]"
    >
      <div
        className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full mix-blend-screen"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(232,161,32,0.08) 0%, transparent 65%)",
          left: `${coords.x - 200}px`,
          top: `${coords.y - 200}px`,
        }}
      />

      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-transparent group-hover:border-[#e8a120]/40 transition-colors duration-300 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-transparent group-hover:border-[#e8a120]/40 transition-colors duration-300 pointer-events-none" />

      <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#e8a120]/70 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

      <div
        style={{ transform: "translateZ(40px)" }}
        className="flex justify-between items-start mb-10 relative z-10 transition-transform duration-300"
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{
            type: "spring",
            stiffness: 120,
            delay: 0.4 + index * 0.18,
          }}
          className="p-3.5 rounded-xl bg-[rgba(232,161,32,0.04)] border border-[rgba(232,161,32,0.15)] text-[#e8b84b] group-hover:text-white group-hover:bg-[rgba(232,161,32,0.25)] group-hover:border-[#e8a120] group-hover:scale-110 transition-all duration-300"
        >
          <svg
            className="w-6 h-6 transform group-hover:rotate-[-8deg] transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            {icon}
          </svg>
        </motion.div>

        <span className="font-mono-code text-[#e8a120]/50 group-hover:text-[#e8a120] text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300">
          // {label}
        </span>
      </div>

      <h3
        style={{ transform: "translateZ(25px)" }}
        className="font-sans font-bold text-xl sm:text-2xl tracking-tight mb-4 text-[#F8F8F6] group-hover:text-white transition-colors duration-300"
      >
        {title}
      </h3>

      <p
        style={{ transform: "translateZ(15px)" }}
        className="font-sans text-sm leading-relaxed text-[#8E939E] group-hover:text-[#D1D5DB] transition-colors duration-300"
      >
        {desc}
      </p>
    </motion.div>
  );
}

/* ── Main Section ── */
export function Capabilities() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-120px" });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 25;
      const y = (e.clientY / window.innerHeight - 0.5) * 25;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  const CARDS = [
    {
      label: "DISCOVERY",
      title: "Front-End Layout Engineering",
      desc: "We build interactive, lightning-fast UI systems. Our frontend architecture establishes solid typographic scales, fluid layout patterns, and robust state-driven React flows.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.303.197-1.591 1.591M21.75 12h-2.25m-.197 5.303-1.591-1.591M12 21.75V19.5m-5.303-.197 1.591-1.591M2.25 12h2.25m-.197-5.303 1.591 1.591"
        />
      ),
    },
    {
      label: "EMBEDDED & IOT",
      title: "IoT Systems & Embedded Hardware",
      desc: "We engineer specialized microcontroller nodes, sensors, and embedded systems interfaces. From real-time telemetry streaming to firmware integration, we build robust physical computing layers.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      ),
    },
    {
      label: "RESEARCH & OPS",
      title: "Quantitative UX Research & Planning",
      desc: "Every digital asset needs rigorous validation. We map user testing parameters, optimize friction points, and manage operational planning documentation to satisfy rigorous product specs.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v12m0 0H9m3 0h3m-3-12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        />
      ),
    },
    {
      label: "WEBSITES",
      title: "Interactive Websites & Web Apps",
      desc: "We design and develop high-speed, interactive web platforms using modern web technologies. Our websites feature responsive visual hierarchy, fluid page motion, and optimized performance.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
        />
      ),
    },
  ];

  return (
    <section
      id="discover"
      ref={containerRef}
      className="relative w-full text-white py-24 sm:py-32 select-text overflow-hidden bg-[#040404]"
      style={{ zIndex: 5 }}
    >
      <style>{`
        @keyframes trace-pulse {
          0%, 100% { opacity: 0.2; filter: drop-shadow(0 0 2px rgba(232,161,32,0.1)); }
          50% { opacity: 0.5; filter: drop-shadow(0 0 8px rgba(232,161,32,0.4)); }
        }
        @keyframes signal-travel {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-traces { animation: trace-pulse 6s ease-in-out infinite; }
        .animate-signal { stroke-dasharray: 12, 50; animation: signal-travel 4s linear infinite; }
      `}</style>

      {/* Hardware Schematic Background Tracks Global Mouse Drift */}
      <div
        className="absolute inset-0 pointer-events-none z-0 mix-blend-screen transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(${mousePos.x}px) translateY(${mousePos.y}px) scale(1.02)`,
          opacity: 0.12,
        }}
      >
        <svg
          className="w-full h-full animate-traces"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id="mcu-pattern"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="60"
                y="60"
                width="80"
                height="80"
                rx="4"
                fill="none"
                stroke="#e8a120"
                strokeWidth="2.5"
                strokeOpacity="1.7"
              />
              <rect
                x="72"
                y="72"
                width="56"
                height="56"
                rx="2"
                fill="none"
                stroke="#e8a120"
                strokeWidth="0.5"
                strokeOpacity="0.4"
                strokeDasharray="2 2"
              />
              <text
                x="100"
                y="104"
                textAnchor="middle"
                fill="#e8a120"
                fontSize="10"
                fontFamily="monospace"
                letterSpacing="1"
                opacity="0.6"
              >
                ARM-MCU
              </text>

              {[...Array(6)].map((_, i) => {
                const step = 65 + i * 14;
                return (
                  <g key={i}>
                    <line
                      x1={step}
                      y1="48"
                      x2={step}
                      y2="60"
                      stroke="#e8a120"
                      strokeWidth="1"
                    />
                    <circle cx={step} cy="46" r="1.5" fill="#e8a120" />
                    <line
                      x1={step}
                      y1="140"
                      x2={step}
                      y2="152"
                      stroke="#e8a120"
                      strokeWidth="1"
                    />
                    <circle cx={step} cy="154" r="1.5" fill="#e8a120" />
                    <line
                      x1="48"
                      y1={step}
                      x2="60"
                      y2={step}
                      stroke="#e8a120"
                      strokeWidth="1"
                    />
                    <circle cx={46} cy={step} r="1.5" fill="#e8a120" />
                    <line
                      x1="140"
                      y1={step}
                      x2="152"
                      y2={step}
                      stroke="#e8a120"
                      strokeWidth="1"
                    />
                    <circle cx={154} cy={step} r="1.5" fill="#e8a120" />
                  </g>
                );
              })}

              <path
                d="M 14 14 L 46 46 M 154 46 L 186 14 M 46 154 L 14 186 M 154 154 L 186 186"
                fill="none"
                stroke="#e8a120"
                strokeWidth="0.75"
                opacity="0.4"
              />
              <path
                d="M 0 100 L 46 100 M 154 100 L 200 100 M 100 0 L 100 46 M 100 154 L 100 200"
                fill="none"
                stroke="#e8a120"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.3"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#mcu-pattern)" />

          <g fill="none" stroke="#e8a120" strokeWidth="1.5" opacity="0.6">
            <path
              d="M -50,150 L 300,150 L 450,300 L 1200,300 L 1350,450 L 2000,450"
              className="animate-signal"
            />
            <path
              d="M 2000,800 L 1400,800 L 1250,650 L 600,650 L 450,500 L -50,500"
              className="animate-signal"
              style={{ animationDelay: "-2s" }}
            />
          </g>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-[#040404] via-transparent to-[#040404]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 20%, #040404 80%)",
          }}
        />
      </div>

      {isInView && (
        <motion.div
          initial={{ top: "0%" }}
          animate={{ top: "100%" }}
          transition={{ duration: 1.5, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] z-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, #e8a120, transparent)",
            boxShadow: "0 0 12px rgba(232,161,32,0.8)",
          }}
        />
      )}

      {/* Ambient Backlight Blur Rings */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-10 w-[600px] h-[600px] rounded-full opacity-[0.02] blur-3xl pointer-events-none"
        style={{ backgroundColor: GOLD }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
        className="absolute bottom-10 left-10 w-[600px] h-[600px] rounded-full opacity-[0.02] blur-3xl pointer-events-none"
        style={{ backgroundColor: GOLD_BRIGHT }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-20">
        {/* Header Layout */}
        <motion.div
          initial={{ opacity: 0, x: -50, letterSpacing: "-0.08em" }}
          animate={isInView ? { opacity: 1, x: 0, letterSpacing: "0em" } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 sm:mb-24 flex flex-col items-center sm:items-start text-center sm:text-left"
        >
          <span className="font-mono-code text-[#e8a120] text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-4 block">
            // CORE HARDWARE OPERATIONS & TESTING
          </span>
          <h2 className="font-bebas text-white text-5xl sm:text-7xl lg:text-8xl leading-none uppercase max-w-4xl tracking-tight">
            WHAT WE DO
          </h2>
        </motion.div>

        {/* Cards Structural Framework */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24">
          {CARDS.map((card, i) => (
            <CapabilityCard
              key={card.label}
              {...card}
              index={i}
              inView={isInView}
            />
          ))}
        </div>

        {/* Metrics Section Bar */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 relative z-20 overflow-hidden rounded-xl border border-[rgba(232,161,32,0.15)] bg-black/50 backdrop-blur-md"
        >
          {statsInView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: "inset 0 0 60px rgba(232,161,32,0.12)" }}
            />
          )}

          {[
            { label: "HARDWARE NODES DEPLOYED", val: "240+" },
            { label: "DAILY COMPILATIONS", val: "1.2K" },
            { label: "LINES OF FIRMWARE", val: "18M+" },
            { label: "COMPLEX HARDWARE BUILDS", val: "40+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 100, delay: i * 0.12 }}
              className="text-center relative z-10"
            >
              <span className="block font-sans text-[10px] sm:text-xs text-[#9CA3AF] tracking-[0.25em] uppercase mb-3">
                {stat.label}
              </span>
              <span className="font-bebas text-4xl sm:text-6xl text-[#e8a120] block tracking-wide hover:scale-105 hover:text-white transition-all duration-300 select-none">
                <AnimatedCounter value={stat.val} inView={statsInView} />
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { GOLD, GOLD_BRIGHT } from '../data';

/* ── Stats Marquee ── */
const STATS = [
  { label: 'SYSTEMS DEPLOYED',   val: '240+' },
  { label: 'DAILY COMPILATIONS', val: '1.2K' },
  { label: 'LINES OF CODE',      val: '18M+' },
  { label: 'COMPLEX BUILDS',     val: '40+'  },
  { label: 'CLIENT UPTIME',      val: '99.9%'},
  { label: 'PROJECTS SHIPPED',   val: '120+' },
];

function StatMarquee() {
  // Triple-duplicate for seamless loop at all screen sizes
  const items = [...STATS, ...STATS, ...STATS];

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{
        borderTop:    '1px solid rgba(232,161,32,0.25)',
        borderBottom: '1px solid rgba(232,161,32,0.25)',
        background:   'linear-gradient(90deg, rgba(10,10,10,0.95) 0%, rgba(232,161,32,0.04) 50%, rgba(10,10,10,0.95) 100%)',
      }}
    >
      {/* Left & right fade masks */}
      <div
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #0a0a0a, transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, #0a0a0a, transparent)' }}
      />

      {/* Scrolling track */}
      <div
        className="flex items-center"
        style={{
          animation: 'marquee-scroll 40s linear infinite',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {items.map((stat, i) => (
          <div key={i} className="flex items-center shrink-0">
            {/* Stat item */}
            <div className="flex items-center gap-4 px-10 py-7">
              {/* Rotated diamond accent */}
              <span
                className="shrink-0 w-1.5 h-1.5 rotate-45 block"
                style={{ backgroundColor: '#e8a120', opacity: 0.55 }}
              />

              <div className="flex flex-col items-start">
                <span
                  className="font-mono-code uppercase tracking-[0.2em] block"
                  style={{ color: 'rgba(156,163,175,0.65)', fontSize: '9px', marginBottom: '4px' }}
                >
                  {stat.label}
                </span>
                <span
                  className="font-bebas tracking-wider leading-none block"
                  style={{
                    fontSize: 'clamp(30px, 3vw, 44px)',
                    color: '#e8a120',
                    textShadow: '0 0 24px rgba(232,161,32,0.3)',
                  }}
                >
                  {stat.val}
                </span>
              </div>
            </div>

            {/* Vertical separator */}
            <div
              className="h-10 shrink-0"
              style={{
                width: '1px',
                background: 'linear-gradient(180deg, transparent, rgba(232,161,32,0.3), transparent)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Capability Card ── */
function CapabilityCard({ icon, label, title, desc, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.2, ease: 'easeOut' }}
      className="relative bg-[#111111]/80 backdrop-blur-md rounded-xl p-8 sm:p-10 group text-left overflow-hidden border border-[rgba(232,161,32,0.05)] hover:border-[rgba(232,161,32,0.2)] transition-colors duration-300 shadow-xl"
    >
      {/* Gold top border sweep on hover */}
      <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#e8a120] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex justify-between items-start mb-10 relative z-10">
        <div className="p-3.5 rounded-xl bg-[rgba(232,161,32,0.08)] border border-[rgba(232,161,32,0.15)] text-[#e8b84b] group-hover:bg-[rgba(232,161,32,0.12)] transition-colors duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            {icon}
          </svg>
        </div>
        <span className="font-mono-code text-[#e8a120] text-xs font-bold tracking-widest uppercase">
          {label}
        </span>
      </div>

      <h3 className="font-sans font-bold text-xl sm:text-2xl tracking-tight mb-4 text-[#F8F8F6] group-hover:text-white transition-colors duration-300">
        {title}
      </h3>
      <p className="font-sans text-sm leading-relaxed text-[#9CA3AF]">
        {desc}
      </p>
    </motion.div>
  );
}

/* ── Main Section ── */
export function Capabilities() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const CARDS = [
    {
      label: 'DISCOVERY',
      title: 'Front-End Layout Engineering',
      desc: 'We build interactive, lightning-fast UI systems. Our frontend architecture establishes solid typographic scales, fluid layout patterns, and robust state-driven React flows.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.303.197-1.591 1.591M21.75 12h-2.25m-.197 5.303-1.591-1.591M12 21.75V19.5m-5.303-.197 1.591-1.591M2.25 12h2.25m-.197-5.303 1.591 1.591" />,
    },
    {
      label: 'EMBEDDED & IOT',
      title: 'IoT Systems & Embedded Hardware',
      desc: 'We engineer specialized microcontroller nodes, sensors, and embedded systems interfaces. From real-time telemetry streaming to firmware integration, we build robust physical computing layers.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />,
    },
    {
      label: 'RESEARCH & OPS',
      title: 'Quantitative UX Research & Planning',
      desc: 'Every digital asset needs rigorous validation. We map user testing parameters, optimize friction points, and manage operational planning documentation to satisfy rigorous product specs.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v12m0 0H9m3 0h3m-3-12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
    },
    {
      label: 'WEBSITES',
      title: 'Interactive Websites & Web Apps',
      desc: 'We design and develop high-speed, interactive web platforms using modern web technologies. Our websites feature responsive visual hierarchy, fluid page motion, and optimized performance.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />,
    },
  ];

  return (
    <section
      id="discover"
      ref={containerRef}
      className="relative w-full text-white select-text overflow-hidden bg-[#0a0a0a]"
      style={{ zIndex: 5 }}
    >
      {/* Radar Sweep Line */}
      {isInView && (
        <motion.div
          initial={{ top: '0%' }}
          animate={{ top: '100%' }}
          transition={{ duration: 1.5, ease: 'linear' }}
          className="absolute left-0 right-0 h-[1px] z-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, #e8a120, transparent)',
            boxShadow: '0 0 12px rgba(232,161,32,0.8)',
          }}
        />
      )}

      {/* Ambient gold blobs */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full opacity-[0.02] blur-3xl pointer-events-none"
        style={{ backgroundColor: GOLD }} />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full opacity-[0.02] blur-3xl pointer-events-none"
        style={{ backgroundColor: GOLD_BRIGHT }} />

      {/* ── Cards section ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-20 py-24 sm:py-32">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16 sm:mb-24 flex flex-col items-center sm:items-start text-center sm:text-left"
        >
          <span className="font-mono-code text-[#e8a120] text-[10px] sm:text-xs tracking-widest uppercase mb-4 block">
            OUR CRAFT
          </span>
          <h2 className="font-bebas text-white text-5xl sm:text-7xl lg:text-8xl leading-none uppercase max-w-4xl tracking-tight">
            WHAT WE DO
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CARDS.map((card, i) => (
            <CapabilityCard
              key={card.label}
              {...card}
              index={i}
              inView={isInView}
            />
          ))}
        </div>

      </div>

      {/* ── Stats Marquee — full bleed, below the cards ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
      >
        <StatMarquee />
      </motion.div>

    </section>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BinaryRain } from './BinaryRain';
import { useTextScramble } from '../hooks/useTextScramble';
import freyLogo from '../uploads/freylogo.png';

export function HeroSection() {
  const [triggerScramble, setTriggerScramble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTriggerScramble(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const { displayText: headlineText } = useTextScramble('BUILT BY FREY.', 700, triggerScramble);

  return (
    <section
      id="hero"
      className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      style={{ zIndex: 10 }}
    >
      {/* Background grain */}
      <div
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.06,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
          zIndex: 0,
        }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Binary Rain Layer */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <BinaryRain opacity={0.05} speed={0.5} density={0.8} color="#e8a120" active={true} />
      </div>

      {/* Frey Logo Watermark */}
      <motion.img
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        src={freyLogo}
        alt="Frey Logo Mark"
        className="absolute right-0 sm:right-1/4 top-1/2 -translate-y-1/2 w-full max-w-[800px] object-contain pointer-events-none select-none"
        style={{ zIndex: 2 }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-6 sm:px-16 flex flex-col items-center sm:items-start text-center sm:text-left mt-16 sm:mt-0">
        
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="font-mono-code text-[#e8a120] text-[10px] sm:text-xs tracking-widest uppercase mb-4 sm:mb-6"
        >
          Est. in pursuit of excellence <span className="mx-2 opacity-50">·</span> Norse for freedom. Built for the future.
        </motion.p>

        {/* Main Headline */}
        <h1
          className="font-bebas text-white uppercase leading-[0.85] tracking-tight mb-6 sm:mb-8 text-center sm:text-left"
          style={{
            fontSize: 'clamp(80px, 13vw, 180px)',
            textShadow: '0 0 60px rgba(232,161,32,0.18)'
          }}
        >
          {headlineText}
        </h1>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="text-[#c0c0c0] font-sans text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed mb-10 sm:mb-12"
        >
          Software forged for the exalted. We build digital systems that move, think, and last.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="#discover"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
          className="inline-flex items-center justify-center border border-[#e8a120] text-[#e8b84b] hover:bg-[#e8a120] hover:text-[#0a0a0a] transition-all duration-300 font-sans font-semibold text-sm sm:text-base tracking-wide px-8 py-3.5 sm:px-10 sm:py-4 rounded-[1px]"
        >
          See Our Work &rarr;
        </motion.a>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 100%)',
          zIndex: 5
        }}
      />
    </section>
  );
}

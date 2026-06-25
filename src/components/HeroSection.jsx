import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { BinaryRain } from './BinaryRain';
import { useTextScramble } from '../hooks/useTextScramble';
import freyLogo from '../uploads/freylogo.png';
import freyHeroVideo from '../uploads/freyhero.mp4';

export function HeroSection() {
  const [triggerScramble, setTriggerScramble] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 2500); // 2.5 second pause on the last frame
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTriggerScramble(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const { displayText: headlineText } = useTextScramble('BUILD WITH FREY.', 700, triggerScramble);

  return (
    <section
      id="hero"
      className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      style={{ zIndex: 10 }}
    >
      {/* Background Video Layer */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <source src={freyHeroVideo} type="video/mp4" />
      </video>

      {/* Dark Vignette Overlay for Text Readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'radial-gradient(circle at center, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.9) 100%)'
        }}
      />

      {/* Background grain */}
      <div
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.08,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
          zIndex: 2,
        }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Binary Rain Layer - Opacity increased to make it noticeable alongside video */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
        <BinaryRain opacity={0.6} speed={0.15} density={0.3} color="#e8a120" active={true} />
      </div>

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
            fontSize: 'clamp(70px, 11vw, 160px)',
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
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-4 overflow-hidden transition-all duration-300 cursor-pointer"
          style={{ 
            background: 'linear-gradient(135deg, #e8a120 0%, #c48212 100%)',
            boxShadow: '0 8px 32px rgba(232,161,32,0.3)',
            borderRadius: '2px'
          }}
        >
          {/* Shimmer sweep on hover */}
          <span 
            className="absolute top-0 left-0 w-[150%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-[120%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-in-out z-0" 
          />
          
          <span className="relative font-sans text-xs sm:text-sm font-bold tracking-[0.15em] text-[#0a0a0a] uppercase z-10 transition-transform group-hover:scale-105 duration-300">
            DISCOVER OUR CRAFT
          </span>

          {/* Forward Arrow */}
          <svg 
            className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-[#0a0a0a] transition-transform duration-300 group-hover:translate-x-1.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
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

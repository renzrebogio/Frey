import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { BinaryRain } from './BinaryRain';
import { useTextScramble } from '../hooks/useTextScramble';

export function HeroSection({ images = [], splashDone = false }) {
  const [triggerScramble, setTriggerScramble] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTriggerScramble(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [splashDone]);

  const { displayText: headlineText } = useTextScramble('BUILD WITH FREY.', 700, triggerScramble);

  // Scroll-linked Frame Animation
  useEffect(() => {
    if (!images || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize canvas for opaque background

    let currentFrameIndex = 0;
    let targetFrameIndex = 0;
    let animationFrameId;

    const drawFrame = (img) => {
      if (!img || !img.complete) return;
      
      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.width / img.height;
      
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      // Calculate object-fit: cover equivalent
      if (canvasAspect > imgAspect) {
        drawHeight = canvas.width / imgAspect;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgAspect;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Map scroll from 0 to 180vh. At 180vh, animation ends.
      // This leaves a 20vh pause before the next section enters at 200vh.
      const maxScroll = windowHeight * 1.8; 
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      
      targetFrameIndex = Math.min(
        images.length - 1,
        Math.floor(progress * (images.length - 1))
      );
    };

    const renderLoop = () => {
      // Lerp current frame towards target frame for ultra-smooth scrubbing
      // even with rigid mouse wheels
      const diff = targetFrameIndex - currentFrameIndex;
      
      if (Math.abs(diff) > 0.01) {
        currentFrameIndex += diff * 0.1; // Lerp factor (speed)
      } else {
        currentFrameIndex = targetFrameIndex;
      }

      const frameToDraw = Math.round(currentFrameIndex);
      
      if (images[frameToDraw]) {
        drawFrame(images[frameToDraw]);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      handleScroll(); // Redraw with new dimensions
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    // Initial setup
    handleResize();
    renderLoop();

    // Ensure the first frame draws if images load while at top
    if (images[0]) {
      images[0].onload = () => {
        handleScroll();
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [images]);

  // ── Eyebrow type-in ─────────────────────────────────────────────────
  const EYEBROW = 'Frey: The Exalted One · Norse for Freedom.';
  const [eyebrowText, setEyebrowText] = useState('');
  // showContent is driven by splashDone — no internal timer needed
  const showContent = splashDone;

  useEffect(() => {
    if (!splashDone) return;

    let i = 0;
    setEyebrowText('');
    const interval = setInterval(() => {
      i++;
      setEyebrowText(EYEBROW.slice(0, i));
      if (i >= EYEBROW.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [splashDone]);

  // Sub-copy word-by-word reveal
  const SUB_WORDS = 'Software forged for the exalted. We build digital systems that move, think, and last.'.split(' ');

  return (
    <section className="relative w-full" style={{ height: '400vh', zIndex: 10 }}>
      {/* Sticky Inner Container */}
      <div
        id="hero"
        className="sticky top-0 left-0 w-full h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      >
        {/* Canvas Video Replacement Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* Dark Vignette Overlay for Text Readability */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background: 'radial-gradient(circle at center, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.6) 100%)'
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

        {/* Binary Rain Layer */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
          <BinaryRain opacity={0.6} color="#e8a120" active={true} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl px-6 sm:px-16 flex flex-col items-center sm:items-start text-center sm:text-left mt-16 sm:mt-0">

          {/* ── Eyebrow: character-by-character type-in ── */}
          <p className="font-mono-code text-[#e8a120] text-[10px] sm:text-xs tracking-widest uppercase mb-4 sm:mb-6 min-h-[1em]">
            {eyebrowText}
            {/* blinking cursor while typing */}
            {eyebrowText.length < EYEBROW.length && (
              <span
                style={{
                  display: 'inline-block',
                  width: '0.55em',
                  height: '0.9em',
                  backgroundColor: '#e8a120',
                  marginLeft: '2px',
                  verticalAlign: 'middle',
                  animation: 'terminal-blink 0.5s step-end infinite',
                }}
              />
            )}
          </p>

          {/* ── Headline: text scramble + clip-path reveal ── */}
          <motion.h1
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
            animate={showContent
              ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 }
              : {}}
            transition={{ duration: 0.05, delay: 0.1, ease: 'easeOut' }}
            className="font-bebas text-white uppercase leading-[0.85] tracking-tight mb-6 sm:mb-8 text-center sm:text-left"
            style={{
              fontSize: 'clamp(70px, 11vw, 160px)',
              textShadow: '0 0 60px rgba(232,161,32,0.18)',
            }}
          >
            {headlineText}
          </motion.h1>

          {/* ── Sub-copy: word-by-word stagger ── */}
          <p className="text-[#c0c0c0] font-sans text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed mb-10 sm:mb-12">
            {SUB_WORDS.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={showContent ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{
                  duration: 0.5,
                  delay: 1.1 + i * 0.06,
                  ease: 'easeOut',
                }}
                style={{ display: 'inline-block', marginRight: '0.28em' }}
              >
                {word}
              </motion.span>
            ))}
          </p>

          {/* ── CTA: lift + blur clear ── */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={showContent ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.7, delay: 1.9, ease: 'easeOut' }}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-4 overflow-hidden transition-all duration-300 cursor-pointer"
            style={{ 
              background: 'linear-gradient(135deg, #e8a120 0%, #c48212 100%)',
              boxShadow: '0 8px 32px rgba(232,161,32,0.3)',
              borderRadius: '2px'
            }}
          >
            <span 
              className="absolute top-0 left-0 w-[150%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-[120%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-in-out z-0" 
            />
            <span className="relative font-sans text-xs sm:text-sm font-bold tracking-[0.15em] text-[#0a0a0a] uppercase z-10 transition-transform group-hover:scale-105 duration-300">
              BUILD WITH FREY
            </span>
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
      </div>
    </section>
  );
}


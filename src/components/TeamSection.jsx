import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { IMAGES } from '../data';
import { useTextScramble } from '../hooks/useTextScramble';

const MEMBER_COLORS = {
  'RANDEL': '#e8612d',
  'GRAZIELLE': '#2de89a',
  'RENZ MARTIN': '#e82d3b',
  'ELIJAH BOON': '#2d6ae8'
};

export function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive boundary check
  useEffect(() => {
    const updateVH = () => {
      setIsMobile(window.innerWidth < 640);
    };
    updateVH();
    window.addEventListener('resize', updateVH, { passive: true });
    return () => window.removeEventListener('resize', updateVH);
  }, []);

  // Carousel navigation timing lock
  const navigate = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);

    setActiveIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % 4;
      } else {
        return (prev + 3) % 4;
      }
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  // Derived carousel roles
  const getRole = (index) => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex + 3) % 4) return 'left';
    if (index === (activeIndex + 1) % 4) return 'right';
    return 'back';
  };

  // Carousel positioning/transform styles
  const getRoleStyles = (role) => {
    switch (role) {
      case 'center':
        return {
          transform: `translateX(-50%) scale(${isMobile ? 0.95 : 1.25})`,
          filter: 'blur(0px)',
          opacity: 1,
          zIndex: 20,
          left: '50%',
          height: isMobile ? '46%' : '72%',
          bottom: isMobile ? '26%' : '3%',
        };
      case 'left':
        return {
          transform: 'translateX(-50%) scale(0.8)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '18%' : '30%',
          height: isMobile ? '11%' : '20%',
          bottom: isMobile ? '34%' : '14%',
        };
      case 'right':
        return {
          transform: 'translateX(-50%) scale(0.8)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '82%' : '70%',
          height: isMobile ? '11%' : '20%',
          bottom: isMobile ? '34%' : '14%',
        };
      case 'back':
        return {
          transform: 'translateX(-50%) scale(0.8)',
          filter: 'blur(4px)',
          opacity: 1,
          zIndex: 5,
          left: '50%',
          height: isMobile ? '8%' : '15%',
          bottom: isMobile ? '34%' : '14%',
        };
    }
  };

  const currentName = IMAGES[activeIndex].name;
  const currentRole = IMAGES[activeIndex].role;
  const currentStatement = IMAGES[activeIndex].statement;
  const activeColor = MEMBER_COLORS[currentName] || '#e8a120';

  // Apply scramble effect to the name when it changes
  const { displayText: scrambledName } = useTextScramble(currentName, 400);

  return (
    <section
      id="team"
      style={{
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#0a0a0a',
        fontFamily: "'Inter', sans-serif",
      }}
      className="relative w-full [overflow-x:clip] select-none py-12 lg:py-24"
    >
      {/* Section Header */}
      <div className="absolute top-8 left-4 sm:top-16 sm:left-16 z-50 pointer-events-none">
        <p className="font-mono-code text-[#e8a120] text-xs sm:text-sm tracking-widest uppercase mb-2">
          THE TEAM
        </p>
        <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wide uppercase">
          Meet The Collective
        </h2>
      </div>

      <div
        className="relative w-full [overflow:clip]"
        style={{
          height: isMobile ? '80svh' : '100vh',
          minHeight: isMobile ? '480px' : '600px',
          maxHeight: isMobile ? '680px' : 'none',
        }}
      >
        {/* Grain overlay */}
        <div
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.05,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
            zIndex: 50,
          }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Brand Color Aura */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: `radial-gradient(circle at 50% 50%, ${activeColor}20 0%, transparent 60%)`,
            transition: 'background 800ms ease-out',
            opacity: 0.6,
            pointerEvents: 'none',
          }}
        />

        {/* Giant ghost name text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 2 }}
        >
          {IMAGES.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <h1
                key={idx}
                style={{
                  fontFamily: "'Anton', sans-serif",
                  transform: isMobile ? 'translateY(-15px)' : 'translateY(-80px)',
                  opacity: isActive ? 0.04 : 0,
                  transition: 'opacity 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'absolute',
                  fontSize: '24vw',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.04em',
                  whiteSpace: 'nowrap',
                  color: '#ffffff',
                }}
              >
                {item.name}
              </h1>
            );
          })}
        </div>

        {/* Carousel cards */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((item, idx) => {
            const role = getRole(idx);
            const roleStyles = getRoleStyles(role);

            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  aspectRatio: '0.6 / 1',
                  transition:
                    'transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1), bottom 650ms cubic-bezier(0.4, 0, 0.2, 1), height 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform, filter, opacity',
                  ...roleStyles,
                }}
              >
                {/* Gold metallic pedestal */}
                <div
                  style={{
                    background: 'linear-gradient(to bottom, rgba(232,161,32,0.15), rgba(168,106,16,0.2))',
                    transform: 'translate(-50%, 50%) rotateX(65deg)',
                    boxShadow: '0 20px 40px -8px rgba(232,161,32,0.12)',
                    border: '1px solid rgba(232,161,32,0.15)',
                  }}
                  className="absolute bottom-[-1%] left-1/2 w-[100%] h-[18%] rounded-full -z-10 opacity-90 overflow-hidden"
                >
                  <div className="absolute inset-[10%] rounded-full bg-white/10 blur-[1px]" />
                </div>

                <img
                  src={item.src}
                  alt={`Frey team member ${item.name}`}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  className="w-full h-full object-contain object-bottom select-none pointer-events-none"
                />
              </div>
            );
          })}
        </div>

        {/* Controls panel — bottom left */}
        <div
          style={{ 
            zIndex: 50,
            borderLeft: `3px solid ${activeColor}`,
            transition: 'border-color 400ms ease'
          }}
          className="absolute left-4 right-4 sm:left-16 sm:right-auto sm:max-w-[360px] pl-4 bottom-[calc(env(safe-area-inset-bottom,0px)+16px)] sm:bottom-16"
        >
          <h2
            className="text-white font-bold tracking-wider uppercase mb-0.5"
            style={{
              fontSize: isMobile ? '16px' : '28px',
              fontFamily: "'Bebas Neue', 'Anton', sans-serif",
              letterSpacing: '0.1em',
            }}
          >
            {scrambledName}
          </h2>
          <span
            style={{
              color: 'rgba(232,161,32,0.8)',
              fontSize: '11px',
              marginBottom: isMobile ? '12px' : '20px',
              letterSpacing: '0.25em',
            }}
            className="uppercase font-semibold block font-mono-code"
          >
            {currentRole}
          </span>

          {/* Statement — desktop only */}
          <p
            className="hidden sm:block text-[15px] leading-relaxed mb-8 text-left"
            style={{ color: '#9CA3AF' }}
          >
            "{currentStatement}"
          </p>

          {/* Nav buttons row */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => navigate('prev')}
              disabled={isAnimating}
              aria-label="Previous team member"
              style={{
                width: isMobile ? '40px' : '52px',
                height: isMobile ? '40px' : '52px',
                border: '1px solid rgba(232,161,32,0.4)',
                color: '#e8b84b',
                borderRadius: '50%',
                transition: 'all 150ms ease',
              }}
              className="flex items-center justify-center cursor-pointer select-none active:scale-95 hover:bg-[#e8a120] hover:text-[#0a0a0a] hover:border-[#e8a120] disabled:opacity-40 flex-shrink-0"
            >
              <ArrowLeft size={isMobile ? 15 : 20} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => navigate('next')}
              disabled={isAnimating}
              aria-label="Next team member"
              style={{
                width: isMobile ? '40px' : '52px',
                height: isMobile ? '40px' : '52px',
                border: '1px solid rgba(232,161,32,0.4)',
                color: '#e8b84b',
                borderRadius: '50%',
                transition: 'all 150ms ease',
              }}
              className="flex items-center justify-center cursor-pointer select-none active:scale-95 hover:bg-[#e8a120] hover:text-[#0a0a0a] hover:border-[#e8a120] disabled:opacity-40 flex-shrink-0"
            >
              <ArrowRight size={isMobile ? 15 : 20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { IMAGES } from '../data';

export function HeroSection({
  activeIndex,
  isAnimating,
  isMobile,
  navigate,
  getRole,
  getRoleStyles,
}) {
  const GOLD        = '#C9963A';
  const GOLD_BRIGHT = '#E8B84B';

  return (
    <div
      id="frey-hero-section"
      style={{
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#09090B',
        fontFamily: "'Inter', sans-serif",
        marginTop: 0,
        paddingTop: 0,
      }}
      className="relative w-full [overflow-x:clip] select-none"
    >
      <div
        className="relative w-full [overflow:clip]"
        style={{
          height: isMobile ? 'calc(var(--hero-vh, 1svh) * 72)' : '100vh',
          minHeight: isMobile ? '480px' : '600px',
          maxHeight: isMobile ? '680px' : 'none',
        }}
      >
        {/* Grain overlay */}
        <div
          id="grain-layer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.07,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
            zIndex: 50,
          }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Radial gold glow — shifts subtly based on active card */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: `radial-gradient(ellipse 60% 50% at ${
              activeIndex === 0 ? '35%' :
              activeIndex === 1 ? '45%' :
              activeIndex === 2 ? '55%' : '65%'
            } 70%, rgba(201,150,58,0.07) 0%, transparent 70%)`,
            transition: 'background 650ms cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: 'none',
          }}
        />

        {/* Giant ghost name text */}
        <div
          id="giant-background-text"
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
                  opacity: isActive ? 0.07 : 0,
                  transition: 'opacity 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'absolute',
                  fontSize: '24vw',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.04em',
                  whiteSpace: 'nowrap',
                  color: '#D1D5DB',
                }}
              >
                {item.name}
              </h1>
            );
          })}
        </div>

        {/* Carousel cards */}
        <div id="carousel-viewport" className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((item, idx) => {
            const role = getRole(idx);
            const roleStyles = getRoleStyles(role);

            return (
              <div
                key={idx}
                id={`carousel-item-${idx}`}
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
                    background: 'linear-gradient(to bottom, rgba(201,150,58,0.18), rgba(146,113,42,0.25))',
                    transform: 'translate(-50%, 50%) rotateX(65deg)',
                    boxShadow: '0 20px 40px -8px rgba(201,150,58,0.15)',
                    border: '1px solid rgba(201,150,58,0.2)',
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
          id="controls-panel"
          style={{ zIndex: 50 }}
          className="absolute left-4 right-4 sm:left-16 sm:right-auto sm:max-w-[360px]"
        >
          <style>{`
            #controls-panel {
              bottom: calc(env(safe-area-inset-bottom, 0px) + clamp(16px, 3.5vh, 36px));
            }
            @media (min-width: 640px) {
              #controls-panel { bottom: 64px; }
            }
          `}</style>

          {/* Cormorant serif accent above name */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: 'rgba(201,150,58,0.55)',
              fontSize: isMobile ? '10px' : '13px',
              letterSpacing: '0.25em',
              fontStyle: 'italic',
              marginBottom: '2px',
            }}
          >
            exalted one
          </p>

          <h2
            className="text-white font-bold tracking-wider uppercase mb-0.5"
            style={{
              fontSize: isMobile ? '13px' : '24px',
              color: '#F8F8F6',
              letterSpacing: '0.15em',
            }}
          >
            {IMAGES[activeIndex].name}
          </h2>
          <span
            style={{
              color: 'rgba(201,150,58,0.7)',
              fontSize: '10px',
              marginBottom: isMobile ? '8px' : '16px',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.3em',
            }}
            className="tracking-widest uppercase font-semibold block font-mono"
          >
            {IMAGES[activeIndex].role}
          </span>

          {/* Statement — desktop only */}
          <p
            className="hidden sm:block text-sm leading-relaxed mb-8 text-left"
            style={{ color: 'rgba(209,213,219,0.7)' }}
          >
            "{IMAGES[activeIndex].statement}"
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
                border: '1px solid rgba(201,150,58,0.5)',
                color: '#E8B84B',
                borderRadius: '50%',
                transition: 'all 150ms ease',
              }}
              className="flex items-center justify-center cursor-pointer select-none active:scale-95 hover:bg-[#C9963A] hover:text-black hover:border-[#C9963A] disabled:opacity-40 flex-shrink-0"
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
                border: '1px solid rgba(201,150,58,0.5)',
                color: '#E8B84B',
                borderRadius: '50%',
                transition: 'all 150ms ease',
              }}
              className="flex items-center justify-center cursor-pointer select-none active:scale-95 hover:bg-[#C9963A] hover:text-black hover:border-[#C9963A] disabled:opacity-40 flex-shrink-0"
            >
              <ArrowRight size={isMobile ? 15 : 20} strokeWidth={2} />
            </button>

            {/* Mobile discover link */}
            <a
              href="#discover"
              style={{
                fontFamily: "'Anton', sans-serif",
                color: '#E8B84B',
                letterSpacing: '0.08em',
              }}
              className="sm:hidden text-lg leading-none uppercase tracking-tighter flex items-center gap-1.5 no-underline group cursor-pointer ml-2"
            >
              <span>DISCOVER</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-active:translate-x-1" strokeWidth={2.5} />
            </a>
          </div>
        </div>

        {/* DISCOVER IT — desktop bottom right */}
        <div className="hidden sm:flex absolute bottom-16 right-12 items-center" style={{ zIndex: 50 }}>
          <a
            href="#discover"
            style={{
              fontFamily: "'Anton', sans-serif",
              color: '#E8B84B',
              letterSpacing: '0.08em',
            }}
            className="text-6xl leading-none uppercase transition-opacity duration-200 hover:opacity-75 flex items-center gap-4 no-underline group cursor-pointer"
          >
            <span>DISCOVER IT</span>
            <ArrowRight
              className="w-12 h-12 translate-y-0.5 transition-transform duration-200 group-hover:translate-x-2"
              strokeWidth={2}
            />
          </a>
        </div>

        {/* Subtle bottom gold gradient edge */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to top, rgba(9,9,11,1) 0%, transparent 100%)',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}

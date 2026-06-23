import { useEffect, useState } from 'react';

// Phase timeline:
//  100ms  → phase 1: draw gold SVG lines inward, show dim FREY ghost
//  2000ms → phase 2: lines converge center → FREY brightens to gold glow
//  2800ms → phase 3: FREY zooms out to natural size, tagline slides up
//  4000ms → phase 4: curtains split open (vertical wipe)
//  5200ms → splash unmounted by App.jsx

export function Splash() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 2000);
    const t3 = setTimeout(() => setPhase(3), 2800);
    const t4 = setTimeout(() => setPhase(4), 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Four gold lines converging to center from each corner
  const goldLines = [
    { path: 'M0,0 L18,0 L18,35 L42,35 L42,50 L50,50' },
    { path: 'M100,0 L82,0 L82,30 L58,30 L58,48 L50,50' },
    { path: 'M0,100 L22,100 L22,68 L42,68 L42,55 L50,50' },
    { path: 'M100,100 L78,100 L78,72 L58,72 L58,55 L50,50' },
  ];

  return (
    <div
      id="frey-splash-screen"
      style={{
        backgroundColor: '#09090B',
        opacity: phase >= 5 ? 0 : 1,
        transition: 'opacity 800ms ease-in-out',
        pointerEvents: phase >= 4 ? 'none' : 'auto',
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none"
    >
      <style>{`
        @keyframes gold-text-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(201,150,58,0.6), 0 0 60px rgba(201,150,58,0.2); }
          50%       { text-shadow: 0 0 40px rgba(232,184,75,0.9), 0 0 120px rgba(201,150,58,0.4); }
        }
        .frey-glow-active {
          animation: gold-text-glow 2s ease-in-out infinite;
        }
        @keyframes splash-sigil-pulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
      `}</style>

      {/* Grain overlay */}
      <div
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.06,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }}
        className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay"
      />

      {/* Gold SVG converging lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          opacity: phase >= 4 ? 0 : 1,
          transition: 'opacity 500ms ease',
        }}
      >
        {goldLines.map((l, i) => (
          <path
            key={i}
            d={l.path}
            stroke="#C9963A"
            strokeWidth="0.3"
            fill="none"
            pathLength="100"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: phase >= 1 ? 0 : 100,
              transition: 'stroke-dashoffset 1800ms cubic-bezier(0.5, 0, 0.2, 1)',
              filter: 'drop-shadow(0 0 3px rgba(201,150,58,0.8))',
            }}
          />
        ))}

        {/* Center sigil — ✦ encoded as 4 diamond paths */}
        <g
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transition: 'opacity 600ms ease',
            animation: phase >= 2 && phase < 4 ? 'splash-sigil-pulse 1.5s ease-in-out infinite' : 'none',
          }}
        >
          <circle cx="50" cy="50" r="1.5" fill="#C9963A" opacity="0.9" />
          <circle cx="50" cy="50" r="4" fill="none" stroke="#C9963A" strokeWidth="0.2" opacity="0.4" />
          <circle cx="50" cy="50" r="7" fill="none" stroke="#C9963A" strokeWidth="0.15" opacity="0.2" />
          {/* Four short rays */}
          {[0, 90, 180, 270].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 50 + Math.cos(rad) * 9;
            const y1 = 50 + Math.sin(rad) * 9;
            const x2 = 50 + Math.cos(rad) * 14;
            const y2 = 50 + Math.sin(rad) * 14;
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#E8B84B"
                strokeWidth="0.25"
                opacity="0.6"
              />
            );
          })}
        </g>
      </svg>

      {/* TOP curtain — slides up on phase 4 */}
      <div
        className="absolute left-0 right-0 top-0 bg-[#09090B] z-0 overflow-hidden"
        style={{
          height: '50vh',
          transform: phase >= 4 ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 1100ms cubic-bezier(0.76, 0, 0.24, 1)',
          borderBottom: phase >= 2
            ? '1px solid rgba(201,150,58,0.3)'
            : '1px solid rgba(255,255,255,0.04)',
        }}
      >
        {/* Gold curtain accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #C9963A, transparent)',
            opacity: phase >= 2 ? 1 : 0,
            boxShadow: '0 0 12px rgba(201,150,58,0.6)',
            transition: 'opacity 400ms ease',
          }}
        />
      </div>

      {/* BOTTOM curtain — slides down on phase 4 */}
      <div
        className="absolute left-0 right-0 bottom-0 bg-[#09090B] z-0 overflow-hidden"
        style={{
          height: '50vh',
          transform: phase >= 4 ? 'translateY(100%)' : 'translateY(0)',
          transition: 'transform 1100ms cubic-bezier(0.76, 0, 0.24, 1)',
          borderTop: phase >= 2
            ? '1px solid rgba(201,150,58,0.3)'
            : '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #C9963A, transparent)',
            opacity: phase >= 2 ? 1 : 0,
            boxShadow: '0 0 12px rgba(201,150,58,0.6)',
            transition: 'opacity 400ms ease',
          }}
        />
      </div>

      {/* Central Brand Block */}
      <div className="relative z-20 flex flex-col items-center text-center px-6">
        {/* FREY wordmark */}
        <h1
          style={{
            fontFamily: "'Anton', sans-serif",
            letterSpacing: phase >= 3 ? '0.12em' : '-0.02em',
            transform: phase >= 3 ? 'scale(1)' : 'scale(3)',
            opacity: phase >= 1 ? 1 : 0,
            color: phase >= 2 ? '#E8B84B' : 'rgba(201,150,58,0.08)',
            transition: phase >= 3
              ? 'transform 1400ms cubic-bezier(0.16, 1, 0.3, 1), letter-spacing 1400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease-out, color 800ms ease'
              : 'opacity 400ms ease-out, color 800ms ease',
          }}
          className={`text-7xl sm:text-9xl md:text-[11rem] leading-none uppercase tracking-tight mb-3 font-bold ${phase >= 2 && phase < 4 ? 'frey-glow-active' : ''}`}
        >
          FREY
        </h1>

        {/* Tagline */}
        <div style={{ overflow: 'hidden' }}>
          <p
            style={{
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? 'translateY(0)' : 'translateY(100%)',
              transition: 'opacity 900ms ease-out 500ms, transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 500ms',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: 'rgba(209,213,219,0.7)',
              letterSpacing: '0.18em',
            }}
            className="text-sm sm:text-base font-light italic uppercase max-w-xs sm:max-w-md mb-12"
          >
            Build with Frey
          </p>
        </div>
      </div>

      {/* Footer credits */}
      <div
        style={{
          opacity: phase >= 3 ? 1 : 0,
          transition: 'opacity 800ms ease-out 800ms',
        }}
        className="absolute bottom-8 left-0 right-0 text-center z-20"
      >
        <span
          style={{
            color: 'rgba(107,114,128,0.6)',
            fontFamily: "'Inter', sans-serif",
          }}
          className="text-[9px] tracking-[0.3em] uppercase"
        >
          © 2026 FREY. Build with Frey.
        </span>
      </div>
    </div>
  );
}

import { Github, Linkedin, ExternalLink } from 'lucide-react';

const GOLD        = '#C9963A';
const GOLD_BRIGHT = '#E8B84B';
const GOLD_GLOW   = '#F5D27A';

export function Footer() {
  const members = [
    {
      name: 'RANDEL',
      role: 'Frontend Developer',
      portfolio: '#',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'GRAZIELLE',
      role: 'Researcher & Operations',
      portfolio: '#',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'RENZ MARTIN',
      role: 'Frontend Developer',
      portfolio: '#',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'ELIJAH BOON',
      role: 'Backend Developer',
      portfolio: '#',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  ];

  return (
    <footer
      className="relative w-full pt-16 pb-12 select-text text-white"
      style={{ backgroundColor: '#09090B' }}
    >
      {/* Subtle gold bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: GOLD, opacity: 0.025 }}
      />

      {/* Top gold border */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, rgba(201,150,58,0.25), transparent)` }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12" style={{ borderBottom: '1px solid rgba(201,150,58,0.08)' }}>

          {/* Column 1: Brand intro */}
          <div className="md:col-span-4 text-left">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-5">
              <span
                style={{
                  fontFamily: "'Anton', sans-serif",
                  color: GOLD_BRIGHT,
                  letterSpacing: '0.2em',
                  textShadow: '0 0 16px rgba(201,150,58,0.3)',
                  fontSize: '18px',
                }}
              >
                FREY
              </span>
              <span style={{ color: GOLD, fontSize: '10px' }}>✦</span>
            </div>

            <h4
              className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase mb-4"
              style={{ color: 'rgba(107,114,128,0.5)' }}
            >
              THE FREY COLLECTIVE
            </h4>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: 'rgba(156,163,175,0.65)', fontFamily: "'Inter', sans-serif" }}
            >
              A close-knit team of computer engineers driven by a shared vision. We combine hardware discipline, embedded wisdom, and web excellence to build software that lasts.
            </p>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: 'rgba(201,150,58,0.5)',
                fontStyle: 'italic',
                fontSize: '16px',
                letterSpacing: '0.05em',
              }}
            >
              Build with Frey
            </p>
          </div>

          {/* Column 2: Team portfolios */}
          <div className="md:col-span-8 text-left">
            <h4
              className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase mb-6"
              style={{ color: 'rgba(107,114,128,0.5)' }}
            >
              PERSONAL PORTFOLIOS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {members.map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl p-5 flex flex-col justify-between group transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.008)',
                    border: '1px solid rgba(201,150,58,0.06)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(201,150,58,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(201,150,58,0.2)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.008)';
                    e.currentTarget.style.borderColor = 'rgba(201,150,58,0.06)';
                  }}
                >
                  <div className="mb-4">
                    <div className="flex justify-between items-start">
                      <span
                        className="font-sans font-bold text-sm tracking-wide"
                        style={{ color: 'rgba(248,248,246,0.9)' }}
                      >
                        {member.name}
                      </span>
                      <span
                        className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full"
                        style={{
                          color: GOLD,
                          backgroundColor: 'rgba(201,150,58,0.08)',
                          border: '1px solid rgba(201,150,58,0.15)',
                        }}
                      >
                        {member.role.split(' ')[0]}
                      </span>
                    </div>
                    <span
                      className="block font-mono text-[10px] mt-1 uppercase tracking-wider"
                      style={{ color: 'rgba(107,114,128,0.5)' }}
                    >
                      {member.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={member.portfolio}
                      className="text-[10px] font-mono tracking-widest uppercase font-bold flex items-center gap-1 transition-colors"
                      style={{ color: 'rgba(107,114,128,0.5)' }}
                      onMouseEnter={e => e.currentTarget.style.color = GOLD_BRIGHT}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(107,114,128,0.5)'}
                    >
                      <span>PORTFOLIO</span>
                      <ExternalLink size={10} style={{ color: GOLD }} />
                    </a>
                    <span style={{ color: 'rgba(107,114,128,0.2)' }} className="text-xs">|</span>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono tracking-widest uppercase flex items-center gap-1 transition-colors"
                      style={{ color: 'rgba(107,114,128,0.5)' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#F8F8F6'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(107,114,128,0.5)'}
                    >
                      <Github size={10} />
                      <span>GH</span>
                    </a>
                    <span style={{ color: 'rgba(107,114,128,0.2)' }} className="text-xs">|</span>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono tracking-widest uppercase flex items-center gap-1 transition-colors"
                      style={{ color: 'rgba(107,114,128,0.5)' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#F8F8F6'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(107,114,128,0.5)'}
                    >
                      <Linkedin size={10} />
                      <span>LN</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center select-none">
          <span style={{ color: 'rgba(107,114,128,0.4)', fontFamily: "'Inter', sans-serif" }}
            className="text-[9px] tracking-[0.25em] uppercase">
            ✦ © 2026 FREY. Build with Frey.
          </span>
          <span
            style={{
              color: GOLD,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontSize: '12px',
              letterSpacing: '0.08em',
            }}
          >
            Computer Engineering — SSC-R de Cavite
          </span>
        </div>
      </div>
    </footer>
  );
}

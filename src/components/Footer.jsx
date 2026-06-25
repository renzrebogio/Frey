import { Github, Linkedin, ExternalLink } from 'lucide-react';
import freyLogo from '../uploads/freylogo.png';
import { GOLD, GOLD_BRIGHT } from '../data';

const MEMBER_COLORS = {
  'RANDEL':      '#e8612d',
  'GRAZIELLE':   '#2de89a',
  'RENZ MARTIN': '#e82d3b',
  'ELIJAH BOON': '#2d6ae8',
};

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

  const navLinks = [
    { label: 'About', id: 'discover' },
    { label: 'Team', id: 'team' },
    { label: 'Services', id: 'discover' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative w-full pt-16 pb-10 select-text text-white"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Subtle gold bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: GOLD, opacity: 0.03 }}
      />

      {/* Top gold border */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, rgba(232,161,32,0.3), transparent)` }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12" style={{ borderBottom: '1px solid rgba(232,161,32,0.08)' }}>

          {/* Column 1: Brand intro */}
          <div className="md:col-span-4 text-left">
            {/* Logo image + wordmark */}
            <div className="flex items-center gap-3 mb-6">
              <img
                src={freyLogo}
                alt="Frey Logo"
                className="w-8 h-8 object-contain opacity-80"
              />
              <span
                style={{
                  fontFamily: "'Anton', sans-serif",
                  color: '#F8F8F6',
                  letterSpacing: '0.22em',
                  fontSize: '20px',
                }}
              >
                FREY
              </span>
              <span style={{ color: GOLD, fontSize: '10px' }}>✦</span>
            </div>

            <h4 className="font-mono-code text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase mb-4 text-[#6B7280]">
              THE FREY COLLECTIVE
            </h4>
            <p className="font-sans text-sm leading-relaxed mb-6 text-[#9CA3AF]">
              A close-knit team of computer engineers driven by a shared vision. We combine hardware discipline, embedded wisdom, and web excellence to build software that lasts.
            </p>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: 'rgba(232,161,32,0.6)',
                fontStyle: 'italic',
                fontSize: '17px',
                letterSpacing: '0.05em',
              }}
            >
              Build with Frey.
            </p>

            {/* Nav Links */}
            <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {navLinks.map(link => (
                <button
                  key={link.id + link.label}
                  onClick={() => scrollTo(link.id)}
                  className="font-mono-code text-[10px] uppercase tracking-widest text-[#6B7280] hover:text-[#e8b84b] transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Column 2: Team portfolios */}
          <div className="md:col-span-8 text-left">
            <h4 className="font-mono-code text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase mb-6 text-[#6B7280]">
              PERSONAL PORTFOLIOS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {members.map((member) => {
                const accentColor = MEMBER_COLORS[member.name] || GOLD;
                return (
                  <div
                    key={member.name}
                    className="rounded-xl p-5 flex flex-col justify-between group transition-all duration-300"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.01)',
                      border: '1px solid rgba(232,161,32,0.06)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(232,161,32,0.03)';
                      e.currentTarget.style.borderColor = 'rgba(232,161,32,0.18)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)';
                      e.currentTarget.style.borderColor = 'rgba(232,161,32,0.06)';
                    }}
                  >
                    <div className="mb-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {/* Team member brand color dot */}
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{
                              backgroundColor: accentColor,
                              boxShadow: `0 0 6px ${accentColor}80`
                            }}
                          />
                          <span
                            className="font-sans font-bold text-sm tracking-wide"
                            style={{ color: 'rgba(248,248,246,0.9)' }}
                          >
                            {member.name}
                          </span>
                        </div>
                        <span
                          className="font-mono-code text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full"
                          style={{
                            color: accentColor,
                            backgroundColor: `${accentColor}15`,
                            border: `1px solid ${accentColor}40`,
                          }}
                        >
                          {member.role.split(' ')[0]}
                        </span>
                      </div>
                      <span
                        className="block font-mono-code text-[10px] mt-1.5 uppercase tracking-wider pl-4 text-[#6B7280]"
                      >
                        {member.role}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={member.portfolio}
                        className="font-mono-code text-[10px] tracking-widest uppercase font-bold flex items-center gap-1 transition-colors text-[#6B7280] hover:text-[#e8b84b]"
                      >
                        <span>PORTFOLIO</span>
                        <ExternalLink size={10} style={{ color: GOLD }} />
                      </a>
                      <span style={{ color: 'rgba(107,114,128,0.2)' }} className="text-xs">|</span>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono-code text-[10px] tracking-widest uppercase flex items-center gap-1 transition-colors text-[#6B7280] hover:text-white"
                      >
                        <Github size={10} />
                        <span>GH</span>
                      </a>
                      <span style={{ color: 'rgba(107,114,128,0.2)' }} className="text-xs">|</span>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono-code text-[10px] tracking-widest uppercase flex items-center gap-1 transition-colors text-[#6B7280] hover:text-white"
                      >
                        <Linkedin size={10} />
                        <span>LN</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center select-none">
          <span className="font-mono-code text-[9px] tracking-[0.25em] uppercase text-[#6B7280]">
            ✦ © 2026 FREY. Build with Frey.
          </span>
          <span
            style={{
              color: GOLD,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontSize: '13px',
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

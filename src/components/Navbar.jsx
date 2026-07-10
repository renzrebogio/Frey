import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import freyLogo from '../uploads/freylogo.png';

export function Navbar({ isScrolled, mobileMenuOpen, setMobileMenuOpen }) {
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleScrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Services', id: 'discover' },
    { label: 'About', id: 'team' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      id="global-navbar"
      style={{
        transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.94)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px) saturate(160%)' : 'none',
        borderBottom: isScrolled
          ? '1px solid rgba(232, 161, 32, 0.15)'
          : '1px solid transparent',
        boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
      }}
      className={`fixed top-0 inset-x-0 z-40 px-6 py-4 sm:px-10 sm:py-5 flex items-center justify-between ${
        isScrolled ? 'py-3 sm:py-4' : ''
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 group">
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <img
            src={freyLogo}
            alt="Frey Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain opacity-100 transition-transform group-hover:scale-105"
            style={{ filter: 'drop-shadow(0 0 12px rgba(232,161,32,0.8)) brightness(1.2) contrast(1.1)' }}
          />
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              color: '#F8F8F6',
              letterSpacing: '0.22em',
              transition: 'text-shadow 300ms ease',
            }}
            className="text-lg uppercase font-black drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] group-hover:[text-shadow:0_0_12px_rgba(232,161,32,0.4)]"
          >
            FREY
          </span>
          {/* Gold diamond sigil */}
          <span
            style={{ color: '#e8a120', fontSize: '10px', lineHeight: 1 }}
            aria-hidden="true"
          >
            ✦
          </span>
        </div>

        <div className="hidden sm:flex h-3 w-[1px] bg-white/20" />
        <span
          className="hidden sm:inline font-mono-code text-[9px] tracking-widest uppercase text-[#9CA3AF] opacity-80"
        >
          SOFTWARE SERVICES
        </span>
      </div>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
        {navLinks.map((link) => (
          <button
            key={link.label}
            type="button"
            onClick={() => handleScrollTo(link.id)}
            onMouseEnter={() => setHoveredLink(link.id)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'rgba(209,213,219,0.7)',
              position: 'relative',
            }}
            className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase cursor-pointer group transition-colors duration-200 hover:text-[#e8b84b] flex items-center"
          >
            {/* Hover dot */}
            <span 
              className="text-[#e8a120] mr-1.5 transition-opacity duration-200 absolute -left-3"
              style={{ opacity: hoveredLink === link.id ? 1 : 0 }}
            >
              ·
            </span>
            {link.label}
            
            {/* Gold underline sweep */}
            <span
              style={{
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, #e8a120, #e8b84b)',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 250ms cubic-bezier(0.4,0,0.2,1)',
              }}
              className="group-hover:scale-x-100 block"
            />
          </button>
        ))}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4">
        {/* Desktop CTA */}
        <button
          type="button"
          onClick={() => handleScrollTo('contact')}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 font-sans text-[10px] font-bold tracking-[0.18em] uppercase cursor-pointer transition-all duration-300 hover:opacity-90 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #e8a120 0%, #c48212 100%)',
            color: '#0a0a0a',
            borderRadius: '2px',
            boxShadow: '0 4px 16px rgba(232,161,32,0.25)',
          }}
        >
          Build with Frey
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{ color: '#e8b84b' }}
          className="md:hidden p-1 cursor-pointer hover:opacity-80"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <div
        style={{
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: 'rgba(10,10,10,0.98)',
          backdropFilter: 'blur(24px)',
        }}
        className="fixed inset-x-0 top-0 h-screen z-[-1] border-b border-white/5 md:hidden flex flex-col justify-center px-10 space-y-8 select-text"
      >
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(232,161,32,0.06) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        <span
          style={{ color: 'rgba(232,161,32,0.4)' }}
          className="font-mono-code text-[9px] tracking-[0.3em] uppercase border-b border-white/5 pb-4 text-left"
        >
          Navigation
        </span>

        {navLinks.map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={() => handleScrollTo(link.id)}
            style={{
              color: '#F8F8F6',
              letterSpacing: '0.05em',
            }}
            className="font-bebas text-left text-4xl uppercase hover:text-[#e8b84b] transition-colors duration-200 cursor-pointer"
          >
            {link.label}
          </button>
        ))}

        <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
          <button
            onClick={() => handleScrollTo('contact')}
            style={{
              background: 'linear-gradient(135deg, #e8a120, #e8b84b)',
              color: '#0a0a0a',
            }}
            className="w-full text-center py-3.5 font-sans font-bold text-sm tracking-widest uppercase rounded-full cursor-pointer hover:opacity-90 active:scale-95 transition-all"
          >
            Build with Frey
          </button>
          <div
            style={{ color: 'rgba(156,163,175,0.4)' }}
            className="text-center text-[10px] font-mono-code tracking-widest pt-2 uppercase"
          >
            © 2026 FREY. Build with Frey.
          </div>
        </div>
      </div>
    </nav>
  );
}

import { Menu, X } from 'lucide-react';

export function Navbar({ isScrolled, mobileMenuOpen, setMobileMenuOpen }) {
  const handleScrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      id="global-navbar"
      style={{
        transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: isScrolled ? 'rgba(9, 9, 11, 0.94)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px) saturate(160%)' : 'none',
        borderBottom: isScrolled
          ? '1px solid rgba(201, 150, 58, 0.18)'
          : '1px solid transparent',
        boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
      }}
      className={`fixed top-0 inset-x-0 z-40 px-6 py-4 sm:px-10 sm:py-5 flex items-center justify-between ${
        isScrolled ? 'py-3 sm:py-4' : ''
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              color: '#E8B84B',
              letterSpacing: '0.2em',
              textShadow: '0 0 20px rgba(201,150,58,0.4)',
            }}
            className="text-lg uppercase font-black drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
          >
            FREY
          </span>
          {/* Gold diamond sigil */}
          <span
            style={{ color: '#C9963A', fontSize: '10px', lineHeight: 1 }}
            aria-hidden="true"
          >
            ✦
          </span>
        </div>

        <div className="hidden sm:flex h-3 w-[1px] bg-white/20" />
        <span
          style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(156,163,175,0.6)' }}
          className="hidden sm:inline font-mono text-[9px] tracking-widest uppercase"
        >
          SOFTWARE SERVICES
        </span>
      </div>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center space-x-10 lg:space-x-14">
        {[
          { label: 'Team', id: 'frey-hero-section' },
          { label: 'Capabilities', id: 'discover' },
          { label: 'Projects', id: 'projects' },
        ].map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={() => handleScrollTo(link.id)}
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'rgba(209,213,219,0.7)',
              position: 'relative',
            }}
            className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase cursor-pointer group transition-colors duration-200 hover:text-[#E8B84B]"
          >
            {link.label}
            {/* Gold underline sweep */}
            <span
              style={{
                position: 'absolute',
                bottom: '-3px',
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, #C9963A, #E8B84B)',
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
        {/* ONLINE status pill */}
        <div
          style={{
            border: '1px solid rgba(201,150,58,0.25)',
            backgroundColor: 'rgba(201,150,58,0.06)',
          }}
          className="flex items-center gap-2 px-3 py-1 rounded-full select-none"
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#C9963A',
              display: 'inline-block',
              animation: 'gold-pulse 2s ease-in-out infinite',
              boxShadow: '0 0 6px rgba(201,150,58,0.8)',
            }}
          />
          <span
            style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(201,150,58,0.8)' }}
            className="text-[9px] font-mono tracking-wider"
          >
            ONLINE
          </span>
        </div>

        {/* Contact CTA — gold border → fill */}
        <button
          onClick={() => handleScrollTo('contact')}
          style={{
            fontFamily: "'Inter', sans-serif",
            border: '1px solid rgba(201,150,58,0.5)',
            color: '#E8B84B',
            transition: 'all 200ms ease',
          }}
          className="hidden md:inline-flex px-5 py-1.5 rounded-full text-[10px] font-mono tracking-widest font-bold uppercase cursor-pointer hover:bg-[#C9963A] hover:text-black hover:border-[#C9963A] active:scale-97"
        >
          Contact
        </button>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{ color: '#E8B84B' }}
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
          backgroundColor: 'rgba(9,9,11,0.98)',
          backdropFilter: 'blur(24px)',
        }}
        className="fixed inset-x-0 top-0 h-screen z-[-1] border-b border-white/5 md:hidden flex flex-col justify-center px-10 space-y-8 select-text"
      >
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,150,58,0.06) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        <span
          style={{ color: 'rgba(201,150,58,0.3)', fontFamily: "'Inter', sans-serif" }}
          className="font-mono text-[9px] tracking-[0.3em] uppercase border-b border-white/5 pb-4 text-left"
        >
          Navigation
        </span>

        {[
          { label: 'Team Registry', id: 'frey-hero-section' },
          { label: 'Capabilities', id: 'discover' },
          { label: 'Selected Work', id: 'projects' },
          { label: 'Contact', id: 'contact' },
        ].map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={() => handleScrollTo(link.id)}
            style={{
              fontFamily: "'Anton', sans-serif",
              color: '#F8F8F6',
              letterSpacing: '0.05em',
            }}
            className="text-left text-3xl uppercase hover:text-[#E8B84B] transition-colors duration-200 cursor-pointer"
          >
            {link.label}
          </button>
        ))}

        <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
          <button
            onClick={() => handleScrollTo('contact')}
            style={{
              background: 'linear-gradient(135deg, #C9963A, #E8B84B)',
              color: '#09090B',
              fontFamily: "'Inter', sans-serif",
            }}
            className="w-full text-center py-3 font-mono font-bold text-xs uppercase rounded-full cursor-pointer hover:opacity-90 active:scale-97 transition-all"
          >
            Build with Frey
          </button>
          <div
            style={{ color: 'rgba(107,114,128,0.4)', fontFamily: "'Inter', sans-serif" }}
            className="text-center text-[9px] font-mono tracking-widest pt-2"
          >
            © 2026 FREY. Build with Frey.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gold-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px rgba(201,150,58,0.8); }
          50%       { opacity: 0.5; box-shadow: 0 0 2px rgba(201,150,58,0.4); }
        }
        #global-navbar button span.block {
          display: block;
        }
      `}</style>
    </nav>
  );
}

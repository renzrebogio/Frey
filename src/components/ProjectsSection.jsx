import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PROJECTS, GOLD, GOLD_BRIGHT, GOLD_GLOW } from '../data';

const SILVER = '#9CA3AF';

/* ─── Placeholder SVG Thumbnails ─── */

function BookstoreSVG() {
  return (
    <svg viewBox="0 0 480 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="120" fill="#0a0a0a" />
      {[30, 60, 90].map(y => (
        <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="#1a1a1a" strokeWidth="0.5" />
      ))}
      {[20, 50, 80, 110, 140, 170, 200, 230, 260, 290].map((x, i) => (
        <rect key={i} x={x} y={12} width={22} height={76}
          fill="none" stroke={i % 3 === 0 ? GOLD : '#1e1e1e'} strokeWidth="0.8"
          opacity={i % 3 === 0 ? 0.6 : 0.3} rx="1" />
      ))}
      <rect x="340" y="25" width="110" height="65" fill="#111" rx="4" />
      <circle cx="365" cy="78" r="5" fill="none" stroke={GOLD} strokeWidth="1.5" opacity="0.7" />
      <circle cx="430" cy="78" r="5" fill="none" stroke={GOLD} strokeWidth="1.5" opacity="0.7" />
      <polyline points="350,38 360,38 370,60 435,60 440,42 360,42"
        fill="none" stroke={GOLD} strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
      <text x="10" y="115" fill="#1c1c1c" fontFamily="'JetBrains Mono', monospace" fontSize="7" fontWeight="bold">
        FULL-STACK / SSC-R DE CAVITE
      </text>
    </svg>
  );
}

function GarageSVG() {
  return (
    <svg viewBox="0 0 240 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="240" height="120" fill="#0a0a0a" />
      <rect x="40" y="20" width="160" height="75" fill="#111" rx="2" stroke="#1e1e1e" strokeWidth="0.8" />
      {[35, 50, 65, 80].map((y, i) => (
        <rect key={i} x="44" y={y} width="152" height="12" fill="#151515" rx="1" />
      ))}
      <circle cx="120" cy="10" r="4" fill={GOLD} opacity="0.8" />
      <circle cx="120" cy="10" r="7" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.4" />
      {[8, 14, 20].map((r, i) => (
        <path key={i} d={`M ${120 - r} ${10 - r * 0.6} A ${r} ${r} 0 0 1 ${120 + r} ${10 - r * 0.6}`}
          fill="none" stroke={GOLD} strokeWidth="0.8" opacity={0.6 - i * 0.15} />
      ))}
      <text x="10" y="115" fill="#1c1c1c" fontFamily="'JetBrains Mono', monospace" fontSize="7" fontWeight="bold">
        IOT / ARDUINO + FIREBASE
      </text>
    </svg>
  );
}

function SneakerSVG() {
  return (
    <svg viewBox="0 0 240 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="240" height="120" fill="#0a0a0a" />
      <path d="M30,85 Q50,75 70,72 Q90,68 110,65 Q135,60 155,62 Q175,64 195,70 L200,85 Q170,90 140,88 Q100,88 60,90 Z"
        fill="#151515" stroke={GOLD} strokeWidth="1" opacity="0.8" />
      <path d="M40,85 Q120,82 200,85 L200,92 Q120,95 40,92 Z" fill="#1a1a1a" />
      {[90, 110, 130].map((x, i) => (
        <line key={i} x1={x} y1="70" x2={x + 20} y2="72" stroke={GOLD_BRIGHT} strokeWidth="0.8" opacity="0.5" />
      ))}
      <text x="50" y="30" fill={GOLD} fontSize="10" opacity="0.3">✦</text>
      <text x="170" y="25" fill={GOLD} fontSize="8" opacity="0.2">✦</text>
      <text x="10" y="115" fill="#1c1c1c" fontFamily="'JetBrains Mono', monospace" fontSize="7" fontWeight="bold">
        FRONTEND / PREMIUM STOREFRONT
      </text>
    </svg>
  );
}

function BrewSVG() {
  return (
    <svg viewBox="0 0 240 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="240" height="120" fill="#0a0a0a" />
      <path d="M90,40 L85,90 L155,90 L150,40 Z" fill="#111" stroke={GOLD} strokeWidth="1" opacity="0.6" />
      <path d="M150,55 Q175,55 175,72 Q175,88 150,88" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.5" />
      {[100, 115, 130].map((x, i) => (
        <path key={i} d={`M${x},38 Q${x + 5},30 ${x},22 Q${x - 4},14 ${x},8`}
          fill="none" stroke={GOLD_BRIGHT} strokeWidth="0.8" opacity={0.4 - i * 0.1} strokeLinecap="round" />
      ))}
      <ellipse cx="120" cy="91" rx="40" ry="5" fill="#151515" />
      <text x="10" y="115" fill="#1c1c1c" fontFamily="'JetBrains Mono', monospace" fontSize="7" fontWeight="bold">
        FRONTEND / ARTISAN COFFEE BRAND
      </text>
    </svg>
  );
}

function FashionSVG() {
  return (
    <svg viewBox="0 0 240 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="240" height="120" fill="#0a0a0a" />
      <path d="M120,18 L120,30 Q85,42 60,55 L60,90 L180,90 L180,55 Q155,42 120,30"
        fill="none" stroke={GOLD} strokeWidth="1" opacity="0.55" strokeLinejoin="round" />
      <circle cx="120" cy="17" r="3" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.6" />
      <path d="M85,55 L75,90 L165,90 L155,55 Q140,48 120,46 Q100,48 85,55Z" fill="#141414" />
      <line x1="120" y1="50" x2="120" y2="88" stroke={GOLD} strokeWidth="0.5" strokeDasharray="3,4" opacity="0.3" />
      <text x="10" y="115" fill="#1c1c1c" fontFamily="'JetBrains Mono', monospace" fontSize="7" fontWeight="bold">
        FRONTEND / CLOTHING LABEL
      </text>
    </svg>
  );
}

const SVG_MAP = {
  0: BookstoreSVG,
  1: GarageSVG,
  2: SneakerSVG,
  3: BrewSVG,
  4: FashionSVG,
};

/* ─── Status Badge ─── */
function StatusBadge({ status }) {
  const config = {
    live:       { label: '● LIVE',      color: GOLD_BRIGHT, bg: 'rgba(232,184,75,0.1)', border: 'rgba(232,184,75,0.3)' },
    certified:  { label: '✦ CERTIFIED', color: GOLD,        bg: 'rgba(232,161,32,0.1)', border: 'rgba(232,161,32,0.3)' },
    active:     { label: '◆ ACTIVE',    color: SILVER,      bg: 'rgba(156,163,175,0.08)', border: 'rgba(156,163,175,0.2)' },
    research:   { label: '○ RESEARCH',  color: '#4B5563',   bg: 'transparent',          border: '#1F2937' },
  };
  const c = config[status] || config.active;
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '8px',
      color: c.color,
      backgroundColor: c.bg,
      border: `1px solid ${c.border}`,
      padding: '3px 8px',
      display: 'inline-flex',
      alignItems: 'center',
      letterSpacing: '0.12em',
      borderRadius: '2px'
    }}>
      {c.label}
    </span>
  );
}

/* ─── Expand Panel ─── */
function ExpandPanel({ project, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.offsetHeight;
      panelRef.current.style.opacity = '1';
      panelRef.current.style.transform = 'translateY(0)';
    }
  }, []);

  return (
    <div
      ref={panelRef}
      style={{
        gridColumn: '1 / -1',
        background: '#0a0a0a',
        borderTop: `1px solid rgba(232,161,32,0.15)`,
        borderBottom: `1px solid rgba(232,161,32,0.15)`,
        padding: '32px 28px',
        opacity: 0,
        transform: 'translateY(-6px)',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#F8F8F6', marginBottom: '10px', fontFamily: "'Inter', sans-serif" }}>
            {project.title}
          </h3>
          <p style={{ fontSize: '13px', color: SILVER, lineHeight: 1.7, maxWidth: '600px', fontFamily: "'JetBrains Mono', monospace", opacity: 0.8 }}>
            {project.expandDesc}
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: `1px solid rgba(232,161,32,0.2)`,
            color: SILVER,
            cursor: 'pointer',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            padding: '6px 12px',
            transition: 'all 0.2s',
            flexShrink: 0,
            marginLeft: '16px',
          }}
          onMouseEnter={(e) => { e.target.style.borderColor = GOLD; e.target.style.color = GOLD_BRIGHT; }}
          onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(232,161,32,0.2)'; e.target.style.color = SILVER; }}
        >
          ✕ Close
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {project.metrics.map((m, i) => (
          <div key={i} style={{
            background: '#111111',
            border: `1px solid rgba(232,161,32,0.12)`,
            padding: '16px 14px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: GOLD_GLOW, fontFamily: "'JetBrains Mono', monospace", marginBottom: '4px' }}>
              {m.value}
            </div>
            <div style={{ fontSize: '9px', color: '#888', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ project, isExpanded, onToggle, index, isMobileSlider = false }) {
  const [hovered, setHovered] = useState(false);
  const ThumbSVG = SVG_MAP[project.id] || SVG_MAP[project.id % 5];
  const cardRef  = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 0.5, 1]);
  const y       = useTransform(scrollYProgress, [0, 0.5, 0.8], [80, 20, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.5, 0.8], [0.9, 0.95, 1]);
  const filter  = useTransform(scrollYProgress, [0, 0.3, 0.6], ['blur(4px)', 'blur(1px)', 'blur(0px)']);

  const motionStyle = isMobileSlider
    ? {}
    : { opacity, y, scale, filter, willChange: 'transform, opacity' };

  return (
    <motion.div
      ref={cardRef}
      style={{
        ...motionStyle,
        gridColumn: 'span 1',
        background:  hovered ? '#0E0E12' : '#0a0a0a',
        border:      hovered ? `1px solid rgba(232,161,32,0.3)` : '1px solid rgba(232,161,32,0.08)',
        boxShadow:   hovered ? `0 12px 30px -10px rgba(232,161,32,0.15)` : 'none',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        padding: '22px 20px',
        display: 'flex',
        flexDirection: 'column',
        height: '420px',
        transform: (!isMobileSlider && hovered) ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 300ms cubic-bezier(0.25, 0.8, 0.25, 1), background 300ms ease, border-color 300ms ease, box-shadow 300ms ease',
        zIndex: 10,
        ...(isMobileSlider ? { width: '78vw', maxWidth: '300px', flexShrink: 0, height: '400px' } : {}),
      }}
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gold top bar sweep */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${GOLD_BRIGHT}, transparent)`,
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }} />

      {/* Scan-line sweep */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: '1px',
        background: `rgba(232,161,32,0.18)`,
        top: hovered ? '100%' : '0%',
        transition: hovered ? 'top 0.6s linear' : 'none',
        opacity: hovered ? 1 : 0,
        pointerEvents: 'none',
        zIndex: 20
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          {project.tag}
        </span>
        <StatusBadge status={project.status} />
      </div>

      {/* Thumbnail */}
      <div style={{
        width: '100%', height: '140px', borderRadius: '2px',
        overflow: 'hidden', marginBottom: '16px', background: '#0a0a0a',
        border: '1px solid rgba(232,161,32,0.06)',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 350ms cubic-bezier(0.25, 0.8, 0.25, 1)',
        position: 'relative'
      }}>
        {project.img ? (
          <img src={project.img} alt={project.title} style={{ 
            width: '100%', height: '100%', 
            objectFit: project.imgFit || 'contain', 
            backgroundColor: project.imgBg || '#0a0a0a',
            transform: project.imgScale ? `scale(${project.imgScale})` : 'none'
          }} />
        ) : (
          ThumbSVG && <ThumbSVG />
        )}

        {/* Hover overlay VIEW PROJECT */}
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0, transition: 'opacity 300ms ease',
          backdropFilter: 'blur(2px)'
        }}>
          <span style={{ 
            fontFamily: "'JetBrains Mono', monospace", 
            color: GOLD_BRIGHT, fontSize: '12px', 
            letterSpacing: '0.15em', textTransform: 'uppercase'
          }}>
            VIEW PROJECT &rarr;
          </span>
        </div>
      </div>

      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#555', marginBottom: '8px' }}>
        {project.num} / {project.category.toUpperCase()}
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#F8F8F6', marginBottom: '10px', fontFamily: "'Inter', sans-serif" }}>
        {project.title}
      </h3>

      <p style={{ fontSize: '12px', color: '#888', lineHeight: 1.6, marginBottom: '20px', fontFamily: "'Inter', sans-serif", flexGrow: 1 }}>
        {project.desc}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1a1a1a', paddingTop: '16px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {project.tech.map((t, i) => (
            <span key={i} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '9px',
              color: '#c0c0c0', background: '#111111',
              border: `1px solid ${hovered ? 'rgba(232,161,32,0.25)' : '#1a1a1a'}`,
              padding: '4px 8px', display: 'inline-block',
              transition: 'all 0.3s ease',
            }}>
              {t}
            </span>
          ))}
        </div>
        <span style={{
          fontSize: '18px',
          color: hovered ? GOLD_BRIGHT : '#444',
          transition: 'all 0.3s ease',
          transform: hovered ? 'translate(4px, -4px)' : 'translate(0, 0)',
          display: 'inline-block',
        }}>
          ↗
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Mobile Slider ─── */
function MobileProjectSlider({ projects }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedId, setExpandedId]   = useState(null);
  const [dragOffset, setDragOffset]   = useState(0);
  const [isDragging, setIsDragging]   = useState(false);
  const containerRef = useRef(null);

  const CARD_WIDTH_VW = 80;
  const GAP           = 12;
  const PADDING_LEFT  = 16;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0, startY = 0, currentX = 0, locked = null, active = false;

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      currentX = startX;
      locked = null; active = true;
      setIsDragging(false); setDragOffset(0);
    };
    const onTouchMove = (e) => {
      if (!active) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      if (!locked && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
        locked = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v';
      }
      if (locked === 'h') {
        e.preventDefault();
        currentX = e.touches[0].clientX;
        setIsDragging(true); setDragOffset(dx);
      }
    };
    const onTouchEnd = () => {
      if (!active) return;
      active = false;
      const dx = currentX - startX;
      if (locked === 'h' && Math.abs(dx) > 40) {
        if (dx < 0) setActiveSlide(s => Math.min(s + 1, projects.length - 1));
        else        setActiveSlide(s => Math.max(s - 1, 0));
      }
      setIsDragging(false); setDragOffset(0); locked = null;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove',  onTouchMove,  { passive: false });
    el.addEventListener('touchend',   onTouchEnd,   { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove',  onTouchMove);
      el.removeEventListener('touchend',   onTouchEnd);
    };
  }, [projects.length]);

  const expandedProject = projects.find(p => p.id === expandedId);
  const baseTranslate   = `calc(${PADDING_LEFT}px - ${activeSlide} * (${CARD_WIDTH_VW}vw + ${GAP}px))`;
  const dragTranslate   = isDragging ? `${dragOffset}px` : '0px';

  return (
    <div style={{ width: '100%' }}>
      <div ref={containerRef} style={{ overflow: 'hidden', position: 'relative', cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none', WebkitUserSelect: 'none' }}>
        <div style={{
          display: 'flex', gap: `${GAP}px`,
          paddingBottom: '16px', paddingRight: '16px',
          transform: `translateX(calc(${baseTranslate} + ${dragTranslate}))`,
          transition: isDragging ? 'none' : 'transform 380ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}>
          {projects.map((project, i) => (
            <div key={project.id} style={{ flexShrink: 0, width: `${CARD_WIDTH_VW}vw`, maxWidth: '320px' }}>
              <ProjectCard
                project={project}
                index={i}
                isExpanded={expandedId === project.id}
                onToggle={() => { if (!isDragging) setExpandedId(prev => prev === project.id ? null : project.id); }}
                isMobileSlider={true}
              />
            </div>
          ))}
        </div>
      </div>

      {expandedProject && (
        <div style={{ margin: '0 16px' }}>
          <ExpandPanel project={expandedProject} onClose={() => setExpandedId(null)} />
        </div>
      )}

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '16px', paddingBottom: '4px' }}>
        {projects.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveSlide(i)}
            style={{
              width: i === activeSlide ? '22px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === activeSlide ? GOLD : '#2a2a2a',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      <p style={{ textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#555', letterSpacing: '0.15em', marginTop: '10px', textTransform: 'uppercase' }}>
        ← swipe to browse →
      </p>
    </div>
  );
}

/* ─── Main Section ─── */

const TABS = [
  { key: 'all',      label: 'All Work'  },
  { key: 'fullstack', label: 'Full-Stack' },
  { key: 'iot',      label: 'IoT'       },
  { key: 'frontend', label: 'Frontend'  },
];

export function ProjectsSection({
  activeProjectTab,
  setActiveProjectTab,
  setCurrentSelectedProject,
}) {
  const [expandedId, setExpandedId]   = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile]       = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const sectionX       = useTransform(scrollYProgress, [0, 0.15], ['5vw', '0vw']);
  const sectionScale   = useTransform(scrollYProgress, [0, 0.15], [0.98, 1]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const scannerTop     = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const filtered = PROJECTS.filter(
    p => activeProjectTab === 'all' || p.category === activeProjectTab
  );

  const ITEMS_PER_PAGE = 6;
  const totalPages     = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex     = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const count = String(filtered.length).padStart(2, '0');

  const handleTabChange = (key) => {
    setActiveProjectTab(key);
    setExpandedId(null);
    setCurrentSelectedProject(0);
    setCurrentPage(1);
  };

  const handleToggle = (id) => setExpandedId(prev => (prev === id ? null : id));

  const buildGrid = () => {
    const elements = [];
    let currentRow = [], currentRowSpan = 0;

    const flushRow = () => {
      currentRow.forEach((project, i) => {
        elements.push(
          <ProjectCard
            key={`card-${project.id}`}
            project={project}
            index={i}
            isExpanded={expandedId === project.id}
            onToggle={() => handleToggle(project.id)}
          />
        );
      });
      const expandedInRow = currentRow.find(p => p.id === expandedId);
      if (expandedInRow) {
        elements.push(
          <ExpandPanel
            key={`expand-${expandedInRow.id}`}
            project={expandedInRow}
            onClose={() => setExpandedId(null)}
          />
        );
      }
      currentRow = []; currentRowSpan = 0;
    };

    currentProjects.forEach((project) => {
      if (currentRowSpan + 1 > 3) flushRow();
      currentRow.push(project);
      currentRowSpan += 1;
      if (currentRowSpan >= 3) flushRow();
    });
    if (currentRow.length > 0) flushRow();
    return elements;
  };

  const tabLabel = (tab) => isMobile
    ? (tab.key === 'all' ? 'All' : tab.key === 'fullstack' ? 'Full-Stack' : tab.key === 'iot' ? 'IoT' : 'Frontend')
    : tab.label;

  return (
    <section
      ref={containerRef}
      id="projects"
      style={{
        width: '100%',
        background: '#0a0a0a',
        color: '#fff',
        padding: isMobile ? '60px 0' : '96px 0',
        fontFamily: "'Inter', sans-serif",
        borderTop: '1px solid rgba(232,161,32,0.1)',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Gold grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(232,161,32,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(232,161,32,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gold scanner laser */}
      <motion.div
        style={{
          position: 'absolute', top: scannerTop, left: 0, right: 0, height: '1px',
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          boxShadow: `0 0 20px 6px rgba(232,161,32,0.15), 0 0 6px 1px ${GOLD}`,
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      <motion.div
        style={{ x: sectionX, scale: sectionScale, opacity: sectionOpacity, width: '100%', position: 'relative', zIndex: 10 }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '12px' }}>
                SELECTED PROJECTS <span className="animate-pulse">█</span>
              </span>
              <h2 style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: 'clamp(48px, 8vw, 90px)', lineHeight: 0.9, textTransform: 'uppercase', letterSpacing: '0.02em', color: '#F8F8F6', margin: 0 }}>
                SELECTED WORK
              </h2>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#555', letterSpacing: '0.15em' }}>
              {TABS.find(t => t.key === activeProjectTab)?.label || 'All Work'} / {count}
            </span>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid rgba(232,161,32,0.1)', overflowX: isMobile ? 'auto' : 'visible' }}>
            {TABS.map(tab => {
              const isActive = activeProjectTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleTabChange(tab.key)}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: isMobile ? '10px' : '11px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    padding: isMobile ? '8px 14px' : '10px 20px',
                    borderRadius: '100px',
                    border: `1px solid ${isActive ? GOLD : 'rgba(232,161,32,0.15)'}`,
                    background: isActive ? 'rgba(232,161,32,0.1)' : 'transparent',
                    color: isActive ? GOLD_BRIGHT : '#888',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap',
                    boxShadow: isActive ? `0 1px 0 0 ${GOLD}` : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.color = GOLD_BRIGHT;
                      e.target.style.borderColor = 'rgba(232,161,32,0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.color = '#888';
                      e.target.style.borderColor = 'rgba(232,161,32,0.15)';
                    }
                  }}
                >
                  {tabLabel(tab)}
                </button>
              );
            })}
          </div>

          {/* Mobile Slider */}
          {isMobile ? (
            <div style={{ margin: '0 -20px' }}>
              <MobileProjectSlider projects={currentProjects} />
            </div>
          ) : (
            <>
              {/* Desktop Grid */}
              <div className="frey-project-grid" style={{ display: 'grid', gap: '1px', background: 'rgba(232,161,32,0.05)' }}>
                {buildGrid()}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', paddingTop: '20px', fontFamily: "'JetBrains Mono', monospace" }}>
                  <span style={{ fontSize: '11px', color: '#555', letterSpacing: '0.15em' }}>
                    PAGE {currentPage} OF {totalPages}
                  </span>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      style={{
                        background: 'none',
                        border: `1px solid ${currentPage === 1 ? '#1a1a1a' : 'rgba(232,161,32,0.4)'}`,
                        color: currentPage === 1 ? '#3a3a3a' : GOLD,
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        padding: '10px 20px',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      ← PREV
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      style={{
                        background: 'none',
                        border: `1px solid ${currentPage === totalPages ? '#1a1a1a' : 'rgba(232,161,32,0.4)'}`,
                        color: currentPage === totalPages ? '#3a3a3a' : GOLD,
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        padding: '10px 20px',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      NEXT →
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>

      <style>{`
        .frey-project-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 900px) {
          .frey-project-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}

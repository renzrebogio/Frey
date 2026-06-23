import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Mail, CheckCircle, Terminal, Send, Building2, HelpCircle } from 'lucide-react';

const GOLD        = '#C9963A';
const GOLD_BRIGHT = '#E8B84B';
const GOLD_GLOW   = '#F5D27A';

export function ContactSection() {
  const [name,        setName]        = useState('');
  const [email,       setEmail]       = useState('');
  const [projectType, setProjectType] = useState('website');
  const [budget,      setBudget]      = useState('mid');
  const [message,     setMessage]     = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [terminalPayload, setTerminalPayload] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const radarScale   = useTransform(scrollYProgress, [0, 1], [0.5, 2.5]);
  const radarOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 0.5, 0]);
  const radarRotate  = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const crosshairRotate  = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  const crosshairOpacity = useTransform(radarOpacity, (v) => v * 0.35);

  const leftColumnOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const leftColumnY       = useTransform(scrollYProgress, [0, 0.2], [80, 0]);
  const leftColumnFilter  = useTransform(scrollYProgress, [0, 0.2], ['blur(4px)', 'blur(0px)']);

  const rightColumnOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const rightColumnY       = useTransform(scrollYProgress, [0.05, 0.25], [100, 0]);
  const rightColumnScale   = useTransform(scrollYProgress, [0.05, 0.25], [0.92, 1]);
  const rightColumnFilter  = useTransform(scrollYProgress, [0.05, 0.25], ['blur(4px)', 'blur(0px)']);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTerminalPayload({
        status: 'INQUIRY_RECEIVED',
        timestamp: new Date().toISOString(),
        ref: `FREY-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        payload: {
          clientName: name,
          clientEmail: email,
          projectType,
          budget,
          messageLength: message.length,
        },
      });
    }, 1500);
  };

  const resetForm = () => {
    setName(''); setEmail(''); setProjectType('website');
    setBudget('mid'); setMessage('');
    setSubmitSuccess(false); setTerminalPayload(null);
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full bg-transparent text-white py-24 sm:py-32 select-text overflow-hidden"
      style={{
        fontFamily: "'Inter', sans-serif",
        borderTop: '1px solid rgba(201,150,58,0.08)',
        backgroundImage: `radial-gradient(circle at 85% 25%, rgba(201,150,58,0.04), transparent 40%), radial-gradient(circle at 10% 75%, rgba(146,113,42,0.03), transparent 50%)`,
      }}
    >
      {/* Gold radar rings */}
      <motion.div
        className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 border rounded-full"
        style={{ width: '50vw', height: '50vw', scale: radarScale, opacity: radarOpacity, borderColor: 'rgba(201,150,58,0.2)' }}
      />
      <motion.div
        className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 border border-dashed rounded-full"
        style={{ width: '30vw', height: '30vw', scale: radarScale, rotate: radarRotate, opacity: radarOpacity, borderColor: 'rgba(201,150,58,0.15)' }}
      />
      {/* Rotating crosshair */}
      <motion.div
        className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        style={{ width: '60vw', height: '60vw', rotate: crosshairRotate, opacity: crosshairOpacity }}
      >
        <div style={{ backgroundColor: 'rgba(201,150,58,0.25)' }} className="absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2" />
        <div style={{ backgroundColor: 'rgba(201,150,58,0.25)' }} className="absolute left-0 right-0 top-1/2 h-[1px] -translate-y-1/2" />
      </motion.div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,150,58,0.04) 1px, transparent 0)`,
          backgroundSize: '35px 35px',
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: GOLD, opacity: 0.012 }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-between h-full"
            style={{ opacity: leftColumnOpacity, y: leftColumnY, filter: leftColumnFilter, willChange: 'transform, opacity, filter' }}
          >
            <div>
              <span style={{ color: GOLD, fontFamily: "'Inter', sans-serif" }}
                className="text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase block mb-4">
                GET IN TOUCH
              </span>

              {/* Heading: LET'S BUILD + italic "together." in gold */}
              <h2 style={{ fontFamily: "'Anton', sans-serif" }}
                className="text-white text-5xl sm:text-7xl lg:text-8xl leading-none uppercase mb-2">
                LET'S BUILD
              </h2>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: GOLD_GLOW,
                fontSize: 'clamp(28px, 5vw, 52px)',
                fontStyle: 'italic',
                lineHeight: 1.1,
                marginBottom: '24px',
              }}>
                together.
              </p>

              <p className="text-sm sm:text-base leading-relaxed mb-10 text-left"
                style={{ color: 'rgba(156,163,175,0.7)' }}>
                Ready to start a project, discuss an idea, or just say hello?
                Fill out the form or reach us directly — our team responds within one business day.
              </p>
            </div>

            {/* Contact channels */}
            <div className="space-y-6 pt-6" style={{ borderTop: '1px solid rgba(201,150,58,0.1)' }}>
              <div className="flex gap-4 items-start text-left">
                <div style={{ borderColor: 'rgba(201,150,58,0.2)', color: GOLD, backgroundColor: 'rgba(201,150,58,0.05)' }}
                  className="p-3 border rounded-xl">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="block font-mono text-[10px] tracking-wider" style={{ color: 'rgba(107,114,128,0.7)' }}>EMAIL</span>
                  <a href="mailto:contact@frey.io?subject=Inquiry%20to%20FREY"
                    className="text-sm font-semibold hover:text-white transition-colors"
                    style={{ color: '#D1D5DB' }}>
                    contact@frey.io
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start text-left">
                <div style={{ borderColor: 'rgba(201,150,58,0.2)', color: GOLD, backgroundColor: 'rgba(201,150,58,0.05)' }}
                  className="p-3 border rounded-xl">
                  <Building2 size={16} />
                </div>
                <div>
                  <span className="block font-mono text-[10px] tracking-wider" style={{ color: 'rgba(107,114,128,0.7)' }}>LOCATION</span>
                  <span className="text-sm" style={{ color: 'rgba(209,213,219,0.7)' }}>
                    Cavite, Philippines
                  </span>
                </div>
              </div>
            </div>

            {/* Brand quote */}
            <div className="hidden lg:block mt-10 p-5 rounded-2xl text-left"
              style={{ backgroundColor: 'rgba(201,150,58,0.04)', border: '1px solid rgba(201,150,58,0.1)' }}>
              <span className="font-mono text-[9px] uppercase tracking-widest block mb-2" style={{ color: GOLD }}>
                ✦ FREY COLLECTIVE
              </span>
              <p className="text-[11px] font-mono leading-relaxed" style={{ color: 'rgba(107,114,128,0.7)' }}>
                We are a close-knit team of computer engineers building software that lasts. Every project is crafted with intention, precision, and pride.
              </p>
            </div>
          </motion.div>

          {/* Right Column — Form */}
          <motion.div
            className="lg:col-span-7"
            style={{ opacity: rightColumnOpacity, y: rightColumnY, scale: rightColumnScale, filter: rightColumnFilter, willChange: 'transform, opacity, filter' }}
          >
            <div className="w-full rounded-[32px] p-6 sm:p-10 relative overflow-hidden shadow-2xl"
              style={{ backgroundColor: '#0C0C10', border: '1px solid rgba(201,150,58,0.1)' }}>

              {/* Gold shine backplate */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: GOLD, opacity: 0.015 }} />

              {!submitSuccess ? (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col text-left">
                      <label htmlFor="client-name-input"
                        className="font-mono text-[10px] uppercase tracking-widest mb-2 block"
                        style={{ color: 'rgba(107,114,128,0.7)' }}>
                        Your Name*
                      </label>
                      <input
                        id="client-name-input"
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. John Santos"
                        className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(201,150,58,0.15)',
                          placeholder: 'rgba(107,114,128,0.4)',
                        }}
                        onFocus={e => e.target.style.borderColor = 'rgba(201,150,58,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(201,150,58,0.15)'}
                      />
                    </div>
                    <div className="flex flex-col text-left">
                      <label htmlFor="client-email-input"
                        className="font-mono text-[10px] uppercase tracking-widest mb-2 block"
                        style={{ color: 'rgba(107,114,128,0.7)' }}>
                        Email Address*
                      </label>
                      <input
                        id="client-email-input"
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="e.g. hello@yourco.com"
                        className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(201,150,58,0.15)',
                        }}
                        onFocus={e => e.target.style.borderColor = 'rgba(201,150,58,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(201,150,58,0.15)'}
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[10px] uppercase tracking-widest mb-3 block"
                      style={{ color: 'rgba(107,114,128,0.7)' }}>
                      Project Type
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'website',  label: 'Website / Web App',  sub: 'React, Next.js, Full-Stack' },
                        { id: 'iot',      label: 'IoT / Embedded',     sub: 'Arduino, Firebase, Hardware' },
                        { id: 'other',    label: 'Other / Consulting',  sub: 'Design, Research, Ops' },
                      ].map(type => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setProjectType(type.id)}
                          style={{
                            backgroundColor: projectType === type.id ? 'rgba(201,150,58,0.12)' : 'rgba(255,255,255,0.01)',
                            borderColor:     projectType === type.id ? GOLD : 'rgba(201,150,58,0.1)',
                            color:           projectType === type.id ? '#F8F8F6' : 'rgba(255,255,255,0.45)',
                            transition: 'all 300ms ease',
                          }}
                          className="p-4 rounded-xl border text-left outline-none cursor-pointer flex flex-col justify-between"
                        >
                          <span className="text-[11px] font-bold tracking-wider block mb-1 uppercase font-mono">{type.label}</span>
                          <span className="text-[9px]" style={{ color: 'rgba(107,114,128,0.6)' }}>{type.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[10px] uppercase tracking-widest mb-3 block"
                      style={{ color: 'rgba(107,114,128,0.7)' }}>
                      Budget Range
                    </span>
                    <div className="grid grid-cols-3 rounded-xl p-1 items-center"
                      style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,150,58,0.1)' }}>
                      {[
                        { id: 'low',  range: '< ₱25K',     label: 'STARTER' },
                        { id: 'mid',  range: '₱25K–₱100K', label: 'GROWTH' },
                        { id: 'high', range: '₱100K +',    label: 'ENTERPRISE' },
                      ].map(bTier => (
                        <button
                          key={bTier.id}
                          type="button"
                          onClick={() => setBudget(bTier.id)}
                          style={{
                            backgroundColor: budget === bTier.id ? GOLD : 'transparent',
                            color: budget === bTier.id ? '#09090B' : 'rgba(255,255,255,0.45)',
                            transition: 'all 250ms ease',
                          }}
                          className="text-center py-2.5 rounded-lg outline-none cursor-pointer flex flex-col items-center"
                        >
                          <span className="font-mono text-[10px] tracking-wider uppercase font-bold">{bTier.range}</span>
                          <span style={{ color: budget === bTier.id ? 'rgba(9,9,11,0.55)' : 'rgba(107,114,128,0.5)', transition: 'color 250ms' }}
                            className="text-[8px] tracking-tight">{bTier.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="client-statement-input"
                      className="font-mono text-[10px] uppercase tracking-widest mb-2 block"
                      style={{ color: 'rgba(107,114,128,0.7)' }}>
                      Tell us about your project*
                    </label>
                    <textarea
                      id="client-statement-input"
                      required
                      rows={4}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Describe what you need, your goals, timeline, or anything useful..."
                      className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all resize-none"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(201,150,58,0.15)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(201,150,58,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(201,150,58,0.15)'}
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(201,150,58,0.08)' }}>
                    <div className="flex items-center gap-2">
                      <HelpCircle size={14} style={{ color: 'rgba(107,114,128,0.5)' }} />
                      <span className="text-[10px] font-mono" style={{ color: 'rgba(107,114,128,0.5)' }}>* Required fields</span>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || !name || !email || !message}
                      style={{
                        background: (isSubmitting || !name || !email || !message)
                          ? 'rgba(255,255,255,0.08)'
                          : `linear-gradient(135deg, ${GOLD}, ${GOLD_BRIGHT})`,
                        color: (isSubmitting || !name || !email || !message) ? 'rgba(255,255,255,0.3)' : '#09090B',
                        transition: 'all 300ms ease',
                      }}
                      className="px-6 py-3 text-xs font-mono tracking-widest uppercase font-bold rounded-full flex items-center gap-2 hover:scale-[1.03] active:scale-97 cursor-pointer disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          SENDING...
                        </>
                      ) : (
                        <>
                          <span>Build with Frey</span>
                          <Send size={12} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Success state */
                <div className="relative z-10 flex flex-col justify-between min-h-[380px]">
                  <div className="text-left mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div style={{ backgroundColor: 'rgba(201,150,58,0.12)', border: `1px solid rgba(201,150,58,0.3)`, color: GOLD_BRIGHT }}
                        className="w-10 h-10 rounded-full flex items-center justify-center">
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <h4 className="text-white text-lg font-bold tracking-tight">Message received!</h4>
                        <span className="text-[10px] font-mono uppercase tracking-wider block"
                          style={{ color: 'rgba(107,114,128,0.6)' }}>We'll be in touch soon</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'rgba(156,163,175,0.7)' }}>
                      Thank you for reaching out. We've received your message and our team will respond within one business day.
                    </p>
                  </div>

                  {/* Receipt terminal */}
                  <div className="rounded-2xl p-5 font-mono text-xs text-left mb-6"
                    style={{ backgroundColor: '#08080a', border: '1px solid rgba(201,150,58,0.08)' }}>
                    <div className="flex items-center justify-between pb-3 mb-3" style={{ borderBottom: '1px solid rgba(201,150,58,0.08)' }}>
                      <div className="flex items-center gap-2">
                        <Terminal size={14} style={{ color: 'rgba(107,114,128,0.5)' }} />
                        <span className="font-bold font-mono" style={{ color: 'rgba(156,163,175,0.7)', fontSize: '11px' }}>inquiry-receipt</span>
                      </div>
                      <span className="font-mono text-[10px] tracking-wide" style={{ color: GOLD }}>
                        [RECEIVED]
                      </span>
                    </div>
                    <pre className="text-[11px] leading-tight overflow-x-auto max-h-[140px] font-mono select-text whitespace-pre-wrap"
                      style={{ color: 'rgba(107,114,128,0.7)' }}>
                      {JSON.stringify(terminalPayload, null, 2)}
                    </pre>
                  </div>

                  <div className="pt-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(201,150,58,0.08)' }}>
                    <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: 'rgba(107,114,128,0.4)' }}>
                      REF: {terminalPayload?.ref || 'N/A'}
                    </span>
                    <button
                      type="button"
                      onClick={resetForm}
                      style={{ borderColor: 'rgba(201,150,58,0.25)', backgroundColor: 'rgba(201,150,58,0.06)', color: GOLD }}
                      className="px-5 py-2.5 rounded-full font-mono text-[10px] tracking-widest uppercase font-bold cursor-pointer hover:bg-[rgba(201,150,58,0.12)] transition-all"
                    >
                      [ NEW MESSAGE ]
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gold bottom divider */}
      <div
        className="absolute bottom-0 left-0 w-full h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(201,150,58,0.3), transparent)`,
          boxShadow: `0 -8px 16px rgba(201,150,58,0.08)`,
        }}
      />
    </section>
  );
}

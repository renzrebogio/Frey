import { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';

// Component imports
import { Splash } from './components/Splash.jsx';
import { Navbar } from './components/Navbar.jsx';
import { HeroSection } from './components/HeroSection.jsx';
import { Capabilities } from './components/Capabilities.jsx';
import { TeamSection } from './components/TeamSection.jsx';
import { ProjectsSection } from './components/ProjectsSection.jsx';
import { ContactSection } from './components/ContactSection.jsx';
import { Footer } from './components/Footer.jsx';
import { CelestialCanvas } from './components/DensePcbCanvas.jsx';
import { FreyTransition } from './components/FreyTransition.jsx';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Navigation states
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll Progress Thread
  const { scrollYProgress } = useScroll();

  // Always reset scroll position to topmost part of the page on refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Monitor scroll for dynamic navigation bar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Sandbox state selectors for Projects Section
  const [activeProjectTab, setActiveProjectTab] = useState('all');
  const [currentSelectedProject, setCurrentSelectedProject] = useState(0);

  // Handle splash screen timing + body scroll lock
  useEffect(() => {
    // Lock body scroll while splash is visible (prevents scroll bleed-through)
    document.body.style.overflow = 'hidden';

    // Phase 4 (4000ms): curtains open — release scroll lock immediately
    const unlockTimer = setTimeout(() => {
      document.body.style.overflow = '';
    }, 4000);

    // Phase 5 (5200ms): fully unmount splash DOM node
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 5200);

    return () => {
      clearTimeout(unlockTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Thread */}
      <motion.div
        className="fixed top-0 right-0 w-[2px] h-full bg-[#e8a120] z-50 origin-top opacity-60"
        style={{ scaleY: scrollYProgress }}
      />

      {showSplash && (
        <Splash />
      )}

      <Navbar
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <CelestialCanvas />

      {/* Render Order: Hero -> Services -> Team -> Transition -> Projects -> Contact -> Footer */}
      <HeroSection />

      <Capabilities />

      <TeamSection />

      <FreyTransition />

      <ProjectsSection
        activeProjectTab={activeProjectTab}
        setActiveProjectTab={setActiveProjectTab}
        currentSelectedProject={currentSelectedProject}
        setCurrentSelectedProject={setCurrentSelectedProject}
      />

      <ContactSection />

      <Footer />
    </>
  );
}

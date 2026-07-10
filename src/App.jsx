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
import { useHeroFrames } from './hooks/useHeroFrames.js';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Navigation states
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll Progress Thread
  const { scrollYProgress } = useScroll();

  // Hero frames preloader
  const { isLoaded: isFramesLoaded, images: heroFrames } = useHeroFrames();

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

    // Phase 4 (4000ms): curtains open — release scroll lock immediately, but wait for frames too
    const minimumTimePassed = new Promise(resolve => setTimeout(resolve, 4000));
    
    // We wait for both the minimum splash duration AND the frames to preload
    Promise.all([
      minimumTimePassed,
      // Create a promise that resolves when isFramesLoaded becomes true
      new Promise(resolve => {
        if (isFramesLoaded) resolve();
        else {
          const interval = setInterval(() => {
            if (isFramesLoaded) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
          
          // Fallback: don't wait forever, max 8 seconds total
          setTimeout(() => {
            clearInterval(interval);
            resolve();
          }, 8000);
        }
      })
    ]).then(() => {
      document.body.style.overflow = '';
      
      // Phase 5: fully unmount splash DOM node shortly after curtains open
      setTimeout(() => {
        setShowSplash(false);
      }, 1200);
    });

    return () => {
      document.body.style.overflow = '';
    };
  }, [isFramesLoaded]);

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

      {/* Hero Section Container (Sticky) */}
      <HeroSection images={heroFrames} splashDone={!showSplash} />

      {/* Main Content (Scrolls over the sticky hero section) */}
      {/* We pull this up by 100vh so it slides over the Hero section before it un-sticks */}
      <div className="relative z-20 bg-[#0a0a0a]" style={{ marginTop: '-100vh' }}>
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
      </div>
    </>
  );
}

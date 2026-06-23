import { useState, useEffect } from 'react';
import { IMAGES } from './data.js';

// Component imports
import { Splash } from './components/Splash.jsx';
import { Navbar } from './components/Navbar.jsx';
import { HeroSection } from './components/HeroSection.jsx';
import { Capabilities } from './components/Capabilities.jsx';
import { ProjectsSection } from './components/ProjectsSection.jsx';
import { ContactSection } from './components/ContactSection.jsx';
import { Footer } from './components/Footer.jsx';
import { CelestialCanvas } from './components/DensePcbCanvas.jsx';
import { FreyTransition } from './components/FreyTransition.jsx';

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [showSplash, setShowSplash] = useState(true);

  // Navigation states
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Preload images on mount
  useEffect(() => {
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  // Responsive boundary check + set --hero-vh CSS variable for mobile viewport fix
  useEffect(() => {
    const updateVH = () => {
      const vh = window.visualViewport
        ? window.visualViewport.height * 0.01
        : window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--hero-vh', `${vh}px`);
      setIsMobile(window.innerWidth < 640);
    };

    updateVH();

    window.addEventListener('resize', updateVH, { passive: true });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateVH);
      window.visualViewport.addEventListener('scroll', updateVH);
    }

    return () => {
      window.removeEventListener('resize', updateVH);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateVH);
        window.visualViewport.removeEventListener('scroll', updateVH);
      }
    };
  }, []);

  // Carousel navigation timing lock
  const navigate = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);

    setActiveIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % 4;
      } else {
        return (prev + 3) % 4;
      }
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        navigate('prev');
      } else if (e.key === 'ArrowRight') {
        navigate('next');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnimating]);

  // Derived carousel roles
  const getRole = (index) => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex + 3) % 4) return 'left';
    if (index === (activeIndex + 1) % 4) return 'right';
    return 'back';
  };

  // Carousel positioning/transform styles
  const getRoleStyles = (role) => {
    switch (role) {
      case 'center':
        return {
          transform: `translateX(-50%) scale(${isMobile ? 0.95 : 1.25})`,
          filter: 'blur(0px)',
          opacity: 1,
          zIndex: 20,
          left: '50%',
          height: isMobile ? '46%' : '72%',
          bottom: isMobile ? '26%' : '3%',
        };
      case 'left':
        return {
          transform: 'translateX(-50%) scale(0.8)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '18%' : '30%',
          height: isMobile ? '11%' : '20%',
          bottom: isMobile ? '34%' : '14%',
        };
      case 'right':
        return {
          transform: 'translateX(-50%) scale(0.8)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '82%' : '70%',
          height: isMobile ? '11%' : '20%',
          bottom: isMobile ? '34%' : '14%',
        };
      case 'back':
        return {
          transform: 'translateX(-50%) scale(0.8)',
          filter: 'blur(4px)',
          opacity: 1,
          zIndex: 5,
          left: '50%',
          height: isMobile ? '8%' : '15%',
          bottom: isMobile ? '34%' : '14%',
        };
    }
  };

  return (
    <>
      {showSplash && (
        <Splash />
      )}

      <Navbar
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <CelestialCanvas />

      <HeroSection
        activeIndex={activeIndex}
        isAnimating={isAnimating}
        isMobile={isMobile}
        navigate={navigate}
        getRole={getRole}
        getRoleStyles={getRoleStyles}
      />

      <Capabilities />

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

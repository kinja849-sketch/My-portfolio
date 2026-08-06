import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import CanvasBackground from './components/CanvasBackground';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import StackSection from './components/StackSection';
import WorkSection from './components/WorkSection';
import FooterContact from './components/FooterContact';
import ContactModal from './components/ContactModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
    });

    function update(time) {
      lenis.raf(time * 1000);
    }

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="page-wrapper">
      {!loadingComplete && <Preloader onComplete={() => setLoadingComplete(true)} />}

      {/* Fixed canvas background — plays intro after preloader, then scrubs frames on hero scroll */}
      <CanvasBackground preloaderDone={loadingComplete} />

      <Navbar onOpenContact={() => setContactOpen(true)} />

      <main className="main-wrapper">
        <Hero onOpenContact={() => setContactOpen(true)} />
        <AboutSection />
        <StackSection />
        <WorkSection />
        <FooterContact onOpenContact={() => setContactOpen(true)} />
      </main>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

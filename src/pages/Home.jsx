import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Trust from '../components/Trust';
import Work from '../components/Work';
import Services from '../components/Services';
import Process from '../components/Process';
import Pricing from '../components/Pricing';

export default function Home({ onOpenAudit }) {
  useEffect(() => {
    // Signal to ReviJs prerender engine that static page is ready
    if (typeof window !== 'undefined') {
      window.__REVI_READY__ = true;
    }
  }, []);

  return (
    <main>
      {/* Hero Section (Light Theme #F3F4F6) with tight cohesive device cluster */}
      <Hero onOpenAudit={onOpenAudit} />

      {/* 'Why Us' / Trust Section */}
      <Trust />

      {/* Selected Work Portfolio */}
      <Work />

      {/* Services Bento Box: Perfectly Symmetrical Grid */}
      <Services />

      {/* Strategic Delivery Process */}
      <Process />

      {/* Pricing Tiers: Uniform height cards with bottom-pinned CTA */}
      <Pricing onOpenAudit={onOpenAudit} />
    </main>
  );
}

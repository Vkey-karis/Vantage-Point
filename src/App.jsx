import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Trust from './components/Trust';
import Work from './components/Work';
import Services from './components/Services';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import AuditModal from './components/AuditModal';

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const handleOpenAudit = () => setIsAuditModalOpen(true);
  const handleCloseAudit = () => setIsAuditModalOpen(false);

  return (
    <div id="top" className="min-h-screen bg-[#0A192F] text-white selection:bg-[#D4AF37] selection:text-[#0A192F]">
      {/* Sticky Navigation with clear background logo */}
      <Navbar onOpenAudit={handleOpenAudit} />

      <main>
        {/* Hero Section (Light Theme #F3F4F6) with tight cohesive device cluster */}
        <Hero onOpenAudit={handleOpenAudit} />

        {/* 'Why Us' / Trust Section: More than just a website */}
        <Trust />

        {/* Selected Work Portfolio */}
        <Work />

        {/* Services Bento Box: Perfectly Symmetrical Grid */}
        <Services />

        {/* Strategic Delivery Process */}
        <Process />

        {/* Pricing Tiers: Uniform height cards with bottom-pinned CTA */}
        <Pricing onOpenAudit={handleOpenAudit} />
      </main>

      {/* Footer with white & gold logo */}
      <Footer />

      {/* Interactive Free Audit Modal */}
      <AuditModal isOpen={isAuditModalOpen} onClose={handleCloseAudit} />
    </div>
  );
}

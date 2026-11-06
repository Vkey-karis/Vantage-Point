import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenAudit }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? 'bg-[#F3F4F6]/90 shadow-sm border-b border-black/10'
          : 'bg-[#F3F4F6]/80 border-b border-black/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo with Navy Mark on Transparent Background */}
        <a href="#" className="flex items-center gap-3 group tracking-wider">
          <img
            src="/images/logo-navy.png"
            alt="Vantage Point Digital Logo"
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-lg sm:text-2xl text-[#0A192F] tracking-tight">
              VANTAGE POINT
            </span>
            <span className="font-sans font-bold text-[10px] sm:text-xs tracking-widest text-[#D4AF37] px-2 py-0.5 rounded border border-[#D4AF37]/30 bg-[#D4AF37]/10">
              DIGITAL
            </span>
          </div>
        </a>

        {/* Center / Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-widest text-[#0A192F]/80 hover:text-[#0A192F] font-semibold transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Far Right Action Button (Desktop) */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenAudit}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A192F] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#112240] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Get a Free Audit</span>
            <ArrowUpRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0A192F] hover:text-[#D4AF37] focus:outline-none transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F3F4F6] border-b border-black/10 px-6 py-6 space-y-4 shadow-xl animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-widest text-[#0A192F] hover:text-[#D4AF37] py-2 border-b border-black/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAudit();
              }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0A192F] text-white text-xs uppercase tracking-widest font-semibold shadow-md active:scale-95 transition-all"
            >
              <span>Get a Free Audit</span>
              <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

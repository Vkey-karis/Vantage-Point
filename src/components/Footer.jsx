import React from 'react';

export default function Footer() {
  return (
    <footer className="relative bg-[#0A192F] text-white border-t border-[#D4AF37]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Logo with White & Gold Mark */}
          <div className="flex items-center gap-3">
            <img
              src="/images/logo-white.png"
              alt="Vantage Point Digital Logo"
              className="h-8 sm:h-9 w-auto object-contain"
            />
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-2xl text-white tracking-tight">
                VANTAGE POINT
              </span>
              <span className="font-sans font-bold text-xs tracking-widest text-[#D4AF37] px-2 py-0.5 rounded border border-[#D4AF37]/40 bg-[#D4AF37]/10">
                DIGITAL
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-semibold tracking-widest uppercase text-gray-400">
            <a href="#work" className="hover:text-[#D4AF37] transition-colors">
              Work
            </a>
            <a href="#services" className="hover:text-[#D4AF37] transition-colors">
              Services
            </a>
            <a href="#process" className="hover:text-[#D4AF37] transition-colors">
              Process
            </a>
            <a href="#pricing" className="hover:text-[#D4AF37] transition-colors">
              Pricing
            </a>
            <a href="#top" className="hover:text-[#D4AF37] transition-colors">
              Back to top ↑
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2024 Vantage Point Digital. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <span className="hover:text-gray-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gray-400 transition-colors cursor-pointer">Terms of Engagement</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

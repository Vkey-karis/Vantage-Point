import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const PHONE = '+254758850766';
const WHATSAPP_URL = `https://wa.me/254758850766`;
const CALL_URL = `tel:${PHONE}`;

export default function Footer() {
  return (
    <footer className="relative bg-[#0A192F] text-white border-t border-[#D4AF37]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top row: Logo + Nav Links + Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10 items-start">
          {/* Logo */}
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
          <div className="flex flex-wrap items-start gap-y-3 gap-x-8 text-xs font-semibold tracking-widest uppercase text-gray-400">
            <a href="#work" className="hover:text-[#D4AF37] transition-colors">Work</a>
            <a href="#services" className="hover:text-[#D4AF37] transition-colors">Services</a>
            <a href="#process" className="hover:text-[#D4AF37] transition-colors">Process</a>
            <a href="#pricing" className="hover:text-[#D4AF37] transition-colors">Pricing</a>
            <a href="#top" className="hover:text-[#D4AF37] transition-colors">Back to top ↑</a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37]">
              CONTACT US
            </span>
            <a
              href={CALL_URL}
              className="inline-flex items-center gap-2.5 text-sm text-gray-300 hover:text-white transition-colors group"
            >
              <span className="w-7 h-7 rounded-full bg-[#112240] border border-white/10 flex items-center justify-center group-hover:border-[#D4AF37]/50 transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              </span>
              <span className="font-mono tracking-wide">{PHONE}</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-sm text-gray-300 hover:text-white transition-colors group"
            >
              <span className="w-7 h-7 rounded-full bg-[#112240] border border-white/10 flex items-center justify-center group-hover:border-[#25D366]/50 transition-colors">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              </span>
              <span className="font-mono tracking-wide">WhatsApp Us</span>
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

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function Hero({ onOpenAudit }) {
  return (
    <section className="relative min-h-screen bg-[#F3F4F6] text-[#0A192F] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden">
      {/* Subtle architectural background accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(10, 25, 47, 0.08) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#0A192F]/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column (Text & Editorial Narrative) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            {/* Small Category Label with brand logo mark */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-black/5 shadow-xs mb-6">
              <img
                src="/images/logo-navy.png"
                alt="Vantage Point Digital Icon"
                className="w-4 h-auto object-contain"
              />
              <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-[#0A192F]">
                WEBSITES / BRANDING / SEO
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-[#0A192F] leading-[1.08] tracking-tight mb-6">
              A Premium Digital Agency for{' '}
              <span className="italic font-normal text-[#0A192F] relative inline-block">
                Ambitious
                <svg
                  className="absolute -bottom-2 left-0 w-full text-[#D4AF37]/60"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  height="8"
                >
                  <path
                    d="M0,8 Q50,0 100,8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              Businesses.
            </h1>

            {/* Subheadline (Widened to max-w-lg for natural 2-line flow) */}
            <p className="font-sans text-base sm:text-lg text-gray-600 max-w-lg leading-relaxed mb-8">
              We build high-converting websites, strategic SEO, and digital experiences that elevate
              your brand.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="#work"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0A192F] text-white font-sans text-sm uppercase tracking-widest font-semibold hover:bg-[#112240] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 text-center"
              >
                <span>View Our Work</span>
                <ArrowUpRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
              </a>

              <button
                onClick={onOpenAudit}
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white border border-[#0A192F]/20 text-[#0A192F] font-sans text-sm uppercase tracking-widest font-semibold hover:border-[#D4AF37] hover:bg-[#FAF9F6] shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 text-center"
              >
                <span>Free Strategy Call</span>
              </button>
            </div>

            {/* Trust Proof Badges */}
            <div className="mt-12 pt-8 border-t border-black/10 flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Bespoke Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Conversion Focused</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Available Q1 / Q2 Projects</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Device Mockups Container */}
          <div className="w-full h-[500px] lg:h-[600px] relative flex justify-center items-center">
            {/* Ambient Backlight Glow */}
            <div className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-[#D4AF37]/15 via-[#0A192F]/5 to-transparent rounded-full filter blur-2xl pointer-events-none" />

            {/* Tightly Bound Device Cluster */}
            <div className="relative w-full max-w-[500px] flex justify-center items-center">
              {/* Tablet Mockup: Overlapping top-left of the monitor */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.6,
                }}
                whileHover={{ scale: 1.05, zIndex: 40 }}
                className="absolute top-0 left-0 z-20 w-[45%] cursor-pointer drop-shadow-2xl transition-all duration-300"
              >
                <div className="relative group">
                  <img
                    src="/images/hero-tablet.png"
                    alt="Vantage Point Digital - Tablet interface showcase featuring responsive digital agency portfolio"
                    className="w-full h-auto object-contain filter drop-shadow-[0_15px_25px_rgba(10,25,47,0.25)]"
                    onError={(e) => {
                      e.currentTarget.src =
                        '/images/Navy Gold Digital Agency Website Mockup-Photoroom.png';
                    }}
                  />
                  <div className="absolute -top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="px-2.5 py-0.5 bg-[#0A192F]/90 text-[#D4AF37] text-[10px] tracking-widest uppercase rounded-full border border-[#D4AF37]/40 shadow-lg whitespace-nowrap">
                      Tablet Experience
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Monitor Mockup: Centered Anchor */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0,
                }}
                whileHover={{ scale: 1.03, zIndex: 35 }}
                className="relative z-10 w-[80%] cursor-pointer drop-shadow-2xl transition-all duration-300"
              >
                <div className="relative group">
                  <img
                    src="/images/hero-monitor.png"
                    alt="Vantage Point Digital - Desktop monitor showcase of high-end restaurant web application"
                    className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(10,25,47,0.2)]"
                    onError={(e) => {
                      e.currentTarget.src =
                        '/images/Elegant Restaurant Website on Desktop Monitor-Photoroom.png';
                    }}
                  />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="px-3 py-1 bg-[#0A192F]/90 text-white text-[10px] tracking-widest uppercase rounded-full border border-[#D4AF37]/40 shadow-lg whitespace-nowrap">
                      Desktop Web Design
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Phone Mockup: Overlapping bottom-right of the monitor */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.2,
                }}
                whileHover={{ scale: 1.08, zIndex: 50 }}
                className="absolute bottom-0 right-0 z-30 w-[25%] cursor-pointer drop-shadow-2xl transition-all duration-300"
              >
                <div className="relative group">
                  <img
                    src="/images/hero-phone.png"
                    alt="Vantage Point Digital - Mobile device mockup displaying modern high-converting shopping application"
                    className="w-full h-auto object-contain filter drop-shadow-[0_20px_30px_rgba(10,25,47,0.3)]"
                    onError={(e) => {
                      e.currentTarget.src =
                        '/images/Modern Fashion Shopping App Mockup-Photoroom.png';
                    }}
                  />
                  <div className="absolute -bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="px-2.5 py-0.5 bg-[#0A192F]/90 text-[#D4AF37] text-[10px] tracking-widest uppercase rounded-full border border-[#D4AF37]/40 shadow-lg whitespace-nowrap">
                      Mobile First
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

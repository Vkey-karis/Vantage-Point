import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Search, TrendingUp, Sparkles, ArrowUpRight, Code, Zap, BarChart3, Layers, Target } from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="relative bg-[#0A192F] text-white py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#112240]/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] font-sans">
              OUR EXPERTISE
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Digital solutions designed for growth.
          </h2>

          <p className="mt-5 text-gray-400 font-sans text-base sm:text-lg leading-relaxed">
            We merge bespoke design engineering with performance-driven marketing to craft websites
            that don&apos;t just look spectacular—they scale revenue.
          </p>
        </div>

        {/* Bento Box Grid: Perfectly Symmetrical 6-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Top Row - Card 1: Website Design & Development (md:col-span-4 / 2/3 width) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-4 group relative p-8 sm:p-10 rounded-2xl bg-[#112240] border border-white/10 hover:border-[#D4AF37] transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#D4AF37]/10 rounded-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-all duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-xl bg-[#0A192F] border border-white/10 flex items-center justify-center group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-300">
                  <Monitor className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] px-3 py-1 rounded-full bg-[#0A192F]/80 border border-[#D4AF37]/30">
                  FLAGSHIP SERVICE
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                Website Design &amp; Development
              </h3>

              <p className="text-gray-300 font-sans text-base leading-relaxed max-w-xl mb-8">
                Bespoke, high-performance web applications built from scratch. We engineer clean,
                responsive digital flagships with Framer Motion animations, lightning-quick load speeds,
                and seamless mobile fidelity.
              </p>

              {/* Feature Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-300 bg-[#0A192F]/60 px-3 py-2 rounded-lg border border-white/5">
                  <Code className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Custom React / Next.js</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300 bg-[#0A192F]/60 px-3 py-2 rounded-lg border border-white/5">
                  <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Sub-second Load Times</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300 bg-[#0A192F]/60 px-3 py-2 rounded-lg border border-white/5">
                  <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Bespoke Design System</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-gray-400 group-hover:text-[#D4AF37] transition-colors">
              <span>EXPLORE CAPABILITIES</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </motion.div>

          {/* Top Row - Card 2: SEO & Visibility (md:col-span-2 / 1/3 width) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-2 group relative p-8 sm:p-10 rounded-2xl bg-[#112240] border border-white/10 hover:border-[#D4AF37] transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -top-24 -right-24 w-44 h-44 bg-[#D4AF37]/5 rounded-full blur-2xl group-hover:bg-[#D4AF37]/15 transition-all duration-500 pointer-events-none" />

            <div>
              <div className="w-14 h-14 rounded-xl bg-[#0A192F] border border-white/10 flex items-center justify-center mb-8 group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-300">
                <Search className="w-7 h-7 text-[#D4AF37]" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                SEO &amp; Visibility
              </h3>

              <p className="text-gray-300 font-sans text-sm leading-relaxed mb-6">
                Dominating search engines through rigorous technical audits, semantic schema, and high-intent keyword takeover.
              </p>

              <div className="space-y-2 mb-6">
                <div className="text-xs text-gray-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Core Web Vitals Perfection</span>
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Editorial Content Silos</span>
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Local &amp; Global Authority</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-gray-400 group-hover:text-[#D4AF37] transition-colors">
              <span>ORGANIC GROWTH</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </motion.div>

          {/* Bottom Row - Card 3: Digital Advertising (md:col-span-3 / Exactly 1/2 width) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-3 group relative p-8 sm:p-10 rounded-2xl bg-[#112240] border border-white/10 hover:border-[#D4AF37] transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -top-24 -right-24 w-44 h-44 bg-[#D4AF37]/5 rounded-full blur-2xl group-hover:bg-[#D4AF37]/15 transition-all duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-xl bg-[#0A192F] border border-white/10 flex items-center justify-center group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-300">
                  <TrendingUp className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <span className="text-xs font-mono text-gray-400">03 / 04</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                Digital Advertising &amp; PPC
              </h3>

              <p className="text-gray-300 font-sans text-sm leading-relaxed mb-6">
                High-converting paid acquisition across Google Search, Meta, and LinkedIn with continuous multi-variant creative testing and laser-targeted attribution modeling.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-300 bg-[#0A192F]/60 px-3 py-2 rounded-lg border border-white/5">
                  <BarChart3 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>3.8x Avg Return On Ad Spend</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300 bg-[#0A192F]/60 px-3 py-2 rounded-lg border border-white/5">
                  <Target className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Full-Funnel Retargeting</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-gray-400 group-hover:text-[#D4AF37] transition-colors">
              <span>PAID ACQUISITION</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </motion.div>

          {/* Bottom Row - Card 4: Brand Strategy & Editorial Identity (md:col-span-3 / Exactly 1/2 width) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-3 group relative p-8 sm:p-10 rounded-2xl bg-[#112240] border border-white/10 hover:border-[#D4AF37] transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -top-24 -right-24 w-44 h-44 bg-[#D4AF37]/5 rounded-full blur-2xl group-hover:bg-[#D4AF37]/15 transition-all duration-500 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-xl bg-[#0A192F] border border-white/10 flex items-center justify-center group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-300">
                  <Sparkles className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <span className="text-xs font-mono text-gray-400">04 / 04</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                Brand Strategy &amp; Identity
              </h3>

              <p className="text-gray-300 font-sans text-sm leading-relaxed mb-6">
                We position your brand as the undeniable authority in your category. Complete visual identities, typography guidelines, and tone-of-voice that command premium pricing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-300 bg-[#0A192F]/60 px-3 py-2 rounded-lg border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Category Positioning</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300 bg-[#0A192F]/60 px-3 py-2 rounded-lg border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Design Systems &amp; Assets</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-gray-400 group-hover:text-[#D4AF37] transition-colors">
              <span>BRAND POSITIONING</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

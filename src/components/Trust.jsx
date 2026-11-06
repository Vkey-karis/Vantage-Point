import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Search } from 'lucide-react';

export default function Trust() {
  const pillars = [
    {
      icon: Target,
      title: 'Attract & Convert',
      description: 'Human-centric UX engineering that turns passive browsers into committed clients.',
    },
    {
      icon: Search,
      title: 'Rank On Google',
      description: 'Algorithmic technical SEO and schema structures built into the source code.',
    },
    {
      icon: TrendingUp,
      title: 'Drive Real Revenue',
      description: 'Measurable pipeline velocity and bottom-line impact, not just vanity metrics.',
    },
  ];

  return (
    <section className="relative bg-[#0A192F] text-white py-24 sm:py-28 border-b border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center">
        {/* Subtle section pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <img
            src="/images/logo-white.png"
            alt="Vantage Point Digital Icon"
            className="w-5 h-auto object-contain opacity-90"
          />
          <span className="w-4 h-[1.5px] bg-[#D4AF37]" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] font-sans">
            THE VANTAGE PHILOSOPHY
          </span>
          <span className="w-4 h-[1.5px] bg-[#D4AF37]" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-3xl mx-auto"
        >
          More than just a website.
        </motion.h2>

        {/* Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-gray-300 font-sans max-w-2xl mx-auto leading-relaxed"
        >
          We look at your business from a higher vantage point. We don&apos;t just make you look good; we
          build digital experiences designed to attract customers, rank on Google, and drive real
          revenue.
        </motion.p>

        {/* Three Value Pillars */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#112240]/60 border border-white/5 hover:border-[#D4AF37]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0A192F] border border-[#D4AF37]/30 flex items-center justify-center mb-4 text-[#D4AF37]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

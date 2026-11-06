import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Palette, Rocket } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      step: '01',
      title: 'Strategic Architecture & Research',
      subtitle: 'Data-Backed Foundation',
      description:
        'We dissect your market, user psychographics, and competitor vulnerabilities to build an architectural roadmap tailored directly to revenue generation.',
      icon: Compass,
    },
    {
      step: '02',
      title: 'Bespoke Engineering & Motion Craft',
      subtitle: 'Award-Winning Execution',
      description:
        'We engineer your platform with production React, Framer Motion micro-interactions, and custom Tailwind styling. No templates, no generic code.',
      icon: Palette,
    },
    {
      step: '03',
      title: 'Launch, SEO Dominance & Hypercare',
      subtitle: 'Continuous Growth Engine',
      description:
        'We execute rigorous pre-launch audits, deploy technical schema, and provide 30-90 days of dedicated engineering hypercare to guarantee velocity.',
      icon: Rocket,
    },
  ];

  return (
    <section id="process" className="relative bg-[#0A192F] text-white py-32 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-4 justify-center">
            <span className="w-5 h-[1.5px] bg-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] font-sans">
              OUR PROCESS
            </span>
            <span className="w-5 h-[1.5px] bg-[#D4AF37]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            How we bring visionary digital products to life.
          </h2>

          <p className="mt-4 text-gray-400 font-sans text-base sm:text-lg">
            A disciplined, three-stage delivery framework engineered for speed, distinction, and undeniable market traction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="relative p-8 sm:p-10 rounded-2xl bg-[#112240] border border-white/10 hover:border-[#D4AF37] transition-all duration-300 shadow-xl group"
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#0A192F] border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37]/50 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-white/20 group-hover:text-[#D4AF37]/60 transition-colors">
                    {item.step}
                  </span>
                </div>

                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-2">
                  {item.subtitle}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-300 font-sans text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

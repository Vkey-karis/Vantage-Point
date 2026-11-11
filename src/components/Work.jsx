import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const projects = [
    {
      id: 'maison-etoile',
      title: 'Maison Étoile Atelier',
      type: 'Restaurant',
      url: 'https://hoteltemplate254.netlify.app/',
      image: '/images/demo-restaurant.png',
      alt: 'Maison Étoile Atelier luxury restaurant website demo',
      categoryLabels: ['WEB DESIGN', 'DEVELOPMENT', 'WHATSAPP INTEGRATION'],
      filterCategory: 'WEB DESIGN',
      keyResult: '+215% Online Reservations',
      description:
        'An editorial culinary digital experience with real-time reservation synchronization, custom tasting menu configuration, and sub-second load times.',
      frameType: 'monitor',
      urlDisplay: 'hoteltemplate254.netlify.app',
    },
    {
      id: 'plugwa-signs',
      title: 'Plugwa Signs & Branding',
      type: 'Signage & Branding',
      url: 'https://plugwasigns-o58v.vercel.app/',
      image: '/images/plugwasigns.png',
      alt: 'Plugwa Signs & Branding professional signage company website',
      categoryLabels: ['WEB DESIGN', 'BRANDING', 'LEAD GENERATION'],
      filterCategory: 'WEB DESIGN',
      keyResult: 'Premium Brand Presence Online',
      description:
        'A bold, conversion-focused website for a leading Kenyan signage and branding company — showcasing their portfolio, services, and driving client inquiries.',
      frameType: 'monitor',
      urlDisplay: 'plugwasigns-o58v.vercel.app',
    },
    {
      id: 'kinetics',
      title: 'Kinetics Haute Activewear',
      type: 'E-Commerce',
      url: 'https://e-commercedemovantage.netlify.app/',
      image: '/images/demo-kinetics.png',
      alt: 'Kinetics Haute Activewear mobile e-commerce shopping platform demo',
      categoryLabels: ['E-COMMERCE', 'UI/UX', 'M-PESA INTEGRATION'],
      filterCategory: 'E-COMMERCE',
      keyResult: '+3.2% Mobile Conversion Lift',
      description:
        'Modern, high-fashion shopping platform featuring smooth gesture navigation, instant bag checkout, and dynamic looksbook styling.',
      frameType: 'phone',
      urlDisplay: 'e-commercedemovantage.netlify.app',
    },
    {
      id: 'dyel-events',
      title: 'Dyel Events',
      type: 'Corporate / Events',
      url: 'https://dyelevents.netlify.app/',
      image: '/images/demo-dyel.png',
      alt: 'Dyel Events corporate event planning and production platform demo',
      categoryLabels: ['CORPORATE', 'UI/UX', 'LEAD GENERATION'],
      filterCategory: 'CORPORATE',
      keyResult: '+140% Lead Form Submissions',
      description:
        'A clean, high-trust corporate event platform with interactive portfolio filtering and a comprehensive multi-step booking inquiry system.',
      frameType: 'laptop',
      urlDisplay: 'dyelevents.netlify.app',
    },
  ];

  const filterTabs = ['ALL', 'WEB DESIGN', 'E-COMMERCE', 'CORPORATE', 'BRANDING'];

  const filteredProjects =
    activeFilter === 'ALL'
      ? projects
      : projects.filter(
          (p) => p.filterCategory === activeFilter || p.categoryLabels.includes(activeFilter)
        );

  return (
    <section id="work" className="relative bg-[#0A192F] text-white py-32 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
              <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] font-sans">
                SELECTED WORK
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Award-winning digital craft.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                  activeFilter === tab
                    ? 'bg-[#D4AF37] text-[#0A192F] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'bg-[#112240] text-gray-300 hover:text-white border border-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project Showcase Cards */}
        <div className="space-y-16">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-3xl bg-[#112240] border border-white/10 hover:border-[#D4AF37]/70 transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(10,25,47,0.7)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
                  {/* Left Column: Project Info (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full">
                    <div>
                      {/* Top Meta Row */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                          {project.type}
                        </span>
                        <span className="text-xs font-mono text-gray-400">0{idx + 1} / 0{projects.length}</span>
                      </div>

                      {/* Heading */}
                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Key Result Banner */}
                      <div className="inline-block p-3.5 rounded-xl bg-[#0A192F] border border-[#D4AF37]/30 mb-8 w-full sm:w-auto">
                        <span className="text-[11px] text-gray-400 uppercase tracking-widest block font-medium">
                          KEY RESULT
                        </span>
                        <span className="text-base font-bold text-[#D4AF37] mt-0.5 block">
                          {project.keyResult}
                        </span>
                      </div>

                      {/* Category Labels */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.categoryLabels.map((label) => (
                          <span
                            key={label}
                            className="text-[11px] uppercase tracking-wider px-2.5 py-1 rounded bg-[#0A192F]/70 text-gray-300 border border-white/5 font-medium"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action CTA: Turns Gold on Group Hover */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-gray-300 group-hover:text-[#D4AF37] transition-colors duration-300">
                          EXPLORE CASE STUDY
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#D4AF37] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      </div>
                      <span className="text-[11px] text-gray-400 font-mono flex items-center gap-1 group-hover:text-gray-300 transition-colors">
                        <span>Live Preview</span>
                        <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Visual Frame Mockup (7 cols) */}
                  <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[430px] rounded-2xl bg-[#0A192F] border border-white/5 flex items-center justify-center p-4 sm:p-6 overflow-hidden group-hover:shadow-[0_0_35px_rgba(212,175,55,0.12)] transition-all duration-500">
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none" />

                    {/* 1. Desktop Monitor Frame Mockup */}
                    {project.frameType === 'monitor' && (
                      <div className="relative w-full max-w-[500px] flex flex-col items-center">
                        <div className="w-full bg-[#1e293b]/90 border border-white/10 rounded-t-xl px-3 py-2 flex items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
                          </div>
                          <div className="flex-1 max-w-[240px] mx-auto bg-[#0A192F]/80 rounded text-[10px] text-gray-400 px-2.5 py-0.5 text-center truncate border border-white/5 font-mono">
                            {project.urlDisplay || project.url}
                          </div>
                        </div>
                        <div className="w-full relative bg-[#050D1A] border-x border-b border-white/10 rounded-b-xl overflow-hidden shadow-2xl flex items-center justify-center">
                          <img
                            src={project.image}
                            alt={project.alt}
                            className="w-full h-auto max-h-[300px] object-cover filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src = '/images/hero-monitor.png';
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* 2. Mobile Phone Frame Mockup */}
                    {project.frameType === 'phone' && (
                      <div className="relative w-[190px] sm:w-[210px] bg-[#050D1A] border-[3px] border-white/20 rounded-[32px] p-2 shadow-2xl flex flex-col items-center">
                        {/* Dynamic Island / Notch */}
                        <div className="w-16 h-3.5 bg-black rounded-full mb-2 z-10 shrink-0" />
                        <div className="w-full rounded-[24px] overflow-hidden bg-black flex items-center justify-center">
                          <img
                            src={project.image}
                            alt={project.alt}
                            className="w-full h-auto max-h-[310px] object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src = '/images/hero-phone.png';
                            }}
                          />
                        </div>
                        {/* Home indicator bar */}
                        <div className="w-12 h-1 bg-white/30 rounded-full mt-2 shrink-0" />
                      </div>
                    )}

                    {/* 3. Laptop/Tablet Mockup Frame */}
                    {project.frameType === 'laptop' && (
                      <div className="relative w-full max-w-[460px] flex flex-col items-center">
                        <div className="w-full bg-[#1e293b]/90 border border-white/10 rounded-t-xl px-3 py-2 flex items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
                          </div>
                          <div className="flex-1 max-w-[220px] mx-auto bg-[#0A192F]/80 rounded text-[10px] text-gray-400 px-2.5 py-0.5 text-center truncate border border-white/5 font-mono">
                            {project.urlDisplay || project.url}
                          </div>
                        </div>
                        <div className="w-full bg-[#050D1A] border-x border-b border-white/10 rounded-b-xl overflow-hidden shadow-2xl flex items-center justify-center">
                          <img
                            src={project.image}
                            alt={project.alt}
                            className="w-full h-auto max-h-[290px] object-cover filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src = '/images/hero-tablet.png';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

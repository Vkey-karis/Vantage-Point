import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      title: 'Maison Étoile Atelier',
      category: 'Web Design & Next.js',
      description:
        'An editorial culinary digital experience with real-time reservation synchronization, custom tasting menu configurator, and sub-second load times.',
      stats: '+310% Online Reservations',
      tags: ['Next.js', 'Framer Motion', 'Tailwind', 'Sanity'],
      image: '/images/hero-monitor.png',
      alt: 'Maison Étoile Atelier bespoke restaurant web application by Vantage Point Digital',
      filter: 'Websites',
    },
    {
      title: 'Kinetics Haute Activewear',
      category: 'Mobile E-Commerce & CRO',
      description:
        'Mobile-first high fashion shopping platform featuring smooth gesture navigation, instant bag checkout, and dynamic lookbook styling.',
      stats: '4.2x Mobile Conversion Lift',
      tags: ['Shopify Plus', 'Headless React', 'Global CDN'],
      image: '/images/hero-phone.png',
      alt: 'Kinetics mobile shopping application engineered by Vantage Point Digital',
      filter: 'E-Commerce',
    },
    {
      title: 'Vanguard Capital Partners',
      category: 'Brand Strategy & Platform',
      description:
        'Private equity digital portal engineered for ultra-high-net-worth investors with interactive portfolio breakdown and encrypted investor reporting.',
      stats: '$180M+ Capital Pledged',
      tags: ['Enterprise React', 'Design System', 'SEO'],
      image: '/images/hero-tablet.png',
      alt: 'Vanguard Capital Partners financial platform by Vantage Point Digital',
      filter: 'Branding',
    },
  ];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.filter === activeFilter || activeFilter === 'All');

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
            {['All', 'Websites', 'E-Commerce', 'Branding'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                  activeFilter === tab
                    ? 'bg-[#D4AF37] text-[#0A192F]'
                    : 'bg-[#112240] text-gray-300 hover:text-white border border-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project Showcase Grid */}
        <div className="space-y-16">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group rounded-3xl bg-[#112240] border border-white/10 hover:border-[#D4AF37]/70 transition-all duration-500 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12 shadow-2xl"
            >
              {/* Project Info (Left, 5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-gray-400">0{idx + 1}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-white">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="inline-block p-3 rounded-xl bg-[#0A192F] border border-[#D4AF37]/30 mb-8">
                    <span className="text-xs text-gray-400 uppercase tracking-wider block">KEY RESULT</span>
                    <span className="text-sm font-bold text-[#D4AF37]">{project.stats}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] uppercase tracking-wider px-2.5 py-1 rounded bg-[#0A192F]/60 text-gray-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-300 group-hover:text-[#D4AF37] transition-colors">
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>

              {/* Project Visual (Right, 7 cols) */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[420px] rounded-2xl bg-[#0A192F] border border-white/5 flex items-center justify-center p-6 overflow-hidden group-hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500">
                <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none" />
                <img
                  src={project.image}
                  alt={project.alt}
                  className="max-h-full max-w-full object-contain filter drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

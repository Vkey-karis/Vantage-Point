import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export default function Pricing({ onOpenAudit }) {
  const plans = [
    {
      name: 'Starter',
      price: 'KSh 25,000',
      currencyCode: 'KES',
      tagline: 'Ideal for emerging brands ready to establish a dominant online presence.',
      isPopular: false,
      features: [
        'Bespoke 5-Page Responsive Experience',
        'Custom Tailwind & Framer Motion UI',
        'Sub-second Core Web Vitals Optimization',
        'Technical On-Page SEO Architecture',
        'Modern CMS Integration (Sanity / Strapi)',
        '30-Day Post-Launch Support & Warranty',
      ],
      buttonText: 'Select Starter',
    },
    {
      name: 'Business',
      price: 'KSh 40,000',
      currencyCode: 'KES',
      tagline: 'Engineered for scaling businesses demanding high conversion & elite design.',
      isPopular: true,
      features: [
        'Up to 15 Custom Editorial Pages & Flows',
        'Advanced Interactive 3D & Framer Animations',
        'Complete Technical & Content SEO Strategy',
        'Dynamic Headless CMS with Workflows',
        'High-Converting Funnels & CRM Integration',
        'A/B Testing & Conversion Optimization',
        '60-Day Priority Engineering Support',
      ],
      buttonText: 'Start Business Plan',
    },
    {
      name: 'Professional',
      price: 'KSh 60,000',
      currencyCode: 'KES',
      tagline: 'Comprehensive enterprise-grade digital flagship and growth engine.',
      isPopular: false,
      features: [
        'Unlimited Bespoke Pages & Custom Modules',
        'Complete Category-Dominant Brand Identity',
        'Enterprise Organic SEO & Keyword Takeover',
        'Custom Design System & React UI Library',
        'Multi-Language & Geo-Targeting Readiness',
        'Dedicated Technical Lead & Private Slack',
        '90-Day Continuous Growth & Optimization',
      ],
      buttonText: 'Inquire Professional',
    },
  ];

  return (
    <section id="pricing" className="relative bg-[#0A192F] text-white py-32 overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-4 justify-center">
            <span className="w-5 h-[1.5px] bg-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] font-sans">
              TRANSPARENT PRICING
            </span>
            <span className="w-5 h-[1.5px] bg-[#D4AF37]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Choose your growth plan.
          </h2>

          <p className="mt-4 text-gray-400 font-sans text-base sm:text-lg">
            Transparent investment tiers tailored to fuel aggressive market leadership with zero hidden costs.
          </p>
        </div>

        {/* Pricing Cards Grid - items-stretch guarantees equal column stretch */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ y: plan.isPopular ? -16 : -6 }}
              transition={{ duration: 0.3 }}
              className={`relative rounded-2xl p-8 sm:p-10 flex flex-col h-full justify-between transition-all duration-300 ${
                plan.isPopular
                  ? 'bg-[#112240] border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(212,175,55,0.15)] md:-translate-y-4 md:py-12 z-20'
                  : 'bg-[#112240]/80 border border-white/10 hover:border-[#D4AF37]/50 shadow-xl z-10'
              }`}
            >
              {/* Floating 'Most Popular' Badge for Middle Card */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#D4AF37] text-[#0A192F] text-xs font-bold tracking-widest uppercase rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5 fill-[#0A192F]" />
                  <span>Most Popular</span>
                </div>
              )}

              {/* Card Body (Flex-1 ensures it grows so bottom button aligns to absolute bottom) */}
              <div className="flex-1 flex flex-col">
                {/* Plan Header */}
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="font-serif text-2xl font-bold text-white">{plan.name}</h3>
                  <div className="text-right">
                    <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#D4AF37]">
                      {plan.price}
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 min-h-[44px]">
                  {plan.tagline}
                </p>

                <div className="w-full h-px bg-white/10 mb-8" />

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-3">
                    WHAT&apos;S INCLUDED:
                  </span>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#D4AF37] stroke-[2.5]" />
                      </div>
                      <span className="text-sm text-gray-300 leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button: mt-auto guarantees it is stuck to the absolute bottom */}
              <div className="mt-auto pt-6 border-t border-white/5 w-full">
                <button
                  onClick={onOpenAudit}
                  className={`w-full group py-4 px-6 rounded-xl font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                    plan.isPopular
                      ? 'bg-[#D4AF37] text-[#0A192F] hover:bg-[#c49f2c] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]'
                      : 'bg-[#0A192F] text-white border border-white/10 hover:border-[#D4AF37] hover:bg-[#0f2142]'
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom enterprise note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400">
            Need custom enterprise SLA or multi-brand architecture?{' '}
            <button
              onClick={onOpenAudit}
              className="text-[#D4AF37] hover:underline font-semibold ml-1 cursor-pointer"
            >
              Contact our solutions team ↗
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

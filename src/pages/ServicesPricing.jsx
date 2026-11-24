import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  Minus,
  MessageCircle,
  Sparkles,
  HelpCircle,
  FileText,
  Layers,
  Search,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const WHATSAPP_PHONE = '254758850766';

// ── Service Catalogue Data ────────────────────────────────────────────────────

export const SERVICE_CATEGORIES = [
  {
    id: 'web-design',
    title: '1. Website Design & Development',
    badge: 'Core Digital Flagship',
    description: 'High-performance, bespoke web engineering designed to dominate search rankings and turn visitors into qualified leads.',
    services: [
      {
        id: 'web-landing',
        name: 'Landing Page',
        price: 15000,
        billing: 'one-time',
        description: 'Single high-converting landing page optimized for lead capture or ad campaigns.',
      },
      {
        id: 'web-starter',
        name: 'Starter Website (up to 3 pages)',
        price: 25000,
        billing: 'one-time',
        description: 'Clean, modern presence for startups and independent professionals.',
      },
      {
        id: 'web-business',
        name: 'Business Website (up to 5 pages)',
        price: 40000,
        billing: 'one-time',
        popular: true,
        description: 'Complete corporate website with custom branding, dynamic CMS, and technical SEO.',
      },
      {
        id: 'web-pro',
        name: 'Professional Website (up to 8 pages)',
        price: 60000,
        billing: 'one-time',
        description: 'Expanded digital flagship with advanced interactive animations and lead funnels.',
      },
      {
        id: 'web-ecom',
        name: 'E-commerce Website',
        price: 75000,
        billing: 'one-time',
        isStartingPrice: true,
        description: 'Full product catalogue, cart system, inventory management, and automated checkout.',
      },
      {
        id: 'web-custom-app',
        name: 'Custom Web Application',
        price: 0,
        isCustomQuote: true,
        billing: 'one-time',
        description: 'Bespoke portals, client dashboards, SaaS MVPs, and complex business workflows.',
      },
      {
        id: 'web-redesign',
        name: 'Website Redesign',
        price: 20000,
        billing: 'one-time',
        isStartingPrice: true,
        description: 'Complete visual and performance overhaul of your existing slow or outdated website.',
      },
      {
        id: 'web-audit',
        name: 'Website Audit',
        price: 5000,
        billing: 'one-time',
        description: 'Comprehensive speed, SEO, UX, security, and conversion rate analysis report.',
      },
    ],
    addOns: [
      {
        id: 'addon-extra-page',
        name: 'Additional Website Page',
        price: 3000,
        billing: 'one-time',
        allowQuantity: true,
        defaultQty: 1,
        description: 'Custom designed and coded page matching your existing site structure.',
      },
      {
        id: 'addon-content',
        name: 'Website Content Writing',
        price: 5000,
        billing: 'one-time',
        isStartingPrice: true,
        description: 'Compelling, SEO-optimized copy tailored to your industry and brand voice.',
      },
      {
        id: 'addon-mpesa',
        name: 'M-Pesa / Card Payment Integration',
        price: 15000,
        billing: 'one-time',
        isStartingPrice: true,
        description: 'Direct Daraja API / Paystack / Flutterwave integration for automated mobile money checkout.',
      },
      {
        id: 'addon-maintenance',
        name: 'Website Maintenance & Security',
        price: 5000,
        billing: 'monthly',
        isStartingPrice: true,
        description: 'Weekly backups, uptime monitoring, CMS updates, and technical bug fixes.',
      },
    ],
  },
  {
    id: 'seo-visibility',
    title: '2. SEO & Online Visibility',
    badge: 'Organic Search Authority',
    description: 'Claim top organic positions on Google and emerging AI search engines (ChatGPT, Gemini, Perplexity) to drive consistent inbound business.',
    services: [
      {
        id: 'seo-audit',
        name: 'SEO Website Audit',
        price: 5000,
        billing: 'one-time',
        description: 'Deep dive into crawlability, site structure, indexation, schema markup, and backlinks.',
      },
      {
        id: 'seo-basic',
        name: 'Basic SEO Setup',
        price: 10000,
        billing: 'one-time',
        description: 'Core metadata, XML sitemaps, Google Search Console & Analytics configuration.',
      },
      {
        id: 'seo-gbp-setup',
        name: 'Google Business Profile Setup',
        price: 5000,
        billing: 'one-time',
        description: 'Complete setup and verification to rank in Google Maps & local Kenyan search.',
      },
      {
        id: 'seo-gbp-opt',
        name: 'Google Business Profile Optimisation',
        price: 8000,
        billing: 'one-time',
        description: 'Geo-targeted keywords, service listings, high-res photos, and review strategy.',
      },
      {
        id: 'seo-local-mgmt',
        name: 'Local SEO Management',
        price: 10000,
        billing: 'monthly',
        description: 'Monthly local citation building, Google Profile posts, and local rank tracking.',
      },
      {
        id: 'seo-std-mgmt',
        name: 'Standard SEO Management',
        price: 20000,
        billing: 'monthly',
        popular: true,
        description: 'Ongoing technical SEO, keyword target optimization, and content recommendations.',
      },
      {
        id: 'seo-adv-mgmt',
        name: 'Advanced SEO Campaign',
        price: 35000,
        billing: 'monthly',
        isStartingPrice: true,
        description: 'Aggressive industry takeover with competitive link acquisition and generative engine optimization.',
      },
    ],
  },
  {
    id: 'digital-ads',
    title: '3. Digital Advertising & PPC',
    badge: 'Paid Acquisition & Funnels',
    description: 'Data-driven paid advertising across Meta and Google that generates qualified phone calls, WhatsApp leads, and sales.',
    note: 'Note: Advertising media spend is paid directly to Meta or Google with zero agency markup.',
    services: [
      {
        id: 'ads-meta-setup',
        name: 'Meta Ads Account Setup',
        price: 3000,
        billing: 'one-time',
        description: 'Pixel installation, Conversions API (CAPI), and Business Manager verification.',
      },
      {
        id: 'ads-strategy',
        name: 'Campaign Strategy & Audience Research',
        price: 3000,
        billing: 'one-time',
        description: 'Competitor benchmarking, buyer persona definition, and messaging hooks.',
      },
      {
        id: 'ads-meta-campaign',
        name: 'Meta Ads Campaign Setup',
        price: 5000,
        billing: 'one-time',
        description: 'Ad set architecture, targeting setup, tracking, and campaign launch.',
      },
      {
        id: 'ads-google-campaign',
        name: 'Google Ads Campaign Setup',
        price: 7500,
        billing: 'one-time',
        description: 'High-intent search campaign with negative keywords, extensions, and conversion tracking.',
      },
      {
        id: 'ads-creative',
        name: 'Advertising Creative & Copywriting',
        price: 2000,
        billing: 'one-time',
        allowQuantity: true,
        defaultQty: 1,
        description: 'High-converting ad graphic design paired with direct-response ad copy.',
      },
      {
        id: 'ads-meta-mgmt',
        name: 'Meta Ads Management',
        price: 10000,
        billing: 'monthly',
        isStartingPrice: true,
        description: 'Weekly A/B testing, bid management, audience scaling, and ROAS reporting.',
      },
      {
        id: 'ads-google-mgmt',
        name: 'Google Ads Management',
        price: 12000,
        billing: 'monthly',
        isStartingPrice: true,
        description: 'Search term audits, Quality Score optimization, and cost-per-lead reduction.',
      },
      {
        id: 'ads-multi-mgmt',
        name: 'Multi-platform Ads Management',
        price: 20000,
        billing: 'monthly',
        isStartingPrice: true,
        description: 'Integrated retargeting and cross-channel optimization across Meta, Google & Instagram.',
      },
    ],
  },
  {
    id: 'brand-identity',
    title: '4. Brand Strategy & Identity',
    badge: 'Visual Prestige',
    description: 'Transform your business into an authoritative, premium brand that justifies higher prices and wins immediate customer trust.',
    services: [
      {
        id: 'brand-logo',
        name: 'Logo Design',
        price: 12000,
        billing: 'one-time',
        description: '3 bespoke concept directions, vector master files, color palette & typography pairings.',
      },
      {
        id: 'brand-logo-refresh',
        name: 'Logo Refresh',
        price: 7500,
        billing: 'one-time',
        description: 'Modernize and refine your existing logo while maintaining recognizable brand equity.',
      },
      {
        id: 'brand-starter-id',
        name: 'Starter Brand Identity',
        price: 25000,
        billing: 'one-time',
        description: 'Logo suite, brand style guide, font licenses, color palette, and digital assets.',
      },
      {
        id: 'brand-complete-id',
        name: 'Complete Brand Identity',
        price: 45000,
        billing: 'one-time',
        popular: true,
        description: 'Comprehensive brand manual, stationery, packaging guidelines, and digital brand kit.',
      },
      {
        id: 'brand-strategy',
        name: 'Brand Strategy & Positioning',
        price: 20000,
        billing: 'one-time',
        isStartingPrice: true,
        description: 'Brand archetype, value proposition, competitive differentiation, and voice playbook.',
      },
      {
        id: 'brand-company-profile',
        name: 'Company Profile Design',
        price: 10000,
        billing: 'one-time',
        isStartingPrice: true,
        description: 'Executive corporate profile PDF formatted for tenders, corporate clients, and investor pitches.',
      },
      {
        id: 'brand-biz-cards',
        name: 'Business Card Design',
        price: 2000,
        billing: 'one-time',
        description: 'Print-ready double-sided luxury card artwork with bleed & crop marks.',
      },
      {
        id: 'brand-letterhead',
        name: 'Letterhead & Invoice Template',
        price: 2000,
        billing: 'one-time',
        description: 'Editable Microsoft Word and PDF stationery templates for corporate correspondence.',
      },
      {
        id: 'brand-social-templates',
        name: 'Social Media Brand Templates',
        price: 5000,
        billing: 'one-time',
        isStartingPrice: true,
        description: 'Custom editable Canva or Figma templates tailored to your signature brand styling.',
      },
    ],
  },
  {
    id: 'social-media',
    title: '5. Social Media Management',
    badge: 'Consistent Brand Presence',
    description: 'Keep your social feeds active, premium, and engaged with professional editorial planning and creative graphic production.',
    services: [
      {
        id: 'smm-starter',
        name: 'Social Starter — 8 posts/month',
        price: 12000,
        billing: 'monthly',
        description: '2 curated branded posts per week, hashtag research, and caption copywriting.',
      },
      {
        id: 'smm-growth',
        name: 'Social Growth — 12 posts/month',
        price: 20000,
        billing: 'monthly',
        popular: true,
        description: '3 posts per week with custom graphics, story prompts, community replies & scheduling.',
      },
      {
        id: 'smm-pro',
        name: 'Social Professional — 16 posts/month',
        price: 35000,
        billing: 'monthly',
        description: '4 posts per week across LinkedIn, Instagram & Facebook with strategic trend alignment.',
      },
    ],
  },
  {
    id: 'whatsapp-services',
    title: '6. WhatsApp Business Services',
    badge: 'Direct Kenyan Commerce',
    description: 'Optimize the single most popular communication channel in Kenya to capture, qualify, and close leads on autopilot.',
    services: [
      {
        id: 'wa-setup',
        name: 'WhatsApp Business Setup & Optimisation',
        price: 3000,
        billing: 'one-time',
        description: 'Official profile branding, opening hours, business verification, and web links.',
      },
      {
        id: 'wa-catalog',
        name: 'Product/Service Catalogue Setup',
        price: 2000,
        billing: 'one-time',
        isStartingPrice: true,
        description: 'In-app digital catalogue of products or service packages with photos and pricing.',
      },
      {
        id: 'wa-replies',
        name: 'Automated Greetings & Quick Replies',
        price: 2000,
        billing: 'one-time',
        description: 'Away messages, instant welcome greetings, and 10+ one-tap canned response shortcuts.',
      },
      {
        id: 'wa-automation',
        name: 'Advanced WhatsApp Automation',
        price: 15000,
        billing: 'one-time',
        isStartingPrice: true,
        description: 'Interactive chat menus, webhook routing, and integration with your CRM or Google Sheets.',
      },
    ],
  },
  {
    id: 'creative-content',
    title: '7. Creative & Content Services',
    badge: 'Visual Assets & Copy',
    description: 'High-impact standalone creative assets for marketing promotions, print, and digital campaigns.',
    services: [
      {
        id: 'creative-graphic',
        name: 'Social Media Graphic',
        price: 1500,
        billing: 'one-time',
        allowQuantity: true,
        defaultQty: 1,
        description: 'Single bespoke static graphic for Instagram, Facebook, or LinkedIn.',
      },
      {
        id: 'creative-poster',
        name: 'Promotional Flyer / Poster',
        price: 2000,
        billing: 'one-time',
        isStartingPrice: true,
        allowQuantity: true,
        defaultQty: 1,
        description: 'Digital or print-ready promotional marketing poster designed to drive attendance or sales.',
      },
      {
        id: 'creative-brochure',
        name: 'Business Brochure',
        price: 5000,
        billing: 'one-time',
        isStartingPrice: true,
        description: 'Bi-fold or tri-fold brochure presenting your enterprise services or property portfolio.',
      },
      {
        id: 'creative-video',
        name: 'Short Promotional Video Editing',
        price: 3500,
        billing: 'one-time',
        isStartingPrice: true,
        allowQuantity: true,
        defaultQty: 1,
        description: 'Under 60-second vertical Reel or TikTok edit with captions, cuts, sound effects, and branding.',
      },
      {
        id: 'creative-batch',
        name: 'Monthly Content Batch',
        price: 8000,
        billing: 'one-time',
        isStartingPrice: true,
        description: 'Pre-packaged batch of graphics and promotional creative assets ready for distribution.',
      },
    ],
  },
];

// ── Predefined Bundles Data ───────────────────────────────────────────────────

export const PREDEFINED_BUNDLES = [
  {
    id: 'bundle-essential',
    name: 'Essential Growth',
    priceMonthly: 15000,
    priceSetup: 0,
    tagline: 'Ideal for early-stage businesses needing consistent social visibility and planning.',
    features: [
      'Up to 8 social media posts per month',
      'Monthly strategic content planning',
      'Multi-channel social media scheduling',
      'Basic monthly performance & reach report',
      'WhatsApp support during business hours',
    ],
  },
  {
    id: 'bundle-growth',
    name: 'Growth Accelerate',
    priceMonthly: 30000,
    priceSetup: 5000, // setup for ad account / tracking
    popular: true,
    tagline: 'Our flagship package engineered for revenue-focused small & medium enterprises.',
    features: [
      'Up to 12 curated social media posts per month',
      'Full Meta Ads management & optimization',
      'Continuous campaign A/B testing & scaling',
      'WhatsApp lead-generation funnel support',
      'Monthly performance report & growth review',
      'Priority design turnaround',
    ],
  },
  {
    id: 'bundle-pro',
    name: 'Professional Market Leader',
    priceMonthly: 55000,
    priceSetup: 10000,
    tagline: 'Complete digital dominance combining social, paid ads, and continuous organic SEO.',
    features: [
      'Up to 16 high-impact social media posts',
      'Full Meta Ads management across platforms',
      'Continuous SEO & online visibility activities',
      'Content strategy, copywriting & keyword targeting',
      'Google Business Profile active management',
      'Bi-weekly strategic recommendations call',
    ],
  },
];

// ── Helper format currency ────────────────────────────────────────────────────

function formatKsh(amount) {
  if (amount === 0) return 'Custom quote';
  return 'KSh ' + Number(amount).toLocaleString('en-US');
}

// ── Main Page Component ───────────────────────────────────────────────────────

export default function ServicesPricing() {
  // View mode: 'calculator' or 'catalogue'
  const [activeTab, setActiveTab] = useState('calculator');

  // Calculator selection state:
  // selectedServices: { [serviceId]: { selected: boolean, quantity: number } }
  const [selectedServices, setSelectedServices] = useState({});
  const [selectedBundleId, setSelectedBundleId] = useState(null);

  // Client inputs
  const [clientName, setClientName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  // Search filter for catalogue
  const [catalogueFilter, setCatalogueFilter] = useState('');

  // Notify ReviJs Prerender engine that page is ready
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__REVI_READY__ = true;
    }
  }, []);

  // ── Lookup map of all selectable services ───────────────────────────────────

  const allServicesMap = useMemo(() => {
    const map = {};
    SERVICE_CATEGORIES.forEach((cat) => {
      cat.services.forEach((s) => {
        map[s.id] = { ...s, categoryTitle: cat.title };
      });
      if (cat.addOns) {
        cat.addOns.forEach((a) => {
          map[a.id] = { ...a, categoryTitle: `${cat.title} (Add-on)` };
        });
      }
    });
    return map;
  }, []);

  // ── Toggle service selection ────────────────────────────────────────────────

  const handleToggleService = (serviceId) => {
    setSelectedServices((prev) => {
      const current = prev[serviceId];
      if (current && current.selected) {
        const next = { ...prev };
        delete next[serviceId];
        return next;
      } else {
        const item = allServicesMap[serviceId];
        const defaultQty = item?.allowQuantity ? item.defaultQty || 1 : 1;
        return {
          ...prev,
          [serviceId]: { selected: true, quantity: defaultQty },
        };
      }
    });
  };

  const handleQuantityChange = (serviceId, delta) => {
    setSelectedServices((prev) => {
      const current = prev[serviceId];
      if (!current) return prev;
      const newQty = Math.max(1, (current.quantity || 1) + delta);
      return {
        ...prev,
        [serviceId]: { ...current, quantity: newQty },
      };
    });
  };

  const handleSelectBundle = (bundleId) => {
    if (selectedBundleId === bundleId) {
      setSelectedBundleId(null);
    } else {
      setSelectedBundleId(bundleId);
    }
  };

  const handleClearAll = () => {
    setSelectedServices({});
    setSelectedBundleId(null);
    setCustomNotes('');
  };

  // ── Calculations: 3 Figures ─────────────────────────────────────────────────

  const calculations = useMemo(() => {
    let oneTimeTotal = 0;
    let monthlyTotal = 0;
    let hasCustomQuote = false;
    let hasStartingPrices = false;
    const selectedList = [];

    // Bundle calculation
    if (selectedBundleId) {
      const bundle = PREDEFINED_BUNDLES.find((b) => b.id === selectedBundleId);
      if (bundle) {
        monthlyTotal += bundle.priceMonthly;
        oneTimeTotal += bundle.priceSetup || 0;
        selectedList.push({
          id: bundle.id,
          name: `${bundle.name} Bundle`,
          billing: 'monthly',
          price: bundle.priceMonthly,
          setupPrice: bundle.priceSetup || 0,
          quantity: 1,
          isBundle: true,
        });
      }
    }

    // Individual services calculation
    Object.entries(selectedServices).forEach(([sId, state]) => {
      if (!state.selected) return;
      const s = allServicesMap[sId];
      if (!s) return;

      const qty = state.quantity || 1;
      const unitPrice = s.price || 0;
      const lineTotal = unitPrice * qty;

      if (s.isCustomQuote) {
        hasCustomQuote = true;
      }
      if (s.isStartingPrice) {
        hasStartingPrices = true;
      }

      if (s.billing === 'monthly') {
        monthlyTotal += lineTotal;
      } else {
        oneTimeTotal += lineTotal;
      }

      selectedList.push({
        id: s.id,
        name: s.name,
        billing: s.billing,
        unitPrice,
        lineTotal,
        quantity: qty,
        isStartingPrice: s.isStartingPrice,
        isCustomQuote: s.isCustomQuote,
        category: s.categoryTitle,
      });
    });

    const firstMonthTotal = oneTimeTotal + monthlyTotal;

    return {
      oneTimeTotal,
      monthlyTotal,
      firstMonthTotal,
      selectedCount: selectedList.length,
      selectedList,
      hasCustomQuote,
      hasStartingPrices,
    };
  }, [selectedServices, selectedBundleId, allServicesMap]);

  // ── WhatsApp Message Formatter ──────────────────────────────────────────────

  const handleWhatsAppNegotiate = () => {
    const lines = [];
    lines.push('Hello Vantage Point Digital!');
    lines.push('');
    lines.push("I'd like to discuss a tailored digital package for my business.");
    lines.push('');

    if (businessName.trim() || clientName.trim()) {
      lines.push(`• Client / Business: ${businessName.trim() || clientName.trim()}`);
      if (clientName.trim() && businessName.trim()) {
        lines.push(`• Contact Person: ${clientName.trim()}`);
      }
      lines.push('');
    }

    if (calculations.selectedList.length > 0) {
      lines.push('Selected Services & Scope:');
      lines.push('----------------------------------');

      // Separate one-time vs monthly
      const oneTimeItems = calculations.selectedList.filter((item) => item.billing === 'one-time');
      const monthlyItems = calculations.selectedList.filter((item) => item.billing === 'monthly');

      if (oneTimeItems.length > 0) {
        lines.push('[ONE-TIME SETUP]');
        oneTimeItems.forEach((item) => {
          if (item.isCustomQuote) {
            lines.push(`• ${item.name} — Custom Quote`);
          } else {
            const prefix = item.isStartingPrice ? 'From ' : '';
            const qtyStr = item.quantity > 1 ? ` (x${item.quantity})` : '';
            lines.push(`• ${item.name}${qtyStr} — ${prefix}${formatKsh(item.lineTotal)}`);
          }
        });
        lines.push('');
      }

      if (monthlyItems.length > 0) {
        lines.push('[MONTHLY ONGOING SERVICES]');
        monthlyItems.forEach((item) => {
          const prefix = item.isStartingPrice ? 'From ' : '';
          const qtyStr = item.quantity > 1 ? ` (x${item.quantity})` : '';
          lines.push(`• ${item.name}${qtyStr} — ${prefix}${formatKsh(item.lineTotal || item.price)}/mo`);
        });
        lines.push('');
      }

      lines.push('----------------------------------');
      lines.push('ESTIMATED INVESTMENT BREAKDOWN:');
      lines.push(`1. One-Time Setup: ${formatKsh(calculations.oneTimeTotal)}`);
      lines.push(`2. Monthly Recurring: ${formatKsh(calculations.monthlyTotal)} / month`);
      lines.push(`3. Estimated 1st-Month Total: ${formatKsh(calculations.firstMonthTotal)}`);
      if (calculations.hasStartingPrices || calculations.hasCustomQuote) {
        lines.push('(*Subject to final scope confirmation)');
      }
      lines.push('');
    } else {
      lines.push("I would like to explore your service catalogue and discuss pricing for my project.");
      lines.push('');
    }

    if (customNotes.trim()) {
      lines.push('Project Requirements & Notes:');
      lines.push(`"${customNotes.trim()}"`);
      lines.push('');
    }

    lines.push("I'd like to discuss this quotation and explore possible adjustments and negotiations for my business.");

    const fullMessage = lines.join('\n');
    const encoded = encodeURIComponent(fullMessage);
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0A192F] text-white pt-28 pb-36 relative">
      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/#pricing"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Pricing Overview</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] font-sans">
              PROPOSED KENYAN MARKET PRICING · ALL PRICES IN KSH
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12]">
            Service Catalogue &amp; Pricing.
          </h1>

          <p className="mt-5 text-gray-300 font-sans text-base sm:text-lg leading-relaxed max-w-3xl">
            Explore our complete 8-category digital service directory below or use our interactive cost calculator to handpick services, model your one-time vs monthly investments, and start a WhatsApp negotiation.
          </p>
        </div>

        {/* View Switcher Tabs (Calculator vs Full Catalogue) */}
        <div className="flex flex-wrap items-center gap-3 p-1.5 bg-[#112240] rounded-2xl border border-white/10 w-fit mb-12 shadow-xl">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
              activeTab === 'calculator'
                ? 'bg-[#D4AF37] text-[#0A192F] shadow-lg shadow-[#D4AF37]/20'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Interactive Price Calculator</span>
            {calculations.selectedCount > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-[#0A192F] text-[#D4AF37] text-[10px] flex items-center justify-center font-bold">
                {calculations.selectedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('catalogue')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
              activeTab === 'catalogue'
                ? 'bg-[#D4AF37] text-[#0A192F] shadow-lg shadow-[#D4AF37]/20'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Complete Service Directory (8 Categories)</span>
          </button>
        </div>

        {/* ── TAB 1: INTERACTIVE CALCULATOR ─────────────────────────────────── */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left 7 Columns: Selection Modules */}
            <div className="lg:col-span-8 space-y-10">

              {/* Step 1: Predefined Bundles (Optional Shortcut) */}
              <div className="rounded-3xl bg-[#112240]/60 border border-white/10 p-6 sm:p-8 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37] block font-sans">
                      OPTION A · PREDEFINED DIGITAL GROWTH BUNDLE
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mt-1">
                      Choose an all-in-one recurring package
                    </h3>
                  </div>
                  {selectedBundleId && (
                    <button
                      onClick={() => setSelectedBundleId(null)}
                      className="text-xs text-gray-400 hover:text-[#D4AF37] underline flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Deselect package</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PREDEFINED_BUNDLES.map((bundle) => {
                    const isSelected = selectedBundleId === bundle.id;
                    return (
                      <div
                        key={bundle.id}
                        onClick={() => handleSelectBundle(bundle.id)}
                        className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between relative ${
                          isSelected
                            ? 'bg-[#0A192F] border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.15)] ring-1 ring-[#D4AF37]'
                            : 'bg-[#112240] border-white/5 hover:border-white/20'
                        }`}
                      >
                        {bundle.popular && (
                          <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#0A192F] text-[9px] font-bold uppercase tracking-wider">
                            Recommended
                          </div>
                        )}

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-serif text-lg font-bold text-white">
                              {bundle.name}
                            </h4>
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                isSelected
                                  ? 'border-[#D4AF37] bg-[#D4AF37] text-[#0A192F]'
                                  : 'border-white/20'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>

                          <div className="mb-3">
                            <span className="font-serif text-xl sm:text-2xl font-bold text-[#D4AF37]">
                              {formatKsh(bundle.priceMonthly)}
                            </span>
                            <span className="text-xs text-gray-400"> / month</span>
                          </div>

                          <p className="text-xs text-gray-300 leading-relaxed mb-4 min-h-[32px]">
                            {bundle.tagline}
                          </p>

                          <ul className="space-y-1.5 mb-4 text-[11px] text-gray-400">
                            {bundle.features.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-[#D4AF37] shrink-0">•</span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-3 border-t border-white/10 text-center">
                          <span className={`text-[11px] font-bold uppercase tracking-widest ${isSelected ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                            {isSelected ? '✓ Selected in Calculator' : '+ Select Bundle'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Individual Services Picker */}
              <div className="rounded-3xl bg-[#112240]/60 border border-white/10 p-6 sm:p-8 backdrop-blur-sm space-y-8">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37] block font-sans">
                    OPTION B · BESPOKE SERVICE SELECTION
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-1">
                    Select individual services &amp; add-ons
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Click any service to toggle it. Use the quantity counter for multi-unit services.
                  </p>
                </div>

                {SERVICE_CATEGORIES.map((category) => (
                  <div key={category.id} className="pt-6 border-t border-white/10">
                    <div className="mb-4">
                      <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                        {category.badge}
                      </span>
                      <h4 className="font-serif text-xl font-bold text-white mt-2">
                        {category.title}
                      </h4>
                      {category.note && (
                        <p className="text-xs text-[#D4AF37]/80 mt-1 italic font-sans">
                          {category.note}
                        </p>
                      )}
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {category.services.map((service) => {
                        const isSelected = !!selectedServices[service.id]?.selected;
                        const currentQty = selectedServices[service.id]?.quantity || 1;

                        return (
                          <div
                            key={service.id}
                            className={`rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between ${
                              isSelected
                                ? 'bg-[#0A192F] border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]/50'
                                : 'bg-[#112240] border-white/5 hover:border-white/15'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <label
                                onClick={() => handleToggleService(service.id)}
                                className="cursor-pointer flex-1"
                              >
                                <div className="flex items-center gap-2">
                                  <h5 className="font-serif text-base font-bold text-white leading-snug">
                                    {service.name}
                                  </h5>
                                </div>
                                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                  {service.description}
                                </p>
                              </label>

                              <button
                                onClick={() => handleToggleService(service.id)}
                                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                  isSelected
                                    ? 'border-[#D4AF37] bg-[#D4AF37] text-[#0A192F]'
                                    : 'border-white/30 hover:border-[#D4AF37]'
                                }`}
                                aria-label="Toggle service"
                              >
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </button>
                            </div>

                            <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 mt-2">
                              <div>
                                <span className="font-sans font-bold text-sm text-[#D4AF37]">
                                  {service.isStartingPrice && 'From '}
                                  {formatKsh(service.price)}
                                </span>
                                <span className="text-[11px] text-gray-400 block font-sans">
                                  {service.billing === 'monthly' ? 'per month' : 'one-time'}
                                </span>
                              </div>

                              {/* Quantity Stepper if applicable */}
                              {service.allowQuantity && isSelected && (
                                <div className="flex items-center gap-2 bg-[#112240] px-2 py-1 rounded-lg border border-white/10">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleQuantityChange(service.id, -1);
                                    }}
                                    className="p-1 hover:text-[#D4AF37] text-gray-300"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="font-mono text-xs font-bold text-white px-1">
                                    {currentQty}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleQuantityChange(service.id, 1);
                                    }}
                                    className="p-1 hover:text-[#D4AF37] text-gray-300"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Add-ons Sub-strip if exists */}
                    {category.addOns && category.addOns.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-dashed border-white/10">
                        <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400 block mb-2 font-sans">
                          Optional Add-ons:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {category.addOns.map((addon) => {
                            const isSelected = !!selectedServices[addon.id]?.selected;
                            const currentQty = selectedServices[addon.id]?.quantity || 1;

                            return (
                              <div
                                key={addon.id}
                                onClick={() => handleToggleService(addon.id)}
                                className={`cursor-pointer rounded-xl p-3 border transition-all duration-200 flex items-center justify-between gap-3 ${
                                  isSelected
                                    ? 'bg-[#0A192F] border-[#D4AF37]'
                                    : 'bg-[#112240]/50 border-white/5 hover:border-white/20'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                  <div
                                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                      isSelected
                                        ? 'border-[#D4AF37] bg-[#D4AF37] text-[#0A192F]'
                                        : 'border-white/20'
                                    }`}
                                  >
                                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>
                                  <div className="truncate">
                                    <p className="text-xs font-semibold text-white truncate">
                                      {addon.name}
                                    </p>
                                    <p className="text-[11px] text-[#D4AF37] font-sans">
                                      {addon.isStartingPrice && 'From '}
                                      {formatKsh(addon.price)}
                                      {addon.billing === 'monthly' ? '/mo' : ''}
                                    </p>
                                  </div>
                                </div>

                                {addon.allowQuantity && isSelected && (
                                  <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-1.5 bg-[#112240] px-1.5 py-0.5 rounded border border-white/10 shrink-0"
                                  >
                                    <button
                                      onClick={() => handleQuantityChange(addon.id, -1)}
                                      className="p-1 hover:text-[#D4AF37]"
                                    >
                                      <Minus className="w-2.5 h-2.5" />
                                    </button>
                                    <span className="font-mono text-xs font-bold px-1">
                                      {currentQty}
                                    </span>
                                    <button
                                      onClick={() => handleQuantityChange(addon.id, 1)}
                                      className="p-1 hover:text-[#D4AF37]"
                                    >
                                      <Plus className="w-2.5 h-2.5" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Step 3: Custom Project Notes & Client Details */}
              <div className="rounded-3xl bg-[#112240]/60 border border-white/10 p-6 sm:p-8 backdrop-blur-sm space-y-4">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37] block font-sans">
                  STEP 3 · OPTIONAL PROJECT NOTES &amp; CONTEXT
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Tell us about your timeline &amp; requirements
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1.5 font-sans">
                      Your Name / Contact Person
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Victor Kamau"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-[#0A192F] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1.5 font-sans">
                      Business or Brand Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Safari Luxury Tours"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full bg-[#0A192F] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1.5 font-sans">
                    Custom Requirements / Scope Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. We need M-Pesa integration with Daraja API, multi-currency support, and want to launch before next quarter..."
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="w-full bg-[#0A192F] border border-white/10 focus:border-[#D4AF37] rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Notice: Always Quoted Separately */}
              <div className="rounded-2xl bg-[#0A192F] border border-white/10 p-5 flex items-start gap-3.5">
                <AlertCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="text-xs text-gray-400 space-y-1">
                  <span className="font-semibold text-white block">
                    Transparent Billing Policy — Always Quoted Separately:
                  </span>
                  <p>
                    Third-party platform costs (such as Meta/Google ad spend, domain registrar fees, hosting renewals, SMS/M-Pesa API gateways, and commercial stock photos) are billed directly to your account with zero agency markup.
                  </p>
                </div>
              </div>

            </div>

            {/* Right 4 Columns: Sticky Live Quotation Summary Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div className="rounded-3xl bg-[#112240] border-2 border-[#D4AF37]/40 shadow-2xl p-6 sm:p-7 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] block font-sans">
                      LIVE ESTIMATE
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white">
                      Your Quotation Summary
                    </h3>
                  </div>
                  {calculations.selectedCount > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="text-[11px] text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1 font-sans"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* The 3 Core Figures Display */}
                <div className="space-y-4 mb-6">
                  {/* Figure 1: One-time setup */}
                  <div className="bg-[#0A192F]/80 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 block font-sans">
                        1. ONE-TIME SETUP
                      </span>
                      <span className="text-xs text-gray-400">Design, development &amp; launch</span>
                    </div>
                    <span className="font-serif text-xl font-bold text-white">
                      {formatKsh(calculations.oneTimeTotal)}
                    </span>
                  </div>

                  {/* Figure 2: Monthly Recurring */}
                  <div className="bg-[#0A192F]/80 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 block font-sans">
                        2. MONTHLY SERVICES
                      </span>
                      <span className="text-xs text-gray-400">Ongoing management &amp; growth</span>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-xl font-bold text-white">
                        {formatKsh(calculations.monthlyTotal)}
                      </span>
                      <span className="text-[11px] text-gray-400 block">/ month</span>
                    </div>
                  </div>

                  {/* Figure 3: Estimated First Month Total (Highlighted) */}
                  <div className="bg-gradient-to-br from-[#D4AF37]/20 via-[#112240] to-[#0A192F] p-5 rounded-2xl border-2 border-[#D4AF37] shadow-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] font-sans">
                        3. ESTIMATED 1ST-MONTH TOTAL
                      </span>
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <div className="flex items-baseline justify-between mt-2">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
                        {formatKsh(calculations.firstMonthTotal)}
                      </span>
                      <span className="text-xs text-gray-300 font-sans">
                        Setup + 1st mo
                      </span>
                    </div>
                  </div>
                </div>

                {/* Selected Items Breakdown List */}
                <div className="mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-3 font-sans">
                    INCLUDED IN THIS ESTIMATE ({calculations.selectedCount}):
                  </span>

                  {calculations.selectedList.length === 0 ? (
                    <div className="text-center py-6 border border-dashed border-white/10 rounded-2xl bg-[#0A192F]/40 p-4">
                      <p className="text-xs text-gray-400 leading-relaxed">
                        No services selected yet. Pick a bundle or check individual services above to build your package.
                      </p>
                    </div>
                  ) : (
                    <div className="max-h-56 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                      {calculations.selectedList.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 gap-2"
                        >
                          <span className="text-gray-300 truncate">
                            {item.quantity > 1 ? `(${item.quantity}x) ` : ''}
                            {item.name}
                          </span>
                          <span className="font-mono text-[#D4AF37] shrink-0 font-semibold">
                            {item.isCustomQuote
                              ? 'Quote'
                              : `${item.isStartingPrice ? 'From ' : ''}${formatKsh(item.lineTotal || item.price)}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Main WhatsApp Negotiation Button */}
                <button
                  onClick={handleWhatsAppNegotiate}
                  className="w-full py-4 px-6 rounded-2xl bg-[#25D366] text-[#0A192F] font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2.5 transition-all duration-300 shadow-xl shadow-[#25D366]/20 hover:bg-[#20b858] hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-[#0A192F]" />
                  <span>Discuss &amp; Negotiate on WhatsApp</span>
                </button>

                <p className="text-[11px] text-gray-400 text-center mt-3 font-sans">
                  Instantly drafts your custom itemized selection into WhatsApp. No obligation.
                </p>
              </div>

              {/* Consultation Card */}
              <div className="rounded-2xl bg-[#112240]/80 border border-white/10 p-6 text-center">
                <h4 className="font-serif text-lg font-bold text-white mb-2">
                  Need a custom corporate tender or PDF quotation?
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  We prepare formal itemized proposals and service level agreements (SLAs) within 24 hours.
                </p>
                <a
                  href={`tel:+${WHATSAPP_PHONE}`}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#D4AF37] hover:underline"
                >
                  <span>Call +254 758 850 766</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>
        )}

        {/* ── TAB 2: COMPLETE SERVICE DIRECTORY (ALL 8 CATEGORIES) ─────────── */}
        {activeTab === 'catalogue' && (
          <div className="space-y-12">

            {/* Filter Search */}
            <div className="max-w-md">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter services by keyword (e.g. SEO, M-Pesa, Logo)..."
                  value={catalogueFilter}
                  onChange={(e) => setCatalogueFilter(e.target.value)}
                  className="w-full bg-[#112240] border border-white/10 focus:border-[#D4AF37] rounded-full pl-11 pr-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* The 8 Categories */}
            {SERVICE_CATEGORIES.map((category) => {
              const matchingServices = category.services.filter(
                (s) =>
                  !catalogueFilter ||
                  s.name.toLowerCase().includes(catalogueFilter.toLowerCase()) ||
                  s.description.toLowerCase().includes(catalogueFilter.toLowerCase())
              );

              if (catalogueFilter && matchingServices.length === 0) return null;

              return (
                <div
                  key={category.id}
                  className="rounded-3xl bg-[#112240]/70 border border-white/10 p-6 sm:p-10 backdrop-blur-sm"
                >
                  <div className="max-w-3xl mb-8">
                    <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                      {category.badge}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-3">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-gray-300 text-sm sm:text-base leading-relaxed">
                      {category.description}
                    </p>
                    {category.note && (
                      <p className="text-xs text-[#D4AF37] mt-2 italic font-sans">
                        {category.note}
                      </p>
                    )}
                  </div>

                  {/* Table of Services */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-gray-400 font-sans">
                          <th className="py-3.5 pr-4">Service</th>
                          <th className="py-3.5 px-4 hidden md:table-cell">Deliverable Scope</th>
                          <th className="py-3.5 px-4">Billing</th>
                          <th className="py-3.5 px-4">Price (KSh)</th>
                          <th className="py-3.5 pl-4 text-right">Calculator</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-sm">
                        {matchingServices.map((service) => {
                          const isSelected = !!selectedServices[service.id]?.selected;
                          return (
                            <tr
                              key={service.id}
                              className="hover:bg-white/[0.02] transition-colors group"
                            >
                              <td className="py-4 pr-4">
                                <div className="font-serif font-bold text-white text-base">
                                  {service.name}
                                </div>
                                <div className="text-xs text-gray-400 md:hidden mt-1">
                                  {service.description}
                                </div>
                              </td>

                              <td className="py-4 px-4 text-xs text-gray-300 hidden md:table-cell max-w-sm leading-relaxed">
                                {service.description}
                              </td>

                              <td className="py-4 px-4 text-xs font-sans uppercase tracking-wider text-gray-400">
                                {service.billing === 'monthly' ? (
                                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                    Monthly
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">
                                    One-time
                                  </span>
                                )}
                              </td>

                              <td className="py-4 px-4 font-sans font-bold text-[#D4AF37] text-base whitespace-nowrap">
                                {service.isStartingPrice && 'From '}
                                {formatKsh(service.price)}
                                {service.billing === 'monthly' && (
                                  <span className="text-xs text-gray-400 font-normal"> / mo</span>
                                )}
                              </td>

                              <td className="py-4 pl-4 text-right whitespace-nowrap">
                                <button
                                  onClick={() => handleToggleService(service.id)}
                                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                                    isSelected
                                      ? 'bg-[#D4AF37] text-[#0A192F]'
                                      : 'bg-[#0A192F] text-gray-300 border border-white/10 hover:border-[#D4AF37] hover:text-white'
                                  }`}
                                >
                                  {isSelected ? '✓ In Quote' : '+ Add'}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Add-ons section if present */}
                  {category.addOns && category.addOns.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <h4 className="font-serif text-lg font-bold text-[#D4AF37] mb-3">
                        Category Add-ons
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {category.addOns.map((addon) => {
                          const isSelected = !!selectedServices[addon.id]?.selected;
                          return (
                            <div
                              key={addon.id}
                              className="rounded-2xl p-4 bg-[#0A192F] border border-white/5 flex flex-col justify-between"
                            >
                              <div>
                                <span className="font-serif text-sm font-bold text-white block">
                                  {addon.name}
                                </span>
                                <span className="text-xs text-[#D4AF37] font-sans font-bold mt-1 block">
                                  {addon.isStartingPrice && 'From '}
                                  {formatKsh(addon.price)}
                                  {addon.billing === 'monthly' ? '/mo' : ''}
                                </span>
                              </div>
                              <button
                                onClick={() => handleToggleService(addon.id)}
                                className={`mt-3 py-1 px-3 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors w-full text-center ${
                                  isSelected
                                    ? 'bg-[#D4AF37] text-[#0A192F]'
                                    : 'border border-white/10 text-gray-300 hover:border-[#D4AF37]'
                                }`}
                              >
                                {isSelected ? '✓ Added' : '+ Add to Quote'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Category 8: Predefined Monthly Growth Packages in Catalogue */}
            <div className="rounded-3xl bg-[#112240]/70 border border-white/10 p-6 sm:p-10 backdrop-blur-sm">
              <div className="max-w-3xl mb-8">
                <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                  Full Recurring Coverage
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-3">
                  8. Monthly Digital Growth Packages
                </h3>
                <p className="mt-2 text-gray-300 text-sm sm:text-base leading-relaxed">
                  Turnkey retainers combining social media execution, paid advertising campaigns, and continuous search visibility under one dedicated digital lead.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PREDEFINED_BUNDLES.map((bundle) => {
                  const isSelected = selectedBundleId === bundle.id;
                  return (
                    <div
                      key={bundle.id}
                      className={`rounded-2xl p-7 flex flex-col justify-between border transition-all duration-300 ${
                        bundle.popular
                          ? 'bg-[#0A192F] border-2 border-[#D4AF37] shadow-xl'
                          : 'bg-[#112240] border-white/10'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-serif text-xl font-bold text-white">{bundle.name}</h4>
                          {bundle.popular && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#D4AF37] text-[#0A192F]">
                              Recommended
                            </span>
                          )}
                        </div>

                        <div className="mb-4">
                          <span className="font-serif text-3xl font-bold text-[#D4AF37]">
                            {formatKsh(bundle.priceMonthly)}
                          </span>
                          <span className="text-xs text-gray-400"> / month</span>
                        </div>

                        <p className="text-xs text-gray-300 leading-relaxed mb-6">
                          {bundle.tagline}
                        </p>

                        <div className="space-y-2.5 mb-8 text-xs text-gray-300">
                          {bundle.features.map((f, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          handleSelectBundle(bundle.id);
                          setActiveTab('calculator');
                        }}
                        className={`w-full py-3 px-4 rounded-xl text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#D4AF37] text-[#0A192F]'
                            : 'bg-[#0A192F] text-white border border-white/10 hover:border-[#D4AF37]'
                        }`}
                      >
                        {isSelected ? '✓ Selected · Open Calculator' : 'Select Package in Calculator'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

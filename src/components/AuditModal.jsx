import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Phone, MessageCircle } from 'lucide-react';

const PHONE = '+254758850766';
const WHATSAPP_URL = `https://wa.me/254758850766`;
const CALL_URL = `tel:${PHONE}`;

export default function AuditModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    budget: 'Business ($40k)',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      website: '',
      budget: 'Business ($40k)',
      notes: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0A192F]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg bg-[#112240] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 text-white shadow-2xl z-10 overflow-hidden"
        >
          {/* Subtle gold glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>COMPLIMENTARY ANALYSIS</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Request Your Free Audit
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mt-1">
                  We analyze your speed, SEO authority, and conversion bottlenecks, then deliver a tailored video teardown.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0A192F] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="julian@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0A192F] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                    Current Website URL
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://yourbrand.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0A192F] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
                    Estimated Project Scope
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0A192F] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
                  >
                    <option value="Starter (KSh 25k)">Starter Plan (KSh 25,000)</option>
                    <option value="Business (KSh 40k)">Business Plan (KSh 40,000 — Recommended)</option>
                    <option value="Professional (KSh 60k)">Professional Plan (KSh 60,000+)</option>
                    <option value="Custom Enterprise">Custom Enterprise Digital Project</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#D4AF37] text-[#0A192F] font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-[#c49f2c] transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    <span>Receive Teardown within 24 Hours</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-[11px] text-gray-500 uppercase tracking-widest">or reach us directly</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Direct Contact Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={CALL_URL}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0A192F] border border-white/10 hover:border-[#D4AF37]/50 text-white text-xs font-semibold tracking-wide transition-all duration-200 group"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                    <span>Call Us</span>
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0A192F] border border-white/10 hover:border-[#25D366]/50 text-white text-xs font-semibold tracking-wide transition-all duration-200 group"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366] group-hover:scale-110 transition-transform" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Strict NDA discretion guaranteed. Zero sales spam.</span>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Audit Request Confirmed
              </h3>
              <p className="text-gray-300 text-sm max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-[#D4AF37] font-semibold">{formData.name}</span>. Our senior technical director is personally reviewing <span className="text-white underline">{formData.website}</span>.
              </p>
              <p className="text-gray-400 text-xs">
                You can also reach us directly at{' '}
                <a href={CALL_URL} className="text-[#D4AF37] hover:underline font-mono">{PHONE}</a>
              </p>
              <div className="pt-4 flex items-center justify-center gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/25 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-full bg-[#0A192F] border border-white/10 text-white text-xs font-semibold hover:bg-white/5 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

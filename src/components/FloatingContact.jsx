import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone } from 'lucide-react';

const PHONE = '+254758850766';
const WHATSAPP_URL = `https://wa.me/254758850766?text=Hi%20Vantage%20Point%20Digital%2C%20I%27d%20like%20to%20discuss%20a%20project.`;
const CALL_URL = `tel:+254758850766`;

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Contact Bubble */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-[#112240] border border-[#D4AF37]/30 rounded-2xl shadow-2xl p-4 w-56 text-white"
          >
            <p className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold mb-3">
              Contact Us Now
            </p>

            {/* WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 hover:border-[#25D366]/60 hover:bg-[#25D366]/20 transition-all duration-200 mb-2 group"
            >
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">WhatsApp</p>
                <p className="text-[10px] text-gray-400 font-mono">{PHONE}</p>
              </div>
            </a>

            {/* Call */}
            <a
              href={CALL_URL}
              className="flex items-center gap-3 p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/20 transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#0A192F]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Call Us</p>
                <p className="text-[10px] text-gray-400 font-mono">{PHONE}</p>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.4)] flex items-center justify-center transition-all duration-300 hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)]"
        aria-label="Contact us on WhatsApp or by phone"
      >
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {open ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </motion.span>

        {/* Animated ring pulse when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        )}
      </motion.button>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Show after scrolling past 280px
      if (currentScrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate scroll progress percentage (0 - 100)
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG circular progress parameters
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.4, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 30 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-40 select-none group"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.92 }}
            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#112240]/90 backdrop-blur-md border border-[#D4AF37]/30 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex items-center justify-center text-white transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:border-[#D4AF37] cursor-pointer"
            aria-label="Scroll back to top"
          >
            {/* SVG Circular Scroll Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
              viewBox="0 0 52 52"
            >
              {/* Background circle track */}
              <circle
                cx="26"
                cy="26"
                r={radius}
                className="text-white/10 stroke-current"
                strokeWidth="2.5"
                fill="transparent"
              />
              {/* Animated Progress indicator in Vantage Point Gold */}
              <circle
                cx="26"
                cy="26"
                r={radius}
                className="text-[#D4AF37] stroke-current transition-all duration-150 ease-out"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Upward Arrow Icon with subtle hover float */}
            <motion.div
              className="relative z-10 flex items-center justify-center text-[#D4AF37] group-hover:text-white transition-colors duration-200"
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <ArrowUp className="w-5 h-5 stroke-[2.5]" />
            </motion.div>

            {/* Glowing gold ambient ring on hover */}
            <span className="absolute inset-0 rounded-full bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.button>

          {/* Tooltip on hover */}
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#0A192F] border border-white/10 text-[10px] uppercase tracking-widest text-[#D4AF37] font-sans font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg hidden sm:block">
            Top ({Math.round(scrollProgress)}%)
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

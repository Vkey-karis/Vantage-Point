import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuditModal from './components/AuditModal';
import FloatingContact from './components/FloatingContact';
import Home from './pages/Home';
import Blog from './pages/Blog';
import SinglePost from './pages/SinglePost';

// Automatically scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const handleOpenAudit = () => setIsAuditModalOpen(true);
  const handleCloseAudit = () => setIsAuditModalOpen(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div id="top" className="min-h-screen bg-[#0A192F] text-white selection:bg-[#D4AF37] selection:text-[#0A192F] flex flex-col justify-between">
        {/* Sticky Navigation */}
        <Navbar onOpenAudit={handleOpenAudit} />

        {/* Application Page Routing */}
        <Routes>
          <Route path="/" element={<Home onOpenAudit={handleOpenAudit} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<SinglePost />} />
        </Routes>

        {/* Footer with white & gold logo */}
        <Footer />

        {/* Interactive Free Audit Modal */}
        <AuditModal isOpen={isAuditModalOpen} onClose={handleCloseAudit} />

        {/* Persistent floating WhatsApp / Call button */}
        <FloatingContact />
      </div>
    </BrowserRouter>
  );
}

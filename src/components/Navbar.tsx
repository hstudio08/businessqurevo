"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Optimize glassmorphism by slightly darkening the background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Why choose us', href: '#why-qurevo' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'pt-2' : 'pt-6'
      } px-4 sm:px-6`}
    >
      <nav 
        className={`max-w-[1400px] mx-auto rounded-full transition-all duration-300 border ${
          isScrolled 
            ? 'bg-[#06110a]/60 backdrop-blur-2xl border-lime_cream/20 shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(236,243,158,0.05)] py-3' 
            : 'bg-white/5 backdrop-blur-md border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-4'
        } px-6 lg:px-8 flex items-center justify-between`}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group z-50">
          <div className="w-8 h-8 bg-gradient-to-tr from-lime_cream to-fern rounded-br-xl rounded-tl-xl flex items-center justify-center shadow-[0_0_15px_rgba(236,243,158,0.5)] group-hover:shadow-[0_0_25px_rgba(236,243,158,0.8)] transition-shadow duration-300"></div>
          <span className="text-xl font-bold tracking-tight text-white">
            QUREVO <span className="text-lime_cream font-medium">Businesses</span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-300 hover:text-lime_cream hover:drop-shadow-[0_0_8px_rgba(236,243,158,0.5)] transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* DESKTOP CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <Link 
            href="/login" 
            className="px-5 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 hover:border-lime_cream/50 transition-all flex items-center gap-2"
          >
            <User size={16} /> Login
          </Link>
          <Link 
            href="/register" 
            className="px-5 py-2.5 rounded-full bg-lime_cream text-evergreen text-sm font-bold hover:bg-[#d8e08d] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(236,243,158,0.3)] hover:shadow-[0_0_30px_rgba(236,243,158,0.6)]"
          >
            Register Business <ArrowRight size={16} />
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="lg:hidden relative z-50 p-2 text-gray-300 hover:text-lime_cream transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* MOBILE MENU OVERLAY (Frosted Glass) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-[80px] left-4 right-4 bg-[#06110a]/90 backdrop-blur-3xl border border-lime_cream/20 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(236,243,158,0.05)] flex flex-col gap-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-200 hover:text-lime_cream transition-colors border-b border-white/5 pb-2"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex flex-col gap-3 mt-2">
              <Link 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 flex items-center justify-center gap-2 transition-colors"
              >
                <User size={18} /> Login
              </Link>
              <Link 
                href="/register" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-lime_cream text-evergreen font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(236,243,158,0.3)]"
              >
                Register Business <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
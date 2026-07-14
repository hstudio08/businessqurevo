"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Aesthetic */}
      <div className="absolute top-0 left-0 w-full h-[55vh] bg-gradient-to-b from-[#f8fdfa] to-slate-50 z-0 border-b border-emerald-100/50">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-emerald-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-10 sm:p-16 max-w-2xl w-full text-center shadow-xl shadow-slate-200/50"
      >
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CheckCircle2 size={48} className="text-emerald-600" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Application Submitted!</h1>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Thank you for choosing Qurevo. Our experts are reviewing your details and will begin crafting your premium business presence. We will be in touch shortly.
        </p>

        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-8 py-4 rounded-xl font-bold transition-all shadow-md"
        >
          Return to Homepage <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  );
}
"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { XCircle, CheckCircle2, Sparkles, AlertTriangle } from 'lucide-react';

// Animation Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const sparkleAnimate: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    rotate: [0, 90, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  }
};

export default function ProblemSolution() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#06110a] text-white z-10">
      
      {/* Background Geometries & Glassmorphism Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        {/* Abstract Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-hunter_green-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-fern-600/20 rounded-full blur-[150px]"></div>
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-lime_cream/5 rounded-[100%] blur-[100px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-20">
        
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-20"
          id="why-qurevo"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 text-sm font-medium text-gray-300 mb-6 shadow-lg">
            <Sparkles className="w-4 h-4 mr-2 text-lime_cream" />
            The Qurevo Difference
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Stop losing customers to a <br/>
            <span className="text-gray-500 line-through decoration-red-500/50">missing</span> online presence.
          </motion.h2>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* THE PROBLEM CARD (Glassmorphism + Dark Red Accents) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="relative group rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:bg-white/[0.07] transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 to-transparent rounded-t-3xl opacity-50"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                <AlertTriangle size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">The Old Way</h3>
                <p className="text-sm text-gray-400 font-medium mt-1">Fragmented & Frustrating</p>
              </div>
            </div>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Millions of small businesses miss out on growth because they rely entirely on outdated methods, lacking a unified digital footprint.
            </p>

            <ul className="space-y-5">
              {[
                "Relying solely on word of mouth, WhatsApp, or visiting cards",
                "No professional, Google-searchable business page",
                "Traditional websites are far too expensive to build",
                "Confusing website builders that require technical skills"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5 opacity-80" />
                  <span className="text-gray-400 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* THE SOLUTION CARD (Glassmorphism + lime_cream Accents + Sparkles) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.2 }}
            className="relative rounded-3xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl border border-lime_cream/30 p-8 lg:p-12 shadow-[0_0_50px_rgba(236,243,158,0.1)] hover:shadow-[0_0_60px_rgba(236,243,158,0.15)] transition-all duration-300 overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime_cream/10 rounded-full blur-[80px] pointer-events-none"></div>

            {/* Floating Sparkles Array */}
            <motion.div variants={sparkleAnimate} animate="animate" className="absolute top-12 right-12 text-lime_cream/40">
              <Sparkles size={24} />
            </motion.div>
            <motion.div variants={sparkleAnimate} animate="animate" transition={{ delay: 1 }} className="absolute bottom-16 right-24 text-lime_cream/30">
              <Sparkles size={16} />
            </motion.div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-lime_cream text-evergreen flex items-center justify-center shadow-[0_0_30px_rgba(236,243,158,0.4)]">
                  <Sparkles size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">The Qurevo Solution</h3>
                  <p className="text-sm text-lime_cream font-medium mt-1">Seamless & Managed</p>
                </div>
              </div>

              <p className="text-gray-200 text-lg mb-8 leading-relaxed font-medium">
                We handle the entire process—from onboarding to publishing. For an affordable yearly subscription, you get a premium online identity.
              </p>

              <ul className="space-y-5">
                {[
                  "Professionally designed, mobile-friendly business page",
                  "Absolutely no coding or technical knowledge required",
                  "Optimized for Google Search (SEO) and fast loading speeds",
                  "Hosted and maintained entirely by our expert team"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-lime_cream shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(236,243,158,0.5)]" />
                    <span className="text-white font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
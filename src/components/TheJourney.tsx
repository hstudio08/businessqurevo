"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { FileText, PenTool, MessagesSquare, Rocket, Sparkles, CheckCircle2 } from 'lucide-react';

export default function TheJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Smart Scroll Animation for the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      id: "01",
      title: "Register Your Business",
      description: "Provide your business details, upload your logo, and add up to 10 photos. You will also select your desired pricing plan here (visible later in your admin panel).",
      icon: <FileText size={24} className="text-lime_cream" />,
      glowColor: "shadow-[0_0_30px_rgba(236,243,158,0.3)]"
    },
    {
      id: "02",
      title: "Expert Review & Crafting",
      description: "Your application enters our secure dashboard. Our experts review your details and manually craft a polished, SEO-optimized, and mobile-friendly business page.",
      icon: <PenTool size={24} className="text-lime_cream" />,
      glowColor: "shadow-[0_0_30px_rgba(236,243,158,0.3)]"
    },
    {
      id: "03",
      title: "Final Discussions",
      description: "Before we go live, we connect with you for a final review. We ensure every detail aligns perfectly with your brand's vision and our premium standards.",
      icon: <MessagesSquare size={24} className="text-lime_cream" />,
      glowColor: "shadow-[0_0_30px_rgba(236,243,158,0.3)]"
    },
    {
      id: "04",
      title: "Publish & Payment",
      description: "Your custom business page goes live! After making your payment, you will receive an official invoice. Please keep this invoice safe for future proof of acquired services.",
      icon: <Rocket size={24} className="text-lime_cream" />,
      glowColor: "shadow-[0_0_40px_rgba(236,243,158,0.5)]"
    }
  ];

const pricingPlans = [
  {
    name: "Starter",
    price: "₹75",
    duration: "/mo",
    billing: "Available in 1, 3, 6, or 12-month cycles",
    recommended: false,
    features: [
      "Essential digital presence",
      "Standard business listing",
      "Basic customer support",
      "Up to 10 brand assets"
    ]
  },
  {
    name: "Premium",
    price: "₹100",
    duration: "/mo",
    billing: "Available in 1, 3, 6, or 12-month cycles",
    recommended: true,
    features: [
      "Advanced features & growth",
      "Priority search placement",
      "Priority customer support",
      "Extended custom descriptions"
    ]
  },
  {
    name: "Premium Plus",
    price: "₹125",
    duration: "/mo",
    billing: "Available in 1, 3, 6, or 12-month cycles",
    recommended: false,
    features: [
      "Ultimate visibility & scaling",
      "Top-tier search ranking",
      "24/7 dedicated assistance",
      "Full suite of marketing tools"
    ]
  }
];

  // Animation variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-[#06110a] text-white overflow-hidden relative" id="how-it-works">
      
      {/* Background Glassmorphism Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none -z-10"></div>
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-hunter_green/20 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-lime_cream/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* --- JOURNEY HEADER --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 text-sm font-medium text-lime_cream mb-6 shadow-lg">
            <Sparkles className="w-4 h-4 mr-2" />
            The Process
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            From registration to a <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime_cream to-fern">live business</span>
          </h2>
          <p className="text-lg text-gray-400">
            A simple, guided 4-step journey. We handle the heavy lifting while you focus on your business.
          </p>
        </motion.div>

        {/* --- TIMELINE SECTION --- */}
        <div className="relative mb-40" ref={containerRef}>
          
          {/* Base Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/5 rounded-full" />
          
          {/* Animated Glowing Vertical Line */}
          <motion.div 
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-lime_cream via-fern to-transparent rounded-full shadow-[0_0_15px_rgba(236,243,158,0.5)]"
            style={{ height: lineHeight, top: 0 }}
          />

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-12 md:space-y-24 relative z-10"
          >
            {steps.map((step, index) => (
              <motion.div 
                key={step.id} 
                variants={fadeUp}
                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Center Node (Number) */}
                <div className={`hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-[#06110a] border-2 border-lime_cream/30 items-center justify-center z-20 ${step.glowColor} transition-shadow duration-500`}>
                  <div className="absolute inset-2 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <span className="text-lg font-bold text-lime_cream">{step.id}</span>
                  </div>
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 px-4 md:px-12">
                  <div className={`group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:bg-white/10 hover:border-lime_cream/30 hover:-translate-y-2 transition-all duration-300 overflow-hidden ${index % 2 === 0 ? 'md:text-left' : 'md:text-right text-left'}`}>
                    
                    {/* Hover Glow Effect inside card */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-lime_cream/5 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className={`flex items-center mb-6 ${index % 2 === 0 ? 'justify-start' : 'md:justify-end justify-start'}`}>
                      <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner group-hover:bg-lime_cream/10 group-hover:scale-110 transition-all duration-300 ${index % 2 === 0 ? 'mr-5' : 'md:ml-5 mr-5 md:mr-0 order-first md:order-last'}`}>
                        {step.icon}
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-lime_cream transition-colors duration-300">{step.title}</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

{/* --- PRICING SECTION --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-16 pt-16 border-t border-white/10"
          id="pricing"
        >
          <h2 className="text-sm font-bold tracking-widest text-lime_cream uppercase mb-3">Simple Pricing</h2>
          <p className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl lg:text-5xl">
            Choose the plan that fits your business
          </p>
          <p className="mt-4 text-lg text-gray-400">
            Start with our flexible short-term monthly plans, or maximize your savings with our annual subscriptions.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {pricingPlans.map((plan) => (
            <motion.div 
              key={plan.name}
              variants={fadeUp}
              className={`relative bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 lg:p-10 flex flex-col border transition-all duration-300 ${
                plan.recommended 
                  ? 'border-lime_cream/50 shadow-[0_20px_50px_rgba(236,243,158,0.15)] scale-105 z-10 bg-white/10' 
                  : 'border-white/10 shadow-lg hover:bg-white/10 hover:border-white/20 z-0'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-lime_cream text-evergreen text-xs font-bold uppercase tracking-wider py-1.5 px-5 rounded-full shadow-[0_0_20px_rgba(236,243,158,0.4)]">
                  <Sparkles size={14} />
                  Best Value
                </div>
              )}
              
              <div className="mb-8 border-b border-white/10 pb-8">
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl lg:text-5xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-gray-400 font-medium">{plan.duration}</span>
                </div>
                <p className={`text-xs mt-4 font-medium inline-block px-3 py-1.5 rounded-full ${plan.recommended ? 'bg-lime_cream/20 text-lime_cream' : 'bg-white/10 text-gray-300'}`}>
                  {plan.billing}
                </p>
              </div>

              <ul className="space-y-5 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className={`w-5 h-5 mr-3 shrink-0 mt-0.5 ${plan.recommended ? 'text-lime_cream' : 'text-gray-400'}`} />
                    <span className="text-gray-300 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="/register" 
                className={`w-full py-4 px-6 rounded-2xl font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.recommended 
                    ? 'bg-lime_cream text-evergreen hover:bg-[#d8e08d] shadow-[0_0_20px_rgba(236,243,158,0.3)] hover:shadow-[0_0_30px_rgba(236,243,158,0.5)]' 
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                Select {plan.name}
              </a>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
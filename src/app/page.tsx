"use client";

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { 
  Globe, Smartphone, MessageCircle, ShieldCheck, Tag,
  Star, PlayCircle, Phone, MapPin, Search, CheckCircle2, Headphones
} from 'lucide-react';
import ProblemSolution from '@/components/ProblemSolution';
import TheJourney from '@/components/TheJourney';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

// Punchy Animation Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const float: Variants = {
  animate: { y: [0, -10, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
};

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-28 pb-16 lg:pt-40 lg:pb-32 px-4 sm:px-6 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 z-10 min-h-screen">
        
        {/* Background Glows (Optimized for mobile GPU) */}
        <div className="absolute top-1/4 left-[-10%] w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-hunter_green-600/30 rounded-full blur-[80px] lg:blur-[150px] pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-[-10%] w-[300px] h-[300px] lg:w-[800px] lg:h-[800px] bg-fern-600/20 rounded-full blur-[80px] lg:blur-[150px] pointer-events-none -z-10" />

        {/* LEFT COLUMN: Copy & CTAs */}
        <motion.div 
          className="flex-1 relative z-20 w-full flex flex-col items-center lg:items-start text-center lg:text-left"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-300 mb-6 sm:mb-8 shadow-lg">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-lime_cream fill-lime_cream shrink-0" />
            <span>Professional. Affordable. Trusted by Qurevo.</span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-[85px] font-extrabold tracking-tight text-white leading-[1.1] sm:leading-[1.05] mb-6">
            Get Your <br className="hidden sm:block" />
            Business <br className="hidden sm:block" />
            Online<span className="text-lime_cream">.</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="max-w-md text-lg sm:text-xl text-gray-300 font-medium leading-relaxed mb-8 sm:mb-10 mx-auto lg:mx-0">
            A professional business page that helps local customers discover and trust your business.<br className="hidden sm:block"/>
            All for just <span className="text-lime_cream font-bold">₹899/year.</span>
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-12 sm:mb-16 w-full sm:w-auto">
            <Link href="/register" className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-lime_cream text-evergreen rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(236,243,158,0.2)] hover:shadow-[0_0_40px_rgba(236,243,158,0.6)] flex items-center justify-center gap-2 text-sm sm:text-base">
              <RocketIcon /> Register Your Business
            </Link>
            <Link href="#demo" className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-full font-bold hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
              <PlayCircle size={20} /> View Live Demo
            </Link>
          </motion.div>

          {/* Feature Icons Row */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 lg:gap-12">
            {[
              { icon: Globe, label: "Google\nReady" },
              { icon: Smartphone, label: "Mobile\nFriendly" },
              { icon: MessageCircle, label: "WhatsApp\nIntegration" },
              { icon: ShieldCheck, label: "Secure\nHosting" },
              { icon: Tag, label: "Affordable\nPricing" }
            ].map((feat, i) => (
              <div key={i} className="flex flex-col items-center gap-2 sm:gap-3 group cursor-pointer w-20 sm:w-auto">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-lime_cream group-hover:scale-110 group-hover:bg-white/10 group-hover:border-lime_cream/50 transition-all duration-300 shadow-lg">
                  <feat.icon size={20} strokeWidth={1.5} className="sm:w-[22px] sm:h-[22px]" />
                </div>
                <span className="text-[10px] sm:text-xs text-center text-gray-400 font-medium whitespace-pre-line group-hover:text-white transition-colors">{feat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: The Bakery Mockup */}
        <motion.div 
          className="flex-1 relative z-20 w-full mt-10 lg:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
        >
          {/* Glowing Neon Ring behind the mockup */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[110%] sm:w-[110%] rounded-[3rem] sm:rounded-full border border-lime_cream/30 shadow-[0_0_80px_rgba(236,243,158,0.15)] -z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border border-lime_cream/10 -z-10 hidden sm:block"></div>

          <motion.div variants={float} className="relative z-10 w-full max-w-[600px] mx-auto">
            {/* Browser Frame (Glassmorphism) */}
            <div className="rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              
              {/* Browser Header */}
              <div className="bg-black/40 px-3 sm:px-4 py-2 sm:py-3 border-b border-white/10 flex items-center gap-2 sm:gap-4">
                <div className="flex gap-1.5 shrink-0 hidden sm:flex">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="flex-1 bg-black/40 border border-white/10 rounded-md px-2 sm:px-3 py-1.5 flex items-center gap-2 overflow-hidden">
                  <ShieldCheck size={12} className="text-gray-400 shrink-0" />
                  <span className="text-[10px] sm:text-xs text-gray-300 font-mono truncate">business.qurevo.in/al-faizan-bakery</span>
                </div>
                <div className="shrink-0 text-gray-400 flex gap-2">
                  <Search size={14} />
                </div>
              </div>
              
              {/* Fake Website Content */}
              <div className="bg-[#FAF9F6] w-full text-evergreen overflow-y-auto max-h-[60vh] sm:max-h-none scrollbar-thin">
                {/* Hero Image inside mockup */}
                <div className="h-40 sm:h-48 w-full relative bg-evergreen-900 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop" alt="Bakery Cover" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  
                  {/* Content over image */}
                  <div className="absolute bottom-3 sm:bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-row items-end gap-3 sm:gap-5">
                    {/* Logo inside mockup */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-black border border-white/20 flex flex-col items-center justify-center shrink-0 shadow-xl">
                      <span className="text-lime_cream font-serif text-xl sm:text-2xl mb-0.5 sm:mb-1">AF</span>
                      <span className="text-white text-[6px] sm:text-[8px] tracking-widest uppercase">Bakery</span>
                    </div>
                    
                    <div className="pb-1 text-white flex-1">
                      <h3 className="text-lg sm:text-2xl font-bold mb-1 leading-tight truncate">Al Faizan Bakery</h3>
                      <div className="flex items-center gap-1 text-lime_cream mb-1 sm:mb-2">
                        {[1,2,3,4,5].map(i => <Star key={i} size={10} className="fill-lime_cream sm:w-3 sm:h-3" />)}
                        <span className="text-[9px] sm:text-[10px] text-gray-300 ml-1 font-medium hidden sm:inline">4.8 (128 Reviews)</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] text-gray-300 font-medium">
                        <span className="flex items-center gap-1"><Building2Icon /> Bakery & Sweets</span>
                        <span className="flex items-center gap-1"><MapPin size={10} /> Srinagar, J&K</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons inside mockup */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row gap-2 sm:gap-3 border-b border-gray-200">
                  <div className="flex-1 bg-evergreen text-lime_cream py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer">
                    <Phone size={12} /> Call Now
                  </div>
                  <div className="flex-1 bg-[#25D366] text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer">
                    <MessageCircle size={12} /> WhatsApp
                  </div>
                  <div className="flex-1 bg-white border border-gray-300 text-evergreen py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer">
                    <MapPin size={12} /> Directions
                  </div>
                </div>

                {/* Info Cards inside mockup */}
                <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="text-xs font-bold mb-1.5 sm:mb-2">About Us</h4>
                    <p className="text-[9px] text-gray-500 leading-relaxed">
                      We serve fresh and delicious bakery products made with love and the finest ingredients. Quality is our recipe for happiness.
                    </p>
                  </div>
                  <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="text-xs font-bold mb-1.5 sm:mb-2">Opening Hours</h4>
                    <div className="space-y-1 text-[9px] text-gray-500">
                      <div className="flex justify-between"><span>Mon - Sat</span> <span>8:00 AM - 9:00 PM</span></div>
                      <div className="flex justify-between"><span>Sunday</span> <span>8:00 AM - 4:00 PM</span></div>
                    </div>
                  </div>
                  <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="text-xs font-bold mb-1.5 sm:mb-2">Our Gallery</h4>
                    <div className="grid grid-cols-3 gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="aspect-square bg-gray-200 rounded object-cover overflow-hidden">
                          {/* Added lazy loading for performance */}
                          <img 
                            src={`https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=100&auto=format&fit=crop&${i}`} 
                            className="w-full h-full object-cover" 
                            alt={`Gallery ${i}`} 
                            loading="lazy" 
                            decoding="async" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* The 3D Podium Effect (Hidden on mobile to save space) */}
            <div className="hidden sm:block absolute -bottom-12 left-1/2 -translate-x-1/2 w-[120%] h-24 bg-gradient-to-t from-black/80 to-transparent rounded-[100%] blur-sm -z-10"></div>
            <div className="hidden sm:block absolute -bottom-16 left-1/2 -translate-x-1/2 w-[100%] h-16 border-t-2 border-lime_cream/20 bg-evergreen-200/50 rounded-[100%] -z-20 shadow-[0_0_50px_rgba(236,243,158,0.1)]"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* BOTTOM TRUST BANNER */}
      <section className="relative z-30 px-4 sm:px-6 pb-12 sm:pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[1400px] mx-auto bg-[#FAFAFA] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-6 sm:gap-8 shadow-2xl border border-gray-100"
        >
          {/* Mobile Grid Layout for Trust Badges */}
          <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap lg:flex-nowrap w-full justify-between gap-6 sm:gap-4 lg:gap-8">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 sm:gap-4">
              <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm text-evergreen shrink-0"><UserIcon /></div>
              <div>
                <h4 className="font-bold text-evergreen text-sm sm:text-base">Built for Local</h4>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Businesses</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 sm:gap-4">
              <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm text-evergreen shrink-0"><CheckCircle2 /></div>
              <div>
                <h4 className="font-bold text-evergreen text-sm sm:text-base">Managed by</h4>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Qurevo Experts</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 sm:gap-4">
              <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm text-evergreen shrink-0"><ShieldCheck /></div>
              <div>
                <h4 className="font-bold text-evergreen text-sm sm:text-base">Trusted by</h4>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Growing Businesses</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 sm:gap-4">
              <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm text-evergreen shrink-0"><Headphones /></div>
              <div>
                <h4 className="font-bold text-evergreen text-sm sm:text-base">Support When</h4>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">You Need It</p>
              </div>
            </div>
            {/* The 5th item centered on mobile */}
            <div className="col-span-2 md:col-span-1 flex flex-col sm:flex-row items-center justify-center sm:justify-start text-center sm:text-left gap-3 sm:gap-4 mt-2 md:mt-0">
              <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm text-evergreen shrink-0"><Tag /></div>
              <div>
                <h4 className="font-bold text-evergreen text-sm sm:text-base">Simple Pricing</h4>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">No Hidden Cost</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      
      <ProblemSolution />
      <TheJourney />
      <Footer />
    </main>
  );
}

// Mini SVG Icons to keep imports clean
function RocketIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

function Building2Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
    </svg>
  );
}
"use client";

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { 
  Globe, Smartphone, MessageCircle, ShieldCheck, Tag,
  Star, PlayCircle, Phone, MapPin, Search, ChevronDown, CheckCircle2, Headphones
} from 'lucide-react';

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
    <main className="min-h-screen relative">
      
      {/* NAVBAR */}
      <nav className="absolute top-0 w-full z-50 px-6 py-6">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-lime_cream to-fern rounded-br-xl rounded-tl-xl flex items-center justify-center shadow-[0_0_15px_rgba(236,243,158,0.5)]"></div>
            <span className="text-2xl font-bold tracking-tight">QUREVO <span className="text-lime_cream font-medium">Businesses</span></span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
            <Link href="#" className="hover:text-white transition-colors">Features</Link>
            <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-white transition-colors">Demo</Link>
            <Link href="#" className="hover:text-white transition-colors">How It Works</Link>
            <Link href="#" className="hover:text-white transition-colors">FAQ</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/login" className="px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2">
              <UserIcon /> Login
            </Link>
            <Link href="/register" className="px-5 py-2.5 rounded-full bg-lime_cream text-evergreen text-sm font-bold hover:bg-[#d8e08d] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(236,243,158,0.3)] hover:shadow-[0_0_30px_rgba(236,243,158,0.6)]">
              Register Business <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 z-10 min-h-screen">
        
        {/* Background Glows (Glassmorphism Environment) */}
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-hunter_green-600/30 rounded-full blur-[150px] pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-fern-600/20 rounded-full blur-[150px] pointer-events-none -z-10" />

        {/* LEFT COLUMN: Copy & CTAs */}
        <motion.div 
          className="flex-1 relative z-20 w-full"
          initial="hidden" animate="visible" variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 text-sm font-medium text-gray-300 mb-8 shadow-lg">
            <Star className="w-4 h-4 mr-2 text-lime_cream fill-lime_cream" />
            Professional. Affordable. Trusted by Qurevo.
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-6xl sm:text-7xl lg:text-[85px] font-extrabold tracking-tight text-white leading-[1.05] mb-6">
            Get Your <br />
            Business <br />
            Online<span className="text-lime_cream">.</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="max-w-md text-xl text-gray-300 font-medium leading-relaxed mb-10">
            A professional business page that helps local customers discover and trust your business.<br/>
            All for just <span className="text-lime_cream font-bold">₹1,999/year.</span>
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-5 mb-16">
            <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-lime_cream text-evergreen rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(236,243,158,0.2)] hover:shadow-[0_0_40px_rgba(236,243,158,0.6)] flex items-center justify-center gap-2">
              <RocketIcon /> Register Your Business
            </Link>
            <Link href="#demo" className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-full font-bold hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
              <PlayCircle size={20} /> View Live Demo
            </Link>
          </motion.div>

          {/* Feature Icons Row */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-8 lg:gap-12">
            {[
              { icon: Globe, label: "Google\nReady" },
              { icon: Smartphone, label: "Mobile\nFriendly" },
              { icon: MessageCircle, label: "WhatsApp\nIntegration" },
              { icon: ShieldCheck, label: "Secure\nHosting" },
              { icon: Tag, label: "Affordable\nPricing" }
            ].map((feat, i) => (
              <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-lime_cream group-hover:scale-110 group-hover:bg-white/10 group-hover:border-lime_cream/50 transition-all duration-300 shadow-lg">
                  <feat.icon size={22} strokeWidth={1.5} />
                </div>
                <span className="text-xs text-center text-gray-400 font-medium whitespace-pre-line group-hover:text-white transition-colors">{feat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: The Bakery Mockup */}
        <motion.div 
          className="flex-1 relative z-20 w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
        >
          {/* Glowing Neon Ring behind the mockup */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full border border-lime_cream/30 shadow-[0_0_80px_rgba(236,243,158,0.15)] -z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border border-lime_cream/10 -z-10"></div>

          <motion.div variants={float} className="relative z-10 w-full max-w-[600px] mx-auto">
            {/* Browser Frame (Glassmorphism) */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              
              {/* Browser Header */}
              <div className="bg-black/40 px-4 py-3 border-b border-white/10 flex items-center gap-4">
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="flex-1 bg-black/40 border border-white/10 rounded-md px-3 py-1.5 flex items-center gap-2">
                  <ShieldCheck size={12} className="text-gray-400" />
                  <span className="text-xs text-gray-300 font-mono">business.qurevo.in/al-faizan-bakery</span>
                </div>
                <div className="shrink-0 text-gray-400 flex gap-2">
                  <Search size={14} />
                </div>
              </div>
              
              {/* Fake Website Content */}
              <div className="bg-[#FAF9F6] w-full text-evergreen">
                {/* Hero Image inside mockup */}
                <div className="h-48 w-full relative bg-evergreen-900 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop" alt="Bakery Cover" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  
                  {/* Content over image */}
                  <div className="absolute bottom-4 left-6 right-6 flex items-end gap-5">
                    {/* Logo inside mockup */}
                    <div className="w-20 h-20 rounded-xl bg-black border border-white/20 flex flex-col items-center justify-center shrink-0 shadow-xl">
                      <span className="text-lime_cream font-serif text-2xl mb-1">AF</span>
                      <span className="text-white text-[8px] tracking-widest uppercase">Bakery</span>
                    </div>
                    
                    <div className="pb-1 text-white">
                      <h3 className="text-2xl font-bold mb-1">Al Faizan Bakery</h3>
                      <div className="flex items-center gap-1 text-lime_cream mb-2">
                        {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-lime_cream" />)}
                        <span className="text-[10px] text-gray-300 ml-1 font-medium">4.8 (128 Reviews)</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-gray-300 font-medium">
                        <span className="flex items-center gap-1"><Building2Icon /> Bakery & Sweets</span>
                        <span className="flex items-center gap-1"><MapPin size={10} /> Srinagar, J&K</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons inside mockup */}
                <div className="px-6 py-4 flex gap-3 border-b border-gray-200">
                  <div className="flex-1 bg-evergreen text-lime_cream py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
                    <Phone size={12} /> Call Now
                  </div>
                  <div className="flex-1 bg-[#25D366] text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
                    <MessageCircle size={12} /> WhatsApp
                  </div>
                  <div className="flex-1 bg-white border border-gray-300 text-evergreen py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
                    <MapPin size={12} /> Directions
                  </div>
                </div>

                {/* Info Cards inside mockup */}
                <div className="p-6 grid grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="text-xs font-bold mb-2">About Us</h4>
                    <p className="text-[9px] text-gray-500 leading-relaxed">
                      We serve fresh and delicious bakery products made with love and the finest ingredients. Quality is our recipe for happiness.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="text-xs font-bold mb-2">Opening Hours</h4>
                    <div className="space-y-1 text-[9px] text-gray-500">
                      <div className="flex justify-between"><span>Mon - Sat</span> <span>8:00 AM - 9:00 PM</span></div>
                      <div className="flex justify-between"><span>Sunday</span> <span>8:00 AM - 4:00 PM</span></div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="text-xs font-bold mb-2">Our Gallery</h4>
                    <div className="grid grid-cols-3 gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="aspect-square bg-gray-200 rounded object-cover overflow-hidden">
                          <img src={`https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=100&auto=format&fit=crop&${i}`} className="w-full h-full object-cover" alt="" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* The 3D Podium Effect */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[120%] h-24 bg-gradient-to-t from-black/80 to-transparent rounded-[100%] blur-sm -z-10"></div>
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[100%] h-16 border-t-2 border-lime_cream/20 bg-evergreen-200/50 rounded-[100%] -z-20 shadow-[0_0_50px_rgba(236,243,158,0.1)]"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 w-full flex flex-col items-center justify-center text-gray-400 text-sm z-20">
        <span className="mb-2 font-medium">Scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={20} />
        </motion.div>
      </div>

      {/* BOTTOM TRUST BANNER (The white card at bottom of image) */}
      <section className="relative z-30 px-6 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[1400px] mx-auto bg-[#FAFAFA] rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm text-evergreen"><UserIcon /></div>
            <div>
              <h4 className="font-bold text-evergreen">Built for Local</h4>
              <p className="text-sm text-gray-500 font-medium">Businesses</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm text-evergreen"><CheckCircle2 /></div>
            <div>
              <h4 className="font-bold text-evergreen">Managed by</h4>
              <p className="text-sm text-gray-500 font-medium">Qurevo Experts</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm text-evergreen"><ShieldCheck /></div>
            <div>
              <h4 className="font-bold text-evergreen">Trusted by</h4>
              <p className="text-sm text-gray-500 font-medium">Growing Businesses</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm text-evergreen"><Headphones /></div>
            <div>
              <h4 className="font-bold text-evergreen">Support When You</h4>
              <p className="text-sm text-gray-500 font-medium">Need It</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm text-evergreen"><Tag /></div>
            <div>
              <h4 className="font-bold text-evergreen">Simple Pricing</h4>
              <p className="text-sm text-gray-500 font-medium">No Hidden Cost</p>
            </div>
          </div>
        </motion.div>
      </section>
      
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

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
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
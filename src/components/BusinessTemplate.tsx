"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { 
  Share2, Heart, ShieldCheck, MapPin, Phone, 
  Mail, Globe, MessageCircle, Clock, Users
} from 'lucide-react';
import Footer from './Footer';

// Use the dynamic ReviewSection we built earlier
import ReviewSection from './ReviewSection';

const Instagram = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Facebook = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export interface BusinessProps {
  id: string; 
  hero: {
    bgImage: string;
    logo: string;
    category: string;
    name: string;
    rating: string;
    reviewCount: number;
    location: string;
    isOpen: boolean;
  };
  features: Array<{ icon: React.ReactNode; title: string }>;
  about: { text: string; stats: Array<{ value: string; label: string }> };
  team?: Array<{ name: string; role: string; image: string; bio: string }>;
  hours: Array<{ day: string; time: string }>;
  gallery: string[];
  specialties: Array<{ image: string; title: string; subtitle: string }>;
  contact: { 
    phone1: string; 
    phone2?: string; 
    email: string; 
    website?: string; 
    address: string;
    instagram?: string;
    facebook?: string;
  };
  instagramReels?: string[]; 
  whyChooseUs: Array<{ icon: React.ReactNode; title: string; subtitle: string }>;
}

export default function BusinessTemplate({ 
  data, 
  isLoading = false 
}: { 
  data?: BusinessProps; 
  isLoading?: boolean; 
}) {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-[#F4F8F5] font-sans pb-20 animate-pulse">
        <div className="w-full h-[45vh] md:h-[55vh] min-h-[350px] md:min-h-[450px] bg-slate-300"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 h-14 md:h-16 bg-slate-200 rounded-xl"></div>
          <div className="flex-1 h-14 md:h-16 bg-slate-200 rounded-xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="h-64 bg-slate-200 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-[#F4F8F5] text-slate-800 font-sans selection:bg-[#D4F97C] selection:text-[#0A1A12] flex flex-col relative overflow-hidden">
      
      {/* 1. HERO */}
      <div 
        className="relative w-full h-[45vh] md:h-[55vh] min-h-[400px] md:min-h-[500px] bg-cover bg-center flex flex-col justify-end pb-8 md:pb-12 shadow-sm"
        style={{ backgroundImage: `url(${data.hero.bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A12] via-[#0A1A12]/60 to-transparent"></div> 
        
        {/* TOP NAVBAR LAYER */}
        <div className="absolute top-0 left-0 w-full p-3 sm:p-6 flex justify-between items-start z-50">
          <Link href="/" className="bg-[#0A1A12]/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2 shadow-lg hover:bg-[#0A1A12]/80 transition-all cursor-pointer">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-tr from-[#D4F97C] to-emerald-500 rounded-br-lg rounded-tl-lg shadow-[0_0_10px_rgba(212,249,124,0.3)]"></div>
            <span className="text-white font-bold text-xs sm:text-sm tracking-tight hidden sm:inline-block">
              QUREVO <span className="text-[#D4F97C] font-medium">Businesses</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
          </div>
        </div>

        {/* HERO CONTENT (Mobile Centered, Desktop Left) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 items-center sm:items-end text-center sm:text-left">
          
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 bg-white rounded-2xl flex-shrink-0 overflow-hidden relative shadow-2xl p-1 mx-auto sm:mx-0">
            <Image src={data.hero.logo} alt={`${data.hero.name} Logo`} fill className="object-contain p-2" sizes="(max-width: 768px) 96px, 176px"/>
          </div>
          
          <div className="text-white flex-grow mb-1 sm:mb-2 w-full">
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-1 text-[9px] sm:text-[10px] md:text-xs font-bold rounded-full mb-2 sm:mb-3 inline-block tracking-wider uppercase">
              {data.hero.category}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3 flex flex-col sm:flex-row items-center sm:justify-start justify-center gap-2 sm:gap-3">
              {data.hero.name} 
              <img 
                src="https://res.cloudinary.com/dpqsadqxj/image/upload/v1784119609/image_wcldre.svg" 
                alt="Verified" 
                className="w-15 h-15 sm:w-15 sm:h-15 md:w-15 md:h-15" 
              />
            </h1>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-xs sm:text-sm font-medium text-slate-300">
              <span className="flex items-center gap-1 text-amber-400 tracking-widest text-sm sm:text-lg">★★★★★</span> 
              <span className="font-bold text-white">{data.hero.rating} <span className="font-normal text-slate-300">({data.hero.reviewCount} Reviews)</span></span>
              <span className="hidden sm:inline text-slate-500">|</span>
              <span className="flex items-center gap-1 w-full sm:w-auto justify-center"><MapPin size={14} className="sm:w-4 sm:h-4"/> {data.hero.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ACTION BUTTONS (Mobile Grid Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8 relative z-20 w-full mb-8 sm:mb-10">
        <div className="grid grid-cols-2 md:flex md:flex-row gap-3 sm:gap-4 w-full">
          {/* Call button takes full width on mobile */}
          <a href={`tel:${data.contact.phone1.replace(/\s+/g, '')}`} className="col-span-2 md:flex-1 bg-[#183121] text-white py-3.5 sm:py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-[#0A1A12] transition-colors shadow-sm text-sm sm:text-base">
            <Phone size={18} className="sm:w-5 sm:h-5" /> Call Now
          </a>
          <a href={`https://wa.me/${data.contact.phone2?.replace(/\D/g, '') || data.contact.phone1.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="col-span-1 md:flex-1 bg-[#25D366] text-white py-3.5 sm:py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-[#1EBE59] transition-colors shadow-sm text-sm sm:text-base">
            <MessageCircle size={18} className="sm:w-5 sm:h-5" /> WhatsApp
          </a>
          <a href={`https://maps.google.com/?q=${encodeURIComponent(data.contact.address)}`} target="_blank" rel="noopener noreferrer" className="col-span-1 md:flex-1 bg-white text-slate-800 py-3.5 sm:py-4 rounded-xl font-bold flex justify-center items-center gap-1 sm:gap-2 hover:bg-slate-50 border border-slate-200 transition-colors shadow-sm text-sm sm:text-base">
            <MapPin size={18} className="text-slate-500 sm:w-5 sm:h-5" /> Directions
          </a>
          
          {/* Social Buttons Container */}
          <div className="col-span-2 md:col-span-1 flex justify-center md:justify-end gap-3 sm:gap-4 mt-2 md:mt-0">
            {data.contact.instagram && (
              <a href={data.contact.instagram} target="_blank" rel="noopener noreferrer" className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] shrink-0 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm">
                <Instagram size={20} className="sm:w-6 sm:h-6" />
              </a>
            )}
            {data.contact.facebook && (
              <a href={data.contact.facebook} target="_blank" rel="noopener noreferrer" className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] shrink-0 bg-[#1877F2] text-white rounded-xl flex items-center justify-center hover:bg-[#166fe5] transition-colors shadow-sm">
                <Facebook size={20} className="sm:w-6 sm:h-6" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8 pb-16 sm:pb-20 w-full flex-grow">
        
        {/* ROW 1: ABOUT & PREMIUM STATS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-7 bg-white rounded-[1.5rem] sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A1A12] mb-3 sm:mb-4">About Us</h2>
              
              <div className="relative">
                <p className={`text-sm sm:text-base text-slate-600 leading-relaxed font-medium whitespace-pre-wrap transition-all duration-300 ${!isAboutExpanded ? 'line-clamp-4' : ''}`}>
                  {data.about.text}
                </p>
                {!isAboutExpanded && (
                  <div className="absolute bottom-0 left-0 w-full h-10 sm:h-12 bg-gradient-to-t from-white to-transparent"></div>
                )}
              </div>
              <button 
                onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                className="text-emerald-600 text-sm sm:text-base font-bold mt-2 hover:underline focus:outline-none"
              >
                {isAboutExpanded ? 'Read Less' : 'Read More'}
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-slate-100 pt-5 sm:pt-6 mt-6 sm:mt-8">
              {data.features.map((feat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="text-slate-400 mb-1.5 sm:mb-2">{feat.icon}</div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-700">{feat.title}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-5 bg-gradient-to-br from-[#F4F9F6] to-[#E9F3ED] rounded-[1.5rem] sm:rounded-3xl shadow-sm border border-emerald-100/50 overflow-hidden">
            <div className="grid grid-cols-2 grid-rows-2 h-full min-h-[200px] sm:min-h-[250px]">
              {data.about.stats.map((stat, idx) => (
                <div key={idx} className={`flex flex-col items-center justify-center p-4 sm:p-6 text-center ${idx % 2 !== 0 ? 'border-l border-emerald-900/10' : ''} ${idx > 1 ? 'border-t border-emerald-900/10' : ''}`}>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A1A12] mb-1">{stat.value}</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-emerald-800 uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* TEAM / COUNSELLORS SECTION */}
        {data.team && data.team.length > 0 && (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="bg-white rounded-[1.5rem] sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A1A12] mb-5 sm:mb-6 flex items-center gap-2">
              <Users className="text-slate-400 w-5 h-5 sm:w-6 sm:h-6"/> Meet Our Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {data.team.map((member, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-slate-200 mb-3 sm:mb-4 relative shadow-inner">
                    <Image src={member.image} alt={member.name} fill className="object-cover" sizes="96px" />
                  </div>
                  <h4 className="font-bold text-base sm:text-lg text-[#0A1A12]">{member.name}</h4>
                  <p className="text-emerald-600 font-bold text-[10px] sm:text-xs uppercase tracking-wider mb-2 sm:mb-3">{member.role}</p>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">{member.bio}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ROW 2: SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="bg-white rounded-[1.5rem] sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A1A12] mb-5 sm:mb-6">Our Specialties</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {data.specialties.map((spec, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="aspect-square rounded-xl overflow-hidden mb-2 sm:mb-3 relative bg-slate-100 shadow-sm">
                      <Image src={spec.image} alt={spec.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, 200px" />
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#0A1A12] text-center">{spec.title}</h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 text-center mt-0.5 line-clamp-1">{spec.subtitle}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="bg-white rounded-[1.5rem] sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A1A12] mb-5 sm:mb-6">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                {data.gallery.slice(0, 8).map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden relative">
                    <Image src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="bg-white rounded-[1.5rem] sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0A1A12] mb-4 sm:mb-6 flex items-center gap-2">
                <Clock className="text-slate-400 w-5 h-5"/> Opening Hours
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {data.hours.map((hour, idx) => (
                  <li key={idx} className="flex justify-between items-center text-xs sm:text-sm border-b border-slate-100 pb-2.5 sm:pb-3 last:border-0 last:pb-0">
                    <span className="text-slate-600 font-medium">{hour.day}</span>
                    <span className={`font-bold ${hour.time.toLowerCase() === 'closed' ? 'text-red-500' : 'text-[#183121]'}`}>
                      {hour.time}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="bg-white rounded-[1.5rem] sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0A1A12] mb-4 sm:mb-6 flex items-center gap-2">
                <Phone className="text-slate-400 w-5 h-5"/> Contact Info
              </h3>
              <ul className="space-y-4 sm:space-y-5 text-xs sm:text-sm text-slate-600 font-medium">
                <li className="flex items-start gap-3 sm:gap-4">
                  <Phone size={16} className="text-slate-400 mt-0.5 shrink-0 sm:w-4 sm:h-4 w-3.5 h-3.5"/> 
                  <div className="flex flex-col gap-1">
                    <a href={`tel:${data.contact.phone1}`} className="hover:text-emerald-600 transition-colors">{data.contact.phone1}</a>
                    {data.contact.phone2 && <a href={`tel:${data.contact.phone2}`} className="hover:text-emerald-600 transition-colors">{data.contact.phone2}</a>}
                  </div>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <Mail size={16} className="text-slate-400 mt-0.5 shrink-0 sm:w-4 sm:h-4 w-3.5 h-3.5"/> 
                  <a href={`mailto:${data.contact.email}`} className="hover:text-emerald-600 transition-colors break-all">{data.contact.email}</a>
                </li>
                {data.contact.website && (
                  <li className="flex items-start gap-3 sm:gap-4">
                    <Globe size={16} className="text-slate-400 mt-0.5 shrink-0 sm:w-4 sm:h-4 w-3.5 h-3.5"/> 
                    <a href={`https://${data.contact.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors break-all">{data.contact.website}</a>
                  </li>
                )}
                <li className="flex items-start gap-3 sm:gap-4 pt-2">
                  <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0 sm:w-4 sm:h-4 w-3.5 h-3.5"/> 
                  <span className="leading-relaxed">{data.contact.address}</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* INSTAGRAM REELS SECTION */}
        {data.instagramReels && data.instagramReels.length > 0 && (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="bg-white rounded-[1.5rem] sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A1A12] mb-5 sm:mb-6">Latest Updates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {data.instagramReels.map((reelUrl, idx) => (
                <div key={idx} className="w-full aspect-[9/16] rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm relative">
                  <iframe 
                    src={reelUrl} 
                    className="w-full h-full absolute top-0 left-0 border-0" 
                    frameBorder="0" 
                    scrolling="no" 
                    allow="encrypted-media"
                  ></iframe>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* REVIEW SECTION */}
        <ReviewSection businessId={data.id} />
      </div>

      {/* BOTTOM BANNER: WHY CHOOSE US */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="bg-[#E9F3ED] py-10 sm:py-12 mt-auto border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h3 className="text-lg sm:text-xl font-extrabold text-[#0A1A12] text-center mb-6 sm:mb-8">Why Choose Us</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {data.whyChooseUs.map((reason, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="text-emerald-800 mb-2 sm:mb-3 scale-75 sm:scale-100">{reason.icon}</div>
                <h4 className="font-bold text-xs sm:text-sm text-[#0A1A12] mb-1">{reason.title}</h4>
                <p className="text-[10px] sm:text-xs text-slate-600 font-medium">{reason.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
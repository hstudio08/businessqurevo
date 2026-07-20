"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Users, BookOpen, 
  GraduationCap, Award, CheckCircle2, Globe, 
  ChevronRight, Quote, Briefcase, ChevronDown, UserCircle 
} from 'lucide-react';

// --- Constants & Data ---
const LOGO_URL = "https://res.cloudinary.com/mtferpxm/image/upload/v1784555647/Labaika_Logo_Optimised_uammpc.jpg";
const GALLERY_IMAGES = [
  "https://scontent.fsxr1-2.fna.fbcdn.net/v/t39.30808-6/680236022_1510761757419659_3019485694088677289_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1600&ctp=s1200x1600&_nc_cat=110&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=GkPyHvuaDxgQ7kNvwEJI4Rx&_nc_oc=AdoqurRsIHEjtxRRYtKOvrLFcGpKw2Xdgop-dZ_s2YrCRgYRkAMEafZNTpU-__3qOXA&_nc_zt=23&_nc_ht=scontent.fsxr1-2.fna&_nc_gid=lACuecm4Gk7sbwterBNZHA&_nc_ss=7b2a8&oh=00_AQDnuvf6JMgNmfG7asjUFH6vxFXFy8JcoUEKjZl3sci6Fg&oe=6A63F9EA",
  "https://scontent.fsxr1-1.fna.fbcdn.net/v/t39.30808-6/680283984_1510761720752996_3051313326731859576_n.jpg?stp=dst-jpg_tt6&cstp=mx1600x1200&ctp=s1600x1200&_nc_cat=111&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xr77N5f6t6YQ7kNvwGzw2bS&_nc_oc=Adpe2wv7On8UViOxSj6g8SbaRoMwjxG7-5hCNk2kh0S-TYRmDQHTYYrKbfteniNyGn4&_nc_zt=23&_nc_ht=scontent.fsxr1-1.fna&_nc_gid=Z4Y0kTanfhJ6dSQ5Hvf7AA&_nc_ss=7b2a8&oh=00_AQDtu04RQwWD3rmSHz1vkqA-0EDUEhSUpe2lf4yeDd7L2g&oe=6A63EEDD",
  "https://scontent.fsxr1-2.fna.fbcdn.net/v/t39.30808-6/668580382_1496618652167303_2988064368728397408_n.jpg?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=108&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=2jiIPEk_A3wQ7kNvwGlOFvd&_nc_oc=Adp9eiZCIvun9DJ6BYof0jkQSzbtADkhj00we5YTPBTEP1-LLHPEeMNauFxPs0mNOdk&_nc_zt=23&_nc_ht=scontent.fsxr1-2.fna&_nc_gid=OW6o3OZWWAXvqpxK5Yt4Sg&_nc_ss=7b2a8&oh=00_AQBwTkd4pjyIAfsDiEBOQsi-FhDL-8hZxqA8bTHqyAIB4w&oe=6A63ECF5",
  "https://scontent.fsxr1-2.fna.fbcdn.net/v/t39.30808-6/718390526_1548351730327328_2306703035665862504_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x924&ctp=s2048x924&_nc_cat=109&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=nnPl35fXr8YQ7kNvwEHu3H1&_nc_oc=AdogXarSzDo6z8QsXlVKgbZ34eKmRTmVMT9P15g75Otwc90-vwoO_WZIGXm_KBbsc4A&_nc_zt=23&_nc_ht=scontent.fsxr1-2.fna&_nc_gid=z1eaw15gltwPxLhcMWBGQw&_nc_ss=7b2a8&oh=00_AQAQiXzRQ-2AvjBrpi2ZWKvx4Na9FeVlS5JL6BMMps6plg&oe=6A63F5D6",
  "https://scontent.fsxr1-2.fna.fbcdn.net/v/t39.30808-6/547279770_1329080772254426_2374714801196685821_n.jpg?stp=dst-jpg_tt6&cstp=mx1599x899&ctp=s1599x899&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=HFqqVsCVZyMQ7kNvwFRdd96&_nc_oc=AdrY7UQp8b7pcrPr3RKjh00xISh1XoRbNIfuOQw43pDT4JCDXYuHV0gvuN0F0jtSk0M&_nc_zt=23&_nc_ht=scontent.fsxr1-2.fna&_nc_gid=9dk3d2gKu8i7Y1qgfKgvow&_nc_ss=7b2a8&oh=00_AQDeJHY9SM78SzBySphqGKNh3JFr8zRN83joPyFrWVjEPQ&oe=6A63E411",
  "https://scontent.fsxr1-2.fna.fbcdn.net/v/t39.30808-6/546212089_1329080762254427_4639061122144062009_n.jpg?stp=dst-jpg_tt6&cstp=mx1599x899&ctp=s1599x899&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=LcDCqeRtQL8Q7kNvwFVNw9P&_nc_oc=AdrcZlGBLtJaNPxcMdB0fzangtmNVE-yoRTMttdXw0gn-VnaO-RErgAJKyxhDHKTWY0&_nc_zt=23&_nc_ht=scontent.fsxr1-2.fna&_nc_gid=HnI-fF40owgeo05zfJ85lg&_nc_ss=7b2a8&oh=00_AQCvKdC2AIMj0wbZ1eo2DUpIIZFat0mZfFkR6uwRcs7cbA&oe=6A63DE39"
];

const FACULTY_MEMBERS = [
  { id: 1, name: "Dr. Tariq Ahmad", role: "Head of Science Department", education: "Ph.D. in Physics, Kashmir University", experience: "15+ Years" },
  { id: 2, name: "Ms. Shabina Kousar", role: "Senior Mathematics Educator", education: "M.Sc. Mathematics, B.Ed.", experience: "12 Years" },
  { id: 3, name: "Mr. Fayaz Lone", role: "Language Arts Coordinator", education: "M.A. English Literature", experience: "8 Years" },
  { id: 4, name: "Mrs. Rukhsana Begum", role: "Primary Education Specialist", education: "B.A., D.El.Ed.", experience: "10 Years" },
  { id: 5, name: "Mr. Adil Hussain", role: "Physical Education Director", education: "B.P.Ed, National Level Coach", experience: "7 Years" }
];

// --- Animation Variants ---
const slideRight: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 70, damping: 15 } }
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80, damping: 15 } }
};

export default function LabaikaInstitutePage() {
  const [isLoading, setIsLoading] = useState(true);

  // --- Strict Image Preloading Logic ---
  useEffect(() => {
    let isMounted = true;

    // We mandate the logo loads before the site renders.
    const logoImg = new window.Image();
    logoImg.src = LOGO_URL;
    
    logoImg.onload = () => {
      if (isMounted) setIsLoading(false);
    };
    
    // Fallback: If image gets blocked or fails, remove skeleton after 3 seconds anyway.
    logoImg.onerror = () => {
      if (isMounted) setIsLoading(false);
    };
    
    const timeout = setTimeout(() => {
      if (isMounted) setIsLoading(false);
    }, 3000);

    // Preload gallery in the background (does not block main render)
    GALLERY_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
        <div className="w-24 h-24 border-4 border-slate-200 border-t-[#0f172a] rounded-full animate-spin mb-8"></div>
        <div className="w-64 h-6 bg-slate-200 animate-pulse rounded-full mb-4"></div>
        <div className="w-48 h-4 bg-slate-200 animate-pulse rounded-full"></div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {/* Semantic main tag for SEO */}
      <main className="min-h-screen bg-[#f8fafc] font-sans text-[#1e293b] selection:bg-[#0f172a] selection:text-white overflow-x-hidden">
        
        {/* HERO SECTION */}
        <header className="relative w-full pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#0f172a] border-b-8 border-[#f59e0b]">
          <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-12">
            
            <motion.div 
              initial="hidden" animate="visible" variants={slideRight}
              className="w-36 h-36 sm:w-48 sm:h-48 rounded-2xl bg-white p-2 shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700 z-20"
            >
              <img src={LOGO_URL} alt="Labaika Institute of Modern Education Logo" className="w-full h-full object-contain rounded-xl" />
            </motion.div>
            
            <div className="pb-2 text-center md:text-left flex-1">
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e293b] border border-slate-700 text-slate-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-5 shadow-sm"
              >
                <CheckCircle2 size={16} className="text-[#f59e0b]" /> 
                Recognized State Board Institution
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-4 tracking-tight"
              >
                Labaika Institute of <br className="hidden md:block" />Modern Education
              </motion.h1>
              
              {/* Bold descriptive line for SEO & Clarity */}
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="text-[#f59e0b] font-bold text-lg sm:text-xl mb-4"
              >
                A Premier Co-Educational School in Srigufwara, Anantnag.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-slate-300 text-sm sm:text-base font-medium"
              >
                <span className="flex items-center gap-1.5"><MapPin size={18} className="text-[#f59e0b]" /> Mahind, Srigufwara</span>
                <span className="flex items-center gap-1.5"><Users size={18} className="text-[#f59e0b]" /> 218 Students Enrolled</span>
              </motion.div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT GRID */}
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10 -mt-10">
          
          {/* LEFT COLUMN: Deep Content */}
          <article className="lg:col-span-2 space-y-12">
            
            {/* The Highlight: Soleh ibn Rafi */}
            <motion.section 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideUp}
              className="bg-[#1e293b] rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-white relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#f59e0b] rounded-bl-full opacity-10 group-hover:scale-110 transition-transform duration-700"></div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
                <div className="p-5 bg-[#f59e0b] text-[#0f172a] rounded-2xl shrink-0 shadow-lg">
                  <Award size={48} strokeWidth={2} />
                </div>
                <div>
                  <div className="inline-block px-3 py-1 bg-slate-800 text-[#f59e0b] text-[10px] font-bold uppercase tracking-widest rounded mb-3">
                    Historic Academic Achievement
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Topper: Jamia Millia Islamia</h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                    Our institutional focus yields undeniable results. We proudly celebrate our student, <strong className="text-white bg-[#0f172a] px-2 py-0.5 rounded shadow-sm">Soleh ibn Rafi</strong>, who achieved the extraordinary distinction of topping the highly competitive external entrance examination for the prestigious Jamia Millia Islamia in New Delhi.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Detailed About Paragraph */}
            <motion.section 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp}
              className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                <BookOpen size={28} className="text-[#f59e0b]" /> Campus Culture & History
              </h2>
              <div className="space-y-4 text-slate-600 leading-loose text-sm sm:text-base">
                <p>
                  Labaika Institute of Modern Education stands as a beacon of knowledge and character-building in the heart of Anantnag. Founded with a vision to revolutionize primary and secondary education in Mahind, Srigufwara, we seamlessly blend rigorous State Board academics with a holistic approach to student development. Spanning from Pre-Nursery to the 10th Grade, our institution takes pride in knowing every single one of our 218 students by name and potential. 
                </p>
                <p>
                  Our teaching philosophy is built upon the foundational belief that no child should ever be left unnoticed in a crowded room. To uphold this, we strictly maintain class section sizes of 25 to 40 students. We don't just teach the syllabus; we build leaders. Interactive presentations, debates, and public speaking exercises are integrated directly into our weekly timetable, ensuring our students step out into the world with unshakable confidence.
                </p>
                <p>
                  Beyond academics, our campus thrives on culture and community. We regularly host monumental student-led functions, including grand Teachers' Day celebrations, environmental awareness rallies to instill ecological responsibility, and deeply spiritual Tilawat-ul-Qur'an events that keep our students connected to their roots.
                </p>
              </div>
              <a href="#admissions" className="inline-flex items-center gap-2 mt-6 text-[#0f172a] font-bold hover:text-[#f59e0b] transition-colors group">
                Read More About Admissions <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
              </a>
            </motion.section>

            {/* FULL WIDTH LEADERSHIP SECTIONS */}
            <div className="space-y-8">
              {/* Founder */}
              <motion.section 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={slideRight}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row gap-8 items-center sm:items-start group hover:shadow-lg transition-shadow"
              >
                <div className="w-40 h-40 sm:w-48 sm:h-48 bg-slate-100 rounded-2xl shrink-0 overflow-hidden relative border border-slate-200">
                  {/* DUMMY IMAGE SPACE FOR FOUNDER */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                    <UserCircle size={64} strokeWidth={1} />
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <Quote size={32} className="text-[#f59e0b] mb-4 mx-auto sm:mx-0 opacity-50" />
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4">Founder's Message</h3>
                  <p className="text-slate-600 leading-relaxed italic mb-6">
                    "Our vision was to create a beacon of learning in Srigufwara where traditional values meet modern educational paradigms. We strive every day to build an environment that nurtures curiosity, discipline, and outstanding academic success for the youth of our valley."
                  </p>
                  <div>
                    <p className="font-extrabold text-[#0f172a] text-lg">[Founder's Name]</p>
                    <p className="text-sm font-medium text-[#f59e0b] uppercase tracking-wider">Founder, Labaika Institute</p>
                  </div>
                </div>
              </motion.section>

              {/* Principal */}
              <motion.section 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={slideRight}
                className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row-reverse gap-8 items-center sm:items-start group hover:shadow-2xl transition-shadow text-white"
              >
                <div className="w-40 h-40 sm:w-48 sm:h-48 bg-slate-800 rounded-2xl shrink-0 overflow-hidden relative border border-slate-700">
                  {/* DUMMY IMAGE SPACE FOR PRINCIPAL */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                    <UserCircle size={64} strokeWidth={1} />
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-right">
                  <Quote size={32} className="text-[#f59e0b] mb-4 mx-auto sm:ml-auto sm:mr-0 opacity-50 rotate-180" />
                  <h3 className="text-2xl font-bold mb-4">Principal's Desk</h3>
                  <p className="text-slate-300 leading-relaxed italic mb-6">
                    "Education is not merely about textbooks; it is about shaping character. At Labaika, we ensure no student is left unnoticed. Our dedicated faculty works tirelessly to track individual progress and foster public speaking, confidence, and leadership in every child."
                  </p>
                  <div>
                    <p className="font-extrabold text-white text-lg">[Principal's Name]</p>
                    <p className="text-sm font-medium text-[#f59e0b] uppercase tracking-wider">Principal, Labaika Institute</p>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* FACULTY DIRECTORY (New Long Section) */}
            <motion.section 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp}
              className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-2">Faculty Directory</h2>
              <p className="text-slate-500 mb-8 border-b border-slate-100 pb-6">
                We employ dedicated, local professional educators with standard annual compensation packages reflecting their expertise and commitment to our students' futures.
              </p>
              
              <div className="space-y-6">
                {FACULTY_MEMBERS.map((faculty, idx) => (
                  <motion.div 
                    key={faculty.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0f172a] text-lg">{faculty.name}</h4>
                        <p className="text-sm font-medium text-[#f59e0b]">{faculty.role}</p>
                      </div>
                    </div>
                    <div className="sm:text-right w-full sm:w-auto bg-white sm:bg-transparent p-3 sm:p-0 rounded-xl border border-slate-100 sm:border-none">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Background</p>
                      <p className="text-sm text-slate-700">{faculty.education}</p>
                      <p className="text-xs text-slate-500 mt-1">{faculty.experience} Experience</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Interactive Photo Gallery (Left to Right Animation) */}
            <section className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm overflow-hidden">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-8 border-b border-slate-100 pb-4">Campus Life</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {GALLERY_IMAGES.map((src, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: (idx % 3) * 0.15, duration: 0.6, type: "spring" }}
                    className="aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden group cursor-pointer border border-slate-200 shadow-sm"
                  >
                    <img 
                      src={src} 
                      alt={`Labaika Institute Campus Activity ${idx + 1}`} 
                      loading="lazy" 
                      className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out"
                    />
                  </motion.div>
                ))}
              </div>
            </section>

          </article>

          {/* RIGHT COLUMN: Sidebar (Sticky Elements) */}
          <aside className="space-y-8">
            
            {/* Fee Structure */}
            <motion.section 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm"
            >
              <h2 className="text-xl font-bold text-[#0f172a] mb-1">Official Fee Structure</h2>
              <p className="text-xs font-medium text-slate-500 mb-6 border-b border-slate-100 pb-4">Regulated by the J&K FFRC.</p>
              
              <div className="space-y-3">
                {[
                  { grade: "Nursery / LKG / UKG", m25: "₹585", a25: "₹590" },
                  { grade: "1st to 5th Grade", m25: "₹585", a25: "₹590" },
                  { grade: "6th Grade", m25: "₹700", a25: "₹920" },
                  { grade: "7th Grade", m25: "₹820", a25: "₹920" },
                  { grade: "8th Grade", m25: "₹935", a25: "₹920" },
                  { grade: "9th & 10th Grade", m25: "₹1165", a25: "₹920" }
                ].map((row, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-[#0f172a] text-sm">{row.grade}</span>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Monthly</p>
                      <p className="text-[#f59e0b] font-extrabold">{row.m25}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-4 text-center">*(Displaying 2025-26 Base Tariffs)</p>
            </motion.section>

            {/* Contact & Map (Sticky) */}
            <motion.section 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp}
              id="admissions"
              className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl sticky top-6 text-white"
            >
              <h3 className="font-bold text-white mb-6 text-xl border-b border-slate-800 pb-4">Admissions & Contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-800 text-[#f59e0b] rounded-xl shrink-0"><MapPin size={20} /></div>
                  <div>
                    <p className="text-sm font-bold text-white mb-1">Campus Location</p>
                    <p className="text-sm font-medium text-slate-400 leading-relaxed">
                      Mahind, Srigufwara,<br />
                      District Anantnag, J&K<br />
                      Pin Code: 192401
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-800 text-[#f59e0b] rounded-xl shrink-0"><Phone size={20} /></div>
                  <div>
                    <p className="text-sm font-bold text-white mb-0.5">Helpline</p>
                    <a href="tel:+918491900937" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">+91 84919 00937</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-800 text-[#f59e0b] rounded-xl shrink-0"><Mail size={20} /></div>
                  <div>
                    <p className="text-sm font-bold text-white mb-0.5">Email Address</p>
                    <a href="mailto:lime5204@gmail.com" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">lime5204@gmail.com</a>
                  </div>
                </div>
              </div>
              
              <a href="tel:+918491900937" className="mt-8 bg-[#f59e0b] text-[#0f172a] flex items-center justify-center gap-2 font-extrabold py-4 rounded-xl shadow-lg hover:bg-amber-400 transition-all active:scale-[0.98]">
                Contact Administration <ChevronRight size={18} strokeWidth={3} />
              </a>

              {/* Map Integration */}
              <div className="mt-8 rounded-2xl overflow-hidden border border-slate-700 h-56 bg-slate-900">
                <iframe 
                  src="https://maps.google.com/maps?q=Mahind,%20Srigufwara,%20Anantnag,%20Jammu%20and%20Kashmir&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Labaika Institute Location Map"
                ></iframe>
              </div>
            </motion.section>

          </aside>
        </div>

        {/* CUSTOM LABAIKA FOOTER */}
        <footer className="w-full bg-[#0f172a] pt-16 pb-8 border-t-4 border-[#f59e0b] text-slate-400 mt-12">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-slate-800 pb-10">
            <div>
              <h4 className="text-white font-extrabold text-2xl mb-4 tracking-tight">Labaika Institute</h4>
              <p className="text-sm leading-relaxed max-w-sm">
                Providing continuous, standard-driven education from Pre-Nursery to Secondary level in the heart of Srigufwara. Shaping the future, one student at a time.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#admissions" className="hover:text-[#f59e0b] transition-colors flex items-center gap-2"><ChevronRight size={14} /> Admissions</a></li>
                <li><a href="#" className="hover:text-[#f59e0b] transition-colors flex items-center gap-2"><ChevronRight size={14} /> Fee Structure</a></li>
                <li><a href="#" className="hover:text-[#f59e0b] transition-colors flex items-center gap-2"><ChevronRight size={14} /> Academic Achievements</a></li>
                <li><a href="#" className="hover:text-[#f59e0b] transition-colors flex items-center gap-2"><ChevronRight size={14} /> Faculty Directory</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li className="flex items-start gap-2"><MapPin size={16} className="shrink-0 mt-0.5 text-[#f59e0b]" /> Mahind, Srigufwara, Anantnag, J&K</li>
                <li className="flex items-center gap-2"><Phone size={16} className="shrink-0 text-[#f59e0b]" /> +91 84919 00937</li>
                <li className="flex items-center gap-2"><Mail size={16} className="shrink-0 text-[#f59e0b]" /> lime5204@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-6 pt-6 flex flex-col md:flex-row items-center justify-between text-xs">
            <p>© {new Date().getFullYear()} Labaika Institute of Modern Education. All rights reserved.</p>
            <p className="mt-3 md:mt-0 font-medium text-slate-500">Recognized by J&K State Board of School Education</p>
          </div>
        </footer>
      </main>
    </AnimatePresence>
  );
}
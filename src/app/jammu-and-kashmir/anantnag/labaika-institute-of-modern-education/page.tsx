"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Users, BookOpen, 
  GraduationCap, Award, CheckCircle2, Globe, 
  ChevronRight, Quote, Briefcase, HeartHandshake, 
  Lightbulb, Compass, UserCircle
} from 'lucide-react';

// --- Configuration ---
const LOGO_RADIUS = "rounded-full"; 

// --- Data Preservation ---
const LOGO_URL = "https://res.cloudinary.com/mtferpxm/image/upload/v1784555647/Labaika_Logo_Optimised_uammpc.jpg";
const GALLERY_IMAGES = [
  "https://scontent.fsxr1-2.fna.fbcdn.net/v/t39.30808-6/680236022_1510761757419659_3019485694088677289_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1600&ctp=s1200x1600&_nc_cat=110&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=GkPyHvuaDxgQ7kNvwEJI4Rx&_nc_oc=AdoqurRsIHEjtxRRYtKOvrLFcGpKw2Xdgop-dZ_s2YrCRgYRkAMEafZNTpU-__3qOXA&_nc_zt=23&_nc_ht=scontent.fsxr1-2.fna&_nc_gid=lACuecm4Gk7sbwterBNZHA&_nc_ss=7b2a8&oh=00_AQDnuvf6JMgNmfG7asjUFH6vxFXFy8JcoUEKjZl3sci6Fg&oe=6A63F9EA",
  "https://scontent.fsxr1-1.fna.fbcdn.net/v/t39.30808-6/680283984_1510761720752996_3051313326731859576_n.jpg?stp=dst-jpg_tt6&cstp=mx1600x1200&ctp=s1600x1200&_nc_cat=111&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xr77N5f6t6YQ7kNvwGzw2bS&_nc_oc=Adpe2wv7On8UViOxSj6g8SbaRoMwjxG7-5hCNk2kh0S-TYRmDQHTYYrKbfteniNyGn4&_nc_zt=23&_nc_ht=scontent.fsxr1-1.fna&_nc_gid=Z4Y0kTanfhJ6dSQ5Hvf7AA&_nc_ss=7b2a8&oh=00_AQDtu04RQwWD3rmSHz1vkqA-0EDUEhSUpe2lf4yeDd7L2g&oe=6A63EEDD",
  "https://scontent.fsxr1-2.fna.fbcdn.net/v/t39.30808-6/668580382_1496618652167303_2988064368728397408_n.jpg?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=108&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=2jiIPEk_A3wQ7kNvwGlOFvd&_nc_oc=Adp9eiZCIvun9DJ6BYof0jkQSzbtADkhj00we5YTPBTEP1-LLHPEeMNauFxPs0mNOdk&_nc_zt=23&_nc_ht=scontent.fsxr1-2.fna&_nc_gid=OW6o3OZWWAXvqpxK5Yt4Sg&_nc_ss=7b2a8&oh=00_AQBwTkd4pjyIAfsDiEBOQsi-FhDL-8hZxqA8bTHqyAIB4w&oe=6A63ECF5",
  "https://scontent.fsxr1-2.fna.fbcdn.net/v/t39.30808-6/718390526_1548351730327328_2306703035665862504_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x924&ctp=s2048x924&_nc_cat=109&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=nnPl35fXr8YQ7kNvwEHu3H1&_nc_oc=AdogXarSzDo6z8QsXlVKgbZ34eKmRTmVMT9P15g75Otwc90-vwoO_WZIGXm_KBbsc4A&_nc_zt=23&_nc_ht=scontent.fsxr1-2.fna&_nc_gid=z1eaw15gltwPxLhcMWBGQw&_nc_ss=7b2a8&oh=00_AQAQiXzRQ-2AvjBrpi2ZWKvx4Na9FeVlS5JL6BMMps6plg&oe=6A63F5D6",
  "https://scontent.fsxr1-2.fna.fbcdn.net/v/t39.30808-6/547279770_1329080772254426_2374714801196685821_n.jpg?stp=dst-jpg_tt6&cstp=mx1599x899&ctp=s1599x899&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=HFqqVsCVZyMQ7kNvwFRdd96&_nc_oc=AdrY7UQp8b7pcrPr3RKjh00xISh1XoRbNIfuOQw43pDT4JCDXYuHV0gvuN0F0jtSk0M&_nc_zt=23&_nc_ht=scontent.fsxr1-2.fna&_nc_gid=9dk3d2gKu8i7Y1qgfKgvow&_nc_ss=7b2a8&oh=00_AQDeJHY9SM78SzBySphqGKNh3JFr8zRN83joPyFrWVjEPQ&oe=6A63E411",
  "https://scontent.fsxr1-2.fna.fbcdn.net/v/t39.30808-6/546212089_1329080762254427_4639061122144062009_n.jpg?stp=dst-jpg_tt6&cstp=mx1599x899&ctp=s1599x899&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=LcDCqeRtQL8Q7kNvwFVNw9P&_nc_oc=AdrcZlGBLtJaNPxcMdB0fzangtmNVE-yoRTMttdXw0gn-VnaO-RErgAJKyxhDHKTWY0&_nc_zt=23&_nc_ht=scontent.fsxr1-2.fna&_nc_gid=HnI-fF40owgeo05zfJ85lg&_nc_ss=7b2a8&oh=00_AQCvKdC2AIMj0wbZ1eo2DUpIIZFat0mZfFkR6uwRcs7cbA&oe=6A63DE39",
  "https://scontent.fsxr1-2.fna.fbcdn.net/v/t39.30808-6/482071577_1185537606608744_8991862231142114047_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1600&ctp=s1200x1600&_nc_cat=108&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=VHh-K2DxUmUQ7kNvwG0ogSF&_nc_oc=Adoetk2o-4gjwDPWPK5M0yKA50vhTibYG8WFnc9pA_b-4CF8FBQgxbtlKoMSHtCt7wM&_nc_zt=23&_nc_ht=scontent.fsxr1-2.fna&_nc_gid=4leHj0toxfEuBQtlV3bWTA&_nc_ss=7b2a8&oh=00_AQClxTv1IZVh-qvUN6Lo8uv3XRqppUfiJAZQHGBZjAqj1Q&oe=6A63F439",
  "https://scontent.fsxr1-1.fna.fbcdn.net/v/t39.30808-6/481049995_1180211453808026_3003572971260886575_n.jpg?stp=dst-jpg_tt6&cstp=mx1160x868&ctp=s1160x868&_nc_cat=105&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=0MWcCmoR7SoQ7kNvwFQ1rLb&_nc_oc=AdqvBrTapM-w-fcq0MQLzmjiHYltdeGZe3YqCc-jLR8r6wj55BQ6GZA-zyCMVTWrB5s&_nc_zt=23&_nc_ht=scontent.fsxr1-1.fna&_nc_gid=Kd_b7-aPm975JEngJq6k4A&_nc_ss=7b2a8&oh=00_AQCFn5f6kgNY4GnTUm6s2Fu8rhzqP4N1Y1ZRGuMcCx38SQ&oe=6A640E4C",
  "https://scontent.fsxr1-1.fna.fbcdn.net/v/t39.30808-6/481080523_1180210083808163_5590106973626986495_n.jpg?stp=dst-jpg_tt6&cstp=mx1160x868&ctp=s590x590&_nc_cat=110&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=5jYjJlYTaq4Q7kNvwEjltO4&_nc_oc=AdruDAHr3iRv6K8Ji6yxJk8A2DidX_wlMFfkqX-YMEomT7PIMcv1MPvmQhJJ8AAwb-g&_nc_zt=23&_nc_ht=scontent.fsxr1-1.fna&_nc_gid=FDyjJ-aZhBFjYNDwdsIVDg&_nc_ss=7b2a8&oh=00_AQATknPoZb_HXfd1CfaNGiz9KD2yHwiuzps9i-fH8pm4_A&oe=6A6400FF"
];

const FACULTY_MEMBERS = [
  { id: 1, name: "Dr. Tariq Ahmad", role: "Head of Science Department", education: "Ph.D. in Physics, Kashmir University", experience: "15+ Years" },
  { id: 2, name: "Ms. Shabina Kousar", role: "Senior Mathematics Educator", education: "M.Sc. Mathematics, B.Ed.", experience: "12 Years" },
  { id: 3, name: "Mr. Fayaz Lone", role: "Language Arts Coordinator", education: "M.A. English Literature", experience: "8 Years" },
  { id: 4, name: "Mrs. Rukhsana Begum", role: "Primary Education Specialist", education: "B.A., D.El.Ed.", experience: "10 Years" },
  { id: 5, name: "Mr. Adil Hussain", role: "Physical Education Director", education: "B.P.Ed, National Level Coach", experience: "7 Years" }
];

const TIMELINE_STEPS = [
  { icon: <Compass size={20} />, title: "Pre-Nursery", desc: "Building a strong, curious foundation." },
  { icon: <BookOpen size={20} />, title: "Curriculum", desc: "Rigorous State Board academics." },
  { icon: <Users size={20} />, title: "Individual Tracking", desc: "No student is left unnoticed." },
  { icon: <Lightbulb size={20} />, title: "Interactive Growth", desc: "Public speaking and debate focus." },
  { icon: <HeartHandshake size={20} />, title: "Moral Values", desc: "Deep cultural & ethical grounding." },
  { icon: <Award size={20} />, title: "Historic Results", desc: "Preparing toppers for higher ed." }
];

// --- Animations ---
const fadeInUp : Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer : Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function LabaikaInstitutePage() {
  const [isLoading, setIsLoading] = useState(true);

  // Preloading logic
  useEffect(() => {
    let isMounted = true;
    const logoImg = new window.Image();
    logoImg.src = LOGO_URL;
    logoImg.onload = () => { if (isMounted) setIsLoading(false); };
    logoImg.onerror = () => { if (isMounted) setIsLoading(false); }; 
    const timeout = setTimeout(() => { if (isMounted) setIsLoading(false); }, 3000); 
    
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
      <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center p-6 relative z-50">
        <div className="w-16 h-16 border-[3px] border-[#e2e8f0] border-t-[#0f3024] rounded-full animate-spin mb-8 z-10"></div>
        <div className="w-48 h-2 bg-[#e2e8f0] animate-pulse rounded-full z-10"></div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <main className="min-h-screen font-sans text-gray-800 selection:bg-[#d5aa53]/30 selection:text-[#0f3024] overflow-x-hidden bg-[#fcfcfc]">
        
        {/* HERO SECTION - Deep Green (#0f3024) and Gold (#d5aa53) */}
        <header className="relative w-full pt-16 pb-32 lg:pt-24 lg:pb-40 bg-[#0f3024] border-b-[6px] border-[#d5aa53]">
          
          <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            
            {/* The Logo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}
              className={`w-36 h-36 sm:w-48 sm:h-48 bg-white p-2 shrink-0 shadow-2xl border border-[#d5aa53]/20 z-20 ${LOGO_RADIUS}`}
            >
              <img src={LOGO_URL} alt="Labaika Institute Logo" className={`w-full h-full object-cover ${LOGO_RADIUS}`} />
            </motion.div>
            
            <div className="text-center md:text-left flex-1 pt-2">
              <motion.div 
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#d5aa53]/40 text-[#d5aa53] text-xs font-semibold tracking-wide mb-6"
              >
                <CheckCircle2 size={16} /> 
                Recognized by State Board
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5 tracking-tight font-serif"
              >
                Labaika Institute of <br className="hidden md:block" />Modern Education
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="text-[#d5aa53] font-bold text-lg sm:text-xl mb-6 max-w-2xl mx-auto md:mx-0"
              >
                A Premier Co-Educational School in Srigufwara, Anantnag.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-gray-300 text-sm font-medium"
              >
                <span className="flex items-center gap-2"><MapPin size={18} className="text-[#d5aa53]" /> Mahind, Srigufwara</span>
                <span className="flex items-center gap-2"><Users size={18} className="text-[#d5aa53]" /> 218 Students Enrolled</span>
              </motion.div>
            </div>
          </div>

          {/* Wavy Section Divider matching the screenshot aesthetic */}
          <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-10">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] sm:h-[100px]">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,137.93,121,200.7,105,242.47,94.39,282.8,76.5,321.39,56.44Z" fill="#fcfcfc"></path>
            </svg>
          </div>
        </header>

        {/* TIMELINE / JOURNEY SECTION */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-[#0f3024] mb-3">The Labaika Journey in <span className="text-[#d5aa53]">6 Simple Steps</span></h2>
            <p className="text-gray-500 font-medium">A clear, structured process so you always know what comes next for your child.</p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[40px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-gray-200 via-[#d5aa53] to-gray-200"></div>
            
            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative z-10">
              {TIMELINE_STEPS.map((step, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center text-center group">
                  <div className="relative w-20 h-20 bg-white border-[3px] border-gray-100 group-hover:border-[#0f3024] rounded-full flex items-center justify-center text-[#0f3024] shadow-sm transition-colors duration-300 mb-4 z-10">
                    {step.icon}
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#0f3024] text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
                      0{idx + 1}
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-[#0f3024] mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed px-2">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MAIN CONTENT GRID */}
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 pb-20 border-t border-gray-200 pt-16">
          
          {/* LEFT COLUMN: Deep Content */}
          <article className="lg:col-span-8 space-y-16">
            
            {/* Detailed Multi-Paragraph About Section */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-8">
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl font-bold text-[#0f3024] mb-6 font-serif">Campus Culture & Philosophy</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base text-justify font-medium">
                  <p>
                    Labaika Institute of Modern Education is a prominent private unaided co-educational school operating under the State Board curriculum. Spanning from Pre-Nursery up to the 10th Grade, we maintain standard class section sizes of 25 to 40 students to ensure individual attention.
                  </p>
                  <p>
                    Our teaching philosophy focuses deeply on individual tracking. We firmly believe that no single student should be left ignored or unnoticed. To build public speaking confidence, interactive presentations are integrated directly into our weekly timetable.
                  </p>
                  <p>
                    The school observes milestones with student-led functions. For instance, it hosts notable yearly events like the grand Teachers' Day Celebrations, religious Tilawat-ul-Qur'an events, and environment awareness rallies.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* The Highlight: Soleh ibn Rafi */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
              <div className="bg-[#0f3024] rounded-2xl p-8 sm:p-10 shadow-lg relative overflow-hidden border border-[#d5aa53]/20">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#d5aa53]/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative z-10 text-center sm:text-left">
                  <div className="p-4 bg-[#d5aa53] text-[#0f3024] rounded-xl shrink-0 shadow-md">
                    <Award size={48} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1 bg-white/10 text-[#d5aa53] text-[10px] font-bold uppercase tracking-widest rounded mb-3">
                      Historic Academic Achievement
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">Topper: Jamia Millia Islamia</h2>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                      The institution focus yields clear results; recently, a student named <strong className="text-white font-bold border-b border-[#d5aa53]/50 pb-0.5">Soleh ibn Rafi</strong> achieved the distinction of topping the external entrance examination for the prestigious Jamia Millia Islamia in Delhi.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* FULL WIDTH LEADERSHIP SECTIONS */}
            <div className="space-y-8">
              {/* Founder */}
              <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col sm:flex-row gap-8 items-center sm:items-start"
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-50 rounded-full shrink-0 overflow-hidden relative border border-gray-200 p-1">
                  <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                    <UserCircle size={48} strokeWidth={1.5} />
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left pt-2">
                  <h3 className="text-2xl font-serif font-bold text-[#0f3024] mb-3">Founder's Message</h3>
                  <p className="text-gray-600 leading-relaxed italic mb-4 text-sm font-medium">
                    "Our vision was to create a beacon of learning in Srigufwara where traditional values meet modern educational paradigms. We strive every day to build an environment that nurtures curiosity, discipline, and outstanding academic success for the youth of our valley."
                  </p>
                  <div>
                    <p className="font-bold text-[#0f3024] text-lg">[Founder's Name]</p>
                    <p className="text-xs font-bold text-[#d5aa53] uppercase tracking-wider mt-1">Founder, Labaika Institute</p>
                  </div>
                </div>
              </motion.section>

              {/* Principal */}
              <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col sm:flex-row gap-8 items-center sm:items-start"
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-50 rounded-full shrink-0 overflow-hidden relative border border-gray-200 p-1">
                  <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                    <UserCircle size={48} strokeWidth={1.5} />
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left pt-2">
                  <h3 className="text-2xl font-serif font-bold text-[#0f3024] mb-3">Principal's Desk</h3>
                  <p className="text-gray-600 leading-relaxed italic mb-4 text-sm font-medium">
                    "Education is not merely about textbooks; it is about shaping character. At Labaika, we ensure no student is left unnoticed. Our dedicated faculty works tirelessly to track individual progress and foster public speaking, confidence, and leadership in every child."
                  </p>
                  <div>
                    <p className="font-bold text-[#0f3024] text-lg">[Principal's Name]</p>
                    <p className="text-xs font-bold text-[#d5aa53] uppercase tracking-wider mt-1">Principal, Labaika Institute</p>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* FACULTY DIRECTORY */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-[#0f3024] mb-3 font-serif">Faculty Profile</h2>
              <p className="text-gray-600 mb-8 text-sm font-medium max-w-2xl">
                The school employs local professional educators. It actively keeps a standard annual compensation rate for basic certified positions (such as contracted TGT roles) ranging from roughly ₹2.7L to ₹5.9L per year.
              </p>
              
              <div className="space-y-4">
                {FACULTY_MEMBERS.map((faculty) => (
                  <div key={faculty.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-xl bg-white border border-gray-200 shadow-sm gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#0f3024]/5 rounded-full border border-gray-100 flex items-center justify-center text-[#0f3024] shrink-0">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0f3024] text-base">{faculty.name}</h4>
                        <p className="text-xs font-bold text-[#d5aa53] uppercase tracking-wider mt-0.5">{faculty.role}</p>
                      </div>
                    </div>
                    <div className="sm:text-right w-full sm:w-auto pl-16 sm:pl-0">
                      <p className="text-sm text-gray-700 font-medium">{faculty.education}</p>
                      <p className="text-xs text-gray-500 mt-1">{faculty.experience}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* GALLERY */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="w-full">
              <h2 className="text-3xl font-bold text-[#0f3024] mb-6 font-serif">Campus Life</h2>
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 scrollbar-hide">
                {GALLERY_IMAGES.map((src, idx) => (
                  <div key={idx} className="shrink-0 w-[85%] sm:w-auto aspect-[4/5] snap-center bg-gray-100 rounded-xl overflow-hidden group border border-gray-200">
                    <img 
                      src={src} 
                      alt={`Labaika Campus Activity ${idx + 1}`} 
                      loading="lazy" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                ))}
              </div>
            </motion.section>

          </article>

          {/* RIGHT COLUMN: Sticky Sidebar (Fees & Contact) */}
          <aside className="lg:col-span-4 space-y-8 lg:mt-2">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="sticky top-6 space-y-8">
              
              {/* Detailed Fee Structure Table */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm overflow-hidden z-20" id="fees">
                <h2 className="text-xl font-serif font-bold text-[#0f3024] mb-1">Official Fee Structure</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Regulated by J&K FFRC</p>
                
                <div className="overflow-x-auto -mx-2 px-2 scrollbar-hide">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead>
                      <tr className="border-b-2 border-[#0f3024]">
                        <th className="pb-3 font-bold text-[#0f3024]">Class / Grade</th>
                        <th className="pb-3 font-bold text-gray-500 text-right px-2">M. Tuition (25-26)</th>
                        <th className="pb-3 font-bold text-gray-500 text-right px-2">A. Base (25-26)</th>
                        <th className="pb-3 font-bold text-gray-500 text-right px-2">M. Tuition (26-27)</th>
                        <th className="pb-3 font-bold text-gray-500 text-right pl-2">A. Base (26-27)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { grade: "Nursery / LKG / UKG", m25: "₹585", a25: "₹590", m26: "₹630", a26: "₹630" },
                        { grade: "1st to 5th Grade", m25: "₹585", a25: "₹590", m26: "₹630", a26: "₹630" },
                        { grade: "6th Grade", m25: "₹700", a25: "₹920", m26: "₹755", a26: "₹985" },
                        { grade: "7th Grade", m25: "₹820", a25: "₹920", m26: "₹885", a26: "₹985" },
                        { grade: "8th Grade", m25: "₹935", a25: "₹920", m26: "₹1010", a26: "₹985" },
                        { grade: "9th & 10th Grade", m25: "₹1165", a25: "₹920", m26: "₹1260", a26: "₹985" }
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 font-bold text-gray-700">{row.grade}</td>
                          <td className="py-3 text-right font-medium text-gray-600 px-2">{row.m25}</td>
                          <td className="py-3 text-right font-medium text-gray-600 px-2">{row.a25}</td>
                          <td className="py-3 text-right font-medium text-gray-600 px-2">{row.m26}</td>
                          <td className="py-3 text-right font-medium text-gray-600 pl-2">{row.a26}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Admissions Card & Map */}
              <div className="bg-[#0f3024] rounded-2xl p-6 sm:p-8 shadow-lg text-white" id="admissions">
                <h3 className="font-serif font-bold text-white mb-6 text-xl">Verified Contact Details</h3>
                
                <div className="space-y-5 mb-8">
                  <div className="flex items-start gap-4">
                    <MapPin size={18} className="text-[#d5aa53] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Physical Address</p>
                      <p className="text-sm font-medium text-gray-200">Campus Location Address: R5H7+XWV, Mahind, Srigufwara, District Anantnag, Jammu and Kashmir, Pin Code: 192401.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone size={18} className="text-[#d5aa53] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Telephone Helpline</p>
                      <a href="tel:+918491900937" className="text-sm font-medium text-gray-200 hover:text-[#d5aa53]">+91 84919 00937</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail size={18} className="text-[#d5aa53] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Contact</p>
                      <a href="mailto:lime5204@gmail.com" className="text-sm font-medium text-gray-200 hover:text-[#d5aa53] break-all">lime5204@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Globe size={18} className="text-[#d5aa53] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Web Domain</p>
                      <a href="https://labaikainstitute.com" target="_blank" rel="noreferrer" className="text-sm font-medium text-gray-200 hover:text-[#d5aa53]">labaikainstitute.com</a>
                    </div>
                  </div>
                </div>

                {/* Map Integration */}
                <div className="rounded-xl overflow-hidden border border-white/20 h-48 bg-[#153e2f]">
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
              </div>
            </motion.div>
          </aside>
        </div>

        {/* CUSTOM LABAIKA FOOTER */}
        <footer className="w-full bg-[#0a241b] pt-16 pb-8 border-t-[4px] border-[#d5aa53] text-gray-400">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12">
            
            <div className="md:col-span-5 flex flex-col md:flex-row gap-6 items-start">
               <div className={`w-20 h-20 bg-white p-1 shrink-0 border border-white/20 shadow-lg ${LOGO_RADIUS}`}>
                  <img src={LOGO_URL} alt="Footer Logo" className={`w-full h-full object-cover ${LOGO_RADIUS}`} />
               </div>
               <div>
                  <h4 className="text-white font-extrabold text-xl mb-3 font-serif">Labaika Institute</h4>
                  <p className="text-sm leading-relaxed max-w-sm text-gray-400 font-medium">
                    A prominent private unaided institution providing continuous, standard-driven education to shape the future of Srigufwara.
                  </p>
               </div>
            </div>

            <div className="md:col-span-3 md:col-start-7">
              <h4 className="text-white font-bold mb-5 uppercase tracking-widest text-[11px]">Directory</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#admissions" className="hover:text-[#d5aa53] transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-[#d5aa53]/50" /> Admissions</a></li>
                <li><a href="#" className="hover:text-[#d5aa53] transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-[#d5aa53]/50" /> Faculty</a></li>
                <li><a href="#fees" className="hover:text-[#d5aa53] transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-[#d5aa53]/50" /> Fee Guidelines</a></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-white font-bold mb-5 uppercase tracking-widest text-[11px]">Reach Us</h4>
              <ul className="space-y-3 text-sm font-medium text-gray-400">
                <li className="flex items-center gap-3"><MapPin size={16} className="text-[#d5aa53]/50 shrink-0" /> Mahind, Srigufwara</li>
                <li className="flex items-center gap-3"><Phone size={16} className="text-[#d5aa53]/50 shrink-0" /> +91 84919 00937</li>
                <li className="flex items-center gap-3"><Mail size={16} className="text-[#d5aa53]/50 shrink-0" /> lime5204@gmail.com</li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto px-6 pt-6 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-gray-500">
            <p>© {new Date().getFullYear()} Labaika Institute of Modern Education. All rights reserved.</p>
            <p className="mt-3 md:mt-0 text-gray-400">Recognized by J&K State Board of School Education</p>
          </div>
        </footer>

        {/* Global style to hide scrollbars but allow scrolling */}
        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
      </main>
    </AnimatePresence>
  );
}
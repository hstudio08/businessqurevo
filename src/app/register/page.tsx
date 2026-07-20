"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Mail, Phone, AlignLeft, Image as ImageIcon, 
  ChevronDown, Search, ShieldCheck, ArrowRight, Loader2, Info, X, 
  User, MapPin, Briefcase, Check, ArrowLeft, AlertCircle
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase'; 

const BUSINESS_CATEGORIES = [
  "Accounting", "Advertising", "Agriculture", "Apparel & Fashion", "Architecture", "Automotive", 
  "Bakery", "Banking", "Barber Shop", "Beauty Salon", "Bookstore", "Boutique", "Cafe", 
  "Catering", "Childcare", "Clinic", "Computer Repair", "Construction", "Consulting", 
  "Courier Service", "Dance Studio", "Dental Clinic", "Design Agency", "Dry Cleaning", 
  "Education", "Electrical", "Electronics Store", "Event Planning", "Fitness Center", 
  "Florist", "Furniture Store", "Grocery Store", "Gym", "Hardware Store", "Healthcare", 
  "Home Decor", "Hospitality", "Insurance", "Interior Design", "Jewelry", "Landscaping", 
  "Legal Services", "Logistics", "Manufacturing", "Marketing", "Massage Therapy", 
  "Music Studio", "Non-Profit", "Optometrist", "Pet Store", "Pharmacy", "Photography", 
  "Plumbing", "Printing", "Real Estate", "Restaurant", "Retail", "Software & IT", 
  "Spa", "Supermarket", "Tailor", "Technology", "Travel Agency", "Veterinary Clinic", 
  "Web Development", "Wedding Planning", "Yoga Studio", "Custom"
];

const STEPS = ["Profile", "Identity", "Details", "Plan", "Assets"];

export default function RegisterBusiness() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoginMode, setIsLoginMode] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '', role: '', phone: '', email: '', address: '',
    businessName: '', category: '', customCategory: '', shortDescription: '', longDescription: '',
    planTier: 'Premium',   
    planCycle: 'Yearly',   
    images: [] as string[]
  });

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [noPhotosChecked, setNoPhotosChecked] = useState(false);
  
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtpInput, setUserOtpInput] = useState('');
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredCategories = BUSINESS_CATEGORIES.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'email') setIsLoginMode(false);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.fullName || !formData.role || !formData.phone || !formData.address) return alert("Please fill in all personal details.");
      if (!otpVerified) return alert("Please verify your email address before proceeding.");
    }
    if (currentStep === 2) {
      if (!formData.businessName || !formData.category) return alert("Please provide your business name and sector.");
      if (formData.category === 'Custom' && !formData.customCategory) return alert("Please specify your custom business sector.");
    }
    if (currentStep === 3) {
      if (!formData.shortDescription) return alert("Please provide a short description for your business.");
    }
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSendOTP = async () => {
    if (!formData.email) return alert("Please enter an email first.");
    setIsLoadingOtp(true);
    
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", formData.email.toLowerCase()));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) setIsLoginMode(true);

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      const time = new Date(new Date().getTime() + 15 * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, 
        { to_email: formData.email, passcode: otp, time: time }
      );
      setOtpSent(true);
    } catch (error) {
      alert("Failed to send OTP. Please check your network or EmailJS configuration.");
    } finally {
      setIsLoadingOtp(false);
    }
  };

  // UPDATED: Dynamically route existing users to their unique dashboard
  const handleVerifyOTP = async () => {
    if (userOtpInput === generatedOtp) {
      setOtpVerified(true);
      
      if (isLoginMode) {
        setIsLoadingOtp(true); // Reuse loader to show we are routing
        try {
          // Fetch the user's business application to construct their unique dashboard URL
          const q = query(
            collection(db, "business_applications"), 
            where("email", "==", formData.email.toLowerCase())
          );
          const querySnapshot = await getDocs(q);

          let targetRoute = '/register'; // Fallback if they somehow don't have an application yet

          if (!querySnapshot.empty) {
            const bizData = querySnapshot.docs[0].data();
            
            // Helper function to safely convert strings into URL-friendly slugs
            const slugify = (text?: string) => {
              if (!text) return '';
              return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            };

            const stateSlug = slugify(bizData.state) || 'india';
            const citySlug = slugify(bizData.city) || 'local';
            const bizSlug = slugify(bizData.businessName) || 'business';

            // Construct the final custom route
            targetRoute = `/${stateSlug}/${citySlug}/${bizSlug}/dashboard`;
          }

          alert("Login successful! Redirecting to your workspace...");
          localStorage.setItem('qurevo_session', formData.email.toLowerCase());
          router.push(targetRoute);

        } catch (error) {
          console.error("Routing Error:", error);
          alert("Failed to generate your secure workspace link. Please try again.");
          setIsLoadingOtp(false);
        }
      }
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploadingImages(true);
    
    const uploadedUrls: string[] = [];
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      alert("ImgBB API key is missing.");
      setIsUploadingImages(false);
      return;
    }

    try {
      for (let i = 0; i < files.length; i++) {
        const uploadData = new FormData();
        uploadData.append('image', files[i]);
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, { method: 'POST', body: uploadData });
        const data = await response.json();
        if (data.success) uploadedUrls.push(data.data.url);
      }
      setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls].slice(0, 10) }));
      setNoPhotosChecked(false);
    } catch (error) {
      alert("Error uploading images.");
    } finally {
      setIsUploadingImages(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, index) => index !== indexToRemove) }));
  };

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerified) return alert("Please verify your email before submitting.");
    if (formData.images.length === 0 && !noPhotosChecked) {
      return alert("You must either upload at least one photo OR check the box stating you don't have photos right now.");
    }
    setShowConfirmModal(true);
  };

const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Helper to create a URL-safe string (e.g., "Labaika Institute" -> "labaika-institute")
      const slugify = (text: string) => {
        if (!text) return 'business';
        return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      };

      // Add stateSlug, citySlug, and slug to the database submission
      await addDoc(collection(db, "business_applications"), {
        ...formData,
        stateSlug: slugify("jammu and kashmir"), // You can map this dynamically if you add state/city to your form later
        citySlug: slugify("anantnag"), 
        slug: slugify(formData.businessName),
        status: 'pending',
        submittedAt: new Date().toISOString(),
        createdAt: serverTimestamp()
      });

      // ... rest of your submit logic (Users collection logic, routing to thank you page, etc.)

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", formData.email.toLowerCase()));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        await addDoc(collection(db, "users"), {
          email: formData.email.toLowerCase(),
          businessName: formData.businessName,
          createdAt: serverTimestamp()
        });
      }

      localStorage.setItem('qurevo_session', formData.email);
      setShowConfirmModal(false);
      router.push('/thank-you');
    } catch (error) {
      alert("A database error occurred. Please try again.");
      setShowConfirmModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMonthsMultiplier = (cycle: string) => {
    switch (cycle) {
      case 'Monthly': return 1;
      case 'Quarterly': return 3;
      case 'Half-Yearly': return 6;
      case 'Yearly': return 12;
      default: return 12;
    }
  };

  const calculatePrice = (baseRate: number, cycle: string) => {
    return baseRate * getMonthsMultiplier(cycle);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-evergreen relative overflow-hidden font-sans flex items-start sm:items-center justify-center p-0 sm:p-6 lg:p-8">
      
      {/* Abstract Light-Mode Glassmorphism Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-fern-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-lime_cream/30 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-2xl relative z-10 flex flex-col items-center">
        
        {/* Sleek App-Header */}
        <div className="w-full mb-6 mt-8 sm:mt-0 text-center px-4">
          <Link href="/" className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-200 mb-4 group hover:shadow-md transition-all">
            <div className="w-6 h-6 bg-gradient-to-tr from-lime_cream to-fern-600 rounded-br-lg rounded-tl-lg group-hover:scale-110 transition-transform duration-300"></div>
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-evergreen mb-1">Partner With Us</h1>
          <p className="text-slate-500 text-sm max-w-md mx-auto">Manage your operations and scale globally.</p>
        </div>

        {/* Compact App-like Segmented Progress Bar */}
        {!isLoginMode && (
          <div className="w-full max-w-lg mb-8 px-4 flex gap-1.5">
            {STEPS.map((step, idx) => {
              const isActive = (idx + 1) === currentStep;
              const isCompleted = (idx + 1) < currentStep;
              return (
                <div key={step} className="flex-1 flex flex-col gap-2 relative group">
                  <div className={`h-1.5 w-full rounded-full transition-colors duration-300 ${isActive ? 'bg-fern-500' : isCompleted ? 'bg-fern-500/40' : 'bg-slate-200'}`}></div>
                  <span className={`text-center text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 hidden sm:block ${isActive ? 'text-fern-600' : 'text-slate-400'}`}>{step}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* The Clean White Form Card */}
        <form onSubmit={handlePreSubmit} className="w-full bg-white sm:rounded-[2rem] p-6 sm:p-10 shadow-premium border-y sm:border border-slate-100 min-h-[60vh] sm:min-h-0 flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: PERSONAL INFO */}
            {currentStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} transition={{ duration: 0.3 }} className="space-y-6">
                
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-evergreen">{isLoginMode ? "Account Found" : "Personal Profile"}</h2>
                  <p className="text-slate-500 text-sm mt-1">{isLoginMode ? "Verify via secure OTP." : "Primary contact details."}</p>
                </div>

                {/* Email / OTP Block - WhatsApp/App style */}
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 shadow-sm">
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Account Email <span className="text-fern-500">*</span></label>
                  
                  {isLoginMode && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-2xl text-xs flex items-start gap-2">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <p>Account registered. Complete verification to access your dashboard.</p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={otpVerified || otpSent || isLoadingOtp} className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-evergreen text-sm font-medium focus:outline-none focus:border-fern-500 focus:ring-4 focus:ring-fern-500/10 transition-all disabled:opacity-60 disabled:bg-slate-100" placeholder="hello@business.com"/>
                    </div>
                    {!otpVerified ? (
                      <button type="button" onClick={handleSendOTP} disabled={isLoadingOtp || !formData.email || (otpSent && !isLoginMode)} className="shrink-0 bg-fern-600 hover:bg-fern-700 text-white px-6 py-3.5 rounded-2xl text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center min-w-[130px] active:scale-95 shadow-sm">
                        {isLoadingOtp ? <Loader2 size={16} className="animate-spin" /> : (otpSent ? "Resend Code" : "Send Code")}
                      </button>
                    ) : (
                      <div className="shrink-0 bg-fern-50 border border-fern-200 text-fern-700 px-6 py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2"><ShieldCheck size={16} /> Verified</div>
                    )}
                  </div>

                  <AnimatePresence>
                    {otpSent && !otpVerified && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-4 pt-4 border-t border-slate-200 overflow-hidden">
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide text-center sm:text-left">Enter 6-Digit Code</label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input type="text" maxLength={6} value={userOtpInput} onChange={(e) => setUserOtpInput(e.target.value)} disabled={isLoadingOtp} className="w-full bg-white border border-slate-200 focus:border-fern-500 focus:ring-4 focus:ring-fern-500/10 rounded-2xl px-4 py-3.5 text-evergreen text-center tracking-[0.5em] font-bold outline-none transition-all disabled:opacity-50"/>
                          <button type="button" onClick={handleVerifyOTP} disabled={isLoadingOtp} className="w-full sm:w-auto bg-evergreen hover:bg-evergreen-400 text-white px-8 py-3.5 rounded-2xl text-sm font-bold transition-colors active:scale-95 shadow-sm disabled:opacity-50 flex justify-center items-center">
                            {isLoadingOtp && isLoginMode ? <Loader2 size={16} className="animate-spin" /> : isLoginMode ? "Login" : "Verify"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {!isLoginMode && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide pl-1">Full Name <span className="text-fern-500">*</span></label>
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-evergreen text-sm font-medium focus:outline-none focus:bg-white focus:border-fern-500 focus:ring-4 focus:ring-fern-500/10 transition-all placeholder:text-slate-400" placeholder="John Doe"/>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide pl-1">Role <span className="text-fern-500">*</span></label>
                      <div className="relative">
                        <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select name="role" value={formData.role} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-evergreen text-sm font-medium focus:outline-none focus:bg-white focus:border-fern-500 focus:ring-4 focus:ring-fern-500/10 transition-all appearance-none">
                          <option value="">Select role</option>
                          <option value="Owner">Owner / Founder</option>
                          <option value="Manager">Manager</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide pl-1">Phone <span className="text-fern-500">*</span></label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-evergreen text-sm font-medium focus:outline-none focus:bg-white focus:border-fern-500 focus:ring-4 focus:ring-fern-500/10 transition-all placeholder:text-slate-400" placeholder="+91 98765 43210"/>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide pl-1">Address <span className="text-fern-500">*</span></label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-4 top-4 text-slate-400" />
                        <textarea name="address" value={formData.address} onChange={handleInputChange} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-evergreen text-sm font-medium focus:outline-none focus:bg-white focus:border-fern-500 focus:ring-4 focus:ring-fern-500/10 transition-all resize-none placeholder:text-slate-400" placeholder="Street, City, PIN..."/>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 2: BUSINESS IDENTITY */}
            {currentStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-evergreen">Business Identity</h2>
                  <p className="text-slate-500 text-sm mt-1">Core details of your operation.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide pl-1">Business Name <span className="text-fern-500">*</span></label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-evergreen text-sm font-medium focus:outline-none focus:bg-white focus:border-fern-500 focus:ring-4 focus:ring-fern-500/10 transition-all"/>
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide pl-1">Sector <span className="text-fern-500">*</span></label>
                  <div onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-evergreen text-sm font-medium cursor-pointer flex justify-between items-center hover:bg-white transition-colors">
                    <span className={formData.category ? 'text-evergreen' : 'text-slate-400'}>{formData.category || "Select classification..."}</span>
                    <ChevronDown size={16} className="text-slate-400" />
                  </div>
                  <AnimatePresence>
                    {isCategoryOpen && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
                          <Search size={14} className="text-slate-400" />
                          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent text-sm text-evergreen font-medium focus:outline-none" autoFocus/>
                        </div>
                        <ul className="max-h-48 overflow-y-auto p-1 scrollbar-thin">
                          {filteredCategories.map((cat) => (
                            <li key={cat} onClick={() => { setFormData({...formData, category: cat}); setIsCategoryOpen(false); }} className="px-3 py-2.5 text-sm text-slate-600 font-medium hover:bg-fern-50 hover:text-fern-700 rounded-xl cursor-pointer transition-colors">{cat}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {formData.category === 'Custom' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide pl-1">Custom Sector <span className="text-fern-500">*</span></label>
                    <input type="text" name="customCategory" value={formData.customCategory} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-evergreen text-sm font-medium focus:outline-none focus:bg-white focus:border-fern-500 focus:ring-4 focus:ring-fern-500/10 transition-all"/>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* STEP 3: DESCRIPTIONS */}
            {currentStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-evergreen">Descriptions</h2>
                  <p className="text-slate-500 text-sm mt-1">Define your market presence.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide pl-1">Punchline <span className="text-fern-500">*</span></label>
                  <textarea name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-evergreen text-sm font-medium focus:outline-none focus:bg-white focus:border-fern-500 focus:ring-4 focus:ring-fern-500/10 transition-all resize-none"/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide pl-1">Deep Overview <span className="text-slate-400 lowercase font-normal">(Optional)</span></label>
                  <textarea name="longDescription" value={formData.longDescription} onChange={handleInputChange} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-evergreen text-sm font-medium focus:outline-none focus:bg-white focus:border-fern-500 focus:ring-4 focus:ring-fern-500/10 transition-all resize-none"/>
                </div>
              </motion.div>
            )}

            {/* STEP 4: PLAN SELECTION */}
            {currentStep === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-evergreen">Select Your Plan</h2>
                  <p className="text-slate-500 text-sm mt-1">Billed only upon active deployment.</p>
                </div>

                {/* Sleek Duration Toggle */}
                <div className="flex justify-center mb-6">
                  <div className="bg-slate-100 p-1 rounded-2xl inline-flex shadow-inner overflow-x-auto border border-slate-200">
                    {['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'].map((cycle) => (
                      <button
                        key={cycle} type="button" onClick={() => setFormData({ ...formData, planCycle: cycle })}
                        className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${formData.planCycle === cycle ? 'bg-white text-fern-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        {cycle}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pricing Tiers - Compact App Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'Starter', price: 75, desc: 'Essential presence.' },
                    { id: 'Premium', price: 100, desc: 'Growth tools.', recommended: true },
                    { id: 'Premium Plus', price: 125, desc: 'Ultimate scaling.' }
                  ].map((plan) => (
                    <div 
                      key={plan.id} onClick={() => setFormData({...formData, planTier: plan.id})}
                      className={`relative cursor-pointer rounded-3xl p-5 border-2 transition-all duration-300 ${formData.planTier === plan.id ? 'border-fern-500 bg-fern-50 shadow-md scale-[1.02] z-10' : 'border-slate-100 bg-white hover:border-slate-300'}`}
                    >
                      {plan.recommended && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-fern-600 text-white text-[9px] font-bold uppercase tracking-wider py-0.5 px-2 rounded-full shadow-sm">Recommended</span>}
                      <h3 className={`text-base font-bold mb-0.5 ${formData.planTier === plan.id ? 'text-fern-900' : 'text-evergreen'}`}>{plan.id}</h3>
                      <p className="text-[10px] text-slate-500 mb-3">{plan.desc}</p>
                      <div className="mb-4">
                        <span className={`text-2xl font-extrabold ${formData.planTier === plan.id ? 'text-fern-600' : 'text-evergreen'}`}>₹{calculatePrice(plan.price, formData.planCycle)}</span>
                        <span className="text-slate-400 text-[10px] font-medium"> / {formData.planCycle.toLowerCase()}</span>
                        <p className="text-[9px] text-slate-400 mt-0.5 font-medium">(₹{plan.price}/mo)</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.planTier === plan.id ? 'border-fern-500 bg-fern-500' : 'border-slate-200'}`}>
                        {formData.planTier === plan.id && <Check size={12} className="text-white" strokeWidth={3} />}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 5: ASSETS & SUBMIT */}
            {currentStep === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} transition={{ duration: 0.3 }} className="space-y-6">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-evergreen">Brand Assets</h2>
                </div>
                
                <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4">
                  <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800 leading-relaxed font-medium">Uploaded assets define your public corporate mapping.</p>
                </div>
                
                <div className="bg-slate-50 border border-slate-300 border-dashed rounded-3xl p-6 text-center hover:bg-slate-100 transition-colors relative">
                  {isUploadingImages ? (
                    <div className="flex flex-col items-center justify-center py-4">
                      <Loader2 size={28} className="text-fern-500 animate-spin mb-3" />
                      <p className="text-slate-600 text-xs font-bold">Encrypting & Uploading...</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center mb-3"><ImageIcon size={22} className="text-fern-500" /></div>
                      <p className="text-evergreen text-sm font-bold mb-1">Select Identity Images</p>
                      <p className="text-xs text-slate-400 mb-4 font-medium">({formData.images.length}/10 allocated slots)</p>
                      <input type="file" multiple accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" onChange={handleImageUpload} disabled={formData.images.length >= 10 || isUploadingImages || noPhotosChecked}/>
                      <div className="inline-block bg-white border border-slate-200 text-evergreen px-5 py-2 rounded-xl text-xs font-bold pointer-events-none shadow-sm">
                        {formData.images.length >= 10 ? "Capacity Reached" : "Browse Device"}
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3 px-1">
                  <input type="checkbox" id="no-photos" checked={noPhotosChecked} onChange={(e) => { setNoPhotosChecked(e.target.checked); if (e.target.checked) setFormData(prev => ({ ...prev, images: [] })); }} className="w-4 h-4 rounded border-slate-300 bg-white accent-fern-500 cursor-pointer"/>
                  <label htmlFor="no-photos" className={`text-xs cursor-pointer font-bold ${formData.images.length === 0 ? 'text-evergreen' : 'text-slate-400'}`}>Defer asset upload configuration.</label>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {formData.images.map((url, idx) => (
                      <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 group">
                        <img src={url} alt={`Asset ${idx + 1}`} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 w-6 h-6 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white shadow-sm"><X size={12} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dynamic App Footer Actions */}
          {!isLoginMode && (
            <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <button type="button" onClick={handlePrevStep} className="flex items-center gap-1.5 text-slate-400 hover:text-evergreen text-sm font-bold transition-colors px-2 py-2"><ArrowLeft size={16} /> Back</button>
              ) : <div></div>}
              {currentStep < 5 ? (
                <button type="button" onClick={handleNextStep} className="bg-evergreen text-white hover:bg-evergreen-400 px-7 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 active:scale-95 shadow-sm">Next <ArrowRight size={16} /></button>
              ) : (
                <button type="submit" className="bg-fern-600 text-white hover:bg-fern-700 px-7 py-3 rounded-2xl text-sm font-bold transition-all shadow-md flex items-center gap-2 active:scale-95">Deploy <Check size={16} strokeWidth={3} /></button>
              )}
            </div>
          )}
        </form>
      </div>

      {/* COMPACT CONFIRMATION MODAL */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-evergreen/60 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="bg-white border border-slate-100 p-8 rounded-[2rem] w-full max-w-sm shadow-2xl relative">
              <div className="flex justify-center mb-5"><div className="w-14 h-14 bg-fern-50 border border-fern-100 rounded-full flex items-center justify-center"><Check size={28} className="text-fern-600" /></div></div>
              <h2 className="text-xl font-bold text-center text-evergreen mb-2">Finalize Protocol</h2>
              <p className="text-slate-500 text-center mb-8 text-xs leading-relaxed font-medium">System is primed. Application will be submitted to Qurevo administration for structural review and deployment.</p>
              <div className="flex flex-col gap-3">
                <button onClick={handleFinalSubmit} disabled={isSubmitting} className="w-full bg-fern-600 text-white font-bold py-3.5 rounded-2xl flex justify-center items-center gap-2 hover:bg-fern-700 transition-all shadow-md disabled:opacity-50 text-sm active:scale-95">
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'Confirm & Initialize'}
                </button>
                <button onClick={() => setShowConfirmModal(false)} disabled={isSubmitting} className="w-full bg-slate-50 text-slate-600 font-bold py-3.5 rounded-2xl hover:bg-slate-100 transition-colors border border-slate-200 disabled:opacity-50 text-sm">Return to Editor</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
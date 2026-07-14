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

const STEPS = ["Personal Info", "Business Identity", "Descriptions", "Select Plan", "Brand Assets"];

export default function RegisterBusiness() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoginMode, setIsLoginMode] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '', role: '', phone: '', email: '', address: '',
    businessName: '', category: '', customCategory: '', shortDescription: '', longDescription: '',
    pricingPlan: 'annual',
    images: [] as string[]
  });

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtpInput, setUserOtpInput] = useState('');
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);

  const filteredCategories = BUSINESS_CATEGORIES.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'email') setIsLoginMode(false);
  };

  const checkEmailExists = (email: string) => {
    const existingUsers = JSON.parse(localStorage.getItem('qurevo_users') || '[]');
    return existingUsers.includes(email);
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
    
    if (checkEmailExists(formData.email)) {
      setIsLoginMode(true);
    }

    setIsLoadingOtp(true);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    const time = new Date(new Date().getTime() + 15 * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    try {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, 
        { to_email: formData.email, passcode: otp, time: time }
      );
      setOtpSent(true);
    } catch (error) {
      console.error("Failed to send OTP", error);
      alert("Failed to send OTP. Please check your EmailJS configuration.");
    } finally {
      setIsLoadingOtp(false);
    }
  };

  const handleVerifyOTP = () => {
    if (userOtpInput === generatedOtp) {
      setOtpVerified(true);
      if (isLoginMode) {
        alert("Login successful! Redirecting to dashboard...");
        localStorage.setItem('qurevo_session', formData.email);
        router.push('/dashboard'); 
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
      alert("ImgBB API key is missing. Check your environment variables.");
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
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading images.");
    } finally {
      setIsUploadingImages(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, index) => index !== indexToRemove) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerified) return alert("Please verify your email before submitting.");
    
    // 1. Save Full Application to Admin Dashboard Database
    const existingApps = JSON.parse(localStorage.getItem('qurevo_applications') || '[]');
    const newApp = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Pending',
      submissionDate: new Date().toISOString()
    };
    localStorage.setItem('qurevo_applications', JSON.stringify([...existingApps, newApp]));

    // 2. Save Email to Users Database (This fixes the Login issue)
    const existingUsers = JSON.parse(localStorage.getItem('qurevo_users') || '[]');
    if (!existingUsers.includes(formData.email)) {
      localStorage.setItem('qurevo_users', JSON.stringify([...existingUsers, formData.email]));
    }

    // 3. Log user in and redirect to Thank You page
    localStorage.setItem('qurevo_session', formData.email);
    router.push('/thank-you');
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-[55vh] bg-gradient-to-b from-[#f8fdfa] to-slate-50 z-0 border-b border-emerald-100/50">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-emerald-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 relative z-10">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-sm border border-emerald-100 mb-6 group hover:shadow-md transition-shadow">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#ECF39E] to-[#90A955] rounded-br-xl rounded-tl-xl group-hover:scale-110 transition-transform duration-300"></div>
          </Link>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Partner With Us</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">Provide your details below to begin establishing your premium digital presence.</p>
        </div>

        {/* Progress Tracker (Hidden if Login Mode) */}
        {!isLoginMode && (
           <div className="mb-12 relative max-w-3xl mx-auto px-4 hidden sm:block">
           <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0 rounded-full"></div>
           <motion.div 
             className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2 z-0 rounded-full"
             initial={{ width: 0 }}
             animate={{ width: `${((currentStep - 1) / 4) * 100}%` }}
             transition={{ duration: 0.4, ease: "easeInOut" }}
           ></motion.div>
           
           <div className="relative z-10 flex justify-between">
             {STEPS.map((step, idx) => {
               const stepNum = idx + 1;
               const isActive = stepNum === currentStep;
               const isCompleted = stepNum < currentStep;
               
               return (
                 <div key={step} className="flex flex-col items-center">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : isCompleted ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>
                     {isCompleted ? <Check size={18} /> : stepNum}
                   </div>
                   <span className={`mt-2 text-[10px] font-semibold ${isActive ? 'text-emerald-700' : 'text-slate-500'}`}>{step}</span>
                 </div>
               )
             })}
           </div>
         </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-6 sm:p-10 shadow-xl shadow-slate-200/50">
          
          <AnimatePresence mode="wait">
            {/* --- STEP 1: PERSONAL INFO --- */}
            {currentStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-bold text-slate-900">{isLoginMode ? "Account Found" : "Personal Information"}</h2>
                  <p className="text-slate-500 text-sm mt-1">{isLoginMode ? "Welcome back! Please verify your email to log in." : "We need to know who is managing this account."}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Email & OTP Field */}
                  <div className="md:col-span-2 bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                    
                    {isLoginMode && (
                      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm flex items-start gap-2">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <p>An account is already registered with this email. An OTP has been sent so you can log in to your dashboard.</p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={otpVerified || otpSent}
                          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 disabled:bg-slate-50 disabled:text-slate-500"
                          placeholder="hello@business.com"
                        />
                      </div>
                      {!otpVerified ? (
                        <button 
                          type="button" onClick={handleSendOTP} disabled={isLoadingOtp || !formData.email || (otpSent && !isLoginMode)}
                          className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center min-w-[140px]"
                        >
                          {isLoadingOtp ? <Loader2 size={18} className="animate-spin" /> : (otpSent ? "Resend OTP" : "Send OTP")}
                        </button>
                      ) : (
                        <div className="shrink-0 bg-emerald-100 border border-emerald-200 text-emerald-700 px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2">
                          <ShieldCheck size={18} /> Verified
                        </div>
                      )}
                    </div>

                    <AnimatePresence>
                      {otpSent && !otpVerified && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-4 pt-4 border-t border-emerald-200/50 flex flex-col sm:flex-row gap-3 items-end overflow-hidden">
                          <div className="w-full">
                            <label className="block text-xs font-semibold text-emerald-800 mb-2">Enter the 6-digit code</label>
                            <input 
                              type="text" maxLength={6} value={userOtpInput} onChange={(e) => setUserOtpInput(e.target.value)}
                              className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-3 text-slate-900 text-center tracking-[0.5em] font-bold focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            />
                          </div>
                          <button type="button" onClick={handleVerifyOTP} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition-colors">
                            {isLoginMode ? "Login" : "Verify"}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {!isLoginMode && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:border-emerald-500" placeholder="John Doe"/>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Role in Business <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <Briefcase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <select name="role" value={formData.role} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:border-emerald-500 appearance-none">
                            <option value="">Select your role</option>
                            <option value="Owner">Owner / Founder</option>
                            <option value="Manager">Manager</option>
                          </select>
                          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:border-emerald-500" placeholder="+91 98765 43210"/>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Physical Address <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <MapPin size={18} className="absolute left-3 top-4 text-slate-400" />
                          <textarea name="address" value={formData.address} onChange={handleInputChange} rows={2} className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:border-emerald-500 resize-none" placeholder="Full street address, City, PIN Code..."/>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* --- STEP 2: BUSINESS IDENTITY --- */}
            {currentStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-bold text-slate-900">Business Identity</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Business Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:border-emerald-500"/>
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Business Sector <span className="text-red-500">*</span></label>
                    <div onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 cursor-pointer flex justify-between items-center">
                      <span>{formData.category || "Select a sector..."}</span>
                      <ChevronDown size={18} className="text-slate-400" />
                    </div>
                    <AnimatePresence>
                      {isCategoryOpen && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-50 top-[80px] left-0 w-full bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden">
                          <div className="p-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
                            <Search size={16} className="text-slate-400" />
                            <input type="text" placeholder="Search categories..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent text-sm text-slate-900 focus:outline-none" autoFocus/>
                          </div>
                          <ul className="max-h-60 overflow-y-auto p-2">
                            {filteredCategories.map((cat) => (
                              <li key={cat} onClick={() => { setFormData({...formData, category: cat}); setIsCategoryOpen(false); }} className="px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50 rounded-lg cursor-pointer">{cat}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {formData.category === 'Custom' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Specify Custom Sector <span className="text-red-500">*</span></label>
                      <input type="text" name="customCategory" value={formData.customCategory} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"/>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* --- STEP 3: DESCRIPTIONS --- */}
            {currentStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-bold text-slate-900">Business Descriptions</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Short Description / Punchline <span className="text-red-500">*</span></label>
                    <textarea name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} rows={2} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-emerald-500 resize-none"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Detailed Description <span className="text-slate-400 text-xs font-normal ml-2">(Optional)</span></label>
                    <textarea name="longDescription" value={formData.longDescription} onChange={handleInputChange} rows={5} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-emerald-500 resize-none"/>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- STEP 4: PLAN SELECTION --- */}
            {currentStep === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-bold text-slate-900">Select Your Plan</h2>
                  <p className="text-slate-500 text-sm mt-1">Choose a package. You won't be charged until your page is live.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { id: 'monthly', name: 'Monthly', price: '₹299/mo', desc: 'Pay as you go' },
                    { id: 'quarterly', name: 'Quarterly', price: '₹749/3mo', desc: 'Save 15%' },
                    { id: 'annual', name: 'Annual', price: '₹1,999/yr', desc: 'Best Value', recommended: true }
                  ].map((plan) => (
                    <div 
                      key={plan.id} onClick={() => setFormData({...formData, pricingPlan: plan.id})}
                      className={`relative cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ${formData.pricingPlan === plan.id ? 'border-emerald-600 bg-emerald-50 shadow-md scale-105 z-10' : 'border-slate-200 bg-white hover:border-emerald-300'}`}
                    >
                      {plan.recommended && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">Recommended</span>}
                      <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                      <p className="text-2xl font-extrabold text-emerald-700 my-2">{plan.price}</p>
                      <p className="text-sm text-slate-500">{plan.desc}</p>
                      <div className={`mt-4 w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.pricingPlan === plan.id ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'}`}>
                        {formData.pricingPlan === plan.id && <Check size={14} className="text-white" />}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* --- STEP 5: ASSETS & SUBMIT --- */}
            {currentStep === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-bold text-slate-900">Brand Assets</h2>
                </div>
                <div className="flex items-start gap-3 bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                  <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800 leading-relaxed">
                    <strong>Notice:</strong> By uploading images, you acknowledge they will become part of your public business profile.
                  </p>
                </div>
                <div className="bg-slate-50 border-2 border-slate-200 border-dashed rounded-2xl p-8 text-center hover:bg-slate-100 relative">
                  {isUploadingImages ? (
                    <div className="flex flex-col items-center justify-center py-6">
                      <Loader2 size={32} className="text-emerald-600 animate-spin mb-4" />
                      <p className="text-slate-700 font-medium">Uploading securely...</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 mx-auto bg-white shadow-sm rounded-full flex items-center justify-center mb-4">
                        <ImageIcon size={28} className="text-emerald-600" />
                      </div>
                      <p className="text-slate-800 font-bold mb-1">Click to upload Logo & Images</p>
                      <p className="text-sm text-slate-500 mb-4">({formData.images.length}/10 uploaded. You can skip this for now.)</p>
                      <input 
                        type="file" multiple accept="image/*" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
                        id="file-upload" onChange={handleImageUpload} disabled={formData.images.length >= 10 || isUploadingImages}
                      />
                      <label className="inline-block bg-white border border-slate-200 text-slate-700 px-6 py-2 rounded-full text-sm font-semibold pointer-events-none">
                        {formData.images.length >= 10 ? "Max Reached" : "Browse Files"}
                      </label>
                    </>
                  )}
                </div>
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {formData.images.map((url, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
                        <img src={url} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeImage(idx)} className="absolute top-2 right-2 w-6 h-6 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!isLoginMode && (
            <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <button type="button" onClick={handlePrevStep} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold px-4 py-2 transition-colors">
                  <ArrowLeft size={18} /> Back
                </button>
              ) : <div></div>}

              {currentStep < 5 ? (
                <button type="button" onClick={handleNextStep} className="bg-slate-900 text-white hover:bg-slate-800 px-8 py-3.5 rounded-xl font-bold transition-all shadow-md flex items-center gap-2">
                  Continue <ArrowRight size={18} />
                </button>
              ) : (
                <button type="submit" className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2">
                  Submit Application <Check size={18} />
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
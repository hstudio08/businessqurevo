"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ShieldCheck, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase'; // Ensure this path matches your project structure

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtpInput, setUserOtpInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      // 1. REAL FIREBASE DB CHECK
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErrorMsg("No account found with this email. Please register first.");
        setIsLoading(false);
        return;
      }

      // 2. SEND OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      const time = new Date(new Date().getTime() + 15 * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, 
        { to_email: email, passcode: otp, time: time }
      );
      
      setOtpSent(true);
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMsg("Failed to verify account or send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (userOtpInput === generatedOtp) {
      setIsLoading(true);
      
      try {
        // 1. Fetch the user's business application to construct their unique dashboard URL
        const q = query(
          collection(db, "business_applications"), 
          where("email", "==", email.toLowerCase())
        );
        const querySnapshot = await getDocs(q);

        let targetRoute = '/register'; // Fallback if they somehow don't have an application

        if (!querySnapshot.empty) {
          const bizData = querySnapshot.docs[0].data();
          
          // Helper function to safely convert strings into URL-friendly slugs
          const slugify = (text?: string) => {
            if (!text) return '';
            return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
          };

          // Generate the dynamic path parts (using the same fallbacks as the dashboard)
          const stateSlug = slugify(bizData.state) || 'india';
          const citySlug = slugify(bizData.city) || 'local';
          const bizSlug = slugify(bizData.businessName) || 'business';

          // Construct the final Option 1 Route
          targetRoute = `/${stateSlug}/${citySlug}/${bizSlug}/dashboard`;
        }

        // 2. Create session and execute dynamic routing
        localStorage.setItem('qurevo_session', email.toLowerCase());
        router.push(targetRoute);

      } catch (error) {
        console.error("Error fetching business for routing:", error);
        setErrorMsg("Failed to generate your secure workspace link. Please try again.");
        setIsLoading(false);
      }
    } else {
      setErrorMsg("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#06110a] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Glassmorphism Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-hunter_green/20 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-lime_cream/10 rounded-full blur-[150px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <div className="w-12 h-12 mx-auto bg-gradient-to-tr from-[#ECF39E] to-[#90A955] rounded-br-xl rounded-tl-xl flex items-center justify-center shadow-[0_0_20px_rgba(236,243,158,0.4)]"></div>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-400">Sign in to your Qurevo business dashboard</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm text-center">
            {errorMsg}
          </div>
        )}

        <AnimatePresence mode="wait">
          {!otpSent ? (
            <motion.form key="email-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#ECF39E]/50"
                    placeholder="hello@business.com"
                  />
                </div>
              </div>
              <button type="submit" disabled={isLoading || !email} className="w-full bg-[#ECF39E] text-[#132A13] hover:bg-[#d8e08d] py-3.5 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Send OTP"}
              </button>
            </motion.form>
          ) : (
            <motion.form key="otp-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 text-center">Enter 6-digit code sent to {email}</label>
                <input 
                  type="text" required maxLength={6} value={userOtpInput} onChange={(e) => setUserOtpInput(e.target.value)}
                  className="w-full bg-black/40 border border-[#ECF39E]/50 rounded-xl px-4 py-4 text-white text-center tracking-[0.5em] font-bold focus:outline-none text-2xl"
                  placeholder="••••••"
                  autoFocus
                />
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-[#ECF39E] text-[#132A13] hover:bg-[#d8e08d] py-3.5 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <>Verify & Login <ArrowRight size={18} /></>}
              </button>
              <button type="button" onClick={() => setOtpSent(false)} disabled={isLoading} className="w-full text-sm text-gray-400 hover:text-white flex items-center justify-center gap-1 transition-colors disabled:opacity-50">
                <ArrowLeft size={14} /> Back to email
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
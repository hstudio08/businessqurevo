// src/app/admin/login/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../../lib/firebase'; // Adjust path if necessary

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      // 1. Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Double-check that this is actually the Admin Email configured in .env
      if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        await signOut(auth); // Sign them back out if they aren't the admin
        setErrorMsg("Access denied. Unauthorized account.");
        return;
      }

      // Success, route to admin panel
      router.push('/admin');
    } catch (error: any) {
      console.error(error);
      setErrorMsg("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-lime_cream mb-2">Qurevo Admin</h1>
          <p className="text-sm text-slate-400">Secure Access Portal</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Admin Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-lime_cream"
                placeholder="admin@qurevo.in"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-lime_cream"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-lime_cream text-slate-900 hover:bg-[#d8e08d] py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Secure Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
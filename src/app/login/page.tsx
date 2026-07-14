// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Lock, Mail } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#FAFAFA] px-6">
      <div className="w-full max-w-md bg-white p-10 rounded-[2rem] shadow-premium border border-palm_leaf-900/20">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-evergreen mb-2">Welcome Back</h1>
          <p className="text-hunter_green font-medium">Log in to your business dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold">{error}</div>}
          
          <div>
            <label className="block text-sm font-bold text-evergreen mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-palm_leaf" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-5 py-4 rounded-xl border border-palm_leaf-900/50 bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-fern transition-all" 
                placeholder="owner@business.com" 
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-bold text-evergreen">Password</label>
              <Link href="/forgot-password" className="text-sm font-semibold text-fern hover:text-evergreen">Forgot?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-palm_leaf" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-5 py-4 rounded-xl border border-palm_leaf-900/50 bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-fern transition-all" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-evergreen text-lime_cream rounded-xl font-bold hover:bg-hunter_green transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"} {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-hunter_green font-medium">
          Don't have a business page? <Link href="/register" className="text-evergreen font-bold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}
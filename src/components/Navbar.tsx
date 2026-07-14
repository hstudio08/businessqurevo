// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Rocket } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  // Hide Navbar on the dynamic public business pages and admin panel
  const isPublicBusinessPage = pathname.split('/').length >= 4;
  const isAdminPage = pathname.startsWith('/admin');
  
  if (isPublicBusinessPage || isAdminPage) return null;

  return (
    <nav className="sticky top-0 w-full z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-palm_leaf-900/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-evergreen flex items-center gap-2">
          <div className="w-8 h-8 bg-evergreen rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-lime_cream rounded-sm"></div>
          </div>
          Qurevo <span className="font-medium text-fern">Businesses</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-hunter_green">
          <Link href="/#features" className="hover:text-evergreen transition-colors">Features</Link>
          <Link href="/#pricing" className="hover:text-evergreen transition-colors">Pricing</Link>
          <Link href="/#faq" className="hover:text-evergreen transition-colors">FAQ</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-evergreen hover:bg-lime_cream-900/50 rounded-full transition-colors"
          >
            <LogIn size={16} /> Login
          </Link>
          <Link 
            href="/register" 
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold bg-evergreen text-lime_cream rounded-full hover:bg-hunter_green transition-all shadow-md hover:shadow-lg"
          >
            Register <Rocket size={16} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#06110a] pt-20 pb-10 overflow-hidden border-t border-white/10 z-10">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-lime_cream/5 blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-4">
            {/* CSS Leaf Logo */}
            <Link href="/" className="flex items-center gap-2 group w-fit mb-6">
              <div className="w-8 h-8 bg-gradient-to-tr from-lime_cream to-fern rounded-br-xl rounded-tl-xl flex items-center justify-center shadow-[0_0_15px_rgba(236,243,158,0.3)] group-hover:shadow-[0_0_25px_rgba(236,243,158,0.6)] transition-all duration-300"></div>
              <span className="text-2xl font-bold tracking-tight text-white">
                QUREVO <span className="text-lime_cream font-medium">Businesses</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-8 max-w-sm">
              Qurevo Businesses is a managed digital presence platform helping local businesses establish a professional online identity without the complexity of building or maintaining a website[cite: 1].
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {[Mail, Phone, MapPin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-lime_cream/10 hover:text-lime_cream hover:border-lime_cream/30 transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-white text-sm font-bold tracking-wider uppercase mb-6">Platform</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-lime_cream transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-0 h-[1px] bg-lime_cream group-hover:w-3 transition-all duration-300"></span> Home
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-gray-400 hover:text-lime_cream transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-0 h-[1px] bg-lime_cream group-hover:w-3 transition-all duration-300"></span> How It Works
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-gray-400 hover:text-lime_cream transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-0 h-[1px] bg-lime_cream group-hover:w-3 transition-all duration-300"></span> Pricing
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-lime_cream font-medium hover:text-[#d8e08d] transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-0 h-[1px] bg-[#d8e08d] group-hover:w-3 transition-all duration-300"></span> Register Business
                </Link>
              </li>
            </ul>
          </div>

          {/* Dashboards & Portals */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-sm font-bold tracking-wider uppercase mb-6">Portals</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/login" className="text-gray-400 hover:text-lime_cream transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-0 h-[1px] bg-lime_cream group-hover:w-3 transition-all duration-300"></span> Business Login[cite: 1]
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-lime_cream transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-0 h-[1px] bg-lime_cream group-hover:w-3 transition-all duration-300"></span> Admin Dashboard[cite: 1]
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-lime_cream transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-0 h-[1px] bg-lime_cream group-hover:w-3 transition-all duration-300"></span> Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h3 className="text-white text-sm font-bold tracking-wider uppercase mb-6">Get in Touch</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail size={18} className="text-lime_cream shrink-0 mt-0.5" />
                <a href="mailto:hello@qurevo.in" className="hover:text-white transition-colors">hello@qurevo.in</a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Phone size={18} className="text-lime_cream shrink-0 mt-0.5" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={18} className="text-lime_cream shrink-0 mt-0.5" />
                <span>Available remotely for businesses across India</span>
              </li>
            </ul>
            
            {/* Mini Call to Action */}
            <Link href="/register" className="mt-6 inline-flex items-center justify-between w-full p-1 pl-4 rounded-full bg-white/5 border border-white/10 hover:border-lime_cream/50 transition-all duration-300 group">
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">Start for ₹1,999/yr[cite: 1]</span>
              <div className="w-8 h-8 rounded-full bg-lime_cream text-evergreen flex items-center justify-center shadow-[0_0_15px_rgba(236,243,158,0.3)]">
                <ArrowRight size={16} />
              </div>
            </Link>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Qurevo Businesses. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-white transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
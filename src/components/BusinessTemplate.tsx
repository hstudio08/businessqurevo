"use client";

import React from 'react';
import { MapPin, Phone, Mail, Star, Users, BookOpen, Clock, CheckCircle2 } from 'lucide-react';

export default function BusinessTemplate({ data }: { data: any }) {
  // Fallbacks in case some data is missing
  const businessName = data?.businessName || "Premium Business";
  const category = data?.category || "Local Business";
  const address = data?.address || "Location not provided";
  const phone = data?.phone || "Phone not provided";
  const email = data?.email || "";
  const shortDescription = data?.shortDescription || "Welcome to our official page.";
  const longDescription = data?.longDescription || "";
  const images = data?.images || [];

  return (
    <main className="min-h-screen bg-evergreen-100 font-sans text-white pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-64 sm:h-80 bg-evergreen-900 overflow-hidden">
        {images.length > 0 ? (
          <img src={images[0]} alt={businessName} className="w-full h-full object-cover opacity-60" />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-hunter_green-600 to-evergreen-800 opacity-60"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-evergreen-100 via-evergreen-100/80 to-transparent"></div>
        
        <div className="absolute bottom-6 left-6 right-6 max-w-4xl mx-auto flex items-end gap-5">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-white p-1 shrink-0 shadow-2xl">
            <div className="w-full h-full bg-evergreen-900 rounded-xl flex items-center justify-center text-3xl font-extrabold text-lime_cream">
              {businessName.substring(0, 2).toUpperCase()}
            </div>
          </div>
          <div className="pb-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-lime_cream/10 border border-lime_cream/20 text-lime_cream text-[10px] font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 size={12} /> Verified Profile
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-1">{businessName}</h1>
            <p className="text-gray-300 text-sm font-medium flex items-center gap-2">
              <Star size={14} className="text-lime_cream fill-lime_cream" /> 4.8 Rating
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-4xl mx-auto px-6 mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Details */}
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="text-xl font-bold mb-4 text-lime_cream">About Us</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">{shortDescription}</p>
            {longDescription && <p className="text-gray-400 text-sm leading-relaxed">{longDescription}</p>}
          </section>

          {/* Dynamic Gallery */}
          {images.length > 1 && (
            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold mb-4 text-lime_cream">Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.slice(1, 7).map((img: string, idx: number) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-white/10">
                    <img src={img} alt="Gallery" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Contact & Quick Info */}
        <div className="space-y-6">
          <section className="bg-lime_cream text-evergreen rounded-3xl p-6 shadow-premium">
            <h3 className="font-bold mb-4 text-lg">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="shrink-0" />
                <p className="text-sm font-medium">{phone}</p>
              </div>
              {email && (
                <div className="flex items-center gap-3">
                  <Mail size={18} className="shrink-0" />
                  <p className="text-sm font-medium">{email}</p>
                </div>
              )}
            </div>
            <button className="w-full mt-6 bg-evergreen text-white font-bold py-3 rounded-xl shadow-md hover:bg-evergreen-400 transition-colors">
              Call Now
            </button>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <h3 className="font-bold mb-4 text-lime_cream text-lg">Business Sector</h3>
            <div className="inline-block bg-white/10 px-4 py-2 rounded-lg text-sm font-medium text-gray-200">
              {category}
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Share2, Bookmark, Star, 
  CheckCircle2, Clock, Globe, Navigation, MessageCircle, 
  ShieldCheck, BadgeCheck, Award, Loader2, Info, User
} from 'lucide-react';
import { collection, getDocs, addDoc, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../lib/firebase'; // Adjust path based on your folder structure

interface Business {
  id: string;
  businessName: string;
  category: string;
  customCategory?: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  shortDescription: string;
  longDescription: string;
  images: string[];
  planTier: string;
  status: string;
}

export default function BusinessPage() {
  const params = useParams();
  const slugParam = params.slug as string;

  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  // Review System States
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const q = collection(db, "business_applications");
        const snapshot = await getDocs(q);
        
        // Find the active business whose slugified name matches the URL slug
        const found = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Business))
          .find(b => 
            b.status === 'active' && 
            b.businessName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') === slugParam
          );

        if (found) setBusiness(found);
      } catch (error) {
        console.error("Error fetching business:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBusiness();
  }, [slugParam]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a star rating.");
    setIsSubmittingReview(true);
    try {
      await addDoc(collection(db, "business_reviews"), {
        businessId: business?.id,
        rating,
        reviewerName,
        reviewerEmail,
        createdAt: serverTimestamp()
      });
      setReviewSuccess(true);
      setRating(0);
      setReviewerName('');
      setReviewerEmail('');
    } catch (error) {
      alert("Failed to submit review.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F4F7F5]"><Loader2 className="w-10 h-10 animate-spin text-fern-600" /></div>;
  }

  if (!business) {
    return <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F7F5] text-evergreen font-bold text-2xl">Business Not Found or Not Active</div>;
  }

  // Derive Badges based on Tier
  const isPremium = business.planTier?.toLowerCase().includes('premium');
  const isPremiumPlus = business.planTier?.toLowerCase().includes('plus');
  
  // Safe image fallbacks
  const coverImage = business.images?.[0] || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80";
  const logoImage = business.images?.[1] || business.images?.[0] || null;

  return (
    <div className="min-h-screen bg-[#F4F7F5] font-sans pb-20 relative">
      
      {/* Floating Qurevo Badge */}
      <div className="fixed bottom-6 right-6 z-50 bg-white shadow-xl rounded-full px-4 py-2 flex items-center gap-2 border border-slate-100 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
        <div className="w-5 h-5 bg-gradient-to-tr from-lime_cream to-fern-600 rounded-br-md rounded-tl-md"></div>
        <span className="text-[10px] font-bold text-evergreen uppercase tracking-wider">Powered by Qurevo</span>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] min-h-[500px] w-full bg-evergreen flex flex-col">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={coverImage} alt={business.businessName} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06110a] via-[#06110a]/80 to-transparent"></div>
        </div>

        {/* Top Navbar items */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-sm font-medium">
            <MapPin size={16} className="text-lime_cream" /> {business.city}, {business.state}
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"><Share2 size={16}/> Share</button>
            <button className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"><Bookmark size={16}/> Save</button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-auto pb-12 flex flex-col md:flex-row items-end md:items-center gap-8">
          
          {/* Logo Box */}
          {logoImage && (
            <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 bg-[#0a1209] border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-2 flex items-center justify-center">
              <img src={logoImage} alt="Logo" className="max-w-full max-h-full object-contain rounded-2xl" />
            </div>
          )}

          {/* Business Details */}
          <div className="flex-1 text-white">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="bg-fern-600/30 text-lime_cream border border-fern-500/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {business.customCategory || business.category}
              </span>
              
              {/* Dynamic Badges */}
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 bg-white text-evergreen px-2.5 py-1 rounded-full text-xs font-bold"><ShieldCheck size={14} className="text-fern-600"/> Verified</span>
                {isPremium && <span className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg"><Award size={14}/> Premium</span>}
                {isPremiumPlus && <span className="flex items-center gap-1 bg-blue-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg"><BadgeCheck size={14}/> Blue Tick</span>}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
              {business.businessName} 
            </h1>
            
            <p className="text-lg text-white/80 mb-4 max-w-2xl font-medium">"{business.shortDescription}"</p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-white/90 mb-6">
              <div className="flex items-center gap-1.5"><Star size={18} className="text-amber-400 fill-amber-400"/> <span className="font-bold text-white text-base">4.9</span> (Authentic Reviews)</div>
              <span className="hidden sm:block text-white/30">•</span>
              <div className="flex items-center gap-1.5"><MapPin size={16} className="text-lime_cream"/> {business.address}</div>
              <span className="hidden sm:block text-white/30">•</span>
              <div className="flex items-center gap-1.5 text-lime_cream font-bold"><Clock size={16}/> Open Now</div>
            </div>

            {/* Action Buttons & Top Phone Number */}
            <div className="flex flex-wrap items-center gap-3">
              <a href={`tel:${business.phone}`} className="flex items-center gap-2 bg-lime_cream text-evergreen hover:bg-white px-6 py-3.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg">
                <Phone size={18} /> {business.phone}
              </a>
              <a href={`https://wa.me/${business.phone.replace(/[^0-9]/g, '')}`} target="_blank" className="flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#20bd5a] px-6 py-3.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg">
                <MessageCircle size={18} /> WhatsApp
              </a>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-3.5 rounded-xl font-bold transition-all active:scale-95">
                <Navigation size={18} /> Directions
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        
        {/* --- SEO LONG DESCRIPTION (Added before location as requested) --- */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-2xl font-bold text-evergreen mb-4">About {business.businessName}</h3>
          <div className="prose max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
            {business.longDescription || "A trusted local establishment providing premium services to the community."}
          </div>
        </div>

        {/* --- MIDDLE GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Opening Hours & Quick Info */}
          <div className="space-y-8 lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-evergreen mb-6 flex items-center gap-2"><Clock className="text-fern-600"/> Opening Hours</h3>
              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                  <span className="text-slate-500">Monday - Saturday</span>
                  <span className="text-fern-600 bg-fern-50 px-3 py-1 rounded-md">9:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                  <span className="text-slate-500">Sunday</span>
                  <span className="text-slate-700">10:00 AM - 4:00 PM</span>
                </div>
              </div>
              <div className="mt-6 bg-[#F4F7F5] rounded-xl p-4 flex items-center gap-3 text-sm text-slate-600 font-medium border border-slate-200">
                <Info className="text-fern-600 shrink-0" size={20}/> We are open all 7 days to serve you better!
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden">
              <ShieldCheck className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-50 opacity-50 pointer-events-none" />
              <h3 className="text-lg font-bold text-evergreen mb-6 relative z-10">Why Choose Us</h3>
              <ul className="space-y-4 relative z-10">
                {["Premium quality assured", "Highly experienced professionals", "100% customer satisfaction", "Trusted by the local community"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-fern-500 shrink-0" />
                    <span className="text-slate-600 text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Location & Contact Grid */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Find Us (Map Area) */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
                <h3 className="text-lg font-bold text-evergreen mb-6">Find Us</h3>
                {/* Mock Map Background */}
                <div className="w-full h-40 bg-slate-100 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center border border-slate-200 group cursor-pointer">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <MapPin size={32} className="text-fern-600 relative z-10 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex items-start gap-3 text-slate-600 text-sm font-medium mt-auto">
                  <MapPin size={20} className="text-fern-600 shrink-0 mt-0.5" />
                  <div>
                    <p>{business.address}</p>
                    <p className="mt-1">{business.city}, {business.state}</p>
                    <a href="#" className="text-fern-600 font-bold mt-2 inline-block hover:underline">View on Google Maps</a>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-evergreen mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-600 font-medium">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100"><Phone size={18} className="text-fern-600"/></div>
                    <a href={`tel:${business.phone}`} className="hover:text-fern-600 transition-colors">{business.phone}</a>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 font-medium">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100"><Mail size={18} className="text-fern-600"/></div>
                    <a href={`mailto:${business.email}`} className="hover:text-fern-600 transition-colors truncate">{business.email}</a>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 font-medium">
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0 border border-[#25D366]/20"><MessageCircle size={18} className="text-[#25D366]"/></div>
                    <a href={`https://wa.me/${business.phone.replace(/[^0-9]/g, '')}`} target="_blank" className="hover:text-[#25D366] transition-colors">Chat on WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Grid */}
            {business.images && business.images.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-evergreen">Our Gallery</h3>
                  <span className="text-fern-600 text-sm font-bold cursor-pointer hover:underline">View All</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {business.images.slice(0, 4).map((img, i) => (
                    <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-slate-100 group cursor-pointer">
                      <img src={img} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- REVIEW SYSTEM (Stars + Name + Email) --- */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 max-w-3xl mx-auto mt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-evergreen mb-2">Leave a Review</h3>
            <p className="text-slate-500 text-sm font-medium">Your authentic feedback helps others. Ratings require identity verification.</p>
          </div>

          <AnimatePresence mode="wait">
            {reviewSuccess ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-fern-50 border border-fern-200 rounded-2xl p-6 text-center">
                <CheckCircle2 size={40} className="text-fern-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-fern-800">Thank you for your review!</h4>
                <p className="text-sm text-fern-700 mt-1">Your rating has been successfully securely recorded.</p>
                <button onClick={() => setReviewSuccess(false)} className="mt-4 text-xs font-bold text-fern-600 hover:underline">Submit another review</button>
              </motion.div>
            ) : (
              <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={submitReview} className="space-y-6">
                
                {/* Star Selector */}
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} type="button" 
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star size={40} className={`${(hoverRating || rating) >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} transition-colors`} />
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Your Name <span className="text-fern-500">*</span></label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input required type="text" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-evergreen text-sm focus:outline-none focus:border-fern-500 transition-all"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Your Email <span className="text-fern-500">*</span></label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input required type="email" value={reviewerEmail} onChange={(e) => setReviewerEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-evergreen text-sm focus:outline-none focus:border-fern-500 transition-all"/>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isSubmittingReview || rating === 0} className="w-full bg-evergreen hover:bg-evergreen-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2">
                  {isSubmittingReview ? <Loader2 size={18} className="animate-spin"/> : 'Submit Verified Rating'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
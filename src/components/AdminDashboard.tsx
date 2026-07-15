"use client";

import React, { useState, useEffect } from 'react';
import { 
  Building2, FileText, CheckCircle, XCircle, Eye, Calendar, 
  ShieldCheck, LogOut, Clock, Search, Loader2, ArrowLeft, 
  Copy, User, MapPin, Trash2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface BusinessData {
  id: string;
  fullName?: string;
  role?: string;
  phone: string;
  email: string;
  address?: string;
  businessName: string;
  category: string;
  customCategory?: string;
  shortDescription?: string;
  longDescription?: string;
  planTier?: string;
  planCycle?: string;
  images: string[];
  status: 'pending' | 'active' | 'rejected';
  rejectionReason?: string;
  startDate?: string;
  expiryDate?: string;
  // Legacy
  pricingPlan?: string; 
  packageType?: string;
}

const COLLECTION_NAME = "business_applications";

const PRESET_REASONS = [
  "Incomplete business details or description provided.",
  "Low-quality, ambiguous, or irrelevant brand assets/images.",
  "Suspected fraudulent activity or unauthorized brand impersonation.",
  "Non-compliance with local commercial licensing guidelines.",
  "Duplicate business registry listing detected.",
  "Business domain / industry sector violates platform policies.",
  "Payment cycle verification failed or subscription lapsed."
];

export default function AdminDashboard() {
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<'applications' | 'active-businesses' | 'bin'>('applications');
  const [selectedApp, setSelectedApp] = useState<BusinessData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  const [pendingApplications, setPendingApplications] = useState<BusinessData[]>([]);
  const [activeBusinesses, setActiveBusinesses] = useState<BusinessData[]>([]);
  const [rejectedBin, setRejectedBin] = useState<BusinessData[]>([]);
  
  const [activationResult, setActivationResult] = useState<{days: number, start: string, end: string, price: string} | null>(null);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  useEffect(() => {
    fetchBusinessData();
  }, []);

  const fetchBusinessData = async () => {
    setIsLoadingData(true);
    try {
      const businessesRef = collection(db, COLLECTION_NAME);
      const allSnapshot = await getDocs(businessesRef);
      const allData = allSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BusinessData));
      
      setPendingApplications(allData.filter(item => !item.status || item.status === 'pending'));
      setActiveBusinesses(allData.filter(item => item.status === 'active'));
      setRejectedBin(allData.filter(item => item.status === 'rejected'));
    } catch (error) {
      alert("Failed to load secure context data.");
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('qurevo_session');
      router.push('/admin/login');
    } catch (error) {
      console.error(error);
    }
  };

  // Dynamic Pricing Calculator
  const getPlanDetails = (tier?: string, cycle?: string, legacyPlan?: string) => {
    // Legacy fallback check
    if (!tier && legacyPlan) {
      const p = legacyPlan.toLowerCase();
      if (p.includes('annual') || p.includes('year')) return { days: 365, price: '₹1,999 Total', label: 'Legacy Annual Plan' };
      if (p.includes('quarter')) return { days: 90, price: '₹749 Total', label: 'Legacy Quarterly Plan' };
      return { days: 30, price: '₹299 Total', label: 'Legacy Monthly Plan' };
    }

    const t = (tier || 'Premium').toLowerCase();
    const c = (cycle || 'Yearly').toLowerCase();

    let days = 365, months = 12, cycleName = 'Yearly';
    if (c === 'monthly') { days = 30; months = 1; cycleName = '1 Month'; }
    else if (c === 'quarterly') { days = 90; months = 3; cycleName = '3 Months'; }
    else if (c === 'half-yearly') { days = 180; months = 6; cycleName = '6 Months'; }

    let basePrice = 299, tierName = 'Premium';
    if (t === 'starter') { basePrice = 239; tierName = 'Starter'; }
    else if (t === 'premium plus' || t === 'premium_plus') { basePrice = 379; tierName = 'Premium Plus'; }

    return {
      days,
      price: `₹${basePrice * months} Total (₹${basePrice}/mo)`,
      label: `${tierName} - ${cycleName}`
    };
  };

  const calculateSubscription = () => {
    if (!selectedApp) return;
    const planDetails = getPlanDetails(selectedApp.planTier, selectedApp.planCycle, selectedApp.pricingPlan || selectedApp.packageType);
    
    const today = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(today.getDate() + planDetails.days);

    setActivationResult({
      days: planDetails.days,
      start: today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      end: expiryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      price: planDetails.price
    });
  };

  const handleApprove = async () => {
    if (!selectedApp || !activationResult) return alert("Calculate term structural parameters first.");
    try {
      const appRef = doc(db, COLLECTION_NAME, selectedApp.id);
      await updateDoc(appRef, {
        status: 'active',
        startDate: activationResult.start,
        expiryDate: activationResult.end,
        rejectionReason: "" 
      });
      alert("Business successfully live and deployed.");
      setSelectedApp(null);
      setActivationResult(null);
      fetchBusinessData(); 
    } catch (error) {
      alert("Failure mapping cloud database parameters.");
    }
  };

  const initiateRejection = () => {
    setSelectedReason('');
    setCustomReason('');
    setShowRejectModal(true);
  };

  const handleFinalReject = async () => {
    const finalReason = selectedReason === 'Custom' ? customReason : selectedReason;
    if (!finalReason.trim()) return alert("A valid rejection classification context must be supplied.");

    try {
      const appRef = doc(db, COLLECTION_NAME, selectedApp!.id);
      await updateDoc(appRef, { 
        status: 'rejected',
        rejectionReason: finalReason
      });
      alert("Business successfully restricted and pushed to the Rejection Bin.");
      setShowRejectModal(false);
      setSelectedApp(null);
      fetchBusinessData();
    } catch (error) {
      alert("Cloud database validation adjustment failed.");
    }
  };

  const copyShopUrl = () => {
    if (!selectedApp) return;
    const slug = selectedApp.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const url = `${window.location.origin}/india/local/${slug}`;
    navigator.clipboard.writeText(url);
    alert(`Copied: ${url}`);
  };

  return (
    <div className="min-h-screen bg-[#06110a] text-gray-100 flex font-sans">
      
      <aside className="w-64 border-r border-white/10 bg-black/20 backdrop-blur-md flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-white/5">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#ECF39E] to-[#90A955] rounded-br-md rounded-tl-md"></div>
            <div>
              <h2 className="font-bold tracking-wide text-white">Qurevo</h2>
              <span className="text-[10px] uppercase text-[#ECF39E] font-semibold tracking-wider">Admin System</span>
            </div>
          </div>
          <nav className="space-y-2">
            <button onClick={() => { setActiveTab('applications'); setSelectedApp(null); setActivationResult(null); }} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'applications' ? 'bg-[#ECF39E] text-[#132A13] shadow-md font-bold' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}>
              <div className="flex items-center gap-3"><FileText size={18} /> Inbox</div>
              <span className="bg-white/10 text-white px-2 py-0.5 rounded text-xs">{pendingApplications.length}</span>
            </button>
            <button onClick={() => { setActiveTab('active-businesses'); setSelectedApp(null); setActivationResult(null); }} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'active-businesses' ? 'bg-[#ECF39E] text-[#132A13] shadow-md font-bold' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}>
              <div className="flex items-center gap-3"><Building2 size={18} /> Active</div>
              <span className="bg-white/10 text-white px-2 py-0.5 rounded text-xs">{activeBusinesses.length}</span>
            </button>
            <button onClick={() => { setActiveTab('bin'); setSelectedApp(null); setActivationResult(null); }} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'bin' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}>
              <div className="flex items-center gap-3"><Trash2 size={18} /> Rejection Bin</div>
              <span className="bg-red-500/30 text-red-200 px-2 py-0.5 rounded text-xs">{rejectedBin.length}</span>
            </button>
          </nav>
        </div>
        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 text-sm font-semibold rounded-xl hover:bg-red-500/20 transition-colors">
          <LogOut size={16} /> Sign Out Session
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight capitalize">{activeTab.replace('-', ' ')} Feed View</h1>
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="text" placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#ECF39E]/50" />
          </div>
        </div>

        {isLoadingData ? (
           <div className="flex justify-center py-24"><Loader2 size={40} className="animate-spin text-[#ECF39E]" /></div>
        ) : selectedApp ? (
          
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => { setSelectedApp(null); setActivationResult(null); }} className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5"><ArrowLeft size={14} /> Close Preview</button>
              {selectedApp.status === 'active' && <button onClick={copyShopUrl} className="bg-white/10 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 text-white"><Copy size={14} /> Copy Live URL</button>}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full border bg-white/5 text-[#ECF39E] border-white/10">{selectedApp.category}</span>
                  <h2 className="text-3xl font-bold text-white mt-3">{selectedApp.businessName}</h2>
                  <p className="text-sm text-gray-400 mt-2 flex items-center gap-2"><MapPin size={16} className="text-emerald-500"/> {selectedApp.address || "No structural local address provided."}</p>
                </div>

                {selectedApp.status === 'rejected' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
                    <strong>Reason for Rejection:</strong> {selectedApp.rejectionReason || "No descriptive rationale attached."}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/30 border border-white/5 rounded-2xl p-5 text-sm space-y-2">
                    <h4 className="font-bold border-b border-white/5 pb-2 flex items-center gap-2"><User size={16}/> Owner Matrix</h4>
                    <p><span className="text-gray-500">Name:</span> {selectedApp.fullName || 'N/A'}</p>
                    <p><span className="text-gray-500">Role:</span> {selectedApp.role || 'N/A'}</p>
                    <p><span className="text-gray-500">Email:</span> {selectedApp.email}</p>
                    <p><span className="text-gray-500">Phone:</span> {selectedApp.phone}</p>
                  </div>
                  <div className="bg-black/30 border border-white/5 rounded-2xl p-5 text-sm space-y-2">
                    <h4 className="font-bold border-b border-white/5 pb-2">Plan Details</h4>
                    <p><span className="text-gray-500">Configuration:</span> {getPlanDetails(selectedApp.planTier, selectedApp.planCycle, selectedApp.pricingPlan || selectedApp.packageType).label}</p>
                    <p><span className="text-gray-500">Revenue:</span> <span className="text-[#ECF39E] font-medium">{getPlanDetails(selectedApp.planTier, selectedApp.planCycle, selectedApp.pricingPlan || selectedApp.packageType).price}</span></p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Punchline Definition</h4>
                  <p className="text-gray-300 text-sm bg-black/10 p-4 rounded-xl italic">"{selectedApp.shortDescription || "Blank structural configuration."}"</p>
                </div>

                {selectedApp.longDescription && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Structural Deep Profile Documentation</h4>
                    <p className="text-gray-400 text-sm bg-black/10 p-4 rounded-xl whitespace-pre-wrap leading-relaxed">{selectedApp.longDescription}</p>
                  </div>
                )}

                {selectedApp.status !== 'active' && (
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                    <button onClick={calculateSubscription} className="bg-[#ECF39E] text-[#132A13] text-xs font-bold px-4 py-2 rounded-xl transition-all">Calculate Term Framework</button>
                    {activationResult && (
                      <div className="p-4 bg-black/40 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                        <div><span className="text-gray-500 block">Term</span><strong className="text-[#ECF39E]">{activationResult.days} Days</strong></div>
                        <div><span className="text-gray-500 block">Pricing</span><strong className="text-white">{activationResult.price}</strong></div>
                        <div><span className="text-gray-500 block">Start</span><strong className="text-white">{activationResult.start}</strong></div>
                        <div><span className="text-gray-500 block">Expiration</span><strong className="text-red-400">{activationResult.end}</strong></div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  {selectedApp.status !== 'active' && (
                    <button onClick={handleApprove} disabled={!activationResult} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl disabled:opacity-50 transition-colors flex items-center justify-center gap-2"><CheckCircle size={18} /> {selectedApp.status === 'rejected' ? 'Re-Approve & Restore' : 'Approve & Publish'}</button>
                  )}
                  <button onClick={initiateRejection} className="flex-1 bg-red-600/20 text-red-400 border border-red-500/30 font-bold py-3 rounded-xl hover:bg-red-600/30 transition-colors flex items-center justify-center gap-2"><XCircle size={18} /> Reject / Revoke Operational License</button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-3">Brand Graphical Assets</h4>
                <div className="space-y-4">
                  {selectedApp.images?.map((img, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black shadow-inner"><img src={img} className="w-full h-full object-cover" alt="" /></div>
                  )) || <div className="p-8 text-center bg-white/5 rounded-2xl text-gray-500 text-sm">No assets mapped.</div>}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-white/5 text-sm font-semibold text-white tracking-wide flex items-center gap-2">
              <Clock size={16} /> Dynamic Directory Register
            </div>
            <div className="divide-y divide-white/5">
              {((activeTab === 'applications' ? pendingApplications : activeTab === 'active-businesses' ? activeBusinesses : rejectedBin)).filter(app => app.businessName?.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                <div className="p-12 text-center text-gray-500 text-sm">No structured records mapped within this node parameter.</div>
              ) : (
                ((activeTab === 'applications' ? pendingApplications : activeTab === 'active-businesses' ? activeBusinesses : rejectedBin)).filter(app => app.businessName?.toLowerCase().includes(searchTerm.toLowerCase())).map((app) => (
                  <div key={app.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl overflow-hidden border border-white/10 shrink-0">{app.images?.[0] && <img src={app.images[0]} className="w-full h-full object-cover" alt="" />}</div>
                      <div>
                        <h3 className="font-bold text-white text-base">{app.businessName}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{app.category} • Requested: {getPlanDetails(app.planTier, app.planCycle, app.pricingPlan || app.packageType).label}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedApp(app)} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"><Eye size={14} /> Open Review File</button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg text-slate-100 shadow-2xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Specify Rationale for Rejection</h3>
              <p className="text-slate-400 text-xs mt-1">Select one of the predefined rules or enter a custom text rationale context.</p>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {PRESET_REASONS.map((reason, i) => (
                <label key={i} className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${selectedReason === reason ? 'border-[#ECF39E] bg-white/5 text-white' : 'border-slate-800 bg-black/20 text-slate-400 hover:border-slate-700'}`}>
                  <input type="radio" name="rejectReason" checked={selectedReason === reason} onChange={() => setSelectedReason(reason)} className="mt-0.5 accent-[#ECF39E]" />
                  <span>{reason}</span>
                </label>
              ))}
              <label className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${selectedReason === 'Custom' ? 'border-[#ECF39E] bg-white/5 text-white' : 'border-slate-800 bg-black/20 text-slate-400 hover:border-slate-700'}`}>
                <input type="radio" name="rejectReason" checked={selectedReason === 'Custom'} onChange={() => setSelectedReason('Custom')} className="mt-0.5 accent-[#ECF39E]" />
                <span>Add Custom Structured Reason...</span>
              </label>
            </div>

            {selectedReason === 'Custom' && (
              <textarea rows={3} placeholder="Provide unique corporate rejection logs here..." value={customReason} onChange={(e) => setCustomReason(e.target.value)} className="w-full bg-black border border-slate-800 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-[#ECF39E]" />
            )}

            <div className="flex items-center gap-3 pt-2">
              <button onClick={handleFinalReject} className="flex-1 bg-red-600 hover:bg-red-500 font-bold py-3 text-xs rounded-xl transition-colors">Commit Rejection Log</button>
              <button onClick={() => setShowRejectModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 font-medium py-3 text-xs rounded-xl transition-colors">Abort</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
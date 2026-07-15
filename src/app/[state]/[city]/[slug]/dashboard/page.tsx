"use client";

import { useEffect, useState } from "react";
import { db } from "../../../../../lib/firebase"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter, useParams } from "next/navigation";
import { Clock, XCircle, ExternalLink, Calendar, LogOut, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";

export default function NestedBusinessDashboard() {
  const router = useRouter();
  const params = useParams();
  
  // Extracts the specific dynamic path parameters from the current URL routing structure
  const urlSlug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState<any>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const sessionEmail = localStorage.getItem('qurevo_session');
      
      if (!sessionEmail) {
        router.push("/login");
        return;
      }

      try {
        const q = query(
          collection(db, "business_applications"), 
          where("email", "==", sessionEmail.toLowerCase())
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const fetchedData = querySnapshot.docs[0].data();
          setApplication(fetchedData);
        }
      } catch (error) {
        console.error("Error retrieving business tracking metadata structure:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router, urlSlug]);

  const handleLogout = () => {
    localStorage.removeItem('qurevo_session');
    router.push("/login");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-emerald-600 bg-[#FAFAFA]">Synchronizing Security Clearance Tokens...</div>;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Qurevo Hub Dashboard</h1>
            {application && <p className="text-slate-500 text-sm mt-1">Logged Profile: {application.email}</p>}
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
        
        {!application ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-600 font-medium mb-4">No active local listing is current mapped to this dynamic data stream signature node.</p>
            <Link href="/register" className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors">Register a New Listing Profile</Link>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* RETAIN VISIBILITY REGARDLESS OF CLOUD DEPLOYMENT STATUS */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Registered Business Identity</h3>
                <p className="text-xl font-bold text-slate-900">{application.businessName}</p>
                <p className="text-sm text-slate-500 capitalize mt-0.5">{application.category}</p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Corporate Physical Destination</h3>
                <p className="text-sm text-slate-700 flex items-start gap-1.5 mt-1"><MapPin size={16} className="text-slate-400 shrink-0 mt-0.5"/> {application.address || "No precise localization registry address submitted."}</p>
              </div>
            </div>

            {/* PENDING STATE */}
            {(application.status === 'pending' || !application.status) && (
              <div className="bg-white border border-amber-200 p-8 rounded-3xl flex flex-col md:flex-row items-start gap-6 shadow-sm animate-fadeIn">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center shrink-0"><Clock className="text-amber-500" size={28} /></div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Corporate Profile Pending Validation Audit</h2>
                  <p className="text-slate-500 font-medium mb-4 leading-relaxed">
                    Our technical configuration core is running baseline diagnostics against your metadata index array parameters. Profile layout tools will unlock upon operational authorization.
                  </p>
                  <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1.5 rounded-md uppercase tracking-wide">Workflow Matrix Status: Pending Audit</span>
                </div>
              </div>
            )}

            {/* REJECTED / REVOKED STATE (Displays Details + Administrative Rationale Context) */}
            {application.status === 'rejected' && (
              <div className="bg-white border border-red-200 p-8 rounded-3xl flex flex-col md:flex-row items-start gap-6 shadow-sm animate-fadeIn">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center shrink-0"><XCircle className="text-red-500" size={28} /></div>
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-red-950">Application Status De-activated / Denied</h2>
                  <p className="text-slate-500 font-medium mb-4 leading-relaxed">
                    The operational submission framework node for <strong>{application.businessName}</strong> has been flagged or suspended by system administration protocols.
                  </p>
                  <div className="bg-red-50 text-red-900 p-5 rounded-xl border border-red-100 mb-4 text-sm font-medium">
                    <strong className="block text-red-950 mb-1">Official Administrative Reason:</strong> 
                    {application.rejectionReason || "No descriptive structural context reason logged by system admin framework modules."}
                  </div>
                  <p className="text-xs text-slate-400">Please review standard operational listing requirements or execute standard escalation strategies via corporate channels.</p>
                </div>
              </div>
            )}

            {/* LIVE / ACTIVE STATE */}
            {application.status === 'active' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-gradient-to-br from-slate-900 to-emerald-900 p-8 md:p-10 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10"><ShieldCheck size={120} /></div>
                  <div className="relative z-10">
                    <span className="bg-[#ECF39E] text-slate-900 text-xs font-extrabold px-3 py-1.5 rounded-md uppercase tracking-wide mb-6 inline-block">Global Runtime Live Status</span>
                    <h2 className="text-3xl font-extrabold mb-2">{application.businessName}</h2>
                    <p className="text-slate-300 font-medium mb-8 max-w-lg">Your corporate presence engine configuration profile matches current platform indexing runtime nodes perfectly.</p>
                    <a 
                      href={`/${application.state?.toLowerCase().replace(/\s+/g, '-') || 'india'}/${application.city?.toLowerCase().replace(/\s+/g, '-') || 'local'}/${urlSlug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      Browse Digital Endpoint <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600"><Calendar size={20}/></div>
                    <div>
                      <p className="text-sm font-bold text-slate-500 mb-0.5">Term Expiry Metric</p>
                      <p className="font-extrabold text-slate-900 text-lg">{application.expiryDate || "Evaluation Framework"}</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600"><ShieldCheck size={20}/></div>
                    <div>
                      <p className="text-sm font-bold text-slate-500 mb-0.5">Subscription Tier Index</p>
                      <p className="font-extrabold text-slate-900 text-lg capitalize">{application.pricingPlan || "Standard Portal Architecture"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
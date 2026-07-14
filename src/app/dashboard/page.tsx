// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Clock, CheckCircle2, XCircle, ExternalLink, Calendar, LogOut, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      const q = query(collection(db, "business_applications"), where("ownerUid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setApplication({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const formatUrlSlug = (text: string) => {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-evergreen">Loading Workspace...</div>;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAFAFA] text-evergreen p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight">Business Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
        
        {!application ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-palm_leaf-900/20">
            <p className="text-hunter_green font-medium mb-4">You haven't registered a business yet.</p>
            <Link href="/register" className="inline-block bg-evergreen text-lime_cream px-6 py-3 rounded-full font-bold">Register Now</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* PENDING STATE */}
            {application.status === 'pending' && (
              <div className="bg-white border border-amber-200 p-8 rounded-3xl flex flex-col md:flex-row items-start gap-6 shadow-sm">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="text-amber-500" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Application Under Review</h2>
                  <p className="text-zinc-500 font-medium mb-4 leading-relaxed">
                    Thank you for submitting <strong>{application.businessName}</strong>. Our team is verifying your details to ensure quality. We will notify you once your premium page is ready.
                  </p>
                  <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1.5 rounded-md uppercase tracking-wide">Status: Pending</span>
                </div>
              </div>
            )}

            {/* REJECTED STATE */}
            {application.status === 'rejected' && (
              <div className="bg-white border border-red-200 p-8 rounded-3xl flex flex-col md:flex-row items-start gap-6 shadow-sm">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                  <XCircle className="text-red-500" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Application Needs Attention</h2>
                  <p className="text-zinc-500 font-medium mb-4 leading-relaxed">
                    Unfortunately, we could not approve your application for <strong>{application.businessName}</strong> at this time.
                  </p>
                  <div className="bg-red-50 text-red-800 p-4 rounded-xl border border-red-100 mb-4 text-sm font-medium">
                    <strong>Reason:</strong> {application.rejectionReason || "Please contact support for more details."}
                  </div>
                  <a href="mailto:support@qurevo.in" className="text-evergreen font-bold underline underline-offset-4">Contact Support</a>
                </div>
              </div>
            )}

            {/* APPROVED STATE */}
            {application.status === 'approved' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-evergreen to-hunter_green p-8 md:p-10 rounded-[2rem] text-white shadow-premium relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10"><ShieldCheck size={120} /></div>
                  <div className="relative z-10">
                    <span className="bg-lime_cream text-evergreen text-xs font-extrabold px-3 py-1.5 rounded-md uppercase tracking-wide mb-6 inline-block">Active & Live</span>
                    <h2 className="text-3xl font-extrabold mb-2">{application.businessName}</h2>
                    <p className="text-lime_cream-900 font-medium mb-8 max-w-lg">Your premium business page is live on the internet and ready to receive customers.</p>
                    
                    <a 
                      href={`/${formatUrlSlug(application.address.state)}/${formatUrlSlug(application.address.city)}/${application.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-evergreen px-6 py-3 rounded-xl font-bold hover:bg-lime_cream transition-colors"
                    >
                      View Live Page <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-3xl border border-palm_leaf-900/20 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-lime_cream-900 rounded-xl flex items-center justify-center text-evergreen"><Calendar size={20}/></div>
                    <div>
                      <p className="text-sm font-bold text-hunter_green mb-0.5">Renewal Date</p>
                      <p className="font-extrabold text-evergreen text-lg">1 Year from Approval</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-palm_leaf-900/20 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-lime_cream-900 rounded-xl flex items-center justify-center text-evergreen"><ShieldCheck size={20}/></div>
                    <div>
                      <p className="text-sm font-bold text-hunter_green mb-0.5">Current Plan</p>
                      <p className="font-extrabold text-evergreen text-lg capitalize">Basic Plan</p>
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
"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { Check, X, Building2, MapPin, Phone, Mail } from "lucide-react";

export default function AdminDashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Real-time listener for all applications
  useEffect(() => {
    const q = query(collection(db, "business_applications"), orderBy("submittedAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const appsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setApplications(appsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Generate an SEO-friendly slug (e.g., "Al Faizan Bakery" -> "al-faizan-bakery")
  const generateSlug = (name: string) => {
    return name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
  };

  const handleApprove = async (id: string, businessName: string) => {
    if (!confirm(`Are you sure you want to approve ${businessName}?`)) return;
    
    const slug = generateSlug(businessName);
    
    try {
      await updateDoc(doc(db, "business_applications", id), {
        status: "approved",
        slug: slug,
        approvedAt: new Date(),
      });
      alert("Business Approved Successfully!");
    } catch (error) {
      console.error("Error approving:", error);
      alert("Failed to approve business.");
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;
    
    try {
      await updateDoc(doc(db, "business_applications", id), {
        status: "rejected",
        rejectionReason: reason,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error rejecting:", error);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-sans text-evergreen">Loading Admin...</div>;

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-evergreen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex justify-between items-end border-b border-palm_leaf-900/30 pb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Qurevo Command Center</h1>
            <p className="text-hunter_green mt-2 font-medium">Manage business applications and deployments.</p>
          </div>
          <div className="bg-lime_cream text-evergreen px-4 py-2 rounded-lg font-bold text-sm shadow-sm">
            Total Applications: {applications.length}
          </div>
        </header>

        <div className="grid gap-6">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-6 rounded-3xl border border-palm_leaf-900 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                
                {/* Info Section */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">{app.businessName}</h2>
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                      app.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-fern-600">
                    <div className="flex items-center gap-2"><Building2 size={16}/> {app.category}</div>
                    <div className="flex items-center gap-2"><MapPin size={16}/> {app.address?.city} - {app.address?.pinCode}</div>
                    <div className="flex items-center gap-2"><Phone size={16}/> {app.contact?.primaryPhone}</div>
                    <div className="flex items-center gap-2"><Mail size={16}/> {app.contact?.businessEmail}</div>
                  </div>
                  
                  <p className="text-sm text-hunter_green max-w-3xl bg-lime_cream-900/30 p-3 rounded-xl border border-lime_cream">
                    <span className="font-semibold text-evergreen block mb-1">Description:</span>
                    {app.description}
                  </p>
                  
                  {app.slug && (
                     <p className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg inline-block border border-emerald-100">
                       Generated Slug: <span className="font-bold">{app.slug}</span>
                     </p>
                  )}
                </div>

                {/* Actions Section */}
                <div className="flex md:flex-col gap-3 shrink-0">
                  {app.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleApprove(app.id, app.businessName)}
                        className="flex items-center justify-center gap-2 bg-evergreen text-lime_cream px-6 py-3 rounded-xl font-bold hover:bg-hunter_green transition-colors"
                      >
                        <Check size={18} /> Approve
                      </button>
                      <button 
                        onClick={() => handleReject(app.id)}
                        className="flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 px-6 py-3 rounded-xl font-bold hover:bg-red-100 transition-colors"
                      >
                        <X size={18} /> Reject
                      </button>
                    </>
                  )}
                </div>
                
              </div>
            </div>
          ))}

          {applications.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-palm_leaf-900 border-dashed">
              <p className="text-fern text-lg font-medium">No applications found yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
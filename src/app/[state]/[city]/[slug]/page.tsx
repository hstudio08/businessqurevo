"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import BusinessTemplate from '@/components/BusinessTemplate';
import { Loader2, AlertCircle } from 'lucide-react';

export default function DynamicBusinessPage() {
  const params = useParams();
  
  const slug = params?.slug as string;

  const [businessData, setBusinessData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchBusinessDetails = async () => {
      try {
        setLoading(true);
        const appsRef = collection(db, "business_applications");
        
        // Find the business where the "slug" field matches the URL
        const q = query(appsRef, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setBusinessData(querySnapshot.docs[0].data());
        } else {
          setError("Business workspace profile not found.");
        }
      } catch (err) {
        console.error("Firestore Fetch Error:", err);
        setError("Failed to stream configuration parameters securely.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-evergreen-100 flex flex-col items-center justify-center p-4 text-lime_cream">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="text-sm font-bold uppercase tracking-widest">Loading Workspace...</p>
      </div>
    );
  }

  if (error || !businessData) {
    return (
      <div className="min-h-screen bg-evergreen-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-red-900/30 border border-red-500/50 rounded-2xl flex items-center justify-center text-red-400 mb-4">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">404 - Not Found</h2>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  // Pass the found data into the visual template
  return <BusinessTemplate data={businessData} />;
}
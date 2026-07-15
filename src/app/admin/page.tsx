"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AdminDashboard from '../../components/AdminDashboard';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Ensure the user exists and matches the admin email defined in ENV
      if (user && user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        setIsAuthenticated(true);
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">
        Authenticating Secure Session...
      </div>
    );
  }

  if (!isAuthenticated) return null; // Will redirect via the useEffect

  return <AdminDashboard />;
}
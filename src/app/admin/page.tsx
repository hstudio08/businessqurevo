"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '../../components/AdminDashboard'; // Assuming you move the dashboard logic here

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const sessionEmail = localStorage.getItem('qurevo_session');
    // Replace with your actual admin email
    if (sessionEmail === 'admin@qurevo.in') {
      setIsAuthenticated(true);
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!isAuthenticated) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Authenticating...</div>;

  return <AdminDashboard />;
}
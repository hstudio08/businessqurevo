"use client";

import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Users, FileText, Settings, LogOut, CheckCircle2, XCircle } from 'lucide-react';

type Application = {
  id: string;
  businessName: string;
  email: string;
  status?: string;
};

export default function AdminDashboard() {
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('qurevo_applications') || '[]') as Application[];
    setApps(data);
  }, []);

  const handleStatus = (id: string, status: string) => {
    const updated = apps.map((a: any) => a.id === id ? { ...a, status } : a);
    localStorage.setItem('qurevo_applications', JSON.stringify(updated));
    setApps(updated);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-10 text-lime_cream">QUREVO ADMIN</h2>
          <nav className="space-y-4">
            <a href="#" className="flex items-center gap-3 text-white"><LayoutDashboard size={20}/> Dashboard</a>
            <a href="#" className="flex items-center gap-3 text-slate-400"><Users size={20}/> Users</a>
            <a href="#" className="flex items-center gap-3 text-slate-400"><FileText size={20}/> Applications</a>
          </nav>
        </div>
        <button onClick={() => {localStorage.removeItem('qurevo_session'); window.location.reload();}} className="flex items-center gap-3 text-slate-400">
          <LogOut size={20}/> Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-8">Manage Applications</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-4">Business</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app: any) => (
                <tr key={app.id} className="border-b border-slate-100">
                  <td className="p-4 font-semibold">{app.businessName}</td>
                  <td className="p-4 text-slate-600">{app.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {app.status || 'Pending'}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => handleStatus(app.id, 'Approved')} className="text-green-600 hover:text-green-700"><CheckCircle2 size={20}/></button>
                    <button onClick={() => handleStatus(app.id, 'Rejected')} className="text-red-600 hover:text-red-700"><XCircle size={20}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#06110a] text-slate-300 py-24 px-4 sm:px-6 lg:px-8 selection:bg-lime-500/30 selection:text-white">
      <div className="max-w-4xl mx-auto bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl shadow-black/40">
        
        {/* Header Section */}
        <div className="border-b border-white/10 pb-8 mb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-[#dfff80] tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            Effective Date: <span className="text-slate-200">15/07/2026</span>
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-base leading-relaxed">
          
          <p className="text-lg text-slate-200 font-medium">
            Welcome to <span className="text-white font-semibold">Qurevo Businesses</span>, a service operated by Qurevo. 
            Your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your information when you use our platform.
          </p>

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#dfff80]">1.</span> Information We Collect
            </h2>
            <p>When registering your business, we may collect the following data points:</p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-white mb-2 text-sm uppercase tracking-wider text-slate-400">Personal Information</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Full Name</li>
                  <li>Email Address</li>
                  <li>Mobile Number</li>
                  <li>Password (encrypted)</li>
                  <li>Business Owner Information</li>
                </ul>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-white mb-2 text-sm uppercase tracking-wider text-slate-400">Business Information</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm grid grid-cols-2 gap-x-2">
                  <li>Business Name</li>
                  <li>Category</li>
                  <li>Description</li>
                  <li>Address</li>
                  <li>City & State</li>
                  <li>PIN Code</li>
                  <li>Phone & WhatsApp</li>
                  <li>Email Address</li>
                  <li>Social Links</li>
                  <li>Google Maps Link</li>
                  <li>Logo & Images</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">
              <span className="text-[#dfff80]">2.</span> How We Use Your Information
            </h2>
            <p>We process your data strictly to fulfill the following operational requirements:</p>
            <ul className="list-disc pl-5 space-y-1.5 marker:text-emerald-500">
              <li>Create, verify, and manage your business profile.</li>
              <li>Contact you regarding account updates, subscriptions, and renewals.</li>
              <li>Maintain backend security and improve core services.</li>
              <li>Provide dedicated customer support.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 bg-emerald-950/20 border border-emerald-500/10 rounded-2xl p-5">
            <h2 className="text-xl font-bold text-white">
              <span className="text-[#dfff80]">3.</span> Public Information
            </h2>
            <p>Once your business is approved, specific profile items become publicly visible to platform visitors (e.g., Business Name, Category, Description, Public Contacts, Social Links, and Images).</p>
            <p className="text-amber-400/90 text-sm font-medium bg-amber-500/5 border border-amber-500/10 rounded-lg p-3">
              ⚠️ <strong>Notice:</strong> Please do not submit proprietary or confidential information that you do not wish to be publicly displayed.
            </p>
          </section>

          {/* Section 4 & 5 Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <section className="space-y-2">
              <h2 className="text-xl font-bold text-white">
                <span className="text-[#dfff80]">4.</span> Password Security
              </h2>
              <p>Passwords are securely hashed and encrypted. They are never stored in plain text, and Qurevo employees cannot access or view them.</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-bold text-white">
                <span className="text-[#dfff80]">5.</span> Email Verification
              </h2>
              <p>Password recovery and official verification emails may be routed through secure, trusted third-party transactional email providers.</p>
            </section>
          </div>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">
              <span className="text-[#dfff80]">6.</span> Cookies
            </h2>
            <p>We utilize essential cookies to retain your active login session, optimize system functionality, and evaluate traffic patterns to improve UX layout.</p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">
              <span className="text-[#dfff80]">7.</span> Data Security
            </h2>
            <p>We enforce strict technical and organizational defenses to guard user data. However, absolute security cannot be guaranteed over public web infrastructure; users accept these standard online transmission risks.</p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">
              <span className="text-[#dfff80]">8.</span> Third-Party Services
            </h2>
            <p>Our operational pipeline securely integrates external services including Google Maps, EmailJS, web hosting infrastructure, and analytics suites. These endpoints run under their own individual privacy rules.</p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">
              <span className="text-[#dfff80]">9.</span> Account Removal
            </h2>
            <p>You can request data deletion anytime by contacting us. Necessary reference subsets may be temporarily preserved under statutory legal rules, fraud preventions, or accounting disputes.</p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">
              <span className="text-[#dfff80]">10.</span> Changes to this Policy
            </h2>
            <p>We reserve the right to modify this policy statement. Continued platform interactions following modifications constitute direct compliance and acceptance.</p>
          </section>

          {/* Section 11 */}
          <section className="mt-12 pt-8 border-t border-white/10 text-center md:text-left bg-gradient-to-r from-transparent via-white/[0.01] to-transparent p-4 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-2">
              <span className="text-[#dfff80]">11.</span> Contact Us
            </h2>
            <p className="text-slate-400 text-sm mb-4">For privacy queries or rights access requests, reach our administration team directly at:</p>
            <div className="inline-block bg-white/[0.04] border border-white/10 px-4 py-2 rounded-xl text-sm font-semibold text-white">
              Qurevo — <span className="text-[#dfff80] font-mono">qurevotechnologies@gmail.com</span>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

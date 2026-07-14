import { notFound } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Your firebase config
import { MapPin, Phone, Mail, MessageCircle, Clock, CheckCircle2, Building2 } from "lucide-react";
import { Metadata } from "next";

// 1. Helper function to fetch business from Firebase Server-Side
async function getBusinessBySlug(slug: string) {
  const q = query(
    collection(db, "business_applications"),
    where("slug", "==", slug),
    where("status", "==", "approved")
  );
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as any;
}

// 2. Automatically generate SEO Meta Tags for Google
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const business = await getBusinessBySlug(params.slug);
  if (!business) return { title: "Business Not Found | Qurevo" };

  return {
    title: `${business.businessName} | Qurevo Businesses`,
    description: business.description,
    openGraph: {
      title: business.businessName,
      description: business.description,
    },
  };
}

// 3. The Main Page Component
export default async function PublicBusinessPage({ params }: { params: { state: string; city: string; slug: string } }) {
  const business = await getBusinessBySlug(params.slug);

  // If the URL doesn't exist or isn't approved, show Next.js 404 page
  if (!business) {
    notFound();
  }

  // Format the location from the URL parameters for display
  const displayState = params.state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const displayCity = params.city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <main className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-fern selection:text-white">
      
      {/* HEADER / COVER AREA */}
      <div className="h-72 w-full bg-evergreen relative overflow-hidden">
        {/* Subtle texture/gradient for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-hunter_green rounded-full blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/3" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-20 -mt-24 mb-20">
        
        {/* MAIN BUSINESS CARD */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-premium border border-palm_leaf-900/20 flex flex-col md:flex-row gap-8 items-start">
          
          {/* Logo Placeholder (Replace with `next/image` when you add photo uploads) */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-lime_cream text-evergreen shadow-lg border-4 border-white flex items-center justify-center shrink-0 relative -mt-20 md:-mt-24 z-30 overflow-hidden">
             <Building2 size={48} className="opacity-50" />
          </div>
          
          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-evergreen">
                {business.businessName}
              </h1>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 border border-emerald-100">
                <CheckCircle2 size={14}/> Verified
              </span>
            </div>
            
            <p className="text-fern font-semibold mb-6 text-lg">{business.category}</p>
            
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${business.contact.primaryPhone}`} className="flex items-center gap-2 bg-evergreen text-lime_cream px-6 py-3 rounded-full font-bold hover:bg-hunter_green transition shadow-md hover:shadow-lg hover:-translate-y-0.5">
                <Phone size={18} /> Call Now
              </a>
              <a href={`https://wa.me/${business.contact.whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold hover:bg-[#20bd5a] transition shadow-md hover:shadow-lg hover:-translate-y-0.5">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          
          {/* Left Column (About & Gallery) */}
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white p-8 md:p-10 rounded-3xl border border-palm_leaf-900/20 shadow-sm">
              <h2 className="text-2xl font-bold text-evergreen mb-6 flex items-center gap-2">
                About Us
              </h2>
              <p className="text-hunter_green leading-relaxed whitespace-pre-wrap text-lg">
                {business.description}
              </p>
            </section>
            
            {/* Gallery Placeholder */}
            <section className="bg-white p-8 md:p-10 rounded-3xl border border-palm_leaf-900/20 shadow-sm">
              <h2 className="text-2xl font-bold text-evergreen mb-6">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((img) => (
                  <div key={img} className="aspect-square bg-lime_cream-900/50 rounded-2xl flex items-center justify-center border border-lime_cream">
                    <span className="text-palm_leaf text-sm font-medium">Image {img}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (Contact & Location) */}
          <div className="space-y-8">
            <section className="bg-white p-8 rounded-3xl border border-palm_leaf-900/20 shadow-sm">
              <h2 className="text-xl font-bold text-evergreen mb-6">Contact & Location</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-lime_cream-900 flex items-center justify-center shrink-0 text-evergreen">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-evergreen mb-1">Address</p>
                    <p className="text-hunter_green text-sm leading-relaxed">
                      {business.address.city}, {displayState}<br/>
                      PIN: {business.address.pinCode}
                    </p>
                  </div>
                </div>

                {business.contact.businessEmail && (
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-lime_cream-900 flex items-center justify-center shrink-0 text-evergreen">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-evergreen mb-1">Email</p>
                      <a href={`mailto:${business.contact.businessEmail}`} className="text-fern text-sm hover:underline">
                        {business.contact.businessEmail}
                      </a>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-lime_cream-900 flex items-center justify-center shrink-0 text-evergreen">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-evergreen mb-1">Business Hours</p>
                    <p className="text-hunter_green text-sm">Mon-Sun: 9:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <footer className="py-10 text-center border-t border-palm_leaf-900/20 bg-white">
        <p className="text-sm text-fern font-medium flex items-center justify-center gap-2">
          Powered by <span className="text-evergreen font-bold text-base">Qurevo Businesses</span>
        </p>
      </footer>
    </main>
  );
}
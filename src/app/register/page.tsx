"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Building2, User, MapPin, CheckSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Firebase Imports
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

const steps = [
  { id: 1, name: "Personal Details", icon: User },
  { id: 2, name: "Business Info", icon: Building2 },
  { id: 3, name: "Contact & Location", icon: MapPin },
  { id: 4, name: "Review & Submit", icon: CheckSquare },
];

export default function RegisterBusiness() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "", email: "", mobileNumber: "", password: "",
    businessName: "", category: "", description: "",
    city: "", state: "", pinCode: "",
    whatsappNumber: "", primaryPhone: "",
    acceptedTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep !== 4) return nextStep();
    
    setIsSubmitting(true);
    try {
      // 1. Create User Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // 2. Save User Profile to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: formData.email,
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        role: 'business_owner',
        createdAt: serverTimestamp(),
      });

      // 3. Save Business Application to Firestore
      await addDoc(collection(db, "business_applications"), {
        ownerUid: user.uid,
        ownerName: formData.fullName,
        businessName: formData.businessName,
        category: formData.category,
        description: formData.description,
        address: {
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
        },
        contact: {
          primaryPhone: formData.primaryPhone,
          whatsappNumber: formData.whatsappNumber,
          businessEmail: formData.email,
        },
        status: 'pending',
        submittedAt: serverTimestamp(),
      });

      // 4. Redirect to Dashboard
      router.push("/dashboard");
      
    } catch (error: any) {
      console.error("Registration Error:", error);
      alert(error.message || "An error occurred during registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... (Keep the exact same return statement JSX from the previous step)

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row font-sans text-evergreen selection:bg-fern selection:text-white">
      
      {/* LEFT SIDEBAR - Progress Indicator */}
      <div className="md:w-1/3 bg-evergreen text-lime_cream p-10 flex flex-col justify-between">
        <div>
          <Link href="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2 mb-16">
            <div className="w-8 h-8 bg-lime_cream rounded-lg"></div>
            Qurevo Businesses
          </Link>
          
          <div className="space-y-8 relative">
            {/* Connecting Line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-hunter_green -z-10"></div>
            
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              return (
                <div key={step.id} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${
                    isActive ? "bg-lime_cream text-evergreen scale-110" : 
                    isCompleted ? "bg-fern text-white" : "bg-hunter_green/50 text-palm_leaf"
                  }`}>
                    {isCompleted ? <CheckCircle2 size={24} /> : <step.icon size={20} />}
                  </div>
                  <div>
                    <p className={`text-sm font-bold uppercase tracking-wider ${isActive ? "text-lime_cream" : "text-palm_leaf"}`}>Step {step.id}</p>
                    <p className={`font-medium ${isActive ? "text-white" : "text-fern-800"}`}>{step.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-16 text-sm text-fern-700">
          Having trouble? <a href="mailto:support@qurevo.in" className="text-lime_cream underline underline-offset-4">Contact Support</a>
        </div>
      </div>

      {/* RIGHT SIDE - Form Area */}
      <div className="md:w-2/3 p-8 md:p-16 flex items-center justify-center relative overflow-hidden">
        <div className="w-full max-w-xl">
          <form onSubmit={handleSubmit} className="relative w-full h-[500px]">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: PERSONAL INFO */}
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute inset-0">
                  <h2 className="text-3xl font-bold mb-2">Create your account</h2>
                  <p className="text-fern-500 mb-8 font-medium">Let's start with your personal details.</p>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name</label>
                      <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-palm_leaf-900 bg-white focus:outline-none focus:ring-2 focus:ring-fern focus:border-transparent transition-all" placeholder="John Doe" />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Email Address</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-palm_leaf-900 bg-white focus:outline-none focus:ring-2 focus:ring-fern transition-all" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Mobile Number</label>
                        <input required type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-palm_leaf-900 bg-white focus:outline-none focus:ring-2 focus:ring-fern transition-all" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Password</label>
                      <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-palm_leaf-900 bg-white focus:outline-none focus:ring-2 focus:ring-fern transition-all" placeholder="••••••••" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: BUSINESS INFO */}
              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute inset-0">
                  <h2 className="text-3xl font-bold mb-2">Business Details</h2>
                  <p className="text-fern-500 mb-8 font-medium">Tell us about what you do.</p>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Business Name</label>
                      <input required type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-palm_leaf-900 bg-white focus:outline-none focus:ring-2 focus:ring-fern transition-all" placeholder="e.g. Al Faizan Bakery" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Category</label>
                      <select required name="category" value={formData.category} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-palm_leaf-900 bg-white focus:outline-none focus:ring-2 focus:ring-fern transition-all appearance-none cursor-pointer">
                        <option value="" disabled>Select a category...</option>
                        <option value="Restaurant">Restaurant / Cafe</option>
                        <option value="Clinic">Clinic / Doctor</option>
                        <option value="Retail">Retail Shop</option>
                        <option value="Agency">Agency / Services</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Short Description</label>
                      <textarea required name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-5 py-4 rounded-xl border border-palm_leaf-900 bg-white focus:outline-none focus:ring-2 focus:ring-fern transition-all resize-none" placeholder="Describe your business in a few sentences..." />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: CONTACT & LOCATION */}
              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute inset-0">
                  <h2 className="text-3xl font-bold mb-2">Where can people find you?</h2>
                  <p className="text-fern-500 mb-8 font-medium">Add your location and public contact info.</p>
                  
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold mb-2">City</label>
                        <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-palm_leaf-900 bg-white focus:outline-none focus:ring-2 focus:ring-fern transition-all" placeholder="Srinagar" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">PIN Code</label>
                        <input required type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-palm_leaf-900 bg-white focus:outline-none focus:ring-2 focus:ring-fern transition-all" placeholder="190001" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Public Phone</label>
                        <input required type="tel" name="primaryPhone" value={formData.primaryPhone} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-palm_leaf-900 bg-white focus:outline-none focus:ring-2 focus:ring-fern transition-all" placeholder="+91..." />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">WhatsApp Number</label>
                        <input required type="tel" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-palm_leaf-900 bg-white focus:outline-none focus:ring-2 focus:ring-fern transition-all" placeholder="+91..." />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: REVIEW */}
              {currentStep === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute inset-0">
                  <h2 className="text-3xl font-bold mb-2">Ready to launch?</h2>
                  <p className="text-fern-500 mb-8 font-medium">Review your info and submit your application.</p>
                  
                  <div className="bg-lime_cream-900/40 p-6 rounded-2xl border border-lime_cream-900 mb-6">
                    <h3 className="font-bold text-lg mb-4">{formData.businessName || "Your Business"}</h3>
                    <div className="space-y-2 text-sm text-evergreen-400">
                      <p><span className="font-semibold text-evergreen">Owner:</span> {formData.fullName}</p>
                      <p><span className="font-semibold text-evergreen">Category:</span> {formData.category}</p>
                      <p><span className="font-semibold text-evergreen">Location:</span> {formData.city} - {formData.pinCode}</p>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required name="acceptedTerms" checked={formData.acceptedTerms} onChange={(e) => setFormData(prev => ({...prev, acceptedTerms: e.target.checked}))} className="mt-1 w-5 h-5 rounded border-fern text-evergreen focus:ring-evergreen" />
                    <span className="text-sm text-fern-500">I confirm that all information provided is accurate and I agree to the <a href="#" className="text-evergreen font-semibold underline">Terms of Service</a>.</span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FORM NAVIGATION BUTTONS */}
            <div className="absolute bottom-0 left-0 right-0 pt-6 flex justify-between items-center border-t border-palm_leaf-900/50 bg-[#FAFAFA]">
              {currentStep > 1 ? (
                <button type="button" onClick={prevStep} className="flex items-center gap-2 px-6 py-3 font-semibold text-fern-500 hover:text-evergreen transition-colors">
                  <ArrowLeft size={18} /> Back
                </button>
              ) : <div></div>}
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-4 bg-evergreen text-lime_cream rounded-full font-bold hover:bg-hunter_green transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : currentStep === 4 ? "Submit Application" : "Continue"} 
                {!isSubmitting && currentStep !== 4 && <ArrowRight size={18} />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
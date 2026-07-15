"use client";

import React, { useState, useEffect } from 'react';
import BusinessTemplate from '@/components/BusinessTemplate'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Make sure this path is correct for your project

export default function SakhiInternationalPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  // State for dynamic review calculations
  const [dynamicRating, setDynamicRating] = useState('0.0');
  const [dynamicReviewCount, setDynamicReviewCount] = useState(0);

  const sakhiData = {
    id: 'sakhi-international',
    hero: {
      bgImage: 'https://res.cloudinary.com/dpqsadqxj/image/upload/v1784118380/5f5489ba-4100-43f5-82c8-50f95391a719.png', 
      logo: 'https://res.cloudinary.com/dpqsadqxj/image/upload/v1784116981/ade8c914-b4c5-48fa-8134-037dfd596efd.png',
      category: 'EDUCATION CONSULTANCY',
      name: 'Sakhi International Education',
      // Dynamically fed from Firebase
      rating: dynamicRating,
      reviewCount: dynamicReviewCount,
      location: 'Anantnag & Pulwama, J&K',
      isOpen: true,
    },
    
    about: {
      text: `Sakhi International Education is a premier education consultancy based in Jammu and Kashmir, with primary offices strategically located in Anantnag and Pulwama. For over a decade, we have specialized in providing world-class global education counseling, admission assistance, and visa processing, helping thousands of students achieve their dreams of studying in top domestic and international universities.\n\nOur core expertise lies in medical admissions. We heavily focus on guiding Indian students towards NMC-compliant MBBS programs in prestigious institutions across China, Kazakhstan, Uzbekistan, and Russia. We understand the complexities of studying abroad, which is why we provide end-to-end logistics support, including rigorous documentation assistance, Statement of Purpose (SOP) crafting, scholarship mapping, education loan guidance, and comprehensive pre-departure briefings.\n\nIn addition to our international reach, we are deeply committed to empowering local students within Jammu & Kashmir. We facilitate local admissions for JKBOPEE-appeared candidates, securing seats in highly sought-after B.Sc Nursing, B.Sc Paramedical, GNM/ANM, and Pharmacy courses. By partnering with leading Indian universities like Starex University and IIT Mandi, we ensure our students have access to emerging technical and skill-based programs right here in India.`,
      stats: [
        { value: '1000+', label: 'Admissions' },
        { value: '5+', label: 'Countries' },
        { value: '100%', label: 'Visa Success' },
        { value: '24/7', label: 'Support' }
      ]
    },

    team: [
      {
        name: 'Dr. Tariq Ahmed',
        role: 'Founder & Director',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400',
        bio: 'With over 15 years of experience in international education, Dr. Tariq founded Sakhi International to bridge the gap between J&K students and global opportunities.'
      },
      {
        name: 'Saima Khan',
        role: 'Senior Medical Counselor',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400',
        bio: 'Saima specializes in guiding students through NMC-compliant MBBS programs in Russia and Kazakhstan, boasting a 100% successful placement rate.'
      },
      {
        name: 'Irfan Bhat',
        role: 'Visa & Documentation Head',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400',
        bio: 'Irfan ensures a seamless visa process, handling everything from SOP preparation to final embassy interviews with precision and care.'
      }
    ],

    features: [
      { icon: '🌍', title: 'Global Admissions' },
      { icon: '🩺', title: 'MBBS Abroad' },
      { icon: '✈️', title: 'Visa Processing' },
      { icon: '💰', title: 'Education Loans' },
    ],

    hours: [
      { day: 'Monday - Saturday', time: '10:00 AM - 6:00 PM' },
      { day: 'Sunday', time: 'Closed' }
    ],

    specialties: [
      { image: 'https://res.cloudinary.com/drytpdpx3/image/upload/q_auto/f_auto/v1779729118/Namangan_mc1src.jpg', title: 'MBBS Abroad', subtitle: 'China, Kazakhstan, Russia' },
      { image: 'https://res.cloudinary.com/dpqsadqxj/image/upload/v1784119314/756fe029-efe7-4ee3-9869-77816484526d.png', title: 'B.Sc Nursing', subtitle: 'Domestic healthcare' },
      { image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=400', title: 'Paramedical', subtitle: 'GNM, ANM, Pharmacy' },
      { image: 'https://res.cloudinary.com/dpqsadqxj/image/upload/v1784119373/9ccdd6ca-bf99-4d71-8965-21f39d46ea93.png', title: 'Indian Universities', subtitle: 'Starex University & more' },
    ],

    instagramReels: [
      'https://www.instagram.com/reel/DaLe8-kznAC/embed',
      'https://www.instagram.com/reel/DavpLpFzM0v/embed',
      'https://www.instagram.com/reel/DaQDp-oBdPg/embed',
      'https://www.instagram.com/reel/DYRPF9azeDi/embed'
    ],

    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800',
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800',
      'https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=800',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800'
    ],

    contact: {
      phone1: '+91 96823 54491',
      phone2: '+91 97972 21558',
      email: 'info@sakhieducation.com',
      website: 'www.sakhieducation.com', 
      address: 'Main Office, Anantnag, Jammu & Kashmir',
      facebook: 'https://www.facebook.com/sakhieducation', 
      instagram: 'https://www.instagram.com/sakhieducation' 
    },

    whyChooseUs: [
      { icon: '📝', title: 'End-to-End Support', subtitle: 'SOPs to Pre-departure' },
      { icon: '🤝', title: 'Direct Tie-ups', subtitle: 'No hidden middlemen' },
      { icon: '🎓', title: 'Expert Counselors', subtitle: 'Industry experience' },
      { icon: '📋', title: 'JKBOPEE Help', subtitle: 'Guidance for local exams' }
    ]
  };

  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        const q = query(
          collection(db, 'reviews'), 
          where('businessId', '==', 'sakhi-international')
        );
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const count = snapshot.size;
          // Calculate the sum of all ratings
          const totalRating = snapshot.docs.reduce((acc, doc) => acc + doc.data().rating, 0);
          // Calculate average and format to 1 decimal place
          const avgRating = (totalRating / count).toFixed(1);
          
          setDynamicRating(avgRating);
          setDynamicReviewCount(count);
        }
      } catch (error) {
        console.error("Error fetching review stats:", error);
      }
    };

    // Run the fetch, then disable the skeleton loader
    fetchReviewStats().then(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1200); 
    });
    
  }, []);

  return (
    <main>
      <BusinessTemplate data={sakhiData} isLoading={isLoading} />
    </main>
  );
}
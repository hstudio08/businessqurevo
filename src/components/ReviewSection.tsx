"use client";

import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, serverTimestamp, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Ensure this path points to your firebase config
import { Star, User, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: any;
}

export default function ReviewSection({ businessId }: { businessId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  
  // Submission & Spam Prevention State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  // Load Reviews & Check LocalStorage
  useEffect(() => {
    // Check local storage to see if user already reviewed this business
    if (typeof window !== 'undefined') {
      const reviewed = localStorage.getItem(`reviewed_${businessId}`);
      if (reviewed) setHasReviewed(true);
    }

    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, 'reviews'),
          where('businessId', '==', businessId)
        );
        const querySnapshot = await getDocs(q);
        
        const fetchedReviews = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Review[];
        
        // Sort manually if you don't have composite indexes set up in Firebase yet
        fetchedReviews.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
        
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [businessId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || rating < 1 || hasReviewed) return;

    setIsSubmitting(true);
    try {
      const reviewData = {
        businessId,
        name: name.trim(),
        rating,
        comment: comment.trim(),
        createdAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(collection(db, 'reviews'), reviewData);
      
      // Update UI immediately
      setReviews([{ id: docRef.id, ...reviewData }, ...reviews]);
      
      // Save to local storage to prevent future spam
      localStorage.setItem(`reviewed_${businessId}`, 'true');
      setHasReviewed(true);
      
      // Reset form
      setName('');
      setComment('');
      setRating(5);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mt-8 w-full">
      <h3 className="text-2xl font-extrabold text-[#0A1A12] mb-6 flex items-center gap-2">
        <Star className="text-amber-400 fill-amber-400" /> Customer Reviews
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT: Write a Review Form */}
        <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-100 h-fit">
          <h4 className="font-bold text-[#0A1A12] mb-4">Leave a Review</h4>
          
          {hasReviewed ? (
            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 flex items-center gap-3">
              <span className="text-2xl">🎉</span>
              <p className="text-sm font-medium">Thank you! Your review has been successfully submitted and saved.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Selection */}
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star 
                      size={28} 
                      className={`${(hoveredStar || rating) >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} 
                    />
                  </button>
                ))}
              </div>

              {/* Name Input */}
              <div className="relative">
                <User size={18} className="absolute left-3 top-3 text-slate-400" />
                <input 
                  type="text" 
                  required
                  placeholder="Your Name" 
                  maxLength={50}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Comment Input */}
              <div className="relative">
                <MessageSquare size={18} className="absolute left-3 top-3 text-slate-400" />
                <textarea 
                  required
                  placeholder="Share your experience (min 10 chars)..." 
                  minLength={10}
                  maxLength={500}
                  rows={4}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm resize-none"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || !name || !comment}
                className="w-full bg-[#0A1A12] text-white font-bold py-3 rounded-xl hover:bg-emerald-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Posting...' : 'Submit Review'}
              </button>
            </form>
          )}
        </div>

        {/* RIGHT: Display Reviews */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-slate-100 rounded-xl w-full"></div>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12 px-4 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
              <Star size={40} className="text-slate-300 mx-auto mb-3" />
              <h5 className="font-bold text-slate-700">No reviews yet</h5>
              <p className="text-sm text-slate-500 mt-1">Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {reviews.map((review) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={review.id} 
                  className="p-5 rounded-2xl border border-slate-100 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-[#0A1A12]">{review.name}</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} size={14} className={review.rating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
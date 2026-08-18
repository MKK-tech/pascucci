import React from 'react';
import { INITIAL_REVIEWS, Review } from '../types';
import { Star, MessageSquare, Check, User, Calendar } from 'lucide-react';

interface ReviewsProps {
  isAr: boolean;
}

export default function Reviews({ isAr }: ReviewsProps) {
  const [reviewsList, setReviewsList] = React.useState<Review[]>([]);
  const [newAuthor, setNewAuthor] = React.useState('');
  const [newRating, setNewRating] = React.useState(5);
  const [newComment, setNewComment] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // Load reviews from localStorage + INITIAL_REVIEWS on mount
  React.useEffect(() => {
    const cached = localStorage.getItem('pascucci_guest_reviews');
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as Review[];
        setReviewsList([...parsed, ...INITIAL_REVIEWS]);
      } catch (err) {
        setReviewsList(INITIAL_REVIEWS);
      }
    } else {
      setReviewsList(INITIAL_REVIEWS);
    }
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newReviewItem: Review = {
      id: `rev-${Date.now()}`,
      authorAr: newAuthor,
      authorEn: newAuthor,
      rating: newRating,
      commentAr: newComment,
      commentEn: newComment,
      date: new Date().toISOString().split('T')[0],
    };

    const updatedReviews = [newReviewItem, ...reviewsList];
    setReviewsList(updatedReviews);

    // Save only user created reviews in localStorage
    const userReviews = updatedReviews.filter(r => r.id.startsWith('rev-'));
    localStorage.setItem('pascucci_guest_reviews', JSON.stringify(userReviews));

    // Clear form and show success state
    setNewAuthor('');
    setNewRating(5);
    setNewComment('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="reviews" className="py-24 bg-[#0A0A0A] text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-500/20 to-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-mono tracking-widest uppercase gold-glow-subtle">
            <Star className="h-3.5 w-3.5 text-amber-400 fill-current" />
            <span className="text-gold-sparkle font-bold">{isAr ? 'شاركنا تجربتك الرائعة' : 'GUEST REVIEWS'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {isAr ? (
              <>جدار الكريما: <span className="text-gold-sparkle">آراء ومقترحات ضيوفنا</span></>
            ) : (
              <>The Crema Wall: <span className="text-gold-sparkle">Guest Reviews</span></>
            )}
          </h2>
          <p className="max-w-xl mx-auto text-stone-400 text-sm sm:text-base">
            {isAr 
              ? 'نعتز بثقتكم وآرائكم! شاركنا تجربتك الفريدة لمساعدتنا في الاستمرار بتقديم أفضل جودة ومذاق.' 
              : 'Your feedback inspires us! Read real testimonials or share your own personal experience with us.'}
          </p>
          <div className="h-1.5 w-20 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600 rounded-full mx-auto gold-glow-subtle" />
        </div>

        {/* Reviews Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          
          {/* Reviews List Column (Left 7-cols) */}
          <div className="lg:col-span-7 space-y-6 max-h-[700px] overflow-y-auto pr-2 scrollbar-thin">
            {reviewsList.length === 0 ? (
              <div className="text-center py-12 bg-[#0F0F0F]/40 rounded-2xl border border-white/10">
                <MessageSquare className="h-10 w-10 text-stone-600 mx-auto mb-3" />
                <p className="text-stone-400 text-sm">
                  {isAr ? 'لا يوجد آراء حالياً. كن أول من يكتب مراجعة!' : 'No reviews yet. Be the first to share!'}
                </p>
              </div>
            ) : (
              reviewsList.map((rev) => (
                <div
                  key={rev.id}
                  className="p-6 rounded-2xl bg-[#0F0F0F] border border-white/10 space-y-4 hover:border-amber-400/40 transition-all shadow-md hover:shadow-amber-500/5"
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Guest Profile Details */}
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#0A0A0A] border border-amber-400/30 flex items-center justify-center text-amber-300">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-white">
                          {isAr ? rev.authorAr : rev.authorEn}
                        </h4>
                        <div className="flex items-center gap-1.5 text-stone-500 text-xs">
                          <Calendar className="h-3 w-3" />
                          <span>{rev.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Star Rating display */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < rev.rating ? 'text-amber-400 fill-current' : 'text-stone-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-normal font-serif italic">
                    "{isAr ? rev.commentAr : rev.commentEn}"
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Add Review Form Column (Right 5-cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0F0F0F] border border-amber-500/20 shadow-xl space-y-6 gold-glow-subtle">
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {isAr ? 'أضف رأيك وتجربتك الشخصية' : 'Share Your Experience'}
                </h3>
                <p className="text-stone-400 text-xs">
                  {isAr 
                    ? 'رأيكم يهمنا جداً ويساهم في استمرارية تميز كافيه بسكوتشي.' 
                    : 'We value your input! Share your honest review with our team and community.'}
                </p>
              </div>

              {isSubmitted ? (
                /* Instant Feedback confirmation */
                <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-center space-y-2 animate-fade-in">
                  <div className="h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <Check className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {isAr ? 'تمت إضافة مراجعتك بنجاح!' : 'Review Submitted!'}
                  </h4>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    {isAr 
                      ? 'نشكرك جزيل الشكر لمشاركتنا تفاصيل رأيك، تم حفظ مراجعتك بنجاح.' 
                      : 'Thank you for your warm words. Your feedback has been posted successfully.'}
                  </p>
                </div>
              ) : (
                /* Standard Input Form */
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Author Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300">
                      {isAr ? 'اسم الشهرة بالكامل *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder={isAr ? 'مثال: عبد العزيز العتيبي' : 'e.g. Alex Smith'}
                      className="w-full p-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition text-sm"
                    />
                  </div>

                  {/* Star Rating selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 block">
                      {isAr ? 'تقييمك للمكان (بالنجوم) *' : 'Rating Star *'}
                    </label>
                    <div className="flex items-center gap-1.5 bg-[#0A0A0A] border border-white/10 p-3 rounded-xl justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="text-stone-700 hover:scale-110 transition duration-150 cursor-pointer"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= newRating ? 'text-amber-400 fill-current' : 'text-stone-800'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300">
                      {isAr ? 'تفاصيل رأيك وملاحظاتك *' : 'Your Review / Comments *'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder={
                        isAr 
                          ? 'اكتب رأيك الصادق عن القهوة، المخبوزات، أو الخدمة والأجواء...' 
                          : 'Write your honest feedback about our espresso, croissants, pastries, or service...'
                      }
                      className="w-full p-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition text-sm resize-none"
                    />
                  </div>

                  {/* Submit review button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gold-button text-black font-extrabold rounded-xl transition shadow-lg text-xs sm:text-sm cursor-pointer border border-amber-200/50"
                  >
                    {isAr ? 'إرسال ونشر المراجعة' : 'Submit My Review'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

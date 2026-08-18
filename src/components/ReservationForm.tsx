import React from 'react';
import { CalendarDays, Users, Clock, Send, CheckCircle, MapPin } from 'lucide-react';
import { PASCUCCI_LOCATION, SiteContent } from '../types';

interface ReservationProps {
  isAr: boolean;
  siteContent?: SiteContent;
}

export default function ReservationForm({ isAr, siteContent }: ReservationProps) {
  const [requestType, setRequestType] = React.useState<'table' | 'catering'>('table');
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    guests: '2',
    date: '',
    time: '',
    notes: '',
  });

  const res = siteContent?.reservation;
  const badge = isAr ? (res?.badgeAr || 'احجز جلستك الفاخرة') : (res?.badgeEn || 'RESERVATIONS & EVENTS');
  const title = isAr ? (res?.titleAr || 'الحجوزات والضيافة الإيطالية') : (res?.titleEn || 'Bookings & Catering');
  const subtitle = isAr ? (res?.subtitleAr || 'احجز طاولتك الفاخرة للاسترخاء، أو اطلب خدمات الضيافة الخارجية للمناسبات والاجتماعات الراقية بلمسة بسكوتشي.') : (res?.subtitleEn || 'Secure a premium table or book our elite catering packages to bring the authentic taste of Italy to your events.');
  const locationNote = isAr ? (res?.locationNoteAr || 'الموقع: حي التعاون - شارع عثمان بن عفان، الرياض') : (res?.locationNoteEn || 'Location: Al Taawun, Othman Bin Affan Rd., Riyadh');
  const footerNote = isAr ? (res?.footerNoteAr || '* لن يتم تحصيل أي مبالغ مالية عند الحجز، الدفع يتم داخل الكافيه.') : (res?.footerNoteEn || '* No upfront fees required. All payments are settled on-site.');

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [bookingId, setBookingId] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending reservation details to custom server API
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setBookingId(`PSC-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      guests: '2',
      date: '',
      time: '',
      notes: '',
    });
    setSubmitSuccess(false);
    setBookingId('');
  };

  return (
    <section id="reserve" className="py-24 bg-[#0F0F0F] text-stone-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-500/20 to-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-mono tracking-widest uppercase gold-glow-subtle">
            <CalendarDays className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-gold-sparkle font-bold">{badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          <p className="max-w-xl mx-auto text-stone-400 text-sm sm:text-base">
            {subtitle}
          </p>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-stone-300 mt-2">
            <MapPin className="h-3.5 w-3.5 text-amber-400" />
            <span>{locationNote}</span>
          </div>

          <div className="h-1.5 w-20 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600 rounded-full mx-auto mt-4 gold-glow-subtle" />
        </div>

        {/* Form Container */}
        <div className="bg-[#0A0A0A] border border-amber-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative gold-glow-subtle">
          
          {submitSuccess ? (
            /* Success State */
            <div className="text-center py-8 space-y-6 animate-fade-in" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
              <div className="inline-flex p-4 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 mb-2">
                <CheckCircle className="h-12 w-12 text-emerald-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {isAr ? 'تم استلام طلب الحجز بنجاح!' : 'Reservation Submitted Successfully!'}
                </h3>
                <p className="text-stone-400 text-sm sm:text-base max-w-md mx-auto">
                  {isAr 
                    ? 'يسعدنا جداً استضافتك. تم تسجيل طلب الحجز بنجاح، وسيتواصل معك منسق الضيافة عبر الهاتف لتأكيد موعدك.' 
                    : 'We look forward to hosting you! Your reservation has been recorded, and our team will contact you by phone shortly.'}
                </p>
              </div>

              {/* Booking Reference Card */}
              <div className="p-5 rounded-2xl bg-[#0F0F0F] border border-amber-500/30 max-w-sm mx-auto space-y-3">
                <div className="flex justify-between text-xs text-stone-500 font-mono tracking-wider">
                  <span>{isAr ? 'رمز الحجز:' : 'REFERENCE ID:'}</span>
                  <span className="font-bold text-gold-sparkle">{bookingId}</span>
                </div>
                <div className="h-[1px] bg-white/5" />
                <div className="grid grid-cols-2 gap-2 text-right text-xs text-stone-400" style={{ textAlign: isAr ? 'right' : 'left' }}>
                  <div>
                    <span className="text-stone-600 block">{isAr ? 'الاسم:' : 'Name:'}</span>
                    <strong className="text-stone-200">{formData.name}</strong>
                  </div>
                  <div>
                    <span className="text-stone-600 block">{isAr ? 'الجوال:' : 'Phone:'}</span>
                    <strong className="text-stone-200">{formData.phone}</strong>
                  </div>
                  <div className="mt-2">
                    <span className="text-stone-600 block">{isAr ? 'الموقع:' : 'Location:'}</span>
                    <strong className="text-stone-200">{isAr ? 'حي التعاون' : 'Al Taawun'}</strong>
                  </div>
                  <div className="mt-2">
                    <span className="text-stone-600 block">{isAr ? 'التاريخ والوقت:' : 'Date & Time:'}</span>
                    <strong className="text-stone-200">{formData.date} - {formData.time}</strong>
                  </div>
                  <div className="mt-2 col-span-2">
                    <span className="text-stone-600 block">{isAr ? 'الضيوف:' : 'Guests:'}</span>
                    <strong className="text-stone-200">
                      {formData.guests} {isAr ? 'أشخاص' : 'People'}
                    </strong>
                  </div>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-3 bg-[#0F0F0F] hover:bg-white/5 border border-white/10 text-stone-300 hover:text-white rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer"
              >
                {isAr ? 'إجراء حجز آخر' : 'Book Another Table'}
              </button>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmit} className="space-y-8" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
              {/* Type Selector (Table Booking vs Events Catering) */}
              <div className="flex border-b border-white/10 pb-2 gap-6">
                <button
                  type="button"
                  onClick={() => setRequestType('table')}
                  className={`pb-3 text-sm sm:text-base font-extrabold transition-all relative cursor-pointer ${
                    requestType === 'table' ? 'text-gold-sparkle' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {isAr ? 'حجز طاولة فاخرة' : 'Luxury Table Booking'}
                  {requestType === 'table' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setRequestType('catering')}
                  className={`pb-3 text-sm sm:text-base font-extrabold transition-all relative cursor-pointer ${
                    requestType === 'catering' ? 'text-gold-sparkle' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {isAr ? 'خدمات الضيافة والمناسبات' : 'Corporate & Event Catering'}
                  {requestType === 'catering' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full" />
                  )}
                </button>
              </div>

              {/* Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-stone-300">
                    {isAr ? 'الاسم بالكامل *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={isAr ? 'مثال: أحمد محمد' : 'e.g. John Doe'}
                    className="w-full p-3.5 bg-[#0F0F0F] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition text-sm"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-stone-300">
                    {isAr ? 'رقم الجوال *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={isAr ? '05xxxxxxxx' : '05xxxxxxxx'}
                    className="w-full p-3.5 bg-[#0F0F0F] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition text-sm text-left"
                  />
                </div>

                {/* Number of guests (Table only) */}
                {requestType === 'table' ? (
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-stone-300 flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-amber-400" />
                      <span>{isAr ? 'عدد الضيوف' : 'Number of Guests'}</span>
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full p-3.5 bg-[#0F0F0F] border border-white/10 rounded-xl text-stone-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition text-sm"
                    >
                      <option value="1">1 {isAr ? 'شخص واحد' : 'Person'}</option>
                      <option value="2">2 {isAr ? 'شخصين' : 'People'}</option>
                      <option value="3">3 {isAr ? 'ثلاثة أشخاص' : 'People'}</option>
                      <option value="4">4 {isAr ? 'أربعة أشخاص' : 'People'}</option>
                      <option value="5-8">5 - 8 {isAr ? 'أشخاص' : 'People'}</option>
                      <option value="9+">9+ {isAr ? 'أشخاص (جلسة جماعية)' : 'People (Group Gathering)'}</option>
                    </select>
                  </div>
                ) : (
                  /* Catering Guest Count description */
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-stone-300 flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-amber-400" />
                      <span>{isAr ? 'العدد التقريبي للمدعوين' : 'Estimated Attendees'}</span>
                    </label>
                    <input
                      type="text"
                      name="guests"
                      required
                      value={formData.guests}
                      onChange={handleChange}
                      placeholder={isAr ? 'مثال: 50 شخص' : 'e.g. 50 guests'}
                      className="w-full p-3.5 bg-[#0F0F0F] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition text-sm"
                    />
                  </div>
                )}

                {/* Date Selection */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-stone-300 flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-amber-400" />
                    <span>{isAr ? 'تاريخ الحجز *' : 'Booking Date *'}</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-3.5 bg-[#0F0F0F] border border-white/10 rounded-xl text-stone-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition text-sm text-left"
                  />
                </div>

                {/* Time Selection */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs sm:text-sm font-semibold text-stone-300 flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <span>{isAr ? 'الوقت المفضّل *' : 'Preferred Time *'}</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-3.5 bg-[#0F0F0F] border border-white/10 rounded-xl text-stone-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition text-sm text-left"
                  />
                </div>

                {/* Detailed Request Notes (Full Width) */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs sm:text-sm font-semibold text-stone-300">
                    {isAr ? 'طلبات خاصة / تفاصيل المناسبة' : 'Special Notes / Event Details'}
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder={
                      isAr 
                        ? 'يرجى كتابة أي تفاصيل إضافية (مثل: مناسبة عيد ميلاد، تفضيل جلسة معينة، مسببات حساسية...)' 
                        : 'Please write any extra details (e.g. outdoor seating preference, dietary restrictions, birthday setup...)'
                    }
                    className="w-full p-3.5 bg-[#0F0F0F] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition text-sm resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 bg-gold-button text-black font-extrabold rounded-xl shadow-xl transition duration-200 cursor-pointer flex items-center justify-center gap-2 mx-auto border border-amber-200/50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>{isAr ? 'جاري إرسال طلبك...' : 'Submitting Request...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 text-black" />
                      <span>{isAr ? 'تأكيد إرسال الطلب' : 'Confirm & Request Booking'}</span>
                    </>
                  )}
                </button>
                <span className="block text-[11px] text-stone-500 mt-3">
                  {footerNote}
                </span>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}

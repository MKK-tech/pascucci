import React from 'react';
import { X, Calendar, Clock, Users, User, Phone, CheckCircle2, MessageSquare, Coffee, Sparkles, MapPin } from 'lucide-react';
import { SiteSettings, CustomerReservation } from '../types';

interface ReservationModalProps {
  isAr: boolean;
  isOpen: boolean;
  onClose: () => void;
  siteSettings: SiteSettings;
  onAddReservation?: (res: CustomerReservation) => void;
}

const MAP_LOCATION_URL = 'https://share.google/OrePFtaSlCsgShBab';

export default function ReservationModal({
  isAr,
  isOpen,
  onClose,
  siteSettings,
  onAddReservation,
}: ReservationModalProps) {
  const [formData, setFormData] = React.useState<{
    name: string;
    phone: string;
    guests: string;
    date: string;
    time: string;
    seating: 'indoor' | 'outdoor' | 'vip';
    notes: string;
  }>({
    name: '',
    phone: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    seating: 'indoor',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onAddReservation) {
      const newReservation: CustomerReservation = {
        id: `res_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        name: formData.name.trim() || (isAr ? 'عميل كافيه بسكوتشي' : 'Pascucci Guest'),
        phone: formData.phone.trim(),
        guests: parseInt(formData.guests, 10) || 2,
        date: formData.date,
        time: formData.time,
        seating: formData.seating,
        notes: formData.notes.trim() || undefined,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      onAddReservation(newReservation);
    }

    setIsSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    const rawNumber = siteSettings.whatsappNumber.replace(/[^0-9]/g, '') || '966500000000';
    const message = isAr
      ? `طلب حجز طاولة في كافيه بسكوتشي:
الاسم: ${formData.name || 'عميل محترم'}
رقم الهاتف: ${formData.phone || 'غير مسجل'}
عدد الضيوف: ${formData.guests} أشخاص
التاريخ: ${formData.date}
الوقت: ${formData.time}
الجلسة: ${formData.seating === 'indoor' ? 'داخلية' : formData.seating === 'vip' ? 'VIP خاصة' : 'خارجية'}
ملاحظات: ${formData.notes || 'لا يوجد'}`
      : `Table Reservation Request - Caffe Pascucci:
Name: ${formData.name || 'Guest'}
Phone: ${formData.phone || 'N/A'}
Guests: ${formData.guests} person(s)
Date: ${formData.date}
Time: ${formData.time}
Seating: ${formData.seating}
Notes: ${formData.notes || 'None'}`;

    const waUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      <div className="relative w-full max-w-lg bg-[#0F0F0F] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl gold-glow-subtle overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-5 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {isAr ? 'تم استلام وتوثيق طلب الحجز بنجاح!' : 'Reservation Request Successfully Registered!'}
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm max-w-sm mx-auto">
                {isAr
                  ? `أهلاً بك يا ${formData.name || 'ضيفنا العزيز'}. تم تسجيل طلب حجزك لـ ${formData.guests} أشخاص في تاريخ ${formData.date} الساعة ${formData.time}. يمكنك أيضاً تأكيده فوراً عبر واتساب.`
                  : `Welcome ${formData.name || 'Dear Guest'}. Your request for ${formData.guests} guests on ${formData.date} at ${formData.time} has been registered in the system. You can also confirm directly via WhatsApp.`}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <MessageSquare className="h-4 w-4 fill-current" />
                <span>{isAr ? 'تأكيد الحجز فوراً عبر واتساب' : 'Confirm via WhatsApp'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 bg-white/10 hover:bg-white/15 text-stone-200 font-semibold rounded-xl text-xs sm:text-sm transition cursor-pointer"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-gold-shiny text-black font-bold border border-amber-200/50">
                <Coffee className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                  <span>{isAr ? 'حجز طاولة في بسكوتشي' : 'Book a Table at Pascucci'}</span>
                  <Sparkles className="h-4 w-4 text-amber-400" />
                </h3>
                <a 
                  href={MAP_LOCATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:underline mt-0.5 flex items-center gap-1 cursor-pointer"
                  title={isAr ? 'عرض الموقع على خرائط جوجل' : 'View on Google Maps'}
                >
                  <MapPin className="h-3 w-3" />
                  <span>{isAr ? 'فرع حي التعاون - شارع عثمان بن عفان، الرياض' : 'Al Taawun Branch, Riyadh'}</span>
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-[#C5A059]" />
                    <span>{isAr ? 'الاسم الكريم *' : 'Your Full Name *'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isAr ? 'مثال: محمد السعيد' : 'e.g. Sultan Al-Qahtani'}
                    className="w-full p-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#C5A059] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-[#C5A059]" />
                    <span>{isAr ? 'رقم الجوال *' : 'Phone Number *'}</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05xxxxxxxx"
                    className="w-full p-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#C5A059] text-xs text-left"
                  />
                </div>
              </div>

              {/* Row 2: Guests, Date, Time */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-300 flex items-center gap-1">
                    <Users className="h-3 w-3 text-[#C5A059]" />
                    <span>{isAr ? 'الضيوف' : 'Guests'}</span>
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full p-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-[#C5A059]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                      <option key={num} value={num.toString()}>
                        {num} {isAr ? 'أشخاص' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-300 flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-[#C5A059]" />
                    <span>{isAr ? 'التاريخ' : 'Date'}</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-300 flex items-center gap-1">
                    <Clock className="h-3 w-3 text-[#C5A059]" />
                    <span>{isAr ? 'الوقت' : 'Time'}</span>
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full p-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* Seating preference */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-300 block">
                  {isAr ? 'نوع الجلسة المفضلة:' : 'Seating Preference:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, seating: 'indoor' })}
                    className={`p-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      formData.seating === 'indoor'
                        ? 'bg-gold-shiny text-black border-amber-300'
                        : 'bg-[#0A0A0A] text-stone-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {isAr ? 'داخلية' : 'Indoor'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, seating: 'outdoor' })}
                    className={`p-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      formData.seating === 'outdoor'
                        ? 'bg-gold-shiny text-black border-amber-300'
                        : 'bg-[#0A0A0A] text-stone-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {isAr ? 'خارجية' : 'Outdoor'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, seating: 'vip' })}
                    className={`p-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      formData.seating === 'vip'
                        ? 'bg-gold-shiny text-black border-amber-300'
                        : 'bg-[#0A0A0A] text-stone-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {isAr ? 'VIP خاصة' : 'VIP Room'}
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-300 block">
                  {isAr ? 'ملاحظات أو مناسبة خاصة (اختياري):' : 'Special Notes or Occasion (Optional):'}
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={isAr ? 'مثال: احتفال ذكرى سنوية، طاولة هادئة...' : 'e.g. Birthday celebration, quiet area...'}
                  className="w-full p-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#C5A059] text-xs"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gold-button text-black font-extrabold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer border border-amber-200/50"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{isAr ? 'تأكيد طلب الحجز' : 'Submit Reservation'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                  title={isAr ? 'حجز مباشر عبر واتساب' : 'Direct WhatsApp Booking'}
                >
                  <MessageSquare className="h-4 w-4 fill-current" />
                  <span>{isAr ? 'عبر واتساب' : 'WhatsApp'}</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}

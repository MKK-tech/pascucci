import React from 'react';
import { 
  Coffee, 
  Calendar, 
  MessageSquare, 
  Settings, 
  Globe, 
  ChevronRight, 
  ChevronLeft,
  MapPin
} from 'lucide-react';
import { SiteSettings } from '../types';

interface MainButtonLandingProps {
  isAr: boolean;
  setIsAr: (val: boolean) => void;
  siteSettings: SiteSettings;
  onOpenMenu: () => void;
  onOpenReservation: () => void;
  onOpenAdmin: () => void;
}

const MAP_LOCATION_URL = 'https://share.google/OrePFtaSlCsgShBab';

export default function MainButtonLanding({
  isAr,
  setIsAr,
  siteSettings,
  onOpenMenu,
  onOpenReservation,
  onOpenAdmin,
}: MainButtonLandingProps) {

  // WhatsApp click handler
  const handleWhatsAppBooking = () => {
    const rawNumber = siteSettings.whatsappNumber.replace(/[^0-9]/g, '') || '966500000000';
    const message = isAr ? siteSettings.whatsappMessageAr : siteSettings.whatsappMessageEn;
    const waUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenMapLocation = () => {
    window.open(MAP_LOCATION_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center bg-[#0A0A0A] overflow-hidden text-stone-100 selection:bg-[#C5A059] selection:text-black">
      
      {/* Background Ambience & Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top Center Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-amber-500/15 via-[#C5A059]/10 to-transparent blur-3xl opacity-70" />
        
        {/* Subtle Luxury Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#C5A059 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
        
        {/* Bottom Ambient Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-t from-amber-600/10 to-transparent blur-3xl opacity-50" />
      </div>

      {/* Top Bar with Language & Admin Controls */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 z-20 flex items-center justify-between">
        
        {/* Brand Subtitle / Badge with Location Link */}
        <a 
          href={MAP_LOCATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group transition no-underline"
          title={isAr ? 'عرض موقع الفرع على خرائط جوجل' : 'View Location on Google Maps'}
        >
          <div className="p-1.5 rounded-lg bg-gold-shiny text-black font-bold shadow-md flex items-center justify-center group-hover:scale-105 transition">
            <MapPin className="h-4 w-4" />
          </div>
          <span className="text-xs font-mono tracking-widest text-gold-sparkle font-semibold uppercase group-hover:underline">
            {isAr ? 'كافيه بسكوتشي • حي التعاون الرياض' : 'Caffè Pascucci • Al Taawun Riyadh'}
          </span>
        </a>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Language Toggle */}
          <button
            onClick={() => setIsAr(!isAr)}
            className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10 text-xs font-mono transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            <Globe className="h-3.5 w-3.5 text-amber-400" />
            <span>{isAr ? 'EN' : 'العربية'}</span>
          </button>

          {/* Admin Dashboard Gear Trigger */}
          <button
            onClick={onOpenAdmin}
            className="p-2 rounded-full bg-white/5 hover:bg-gold-button hover:text-black text-stone-400 border border-white/10 transition cursor-pointer shadow-sm"
            title={isAr ? 'لوحة التحكم (اللوجو، واتساب، القائمة)' : 'Admin Dashboard'}
          >
            <Settings className="h-4 w-4" />
          </button>

        </div>
      </header>

      {/* Centerpiece: STRICT 5cm x 2cm Logo & Grand Action Button */}
      <main className="w-full max-w-3xl mx-auto px-6 py-8 z-10 flex flex-col items-center justify-center text-center my-auto space-y-10 animate-fade-in">
        
        {/* STRICT 5cm × 2cm LOGO CONTAINER */}
        <div className="flex flex-col items-center space-y-4">
          <div
            id="brand-logo-container"
            className="flex items-center justify-center overflow-hidden rounded-xl bg-[#0F0F0F] border border-amber-400/40 p-1.5 shadow-2xl relative gold-glow-subtle transition-transform duration-300 hover:scale-105"
            style={{
              width: siteSettings.logoWidth || '5cm',
              height: siteSettings.logoHeight || '2cm',
              maxWidth: '5cm',
              maxHeight: '2cm',
            }}
          >
            {siteSettings.logoUrl ? (
              <img
                src={siteSettings.logoUrl}
                alt={isAr ? siteSettings.brandNameAr : siteSettings.brandNameEn}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex items-center justify-center gap-2 w-full h-full">
                <Coffee className="h-5 w-5 text-amber-400" />
                <span className="text-xs font-black tracking-widest text-gold-sparkle uppercase">
                  {isAr ? siteSettings.brandNameAr : siteSettings.brandNameEn}
                </span>
              </div>
            )}
          </div>

          {/* Brand Name & Slogan */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isAr ? siteSettings.brandNameAr : siteSettings.brandNameEn}
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 font-medium max-w-md mx-auto">
              {isAr ? siteSettings.sloganAr : siteSettings.sloganEn}
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE SINGLE PRIMARY ACTION BUTTON (الموقع عبارة عن زر فقط)                 */}
        {/* ========================================================================= */}
        <div className="w-full max-w-md px-2">
          <button
            id="main-explore-menu-btn"
            onClick={onOpenMenu}
            className="group relative w-full py-5 px-8 bg-gold-button text-black font-black text-base sm:text-lg rounded-2xl shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer border border-amber-200/60 overflow-hidden flex items-center justify-center gap-3"
          >
            {/* Shimmer Light Sweep Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            <div className="p-1 rounded-lg bg-black/10">
              <Coffee className="h-5 w-5" />
            </div>

            <span className="tracking-wide">
              {isAr ? siteSettings.buttonTextAr : siteSettings.buttonTextEn}
            </span>

            <div className="transition-transform duration-300 group-hover:translate-x-1">
              {isAr ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </div>
          </button>

          <p className="text-[11px] text-stone-500 mt-3 font-mono">
            {isAr ? 'اضغط لاستعراض كافة أصناف القهوة العضوية والحلويات الفاخرة' : 'Click to explore organic coffee, espresso & desserts'}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3 ACTION ICONS: حجز طاولة + حجز واتساب + موقع الكافيه (خرائط جوجل)        */}
        {/* ========================================================================= */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          
          {/* 1. Small Direct Reservation Icon Button (الحجز بأيقونة صغيرة) */}
          <button
            id="small-reservation-icon-btn"
            onClick={onOpenReservation}
            className="group flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-2xl bg-[#0F0F0F] hover:bg-[#1A1A1A] border border-amber-400/40 hover:border-amber-400 text-stone-200 hover:text-white transition shadow-lg cursor-pointer"
            title={isAr ? 'حجز طاولة مباشرة' : 'Direct Table Reservation'}
          >
            <div className="w-8 h-8 rounded-xl bg-gold-shiny text-black flex items-center justify-center shadow-md group-hover:scale-110 transition">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="text-right">
              <span className="text-xs font-bold block text-gold-sparkle leading-tight">
                {isAr ? 'حجز طاولة' : 'Book Table'}
              </span>
              <span className="text-[10px] text-stone-400 block font-mono">
                {isAr ? 'أيقونة حجز مباشر' : 'Fast Booking'}
              </span>
            </div>
          </button>

          {/* 2. Small WhatsApp Reservation Icon Button (ايقونة واتساب للحجز) */}
          <button
            id="small-whatsapp-reservation-icon-btn"
            onClick={handleWhatsAppBooking}
            className="group flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-2xl bg-[#0F0F0F] hover:bg-[#1A1A1A] border border-[#25D366]/40 hover:border-[#25D366] text-stone-200 hover:text-white transition shadow-lg cursor-pointer"
            title={isAr ? 'حجز عبر واتساب' : 'WhatsApp Reservation'}
          >
            <div className="w-8 h-8 rounded-xl bg-[#25D366] text-black flex items-center justify-center shadow-md group-hover:scale-110 transition">
              <MessageSquare className="h-4 w-4 fill-current" />
            </div>
            <div className="text-right">
              <span className="text-xs font-bold block text-[#25D366] leading-tight">
                {isAr ? 'حجز واتساب' : 'WhatsApp'}
              </span>
              <span className="text-[10px] text-stone-400 block font-mono">
                {isAr ? 'محادثة فورية' : 'Instant Chat'}
              </span>
            </div>
          </button>

          {/* 3. Small Location / Map Icon Button (ايقونة موقع الكافيه مع الرابط) */}
          <a
            id="small-location-map-icon-btn"
            href={MAP_LOCATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-2xl bg-[#0F0F0F] hover:bg-[#1A1A1A] border border-blue-400/40 hover:border-blue-400 text-stone-200 hover:text-white transition shadow-lg cursor-pointer no-underline"
            title={isAr ? 'فتح موقع الكافيه في خرائط جوجل' : 'Open Location in Google Maps'}
          >
            <div className="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="text-right">
              <span className="text-xs font-bold block text-blue-400 leading-tight">
                {isAr ? 'موقع الكافيه' : 'Location'}
              </span>
              <span className="text-[10px] text-stone-400 block font-mono">
                {isAr ? 'خرائط جوجل' : 'Google Maps'}
              </span>
            </div>
          </a>

        </div>

      </main>

      {/* Minimal Footer Info with Clickable Location Link */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-6 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-xs border-t border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{isAr ? 'الفرع مفتوح الآن حتى 2:00 صباحاً' : 'Branch Open Daily until 2:00 AM'}</span>
        </div>

        <div className="flex items-center gap-4 text-stone-400 font-mono text-[11px]">
          <a 
            href={MAP_LOCATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition cursor-pointer flex items-center gap-1 text-stone-300 hover:underline"
          >
            <MapPin className="h-3 w-3 text-amber-400" />
            <span>{isAr ? 'الرياض - حي التعاون' : 'Riyadh - Al Taawun'}</span>
          </a>
          <span>•</span>
          <button onClick={onOpenAdmin} className="hover:text-amber-400 transition cursor-pointer">
            {isAr ? 'لوحة التحكم' : 'Admin'}
          </button>
        </div>
      </footer>

    </div>
  );
}

import React from 'react';
import { Coffee, Globe, Mail, MapPin } from 'lucide-react';
import { PASCUCCI_LOCATION, SiteContent } from '../types';

interface FooterProps {
  isAr: boolean;
  onNavigate: (target: 'home' | 'story' | 'menu' | 'reserve' | 'reviews' | 'location') => void;
  siteContent?: SiteContent;
}

export default function Footer({ isAr, onNavigate, siteContent }: FooterProps) {
  const branding = siteContent?.branding;
  const footer = siteContent?.footer;
  const loc = siteContent?.location;

  const brandName = isAr ? (branding?.brandNameAr || 'كافيه بسكوتشي') : (branding?.brandNameEn || 'Caffè Pascucci');
  const about = isAr
    ? (footer?.aboutAr || 'علامة تجارية إيطالية فاخرة. نلتزم في بسكوتشي بأعلى معايير الجودة والتحميص البطيء المتوارث لتقديم كوب قهوة مثالي وعضوي بنسبة 100% في الرياض بحي التعاون.')
    : (footer?.aboutEn || 'Premium Italian brand. At Pascucci, we are committed to the highest quality standards and slow roasting techniques to deliver 100% organic coffee in Riyadh, Al Taawun.');

  const badge = isAr
    ? (footer?.badgeAr || 'تحميص وبن إيطالي عضوي طازج')
    : (footer?.badgeEn || 'Artisanal Slow Roasted in Italy');

  const fullAddress = isAr ? (loc?.fullAddressAr || PASCUCCI_LOCATION.fullAddressAr) : (loc?.fullAddressEn || PASCUCCI_LOCATION.fullAddressEn);
  const mapsUrl = loc?.mapsUrl || PASCUCCI_LOCATION.mapsUrl;
  const email = loc?.email || 'info@pascuccicafe-ksa.com';

  return (
    <footer className="bg-[#0A0A0A] text-stone-100 border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          
          {/* Column 1: Logo & Mission Statement */}
          <div className="md:col-span-5 space-y-4 text-center md:text-right" style={{ textAlign: isAr ? 'right' : 'left' }}>
            <div className="flex items-center gap-3 justify-center md:justify-start cursor-pointer" onClick={() => onNavigate('home')}>
              {branding?.logoUrl ? (
                <div 
                  className="flex items-center justify-center overflow-hidden rounded-xl bg-[#0A0A0A] border border-amber-400/40 p-1 gold-glow-subtle"
                  style={{
                    width: branding.logoWidth || '7cm',
                    height: branding.logoHeight || '4cm',
                    maxWidth: '7cm',
                    maxHeight: '4cm',
                  }}
                >
                  <img
                    src={branding.logoUrl}
                    alt={brandName}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="bg-gold-shiny p-2.5 rounded-xl border border-amber-200/50 shadow-md gold-glow-subtle flex items-center justify-center">
                    <Coffee className="h-5 w-5 text-black" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-sans font-extrabold text-lg tracking-wider text-white uppercase">
                      {branding?.brandNameEn || 'Caffè Pascucci'}
                    </span>
                    <span className="text-xs text-gold-sparkle font-bold">
                      {isAr ? (branding?.brandNameAr || 'كافيه بسكوتشي') : ''}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-normal">
              {about}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3 text-center md:text-right" style={{ textAlign: isAr ? 'right' : 'left' }}>
            <h4 className="text-sm font-extrabold text-white tracking-widest uppercase font-mono">
              {isAr ? 'روابط سريعة' : 'QUICK NAVIGATION'}
            </h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-stone-400">
              <a 
                href="#home" 
                onClick={(e) => { e.preventDefault(); onNavigate('home'); }} 
                className="hover:text-amber-300 transition no-underline cursor-pointer" 
                style={{ textAlign: isAr ? 'right' : 'left' }}
              >
                {isAr ? 'الصفحة الرئيسية' : 'Home'}
              </a>
              <a 
                href="#story" 
                onClick={(e) => { e.preventDefault(); onNavigate('story'); }} 
                className="hover:text-amber-300 transition no-underline cursor-pointer" 
                style={{ textAlign: isAr ? 'right' : 'left' }}
              >
                {isAr ? 'قصتنا الحرفية' : 'Our Story'}
              </a>
              <a 
                href="#menu" 
                onClick={(e) => { e.preventDefault(); onNavigate('menu'); }} 
                className="text-gold-sparkle font-bold hover:underline transition no-underline cursor-pointer flex items-center gap-1" 
                style={{ textAlign: isAr ? 'right' : 'left' }}
              >
                <span>{isAr ? 'قائمة بسكوتشي الكاملة (رابط مباشر)' : 'Full Menu (Direct Link)'}</span>
              </a>
              <a 
                href="#location" 
                onClick={(e) => { e.preventDefault(); onNavigate('location'); }} 
                className="hover:text-amber-300 transition no-underline cursor-pointer" 
                style={{ textAlign: isAr ? 'right' : 'left' }}
              >
                {isAr ? 'موقعنا على الخريطة' : 'Location & Maps'}
              </a>
              <a 
                href="#reserve" 
                onClick={(e) => { e.preventDefault(); onNavigate('reserve'); }} 
                className="hover:text-amber-300 transition no-underline cursor-pointer" 
                style={{ textAlign: isAr ? 'right' : 'left' }}
              >
                {isAr ? 'الحجوزات والضيافة' : 'Reservations'}
              </a>
              <a 
                href="#reviews" 
                onClick={(e) => { e.preventDefault(); onNavigate('reviews'); }} 
                className="hover:text-amber-300 transition no-underline cursor-pointer" 
                style={{ textAlign: isAr ? 'right' : 'left' }}
              >
                {isAr ? 'آراء الضيوف' : 'Guest Reviews'}
              </a>
            </div>
          </div>

          {/* Column 3: Contact & Location info */}
          <div className="md:col-span-4 space-y-3 text-center md:text-right" style={{ textAlign: isAr ? 'right' : 'left' }}>
            <h4 className="text-sm font-extrabold text-white tracking-widest uppercase font-mono">
              {isAr ? 'الموقع وخرائط جوجل' : 'LOCATION & MAPS'}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <a 
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 justify-center md:justify-start hover:text-amber-300 transition group"
              >
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-right" style={{ textAlign: isAr ? 'right' : 'left' }}>
                  <span className="text-stone-200 block font-medium group-hover:text-amber-300">
                    {fullAddress}
                  </span>
                  <span className="text-[11px] text-stone-500 block">
                    {isAr ? 'اضغط لفتح موقع الكافيه في Google Maps' : 'Click to open in Google Maps'}
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Globe className="h-4 w-4 text-amber-400 shrink-0" />
                <span>{isAr ? 'الفريد الإيطالي العريق وعضوية نقية' : 'Authentic Italian Craft & Pure Bio'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} {branding?.brandNameEn || 'Caffè Pascucci'} ({isAr ? (branding?.brandNameAr || 'كافيه بسكوتشي') : 'Pascucci'}). {isAr ? (footer?.copyrightAr || 'جميع الحقوق محفوظة.') : (footer?.copyrightEn || 'All Rights Reserved.')}
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-gold-sparkle font-semibold">{badge}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

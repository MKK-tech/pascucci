import React from 'react';
import { Coffee, Globe, Menu, X, SlidersHorizontal } from 'lucide-react';
import { SiteContent } from '../types';

interface HeaderProps {
  isAr: boolean;
  setIsAr: (val: boolean) => void;
  currentPage: 'home' | 'menu';
  activeSection: string;
  onNavigate: (target: 'home' | 'story' | 'menu' | 'reserve' | 'reviews' | 'location') => void;
  onOpenAdmin: () => void;
  siteContent?: SiteContent;
}

export default function Header({
  isAr,
  setIsAr,
  currentPage,
  activeSection,
  onNavigate,
  onOpenAdmin,
  siteContent,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const branding = siteContent?.branding;
  const brandName = isAr ? (branding?.brandNameAr || 'كافيه بسكوتشي') : (branding?.brandNameEn || 'Caffè Pascucci');
  const tagline = isAr ? (branding?.taglineAr || 'PASCUCCI BIO • إيطاليا') : (branding?.taglineEn || 'PASCUCCI BIO • ITALY');

  const navItems = [
    { id: 'home' as const, nameAr: 'الرئيسية', nameEn: 'Home' },
    { id: 'story' as const, nameAr: 'قصتنا الحرفية', nameEn: 'Our Story' },
    { id: 'menu' as const, nameAr: 'القائمة الكاملة', nameEn: 'Menu' },
    { id: 'location' as const, nameAr: 'الموقع والخرائط', nameEn: 'Location & Maps' },
    { id: 'reserve' as const, nameAr: 'الحجوزات والضيافة', nameEn: 'Reservations' },
    { id: 'reviews' as const, nameAr: 'آراء الضيوف', nameEn: 'Reviews' },
  ];

  const handleItemClick = (id: 'home' | 'story' | 'menu' | 'reserve' | 'reviews' | 'location') => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const isItemActive = (id: string) => {
    if (currentPage === 'menu') {
      return id === 'menu';
    }
    if (id === 'home') {
      return activeSection === 'hero' || activeSection === 'home' || !activeSection;
    }
    return activeSection === id;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10 text-stone-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[5rem] py-2">
          
          {/* Logo Section with 7cm width and 4cm height support */}
          <a
            href="#home"
            className="flex items-center gap-3 cursor-pointer select-none group no-underline shrink-0"
            onClick={(e) => {
              e.preventDefault();
              handleItemClick('home');
            }}
          >
            {branding?.logoUrl ? (
              <div 
                className="flex items-center justify-center overflow-hidden rounded-xl bg-[#0A0A0A] border border-amber-400/40 p-1 gold-glow-subtle transition-transform group-hover:scale-105"
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
                <div 
                  className="bg-gold-shiny rounded-xl shadow-lg flex items-center justify-center border border-amber-200/50 group-hover:scale-105 transition-transform gold-glow-subtle shrink-0"
                  style={{
                    width: branding?.logoWidth || '7cm',
                    height: branding?.logoHeight || '4cm',
                    maxWidth: '7cm',
                    maxHeight: '4cm',
                  }}
                >
                  <div className="flex flex-col items-center justify-center p-2 text-center">
                    <Coffee className="h-6 w-6 text-black mb-1" />
                    <span className="text-[11px] font-sans font-black text-black leading-tight uppercase tracking-wider">
                      {branding?.brandNameEn || 'PASCUCCI'}
                    </span>
                    <span className="text-[9px] font-bold text-stone-900 leading-none mt-0.5">
                      {branding?.brandNameAr || 'بسكوتشي'}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col hidden sm:flex">
                  <div className="flex items-baseline gap-2">
                    <span className="font-sans font-extrabold text-base sm:text-lg tracking-wider text-white uppercase">
                      {branding?.brandNameEn || 'Caffè Pascucci'}
                    </span>
                    <span className="text-xs text-gold-sparkle font-extrabold tracking-wide">
                      {isAr ? (branding?.brandNameAr || 'بسكوتشي') : ''}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-amber-200/70 font-semibold">
                    {tagline}
                  </span>
                </div>
              </div>
            )}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const active = isItemActive(item.id);
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(item.id);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 cursor-pointer no-underline ${
                    active
                      ? 'text-amber-300 bg-amber-500/10 font-bold border border-amber-500/30 shadow-inner gold-glow-subtle'
                      : 'text-stone-300 hover:text-amber-200 hover:bg-white/5'
                  }`}
                  style={{ direction: isAr ? 'rtl' : 'ltr' }}
                >
                  {isAr ? item.nameAr : item.nameEn}
                </a>
              );
            })}
          </nav>

          {/* Right Side Options (Admin + Language Toggle + Call to Action) */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Admin Dashboard Trigger */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-400/40 bg-gradient-to-r from-amber-500/15 to-yellow-600/15 hover:from-amber-500/25 hover:to-yellow-600/25 text-xs font-semibold text-amber-300 transition duration-200 cursor-pointer gold-glow-subtle"
              title={isAr ? 'لوحة تحكم القائمة وإضافة الأصناف' : 'Menu Items Dashboard'}
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-amber-400" />
              <span>{isAr ? 'لوحة التحكم' : 'Admin'}</span>
            </button>

            {/* Language Switch */}
            <button
              onClick={() => setIsAr(!isAr)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-stone-300 hover:text-white transition duration-200 cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5 text-amber-400" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>

            {currentPage === 'home' ? (
              <a
                href="#menu"
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick('menu');
                }}
                className="px-4 py-2 text-xs font-extrabold text-black bg-gold-button rounded-lg shadow-md transition duration-200 transform hover:scale-[1.02] cursor-pointer no-underline inline-block border border-amber-200/50"
              >
                {isAr ? 'تصفح القائمة' : 'Explore Menu'}
              </a>
            ) : (
              <a
                href="#reserve"
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick('reserve');
                }}
                className="px-4 py-2 text-xs font-extrabold text-black bg-gold-button rounded-lg shadow-md transition duration-200 transform hover:scale-[1.02] cursor-pointer no-underline inline-block border border-amber-200/50"
              >
                {isAr ? 'احجز طاولة' : 'Book a Table'}
              </a>
            )}
          </div>

          {/* Mobile Hamburguer Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-xs font-bold flex items-center gap-1"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>

            <button
              onClick={() => setIsAr(!isAr)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-stone-300 transition duration-200 cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>{isAr ? 'EN' : 'عربي'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-white/5 transition duration-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-b border-white/10 px-4 pt-2 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const active = isItemActive(item.id);
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item.id);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 flex justify-between items-center cursor-pointer no-underline ${
                  active
                    ? 'bg-amber-500/15 text-amber-300 font-bold border-r-4 border-amber-400'
                    : 'text-stone-300 hover:bg-white/5'
                }`}
                style={{ direction: isAr ? 'rtl' : 'ltr' }}
              >
                <span>{isAr ? item.nameAr : item.nameEn}</span>
                <span className="text-amber-400 text-xs">&rarr;</span>
              </a>
            );
          })}
          
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-3 text-center font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-xl transition flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>{isAr ? 'لوحة تحكم وإدارة القائمة' : 'Menu Management Dashboard'}</span>
            </button>

            {currentPage === 'home' ? (
              <a
                href="#menu"
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick('menu');
                }}
                className="w-full py-3 text-center font-extrabold text-black bg-gold-button rounded-xl shadow-md transition cursor-pointer no-underline block border border-amber-200/50"
              >
                {isAr ? 'تصفح قائمة بسكوتشي' : 'Browse Pascucci Menu'}
              </a>
            ) : (
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick('home');
                }}
                className="w-full py-3 text-center font-bold text-stone-200 bg-white/10 hover:bg-white/20 rounded-xl shadow-md transition cursor-pointer no-underline block"
              >
                {isAr ? 'العودة للصفحة الرئيسية' : 'Return to Home'}
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

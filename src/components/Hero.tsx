import React from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Calendar } from 'lucide-react';
import { SiteContent } from '../types';

interface HeroProps {
  isAr: boolean;
  onOpenMenu: () => void;
  scrollToSection: (id: string) => void;
  siteContent?: SiteContent;
}

export default function Hero({ isAr, onOpenMenu, scrollToSection, siteContent }: HeroProps) {
  const hero = siteContent?.hero;
  const heroImage = hero?.heroImage || '/src/assets/images/pascucci_hero_banner_1782844430910.jpg';

  const badge = isAr 
    ? (hero?.badgeAr || 'قهوة إيطالية أصيلة وعضوية 100%') 
    : (hero?.badgeEn || '100% Authentic Organic Italian Coffee');

  const title = isAr
    ? (hero?.titleAr || 'كافيه بسكوتشي: فن الإسبريسو بلمسة عصرية فاخرة')
    : (hero?.titleEn || 'Caffè Pascucci: Italian Espresso with a Luxury Redesign');

  const subtitle = isAr
    ? (hero?.subtitleAr || 'نصنع تجارب استثنائية في بسكوتشي من حبوب البن العضوية الفاخرة، المحمصة ببطء في إيطاليا والمقدمة بشغف في الرياض بحي التعاون. تذوق الفرق وعش فخامة التفاصيل.')
    : (hero?.subtitleEn || 'We craft extraordinary experiences from premium organic coffee beans, slow-roasted in Italy and served with passion in Riyadh, Al Taawun. Taste the difference and live the luxury of details.');

  const btnMenuText = isAr
    ? (hero?.btnMenuAr || 'تصفح القائمة الكاملة')
    : (hero?.btnMenuEn || 'Explore Full Menu');

  const btnReserveText = isAr
    ? (hero?.btnReserveAr || 'احجز طاولتك الفاخرة')
    : (hero?.btnReserveEn || 'Book a Luxury Table');

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A] pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Caffè Pascucci Luxury Italian Interior"
          className="w-full h-full object-cover object-center transform scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/70" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0A0A0A]/40 to-[#0A0A0A]/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-500/20 to-amber-500/15 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold tracking-wider uppercase mb-8 backdrop-blur-md gold-glow-subtle">
          <Sparkles className="h-4 w-4 animate-spin text-amber-300" />
          <span className="text-gold-sparkle font-extrabold">{badge}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold text-white tracking-tight leading-none mb-6">
          {title}
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-stone-300 leading-relaxed mb-10 font-normal">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href="#menu"
            onClick={(e) => {
              e.preventDefault();
              onOpenMenu();
            }}
            className="w-full sm:w-auto px-9 py-4 bg-gold-button text-black font-extrabold rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-[1.03] flex items-center justify-center gap-2 group cursor-pointer no-underline border border-amber-200/60"
          >
            <span className="tracking-wide">{btnMenuText}</span>
            {isAr ? (
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            )}
          </a>

          <a
            href="#reserve"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('reserve');
            }}
            className="w-full sm:w-auto px-8 py-4 bg-[#0F0F0F]/90 hover:bg-[#1A1A1A] border border-amber-500/30 hover:border-amber-400/60 text-stone-200 hover:text-amber-200 font-bold rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 transform hover:scale-[1.03] flex items-center justify-center gap-2 cursor-pointer no-underline gold-glow-subtle"
          >
            <Calendar className="h-4 w-4 text-amber-400" />
            <span>{btnReserveText}</span>
          </a>
        </div>

        {/* Quick Badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-20 pt-8 border-t border-white/10 max-w-3xl mx-auto text-center">
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-gold-sparkle">
              {hero?.stat1Value || '100%'}
            </span>
            <span className="text-xs text-stone-400 font-mono tracking-wider uppercase">
              {isAr ? (hero?.stat1LabelAr || 'بن إيطالي أصيل') : (hero?.stat1LabelEn || 'Authentic Italian Beans')}
            </span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-white">
              {hero?.stat2Value || 'BIO'}
            </span>
            <span className="text-xs text-stone-400 font-mono tracking-wider uppercase">
              {isAr ? (hero?.stat2LabelAr || 'عضوي معتمد') : (hero?.stat2LabelEn || 'Certified Organic')}
            </span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-gold-sparkle">
              {hero?.stat3Value || '4.9★'}
            </span>
            <span className="text-xs text-stone-400 font-mono tracking-wider uppercase">
              {isAr ? (hero?.stat3LabelAr || 'تقييم الضيوف') : (hero?.stat3LabelEn || 'Guest Rating')}
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Wave/Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0F0F0F] to-transparent pointer-events-none" />
    </section>
  );
}

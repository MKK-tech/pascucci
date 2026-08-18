import React from 'react';
import { MapPin, Navigation, Clock, Phone, ExternalLink, Check, Sparkles } from 'lucide-react';
import { PASCUCCI_LOCATION, SiteContent } from '../types';

interface LocationProps {
  isAr: boolean;
  siteContent?: SiteContent;
}

export default function LocationSection({ isAr, siteContent }: LocationProps) {
  const [copied, setCopied] = React.useState(false);

  const loc = siteContent?.location;
  const badge = isAr ? (loc?.badgeAr || 'موقعنا والوصول إلينا') : (loc?.badgeEn || 'OUR LOCATION & MAPS');
  const title = isAr ? (loc?.titleAr || 'زورونا في حي التعاون - شارع عثمان بن عفان') : (loc?.titleEn || 'Visit Us at Al Taawun - Othman Bin Affan');
  const subtitle = isAr ? (loc?.subtitleAr || 'يسعدنا استقبالكم في فرعنا المميز للاستمتاع بأجود أنواع القهوة الإيطالية العضوية والحلويات الفاخرة.') : (loc?.subtitleEn || 'We look forward to welcoming you to enjoy the finest organic Italian coffee and artisanal pastries.');
  const branchName = isAr ? (loc?.branchNameAr || PASCUCCI_LOCATION.googleMapsTitle) : (loc?.branchNameEn || 'Pascucci Cafe - Al Taawun');
  const district = isAr ? (loc?.districtAr || 'حي التعاون') : (loc?.districtEn || 'Al Taawun District');
  const street = isAr ? (loc?.streetAr || 'شارع عثمان بن عفان') : (loc?.streetEn || 'Othman Bin Affan Road');
  const city = isAr ? (loc?.cityAr || 'الرياض') : (loc?.cityEn || 'Riyadh');
  const fullAddress = isAr ? (loc?.fullAddressAr || PASCUCCI_LOCATION.fullAddressAr) : (loc?.fullAddressEn || PASCUCCI_LOCATION.fullAddressEn);
  const hours = isAr ? (loc?.hoursAr || PASCUCCI_LOCATION.hoursAr) : (loc?.hoursEn || PASCUCCI_LOCATION.hoursEn);
  const phone = loc?.phone || '+966 50 000 0000';
  const email = loc?.email || 'info@pascuccicafe-ksa.com';
  const mapsUrl = loc?.mapsUrl || PASCUCCI_LOCATION.mapsUrl;
  const embedUrl = loc?.embedUrl || PASCUCCI_LOCATION.embedUrl;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="location" className="py-24 bg-[#0A0A0A] border-t border-white/10 text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-500/20 to-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-mono tracking-widest uppercase gold-glow-subtle">
            <MapPin className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-gold-sparkle font-bold">{badge}</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          <p className="max-w-xl mx-auto text-stone-400 text-sm sm:text-base">
            {subtitle}
          </p>
          <div className="h-1.5 w-20 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600 rounded-full mx-auto gold-glow-subtle" />
        </div>

        {/* Location Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          
          {/* Information & Details Card */}
          <div className="lg:col-span-5 bg-[#0F0F0F] border border-amber-500/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl gold-glow-subtle">
            <div className="space-y-6">
              
              {/* Badge & Title */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-gold-sparkle uppercase tracking-wider mb-2 font-bold">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  <span>{isAr ? 'المقر الرئيسي بالرياض' : 'Riyadh Main Location'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {branchName}
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm mt-1">
                  {isAr ? 'كافيه بسكوتشي الإيطالي' : 'Caffè Pascucci Italian Coffee'}
                </p>
              </div>

              <div className="h-[1px] bg-white/10" />

              {/* Specific Details */}
              <div className="space-y-4 text-sm text-stone-300">
                {/* Street / District */}
                <div className="flex items-start gap-3.5">
                  <div className="bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border border-amber-400/30 p-2.5 rounded-xl text-amber-300 shrink-0 mt-0.5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 font-mono block">
                      {isAr ? 'العنوان التفصيلي:' : 'Address:'}
                    </span>
                    <strong className="text-stone-100 block text-base mt-0.5">
                      {district} - {street}
                    </strong>
                    <span className="text-xs text-stone-400">
                      {city}
                    </span>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border border-amber-400/30 p-2.5 rounded-xl text-amber-300 shrink-0 mt-0.5">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 font-mono block">
                      {isAr ? 'أوقات العمل اليومية:' : 'Working Hours:'}
                    </span>
                    <strong className="text-stone-100 block text-sm sm:text-base mt-0.5">
                      {hours}
                    </strong>
                    <span className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      {isAr ? 'مفتوح لاستقبالكم الآن' : 'Open for Dine-in & Takeaway'}
                    </span>
                  </div>
                </div>

                {/* Phone & Inquiries */}
                <div className="flex items-start gap-3.5">
                  <div className="bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border border-amber-400/30 p-2.5 rounded-xl text-amber-300 shrink-0 mt-0.5">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 font-mono block">
                      {isAr ? 'الاستفسارات والخدمة:' : 'Inquiries & Support:'}
                    </span>
                    <span className="text-stone-200 block text-sm font-mono mt-0.5" dir="ltr">
                      {email}
                    </span>
                    {phone && (
                      <span className="text-stone-400 block text-xs font-mono mt-0.5" dir="ltr">
                        {phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Buttons / Actions */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-gold-button text-black font-extrabold rounded-xl shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer border border-amber-200/50"
              >
                <Navigation className="h-4 w-4" />
                <span>{isAr ? 'فتح الموقع في Google Maps' : 'Open in Google Maps'}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <button
                onClick={handleCopyAddress}
                className="w-full py-3 px-4 bg-[#0A0A0A] hover:bg-white/5 border border-white/10 text-stone-300 hover:text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400">{isAr ? 'تم نسخ العنوان بنجاح!' : 'Address Copied!'}</span>
                  </>
                ) : (
                  <>
                    <span>{isAr ? 'نسخ العنوان بالكامل' : 'Copy Full Address'}</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Interactive Map Embed Container */}
          <div className="lg:col-span-7 bg-[#0F0F0F] border border-amber-500/20 rounded-3xl overflow-hidden shadow-2xl relative min-h-[380px] sm:min-h-[440px] flex flex-col">
            
            {/* Map Top Bar */}
            <div className="p-4 bg-[#0A0A0A]/90 border-b border-white/10 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-xs font-bold text-stone-200">
                  {district} - {street}
                </span>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-amber-400 hover:underline flex items-center gap-1 font-bold"
              >
                <span>{isAr ? 'عرض خريطة أكبر' : 'View Larger Map'}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Embedded Interactive Map */}
            <div className="relative flex-1 w-full h-full min-h-[320px] bg-stone-900">
              <iframe
                title="Pascucci Cafe Taawun Riyadh Location"
                src={embedUrl}
                width="100%"
                height="100%"
                className="w-full h-full border-0 absolute inset-0 grayscale-[25%] contrast-[110%]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              {/* Floating Location Overlay Badge */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#0A0A0A]/95 border border-amber-400/40 p-3.5 rounded-2xl shadow-2xl backdrop-blur-md max-w-xs pointer-events-auto gold-glow-subtle">
                <div className="flex items-center gap-2.5">
                  <div className="bg-gold-shiny p-2 rounded-xl text-black shrink-0 border border-amber-200/50">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">
                      {branchName}
                    </h4>
                    <p className="text-[10px] text-amber-200/80 mt-0.5">
                      {district}, {street}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

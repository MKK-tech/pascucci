import React from 'react';
import { MenuItem, SiteSettings, MenuCategory, DEFAULT_CATEGORIES } from '../types';
import { Search, Sparkles, AlertCircle, Heart, X, Check, ArrowRight, ArrowLeft, Coffee, Calendar, Home, SlidersHorizontal, MessageSquare, MapPin, Globe } from 'lucide-react';

interface MenuProps {
  isAr: boolean;
  setIsAr?: (val: boolean) => void;
  menuItems: MenuItem[];
  categories?: MenuCategory[];
  onBack?: () => void;
  onReserve?: () => void;
  onOpenAdmin?: () => void;
  siteSettings?: SiteSettings;
}

const MAP_LOCATION_URL = 'https://share.google/OrePFtaSlCsgShBab';

export default function Menu({ isAr, setIsAr, menuItems, categories = DEFAULT_CATEGORIES, onBack, onReserve, onOpenAdmin, siteSettings }: MenuProps) {
  const [activeCategory, setActiveCategory] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedItem, setSelectedItem] = React.useState<MenuItem | null>(null);
  const [favorites, setFavorites] = React.useState<string[]>([]);

  const handleWhatsAppBooking = () => {
    const rawNumber = siteSettings?.whatsappNumber.replace(/[^0-9]/g, '') || '966500000000';
    const message = isAr 
      ? (siteSettings?.whatsappMessageAr || 'السلام عليكم، أود حجز طاولة في كافيه بسكوتشي.')
      : (siteSettings?.whatsappMessageEn || 'Hello, I would like to reserve a table at Caffe Pascucci.');
    const waUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const displayCategories = [
    { id: 'all', nameAr: 'الكل', nameEn: 'All Items' },
    ...categories,
  ];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.nameAr.toLowerCase().includes(query) ||
      item.nameEn.toLowerCase().includes(query) ||
      item.descriptionAr.toLowerCase().includes(query) ||
      item.descriptionEn.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const getIngredients = (item: MenuItem) => {
    if (item.category === 'specialty' || item.category === 'espresso') {
      return isAr 
        ? ['حبوب بن بسكوتشي العضوية (أرابيكا 100%)', 'حليب طازج مبخر', 'رغوة حليب كريمية دافئة'] 
        : ['Organic Pascucci coffee beans (100% Arabica)', 'Fresh steamed milk', 'Warm creamy milk foam'];
    }
    if (item.category === 'bakery') {
      return isAr
        ? ['دقيق إيطالي ممتاز النوع 00', 'زبدة طبيعية نقية', 'كريمة الماسكاربوني', 'شوكولاتة داكنة 70%']
        : ['Premium Italian flour Type 00', 'Pure natural butter', 'Fresh mascarpone cheese', '70% Dark chocolate'];
    }
    return isAr
      ? ['خبز العجين المخمر (ساوردو)', 'زيت زيتون بكر ممتاز', 'أعشاب إيطالية طازجة']
      : ['Freshly baked sourdough bread', 'Extra virgin olive oil', 'Fresh Italian organic herbs'];
  };

  const getAllergens = (item: MenuItem) => {
    const list = [];
    if (item.id.includes('croissant') || item.id === 'tiramisu' || item.id === 'cannoli' || item.id === 'halloumi_panini') {
      list.push(isAr ? 'يحتوي على الجلوتين' : 'Contains Gluten');
    }
    if (item.id.includes('latte') || item.id === 'cappuccino' || item.id === 'flat_white' || item.id === 'macchiato' || item.id === 'pascuccino' || item.id === 'gianduia' || item.id === 'tiramisu' || item.id === 'cannoli' || item.id === 'halloumi_panini' || item.id === 'turkey_croissant') {
      list.push(isAr ? 'يحتوي على منتجات الألبان' : 'Contains Dairy');
    }
    if (item.id.includes('pistachio') || item.id === 'gianduia' || item.id === 'tiramisu' || item.id === 'cannoli') {
      list.push(isAr ? 'يحتوي على المكسرات' : 'Contains Nuts / Peanuts');
    }
    return list.length > 0 ? list : [isAr ? 'خالٍ من مسببات الحساسية الشائعة' : 'Free from major allergens'];
  };

  return (
    <div id="menu-page" className="pt-28 pb-24 bg-[#0A0A0A] text-stone-100 min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dedicated Page Top Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          <div className="flex flex-wrap items-center gap-3">
            {onBack && (
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  onBack();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F0F0F] hover:bg-white/5 border border-white/10 text-stone-300 hover:text-white transition-all text-sm font-semibold cursor-pointer group no-underline"
              >
                {isAr ? (
                  <ArrowRight className="h-4 w-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                ) : (
                  <ArrowLeft className="h-4 w-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
                )}
                <span>{isAr ? 'العودة للصفحة الرئيسية' : 'Back to Home'}</span>
              </a>
            )}

            {setIsAr && (
              <button
                onClick={() => setIsAr(!isAr)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0F0F0F] hover:bg-white/5 border border-white/10 text-stone-300 hover:text-white transition-all text-xs sm:text-sm font-mono cursor-pointer"
                title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
              >
                <Globe className="h-4 w-4 text-amber-400" />
                <span>{isAr ? 'EN' : 'العربية'}</span>
              </button>
            )}

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/15 to-yellow-600/15 hover:from-amber-500/25 hover:to-yellow-600/25 border border-amber-400/40 text-amber-300 transition-all text-xs sm:text-sm font-bold cursor-pointer gold-glow-subtle"
              >
                <SlidersHorizontal className="h-4 w-4 text-amber-400" />
                <span>{isAr ? 'لوحة التحكم' : 'Admin Panel'}</span>
              </button>
            )}
          </div>

          {/* Quick Action Icons: Location, WhatsApp, and Direct Reservation */}
          <div className="flex items-center gap-2">
            {/* Map Location Link */}
            <a
              href={MAP_LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#0F0F0F] hover:bg-[#1A1A1A] border border-blue-400/40 hover:border-blue-400 text-blue-400 font-bold shadow-md hover:scale-105 transition cursor-pointer flex items-center gap-1.5 text-xs no-underline"
              title={isAr ? 'موقع الفرع على خرائط جوجل' : 'Location on Google Maps'}
            >
              <MapPin className="h-4 w-4 text-blue-400" />
              <span className="hidden sm:inline font-bold">{isAr ? 'الموقع' : 'Location'}</span>
            </a>

            {onReserve && (
              <button
                onClick={onReserve}
                className="p-2.5 rounded-xl bg-gold-shiny text-black font-bold shadow-md hover:scale-105 transition cursor-pointer flex items-center gap-1.5 text-xs"
                title={isAr ? 'حجز طاولة' : 'Direct Booking'}
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline font-bold">{isAr ? 'حجز طاولة' : 'Reserve'}</span>
              </button>
            )}

            <button
              onClick={handleWhatsAppBooking}
              className="p-2.5 rounded-xl bg-[#25D366] text-black font-bold shadow-md hover:scale-105 transition cursor-pointer flex items-center gap-1.5 text-xs"
              title={isAr ? 'حجز عبر واتساب' : 'WhatsApp Booking'}
            >
              <MessageSquare className="h-4 w-4 fill-current" />
              <span className="hidden sm:inline font-bold">{isAr ? 'واتساب' : 'WhatsApp'}</span>
            </button>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center space-y-4 mb-14" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-500/20 to-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-mono tracking-widest uppercase gold-glow-subtle">
            <Coffee className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-gold-sparkle font-bold">{isAr ? 'قائمة المأكولات والمشروبات الحرفية' : 'THE ARTISANAL MENU'}</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {isAr ? (
              <>استكشف نكهات <span className="text-gold-sparkle">بسكوتشي الإيطالية</span></>
            ) : (
              <>Explore <span className="text-gold-sparkle">Pascucci Italian Flavors</span></>
            )}
          </h1>
          <p className="max-w-2xl mx-auto text-stone-400 text-sm sm:text-base font-normal">
            {isAr 
              ? 'تصفح تشكيلتنا الاستثنائية المحضرة بكل شغف من حبوب البن العضوية 100% والمكونات التقليدية المستوردة مباشرة من إيطاليا.' 
              : 'Browse our signature collections crafted with love from 100% organic beans and authentic Italian ingredients.'}
          </p>
          <div className="h-1.5 w-20 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600 rounded-full mx-auto gold-glow-subtle" />
        </div>

        {/* Search and Filters Layout */}
        <div className="flex flex-col gap-6 mb-12 items-center justify-between" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <span className={`absolute inset-y-0 ${isAr ? 'right-4' : 'left-4'} flex items-center text-stone-500 pointer-events-none`}>
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder={isAr ? 'ابحث بالاسم، المكونات، أو النوع...' : 'Search espresso, croissants, pastries...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-3.5 ${isAr ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} bg-[#0F0F0F] border border-white/10 rounded-2xl text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all text-sm`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className={`absolute inset-y-0 ${isAr ? 'left-4' : 'right-4'} flex items-center text-stone-400 hover:text-stone-200 cursor-pointer`}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Tabs Scroll */}
          <div className="w-full overflow-x-auto pb-2 scrollbar-none flex gap-2 justify-start md:justify-center">
            {displayCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gold-button text-black font-extrabold shadow-lg border border-amber-200/50'
                    : 'bg-[#0F0F0F] border border-white/10 text-stone-400 hover:text-white hover:border-amber-400/30'
                }`}
              >
                {isAr ? cat.nameAr : cat.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#0F0F0F]/40 rounded-3xl border border-white/10 max-w-md mx-auto">
            <AlertCircle className="h-12 w-12 text-stone-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-stone-300">
              {isAr ? 'لا يوجد نتائج تطابق بحثك' : 'No Items Found'}
            </h3>
            <p className="text-stone-500 text-xs mt-1">
              {isAr ? 'حاول تغيير كلمة البحث أو فئة الفرز.' : 'Try adjusting your search keywords or category.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isFav = favorites.includes(item.id);
              const itemImage = item.image || `https://picsum.photos/seed/${item.id}/600/450`;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group rounded-3xl bg-[#0F0F0F] border border-white/10 hover:border-amber-400/50 p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
                  style={{ direction: isAr ? 'rtl' : 'ltr' }}
                >
                  <div className="space-y-4">
                    {/* Item Image with hover zoom */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#0A0A0A] border border-white/10">
                      <img
                        src={itemImage}
                        alt={isAr ? item.nameAr : item.nameEn}
                        className="w-full h-full object-cover object-center transform group-hover:scale-[1.04] transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent opacity-60" />

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => toggleFavorite(item.id, e)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                          isFav ? 'bg-gold-shiny text-black' : 'bg-stone-900/70 text-stone-400 hover:text-amber-300'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>

                      {/* Bio Badge / Popular Badges */}
                      <div className={`absolute bottom-3 ${isAr ? 'right-3' : 'left-3'} flex flex-wrap gap-1.5`}>
                        {item.isOrganic && (
                          <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-emerald-600 text-white rounded-full shadow-md flex items-center gap-1">
                            <span className="h-1.5 w-1.5 bg-white rounded-full animate-ping" />
                            {isAr ? 'عضوي' : 'BIO'}
                          </span>
                        )}
                        {item.isPopular && (
                          <span className="px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase bg-gold-button text-black rounded-full shadow-md flex items-center gap-1 border border-amber-200/50">
                            <Sparkles className="h-2.5 w-2.5" />
                            {isAr ? 'مفضل' : 'Best Seller'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2 pt-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                          {isAr ? item.nameAr : item.nameEn}
                        </h3>
                        <span className="text-gold-sparkle font-extrabold text-lg tracking-tight whitespace-nowrap">
                          {item.price} <span className="text-xs font-mono">{isAr ? 'ر.س' : 'SAR'}</span>
                        </span>
                      </div>
                      <p className="text-stone-400 text-xs sm:text-sm leading-relaxed line-clamp-2 font-normal">
                        {isAr ? item.descriptionAr : item.descriptionEn}
                      </p>
                    </div>
                  </div>

                  {/* Order / Learn More footer button */}
                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-stone-500 tracking-wider">
                      {isAr ? `فئة: ${categories.find(c => c.id === item.category)?.nameAr}` : `Category: ${item.category}`}
                    </span>
                    <button className="text-xs text-amber-400 font-bold group-hover:text-amber-300 flex items-center gap-1 transition-colors">
                      <span>{isAr ? 'التفاصيل والمكونات' : 'Details & Ingredients'}</span>
                      <span className="text-amber-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dynamic Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/85 backdrop-blur-lg animate-fade-in">
            <div 
              className="relative w-full max-w-2xl bg-[#0F0F0F] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto gold-glow-subtle"
              style={{ direction: isAr ? 'rtl' : 'ltr' }}
            >
              {/* Image Header banner inside popup */}
              <div className="relative h-64 sm:h-80 bg-[#0A0A0A]">
                <img
                  src={selectedItem.image || `https://picsum.photos/seed/${selectedItem.id}/800/600`}
                  alt={isAr ? selectedItem.nameAr : selectedItem.nameEn}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0A0A0A]/20 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-stone-900/80 hover:bg-gold-button hover:text-black text-stone-300 transition-all shadow-md cursor-pointer border border-white/10"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <div>
                    <span className="px-2.5 py-1 bg-gold-button text-black text-[10px] font-extrabold rounded-full uppercase tracking-widest mb-2 inline-block border border-amber-200/50">
                      {isAr ? 'مشروب إيطالي فاخر' : 'Premium Selection'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {isAr ? selectedItem.nameAr : selectedItem.nameEn}
                    </h3>
                  </div>
                  <span className="bg-[#0F0F0F]/95 border border-amber-500/40 px-4 py-2 rounded-xl text-gold-sparkle font-black text-xl sm:text-2xl tracking-tight shadow-xl">
                    {selectedItem.price} <span className="text-xs font-mono">{isAr ? 'ر.س' : 'SAR'}</span>
                  </span>
                </div>
              </div>

              {/* Main Info */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-mono text-amber-400/80 uppercase tracking-widest mb-1 font-bold">
                    {isAr ? 'الوصف العطري والنكهة' : 'FLAVOR PROFILE & DESCRIPTION'}
                  </h4>
                  <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
                    {isAr ? selectedItem.descriptionAr : selectedItem.descriptionEn}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                  {/* Ingredients Column */}
                  <div>
                    <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-3 font-semibold">
                      {isAr ? 'المكونات الأساسية' : 'Core Ingredients'}
                    </h4>
                    <ul className="space-y-2 text-stone-300 text-sm">
                      {getIngredients(selectedItem).map((ing, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Allergen list */}
                  <div>
                    <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-3 font-semibold">
                      {isAr ? 'إرشادات الحساسية' : 'Allergen Advisory'}
                    </h4>
                    <div className="space-y-2">
                      {getAllergens(selectedItem).map((all, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-stone-400 text-xs">
                          <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                          <span>{all}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action button inside modal */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-stone-400 text-xs text-center sm:text-right">
                    {isAr 
                      ? 'متاح للطلب والاستمتاع داخل مقاهينا أو عبر الحجز المسبق.' 
                      : 'Available for dine-in at our café or via reservation.'}
                  </div>
                  {onReserve && (
                    <button
                      onClick={() => {
                        setSelectedItem(null);
                        onReserve();
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-gold-button text-black font-extrabold rounded-xl transition shadow-lg text-sm flex items-center justify-center gap-2 cursor-pointer border border-amber-200/50"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>{isAr ? 'احجز طاولة لتذوق هذا الصنف' : 'Reserve a Table to Taste'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

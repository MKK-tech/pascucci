export interface MenuCategory {
  id: string;
  nameAr: string;
  nameEn: string;
  icon?: string;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface CustomerReservation {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  seating: 'indoor' | 'outdoor' | 'vip';
  notes?: string;
  status: ReservationStatus;
  createdAt: string;
}

export const DEFAULT_RESERVATIONS: CustomerReservation[] = [
  {
    id: 'res_01',
    name: 'سلطان القحطاني',
    phone: '0501234567',
    guests: 4,
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    seating: 'indoor',
    notes: 'طاولة بجانب النافذة، احتفال تخرج بسيط',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'res_02',
    name: 'سارة الشمري',
    phone: '0559876543',
    guests: 2,
    date: new Date().toISOString().split('T')[0],
    time: '21:30',
    seating: 'outdoor',
    notes: 'جلسة خارجية رايقة مع قهوة مختصة وتيراميسو',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: 'res_03',
    name: 'عبدالله العتيبي',
    phone: '0561122334',
    guests: 6,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '18:30',
    seating: 'vip',
    notes: 'اجتماع عمل واحتساء قهوة بسكوتشي العضوية',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'res_04',
    name: 'نورة الدوسري',
    phone: '0543322110',
    guests: 3,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    time: '19:00',
    seating: 'indoor',
    notes: 'طلب حلويات خاصة مع الإسبريسو',
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

export const DEFAULT_CATEGORIES: MenuCategory[] = [
  { id: 'specialty', nameAr: 'المبتكرة الحصرية (Signature)', nameEn: 'Signature Specialty' },
  { id: 'espresso', nameAr: 'إسبريسو وساخن (Hot & Espresso)', nameEn: 'Espresso & Hot' },
  { id: 'cold', nameAr: 'مشروبات باردة ومثلجة (Cold)', nameEn: 'Cold & Frappes' },
  { id: 'bakery', nameAr: 'حلويات ومخبوزات (Bakery)', nameEn: 'Bakery & Desserts' },
  { id: 'mains', nameAr: 'ساندوتشات ومأكولات (Mains)', nameEn: 'Savory & Mains' },
];

export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  category: string;
  image?: string;
  tags?: string[];
  isOrganic?: boolean;
  isPopular?: boolean;
}

export interface Review {
  id: string;
  authorAr: string;
  authorEn: string;
  rating: number;
  commentAr: string;
  commentEn: string;
  date: string;
}

export interface ProfilerQuestion {
  id: number;
  questionAr: string;
  questionEn: string;
  options: {
    textAr: string;
    textEn: string;
    score: Record<string, number>;
  }[];
}

export interface Branch {
  id: string;
  nameAr: string;
  nameEn: string;
  addressAr: string;
  addressEn: string;
  phone: string;
  hoursAr: string;
  hoursEn: string;
  mapUrl: string;
  mapEmbedUrl: string;
}

export interface SiteSettings {
  logoUrl: string;
  logoWidth: string; // '5cm'
  logoHeight: string; // '2cm'
  brandNameAr: string;
  brandNameEn: string;
  sloganAr: string;
  sloganEn: string;
  whatsappNumber: string;
  whatsappMessageAr: string;
  whatsappMessageEn: string;
  buttonTextAr: string;
  buttonTextEn: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  logoUrl: '',
  logoWidth: '5cm',
  logoHeight: '2cm',
  brandNameAr: 'كافيه بسكوتشي',
  brandNameEn: 'Caffè Pascucci',
  sloganAr: 'القهوة الإيطالية العضوية الفاخرة • حي التعاون',
  sloganEn: 'Authentic Organic Italian Coffee • Al Taawun',
  whatsappNumber: '966500000000',
  whatsappMessageAr: 'السلام عليكم، أود حجز طاولة في كافيه بسكوتشي فرع حي التعاون بالرياض.',
  whatsappMessageEn: 'Hello, I would like to reserve a table at Caffe Pascucci Al Taawun, Riyadh.',
  buttonTextAr: 'تصفح قائمة الطعام والمشروبات',
  buttonTextEn: 'Explore Food & Beverage Menu',
};

export interface SiteContent {
  branding: {
    logoUrl: string;
    logoWidth: string; // e.g. '5cm'
    logoHeight: string; // e.g. '2cm'
    brandNameAr: string;
    brandNameEn: string;
    taglineAr: string;
    taglineEn: string;
  };
  hero: {
    badgeAr: string;
    badgeEn: string;
    titleAr: string;
    titleEn: string;
    subtitleAr: string;
    subtitleEn: string;
    btnMenuAr: string;
    btnMenuEn: string;
    btnReserveAr: string;
    btnReserveEn: string;
    heroImage: string;
    stat1Value: string;
    stat1LabelAr: string;
    stat1LabelEn: string;
    stat2Value: string;
    stat2LabelAr: string;
    stat2LabelEn: string;
    stat3Value: string;
    stat3LabelAr: string;
    stat3LabelEn: string;
  };
  story: {
    badgeAr: string;
    badgeEn: string;
    titleAr: string;
    titleEn: string;
    paragraph1Ar: string;
    paragraph1En: string;
    paragraph2Ar: string;
    paragraph2En: string;
    storyImage: string;
    highlightTagAr: string;
    highlightTagEn: string;
    highlightTitleAr: string;
    highlightTitleEn: string;
    highlightDescAr: string;
    highlightDescEn: string;
    value1TitleAr: string;
    value1DescAr: string;
    value1TitleEn: string;
    value1DescEn: string;
    value2TitleAr: string;
    value2DescAr: string;
    value2TitleEn: string;
    value2DescEn: string;
    value3TitleAr: string;
    value3DescAr: string;
    value3TitleEn: string;
    value3DescEn: string;
    value4TitleAr: string;
    value4DescAr: string;
    value4TitleEn: string;
    value4DescEn: string;
  };
  location: {
    badgeAr: string;
    badgeEn: string;
    titleAr: string;
    titleEn: string;
    subtitleAr: string;
    subtitleEn: string;
    branchNameAr: string;
    branchNameEn: string;
    districtAr: string;
    districtEn: string;
    streetAr: string;
    streetEn: string;
    cityAr: string;
    cityEn: string;
    fullAddressAr: string;
    fullAddressEn: string;
    hoursAr: string;
    hoursEn: string;
    phone: string;
    email: string;
    mapsUrl: string;
    embedUrl: string;
  };
  reservation: {
    badgeAr: string;
    badgeEn: string;
    titleAr: string;
    titleEn: string;
    subtitleAr: string;
    subtitleEn: string;
    locationNoteAr: string;
    locationNoteEn: string;
    footerNoteAr: string;
    footerNoteEn: string;
  };
  footer: {
    aboutAr: string;
    aboutEn: string;
    copyrightAr: string;
    copyrightEn: string;
    badgeAr: string;
    badgeEn: string;
  };
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  branding: {
    logoUrl: '',
    logoWidth: '7cm',
    logoHeight: '4cm',
    brandNameAr: 'كافيه بسكوتشي',
    brandNameEn: 'Caffè Pascucci',
    taglineAr: 'PASCUCCI BIO • إيطاليا',
    taglineEn: 'PASCUCCI BIO • ITALY',
  },
  hero: {
    badgeAr: 'قهوة إيطالية أصيلة وعضوية 100%',
    badgeEn: '100% Authentic Organic Italian Coffee',
    titleAr: 'كافيه بسكوتشي: فن الإسبريسو بلمسة عصرية فاخرة',
    titleEn: 'Caffè Pascucci: Italian Espresso with a Luxury Redesign',
    subtitleAr: 'نصنع تجارب استثنائية في بسكوتشي من حبوب البن العضوية الفاخرة، المحمصة ببطء في إيطاليا والمقدمة بشغف في الرياض بحي التعاون. تذوق الفرق وعش فخامة التفاصيل.',
    subtitleEn: 'We craft extraordinary experiences from premium organic coffee beans, slow-roasted in Italy and served with passion in Riyadh, Al Taawun. Taste the difference and live the luxury of details.',
    btnMenuAr: 'تصفح القائمة الكاملة',
    btnMenuEn: 'Explore Full Menu',
    btnReserveAr: 'احجز طاولتك الفاخرة',
    btnReserveEn: 'Book a Luxury Table',
    heroImage: '/src/assets/images/pascucci_hero_banner_1782844430910.jpg',
    stat1Value: '100%',
    stat1LabelAr: 'بن إيطالي أصيل',
    stat1LabelEn: 'Authentic Italian Beans',
    stat2Value: 'BIO',
    stat2LabelAr: 'عضوي معتمد',
    stat2LabelEn: 'Certified Organic',
    stat3Value: '4.9★',
    stat3LabelAr: 'تقييم الضيوف',
    stat3LabelEn: 'Guest Rating',
  },
  story: {
    badgeAr: 'عشق إيطالي أصيل',
    badgeEn: 'AN AUTHENTIC ITALIAN LOVE STORY',
    titleAr: 'قصة عائلة بسكوتشي ومزارع البن العضوية',
    titleEn: 'The Story of Pascucci and Organic Farming',
    paragraph1Ar: 'بدأت عائلة بسكوتشي في بلدة مونتي سيريوني الجبلية الإيطالية برحلة شغف لا تنتهي للبحث عن أفضل حبوب البن في العالم. وبمرور السنين، تطورت الحرفة لتصبح "كافيه بسكوتشي" علامة بارزة تجمع بين العراقة الإيطالية والابتكار العصري في تحضير القهوة.',
    paragraph1En: 'In the scenic mountain town of Monte Cerignone, Italy, the Pascucci family started an enduring journey for the finest coffee beans. Over years of dedication, this craftsmanship flourished, making "Caffè Pascucci" a hallmark that marries Italian heritage with modern coffee innovation.',
    paragraph2Ar: 'ما يميزنا حقاً هو التزامنا التام بقهوتنا الحيوية "Pascucci Bio" - القهوة العضوية المستزرعة بأساليب تحافظ على خصوبة التربة وتضمن العدالة للمزارعين، لتستمتع بكوب قهوة نقي ومثالي يحمي الكوكب ويعزز جودة الحياة.',
    paragraph2En: 'What truly distinguishes us is our absolute commitment to "Pascucci Bio" - our certified organic and biodynamic coffee, farmed using ecological methods that enrich the soil and support direct, fair-trade relationships with farmers.',
    storyImage: '/src/assets/images/pascucci_specialty_1782844448270.jpg',
    highlightTagAr: 'التحميص الحرفي البطيء',
    highlightTagEn: 'ARTISANAL SLOW ROASTING',
    highlightTitleAr: 'السر يكمن في الوقت',
    highlightTitleEn: 'The Secret Lies in Time',
    highlightDescAr: 'نقوم بتحميص حبوب البن في وجبات صغيرة ببطء تام لمدة تتراوح بين 18 إلى 22 دقيقة، مما يسمح للزيوت العطرية بالظهور بشكل كامل ويقلل من المرارة الزائدة.',
    highlightDescEn: 'We roast our beans in small batches very slowly for 18 to 22 minutes, allowing the aromatic oils to fully emerge while eliminating unpleasant acidity.',
    value1TitleAr: 'بن عضوي حيوي',
    value1DescAr: 'حاصل على شهادات الجودة الأوروبية وخالٍ من الكيماويات.',
    value1TitleEn: 'Biodynamic Organic',
    value1DescEn: 'Certified organic, pesticide-free, and ethically sourced.',
    value2TitleAr: 'تحميص حائز على جوائز',
    value2DescAr: 'سر فريد تم توارثه وتطويره عبر أربعة أجيال متعاقبة.',
    value2TitleEn: 'Award-Winning Roasts',
    value2DescEn: 'A unique secret passed down and perfected through 4 generations.',
    value3TitleAr: 'مستخلص بامتياز',
    value3DescAr: 'بارستا مؤهلون ومدربون على معايير الأكاديمية بإيطاليا.',
    value3TitleEn: 'Masterfully Extracted',
    value3DescEn: 'Certified baristas trained under direct Italian academy guidelines.',
    value4TitleAr: 'ابتكارات فريدة',
    value4DescAr: 'مشروبات حصرية مسجلة ببراءة اختراع كالبسكوتشينو.',
    value4TitleEn: 'Signature Inventions',
    value4DescEn: 'Home to copyrighted beverages like the legendary Pascuccino.',
  },
  location: {
    badgeAr: 'موقعنا والوصول إلينا',
    badgeEn: 'OUR LOCATION & MAPS',
    titleAr: 'زورونا في حي التعاون - شارع عثمان بن عفان',
    titleEn: 'Visit Us at Al Taawun - Othman Bin Affan',
    subtitleAr: 'يسعدنا استقبالكم في فرعنا المميز للاستمتاع بأجود أنواع القهوة الإيطالية العضوية والحلويات الفاخرة.',
    subtitleEn: 'We look forward to welcoming you to enjoy the finest organic Italian coffee and artisanal pastries.',
    branchNameAr: 'Pascucci Cafe - بسكوت وشي كوفي',
    branchNameEn: 'Pascucci Cafe - Al Taawun',
    districtAr: 'حي التعاون',
    districtEn: 'Al Taawun District',
    streetAr: 'شارع عثمان بن عفان',
    streetEn: 'Othman Bin Affan Road',
    cityAr: 'الرياض',
    cityEn: 'Riyadh',
    fullAddressAr: 'حي التعاون، شارع عثمان بن عفان، الرياض، المملكة العربية السعودية',
    fullAddressEn: 'Al Taawun Dist., Othman Bin Affan Rd., Riyadh, Saudi Arabia',
    hoursAr: 'يومياً: من 6:00 صباحاً حتى 2:00 بعد منتصف الليل',
    hoursEn: 'Daily: 6:00 AM – 2:00 AM',
    phone: '+966 50 000 0000',
    email: 'info@pascuccicafe-ksa.com',
    mapsUrl: 'https://share.google/OrePFtaSlCsgShBab',
    embedUrl: 'https://maps.google.com/maps?q=24.7865,46.7025+(Pascucci+Cafe+-+%D8%A8%D8%B3%D9%83%D9%88%D8%AA+%D9%88%D8%B4%D9%8A+%D9%83%D9%88%D9%81%D9%8A+-+%D8%AD%D9%8A+%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D9%88%D9%86+%D8%B9%D8%AB%D9%85%D8%A7%D9%86+%D8%A8%D9%86+%D8%B9%D9%81%D8%A7%D9%86)&t=&z=16&ie=UTF8&iwloc=B&output=embed',
  },
  reservation: {
    badgeAr: 'احجز جلستك الفاخرة',
    badgeEn: 'RESERVATIONS & EVENTS',
    titleAr: 'الحجوزات والضيافة الإيطالية',
    titleEn: 'Bookings & Catering',
    subtitleAr: 'احجز طاولتك الفاخرة للاسترخاء، أو اطلب خدمات الضيافة الخارجية للمناسبات والاجتماعات الراقية بلمسة بسكوتشي.',
    subtitleEn: 'Secure a premium table or book our elite catering packages to bring the authentic taste of Italy to your events.',
    locationNoteAr: 'الموقع: حي التعاون - شارع عثمان بن عفان، الرياض',
    locationNoteEn: 'Location: Al Taawun, Othman Bin Affan Rd., Riyadh',
    footerNoteAr: '* لن يتم تحصيل أي مبالغ مالية عند الحجز، الدفع يتم داخل الكافيه.',
    footerNoteEn: '* No upfront fees required. All payments are settled on-site.',
  },
  footer: {
    aboutAr: 'علامة تجارية إيطالية فاخرة. نلتزم في بسكوتشي بأعلى معايير الجودة والتحميص البطيء المتوارث لتقديم كوب قهوة مثالي وعضوي بنسبة 100% في الرياض بحي التعاون.',
    aboutEn: 'Premium Italian brand. At Pascucci, we are committed to the highest quality standards and slow roasting techniques to deliver 100% organic coffee in Riyadh, Al Taawun.',
    copyrightAr: 'جميع الحقوق محفوظة.',
    copyrightEn: 'All Rights Reserved.',
    badgeAr: 'تحميص وبن إيطالي عضوي طازج',
    badgeEn: 'Artisanal Slow Roasted in Italy',
  },
};

export const PASCUCCI_LOCATION = {
  nameAr: 'كافيه بسكوتشي',
  nameEn: 'Caffè Pascucci',
  googleMapsTitle: 'Pascucci Cafe - بسكوت وشي كوفي',
  districtAr: 'حي التعاون',
  districtEn: 'Al Taawun District',
  streetAr: 'شارع عثمان بن عفان',
  streetEn: 'Othman Bin Affan Road',
  cityAr: 'الرياض',
  cityEn: 'Riyadh',
  fullAddressAr: 'حي التعاون، شارع عثمان بن عفان، الرياض، المملكة العربية السعودية',
  fullAddressEn: 'Al Taawun Dist., Othman Bin Affan Rd., Riyadh, Saudi Arabia',
  phone: '+966 50 000 0000',
  hoursAr: 'يومياً: من 6:00 صباحاً حتى 2:00 بعد منتصف الليل',
  hoursEn: 'Daily: 6:00 AM – 2:00 AM',
  mapsUrl: 'https://share.google/OrePFtaSlCsgShBab',
  embedUrl: 'https://maps.google.com/maps?q=Pascucci+Cafe+Othman+Bin+Affan+Taawun+Riyadh&t=&z=16&ie=UTF8&iwloc=&output=embed'
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'pascuccino',
    nameAr: 'بسكوتشينو كلاسيك',
    nameEn: 'Pascuccino Classic',
    descriptionAr: 'المشروب الأيقوني الحصري لكافيه بسكوتشي: مزيج مخملي من الإسبريسو العضوي مع كريمة الحليب الإيطالية المخفوقة بطريقة سرية خاصة وبودرة الكاكاو الفاخر.',
    descriptionEn: 'The iconic signature drink of Caffè Pascucci: velvety organic espresso with whipped Italian milk crema and dusted cocoa powder.',
    price: 28,
    category: 'specialty',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    tags: ['signature', 'hot', 'creamy'],
    isOrganic: true,
    isPopular: true,
  },
  {
    id: 'gianduia',
    nameAr: 'كافيه جياندويا تورينو',
    nameEn: 'Caffè Gianduia Torino',
    descriptionAr: 'إسبريسو إيطالي أصيل ممزوج مع شوكولاتة البندق البييدمونتية الشهيرة وحليب طازج مبخر تعلوه رغوة غنية.',
    descriptionEn: 'Authentic espresso blended with rich Piedmontese hazelnut gianduia chocolate and silky steamed milk.',
    price: 32,
    category: 'specialty',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
    tags: ['chocolate', 'hazelnut', 'sweet'],
    isOrganic: false,
    isPopular: true,
  },
  {
    id: 'pistachio_latte',
    nameAr: 'بيستاشيو لاتيه إيطالي',
    nameEn: 'Italian Pistachio Latte',
    descriptionAr: 'لاتيه فاخر محضر من صوص الفستق الصقلي الطبيعي مع حبوب بن بسكوتشي العضوية وقطع الفستق المحمص.',
    descriptionEn: 'Luxury latte crafted with genuine Sicilian pistachio paste, organic espresso, and crushed roasted pistachios.',
    price: 30,
    category: 'specialty',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    tags: ['pistachio', 'nutty'],
    isOrganic: true,
    isPopular: true,
  },
  {
    id: 'espresso_bio',
    nameAr: 'إسبريسو بسكوتشي بيو (عضوي)',
    nameEn: 'Bio Organic Espresso',
    descriptionAr: 'شوت إسبريسو مزدوج مستخلص من محصول بن بيوديناميكي عضوي 100%، غني بطبقة كريما ذهبية كثيفة وإيحاءات الفواكه المجففة والكراميل.',
    descriptionEn: 'Double shot extracted from 100% biodynamic certified organic beans with thick golden crema and notes of dried fruit and caramel.',
    price: 18,
    category: 'espresso',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    tags: ['pure', 'organic', 'intense'],
    isOrganic: true,
    isPopular: true,
  },
  {
    id: 'cappuccino',
    nameAr: 'كابوتشينو إيطاليانو',
    nameEn: 'Cappuccino Italiano',
    descriptionAr: 'التوازن الهندسي الإيطالي المثالي: ثلث إسبريسو غني، ثلث حليب مبخر، وثلث رغوة ميكروفوم حريرية.',
    descriptionEn: 'The authentic Italian balance: one-third espresso, one-third steamed milk, and one-third silky microfoam.',
    price: 24,
    category: 'espresso',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    tags: ['classic', 'milk'],
    isOrganic: true,
    isPopular: false,
  },
  {
    id: 'flat_white',
    nameAr: 'فلات وايت بسكوتشي',
    nameEn: 'Pascucci Flat White',
    descriptionAr: 'جرعة ريستريتو مضاعفة مكثفة مع حليب مخملي سلس وطبقة رقيقة جداً من الفوم للتركيز على نكهة القهوة العميقة.',
    descriptionEn: 'Double ristretto shot with velvety textured milk and a micro-thin layer of crema foam.',
    price: 24,
    category: 'espresso',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80',
    tags: ['strong', 'smooth'],
    isOrganic: true,
    isPopular: false,
  },
  {
    id: 'macchiato',
    nameAr: 'إسبريسو ماكياتو',
    nameEn: 'Espresso Macchiato',
    descriptionAr: 'إسبريسو مركز مع لمسة "تبقيع" من رغوة الحليب الدافئة لكسر حدة المرارة مع الاحتفاظ بقوة الشوت.',
    descriptionEn: 'Single or double espresso marked with a small dollop of hot frothed milk.',
    price: 20,
    category: 'espresso',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80',
    tags: ['bold'],
    isOrganic: true,
    isPopular: false,
  },
  {
    id: 'shakerato',
    nameAr: 'شاكيرات الإسبريسو البارد',
    nameEn: 'Caffè Shakerato',
    descriptionAr: 'المشروب الصيفي الكلاسيكي في إيطاليا: شوت إسبريسو عضوي مخفوق يدوياً بقوة مع مكعبات الثلج ورشة سكر قصب طبيعي للحصول على رغوة مخملية باردة.',
    descriptionEn: 'Traditional Italian iced coffee: organic espresso vigorously hand-shaken with ice and pure cane sugar creating an airy, dense froth.',
    price: 26,
    category: 'cold',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    tags: ['refreshing', 'iced', 'summer'],
    isOrganic: true,
    isPopular: true,
  },
  {
    id: 'spanish_latte',
    nameAr: 'آيس سبانش لاتيه بسكوتشي',
    nameEn: 'Iced Spanish Latte',
    descriptionAr: 'قهوة باردة لذيذة ممزوجة بالحليب المكثف المحلي وإسبريسو بسكوتشي البطيء التحميص مع الثلج.',
    descriptionEn: 'Chilled signature iced latte combining condensed milk, fresh whole milk, and slow-roasted espresso over ice.',
    price: 28,
    category: 'cold',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
    tags: ['sweet', 'iced'],
    isOrganic: false,
    isPopular: true,
  },
  {
    id: 'tiramisu',
    nameAr: 'تيراميسو بسكوتشي الأصلي',
    nameEn: 'Original Pascucci Tiramisù',
    descriptionAr: 'حلوى التيراميسو الإيطالية الكلاسيكية محضرة من أصابع البسكويت المنقوعة في إسبريسو بسكوتشي الطازج وطبقات كريمة جبن الماسكاربوني الغنية وبودرة الكاكاو.',
    descriptionEn: 'Authentic Italian classic layered with Savoiardi biscuits soaked in fresh Pascucci espresso, rich mascarpone cream, and dark cocoa.',
    price: 36,
    category: 'bakery',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    tags: ['dessert', 'italian', 'signature'],
    isOrganic: false,
    isPopular: true,
  },
  {
    id: 'pistachio_croissant',
    nameAr: 'كرواسون الفستق الصقلي المقرمش',
    nameEn: 'Sicilian Pistachio Croissant',
    descriptionAr: 'عجينة مورقة فرنسية زبدية محشوة بسخاء بكريمة الفستق الإيطالية ومزينة بحبيبات الفستق الحلبي.',
    descriptionEn: 'Flaky artisanal butter croissant generously stuffed with rich pistachio cream and crushed nuts.',
    price: 22,
    category: 'bakery',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    tags: ['pastry', 'pistachio', 'breakfast'],
    isOrganic: false,
    isPopular: true,
  },
  {
    id: 'cannoli',
    nameAr: 'كانولي سيسيليانو تقليدي',
    nameEn: 'Traditional Sicilian Cannoli',
    descriptionAr: 'قشور مقرمشة مقلية محشوة بكريمة الريكوتا الطازجة مع رقائق الشوكولاتة وقشور البرتقال المسكرة.',
    descriptionEn: 'Crispy pastry shells filled with fresh sweet ricotta cream, chocolate chips, and candied citrus peel.',
    price: 24,
    category: 'bakery',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    tags: ['italian', 'crispy'],
    isOrganic: false,
    isPopular: false,
  },
  {
    id: 'halloumi_panini',
    nameAr: 'بانيني الحلوم المشوي مع البيستو',
    nameEn: 'Grilled Halloumi & Pesto Panini',
    descriptionAr: 'خبز الشاباتا الإيطالي المقرمش محشو بجبن الحلوم المشوي، بيستو الريحان الطازج، طماطم مجففة، وجرجير بري.',
    descriptionEn: 'Toasted Italian ciabatta filled with grilled halloumi cheese, house pesto, sun-dried tomatoes, and wild rocket.',
    price: 34,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    tags: ['savory', 'panini', 'lunch'],
    isOrganic: false,
    isPopular: true,
  },
  {
    id: 'turkey_croissant',
    nameAr: 'كرواسون الديك الرومي والجبن السويسري',
    nameEn: 'Smoked Turkey & Swiss Croissant',
    descriptionAr: 'كرواسون زبدة طازج محشو بشرائح الديك الرومي المدخن، جبن إيمنتال سويسري ذائب، وخردل ديجون الخفيف.',
    descriptionEn: 'Fresh flaky croissant filled with premium smoked turkey, melted Swiss Emmental cheese, and a hint of Dijon.',
    price: 32,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80',
    tags: ['savory', 'breakfast', 'lunch'],
    isOrganic: false,
    isPopular: false,
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    authorAr: 'سارة العتيبي',
    authorEn: 'Sarah Al-Otaibi',
    rating: 5,
    commentAr: 'المكان فاخر جداً وراقي! البسكوتشينو هنا لا يعلى عليه، الخدمة ممتازة والموظفين جداً ودودين وأجواء حي التعاون هادئة وراقية.',
    commentEn: 'The place is luxurious and high-end! The Pascuccino here is unmatched. Excellent service, friendly staff, and the Al Taawun atmosphere is serene and elegant.',
    date: '2026-06-25'
  },
  {
    id: 'r2',
    authorAr: 'خالد بن محمد',
    authorEn: 'Khaled Bin Mohammed',
    rating: 5,
    commentAr: 'عشاق الإسبريسو الحقيقيين مكانهم هنا في شارع عثمان بن عفان. قهوة بيو العضوية ممتازة وتستحق التجربة، طعم الإسبريسو غني جداً ومتوازن بدون أي حموضة مزعجة.',
    commentEn: 'Real espresso lovers belong here on Othman Bin Affan Street. The organic Bio coffee is excellent and worth trying; the espresso is extremely rich and balanced.',
    date: '2026-06-22'
  },
  {
    id: 'r3',
    authorAr: 'مها الحربي',
    authorEn: 'Maha Al-Harbi',
    rating: 5,
    commentAr: 'جلسات كافيه بسكوتشي بحي التعاون جميلة جداً ومثالية للعمل أو لقاء الأصدقاء. جربت كافيه جياندويا وكان تجربة فريدة، الشوكولاتة ممتازة، ومخبوزاتهم دائماً طازجة.',
    commentEn: 'The seating at Pascucci Cafe in Al Taawun is beautiful and perfect for morning work or meeting friends. I tried Caffè Pascucci Gianduia and it was a unique experience.',
    date: '2026-06-18'
  }
];

export const PROFILER_QUESTIONS: ProfilerQuestion[] = [
  {
    id: 1,
    questionAr: 'كيف تفضل طعم قهوتك الأساسي؟',
    questionEn: 'How do you prefer your main coffee flavor profile?',
    options: [
      {
        textAr: 'حلو غني ونكهات شوكولاتة أو فستق',
        textEn: 'Sweet, rich with chocolate or pistachio notes',
        score: { pascuccino: 3, gianduia: 4, pistachio_latte: 3, spanish_latte: 2 }
      },
      {
        textAr: 'قوي، مركز، ومركّز على نكهة البن الصافية',
        textEn: 'Bold, intense, focused on pure coffee flavor',
        score: { espresso_bio: 4, macchiato: 3, flat_white: 2, shakerato: 1 }
      },
      {
        textAr: 'كريمي متوازن وغني برغوة الحليب',
        textEn: 'Creamy, balanced with smooth milk foam',
        score: { cappuccino: 4, flat_white: 3, pascuccino: 2, spanish_latte: 2 }
      },
      {
        textAr: 'منعش، بارد، وخفيف مع حلاوة متوازنة',
        textEn: 'Refreshing, cold, light with balanced sweetness',
        score: { shakerato: 4, spanish_latte: 3, pistachio_latte: 2, pascuccino: 1 }
      }
    ]
  },
  {
    id: 2,
    questionAr: 'ما هو الوقت المفضل لديك لتناول القهوة؟',
    questionEn: 'What is your favorite time to enjoy coffee?',
    options: [
      {
        textAr: 'في الصباح الباكر لبدء اليوم بنشاط كامل',
        textEn: 'Early morning to kickstart the day with full energy',
        score: { espresso_bio: 4, cappuccino: 3, flat_white: 3, macchiato: 2 }
      },
      {
        textAr: 'بعد الظهر / جلسة عمل أو لقاء مع الأصدقاء',
        textEn: 'Afternoon / working session or catching up with friends',
        score: { flat_white: 3, spanish_latte: 3, shakerato: 3, pistachio_latte: 2 }
      },
      {
        textAr: 'المساء للاسترخاء والتحلية اللذيذة',
        textEn: 'Evening to relax and enjoy a delicious sweet treat',
        score: { gianduia: 4, pascuccino: 4, pistachio_latte: 3, spanish_latte: 2 }
      }
    ]
  },
  {
    id: 3,
    questionAr: 'ما هي مرافقتك المفضلة بجانب فنجان القهوة؟',
    questionEn: 'What is your favorite pairing with your coffee?',
    options: [
      {
        textAr: 'أعشق الحلويات الإيطالية الفاخرة مثل التيراميسو',
        textEn: 'I love premium Italian desserts like Tiramisu',
        score: { espresso_bio: 4, macchiato: 3, shakerato: 2, cappuccino: 2 }
      },
      {
        textAr: 'كرواسون مقرمش محشو بكريمة الفستق أو الزعفران',
        textEn: 'Flaky croissant filled with pistachio or saffron cream',
        score: { cappuccino: 4, flat_white: 3, espresso_bio: 2 }
      },
      {
        textAr: 'أحب تناول قهوتي بمفردها لتذوق النكهة النقية',
        textEn: 'I like my coffee alone to savor the pure origin notes',
        score: { espresso_bio: 4, shakerato: 3, macchiato: 3 }
      },
      {
        textAr: 'ساندوتش بانيني مالح أو كرواسون ديك رومي مشبع',
        textEn: 'A savory pressed panini or turkey croissant',
        score: { flat_white: 4, cappuccino: 3, espresso_bio: 2 }
      }
    ]
  }
];

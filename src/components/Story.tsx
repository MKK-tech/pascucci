import React from 'react';
import { Award, Leaf, Zap, ShieldCheck } from 'lucide-react';
import { SiteContent } from '../types';

interface StoryProps {
  isAr: boolean;
  siteContent?: SiteContent;
}

export default function Story({ isAr, siteContent }: StoryProps) {
  const story = siteContent?.story;
  const storyImage = story?.storyImage || '/src/assets/images/pascucci_specialty_1782844448270.jpg';

  const badge = isAr 
    ? (story?.badgeAr || 'عشق إيطالي أصيل') 
    : (story?.badgeEn || 'AN AUTHENTIC ITALIAN LOVE STORY');

  const title = isAr
    ? (story?.titleAr || 'قصة عائلة بسكوتشي ومزارع البن العضوية')
    : (story?.titleEn || 'The Story of Pascucci and Organic Farming');

  const p1 = isAr
    ? (story?.paragraph1Ar || 'بدأت عائلة بسكوتشي في بلدة مونتي سيريوني الجبلية الإيطالية برحلة شغف لا تنتهي للبحث عن أفضل حبوب البن في العالم. وبمرور السنين، تطورت الحرفة لتصبح "كافيه بسكوتشي" علامة بارزة تجمع بين العراقة الإيطالية والابتكار العصري في تحضير القهوة.')
    : (story?.paragraph1En || 'In the scenic mountain town of Monte Cerignone, Italy, the Pascucci family started an enduring journey for the finest coffee beans. Over years of dedication, this craftsmanship flourished, making "Caffè Pascucci" a hallmark that marries Italian heritage with modern coffee innovation.');

  const p2 = isAr
    ? (story?.paragraph2Ar || 'ما يميزنا حقاً هو التزامنا التام بقهوتنا الحيوية "Pascucci Bio" - القهوة العضوية المستزرعة بأساليب تحافظ على خصوبة التربة وتضمن العدالة للمزارعين، لتستمتع بكوب قهوة نقي ومثالي يحمي الكوكب ويعزز جودة الحياة.')
    : (story?.paragraph2En || 'What truly distinguishes us is our absolute commitment to "Pascucci Bio" - our certified organic and biodynamic coffee, farmed using ecological methods that enrich the soil and support direct, fair-trade relationships with farmers.');

  const highlightTag = isAr
    ? (story?.highlightTagAr || 'التحميص الحرفي البطيء')
    : (story?.highlightTagEn || 'ARTISANAL SLOW ROASTING');

  const highlightTitle = isAr
    ? (story?.highlightTitleAr || 'السر يكمن في الوقت')
    : (story?.highlightTitleEn || 'The Secret Lies in Time');

  const highlightDesc = isAr
    ? (story?.highlightDescAr || 'نقوم بتحميص حبوب البن في وجبات صغيرة ببطء تام لمدة تتراوح بين 18 إلى 22 دقيقة، مما يسمح للزيوت العطرية بالظهور بشكل كامل ويقلل من المرارة الزائدة.')
    : (story?.highlightDescEn || 'We roast our beans in small batches very slowly for 18 to 22 minutes, allowing the aromatic oils to fully emerge while eliminating unpleasant acidity.');

  const v1Title = isAr ? (story?.value1TitleAr || 'بن عضوي حيوي') : (story?.value1TitleEn || 'Biodynamic Organic');
  const v1Desc = isAr ? (story?.value1DescAr || 'حاصل على شهادات الجودة الأوروبية وخالٍ من الكيماويات.') : (story?.value1DescEn || 'Certified organic, pesticide-free, and ethically sourced.');

  const v2Title = isAr ? (story?.value2TitleAr || 'تحميص حائز على جوائز') : (story?.value2TitleEn || 'Award-Winning Roasts');
  const v2Desc = isAr ? (story?.value2DescAr || 'سر فريد تم توارثه وتطويره عبر أربعة أجيال متعاقبة.') : (story?.value2DescEn || 'A unique secret passed down and perfected through 4 generations.');

  const v3Title = isAr ? (story?.value3TitleAr || 'مستخلص بامتياز') : (story?.value3TitleEn || 'Masterfully Extracted');
  const v3Desc = isAr ? (story?.value3DescAr || 'بارستا مؤهلون ومدربون على معايير الأكاديمية بإيطاليا.') : (story?.value3DescEn || 'Certified baristas trained under direct Italian academy guidelines.');

  const v4Title = isAr ? (story?.value4TitleAr || 'ابتكارات فريدة') : (story?.value4TitleEn || 'Signature Inventions');
  const v4Desc = isAr ? (story?.value4DescAr || 'مشروبات حصرية مسجلة ببراءة اختراع كالبسكوتشينو.') : (story?.value4DescEn || 'Home to copyrighted beverages like the legendary Pascuccino.');

  return (
    <section id="story" className="py-24 bg-[#0F0F0F] border-b border-white/10 text-stone-100 relative">
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#0A0A0A] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Visual Column / Brand Showcase */}
          <div className="relative order-2 lg:order-1">
            {/* Ambient gold glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 opacity-30 blur-2xl pointer-events-none" />
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30 bg-[#0A0A0A] gold-glow-subtle">
              <img
                src={storyImage}
                alt="Pascucci Craftsmanship Specialty Coffee"
                className="w-full aspect-square object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
              
              {/* Highlight Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-[#0F0F0F]/95 backdrop-blur-md border border-amber-500/30 text-stone-100 shadow-xl">
                <p className="text-gold-sparkle font-mono text-xs uppercase tracking-widest mb-1 font-bold">
                  {highlightTag}
                </p>
                <h4 className="text-lg font-bold font-sans">
                  {highlightTitle}
                </h4>
                <p className="text-stone-300 text-xs mt-2 leading-relaxed">
                  {highlightDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4 text-center lg:text-right" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
              <span className="text-gold-sparkle font-mono text-xs uppercase tracking-widest font-bold block">
                {badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {title}
              </h2>
              <div className="h-1.5 w-20 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600 rounded-full mx-auto lg:mx-0 lg:ml-0 gold-glow-subtle" />
            </div>

            <div className="space-y-6 text-stone-300 leading-relaxed text-sm sm:text-base font-normal" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
              <p>{p1}</p>
              <p>{p2}</p>
            </div>

            {/* Core Values Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
              <div className="p-4 rounded-xl bg-[#0A0A0A] border border-amber-500/20 hover:border-amber-500/40 transition-all flex gap-3.5 group">
                <div className="bg-gradient-to-br from-amber-500/20 to-yellow-600/10 p-2.5 rounded-lg text-amber-300 h-fit border border-amber-400/30 group-hover:scale-105 transition-transform">
                  <Leaf className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white mb-1">
                    {v1Title}
                  </h5>
                  <p className="text-stone-400 text-xs leading-relaxed">
                    {v1Desc}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0A0A] border border-amber-500/20 hover:border-amber-500/40 transition-all flex gap-3.5 group">
                <div className="bg-gradient-to-br from-amber-500/20 to-yellow-600/10 p-2.5 rounded-lg text-amber-300 h-fit border border-amber-400/30 group-hover:scale-105 transition-transform">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white mb-1">
                    {v2Title}
                  </h5>
                  <p className="text-stone-400 text-xs leading-relaxed">
                    {v2Desc}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0A0A] border border-amber-500/20 hover:border-amber-500/40 transition-all flex gap-3.5 group">
                <div className="bg-gradient-to-br from-amber-500/20 to-yellow-600/10 p-2.5 rounded-lg text-amber-300 h-fit border border-amber-400/30 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white mb-1">
                    {v3Title}
                  </h5>
                  <p className="text-stone-400 text-xs leading-relaxed">
                    {v3Desc}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0A0A] border border-amber-500/20 hover:border-amber-500/40 transition-all flex gap-3.5 group">
                <div className="bg-gradient-to-br from-amber-500/20 to-yellow-600/10 p-2.5 rounded-lg text-amber-300 h-fit border border-amber-400/30 group-hover:scale-105 transition-transform">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white mb-1">
                    {v4Title}
                  </h5>
                  <p className="text-stone-400 text-xs leading-relaxed">
                    {v4Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

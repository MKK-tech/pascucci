import React from 'react';
import { MenuItem } from '../types';
import { 
  X, 
  Upload, 
  Sparkles, 
  Check, 
  RotateCcw, 
  Sliders, 
  Image as ImageIcon, 
  Sun, 
  Contrast, 
  Droplet, 
  Link as LinkIcon, 
  CheckCircle2, 
  Wand2
} from 'lucide-react';

interface ItemImageEditorModalProps {
  isAr: boolean;
  isOpen: boolean;
  item: MenuItem | null;
  onClose: () => void;
  onSaveImage: (itemId: string, newImageUrl: string) => void;
}

// Visual Filter Presets
interface FilterPreset {
  id: string;
  nameAr: string;
  nameEn: string;
  brightness: number; // in % (100 is default)
  contrast: number;   // in %
  saturate: number;   // in %
  sepia: number;      // in %
}

const FILTER_PRESETS: FilterPreset[] = [
  { id: 'normal', nameAr: 'أصلي وطبيعي', nameEn: 'Original', brightness: 100, contrast: 100, saturate: 100, sepia: 0 },
  { id: 'warm', nameAr: 'دفء إيطالي ذهبي', nameEn: 'Warm Italian', brightness: 105, contrast: 110, saturate: 115, sepia: 18 },
  { id: 'vibrant', nameAr: 'ألوان مشبعة وشهية', nameEn: 'Vibrant Food', brightness: 105, contrast: 115, saturate: 135, sepia: 0 },
  { id: 'crisp', nameAr: 'نقي وعالي التباين', nameEn: 'Crisp & Bright', brightness: 110, contrast: 120, saturate: 105, sepia: 0 },
  { id: 'vintage', nameAr: 'كافيه كلاسيك ريترو', nameEn: 'Classic Café', brightness: 98, contrast: 108, saturate: 85, sepia: 25 },
];

export default function ItemImageEditorModal({
  isAr,
  isOpen,
  item,
  onClose,
  onSaveImage,
}: ItemImageEditorModalProps) {
  if (!isOpen || !item) return null;

  // Selected image state
  const [currentImageUrl, setCurrentImageUrl] = React.useState<string>(item.image || '');
  const [urlInput, setUrlInput] = React.useState<string>(item.image || '');

  // Active Tool Tab: 'upload' | 'url' | 'adjust'
  const [activeTab, setActiveTab] = React.useState<'upload' | 'url' | 'adjust'>('upload');

  // Filters & Adjustments state
  const [brightness, setBrightness] = React.useState<number>(100);
  const [contrast, setContrast] = React.useState<number>(100);
  const [saturate, setSaturate] = React.useState<number>(100);
  const [sepia, setSepia] = React.useState<number>(0);
  const [zoomLevel, setZoomLevel] = React.useState<number>(1);
  const [fitMode, setFitMode] = React.useState<'cover' | 'contain'>('cover');
  const [selectedFilterId, setSelectedFilterId] = React.useState<string>('normal');

  // Drag & drop state
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  // Synchronize when item changes
  React.useEffect(() => {
    if (item) {
      setCurrentImageUrl(item.image || '');
      setUrlInput(item.image || '');
      // reset adjustments
      setBrightness(100);
      setContrast(100);
      setSaturate(100);
      setSepia(0);
      setZoomLevel(1);
      setFitMode('cover');
      setSelectedFilterId('normal');
    }
  }, [item]);

  // Apply Preset Filter
  const applyPresetFilter = (preset: FilterPreset) => {
    setSelectedFilterId(preset.id);
    setBrightness(preset.brightness);
    setContrast(preset.contrast);
    setSaturate(preset.saturate);
    setSepia(preset.sepia);
  };

  // Reset Adjustments
  const resetAdjustments = () => {
    applyPresetFilter(FILTER_PRESETS[0]);
    setZoomLevel(1);
    setFitMode('cover');
  };

  // Handle File Upload from device
  const processUploadedFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(isAr ? 'يرجى اختيار ملف صورة صالح (PNG, JPG, WebP)' : 'Please select a valid image file');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setCurrentImageUrl(event.target.result);
        setUrlInput('');
        setIsProcessing(false);
      }
    };
    reader.onerror = () => {
      alert(isAr ? 'حدث خطأ أثناء قراءة الصورة' : 'Error reading image file');
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  // Apply Custom URL
  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      setCurrentImageUrl(urlInput.trim());
    }
  };

  // Render & Bake filtered image on canvas for clean saving if custom filters applied
  const handleSaveAndApply = async () => {
    if (!currentImageUrl) {
      alert(isAr ? 'يرجى اختيار أو رفع صورة أولاً' : 'Please upload or specify an image first');
      return;
    }

    // If no complex filters or zoom applied, save currentImageUrl directly
    const hasModifications = brightness !== 100 || contrast !== 100 || saturate !== 100 || sepia !== 0 || zoomLevel !== 1;
    
    if (!hasModifications || currentImageUrl.startsWith('http')) {
      // Direct save
      onSaveImage(item.id, currentImageUrl);
      onClose();
      return;
    }

    // Try baking filter into canvas if data URL
    try {
      setIsProcessing(true);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = currentImageUrl;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) sepia(${sepia}%)`;
        
        // Draw with zoom & cover center
        const scale = zoomLevel;
        const w = canvas.width * scale;
        const h = canvas.height * scale;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;
        
        ctx.drawImage(img, x, y, w, h);
        const bakedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        onSaveImage(item.id, bakedDataUrl);
      } else {
        onSaveImage(item.id, currentImageUrl);
      }
    } catch (err) {
      console.warn('Canvas export skipped, saving direct image URL', err);
      onSaveImage(item.id, currentImageUrl);
    } finally {
      setIsProcessing(false);
      onClose();
    }
  };

  // Computed filter CSS style for live preview
  const filterStyle: React.CSSProperties = {
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) sepia(${sepia}%)`,
    transform: `scale(${zoomLevel})`,
    objectFit: fitMode,
    transition: 'filter 0.2s ease, transform 0.2s ease',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div 
        className="bg-[#0F0F0F] border border-amber-500/30 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        style={{ direction: isAr ? 'rtl' : 'ltr' }}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#141414] border-b border-white/10 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold-shiny text-black shadow-md border border-amber-200/50">
              <ImageIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  {isAr ? 'استوديو تعديل صورة الصنف' : 'Item Photo Studio & Editor'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold">
                  {isAr ? item.nameAr : item.nameEn}
                </span>
              </div>
              <p className="text-stone-400 text-xs mt-0.5">
                {isAr 
                  ? 'ارفع صورة من جهازك أو ضع رابط مباشر واضبط الفلاتر والسطوع والتباين' 
                  : 'Upload custom photo or enter URL, and adjust brightness & filters'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body - 2 Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-white/10" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          
          {/* Left / Main: Photo Sources & Controls (7 Cols) */}
          <div className="lg:col-span-7 p-5 sm:p-6 space-y-5 overflow-y-auto">
            
            {/* Top Source Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#0A0A0A] rounded-2xl border border-white/10 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-gold-shiny text-black shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Upload className="h-3.5 w-3.5" />
                <span>{isAr ? 'رفع من جهازك' : 'Upload File'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('url')}
                className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'url'
                    ? 'bg-gold-shiny text-black shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <LinkIcon className="h-3.5 w-3.5" />
                <span>{isAr ? 'رابط مباشر' : 'Image URL'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('adjust')}
                className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'adjust'
                    ? 'bg-gold-shiny text-black shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Sliders className="h-3.5 w-3.5" />
                <span>{isAr ? 'فلاتر وضبط' : 'Adjust & Filters'}</span>
              </button>
            </div>

            {/* TAB CONTENT 1: Upload File / Drag & Drop */}
            {activeTab === 'upload' && (
              <div className="space-y-4 animate-fade-in">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition flex flex-col items-center justify-center gap-3 cursor-pointer ${
                    isDragging
                      ? 'border-amber-400 bg-amber-500/10'
                      : 'border-white/15 bg-[#0A0A0A] hover:border-amber-400/50 hover:bg-white/[0.02]'
                  }`}
                  onClick={() => document.getElementById('item-image-file-input')?.click()}
                >
                  <input
                    id="item-image-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20 text-amber-300">
                    <Upload className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {isAr ? 'اضغط لرفع صورة من جهازك أو اسحبها هنا' : 'Click or Drag & Drop image here'}
                    </h4>
                    <p className="text-xs text-stone-400 mt-1">
                      {isAr ? 'يدعم صيغ PNG, JPG, WebP, GIF بجودة عالية' : 'Supports high-res PNG, JPG, WebP, GIF'}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-2 px-5 py-2 rounded-xl bg-gold-button text-black text-xs font-bold shadow-md pointer-events-none"
                  >
                    {isAr ? 'اختيار ملف من الجهاز' : 'Choose File from Device'}
                  </button>
                </div>

                {currentImageUrl && (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0A0A0A] border border-white/10 text-xs">
                    <span className="text-stone-300 font-medium">
                      {isAr ? 'الصورة الحالية محملة بنجاح، يمكنك الآن الانتقال لتبويب الفلاتر والضبط:' : 'Photo loaded, switch to Adjust tab to apply filters:'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('adjust')}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold flex items-center gap-1.5 transition"
                    >
                      <Wand2 className="h-3.5 w-3.5" />
                      <span>{isAr ? 'ضبط الفلاتر' : 'Adjust Filters'}</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 2: Direct URL Input */}
            {activeTab === 'url' && (
              <form onSubmit={handleApplyUrl} className="space-y-4 animate-fade-in bg-[#0A0A0A] p-5 rounded-2xl border border-white/10">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-300 block">
                    {isAr ? 'أدخل رابط الصورة المباشر (URL):' : 'Enter direct Image URL:'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      required
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="flex-1 p-3 bg-[#141414] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400 text-xs font-mono text-left"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 bg-gold-button text-black font-bold text-xs rounded-xl shadow-md cursor-pointer shrink-0"
                    >
                      {isAr ? 'تطبيق' : 'Apply'}
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-stone-400">
                  {isAr ? 'يمكنك إدخال أي رابط صورة مباشر من الإنترنت لتطبيقها على الصنف.' : 'Enter any valid image link to apply it to the item.'}
                </p>
              </form>
            )}

            {/* TAB CONTENT 3: Adjustments & Visual Filters */}
            {activeTab === 'adjust' && (
              <div className="space-y-6 animate-fade-in bg-[#0A0A0A] p-5 rounded-2xl border border-white/10">
                
                {/* 1-Click Filter Presets */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-300 flex items-center justify-between">
                    <span>{isAr ? 'فلاتر بصرية جاهزة بنقرة واحدة:' : '1-Click Visual Filters:'}</span>
                    <button
                      type="button"
                      onClick={resetAdjustments}
                      className="text-[10px] text-stone-400 hover:text-amber-300 flex items-center gap-1 font-mono cursor-pointer"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>{isAr ? 'إعادة ضبط' : 'Reset'}</span>
                    </button>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {FILTER_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applyPresetFilter(preset)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                          selectedFilterId === preset.id
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                            : 'bg-[#141414] border-white/10 text-stone-300 hover:border-white/20'
                        }`}
                      >
                        <span>{isAr ? preset.nameAr : preset.nameEn}</span>
                        {selectedFilterId === preset.id && <Check className="h-3.5 w-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fine Tune Sliders */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  
                  {/* Brightness */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-stone-300 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Sun className="h-3.5 w-3.5 text-amber-400" />
                        <span>{isAr ? 'السطوع والإضاءة' : 'Brightness'}</span>
                      </span>
                      <span className="font-mono text-[11px] text-amber-400">{brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min="70"
                      max="140"
                      value={brightness}
                      onChange={(e) => {
                        setBrightness(Number(e.target.value));
                        setSelectedFilterId('custom');
                      }}
                      className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    />
                  </div>

                  {/* Contrast */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-stone-300 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Contrast className="h-3.5 w-3.5 text-amber-400" />
                        <span>{isAr ? 'التباين والحدة' : 'Contrast'}</span>
                      </span>
                      <span className="font-mono text-[11px] text-amber-400">{contrast}%</span>
                    </div>
                    <input
                      type="range"
                      min="70"
                      max="140"
                      value={contrast}
                      onChange={(e) => {
                        setContrast(Number(e.target.value));
                        setSelectedFilterId('custom');
                      }}
                      className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    />
                  </div>

                  {/* Saturation */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-stone-300 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Droplet className="h-3.5 w-3.5 text-amber-400" />
                        <span>{isAr ? 'تشبع الألوان والشهية' : 'Color Saturation'}</span>
                      </span>
                      <span className="font-mono text-[11px] text-amber-400">{saturate}%</span>
                    </div>
                    <input
                      type="range"
                      min="60"
                      max="160"
                      value={saturate}
                      onChange={(e) => {
                        setSaturate(Number(e.target.value));
                        setSelectedFilterId('custom');
                      }}
                      className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    />
                  </div>

                  {/* Sepia / Warmth */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-stone-300 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                        <span>{isAr ? 'الدفء الكلاسيكي' : 'Warmth / Sepia'}</span>
                      </span>
                      <span className="font-mono text-[11px] text-amber-400">{sepia}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="60"
                      value={sepia}
                      onChange={(e) => {
                        setSepia(Number(e.target.value));
                        setSelectedFilterId('custom');
                      }}
                      className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    />
                  </div>

                  {/* Zoom & Fit Options */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <span className="text-[11px] font-bold text-stone-400 block mb-1">
                        {isAr ? 'التقريب / التكبير:' : 'Zoom Level:'}
                      </span>
                      <div className="flex items-center gap-1">
                        {[1, 1.15, 1.3].map((z) => (
                          <button
                            key={z}
                            type="button"
                            onClick={() => setZoomLevel(z)}
                            className={`flex-1 py-1.5 text-xs font-mono rounded-lg border transition ${
                              zoomLevel === z
                                ? 'bg-amber-400 text-black font-bold border-amber-300'
                                : 'bg-[#141414] text-stone-300 border-white/10'
                            }`}
                          >
                            {z}x
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-stone-400 block mb-1">
                        {isAr ? 'نمط الملاءمة:' : 'Fit Mode:'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setFitMode('cover')}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${
                            fitMode === 'cover'
                              ? 'bg-amber-400 text-black font-bold border-amber-300'
                              : 'bg-[#141414] text-stone-300 border-white/10'
                          }`}
                        >
                          {isAr ? 'تغطية كاملة' : 'Cover'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setFitMode('contain')}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${
                            fitMode === 'contain'
                              ? 'bg-amber-400 text-black font-bold border-amber-300'
                              : 'bg-[#141414] text-stone-300 border-white/10'
                          }`}
                        >
                          {isAr ? 'ملاءمة' : 'Contain'}
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Right: Live Customer Menu Preview (5 Cols) */}
          <div className="lg:col-span-5 p-5 sm:p-6 bg-[#0A0A0A] flex flex-col justify-between gap-5">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{isAr ? 'معاينة الصنف في القائمة' : 'Live Menu Card Preview'}</span>
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  {isAr ? 'شكل العرض النهائي' : 'Final Render'}
                </span>
              </div>

              {/* Realistic Menu Card Preview */}
              <div className="bg-[#141414] border border-white/15 rounded-3xl overflow-hidden shadow-2xl transition hover:border-amber-400/50 group">
                
                {/* Photo with active styling */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-stone-900 flex items-center justify-center">
                  {currentImageUrl ? (
                    <img
                      src={currentImageUrl}
                      alt={item.nameAr}
                      style={filterStyle}
                      className="w-full h-full"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 text-stone-600 p-6 text-center">
                      <ImageIcon className="h-10 w-10 text-stone-700" />
                      <span className="text-xs">{isAr ? 'لم يتم تحديد صورة بعد' : 'No photo chosen yet'}</span>
                    </div>
                  )}
                  
                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {item.isOrganic && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                        {isAr ? 'عضوي حيوي' : '100% Bio'}
                      </span>
                    )}
                    {item.isPopular && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-black shadow-md">
                        {isAr ? 'الأكثر طلباً' : 'Popular'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-extrabold text-white">
                        {isAr ? item.nameAr : item.nameEn}
                      </h4>
                      <p className="text-[11px] text-stone-400 font-sans mt-0.5 line-clamp-2">
                        {isAr ? item.descriptionAr : item.descriptionEn}
                      </p>
                    </div>
                    <div className="text-left shrink-0">
                      <span className="text-sm font-black text-gold-sparkle">
                        {item.price} <span className="text-[10px] font-mono">{isAr ? 'ر.س' : 'SAR'}</span>
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Quick Info Box */}
              <div className="bg-[#111] border border-white/10 rounded-2xl p-3 text-xs text-stone-400 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span>{isAr ? 'حالة الصورة:' : 'Image Status:'}</span>
                  <span className="text-emerald-400 font-bold font-mono">
                    {currentImageUrl.startsWith('data:') 
                      ? (isAr ? 'صورة مرفوعة محلياً' : 'Local Data') 
                      : (currentImageUrl ? (isAr ? 'رابط نشط' : 'Active URL') : (isAr ? 'فارغة' : 'Empty'))}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 font-bold rounded-2xl text-xs transition cursor-pointer"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>

              <button
                type="button"
                onClick={handleSaveAndApply}
                disabled={isProcessing || !currentImageUrl}
                className="flex-1 py-3 bg-gold-button text-black font-extrabold rounded-2xl shadow-xl transition flex items-center justify-center gap-2 text-xs cursor-pointer border border-amber-200/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
                <span>{isAr ? 'حفظ وتطبيق الصورة' : 'Save & Apply Photo'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

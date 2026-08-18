import React from 'react';
import { 
  MenuItem, 
  SiteSettings, 
  DEFAULT_SITE_SETTINGS, 
  MenuCategory, 
  DEFAULT_CATEGORIES,
  CustomerReservation,
  DEFAULT_RESERVATIONS,
  ReservationStatus
} from '../types';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Image as ImageIcon, 
  Check, 
  X, 
  AlertCircle, 
  Sparkles, 
  RotateCcw, 
  Upload, 
  Save, 
  Coffee,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Eye,
  Sliders,
  ExternalLink,
  PhoneCall,
  Layers,
  FolderPlus,
  Tag,
  Filter,
  Calendar,
  Clock,
  Users,
  User,
  Phone,
  CheckCircle2,
  XCircle,
  Clock3,
  CalendarCheck,
  Download,
  Globe,
  Camera,
  Wand2
} from 'lucide-react';
import ItemImageEditorModal from './ItemImageEditorModal';

interface AdminDashboardProps {
  isAr: boolean;
  setIsAr?: (val: boolean) => void;
  // Reservations
  reservations: CustomerReservation[];
  onAddReservation: (res: CustomerReservation) => void;
  onUpdateReservation: (res: CustomerReservation) => void;
  onDeleteReservation: (id: string) => void;
  onResetReservations: () => void;
  // Menu Categories
  categories: MenuCategory[];
  onAddCategory: (cat: MenuCategory) => void;
  onUpdateCategory: (cat: MenuCategory) => void;
  onDeleteCategory: (id: string) => void;
  onResetCategories: () => void;
  // Menu Items
  menuItems: MenuItem[];
  onAddMenuItem: (item: MenuItem) => void;
  onUpdateMenuItem: (item: MenuItem) => void;
  onDeleteMenuItem: (id: string) => void;
  onResetToDefaults: () => void;
  // Site Settings
  siteSettings: SiteSettings;
  onUpdateSiteSettings: (settings: SiteSettings) => void;
  onResetSiteSettings: () => void;
  onClose: () => void;
}

export default function AdminDashboard({
  isAr,
  setIsAr,
  reservations,
  onAddReservation,
  onUpdateReservation,
  onDeleteReservation,
  onResetReservations,
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onResetCategories,
  menuItems,
  onAddMenuItem,
  onUpdateMenuItem,
  onDeleteMenuItem,
  onResetToDefaults,
  siteSettings,
  onUpdateSiteSettings,
  onResetSiteSettings,
  onClose,
}: AdminDashboardProps) {
  // Navigation tabs: Reservations, Categories, Menu Items, Logo, WhatsApp
  const [activeTab, setActiveTab] = React.useState<'reservations' | 'categories' | 'menu' | 'logo' | 'whatsapp'>('reservations');

  // Success Toast
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Editable SiteSettings copy
  const [localSettings, setLocalSettings] = React.useState<SiteSettings>(siteSettings);
  React.useEffect(() => {
    setLocalSettings(siteSettings);
  }, [siteSettings]);

  // ==========================================
  // RESERVATION MANAGEMENT STATE & HANDLERS
  // ==========================================
  const [resStatusFilter, setResStatusFilter] = React.useState<string>('all');
  const [resSearchQuery, setResSearchQuery] = React.useState<string>('');
  const [resDateFilter, setResDateFilter] = React.useState<string>('all');
  const [resModalView, setResModalView] = React.useState<'none' | 'add' | 'edit'>('none');
  const [editingRes, setEditingRes] = React.useState<CustomerReservation | null>(null);

  const [resFormData, setResFormData] = React.useState<{
    name: string;
    phone: string;
    guests: string;
    date: string;
    time: string;
    seating: 'indoor' | 'outdoor' | 'vip';
    notes: string;
    status: ReservationStatus;
  }>({
    name: '',
    phone: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    seating: 'indoor',
    notes: '',
    status: 'confirmed',
  });

  const handleOpenAddReservation = () => {
    setEditingRes(null);
    setResFormData({
      name: '',
      phone: '',
      guests: '2',
      date: new Date().toISOString().split('T')[0],
      time: '20:00',
      seating: 'indoor',
      notes: '',
      status: 'confirmed',
    });
    setResModalView('add');
  };

  const handleOpenEditReservation = (res: CustomerReservation) => {
    setEditingRes(res);
    setResFormData({
      name: res.name,
      phone: res.phone,
      guests: res.guests.toString(),
      date: res.date,
      time: res.time,
      seating: res.seating,
      notes: res.notes || '',
      status: res.status,
    });
    setResModalView('edit');
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resFormData.name.trim() || !resFormData.phone.trim()) {
      alert(isAr ? 'يرجى إدخال اسم العميل ورقم الهاتف' : 'Please enter customer name and phone');
      return;
    }

    if (resModalView === 'add') {
      const newRes: CustomerReservation = {
        id: `res_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        name: resFormData.name.trim(),
        phone: resFormData.phone.trim(),
        guests: parseInt(resFormData.guests, 10) || 2,
        date: resFormData.date,
        time: resFormData.time,
        seating: resFormData.seating,
        notes: resFormData.notes.trim() || undefined,
        status: resFormData.status,
        createdAt: new Date().toISOString(),
      };
      onAddReservation(newRes);
      triggerToast(isAr ? `تمت إضافة حجز ${newRes.name} بنجاح!` : `Reservation for ${newRes.name} added!`);
    } else if (resModalView === 'edit' && editingRes) {
      const updatedRes: CustomerReservation = {
        ...editingRes,
        name: resFormData.name.trim(),
        phone: resFormData.phone.trim(),
        guests: parseInt(resFormData.guests, 10) || 2,
        date: resFormData.date,
        time: resFormData.time,
        seating: resFormData.seating,
        notes: resFormData.notes.trim() || undefined,
        status: resFormData.status,
      };
      onUpdateReservation(updatedRes);
      triggerToast(isAr ? `تم تحديث حجز ${updatedRes.name}!` : `Reservation for ${updatedRes.name} updated!`);
    }

    setResModalView('none');
    setEditingRes(null);
  };

  const handleQuickStatusChange = (res: CustomerReservation, newStatus: ReservationStatus) => {
    const updated = { ...res, status: newStatus };
    onUpdateReservation(updated);
    triggerToast(
      isAr 
        ? `تم تغيير حالة حجز ${res.name} إلى (${getStatusLabel(newStatus, true)})` 
        : `Status for ${res.name} updated to ${getStatusLabel(newStatus, false)}`
    );
  };

  const handleDeleteReservationPrompt = (res: CustomerReservation) => {
    if (window.confirm(isAr ? `هل أنت متأكد من حذف حجز العميل: "${res.name}"؟` : `Delete reservation for "${res.name}"?`)) {
      onDeleteReservation(res.id);
      triggerToast(isAr ? 'تم حذف الحجز بنجاح.' : 'Reservation deleted.');
    }
  };

  const handleSendWhatsAppToCustomer = (res: CustomerReservation) => {
    const rawNumber = res.phone.replace(/[^0-9]/g, '');
    const cleanNumber = rawNumber.startsWith('05') ? `966${rawNumber.substring(1)}` : rawNumber;
    
    const message = isAr
      ? `مرحباً ${res.name}، يسعدنا في كافيه بسكوتشي (فرع حي التعاون) تأكيد حجز طاولتك:
📅 التاريخ: ${res.date}
⏰ الوقت: ${res.time}
👥 عدد الضيوف: ${res.guests} أشخاص
🪑 نوع الجلسة: ${res.seating === 'indoor' ? 'داخلية' : res.seating === 'vip' ? 'VIP خاصة' : 'خارجية'}

نتطلع لاستقبالكم والاستمتاع بأشهى أطباقنا وقهوتنا العضوية ☕️✨`
      : `Hello ${res.name}, Caffè Pascucci (Al Taawun) is delighted to confirm your table reservation:
📅 Date: ${res.date}
⏰ Time: ${res.time}
👥 Guests: ${res.guests} person(s)
🪑 Seating: ${res.seating}

We look forward to welcoming you for an exceptional coffee experience! ☕️✨`;

    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const handleExportCSV = () => {
    const headers = isAr 
      ? ['المعرف', 'الاسم', 'الهاتف', 'الضيوف', 'التاريخ', 'الوقت', 'الجلسة', 'الحالة', 'ملاحظات']
      : ['ID', 'Name', 'Phone', 'Guests', 'Date', 'Time', 'Seating', 'Status', 'Notes'];
    
    const rows = reservations.map(r => [
      r.id,
      r.name,
      r.phone,
      r.guests,
      r.date,
      r.time,
      r.seating,
      r.status,
      `"${(r.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pascucci_reservations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast(isAr ? 'تم تصدير ملف الحجوزات CSV بنجاح!' : 'Reservations CSV exported successfully!');
  };

  // Helper for reservation status labels
  const getStatusLabel = (status: ReservationStatus, arabic: boolean) => {
    switch (status) {
      case 'confirmed': return arabic ? 'مؤكد' : 'Confirmed';
      case 'pending': return arabic ? 'قيد الانتظار' : 'Pending';
      case 'completed': return arabic ? 'مكتمل' : 'Completed';
      case 'cancelled': return arabic ? 'ملغي' : 'Cancelled';
      default: return status;
    }
  };

  const getStatusBadgeClass = (status: ReservationStatus) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'pending': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-stone-500/20 text-stone-300 border-stone-500/30';
    }
  };

  const filteredReservations = reservations.filter(res => {
    const matchesStatus = resStatusFilter === 'all' || res.status === resStatusFilter;
    const q = resSearchQuery.toLowerCase();
    const matchesQuery = (
      res.name.toLowerCase().includes(q) ||
      res.phone.includes(q) ||
      res.date.includes(q) ||
      (res.notes && res.notes.toLowerCase().includes(q))
    );
    const today = new Date().toISOString().split('T')[0];
    const matchesDate = resDateFilter === 'all' 
      || (resDateFilter === 'today' && res.date === today)
      || (resDateFilter === 'upcoming' && res.date >= today);

    return matchesStatus && matchesQuery && matchesDate;
  });

  const pendingCount = reservations.filter(r => r.status === 'pending').length;
  const confirmedCount = reservations.filter(r => r.status === 'confirmed').length;
  const totalGuests = reservations.reduce((acc, curr) => acc + (curr.status !== 'cancelled' ? curr.guests : 0), 0);

  // ==========================================
  // CATEGORIES MANAGEMENT STATE & HANDLERS
  // ==========================================
  const [categoryModalView, setCategoryModalView] = React.useState<'none' | 'add' | 'edit'>('none');
  const [editingCategory, setEditingCategory] = React.useState<MenuCategory | null>(null);
  const [categoryFormData, setCategoryFormData] = React.useState<{
    id: string;
    nameAr: string;
    nameEn: string;
  }>({
    id: '',
    nameAr: '',
    nameEn: '',
  });

  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryFormData({ id: '', nameAr: '', nameEn: '' });
    setCategoryModalView('add');
  };

  const handleOpenEditCategory = (cat: MenuCategory) => {
    setEditingCategory(cat);
    setCategoryFormData({ id: cat.id, nameAr: cat.nameAr, nameEn: cat.nameEn });
    setCategoryModalView('edit');
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryFormData.nameAr.trim()) {
      alert(isAr ? 'يرجى كتابة اسم التصنيف بالعربي' : 'Please enter Arabic category name');
      return;
    }

    if (categoryModalView === 'add') {
      let generatedId = categoryFormData.id.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
      if (!generatedId) {
        generatedId = `cat_${Date.now().toString(36)}`;
      }
      if (categories.some(c => c.id === generatedId)) {
        generatedId = `${generatedId}_${Math.floor(Math.random() * 1000)}`;
      }

      const newCat: MenuCategory = {
        id: generatedId,
        nameAr: categoryFormData.nameAr.trim(),
        nameEn: categoryFormData.nameEn.trim() || categoryFormData.nameAr.trim(),
      };
      onAddCategory(newCat);
      triggerToast(isAr ? `تمت إضافة التصنيف: "${newCat.nameAr}" بنجاح!` : `Category "${newCat.nameEn}" added!`);
    } else if (categoryModalView === 'edit' && editingCategory) {
      const updatedCat: MenuCategory = {
        id: editingCategory.id,
        nameAr: categoryFormData.nameAr.trim(),
        nameEn: categoryFormData.nameEn.trim() || categoryFormData.nameAr.trim(),
      };
      onUpdateCategory(updatedCat);
      triggerToast(isAr ? `تم تعديل التصنيف: "${updatedCat.nameAr}" بنجاح!` : `Category updated!`);
    }

    setCategoryModalView('none');
    setEditingCategory(null);
  };

  const handleDeleteCategoryPrompt = (cat: MenuCategory) => {
    if (categories.length <= 1) {
      alert(isAr ? 'لا يمكن حذف التصنيف الأخير في القائمة.' : 'Cannot delete the only remaining category.');
      return;
    }
    const itemsInCat = menuItems.filter(item => item.category === cat.id);
    const confirmMsg = itemsInCat.length > 0
      ? (isAr 
          ? `تنبيه: يوجد (${itemsInCat.length}) صنف في تصنيف "${cat.nameAr}". هل أنت متأكد من حذف هذا التصنيف؟` 
          : `Warning: (${itemsInCat.length}) items are in "${cat.nameEn}". Delete anyway?`)
      : (isAr ? `هل أنت متأكد من حذف التصنيف "${cat.nameAr}"؟` : `Delete category "${cat.nameEn}"?`);

    if (window.confirm(confirmMsg)) {
      onDeleteCategory(cat.id);
      triggerToast(isAr ? `تم حذف التصنيف "${cat.nameAr}".` : `Category deleted.`);
    }
  };

  // ==========================================
  // MENU ITEM MANAGEMENT STATE & HANDLERS
  // ==========================================
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = React.useState<string>('all');
  const [menuView, setMenuView] = React.useState<'list' | 'form'>('list');
  const [editingItem, setEditingItem] = React.useState<MenuItem | null>(null);
  const [itemForImageEditor, setItemForImageEditor] = React.useState<MenuItem | null>(null);

  const handleOpenItemImageEditor = (item: MenuItem) => {
    setItemForImageEditor(item);
  };

  const handleSaveItemImageFromModal = (itemId: string, newImageUrl: string) => {
    const targetItem = menuItems.find(i => i.id === itemId);
    if (targetItem) {
      onUpdateMenuItem({ ...targetItem, image: newImageUrl });
    }
    if (editingItem && editingItem.id === itemId) {
      setMenuFormData(prev => ({ ...prev, image: newImageUrl }));
    }
    if (itemId === 'temp_new_item') {
      setMenuFormData(prev => ({ ...prev, image: newImageUrl }));
    }
    triggerToast(isAr ? 'تم تحديث وتعديل صورة الصنف بنجاح!' : 'Item photo updated successfully!');
  };

  const [menuFormData, setMenuFormData] = React.useState<{
    nameAr: string;
    nameEn: string;
    descriptionAr: string;
    descriptionEn: string;
    price: string;
    category: string;
    image: string;
    isOrganic: boolean;
    isPopular: boolean;
    tags: string;
  }>({
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    price: '20',
    category: categories[0]?.id || 'specialty',
    image: '',
    isOrganic: false,
    isPopular: false,
    tags: '',
  });

  const handleOpenAddMenuItem = () => {
    setEditingItem(null);
    setMenuFormData({
      nameAr: '',
      nameEn: '',
      descriptionAr: '',
      descriptionEn: '',
      price: '22',
      category: categories[0]?.id || 'specialty',
      image: '',
      isOrganic: false,
      isPopular: false,
      tags: isAr ? 'جديد, إيطالي' : 'New, Italian',
    });
    setMenuView('form');
  };

  const handleOpenEditMenuItem = (item: MenuItem) => {
    setEditingItem(item);
    setMenuFormData({
      nameAr: item.nameAr,
      nameEn: item.nameEn,
      descriptionAr: item.descriptionAr,
      descriptionEn: item.descriptionEn,
      price: item.price.toString(),
      category: item.category,
      image: item.image || '',
      isOrganic: !!item.isOrganic,
      isPopular: !!item.isPopular,
      tags: item.tags ? item.tags.join(', ') : '',
    });
    setMenuView('form');
  };

  const handleMenuItemFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setMenuFormData(prev => ({ ...prev, image: reader.result as string }));
          triggerToast(isAr ? 'تم تحميل صورة الصنف بنجاح!' : 'Item image uploaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMenuSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuFormData.nameAr || !menuFormData.price) {
      alert(isAr ? 'يرجى ملء الحقول الإلزامية' : 'Please fill required fields');
      return;
    }

    const tagsArray = menuFormData.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const itemToSave: MenuItem = {
      id: editingItem ? editingItem.id : `item_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      nameAr: menuFormData.nameAr.trim(),
      nameEn: menuFormData.nameEn.trim() || menuFormData.nameAr.trim(),
      descriptionAr: menuFormData.descriptionAr.trim() || (isAr ? 'صنف مميز محضر بأعلى معايير الجودة في كافيه بسكوتشي.' : 'Crafted with premium ingredients at Caffè Pascucci.'),
      descriptionEn: menuFormData.descriptionEn.trim() || menuFormData.descriptionAr.trim(),
      price: parseFloat(menuFormData.price) || 0,
      category: menuFormData.category,
      image: menuFormData.image.trim(),
      isOrganic: menuFormData.isOrganic,
      isPopular: menuFormData.isPopular,
      tags: tagsArray.length > 0 ? tagsArray : undefined,
    };

    if (editingItem) {
      onUpdateMenuItem(itemToSave);
      triggerToast(isAr ? 'تم تعديل الصنف بنجاح!' : 'Item updated successfully!');
    } else {
      onAddMenuItem(itemToSave);
      triggerToast(isAr ? 'تمت إضافة الصنف الجديد بنجاح إلى القائمة!' : 'New item added successfully!');
    }

    setMenuView('list');
    setEditingItem(null);
  };

  const handleMenuDelete = (id: string, name: string) => {
    if (window.confirm(isAr ? `هل أنت متأكد من حذف الصنف: "${name}"؟` : `Delete "${name}"?`)) {
      onDeleteMenuItem(id);
      triggerToast(isAr ? 'تم حذف الصنف من القائمة.' : 'Item deleted.');
    }
  };

  const filteredMenuItems = menuItems.filter(item => {
    const matchesCat = selectedCategoryFilter === 'all' || item.category === selectedCategoryFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery = (
      item.nameAr.toLowerCase().includes(q) ||
      item.nameEn.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.descriptionAr.toLowerCase().includes(q)
    );
    return matchesCat && matchesQuery;
  });

  // ==========================================
  // SITE SETTINGS & LOGO HANDLERS
  // ==========================================
  const handleSaveSettings = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onUpdateSiteSettings(localSettings);
    triggerToast(isAr ? 'تم حفظ الإعدادات واللوجو بنجاح!' : 'Settings and logo updated successfully!');
  };

  const handleResetSettings = () => {
    if (window.confirm(isAr ? 'هل تريد استعادة إعدادات اللوجو وواتساب الأصلية؟' : 'Reset logo and WhatsApp settings to defaults?')) {
      onResetSiteSettings();
      setLocalSettings(DEFAULT_SITE_SETTINGS);
      triggerToast(isAr ? 'تمت استعادة الإعدادات الافتراضية.' : 'Settings reset to default.');
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setLocalSettings(prev => ({
            ...prev,
            logoUrl: reader.result as string,
            logoWidth: '5cm',
            logoHeight: '2cm',
          }));
          triggerToast(isAr ? 'تم تحميل اللوجو بمقاس (5 سم × 2 سم) بنجاح!' : 'Logo uploaded at (5cm × 2cm)!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl overflow-y-auto flex flex-col antialiased">
      
      {/* Unified Sticky Header with Navigation Tabs (Prevents tabs from being covered or hidden) */}
      <header className="sticky top-0 z-40 bg-[#0F0F0F] border-b border-white/10 shadow-2xl flex flex-col shrink-0">
        
        {/* Top Bar Header */}
        <div className="px-4 sm:px-8 py-3.5 border-b border-white/5">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
            
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gold-shiny text-black border border-amber-200/50 shadow-md">
                <Sliders className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-black text-white">
                    {isAr ? 'لوحة تحكم كافيه بسكوتشي' : 'Caffè Pascucci Admin Control Panel'}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold">
                    {isAr ? 'الحجوزات • التصنيفات • القائمة • اللوجو' : 'Reservations • Categories • Menu • Logo'}
                  </span>
                </div>
                <p className="text-stone-400 text-xs mt-0.5">
                  {isAr 
                    ? 'إدارة حجوزات الطاولات، التصنيفات، الأصناف، الأسعار، اللوجو (5 سم × 2 سم)، ورقم واتساب' 
                    : 'Manage Customer Reservations, Categories, Menu Items, Logo (5cm × 2cm), and WhatsApp'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Global Language Switcher */}
              {setIsAr && (
                <button
                  type="button"
                  onClick={() => setIsAr(!isAr)}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10 text-xs font-mono transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                  title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
                >
                  <Globe className="h-3.5 w-3.5 text-amber-400" />
                  <span>{isAr ? 'EN' : 'العربية'}</span>
                </button>
              )}

              {(activeTab === 'logo' || activeTab === 'whatsapp') && (
                <button
                  type="button"
                  onClick={() => handleSaveSettings()}
                  className="px-4 sm:px-5 py-2 bg-gold-button text-black font-extrabold rounded-xl shadow-lg transition flex items-center gap-2 text-xs sm:text-sm cursor-pointer border border-amber-200/50"
                >
                  <Save className="h-4 w-4" />
                  <span>{isAr ? 'حفظ التعديلات' : 'Save Changes'}</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10 transition cursor-pointer"
                title={isAr ? 'إغلاق والعودة للموقع' : 'Close Dashboard'}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

          </div>
        </div>

        {/* 5 Main Navigation Tabs: Reservations, Categories, Menu, Logo, WhatsApp */}
        <div className="bg-[#0A0A0A] px-4 sm:px-8 py-2.5 overflow-x-auto scrollbar-none">
          <div className="max-w-6xl mx-auto flex items-center gap-2.5" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
            
            {/* Tab 1: Reservations */}
            <button
              type="button"
              onClick={() => setActiveTab('reservations')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
                activeTab === 'reservations'
                  ? 'bg-gold-shiny text-black shadow-md border border-amber-200/50'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              <CalendarCheck className="h-4 w-4" />
              <span>{isAr ? '1. إدارة الحجوزات' : '1. Table Reservations'}</span>
              <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px] font-mono font-bold">
                {reservations.length}
              </span>
              {pendingCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-black text-[9px] font-bold animate-pulse">
                  {pendingCount} {isAr ? 'جديد' : 'New'}
                </span>
              )}
            </button>

            {/* Tab 2: Categories */}
            <button
              type="button"
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
                activeTab === 'categories'
                  ? 'bg-gold-shiny text-black shadow-md border border-amber-200/50'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>{isAr ? '2. تصنيفات القائمة' : '2. Menu Categories'}</span>
              <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px] font-mono">{categories.length}</span>
            </button>

            {/* Tab 3: Menu Items */}
            <button
              type="button"
              onClick={() => setActiveTab('menu')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
                activeTab === 'menu'
                  ? 'bg-gold-shiny text-black shadow-md border border-amber-200/50'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              <Coffee className="h-4 w-4" />
              <span>{isAr ? '3. إدارة الأصناف' : '3. Manage Menu Items'}</span>
              <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px] font-mono">{menuItems.length}</span>
            </button>

            {/* Tab 4: Logo */}
            <button
              type="button"
              onClick={() => setActiveTab('logo')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
                activeTab === 'logo'
                  ? 'bg-gold-shiny text-black shadow-md border border-amber-200/50'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>{isAr ? '4. اللوجو (5 سم × 2 سم)' : '4. Logo (5cm × 2cm)'}</span>
            </button>

            {/* Tab 5: WhatsApp */}
            <button
              type="button"
              onClick={() => setActiveTab('whatsapp')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
                activeTab === 'whatsapp'
                  ? 'bg-gold-shiny text-black shadow-md border border-amber-200/50'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              <MessageSquare className="h-4 w-4 text-[#25D366]" />
              <span>{isAr ? '5. رقم واتساب للحجز' : '5. WhatsApp Booking'}</span>
            </button>

          </div>
        </div>

      </header>

      {/* Toast Alert Feedback */}
      {successMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-500/50 text-emerald-200 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <Check className="h-5 w-5 text-emerald-400" />
          <span className="text-sm font-bold">{successMessage}</span>
        </div>
      )}

      {/* Main Content View */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 flex-1 w-full" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
        
        {/* ========================================================================= */}
        {/* TAB 1: RESERVATION MANAGEMENT (NEW REQUEST)                               */}
        {/* ========================================================================= */}
        {activeTab === 'reservations' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Header & KPI Summary Cards */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <CalendarCheck className="h-5 w-5 text-amber-400" />
                  <span>{isAr ? 'إدارة حجوزات الطاولات والضيوف' : 'Table Reservations Management'}</span>
                </h2>
                <p className="text-stone-400 text-xs mt-1">
                  {isAr 
                    ? 'استعراض الحجوزات الواردة، تأكيدها، الاتصال بالعملاء عبر واتساب، وإضافة حجوزات يدوية.' 
                    : 'Review guest bookings, confirm tables, contact guests via WhatsApp, and add manual reservations.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 hover:text-white text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                  title={isAr ? 'تصدير الحجوزات بصيغة CSV' : 'Export Reservations to CSV'}
                >
                  <Download className="h-3.5 w-3.5 text-amber-400" />
                  <span>{isAr ? 'تصدير CSV' : 'Export CSV'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(isAr ? 'استعادة بيانات الحجوزات التجريبية؟' : 'Reset to demo reservations?')) {
                      onResetReservations();
                      triggerToast(isAr ? 'تمت استعادة الحجوزات الافتراضية.' : 'Demo reservations restored.');
                    }
                  }}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-red-950/40 border border-white/10 text-stone-400 hover:text-red-300 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>{isAr ? 'استعادة' : 'Reset'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenAddReservation}
                  className="px-4 py-2 bg-gold-button text-black font-extrabold rounded-xl shadow-lg transition flex items-center gap-1.5 text-xs cursor-pointer border border-amber-200/50"
                >
                  <Plus className="h-4 w-4" />
                  <span>{isAr ? 'إضافة حجز جديد' : 'New Booking'}</span>
                </button>
              </div>
            </div>

            {/* KPI Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-stone-400 text-xs font-medium flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-amber-400" />
                  <span>{isAr ? 'إجمالي الحجوزات' : 'Total Bookings'}</span>
                </span>
                <span className="text-2xl font-black text-white mt-2 font-mono">
                  {reservations.length}
                </span>
              </div>

              <div className="bg-[#0F0F0F] border border-amber-500/30 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-amber-300 text-xs font-medium flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5 text-amber-400" />
                  <span>{isAr ? 'بانتظار التأكيد' : 'Pending Confirmation'}</span>
                </span>
                <span className="text-2xl font-black text-amber-300 mt-2 font-mono">
                  {pendingCount}
                </span>
              </div>

              <div className="bg-[#0F0F0F] border border-emerald-500/30 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-emerald-300 text-xs font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{isAr ? 'حجوزات مؤكدة' : 'Confirmed Bookings'}</span>
                </span>
                <span className="text-2xl font-black text-emerald-400 mt-2 font-mono">
                  {confirmedCount}
                </span>
              </div>

              <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-stone-400 text-xs font-medium flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-blue-400" />
                  <span>{isAr ? 'إجمالي عدد الضيوف' : 'Total Expected Guests'}</span>
                </span>
                <span className="text-2xl font-black text-blue-400 mt-2 font-mono">
                  {totalGuests}
                </span>
              </div>
            </div>

            {/* Inline Add / Edit Reservation Modal Form */}
            {resModalView !== 'none' && (
              <div className="bg-[#0F0F0F] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fade-in gold-glow-subtle">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="h-5 w-5 text-[#C5A059]" />
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {resModalView === 'add'
                        ? (isAr ? 'إضافة حجز طاولة جديد' : 'Add New Table Reservation')
                        : (isAr ? `تعديل حجز: ${editingRes?.name}` : `Edit Reservation: ${editingRes?.name}`)}
                    </h3>
                  </div>
                  <button
                    onClick={() => setResModalView('none')}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleReservationSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Guest Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-200 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-amber-400" />
                        <span>{isAr ? 'اسم العميل *' : 'Guest Full Name *'}</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={resFormData.name}
                        onChange={(e) => setResFormData({ ...resFormData, name: e.target.value })}
                        placeholder={isAr ? 'مثال: محمد الغامدي' : 'e.g. Sultan Al-Otaibi'}
                        className="w-full p-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#C5A059] text-xs"
                      />
                    </div>

                    {/* Guest Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-200 flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-amber-400" />
                        <span>{isAr ? 'رقم الهاتف *' : 'Phone Number *'}</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={resFormData.phone}
                        onChange={(e) => setResFormData({ ...resFormData, phone: e.target.value })}
                        placeholder="05xxxxxxxx"
                        className="w-full p-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#C5A059] text-xs text-left"
                      />
                    </div>

                    {/* Guests Count */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-200 flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-amber-400" />
                        <span>{isAr ? 'عدد الضيوف *' : 'Guests Count *'}</span>
                      </label>
                      <select
                        value={resFormData.guests}
                        onChange={(e) => setResFormData({ ...resFormData, guests: e.target.value })}
                        className="w-full p-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 focus:outline-none focus:border-[#C5A059] text-xs"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                          <option key={num} value={num.toString()}>
                            {num} {isAr ? 'أشخاص' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-200 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-amber-400" />
                        <span>{isAr ? 'تاريخ الحجز *' : 'Date *'}</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={resFormData.date}
                        onChange={(e) => setResFormData({ ...resFormData, date: e.target.value })}
                        className="w-full p-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 focus:outline-none focus:border-[#C5A059] text-xs"
                      />
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-200 flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-amber-400" />
                        <span>{isAr ? 'وقت الحجز *' : 'Time *'}</span>
                      </label>
                      <input
                        type="time"
                        required
                        value={resFormData.time}
                        onChange={(e) => setResFormData({ ...resFormData, time: e.target.value })}
                        className="w-full p-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 focus:outline-none focus:border-[#C5A059] text-xs"
                      />
                    </div>

                    {/* Seating */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-200 block">
                        {isAr ? 'نوع الجلسة *' : 'Seating Location *'}
                      </label>
                      <select
                        value={resFormData.seating}
                        onChange={(e) => setResFormData({ ...resFormData, seating: e.target.value as any })}
                        className="w-full p-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 focus:outline-none focus:border-[#C5A059] text-xs"
                      >
                        <option value="indoor">{isAr ? 'جلسة داخلية' : 'Indoor Dining'}</option>
                        <option value="outdoor">{isAr ? 'جلسة خارجية' : 'Outdoor Terrace'}</option>
                        <option value="vip">{isAr ? 'جلسة VIP خاصة' : 'VIP Private Area'}</option>
                      </select>
                    </div>

                    {/* Status */}
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-xs font-bold text-stone-200 block">
                        {isAr ? 'حالة الحجز:' : 'Reservation Status:'}
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {(['pending', 'confirmed', 'completed', 'cancelled'] as ReservationStatus[]).map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setResFormData({ ...resFormData, status: st })}
                            className={`p-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                              resFormData.status === st
                                ? 'bg-gold-shiny text-black border-amber-300 shadow-md'
                                : 'bg-[#0A0A0A] text-stone-400 border-white/10 hover:border-white/20'
                            }`}
                          >
                            {getStatusLabel(st, isAr)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Special Notes */}
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-xs font-bold text-stone-200 block">
                        {isAr ? 'ملاحظات إضافية أو مناسبة خاصة:' : 'Special Occasion or Notes:'}
                      </label>
                      <input
                        type="text"
                        value={resFormData.notes}
                        onChange={(e) => setResFormData({ ...resFormData, notes: e.target.value })}
                        placeholder={isAr ? 'مثال: طاولة هادئة، احتفال تخرج، طلب قهوة خاصة...' : 'e.g. Anniversary celebration, quiet corner...'}
                        className="w-full p-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#C5A059] text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setResModalView('none')}
                      className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 text-xs font-bold rounded-xl transition"
                    >
                      {isAr ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gold-button text-black font-extrabold rounded-xl shadow-lg text-xs flex items-center gap-2 border border-amber-200/50"
                    >
                      <Save className="h-4 w-4" />
                      <span>{resModalView === 'add' ? (isAr ? 'حفظ الحجز' : 'Save Booking') : (isAr ? 'تحديث الحجز' : 'Update Booking')}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Search & Status Filters */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className={`absolute inset-y-0 ${isAr ? 'right-4' : 'left-4'} my-auto h-4 w-4 text-stone-500 pointer-events-none`} />
                  <input
                    type="text"
                    placeholder={isAr ? 'ابحث باسم العميل، الهاتف، أو التاريخ...' : 'Search by name, phone, or date...'}
                    value={resSearchQuery}
                    onChange={(e) => setResSearchQuery(e.target.value)}
                    className={`w-full py-2.5 ${isAr ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'} bg-[#0F0F0F] border border-white/10 rounded-xl text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-amber-400`}
                  />
                </div>

                {/* Status Filter Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {[
                    { id: 'all', labelAr: 'الكل', labelEn: 'All' },
                    { id: 'pending', labelAr: 'قيد الانتظار', labelEn: 'Pending' },
                    { id: 'confirmed', labelAr: 'مؤكدة', labelEn: 'Confirmed' },
                    { id: 'completed', labelAr: 'مكتملة', labelEn: 'Completed' },
                    { id: 'cancelled', labelAr: 'ملغية', labelEn: 'Cancelled' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setResStatusFilter(filter.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer shrink-0 ${
                        resStatusFilter === filter.id
                          ? 'bg-gold-shiny text-black font-bold'
                          : 'bg-white/5 text-stone-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {isAr ? filter.labelAr : filter.labelEn}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reservations Table List */}
            <div className="bg-[#0F0F0F] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs text-stone-300" style={{ textAlign: isAr ? 'right' : 'left' }}>
                  <thead className="bg-[#0A0A0A] text-stone-400 border-b border-white/10 uppercase font-mono text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">{isAr ? 'العميل والهاتف' : 'Guest & Phone'}</th>
                      <th className="p-4">{isAr ? 'التاريخ والوقت' : 'Date & Time'}</th>
                      <th className="p-4">{isAr ? 'الضيوف والجلسة' : 'Guests & Seating'}</th>
                      <th className="p-4">{isAr ? 'الملاحظات' : 'Notes'}</th>
                      <th className="p-4">{isAr ? 'الحالة' : 'Status'}</th>
                      <th className="p-4 text-center">{isAr ? 'تواصل وإجراءات' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredReservations.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-12 text-center text-stone-500">
                          <CalendarCheck className="h-8 w-8 mx-auto mb-2 text-stone-600" />
                          <p>{isAr ? 'لا توجد حجوزات مطابقة للمعايير المحددة' : 'No matching reservations found.'}</p>
                        </td>
                      </tr>
                    ) : (
                      filteredReservations.map((res) => (
                        <tr key={res.id} className="hover:bg-white/[0.02] transition">
                          
                          {/* Guest Info */}
                          <td className="p-4">
                            <strong className="text-white text-sm block">
                              {res.name}
                            </strong>
                            <a 
                              href={`tel:${res.phone}`}
                              className="text-[11px] text-amber-400 hover:underline font-mono inline-flex items-center gap-1 mt-0.5"
                            >
                              <Phone className="h-3 w-3" />
                              <span>{res.phone}</span>
                            </a>
                          </td>

                          {/* Date & Time */}
                          <td className="p-4">
                            <div className="flex items-center gap-1.5 text-stone-200 font-medium">
                              <Calendar className="h-3.5 w-3.5 text-amber-400" />
                              <span>{res.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-stone-400 font-mono text-[11px] mt-0.5">
                              <Clock className="h-3 w-3" />
                              <span>{res.time}</span>
                            </div>
                          </td>

                          {/* Guests & Seating */}
                          <td className="p-4">
                            <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-white inline-block mb-1">
                              {res.guests} {isAr ? 'أشخاص' : 'Guests'}
                            </span>
                            <span className="block text-[11px] text-stone-400">
                              {res.seating === 'indoor' ? (isAr ? 'جلسة داخلية' : 'Indoor') : res.seating === 'vip' ? (isAr ? 'VIP خاصة' : 'VIP') : (isAr ? 'خارجية' : 'Outdoor')}
                            </span>
                          </td>

                          {/* Notes */}
                          <td className="p-4 max-w-xs">
                            <p className="text-[11px] text-stone-300 line-clamp-2">
                              {res.notes || (isAr ? '—' : 'None')}
                            </p>
                          </td>

                          {/* Status with Quick Select */}
                          <td className="p-4">
                            <select
                              value={res.status}
                              onChange={(e) => handleQuickStatusChange(res, e.target.value as ReservationStatus)}
                              className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition cursor-pointer outline-none ${getStatusBadgeClass(res.status)} bg-[#0A0A0A]`}
                            >
                              <option value="pending" className="bg-[#0A0A0A] text-amber-300">{isAr ? 'قيد الانتظار' : 'Pending'}</option>
                              <option value="confirmed" className="bg-[#0A0A0A] text-emerald-400">{isAr ? 'مؤكد' : 'Confirmed'}</option>
                              <option value="completed" className="bg-[#0A0A0A] text-blue-300">{isAr ? 'مكتمل' : 'Completed'}</option>
                              <option value="cancelled" className="bg-[#0A0A0A] text-red-300">{isAr ? 'ملغي' : 'Cancelled'}</option>
                            </select>
                          </td>

                          {/* Actions */}
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              {/* WhatsApp Direct Confirmation */}
                              <button
                                type="button"
                                onClick={() => handleSendWhatsAppToCustomer(res)}
                                className="p-2 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black transition cursor-pointer"
                                title={isAr ? 'إرسال تأكيد الحجز عبر واتساب' : 'Send WhatsApp Confirmation'}
                              >
                                <MessageSquare className="h-4 w-4 fill-current" />
                              </button>

                              {/* Direct Call */}
                              <a
                                href={`tel:${res.phone}`}
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white transition cursor-pointer inline-flex"
                                title={isAr ? 'اتصال مباشر' : 'Call Customer'}
                              >
                                <PhoneCall className="h-4 w-4" />
                              </a>

                              {/* Edit */}
                              <button
                                type="button"
                                onClick={() => handleOpenEditReservation(res)}
                                className="p-2 rounded-lg bg-white/5 hover:bg-gold-button hover:text-black text-stone-300 transition cursor-pointer"
                                title={isAr ? 'تعديل الحجز' : 'Edit'}
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => handleDeleteReservationPrompt(res)}
                                className="p-2 rounded-lg bg-white/5 hover:bg-red-600 hover:text-white text-stone-400 transition cursor-pointer"
                                title={isAr ? 'حذف الحجز' : 'Delete'}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MENU CATEGORIES MANAGEMENT                                         */}
        {/* ========================================================================= */}
        {activeTab === 'categories' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Header & Add Category Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <Layers className="h-5 w-5 text-amber-400" />
                  <span>{isAr ? 'إدارة تصنيفات القائمة' : 'Menu Categories Management'}</span>
                </h2>
                <p className="text-stone-400 text-xs mt-1">
                  {isAr 
                    ? 'إضافة تصنيفات جديدة، تعديل مسمياتها بالعربي والإنجليزي، أو حذفها لتنظيم القائمة للعملاء.' 
                    : 'Create new categories, edit names in Arabic & English, or remove categories.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(isAr ? 'استعادة التصنيفات الافتراضية الأصلية؟' : 'Reset categories to default?')) {
                      onResetCategories();
                      triggerToast(isAr ? 'تمت استعادة التصنيفات الافتراضية.' : 'Categories reset to defaults.');
                    }
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-red-950/40 border border-white/10 text-stone-400 hover:text-red-300 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>{isAr ? 'استعادة الافتراضي' : 'Reset Defaults'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenAddCategory}
                  className="px-5 py-2.5 bg-gold-button text-black font-extrabold rounded-xl shadow-lg transition flex items-center gap-2 text-xs cursor-pointer border border-amber-200/50"
                >
                  <FolderPlus className="h-4 w-4" />
                  <span>{isAr ? 'إضافة تصنيف جديد' : 'Add New Category'}</span>
                </button>
              </div>
            </div>

            {/* Inline Modal/Card for Adding / Editing Category */}
            {categoryModalView !== 'none' && (
              <div className="bg-[#0F0F0F] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fade-in gold-glow-subtle">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-[#C5A059]" />
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {categoryModalView === 'add' 
                        ? (isAr ? 'إضافة تصنيف جديد للقائمة' : 'Add New Category')
                        : (isAr ? `تعديل تصنيف: ${editingCategory?.nameAr}` : `Edit Category: ${editingCategory?.nameEn}`)}
                    </h3>
                  </div>
                  <button
                    onClick={() => setCategoryModalView('none')}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleCategorySubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Arabic Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-200 block">
                        {isAr ? 'اسم التصنيف بالعربي *' : 'Arabic Category Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={categoryFormData.nameAr}
                        onChange={(e) => setCategoryFormData({ ...categoryFormData, nameAr: e.target.value })}
                        placeholder={isAr ? 'مثال: مشروبات الصيف المنعشة' : 'e.g. Refreshing Summer Drinks'}
                        className="w-full p-3.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#C5A059] text-sm"
                      />
                    </div>

                    {/* English Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-200 block">
                        {isAr ? 'اسم التصنيف بالإنجليزي' : 'English Category Name'}
                      </label>
                      <input
                        type="text"
                        value={categoryFormData.nameEn}
                        onChange={(e) => setCategoryFormData({ ...categoryFormData, nameEn: e.target.value })}
                        placeholder="e.g. Summer Refreshers"
                        className="w-full p-3.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#C5A059] text-sm text-left"
                      />
                    </div>

                    {/* Custom Slug / ID (Optional for add mode) */}
                    {categoryModalView === 'add' && (
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-xs font-bold text-stone-300 block">
                          {isAr ? 'رمز المعرّف الفريد للتصنيف (ID بالإنجليزية - اختياري):' : 'Unique ID / Slug (Optional):'}
                        </label>
                        <input
                          type="text"
                          value={categoryFormData.id}
                          onChange={(e) => setCategoryFormData({ ...categoryFormData, id: e.target.value })}
                          placeholder="e.g. summer_drinks"
                          className="w-full p-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-300 font-mono text-xs text-left"
                        />
                      </div>
                    )}

                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setCategoryModalView('none')}
                      className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 text-xs font-bold rounded-xl transition"
                    >
                      {isAr ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gold-button text-black font-extrabold rounded-xl shadow-lg text-xs flex items-center gap-2 border border-amber-200/50"
                    >
                      <Save className="h-4 w-4" />
                      <span>{categoryModalView === 'add' ? (isAr ? 'إضافة التصنيف' : 'Save Category') : (isAr ? 'حفظ التعديلات' : 'Update Category')}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Categories List Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((cat, idx) => {
                const count = menuItems.filter(i => i.category === cat.id).length;
                return (
                  <div 
                    key={cat.id} 
                    className="bg-[#0F0F0F] border border-white/10 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl transition flex flex-col justify-between gap-4 group relative"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-amber-300 font-bold">
                          #{idx + 1} • {cat.id}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-400/20 text-xs font-bold font-mono">
                          {count} {isAr ? 'أصناف' : 'Items'}
                        </span>
                      </div>

                      <h3 className="text-base font-extrabold text-white group-hover:text-gold-sparkle transition">
                        {isAr ? cat.nameAr : cat.nameEn}
                      </h3>
                      <p className="text-xs text-stone-400 font-medium mt-1 font-sans">
                        {isAr ? cat.nameEn : cat.nameAr}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategoryFilter(cat.id);
                          setActiveTab('menu');
                        }}
                        className="text-[11px] text-stone-400 hover:text-amber-300 font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <Filter className="h-3 w-3" />
                        <span>{isAr ? 'استعراض الأصناف' : 'Filter Items'}</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditCategory(cat)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-gold-button hover:text-black text-stone-300 transition cursor-pointer"
                          title={isAr ? 'تعديل التصنيف' : 'Edit Category'}
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCategoryPrompt(cat)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-red-600 hover:text-white text-stone-400 transition cursor-pointer"
                          title={isAr ? 'حذف التصنيف' : 'Delete Category'}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: MENU ITEMS MANAGEMENT                                              */}
        {/* ========================================================================= */}
        {activeTab === 'menu' && (
          <div>
            {menuView === 'form' ? (
              /* ADD / EDIT ITEM FORM */
              <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setMenuView('list')}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-400 hover:text-white transition cursor-pointer"
                  >
                    {isAr ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                    <span>{isAr ? 'الرجوع إلى جدول الأصناف' : 'Back to Items List'}</span>
                  </button>

                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    {editingItem 
                      ? (isAr ? `تعديل صنف: ${editingItem.nameAr}` : `Edit: ${editingItem.nameEn}`)
                      : (isAr ? 'إضافة صنف جديد إلى القائمة' : 'Add New Menu Item')}
                  </h2>
                </div>

                <form onSubmit={handleMenuSubmit} className="bg-[#0F0F0F] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
                  
                  {/* Names */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-bold text-stone-200">
                        {isAr ? 'اسم الصنف بالعربي *' : 'Arabic Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={menuFormData.nameAr}
                        onChange={(e) => setMenuFormData({ ...menuFormData, nameAr: e.target.value })}
                        placeholder={isAr ? 'مثال: بسكوتشينو كراميل مملح' : 'e.g. Salted Caramel Pascuccino'}
                        className="w-full p-3.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#C5A059] text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-bold text-stone-200">
                        {isAr ? 'اسم الصنف بالإنجليزي' : 'English Name'}
                      </label>
                      <input
                        type="text"
                        value={menuFormData.nameEn}
                        onChange={(e) => setMenuFormData({ ...menuFormData, nameEn: e.target.value })}
                        placeholder="e.g. Salted Caramel Pascuccino"
                        className="w-full p-3.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#C5A059] text-sm text-left"
                      />
                    </div>
                  </div>

                  {/* Category & Price */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs sm:text-sm font-bold text-stone-200">
                          {isAr ? 'تصنيف الصنف *' : 'Category *'}
                        </label>
                        <button
                          type="button"
                          onClick={() => setActiveTab('categories')}
                          className="text-[11px] text-amber-400 hover:underline font-bold"
                        >
                          {isAr ? '+ إدارة التصنيفات' : '+ Manage Categories'}
                        </button>
                      </div>
                      <select
                        value={menuFormData.category}
                        onChange={(e) => setMenuFormData({ ...menuFormData, category: e.target.value })}
                        className="w-full p-3.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 focus:outline-none focus:border-[#C5A059] text-sm"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id} className="bg-[#0A0A0A]">
                            {isAr ? c.nameAr : c.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-bold text-stone-200">
                        {isAr ? 'السعر (ريال سعودي) *' : 'Price (SAR) *'}
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        required
                        value={menuFormData.price}
                        onChange={(e) => setMenuFormData({ ...menuFormData, price: e.target.value })}
                        className="w-full p-3.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#C5A059] text-sm"
                      />
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-bold text-stone-200">
                        {isAr ? 'الوصف بالعربي' : 'Arabic Description'}
                      </label>
                      <textarea
                        rows={3}
                        value={menuFormData.descriptionAr}
                        onChange={(e) => setMenuFormData({ ...menuFormData, descriptionAr: e.target.value })}
                        placeholder={isAr ? 'اكتب تفاصيل النكهة والمكونات...' : 'Flavor notes, ingredients...'}
                        className="w-full p-3.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#C5A059] text-sm resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-bold text-stone-200">
                        {isAr ? 'الوصف بالإنجليزي' : 'English Description'}
                      </label>
                      <textarea
                        rows={3}
                        value={menuFormData.descriptionEn}
                        onChange={(e) => setMenuFormData({ ...menuFormData, descriptionEn: e.target.value })}
                        placeholder="Flavor notes, brewing method..."
                        className="w-full p-3.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#C5A059] text-sm resize-none text-left"
                      />
                    </div>
                  </div>

                  {/* Image Management */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="text-xs sm:text-sm font-bold text-stone-200 flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-[#C5A059]" />
                        <span>{isAr ? 'صورة الصنف واستوديو التعديل:' : 'Item Image & Photo Studio:'}</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const tempItem: MenuItem = {
                            id: editingItem ? editingItem.id : 'temp_new_item',
                            nameAr: menuFormData.nameAr || (isAr ? 'صنف جديد' : 'New Item'),
                            nameEn: menuFormData.nameEn || 'New Item',
                            descriptionAr: menuFormData.descriptionAr || '',
                            descriptionEn: menuFormData.descriptionEn || '',
                            price: parseFloat(menuFormData.price) || 0,
                            category: menuFormData.category,
                            image: menuFormData.image,
                            isOrganic: menuFormData.isOrganic,
                            isPopular: menuFormData.isPopular,
                          };
                          setItemForImageEditor(tempItem);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-gold-shiny text-black font-extrabold text-xs flex items-center gap-1.5 shadow-md border border-amber-200/50 hover:scale-105 transition cursor-pointer self-start sm:self-auto"
                      >
                        <Wand2 className="h-3.5 w-3.5" />
                        <span>{isAr ? 'فتح استوديو تعديل الصورة والفلاتر' : 'Open Photo Studio & Filters'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      <div className="md:col-span-8 space-y-4">
                        <input
                          type="url"
                          value={menuFormData.image}
                          onChange={(e) => setMenuFormData({ ...menuFormData, image: e.target.value })}
                          placeholder="https://example.com/image.jpg"
                          className="w-full p-3.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#C5A059] text-xs font-mono text-left"
                        />

                        <div className="flex items-center gap-3">
                          <label className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-stone-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition">
                            <Upload className="h-4 w-4 text-[#C5A059]" />
                            <span>{isAr ? 'رفع صورة من جهازك' : 'Upload from Device'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleMenuItemFileUpload}
                              className="hidden"
                            />
                          </label>
                          <span className="text-[11px] text-stone-500">
                            {isAr ? 'يدعم PNG, JPG, WebP' : 'Supports PNG, JPG, WebP'}
                          </span>
                        </div>
                      </div>

                      <div className="md:col-span-4 bg-[#0A0A0A] border border-white/10 rounded-2xl p-3 flex flex-col items-center justify-center text-center space-y-2">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                            {isAr ? 'معاينة الصورة' : 'Image Preview'}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const tempItem: MenuItem = {
                                id: editingItem ? editingItem.id : 'temp_new_item',
                                nameAr: menuFormData.nameAr || (isAr ? 'صنف جديد' : 'New Item'),
                                nameEn: menuFormData.nameEn || 'New Item',
                                descriptionAr: menuFormData.descriptionAr || '',
                                descriptionEn: menuFormData.descriptionEn || '',
                                price: parseFloat(menuFormData.price) || 0,
                                category: menuFormData.category,
                                image: menuFormData.image,
                                isOrganic: menuFormData.isOrganic,
                                isPopular: menuFormData.isPopular,
                              };
                              setItemForImageEditor(tempItem);
                            }}
                            className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 font-bold"
                          >
                            <Camera className="h-3 w-3" />
                            <span>{isAr ? 'تعديل وفلاتر' : 'Edit & Filters'}</span>
                          </button>
                        </div>
                        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-stone-900 border border-white/10 group cursor-pointer"
                          onClick={() => {
                            const tempItem: MenuItem = {
                              id: editingItem ? editingItem.id : 'temp_new_item',
                              nameAr: menuFormData.nameAr || (isAr ? 'صنف جديد' : 'New Item'),
                              nameEn: menuFormData.nameEn || 'New Item',
                              descriptionAr: menuFormData.descriptionAr || '',
                              descriptionEn: menuFormData.descriptionEn || '',
                              price: parseFloat(menuFormData.price) || 0,
                              category: menuFormData.category,
                              image: menuFormData.image,
                              isOrganic: menuFormData.isOrganic,
                              isPopular: menuFormData.isPopular,
                            };
                            setItemForImageEditor(tempItem);
                          }}
                        >
                          {menuFormData.image ? (
                            <>
                              <img
                                src={menuFormData.image}
                                alt="preview"
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1 text-amber-300 text-xs font-bold">
                                <Camera className="h-4 w-4" />
                                <span>{isAr ? 'تعديل الصورة' : 'Edit Photo'}</span>
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-600">
                              <ImageIcon className="h-10 w-10" />
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Badges & Tags */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="isOrganic"
                        checked={menuFormData.isOrganic}
                        onChange={(e) => setMenuFormData({ ...menuFormData, isOrganic: e.target.checked })}
                        className="h-5 w-5 rounded border-white/20 accent-[#C5A059] cursor-pointer"
                      />
                      <label htmlFor="isOrganic" className="text-xs sm:text-sm font-semibold text-stone-200 cursor-pointer">
                        {isAr ? 'عضوي حيوي 100% (Bio)' : '100% Organic (Bio)'}
                      </label>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="isPopular"
                        checked={menuFormData.isPopular}
                        onChange={(e) => setMenuFormData({ ...menuFormData, isPopular: e.target.checked })}
                        className="h-5 w-5 rounded border-white/20 accent-[#C5A059] cursor-pointer"
                      />
                      <label htmlFor="isPopular" className="text-xs sm:text-sm font-semibold text-stone-200 cursor-pointer">
                        {isAr ? 'الأكثر طلباً / مفضل (Popular)' : 'Popular / Best Seller'}
                      </label>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-300">
                        {isAr ? 'الوسوم (مفصولة بفاصلة)' : 'Tags (comma separated)'}
                      </label>
                      <input
                        type="text"
                        value={menuFormData.tags}
                        onChange={(e) => setMenuFormData({ ...menuFormData, tags: e.target.value })}
                        placeholder={isAr ? 'مثال: مميز, بارد' : 'e.g. Signature, Cold'}
                        className="w-full p-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 text-xs"
                      />
                    </div>
                  </div>

                  {/* Form Buttons */}
                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setMenuView('list')}
                      className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 font-bold rounded-xl text-xs sm:text-sm transition cursor-pointer"
                    >
                      {isAr ? 'إلغاء' : 'Cancel'}
                    </button>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 bg-gold-button text-black font-extrabold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer border border-amber-200/50"
                    >
                      <Save className="h-4 w-4" />
                      <span>{editingItem ? (isAr ? 'حفظ التعديلات' : 'Save Changes') : (isAr ? 'إضافة الصنف للقائمة' : 'Add Item to Menu')}</span>
                    </button>
                  </div>

                </form>
              </div>
            ) : (
              /* MENU ITEMS TABLE LIST */
              <div className="space-y-6 animate-fade-in">
                
                {/* Search & Category Filter Pills & Actions */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className={`absolute inset-y-0 ${isAr ? 'right-4' : 'left-4'} my-auto h-4 w-4 text-stone-500 pointer-events-none`} />
                      <input
                        type="text"
                        placeholder={isAr ? 'ابحث في أصناف القائمة...' : 'Search items...'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full py-2.5 ${isAr ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'} bg-[#0F0F0F] border border-white/10 rounded-xl text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-amber-400`}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          if (window.confirm(isAr ? 'استعادة الأصناف الأصلية الافتراضية؟' : 'Reset items to defaults?')) {
                            onResetToDefaults();
                            triggerToast(isAr ? 'تمت استعادة القائمة الأصلية.' : 'Menu reset to default.');
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-red-950/40 hover:border-red-500/30 border border-white/10 text-stone-400 hover:text-red-300 text-xs font-semibold transition flex items-center gap-2 cursor-pointer"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>{isAr ? 'استعادة القائمة الأصلية' : 'Reset Defaults'}</span>
                      </button>

                      <button
                        onClick={handleOpenAddMenuItem}
                        className="px-5 py-2.5 bg-gold-button text-black font-extrabold rounded-xl shadow-lg transition flex items-center gap-2 text-xs cursor-pointer border border-amber-200/50"
                      >
                        <Plus className="h-4 w-4" />
                        <span>{isAr ? 'إضافة صنف جديد' : 'Add Item'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    <span className="text-xs text-stone-500 font-bold shrink-0">{isAr ? 'تصفية بالتصنيف:' : 'Filter:'}</span>
                    <button
                      onClick={() => setSelectedCategoryFilter('all')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer shrink-0 ${
                        selectedCategoryFilter === 'all'
                          ? 'bg-amber-400 text-black font-bold'
                          : 'bg-white/5 text-stone-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {isAr ? 'كل التصنيفات' : 'All Categories'} ({menuItems.length})
                    </button>
                    {categories.map((c) => {
                      const cCount = menuItems.filter(i => i.category === c.id).length;
                      return (
                        <button
                          key={c.id}
                          onClick={() => setSelectedCategoryFilter(c.id)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer shrink-0 ${
                            selectedCategoryFilter === c.id
                              ? 'bg-amber-400 text-black font-bold'
                              : 'bg-white/5 text-stone-400 hover:text-white border border-white/5'
                          }`}
                        >
                          {isAr ? c.nameAr.split(' ')[0] : c.nameEn} ({cCount})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Table */}
                <div className="bg-[#0F0F0F] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs text-stone-300" style={{ textAlign: isAr ? 'right' : 'left' }}>
                      <thead className="bg-[#0A0A0A] text-stone-400 border-b border-white/10 uppercase font-mono text-[10px] tracking-wider">
                        <tr>
                          <th className="p-4">{isAr ? 'الصورة' : 'Image'}</th>
                          <th className="p-4">{isAr ? 'اسم الصنف' : 'Item Name'}</th>
                          <th className="p-4">{isAr ? 'التصنيف' : 'Category'}</th>
                          <th className="p-4">{isAr ? 'السعر' : 'Price'}</th>
                          <th className="p-4">{isAr ? 'المميزات' : 'Badges'}</th>
                          <th className="p-4 text-center">{isAr ? 'إجراءات' : 'Actions'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredMenuItems.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-12 text-center text-stone-500">
                              <AlertCircle className="h-8 w-8 mx-auto mb-2 text-stone-600" />
                              <p>{isAr ? 'لا توجد أصناف مطابقة للبحث أو التصنيف' : 'No matching items found.'}</p>
                            </td>
                          </tr>
                        ) : (
                          filteredMenuItems.map((item) => {
                            const catObj = categories.find(c => c.id === item.category);
                            return (
                              <tr key={item.id} className="hover:bg-white/[0.02] transition">
                                <td className="p-4">
                                  <div 
                                    onClick={() => handleOpenItemImageEditor(item)}
                                    className="relative h-14 w-16 rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/10 group/thumb cursor-pointer shadow-md hover:border-amber-400/60 transition flex items-center justify-center"
                                    title={isAr ? 'اضغط لتعديل صورة الصنف واستوديو الفلاتر' : 'Click to edit item photo & filters'}
                                  >
                                    {item.image ? (
                                      <img
                                        src={item.image}
                                        alt={item.nameAr}
                                        className="w-full h-full object-cover group-hover/thumb:scale-110 transition duration-300"
                                        referrerPolicy="no-referrer"
                                      />
                                    ) : (
                                      <ImageIcon className="h-6 w-6 text-stone-600" />
                                    )}
                                    <div className="absolute inset-0 bg-black/65 opacity-0 group-hover/thumb:opacity-100 transition flex flex-col items-center justify-center gap-0.5 text-amber-300">
                                      <Camera className="h-4 w-4" />
                                      <span className="text-[9px] font-bold">{isAr ? 'تعديل الصورة' : 'Edit Photo'}</span>
                                    </div>
                                  </div>
                                </td>

                                <td className="p-4">
                                  <strong className="text-white text-sm block">
                                    {isAr ? item.nameAr : item.nameEn}
                                  </strong>
                                  <span className="text-[11px] text-stone-400 font-mono block">
                                    {isAr ? item.nameEn : item.nameAr}
                                  </span>
                                </td>

                                <td className="p-4">
                                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-stone-300">
                                    {catObj ? (isAr ? catObj.nameAr : catObj.nameEn) : item.category}
                                  </span>
                                </td>

                                <td className="p-4">
                                  <span className="text-sm font-extrabold text-gold-sparkle">
                                    {item.price} <span className="text-[10px] font-mono">{isAr ? 'ر.س' : 'SAR'}</span>
                                  </span>
                                </td>

                                <td className="p-4">
                                  <div className="flex flex-wrap gap-1">
                                    {item.isOrganic && (
                                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                                        {isAr ? 'عضوي' : 'Organic'}
                                      </span>
                                    )}
                                    {item.isPopular && (
                                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold">
                                        {isAr ? 'مفضل' : 'Popular'}
                                      </span>
                                    )}
                                  </div>
                                </td>

                                <td className="p-4 text-center">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => handleOpenItemImageEditor(item)}
                                      className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-400 hover:text-black text-amber-300 transition cursor-pointer border border-amber-400/20"
                                      title={isAr ? 'تعديل صورة الصنف (استوديو الصور والفلاتر)' : 'Edit Item Photo & Filters'}
                                    >
                                      <Camera className="h-4 w-4" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleOpenEditMenuItem(item)}
                                      className="p-2 rounded-lg bg-white/5 hover:bg-gold-button hover:text-black text-stone-300 transition cursor-pointer"
                                      title={isAr ? 'تعديل الصنف' : 'Edit'}
                                    >
                                      <Edit3 className="h-4 w-4" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleMenuDelete(item.id, isAr ? item.nameAr : item.nameEn)}
                                      className="p-2 rounded-lg bg-white/5 hover:bg-red-600 hover:text-white text-stone-400 transition cursor-pointer"
                                      title={isAr ? 'حذف' : 'Delete'}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: LOGO SETTINGS (5cm x 2cm)                                          */}
        {/* ========================================================================= */}
        {activeTab === 'logo' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-400" />
                  <span>{isAr ? 'تغيير اللوجو والهوية (قياس 5 سم × 2 سم)' : 'Logo Settings (5cm × 2cm)'}</span>
                </h2>
                <p className="text-stone-400 text-xs mt-1">
                  {isAr 
                    ? 'رفع وتغيير صورة اللوجو مع ضمان عرضه بالمقاس المطلوب بدقة (العرض: 5 سم، الارتفاع: 2 سم).' 
                    : 'Upload and customize the logo with exact dimensions (Width: 5cm, Height: 2cm).'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetSettings}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-red-950/40 border border-white/10 text-stone-400 hover:text-red-300 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>{isAr ? 'استعادة الافتراضي' : 'Reset'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveSettings()}
                  className="px-5 py-2 bg-gold-button text-black font-extrabold rounded-xl shadow-lg transition flex items-center gap-1.5 text-xs cursor-pointer border border-amber-200/50"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>{isAr ? 'حفظ اللوجو' : 'Save Logo'}</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="bg-[#0F0F0F] border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 gold-glow-subtle">
              
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-3">
                <div className="bg-gold-shiny p-2 rounded-xl text-black shrink-0 mt-0.5">
                  <Eye className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <strong className="text-sm font-bold text-gold-sparkle block">
                    {isAr ? 'المقاس المعتمد للوجو: عرض 5 سم × طول 2 سم' : 'Certified Logo Dimensions: 5cm Width × 2cm Height'}
                  </strong>
                  <p className="text-xs text-stone-300">
                    {isAr 
                      ? 'يتم تطبيق المقاس (5cm × 2cm) بدقة متناهية على الشاشة الرئيسية وكافة أقسام الموقع.' 
                      : 'The logo renders strictly styled at 5cm width by 2cm height across all views.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Inputs */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-200 block">
                      {isAr ? 'رابط صورة اللوجو (URL):' : 'Logo Image URL:'}
                    </label>
                    <input
                      type="url"
                      value={localSettings.logoUrl}
                      onChange={(e) => setLocalSettings({ ...localSettings, logoUrl: e.target.value })}
                      placeholder="https://example.com/logo.png"
                      className="w-full p-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-[#C5A059] text-xs font-mono text-left"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-200 block">
                      {isAr ? 'أو ارفع ملف اللوجو من جهازك:' : 'Or Upload Logo File:'}
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-stone-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition">
                        <Upload className="h-4 w-4 text-[#C5A059]" />
                        <span>{isAr ? 'اختيار ملف اللوجو' : 'Choose Logo File'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[11px] text-stone-500">
                        {isAr ? 'يدعم PNG شفاف، SVG، JPG' : 'Supports Transparent PNG, SVG, JPG'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-200">
                        {isAr ? 'اسم الكافيه بالعربي' : 'Brand Name (AR)'}
                      </label>
                      <input
                        type="text"
                        value={localSettings.brandNameAr}
                        onChange={(e) => setLocalSettings({ ...localSettings, brandNameAr: e.target.value })}
                        className="w-full p-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-200">
                        {isAr ? 'اسم الكافيه بالإنجليزي' : 'Brand Name (EN)'}
                      </label>
                      <input
                        type="text"
                        value={localSettings.brandNameEn}
                        onChange={(e) => setLocalSettings({ ...localSettings, brandNameEn: e.target.value })}
                        className="w-full p-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 text-xs text-left"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-stone-200">
                        {isAr ? 'نص الزر الرئيسي في الصفحة' : 'Main Button Label'}
                      </label>
                      <input
                        type="text"
                        value={localSettings.buttonTextAr}
                        onChange={(e) => setLocalSettings({ ...localSettings, buttonTextAr: e.target.value })}
                        className="w-full p-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-gold-sparkle font-bold text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Preview */}
                <div className="lg:col-span-5 bg-[#0A0A0A] border border-amber-500/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="flex items-center justify-between w-full border-b border-white/10 pb-2">
                    <span className="text-[11px] font-mono text-gold-sparkle uppercase tracking-wider font-bold">
                      {isAr ? 'معاينة اللوجو الفعلية (5 سم × 2 سم)' : 'Exact 5cm × 2cm Live Preview'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-stone-400 font-mono">
                      {localSettings.logoWidth || '5cm'} × {localSettings.logoHeight || '2cm'}
                    </span>
                  </div>

                  <div className="p-4 bg-[#0F0F0F] rounded-2xl border border-white/10 flex items-center justify-center shadow-inner">
                    <div 
                      className="flex items-center justify-center overflow-hidden rounded-xl bg-[#0A0A0A] border-2 border-amber-400/40 p-1 shadow-2xl relative gold-glow-subtle"
                      style={{
                        width: localSettings.logoWidth || '5cm',
                        height: localSettings.logoHeight || '2cm',
                        maxWidth: '5cm',
                        maxHeight: '2cm',
                      }}
                    >
                      {localSettings.logoUrl ? (
                        <img
                          src={localSettings.logoUrl}
                          alt="Logo Preview"
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-1">
                          <Coffee className="h-4 w-4 text-amber-400" />
                          <span className="text-[11px] font-black text-white uppercase">{localSettings.brandNameEn}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-400">
                    {isAr ? 'هكذا سيظهر اللوجو مباشرة على الصفحة الرئيسية وزر القائمة' : 'This is how your logo renders on the landing button page.'}
                  </p>
                </div>

              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-gold-button text-black font-extrabold rounded-xl shadow-lg transition flex items-center gap-2 text-xs sm:text-sm cursor-pointer border border-amber-200/50"
                >
                  <Save className="h-4 w-4" />
                  <span>{isAr ? 'حفظ ونشر اللوجو' : 'Save & Publish Logo'}</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: WHATSAPP RESERVATION NUMBER & MESSAGE SETTINGS                     */}
        {/* ========================================================================= */}
        {activeTab === 'whatsapp' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-[#25D366]" />
                  <span>{isAr ? 'إعدادات رقم واتساب للحجز' : 'WhatsApp Booking Settings'}</span>
                </h2>
                <p className="text-stone-400 text-xs mt-1">
                  {isAr 
                    ? 'ضبط رقم الواتساب المخصص لاستقبال طلبات الحجز والاستفسارات، والرسالة التلقائية المجهزة للعملاء.' 
                    : 'Configure WhatsApp number and automated reservation message template.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleSaveSettings()}
                className="px-5 py-2 bg-gold-button text-black font-extrabold rounded-xl shadow-lg transition flex items-center gap-1.5 text-xs cursor-pointer border border-amber-200/50"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{isAr ? 'حفظ واتساب' : 'Save WhatsApp'}</span>
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="bg-[#0F0F0F] border border-[#25D366]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-200 flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-[#25D366]" />
                  <span>{isAr ? 'رقم الواتساب الدولي (مع مفتاح الدولة بدون + أو أصفار):' : 'WhatsApp Number (with country code):'}</span>
                </label>
                <input
                  type="text"
                  required
                  value={localSettings.whatsappNumber}
                  onChange={(e) => setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })}
                  placeholder="966500000000"
                  className="w-full p-3.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#25D366] text-left"
                />
                <p className="text-[11px] text-stone-500">
                  {isAr ? 'مثال للسعودية: 966501234567 (بدون + وبدون 00 في البداية)' : 'e.g. 966501234567'}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="text-xs font-bold text-stone-200">
                  {isAr ? 'نص رسالة الحجز التلقائية (عربي):' : 'Pre-filled Arabic Message Template:'}
                </label>
                <textarea
                  rows={3}
                  value={localSettings.whatsappMessageAr}
                  onChange={(e) => setLocalSettings({ ...localSettings, whatsappMessageAr: e.target.value })}
                  className="w-full p-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-[#25D366] resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-200">
                  {isAr ? 'نص رسالة الحجز التلقائية (إنجليزي):' : 'Pre-filled English Message Template:'}
                </label>
                <textarea
                  rows={3}
                  value={localSettings.whatsappMessageEn}
                  onChange={(e) => setLocalSettings({ ...localSettings, whatsappMessageEn: e.target.value })}
                  className="w-full p-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-[#25D366] resize-none text-left"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <strong className="text-xs font-bold text-stone-200 block">
                    {isAr ? 'تجربة رابط الحجز المباشر:' : 'Test WhatsApp Direct Link:'}
                  </strong>
                  <span className="text-[11px] text-stone-500 font-mono">
                    https://wa.me/{localSettings.whatsappNumber.replace(/[^0-9]/g, '')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const raw = localSettings.whatsappNumber.replace(/[^0-9]/g, '');
                    const text = encodeURIComponent(isAr ? localSettings.whatsappMessageAr : localSettings.whatsappMessageEn);
                    window.open(`https://wa.me/${raw}?text=${text}`, '_blank', 'noopener,noreferrer');
                  }}
                  className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold rounded-xl text-xs flex items-center gap-2 cursor-pointer transition shadow-md"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>{isAr ? 'فتح المحادثة للتجربة' : 'Test Open WhatsApp'}</span>
                </button>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-gold-button text-black font-extrabold rounded-xl shadow-lg transition flex items-center gap-2 text-xs sm:text-sm cursor-pointer border border-amber-200/50"
                >
                  <Save className="h-4 w-4" />
                  <span>{isAr ? 'حفظ إعدادات واتساب' : 'Save WhatsApp Settings'}</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>

      {/* Global Item Image Editor Studio Modal */}
      <ItemImageEditorModal
        isAr={isAr}
        isOpen={!!itemForImageEditor}
        item={itemForImageEditor}
        onClose={() => setItemForImageEditor(null)}
        onSaveImage={handleSaveItemImageFromModal}
      />

    </div>
  );
}

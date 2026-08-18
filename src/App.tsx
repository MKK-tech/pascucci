import React from 'react';
import MainButtonLanding from './components/MainButtonLanding';
import Menu from './components/Menu';
import ReservationModal from './components/ReservationModal';
import AdminDashboard from './components/AdminDashboard';
import { 
  MENU_ITEMS, 
  MenuItem, 
  SiteSettings, 
  DEFAULT_SITE_SETTINGS, 
  MenuCategory, 
  DEFAULT_CATEGORIES,
  CustomerReservation,
  DEFAULT_RESERVATIONS
} from './types';

const MENU_STORAGE_KEY = 'pascucci_custom_menu_items_v2';
const SITE_SETTINGS_STORAGE_KEY = 'pascucci_custom_site_settings_v2';
const CATEGORIES_STORAGE_KEY = 'pascucci_custom_categories_v2';
const RESERVATIONS_STORAGE_KEY = 'pascucci_custom_reservations_v2';

export default function App() {
  const [isAr, setIsAr] = React.useState<boolean>(true);
  
  // Page view state: 'landing' (Single Button Page) or 'menu' (Full Menu View)
  const [currentPage, setCurrentPage] = React.useState<'landing' | 'menu'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#menu') {
        return 'menu';
      }
    }
    return 'landing';
  });

  // Modal states
  const [isReservationOpen, setIsReservationOpen] = React.useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = React.useState<boolean>(false);

  // Dynamic Reservations stored in localStorage with fallback to DEFAULT_RESERVATIONS
  const [reservations, setReservations] = React.useState<CustomerReservation[]>(() => {
    try {
      const saved = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading saved reservations:', e);
    }
    return DEFAULT_RESERVATIONS;
  });

  // Dynamic Categories stored in localStorage with fallback to default categories
  const [categories, setCategories] = React.useState<MenuCategory[]>(() => {
    try {
      const saved = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading saved categories:', e);
    }
    return DEFAULT_CATEGORIES;
  });

  // Dynamic Menu Items stored in localStorage with fallback to default initial items
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(MENU_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading saved menu items:', e);
    }
    return MENU_ITEMS;
  });

  // Dynamic Site Settings (Logo 5cm x 2cm, WhatsApp Number, Slogan, etc.)
  const [siteSettings, setSiteSettings] = React.useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(SITE_SETTINGS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            ...DEFAULT_SITE_SETTINGS,
            ...parsed,
            logoWidth: '5cm',
            logoHeight: '2cm',
          };
        }
      }
    } catch (e) {
      console.error('Error loading saved site settings:', e);
    }
    return DEFAULT_SITE_SETTINGS;
  });

  // Persistence helpers
  const saveReservations = (newReservations: CustomerReservation[]) => {
    setReservations(newReservations);
    try {
      localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(newReservations));
    } catch (e) {
      console.error('Error saving reservations:', e);
    }
  };

  const saveCategories = (newCategories: MenuCategory[]) => {
    setCategories(newCategories);
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(newCategories));
    } catch (e) {
      console.error('Error saving categories:', e);
    }
  };

  const saveMenuItems = (newItems: MenuItem[]) => {
    setMenuItems(newItems);
    try {
      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(newItems));
    } catch (e) {
      console.error('Error saving menu items:', e);
    }
  };

  const saveSiteSettings = (newSettings: SiteSettings) => {
    const sanitized = {
      ...newSettings,
      logoWidth: '5cm',
      logoHeight: '2cm',
    };
    setSiteSettings(sanitized);
    try {
      localStorage.setItem(SITE_SETTINGS_STORAGE_KEY, JSON.stringify(sanitized));
    } catch (e) {
      console.error('Error saving site settings:', e);
    }
  };

  // Reservation Actions
  const handleAddReservation = (res: CustomerReservation) => {
    const updated = [res, ...reservations];
    saveReservations(updated);
  };

  const handleUpdateReservation = (updatedRes: CustomerReservation) => {
    const updated = reservations.map(r => (r.id === updatedRes.id ? updatedRes : r));
    saveReservations(updated);
  };

  const handleDeleteReservation = (id: string) => {
    const updated = reservations.filter(r => r.id !== id);
    saveReservations(updated);
  };

  const handleResetReservations = () => {
    saveReservations(DEFAULT_RESERVATIONS);
  };

  // Category Actions
  const handleAddCategory = (category: MenuCategory) => {
    const updated = [...categories, category];
    saveCategories(updated);
  };

  const handleUpdateCategory = (updatedCategory: MenuCategory) => {
    const updated = categories.map(cat => (cat.id === updatedCategory.id ? updatedCategory : cat));
    saveCategories(updated);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const updated = categories.filter(cat => cat.id !== categoryId);
    saveCategories(updated);
  };

  const handleResetCategories = () => {
    saveCategories(DEFAULT_CATEGORIES);
  };

  // Menu Item Actions
  const handleAddMenuItem = (item: MenuItem) => {
    const updated = [item, ...menuItems];
    saveMenuItems(updated);
  };

  const handleUpdateMenuItem = (updatedItem: MenuItem) => {
    const updated = menuItems.map(item => (item.id === updatedItem.id ? updatedItem : item));
    saveMenuItems(updated);
  };

  const handleDeleteMenuItem = (id: string) => {
    const updated = menuItems.filter(item => item.id !== id);
    saveMenuItems(updated);
  };

  const handleResetToDefaults = () => {
    saveMenuItems(MENU_ITEMS);
  };

  const handleResetSiteSettings = () => {
    saveSiteSettings(DEFAULT_SITE_SETTINGS);
  };

  // Navigation handlers
  const handleOpenMenu = () => {
    setCurrentPage('menu');
    window.location.hash = 'menu';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to browser hash changes
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'menu') {
        setCurrentPage('menu');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-stone-100 font-sans selection:bg-[#C5A059] selection:text-black antialiased">
      
      {/* View Switcher: Single-Button Landing or Full Menu */}
      {currentPage === 'landing' ? (
        <MainButtonLanding
          isAr={isAr}
          setIsAr={setIsAr}
          siteSettings={siteSettings}
          onOpenMenu={handleOpenMenu}
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      ) : (
        <Menu
          isAr={isAr}
          setIsAr={setIsAr}
          menuItems={menuItems}
          categories={categories}
          onBack={handleBackToLanding}
          onReserve={() => setIsReservationOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
          siteSettings={siteSettings}
        />
      )}

      {/* Lightweight Quick Reservation Modal */}
      <ReservationModal
        isAr={isAr}
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        siteSettings={siteSettings}
        onAddReservation={handleAddReservation}
      />

      {/* Admin Dashboard Modal */}
      {isAdminOpen && (
        <AdminDashboard
          isAr={isAr}
          setIsAr={setIsAr}
          reservations={reservations}
          onAddReservation={handleAddReservation}
          onUpdateReservation={handleUpdateReservation}
          onDeleteReservation={handleDeleteReservation}
          onResetReservations={handleResetReservations}
          menuItems={menuItems}
          categories={categories}
          onAddCategory={handleAddCategory}
          onUpdateCategory={handleUpdateCategory}
          onDeleteCategory={handleDeleteCategory}
          onResetCategories={handleResetCategories}
          onAddMenuItem={handleAddMenuItem}
          onUpdateMenuItem={handleUpdateMenuItem}
          onDeleteMenuItem={handleDeleteMenuItem}
          onResetToDefaults={handleResetToDefaults}
          siteSettings={siteSettings}
          onUpdateSiteSettings={saveSiteSettings}
          onResetSiteSettings={handleResetSiteSettings}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

    </div>
  );
}

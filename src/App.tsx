import { useEffect, useMemo, useState } from 'react';
import { EditorialSection } from './components/EditorialSection';
import { HeroSection } from './components/HeroSection';
import { LightboxModal } from './components/LightboxModal';
import { LookbookGallery, type GalleryViewMode } from './components/LookbookGallery';
import { MarqueeRibbon } from './components/MarqueeRibbon';
import { Navbar } from './components/Navbar';
import { SavedLooksDrawer } from './components/SavedLooksDrawer';
import { LOOKBOOK_ITEMS, type LookCategory, type LookItem } from './data/lookbook';

const SAVED_STORAGE_KEY = 'marea_saved_looks_2026';
const THEME_STORAGE_KEY = 'marea_theme_mode';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<LookCategory>('all');
  const [viewMode, setViewMode] = useState<GalleryViewMode>('bento');
  const [selectedLookId, setSelectedLookId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark';
  });

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return ['tropical-look', 'ocean-blue'];
    try {
      const stored = window.localStorage.getItem(SAVED_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage read errors
    }
    return ['tropical-look', 'ocean-blue'];
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
      root.classList.remove('dark');
      window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
  }, [isDark]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // Ignore storage write errors
    }
  }, [savedIds]);

  const filteredLooks = useMemo(() => {
    if (activeCategory === 'all') return LOOKBOOK_ITEMS;
    return LOOKBOOK_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const savedLooks = useMemo(() => {
    return LOOKBOOK_ITEMS.filter((item) => savedIds.includes(item.id));
  }, [savedIds]);

  const activeLightboxIndex = useMemo(() => {
    if (!selectedLookId) return -1;
    return filteredLooks.findIndex((item) => item.id === selectedLookId);
  }, [filteredLooks, selectedLookId]);

  const activeLightboxLook: LookItem | null =
    activeLightboxIndex >= 0 ? filteredLooks[activeLightboxIndex] : null;

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleScrollToGallery = (category?: LookCategory) => {
    if (category) {
      setActiveCategory(category);
    }
    const el = document.getElementById('lookbook');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevLook = () => {
    if (filteredLooks.length === 0 || activeLightboxIndex < 0) return;
    const prevIdx =
      (activeLightboxIndex - 1 + filteredLooks.length) % filteredLooks.length;
    setSelectedLookId(filteredLooks[prevIdx].id);
  };

  const handleNextLook = () => {
    if (filteredLooks.length === 0 || activeLightboxIndex < 0) return;
    const nextIdx = (activeLightboxIndex + 1) % filteredLooks.length;
    setSelectedLookId(filteredLooks[nextIdx].id);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#18181B] transition-colors duration-200 dark:bg-[#0B0D10] dark:text-[#F4F3EF]">
      <Navbar
        savedCount={savedLooks.length}
        onOpenSaved={() => setIsDrawerOpen(true)}
      />

      <main>
        <HeroSection
          onExploreGallery={() => handleScrollToGallery()}
          onFilterSwimwear={() => handleScrollToGallery('swimwear')}
        />

        <MarqueeRibbon />

        <LookbookGallery
          looks={filteredLooks}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          onSelectLook={(look) => setSelectedLookId(look.id)}
        />

        <EditorialSection />
      </main>

      <footer
        id="archive"
        className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-4 px-6 py-10 text-xs text-[#6B675E] dark:text-[#9CA3AF] sm:flex-row sm:items-center lg:px-10"
      >
        <p>© 2026 Maréa Summer Fashion Lookbook. All rights reserved.</p>

        <div className="flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={() => handleScrollToGallery('all')}
            className="transition-colors hover:text-[#18181B] dark:hover:text-[#F4F3EF]"
          >
            All Plates
          </button>
          <button
            type="button"
            onClick={() => handleScrollToGallery('swimwear')}
            className="transition-colors hover:text-[#18181B] dark:hover:text-[#F4F3EF]"
          >
            Swimwear
          </button>
          <button
            type="button"
            onClick={() => handleScrollToGallery('resort')}
            className="transition-colors hover:text-[#18181B] dark:hover:text-[#F4F3EF]"
          >
            Resort Wear
          </button>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="transition-colors hover:text-[#18181B] dark:hover:text-[#F4F3EF]"
          >
            Saved Shortlist
          </button>
        </div>
      </footer>

      <LightboxModal
        look={activeLightboxLook}
        looks={filteredLooks}
        isSaved={
          activeLightboxLook ? savedIds.includes(activeLightboxLook.id) : false
        }
        onClose={() => setSelectedLookId(null)}
        onPrev={handlePrevLook}
        onNext={handleNextLook}
        onSelectLook={(look) => setSelectedLookId(look.id)}
        onToggleSave={handleToggleSave}
        totalCount={filteredLooks.length}
        currentIndex={activeLightboxIndex}
      />

      <SavedLooksDrawer
        isOpen={isDrawerOpen}
        savedLooks={savedLooks}
        onClose={() => setIsDrawerOpen(false)}
        onRemove={handleToggleSave}
        onClearAll={() => setSavedIds([])}
        onSelectLook={(look) => {
          setActiveCategory('all');
          setSelectedLookId(look.id);
        }}
      />
    </div>
  );
}

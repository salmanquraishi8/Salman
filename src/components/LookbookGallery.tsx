import { Bookmark, LayoutGrid, Columns3, Moon, Sun, ArrowUpRight } from 'lucide-react';
import { CATEGORY_OPTIONS, type LookCategory, type LookItem } from '../data/lookbook';
import { LookImage } from './LookImage';

export type GalleryViewMode = 'bento' | 'grid';

interface LookbookGalleryProps {
  looks: LookItem[];
  activeCategory: LookCategory;
  onCategoryChange: (category: LookCategory) => void;
  viewMode: GalleryViewMode;
  onViewModeChange: (mode: GalleryViewMode) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectLook: (look: LookItem) => void;
}

export function LookbookGallery({
  looks,
  activeCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
  isDark,
  onToggleTheme,
  savedIds,
  onToggleSave,
  onSelectLook,
}: LookbookGalleryProps) {
  const showBentoLead = viewMode === 'bento' && activeCategory === 'all';

  return (
    <section
      id="lookbook"
      className="border-b border-[#E5E2DC] dark:border-[#222730]"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-14 lg:px-10 lg:py-20">
        <div
          id="collections"
          className="flex flex-col gap-6 border-b border-[#E5E2DC] pb-8 dark:border-[#222730] lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="space-y-2">
            <p className="text-xs font-medium text-[#6B675E] dark:text-[#9CA3AF]">
              Curated Collection · <span className="font-mono tabular-nums">{String(looks.length).padStart(2, '0')}</span> Plates
            </p>
            <h2
              className="font-display text-3xl font-medium tracking-tight text-[#18181B] dark:text-[#F4F3EF] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              The Coastal Lookbook
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
            <div
              role="group"
              aria-label="Filter looks by category"
              className="flex flex-wrap items-center gap-1 rounded-lg bg-[#EFECE5] p-1 dark:bg-[#161B22]"
            >
              {CATEGORY_OPTIONS.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onCategoryChange(cat.id)}
                    aria-pressed={isActive}
                    className={`min-h-[36px] rounded-md px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F] ${
                      isActive
                        ? 'bg-white text-[#18181B] shadow-xs dark:bg-[#242B35] dark:text-[#F4F3EF]'
                        : 'text-[#52525B] hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:text-[#F4F3EF]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <div
                role="group"
                aria-label="Gallery layout"
                className="hidden sm:flex items-center gap-1 rounded-lg bg-[#EFECE5] p-1 dark:bg-[#161B22]"
              >
                <button
                  type="button"
                  onClick={() => onViewModeChange('bento')}
                  aria-pressed={viewMode === 'bento'}
                  aria-label="Editorial Bento layout"
                  className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F] ${
                    viewMode === 'bento'
                      ? 'bg-white text-[#18181B] shadow-xs dark:bg-[#242B35] dark:text-[#F4F3EF]'
                      : 'text-[#52525B] hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:text-[#F4F3EF]'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Bento</span>
                </button>
                <button
                  type="button"
                  onClick={() => onViewModeChange('grid')}
                  aria-pressed={viewMode === 'grid'}
                  aria-label="Three column uniform grid"
                  className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F] ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#18181B] shadow-xs dark:bg-[#242B35] dark:text-[#F4F3EF]'
                      : 'text-[#52525B] hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:text-[#F4F3EF]'
                  }`}
                >
                  <Columns3 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Grid</span>
                </button>
              </div>

              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#D4D0C7] bg-white px-3.5 py-2 text-xs font-medium text-[#18181B] whitespace-nowrap shrink-0 transition-colors duration-200 hover:border-[#005F8F] hover:text-[#005F8F] dark:border-[#2E3440] dark:bg-[#161B22] dark:text-[#E5E7EB] dark:hover:border-[#38BDF8] dark:hover:text-[#38BDF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F]"
              >
                {isDark ? (
                  <>
                    <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Dark</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {looks.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-2xl text-[#18181B] dark:text-[#F4F3EF]">
              No looks found in this chapter.
            </p>
            <button
              type="button"
              onClick={() => onCategoryChange('all')}
              className="mt-4 inline-flex min-h-[40px] items-center rounded-lg bg-[#005F8F] px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#004A70]"
            >
              Show All Looks
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {looks.map((look, index) => {
              const isSaved = savedIds.includes(look.id);
              const isLeadBento = showBentoLead && index === 0;

              return (
                <article
                  key={look.id}
                  className={`group flex flex-col ${
                    isLeadBento ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl border border-[#E5E2DC] bg-[#EAE7DF] dark:border-[#222730] dark:bg-[#161B22] ${
                      isLeadBento
                        ? 'aspect-[4/3] lg:aspect-[16/10]'
                        : 'aspect-[3/4]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectLook(look)}
                      aria-label={`Open ${look.title} in fullscreen lookbook viewer`}
                      className="relative block h-full w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#005F8F]"
                    >
                      <LookImage
                        src={look.imageUrl}
                        alt={`${look.title} — ${look.subtitle} photographed at ${look.location}`}
                        fallbackTitle={look.title}
                        className="h-full w-full object-cover object-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/65 via-black/20 to-transparent px-4 py-3 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      >
                        <span>Open Lookbook Plate</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleSave(look.id)}
                      aria-label={
                        isSaved
                          ? `Remove ${look.title} from saved looks`
                          : `Save ${look.title} to lookbook`
                      }
                      aria-pressed={isSaved}
                      className={`absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border backdrop-blur-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F] ${
                        isSaved
                          ? 'border-[#005F8F] bg-[#005F8F] text-white dark:border-[#0284C7] dark:bg-[#0284C7]'
                          : 'border-white/40 bg-black/35 text-white hover:bg-black/60'
                      }`}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-4 border-b border-[#E5E2DC] pb-4 dark:border-[#222730]">
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B675E] dark:text-[#9CA3AF]">
                        <span className="font-mono tabular-nums">
                          Look {look.lookNumber}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{look.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{look.location}</span>
                      </div>

                      <h3 className="font-display text-2xl font-medium tracking-tight text-[#18181B] dark:text-[#F4F3EF]">
                        <button
                          type="button"
                          onClick={() => onSelectLook(look)}
                          className="text-left transition-colors hover:text-[#005F8F] dark:hover:text-[#38BDF8] focus-visible:outline-none focus-visible:underline"
                        >
                          {look.title}
                        </button>
                      </h3>

                      <p className="text-sm text-[#52525B] dark:text-[#A1A1AA]">
                        {look.subtitle}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectLook(look)}
                      aria-label={`Inspect details for ${look.title}`}
                      className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E5E2DC] text-[#52525B] transition-colors duration-200 hover:border-[#005F8F] hover:text-[#005F8F] dark:border-[#222730] dark:text-[#9CA3AF] dark:hover:border-[#38BDF8] dark:hover:text-[#38BDF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F]"
                    >
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

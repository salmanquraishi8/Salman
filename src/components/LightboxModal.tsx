import { useEffect, useState } from 'react';
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
} from 'lucide-react';
import type { LookItem } from '../data/lookbook';
import { LookImage } from './LookImage';

interface LightboxModalProps {
  look: LookItem | null;
  looks: LookItem[];
  isSaved: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectLook: (look: LookItem) => void;
  onToggleSave: (id: string) => void;
  totalCount: number;
  currentIndex: number;
}

export function LightboxModal({
  look,
  looks,
  isSaved,
  onClose,
  onPrev,
  onNext,
  onSelectLook,
  onToggleSave,
  totalCount,
  currentIndex,
}: LightboxModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setIsZoomed(false);
  }, [look?.id]);

  useEffect(() => {
    if (!look) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        onPrev();
      } else if (event.key === 'ArrowRight') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [look, onClose, onPrev, onNext]);

  if (!look) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 backdrop-blur-md transition-opacity duration-200 sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-[#E5E2DC] bg-[#FAF9F6] text-[#18181B] shadow-2xl dark:border-[#272D38] dark:bg-[#0E1217] dark:text-[#F4F3EF]"
      >
        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-12 lg:overflow-hidden">
          <div className="relative flex items-center justify-center bg-[#12151B] lg:col-span-8">
            <div className="relative flex h-[54vh] w-full items-center justify-center overflow-hidden sm:h-[64vh] lg:h-[76vh]">
              <button
                type="button"
                onClick={() => setIsZoomed((prev) => !prev)}
                aria-label={
                  isZoomed
                    ? 'Reset image zoom'
                    : 'Zoom in to inspect garment detail'
                }
                className="flex h-full w-full cursor-zoom-in items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#38BDF8]"
                style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
              >
                <LookImage
                  src={look.imageUrl}
                  alt={`${look.title} — ${look.subtitle} photographed at ${look.location}`}
                  fallbackTitle={look.title}
                  priority
                  className={`h-full w-full object-contain transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                />
              </button>

              {totalCount > 1 && (
                <>
                  <button
                    type="button"
                    onClick={onPrev}
                    aria-label="Previous look"
                    className="absolute top-1/2 left-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md transition-colors duration-200 hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Next look"
                    className="absolute top-1/2 right-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md transition-colors duration-200 hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              )}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 via-black/25 to-transparent px-4 py-3 text-xs text-white/90 sm:px-6">
                <span className="font-mono tabular-nums">
                  Plate {currentIndex + 1} of {totalCount}
                </span>
                <button
                  type="button"
                  onClick={() => setIsZoomed((prev) => !prev)}
                  className="pointer-events-auto inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-white/25 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {isZoomed ? (
                    <>
                      <Minimize2 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Fit View</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Zoom Detail</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between border-t border-[#E5E2DC] p-6 dark:border-[#272D38] sm:p-7 lg:col-span-4 lg:overflow-y-auto lg:border-t-0 lg:border-l">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B675E] dark:text-[#9CA3AF]">
                  <span className="font-mono tabular-nums">
                    Look {look.lookNumber}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{look.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{look.season}</span>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close lightbox modal"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E5E2DC] text-[#52525B] transition-colors hover:border-[#18181B] hover:text-[#18181B] dark:border-[#272D38] dark:text-[#9CA3AF] dark:hover:border-[#F4F3EF] dark:hover:text-[#F4F3EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-1.5">
                <h2
                  id="lightbox-title"
                  className="font-display text-3xl font-medium tracking-tight text-[#18181B] dark:text-[#F4F3EF] sm:text-4xl"
                >
                  {look.title}
                </h2>
                <p className="text-sm font-medium text-[#005F8F] dark:text-[#38BDF8]">
                  {look.subtitle}
                </p>
              </div>

              <p className="text-[15px] leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
                {look.description}
              </p>

              <dl className="space-y-3 border-t border-[#E5E2DC] pt-4 text-sm dark:border-[#272D38]">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-xs text-[#6B675E] dark:text-[#9CA3AF]">
                    Location
                  </dt>
                  <dd className="text-right font-medium text-[#18181B] dark:text-[#F4F3EF]">
                    {look.location}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-xs text-[#6B675E] dark:text-[#9CA3AF]">
                    Composition
                  </dt>
                  <dd className="text-right font-medium text-[#18181B] dark:text-[#F4F3EF]">
                    {look.fabric}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-xs text-[#6B675E] dark:text-[#9CA3AF]">
                    Camera EXIF
                  </dt>
                  <dd className="text-right font-mono text-xs tabular-nums text-[#52525B] dark:text-[#A1A1AA]">
                    {look.exif}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-xs text-[#6B675E] dark:text-[#9CA3AF]">
                    Tonal Palette
                  </dt>
                  <dd className="flex items-center gap-2">
                    {look.palette.map((hex) => (
                      <span
                        key={hex}
                        title={hex}
                        className="h-4 w-4 rounded-full border border-black/15 dark:border-white/20"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#E5E2DC] pt-4 dark:border-[#272D38]">
              <button
                type="button"
                onClick={() => onToggleSave(look.id)}
                aria-pressed={isSaved}
                className={`inline-flex min-h-[40px] items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F] ${
                  isSaved
                    ? 'bg-[#005F8F] text-white hover:bg-[#004A70] dark:bg-[#0284C7]'
                    : 'border border-[#D4D0C7] bg-white text-[#18181B] hover:border-[#005F8F] hover:text-[#005F8F] dark:border-[#2E3440] dark:bg-[#161B22] dark:text-[#F4F3EF]'
                }`}
              >
                <Bookmark
                  className={`h-3.5 w-3.5 ${isSaved ? 'fill-current' : ''}`}
                  aria-hidden="true"
                />
                <span>{isSaved ? 'Saved to Lookbook' : 'Save Look'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="min-h-[40px] rounded-lg border border-[#D4D0C7] px-4 py-2 text-xs font-medium text-[#52525B] whitespace-nowrap shrink-0 transition-colors hover:border-[#18181B] hover:text-[#18181B] dark:border-[#2E3440] dark:text-[#A1A1AA] dark:hover:border-[#F4F3EF] dark:hover:text-[#F4F3EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F]"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        {looks.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto border-t border-[#E5E2DC] bg-[#F4F2EC] px-4 py-3 dark:border-[#272D38] dark:bg-[#0B0D10]">
            {looks.map((item) => {
              const isCurrent = item.id === look.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectLook(item)}
                  aria-label={`View ${item.title}`}
                  aria-current={isCurrent ? 'true' : undefined}
                  className={`relative h-14 w-11 shrink-0 overflow-hidden rounded-md border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F] ${
                    isCurrent
                      ? 'border-[#005F8F] ring-2 ring-[#005F8F]/40 dark:border-[#38BDF8] dark:ring-[#38BDF8]/40'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <LookImage
                    src={item.imageUrl}
                    alt={item.title}
                    fallbackTitle={item.title}
                    className="h-full w-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

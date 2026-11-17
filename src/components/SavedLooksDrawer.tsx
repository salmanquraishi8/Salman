import { useEffect, useState } from 'react';
import { Check, Copy, Trash2, X } from 'lucide-react';
import type { LookItem } from '../data/lookbook';
import { LookImage } from './LookImage';

interface SavedLooksDrawerProps {
  isOpen: boolean;
  savedLooks: LookItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onSelectLook: (look: LookItem) => void;
}

export function SavedLooksDrawer({
  isOpen,
  savedLooks,
  onClose,
  onRemove,
  onClearAll,
  onSelectLook,
}: SavedLooksDrawerProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopySummary = async () => {
    if (savedLooks.length === 0) return;
    const summary = savedLooks
      .map(
        (item) =>
          `Look ${item.lookNumber}: ${item.title} (${item.categoryLabel}) — ${item.subtitle} [${item.fabric}]`
      )
      .join('\n');
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-drawer-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs"
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-md flex-col border-l border-[#E5E2DC] bg-[#FAF9F6] text-[#18181B] shadow-2xl dark:border-[#222730] dark:bg-[#0B0D10] dark:text-[#F4F3EF]"
      >
        <div className="flex items-center justify-between border-b border-[#E5E2DC] px-6 py-5 dark:border-[#222730]">
          <div>
            <h2
              id="saved-drawer-title"
              className="font-display text-2xl font-medium tracking-tight"
            >
              Saved Looks
            </h2>
            <p className="text-xs text-[#6B675E] dark:text-[#9CA3AF]">
              <span className="font-mono tabular-nums">{savedLooks.length}</span>{' '}
              {savedLooks.length === 1 ? 'plate' : 'plates'} curated for Summer 2026
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close saved looks drawer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5E2DC] text-[#52525B] transition-colors hover:border-[#18181B] hover:text-[#18181B] dark:border-[#272D38] dark:text-[#9CA3AF] dark:hover:border-[#F4F3EF] dark:hover:text-[#F4F3EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {savedLooks.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-display text-2xl text-[#18181B] dark:text-[#F4F3EF]">
                Your lookbook shortlist is empty
              </p>
              <p className="mt-2 max-w-xs text-sm text-[#52525B] dark:text-[#A1A1AA]">
                Select the bookmark icon on any photograph in the gallery to
                curate your personal summer edit.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[#E5E2DC] dark:divide-[#222730]">
              {savedLooks.map((look) => (
                <li key={look.id} className="flex items-center gap-4 py-4">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectLook(look);
                    }}
                    className="h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-[#E5E2DC] bg-[#EAE7DF] dark:border-[#222730] dark:bg-[#161B22]"
                  >
                    <LookImage
                      src={look.imageUrl}
                      alt={look.title}
                      fallbackTitle={look.title}
                      className="h-full w-full object-cover"
                    />
                  </button>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-[#6B675E] dark:text-[#9CA3AF]">
                      <span className="font-mono tabular-nums">
                        Look {look.lookNumber}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{look.categoryLabel}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectLook(look);
                      }}
                      className="block truncate text-left font-display text-xl font-medium text-[#18181B] hover:text-[#005F8F] dark:text-[#F4F3EF] dark:hover:text-[#38BDF8]"
                    >
                      {look.title}
                    </button>
                    <p className="truncate text-xs text-[#52525B] dark:text-[#A1A1AA]">
                      {look.subtitle}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemove(look.id)}
                    aria-label={`Remove ${look.title}`}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#6B675E] transition-colors hover:bg-[#EFECE5] hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:bg-[#161B22] dark:hover:text-[#F4F3EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F]"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {savedLooks.length > 0 && (
          <div className="flex items-center justify-between gap-3 border-t border-[#E5E2DC] px-6 py-4 dark:border-[#222730]">
            <button
              type="button"
              onClick={onClearAll}
              className="min-h-[40px] rounded-lg px-3 py-2 text-xs font-medium text-[#6B675E] transition-colors hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:text-[#F4F3EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F]"
            >
              Clear All
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#005F8F] px-4 py-2 text-xs font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#004A70] dark:bg-[#0284C7] dark:hover:bg-[#0369A1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Notes Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copy Lookbook List</span>
                </>
              )}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

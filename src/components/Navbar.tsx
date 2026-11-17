import { Bookmark } from 'lucide-react';

interface NavbarProps {
  savedCount: number;
  onOpenSaved: () => void;
}

export function Navbar({ savedCount, onOpenSaved }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E2DC] bg-[#FAF9F6]/90 backdrop-blur-md transition-colors duration-200 dark:border-[#222730] dark:bg-[#0B0D10]/90">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-6 py-4 lg:px-10">
        <a
          href="#top"
          className="font-display text-2xl font-semibold tracking-tight text-[#18181B] whitespace-nowrap shrink-0 transition-colors hover:text-[#005F8F] dark:text-[#F4F3EF] dark:hover:text-[#38BDF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F] rounded-sm"
        >
          Maréa
        </a>

        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#52525B] dark:text-[#A1A1AA]"
        >
          <a
            href="#lookbook"
            className="whitespace-nowrap shrink-0 py-1 transition-colors hover:text-[#18181B] hover:underline hover:underline-offset-4 dark:hover:text-[#F4F3EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F] rounded-sm"
          >
            Lookbook
          </a>
          <a
            href="#collections"
            className="whitespace-nowrap shrink-0 py-1 transition-colors hover:text-[#18181B] hover:underline hover:underline-offset-4 dark:hover:text-[#F4F3EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F] rounded-sm"
          >
            Collections
          </a>
          <a
            href="#materials"
            className="whitespace-nowrap shrink-0 py-1 transition-colors hover:text-[#18181B] hover:underline hover:underline-offset-4 dark:hover:text-[#F4F3EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F] rounded-sm"
          >
            Materials
          </a>
          <a
            href="#archive"
            className="whitespace-nowrap shrink-0 py-1 transition-colors hover:text-[#18181B] hover:underline hover:underline-offset-4 dark:hover:text-[#F4F3EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F] rounded-sm"
          >
            Archive
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenSaved}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#005F8F] px-4 py-2 text-xs font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#004A70] dark:bg-[#0284C7] dark:hover:bg-[#0369A1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0B0D10]"
          >
            <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Saved Looks</span>
            <span className="font-mono tabular-nums">({savedCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
}

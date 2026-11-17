import { ArrowDownRight } from 'lucide-react';
import { HERO_IMAGE_URL } from '../data/lookbook';
import { LookImage } from './LookImage';

interface HeroSectionProps {
  onExploreGallery: () => void;
  onFilterSwimwear: () => void;
}

const EDITORIAL_METRICS = [
  { value: '06', label: 'Curated Looks' },
  { value: '03', label: 'Coastal Chapters' },
  { value: '35mm', label: 'Leica Film Stock' },
  { value: '2026', label: 'Resort Monograph' },
];

export function HeroSection({
  onExploreGallery,
  onFilterSwimwear,
}: HeroSectionProps) {
  return (
    <section
      id="top"
      className="border-b border-[#E5E2DC] dark:border-[#222730]"
    >
      <div className="mx-auto max-w-[1280px] px-6 pt-10 pb-12 lg:px-10 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          <div className="flex flex-col justify-between lg:col-span-5 lg:py-4">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-[#6B675E] dark:text-[#9CA3AF]">
                <span>Summer 2026</span>
                <span aria-hidden="true">·</span>
                <span>Swimwear &amp; Resort Monograph</span>
              </div>

              <h1
                className="font-display text-[clamp(2.5rem,4.5vw,4.15rem)] font-medium leading-[1.04] tracking-tight text-[#18181B] dark:text-[#F4F3EF]"
                style={{ textWrap: 'balance' }}
              >
                Summer &amp; Beachwear Lookbook
              </h1>

              <p className="max-w-md text-[15px] leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
                Architectural swimwear, sun-washed Belgian linen, and handwoven
                coastal accessories photographed on 35mm film across the
                Mediterranean shoreline.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={onExploreGallery}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#18181B] px-6 py-3 text-sm font-medium text-[#FAF9F6] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#005F8F] dark:bg-[#F4F3EF] dark:text-[#0B0D10] dark:hover:bg-[#38BDF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F] focus-visible:ring-offset-2"
              >
                <span>Explore Gallery</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onFilterSwimwear}
                className="inline-flex min-h-[44px] items-center rounded-lg border border-[#D4D0C7] px-5 py-3 text-sm font-medium text-[#18181B] whitespace-nowrap shrink-0 transition-colors duration-200 hover:border-[#005F8F] hover:text-[#005F8F] dark:border-[#2E3440] dark:text-[#E5E7EB] dark:hover:border-[#38BDF8] dark:hover:text-[#38BDF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005F8F]"
              >
                View Swimwear Edit
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative h-full min-h-[340px] overflow-hidden rounded-2xl bg-[#EAE7DF] dark:bg-[#161B22] lg:min-h-[480px]">
              <LookImage
                src={HERO_IMAGE_URL}
                alt="Editorial portrait of model in ivory off-shoulder linen dress standing beneath a Mediterranean stone arch overlooking the sea"
                fallbackTitle="Aegean Terrace Editorial"
                priority
                className="h-full w-full object-cover object-center lg:h-full"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/90">
                  <span className="font-medium">
                    Cover Plate · Aegean Stone Terrace
                  </span>
                  <span className="font-mono tabular-nums text-white/80">
                    Leica M6 · 35mm · Golden Hour
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-[#E5E2DC] pt-8 dark:border-[#222730] md:grid-cols-4">
          {EDITORIAL_METRICS.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <div className="font-mono text-2xl font-medium tracking-tight text-[#18181B] tabular-nums dark:text-[#F4F3EF]">
                {metric.value}
              </div>
              <div className="text-xs text-[#6B675E] dark:text-[#9CA3AF]">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

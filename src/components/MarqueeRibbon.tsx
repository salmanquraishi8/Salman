const RIBBON_ITEMS = [
  'Swimwear',
  'Resort Wear',
  'Beach Style',
  'Mediterranean Light',
  'Summer 2026 Monograph',
  'Coastal Tailoring',
];

export function MarqueeRibbon() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-b border-[#E5E2DC] bg-[#F4F2EC] py-3 dark:border-[#222730] dark:bg-[#10141A]"
    >
      <div className="animate-marquee flex items-center gap-8 text-xs font-medium tracking-wide text-[#6B675E] dark:text-[#9CA3AF]">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center gap-8 shrink-0 pr-8">
            {RIBBON_ITEMS.map((item) => (
              <span key={`${dup}-${item}`} className="flex items-center gap-8 whitespace-nowrap">
                <span>{item}</span>
                <span className="text-[#B5B0A5] dark:text-[#4B5563]">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

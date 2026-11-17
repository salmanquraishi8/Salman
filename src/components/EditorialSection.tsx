import { CRAFT_CHAPTERS } from '../data/lookbook';

export function EditorialSection() {
  return (
    <section
      id="materials"
      className="border-b border-[#E5E2DC] bg-[#F4F2EC]/60 dark:border-[#222730] dark:bg-[#0F1318]"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-4">
            <p className="text-xs font-medium text-[#6B675E] dark:text-[#9CA3AF]">
              Atelier Provenance
            </p>
            <h2
              className="font-display text-3xl font-medium tracking-tight text-[#18181B] dark:text-[#F4F3EF]"
              style={{ textWrap: 'balance' }}
            >
              Materials Shaped by Salt &amp; Sun
            </h2>
            <p className="text-[15px] leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
              Every silhouette in the 2026 lookbook pairs coastal durability with
              quiet, breathable natural fibers.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-8">
            {CRAFT_CHAPTERS.map((chapter) => (
              <div
                key={chapter.number}
                className="flex flex-col justify-between border-t border-[#D4D0C7] pt-5 dark:border-[#2A303C]"
              >
                <div className="space-y-3">
                  <span className="font-mono text-xs font-medium text-[#005F8F] tabular-nums dark:text-[#38BDF8]">
                    {chapter.number}.
                  </span>
                  <h3 className="font-display text-xl font-medium text-[#18181B] dark:text-[#F4F3EF]">
                    {chapter.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
                    {chapter.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="relative bg-brand-ink py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-3 w-32 bg-white/15 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-12 w-64 bg-white/15 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-4 w-full max-w-2xl bg-white/10 rounded mx-auto animate-pulse" />
        </div>
      </section>

      {/* Cards skeleton */}
      <section className="bg-brand-cream py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-brand-gold/20 shadow-sm"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="aspect-[4/3] bg-brand-cream animate-pulse" />
                <div className="p-5 space-y-2">
                  <div className="h-3 w-16 bg-brand-gold/20 rounded animate-pulse" />
                  <div className="h-4 w-full bg-brand-ink/10 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-brand-ink/10 rounded animate-pulse" />
                  <div className="flex gap-2 mt-3">
                    <div className="h-8 flex-1 bg-brand-red/20 rounded-lg animate-pulse" />
                    <div className="h-8 flex-1 bg-brand-red/10 rounded-lg animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

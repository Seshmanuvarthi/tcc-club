export default function Loading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="relative bg-brand-ink py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-3 w-32 bg-white/15 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-12 w-56 bg-white/15 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-4 w-full max-w-2xl bg-white/10 rounded mx-auto animate-pulse" />
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="bg-brand-cream py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-white/60 border border-brand-gold/20 shadow-sm animate-pulse"
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

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

      {/* Card skeleton */}
      <section className="bg-brand-cream py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-brand-gold/30 shadow-xl">
            <div className="h-4 w-1/2 bg-brand-gold/20 rounded mb-4 animate-pulse" />
            <div className="aspect-[3/4] bg-brand-cream rounded-2xl animate-pulse" />
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <div className="h-10 w-32 bg-brand-gold/20 rounded-xl animate-pulse" />
              <div className="h-10 w-32 bg-brand-red/20 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

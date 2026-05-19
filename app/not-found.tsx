import Link from "next/link";
import Image from "next/image";
import { Home, Image as ImageIcon, Phone, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-brand-ink">
      <div className="absolute inset-0 hero-pattern opacity-40" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-red rounded-full blur-3xl opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-gold rounded-full blur-3xl opacity-10 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="inline-block relative mb-6">
          <div className="absolute inset-0 bg-brand-gold rounded-full blur-3xl opacity-20" />
          <Image
            src="/images/logo.png"
            alt="TCC Logo"
            width={120}
            height={120}
            className="relative drop-shadow-2xl mx-auto"
          />
        </div>

        <p className="text-brand-gold font-semibold tracking-widest uppercase text-sm mb-4">
          Page Not Found
        </p>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-4 leading-none">
          <span className="gold-gradient-text">404</span>
        </h1>
        <p className="text-brand-cream/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          We couldn&apos;t find the page you were looking for. It may have been
          moved, or the link you followed might be outdated.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-10">
          <Link
            href="/"
            className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-gold rounded-2xl p-5 flex flex-col items-center gap-2 transition-all"
          >
            <Home className="w-6 h-6 text-brand-gold" />
            <span className="text-white font-semibold text-sm">Home</span>
            <span className="text-brand-cream/50 text-xs">Start over</span>
          </Link>
          <Link
            href="/gallery"
            className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-gold rounded-2xl p-5 flex flex-col items-center gap-2 transition-all"
          >
            <ImageIcon className="w-6 h-6 text-brand-gold" />
            <span className="text-white font-semibold text-sm">Gallery</span>
            <span className="text-brand-cream/50 text-xs">Moments at TCC</span>
          </Link>
          <Link
            href="/contact"
            className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-gold rounded-2xl p-5 flex flex-col items-center gap-2 transition-all"
          >
            <Phone className="w-6 h-6 text-brand-gold" />
            <span className="text-white font-semibold text-sm">Contact</span>
            <span className="text-brand-cream/50 text-xs">Get in touch</span>
          </Link>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-brand-red/25"
        >
          Back to Homepage <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

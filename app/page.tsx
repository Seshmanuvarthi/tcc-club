import Link from "next/link";
import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";
import {
  Utensils, Users, Calendar, Trophy, ArrowRight,
  Building2, Sparkles, Award, MapPin, Phone,
} from "lucide-react";

const storySlides = [
  { src: "/images/ameneties.png", alt: "TCC World Class Amenities" },
  { src: "/images/banquets.png", alt: "TCC Banquets" },
  { src: "/images/gymandyoga.png", alt: "TCC Gym and Yoga Studio" },
  { src: "/images/restaurantandbar.png", alt: "TCC Restaurant and Bar" },
  { src: "/images/swimmingpool.png", alt: "TCC Swimming Pool" },
];

const stats = [
  { value: "5000+", label: "Active Members" },
  { value: "3", label: "Years of Legacy" },
  { value: "10+", label: "Facilities" },
  { value: "365", label: "Days of Service" },
];

const facilityPreviews = [
  { icon: Utensils, label: "Restaurant & Bar", href: "/facilities#dining" },
  { icon: Building2, label: "Banquets", href: "/facilities#banquets" },
  { icon: Trophy, label: "Sports & Games", href: "/facilities#sports" },
  { icon: Sparkles, label: "Swimming Pool", href: "/facilities#swimming" },
];

const highlights = [
  {
    icon: Award,
    title: "Heritage & Prestige",
    desc: "A distinguished gathering place for the Telangana contractors community since inception.",
  },
  {
    icon: Users,
    title: "Members-First Service",
    desc: "Every facility, every event, every meal is designed around our members and their families.",
  },
  {
    icon: Calendar,
    title: "Events That Matter",
    desc: "From cultural celebrations to business gatherings, the club hosts events that bring people together.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] h-[92vh] flex items-center overflow-hidden">
        {/* Banner background image */}
        <Image
          src="/images/banner.jpg"
          alt="TCC Banner"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Dark translucent overlay */}
        <div className="absolute inset-0 bg-brand-ink/85" />
        <div className="absolute inset-0 hero-pattern opacity-30" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-red rounded-full blur-3xl opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-gold rounded-full blur-3xl opacity-10 pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand-gold" />
              <p className="text-brand-gold font-semibold tracking-widest uppercase text-xs sm:text-sm">
                Telangana Contractors Cultural Club
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Where Tradition Meets{" "}
              <span className="gold-gradient-text">Excellence</span>
            </h1>
            <p className="text-brand-cream/80 text-lg sm:text-xl max-w-2xl mb-7 leading-relaxed">
              A premier members&apos; club celebrating the legacy of the
              Telangana contractors community, offering world-class banquets,
              dining, sports, swimming, and cultural experiences under one roof.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/online-booking"
                className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-brand-red/25"
              >
                Make a Booking <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/facilities"
                className="inline-flex items-center gap-2 border-2 border-brand-gold/60 hover:border-brand-gold text-brand-gold hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Explore Facilities
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
              {stats.map((s) => (
                <div key={s.label} className="text-left">
                  <p className="text-xl sm:text-2xl font-bold text-brand-gold mb-0.5">
                    {s.value}
                  </p>
                  <p className="text-brand-cream/60 text-xs leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 hidden lg:flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-gold rounded-full blur-3xl opacity-20" />
              <Image
                src="/images/logo.png"
                alt="TCC Logo"
                width={340}
                height={340}
                className="relative drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT / HISTORY ────────────────────────────── */}
      <section className="bg-brand-cream py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-2">
                Our Story
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink mb-3 leading-tight">
                A Legacy of the{" "}
                <span className="red-gradient-text">
                  Telangana Contractors Community
                </span>
              </h2>
              <p className="text-brand-ink/70 text-base mb-4 leading-relaxed">
                Founded in 2016 by contractors from across Telangana, TCC was
                envisioned as an exclusive members&apos; destination for
                fellowship, fine dining, sports, and cultural gatherings. Today
                it stands at Central Park, Serilingampalle, Hyderabad&apos;s
                first vertical club across seven floors.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-brand-red font-semibold hover:gap-3 transition-all text-sm"
              >
                More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-2 shadow-xl border border-brand-gold/30">
                <ImageCarousel
                  slides={storySlides}
                  intervalMs={2500}
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FACILITIES PREVIEW ────────────────────────── */}
      <section className="bg-white py-8 sm:py-10 border-y border-brand-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-3">
              What We Offer
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink mb-3">
              World-Class Facilities
            </h2>
            <div className="divider-gold w-32 mx-auto" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {facilityPreviews.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="bg-brand-cream rounded-2xl p-6 flex flex-col justify-between gap-3 border border-brand-gold/20 shadow-sm card-hover group min-h-35"
              >
                <div className="w-12 h-12 bg-brand-gold/10 group-hover:bg-brand-red rounded-xl flex items-center justify-center transition-colors shrink-0">
                  <Icon className="w-6 h-6 text-brand-gold-dark group-hover:text-white transition-colors" />
                </div>
                <p className="font-semibold text-brand-ink text-sm leading-snug flex-1">
                  {label}
                </p>
                <ArrowRight className="w-4 h-4 text-brand-ink/30 group-hover:text-brand-red transition-colors" />
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/facilities"
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              View All Facilities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ────────────────────────────────── */}
      <section className="bg-brand-ink py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <p className="text-brand-gold font-semibold uppercase tracking-widest text-sm mb-2">
              The TCC Difference
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Members Choose TCC
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {highlights.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 card-hover text-center"
              >
                <div className="w-11 h-11 bg-brand-gold/15 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-brand-gold" />
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{title}</h3>
                <p className="text-brand-cream/60 text-xs leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP CTA ────────────────────────────── */}
      <section className="bg-brand-red py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-gold font-semibold uppercase tracking-widest text-sm mb-2">
            Memberships Open Now
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Be Part of Something Greater
          </h2>
          <p className="text-white/85 text-sm mb-5 max-w-2xl mx-auto">
            Join the Telangana Contractors Cultural Club and experience a
            community built on tradition, hospitality, and excellence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white hover:bg-brand-cream text-brand-red font-bold px-8 py-4 rounded-xl transition-colors shadow-lg"
            >
              Enquire About Membership
            </Link>
            <Link
              href="/online-booking"
              className="border-2 border-white/40 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-colors"
            >
              Make a Booking
            </Link>
          </div>
        </div>
      </section>

      {/* ── LOCATION / MAP ───────────────────────────── */}
      <section className="bg-brand-cream py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-5">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-2">
              Visit Us
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink mb-2">
              Find Us in Hyderabad
            </h2>
            <div className="divider-gold w-32 mx-auto" />
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-brand-gold/20 shadow-sm">
                <div className="flex items-start gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-brand-red mt-0.5" />
                  <h3 className="font-bold text-brand-ink">Address</h3>
                </div>
                <p className="text-brand-ink/70 text-sm leading-relaxed ml-8">
                  Telangana Contractors Cultural Club,
                  <br />
                  Central Park, Serilingampalle (M),
                  <br />
                  Telangana 500084
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-brand-gold/20 shadow-sm">
                <div className="flex items-start gap-3 mb-2">
                  <Phone className="w-5 h-5 text-brand-red mt-0.5" />
                  <h3 className="font-bold text-brand-ink">Phone</h3>
                </div>
                <a
                  href="tel:+918121042251"
                  className="block text-brand-ink/70 text-sm ml-8 hover:text-brand-red"
                >
                  +91 81210 42251
                </a>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-brand-gold/20 h-full min-h-70">
                <iframe
                  title="TCC Location"
                  src="https://maps.google.com/maps?q=17.48142868331059,78.34402073747616&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 280 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

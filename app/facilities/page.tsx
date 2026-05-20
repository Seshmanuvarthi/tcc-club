import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Utensils, Building2, Waves, Dumbbell, Trophy,
  Bed, Music, Wine, Brain, Theater, ArrowRight, CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Explore TCCC's world-class facilities: luxury banquet halls, restaurant & bar, swimming pool, gym & yoga studio, amphitheatre, 30+ guest suites, indoor & outdoor games at Hyderabad's first vertical members' club.",
  openGraph: {
    title: "TCCC Facilities | Hyderabad's First Vertical Club",
    description:
      "Seven floors of banquets, dining, swimming, sports, wellness, and guest suites — all designed for the comfort and pride of TCCC members.",
    images: ["/images/ameneties.webp"],
  },
};

type Facility = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tagline: string;
  desc: string;
  bullets: string[];
  image?: string;
  reverse?: boolean;
};

const facilities: Facility[] = [
  {
    id: "banquets",
    icon: Building2,
    title: "Luxurious Banquets",
    tagline: "Celebrate Every Occasion",
    desc: "Host weddings, receptions, corporate events, and milestone celebrations in TCCC's grand banquet halls. Designed for elegance, equipped for every detail, and supported by a service team committed to making every event memorable.",
    bullets: [
      "Multiple banquet halls of varying capacities",
      "Customizable décor and seating arrangements",
      "In-house catering with multi-cuisine menus",
      "Audio-visual and stage support",
    ],
    image: "/images/banquets.webp",
  },
  {
    id: "dining",
    icon: Utensils,
    title: "Restaurant & Bar",
    tagline: "Delicious and Lively",
    desc: "From traditional Telangana flavours to contemporary multi-cuisine offerings, the TCCC restaurant and bar is where members and their families gather to enjoy great food in a warm, refined atmosphere.",
    bullets: [
      "Multi-cuisine restaurant",
      "Well-stocked bar and lounge",
      "Live counters for select menus",
      "Private dining options on request",
    ],
    image: "/images/restaurantandbar.webp",
    reverse: true,
  },
  {
    id: "swimming",
    icon: Waves,
    title: "Spacious Swimming Pool",
    tagline: "Dive Into Wellness",
    desc: "A spacious, well-maintained swimming pool for members of all ages. Whether you're here for a fitness routine, family time, or simply to unwind, the pool offers a refreshing escape any day of the year.",
    bullets: [
      "Clean, regularly serviced swimming pool",
      "Separate sessions and slots for families",
      "Trained lifeguards on duty",
      "Poolside seating and refreshments",
    ],
    image: "/images/swimmingpool.webp",
  },
  {
    id: "gym",
    icon: Dumbbell,
    title: "Gym and Yoga Studio",
    tagline: "Feel Active and Calm",
    desc: "A fully-equipped gymnasium paired with a dedicated yoga studio gives members everything they need to stay active, healthy, and centered. Strength, cardio, flexibility, and mindfulness, all in one place.",
    bullets: [
      "Modern cardio and strength equipment",
      "Dedicated yoga and meditation studio",
      "Group classes (schedule varies)",
      "Personal training on request",
    ],
    image: "/images/gymandyoga.webp",
    reverse: true,
  },
];

const additional = [
  {
    icon: Trophy,
    title: "Indoor & Outdoor Games",
    desc: "Badminton, table tennis, billiards, cards, carrom, and outdoor courts for members who enjoy a friendly competitive game.",
  },
  {
    icon: Brain,
    title: "Mind Games",
    desc: "Chess, carrom, cards, and other mind games. A dedicated space for members to sharpen their skills and enjoy friendly competition.",
  },
  {
    icon: Bed,
    title: "Luxury Rooms",
    desc: "Elegantly appointed luxury suites for members and their visiting guests, ideal for outstation visitors or members staying after events.",
  },
  {
    icon: Theater,
    title: "Amphitheatre",
    desc: "An elegant amphitheatre venue for cultural performances, music nights, recitals, and large gatherings, with stage and audio-visual support.",
  },
  {
    icon: Music,
    title: "Cultural Events",
    desc: "Festivals, performances, and club celebrations are regular features at TCCC, keeping our Telangana cultural heritage alive.",
  },
  {
    icon: Wine,
    title: "Lounge & Drinks",
    desc: "Unwind in the members' lounge with carefully curated drinks, snacks, and a relaxed atmosphere.",
  },
];

export default function FacilitiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-ink py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl opacity-15" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-gold rounded-full blur-3xl opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-gold font-semibold tracking-widest uppercase text-sm mb-4">
            World Class Amenities
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Experience the Joy of{" "}
            <span className="gold-gradient-text">TCCC Facilities</span>
          </h1>
          <p className="text-brand-cream/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Hyderabad&apos;s first vertical club, seven floors of banquets,
            dining, sports, wellness, and guest suites, all designed for the
            comfort, joy, and pride of our members.
          </p>
        </div>
      </section>

      {/* Hero amenities image */}
      <section className="bg-brand-cream py-3 sm:py-4">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl p-1.5 shadow-lg border border-brand-gold/30">
            <Image
              src="/images/ameneties.webp"
              alt="TCCC World Class Amenities"
              width={800}
              height={500}
              className="rounded-xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Main Facilities */}
      {facilities.map((f) => {
        const Icon = f.icon;
        const isDark = !f.reverse;
        return (
          <section
            id={f.id}
            key={f.id}
            className={`py-4 sm:py-5 scroll-mt-20 ${
              isDark ? "bg-white" : "bg-brand-cream"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid lg:grid-cols-5 gap-6 items-center">
                <div className={`lg:col-span-2 ${f.reverse ? "lg:order-2" : ""}`}>
                  <div className="rounded-xl overflow-hidden shadow-md border border-brand-gold/30 bg-white p-1.5">
                    {f.image ? (
                      <Image
                        src={f.image}
                        alt={f.title}
                        width={600}
                        height={400}
                        className="rounded-lg w-full h-auto"
                      />
                    ) : (
                      <div className="h-48 rounded-lg bg-brand-cream flex items-center justify-center">
                        <Icon className="w-12 h-12 text-brand-gold-dark" />
                      </div>
                    )}
                  </div>
                </div>

                <div className={`lg:col-span-3 ${f.reverse ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-10 h-10 bg-brand-red/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-red" />
                    </div>
                    <p className="text-brand-gold-dark font-semibold uppercase tracking-widest text-xs">
                      {f.tagline}
                    </p>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink mb-2 leading-tight">
                    {f.title}
                  </h2>
                  <p className="text-brand-ink/70 text-base mb-3 leading-relaxed">
                    {f.desc}
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                        <span className="text-brand-ink/75 text-sm">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/online-booking"
                    className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Book Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Additional facilities */}
      <section id="sports" className="bg-brand-ink py-5 sm:py-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-4">
            <p className="text-brand-gold font-semibold uppercase tracking-widest text-sm mb-2">
              And More
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Other Facilities at TCCC
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {additional.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 card-hover text-center"
              >
                <div className="w-11 h-11 bg-brand-gold/15 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-brand-gold" />
                </div>
                <h3 className="text-white font-bold text-sm mb-1.5">{title}</h3>
                <p className="text-brand-cream/60 text-xs leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-red py-5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Experience TCCC?
          </h2>
          <p className="text-white/85 text-sm mb-5 max-w-2xl mx-auto">
            Reserve a banquet, book a table, or plan your next event with us.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/online-booking"
              className="bg-white hover:bg-brand-cream text-brand-red font-bold px-8 py-4 rounded-xl transition-colors shadow-lg"
            >
              Make a Booking
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white/40 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

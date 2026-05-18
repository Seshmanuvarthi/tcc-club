import Link from "next/link";
import Image from "next/image";
import {
  Utensils, Building2, Waves, Dumbbell, Trophy,
  Bed, Music, Wine, ArrowRight, CheckCircle2,
} from "lucide-react";

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
    desc: "Host weddings, receptions, corporate events, and milestone celebrations in TCC's grand banquet halls. Designed for elegance, equipped for every detail, and supported by a service team committed to making every event memorable.",
    bullets: [
      "Multiple banquet halls of varying capacities",
      "Customizable décor and seating arrangements",
      "In-house catering with multi-cuisine menus",
      "Audio-visual and stage support",
    ],
    image: "/images/banquets.png",
  },
  {
    id: "dining",
    icon: Utensils,
    title: "Restaurant & Bar",
    tagline: "Delicious and Lively",
    desc: "From traditional Telangana flavours to contemporary multi-cuisine offerings, the TCC restaurant and bar is where members and their families gather to enjoy great food in a warm, refined atmosphere.",
    bullets: [
      "Multi-cuisine restaurant",
      "Well-stocked bar and lounge",
      "Live counters for select menus",
      "Private dining options on request",
    ],
    image: "/images/restaurantandbar.png",
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
    image: "/images/swimmingpool.png",
  },
  {
    id: "gym",
    icon: Dumbbell,
    title: "Gym and Yoga Studio",
    tagline: "Feel Active and Calm",
    desc: "A fully-equipped gymnasium paired with a dedicated yoga studio gives members everything they need to stay active, healthy, and centered. Strength, cardio, flexibility, and mindfulness — all in one place.",
    bullets: [
      "Modern cardio and strength equipment",
      "Dedicated yoga and meditation studio",
      "Group classes (schedule varies)",
      "Personal training on request",
    ],
    image: "/images/gymandyoga.png",
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
    icon: Bed,
    title: "Residential Rooms",
    desc: "Comfortable guest rooms for members and their visitors. Ideal for outstation guests or members staying over after events.",
  },
  {
    icon: Music,
    title: "Cultural Events",
    desc: "Festivals, performances, and community celebrations are regular features at TCC, keeping our Telangana cultural heritage alive.",
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
      <section className="relative bg-brand-ink py-24 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl opacity-15" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-gold rounded-full blur-3xl opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-gold font-semibold tracking-widest uppercase text-sm mb-4">
            World Class Amenities
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Experience the Joy of{" "}
            <span className="gold-gradient-text">TCC Facilities</span>
          </h1>
          <p className="text-brand-cream/80 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            From banquets to dining, swimming to sports — every facility at TCC
            is designed for the comfort, joy, and pride of our members.
          </p>
        </div>
      </section>

      {/* Hero amenities image */}
      <section className="bg-brand-cream py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-2 shadow-xl border border-brand-gold/30">
            <Image
              src="/images/ameneties.png"
              alt="TCC World Class Amenities"
              width={1200}
              height={1200}
              className="rounded-2xl w-full h-auto"
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
            className={`py-20 sm:py-28 scroll-mt-20 ${
              isDark ? "bg-white" : "bg-brand-cream"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid lg:grid-cols-2 gap-14 items-center">
                <div className={f.reverse ? "lg:order-2" : ""}>
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-brand-gold/30 bg-white p-2">
                    {f.image ? (
                      <Image
                        src={f.image}
                        alt={f.title}
                        width={900}
                        height={900}
                        className="rounded-xl w-full h-auto"
                      />
                    ) : (
                      <div className="aspect-square rounded-xl bg-brand-cream flex items-center justify-center">
                        <Icon className="w-16 h-16 text-brand-gold-dark" />
                      </div>
                    )}
                  </div>
                </div>

                <div className={f.reverse ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand-red" />
                    </div>
                    <p className="text-brand-gold-dark font-semibold uppercase tracking-widest text-xs">
                      {f.tagline}
                    </p>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink mb-5 leading-tight">
                    {f.title}
                  </h2>
                  <p className="text-brand-ink/70 text-lg mb-6 leading-relaxed">
                    {f.desc}
                  </p>
                  <ul className="space-y-2.5 mb-8">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <span className="text-brand-ink/75">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/online-booking"
                    className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
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
      <section id="sports" className="bg-brand-ink py-20 sm:py-28 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-brand-gold font-semibold uppercase tracking-widest text-sm mb-3">
              And More
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Other Facilities at TCC
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additional.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 card-hover text-center"
              >
                <div className="w-14 h-14 bg-brand-gold/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-7 h-7 text-brand-gold" />
                </div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-brand-cream/60 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-red py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-5">
            Ready to Experience TCC?
          </h2>
          <p className="text-white/85 text-lg mb-10 max-w-2xl mx-auto">
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

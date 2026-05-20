import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Heart, Target, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in 2016 by the contractors, builders and others of Telangana, TCCC is Hyderabad's first vertical members' club at Central Park, Serilingampalle. Learn our story and values.",
  openGraph: {
    title: "About TCCC | Heritage & Story",
    description:
      "A members' club built on heritage, hospitality, and the spirit of the Telangana contractors, builders and others since 2016.",
  },
};

const values = [
  {
    icon: Heart,
    title: "Members First",
    desc: "We exist for our members. Every decision is anchored in serving our members and their families.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "From cuisine to service to facilities, we hold ourselves to the highest standards.",
  },
  {
    icon: Target,
    title: "Tradition with Vision",
    desc: "Rooted in Telangana culture, we continue to evolve to meet the needs of modern members.",
  },
  {
    icon: Users,
    title: "Inclusive Spirit",
    desc: "Members, families, and guests all find a warm welcome at TCCC.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-ink py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl opacity-15" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-gold rounded-full blur-3xl opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-gold font-semibold tracking-widest uppercase text-sm mb-4">
            About Us
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            The <span className="gold-gradient-text">TCCC</span> Story
          </h1>
          <p className="text-brand-cream/80 text-lg max-w-3xl mx-auto leading-relaxed">
            A members&apos; club built on heritage, hospitality, and the spirit
            of the Telangana contractors, builders and others.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="bg-brand-cream py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-3">
                Our Heritage
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink mb-6 leading-tight">
                A Club for{" "}
                <span className="red-gradient-text">Builders and Others</span>
              </h2>
              <p className="text-brand-ink/75 text-lg mb-5 leading-relaxed">
                The Telangana Contractors Cultural Club was incorporated as a
                registered society on <strong>17 August 2016</strong>, founded
                by contractors, builders and others from across Telangana who
                envisioned an exclusive recreational and cultural destination
                of their own, a place where members and their families could
                come together for fellowship, fine dining, cultural
                celebrations, and sport.
              </p>
              <p className="text-brand-ink/65 mb-5 leading-relaxed">
                What began as a vision out of Banjara Hills has, a decade
                later, taken shape at Central Park, Serilingampalle, as{" "}
                <strong>Hyderabad&apos;s first &ldquo;vertical&rdquo; club</strong>{" "}
                with seven floors of banquet halls, an amphitheatre, more than
                thirty guest suites, a spa, swimming pool, multi-level
                parking, and dedicated spaces for indoor and outdoor sports.
              </p>
              <p className="text-brand-ink/65 leading-relaxed">
                Today the club stands as a working tribute to the spirit of
                the contractors, builders and others, a space built by
                members, for members and their families.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-brand-gold rounded-full blur-3xl opacity-15" />
              <Image
                src="/images/logo.png"
                alt="TCCC Crest"
                width={500}
                height={500}
                className="relative mx-auto drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-6 sm:py-8 border-y border-brand-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-5">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-3">
              What Drives Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink mb-3">
              Our Values
            </h2>
            <div className="divider-gold w-32 mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-brand-cream rounded-2xl p-7 border border-brand-gold/20 shadow-sm card-hover text-center"
              >
                <div className="w-14 h-14 bg-brand-red/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-7 h-7 text-brand-red" />
                </div>
                <h3 className="text-brand-ink font-bold mb-2">{title}</h3>
                <p className="text-brand-ink/60 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee CTA */}
      <section className="bg-brand-ink py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
            Meet Our Managing Committee
          </h2>
          <p className="text-brand-cream/70 text-lg mb-5 max-w-2xl mx-auto">
            The elected committee behind TCCC, guiding the club&apos;s vision and
            ensuring excellence for our members.
          </p>
          <Link
            href="/about/committee"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-lg"
          >
            View Committee <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

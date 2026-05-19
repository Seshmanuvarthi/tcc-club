import type { Metadata } from "next";
import Link from "next/link";
import { listNewsletters } from "@/lib/blob";
import { ExternalLink } from "lucide-react";
import { InstagramIcon } from "@/components/SocialIcons";
import NewsletterList from "./NewsletterList";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Daily news, announcements, and event updates from the Telangana Contractors Cultural Club. Browse the latest newsletters and posts.",
  openGraph: {
    title: "TCC Newsletter | News & Updates",
    description:
      "Stay up to date with the latest news, announcements, and events from TCC.",
  },
};

export default async function NewsletterPage() {
  const items = await listNewsletters();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-ink py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl opacity-15" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-gold rounded-full blur-3xl opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-gold font-semibold tracking-widest uppercase text-sm mb-4">
            News &amp; Updates
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            TCC <span className="gold-gradient-text">Newsletter</span>
          </h1>
          <p className="text-brand-cream/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Daily news, announcements, and event updates from the Telangana
            Contractors Cultural Club.
          </p>
          <a
            href="https://www.instagram.com/tccclub.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-brand-gold hover:text-white text-sm font-semibold"
          >
            <InstagramIcon className="w-4 h-4" />
            Follow @tccclub.in on Instagram
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* List with search + pagination */}
      <section className="bg-brand-cream py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <NewsletterList items={items} />
        </div>
      </section>

      {/* Subscribe / Follow CTA */}
      <section className="bg-brand-ink py-6 sm:py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Stay Updated
          </h2>
          <p className="text-brand-cream/70 mb-6">
            Follow TCC on social media for live updates and event announcements.
          </p>
          <Link
            href="https://www.instagram.com/tccclub.in/"
            target="_blank"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
            Follow on Instagram
          </Link>
        </div>
      </section>
    </>
  );
}

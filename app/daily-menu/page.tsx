import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCurrentMenu } from "@/lib/blob";
import { Calendar, UtensilsCrossed, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Daily Menu",
  description:
    "Today's specials at the TCC restaurant — fresh, delicious, and always changing. Check the daily menu at Telangana Contractors Cultural Club.",
  openGraph: {
    title: "Today's Daily Menu | TCC",
    description:
      "What's cooking at TCC today — view our daily menu and book a table.",
  },
};

export default async function DailyMenuPage() {
  const menu = await getCurrentMenu();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-ink py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl opacity-15" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-gold rounded-full blur-3xl opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-gold font-semibold tracking-widest uppercase text-sm mb-4">
            Today&apos;s Specials
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Daily <span className="gold-gradient-text">Menu</span>
          </h1>
          <p className="text-brand-cream/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Fresh, delicious, and always changing. Here&apos;s what&apos;s on
            offer at the TCC restaurant today.
          </p>
        </div>
      </section>

      {/* Menu display */}
      <section className="bg-brand-cream py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {menu ? (
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-brand-gold/30 shadow-xl">
              <div className="flex items-center gap-3 mb-4 px-2">
                <Calendar className="w-5 h-5 text-brand-red" />
                <p className="text-sm text-brand-ink/70">
                  Last updated:{" "}
                  <span className="font-semibold text-brand-ink">
                    {new Date(menu.uploadedAt).toLocaleString("en-IN", {
                      dateStyle: "full",
                      timeStyle: "short",
                      timeZone: "Asia/Kolkata",
                    })}{" "}
                    IST
                  </span>
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden bg-brand-cream">
                <Image
                  src={menu.url}
                  alt="Today's Daily Menu"
                  width={1200}
                  height={1600}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={menu.url}
                  download
                  className="inline-flex items-center gap-2 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  Download Menu
                </a>
                <Link
                  href="/online-booking"
                  className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  Book a Table <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 sm:p-16 border border-brand-gold/30 shadow-xl text-center">
              <div className="w-20 h-20 bg-brand-gold/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <UtensilsCrossed className="w-10 h-10 text-brand-gold-dark" />
              </div>
              <h2 className="text-2xl font-bold text-brand-ink mb-3">
                Menu Coming Soon
              </h2>
              <p className="text-brand-ink/70 mb-6 max-w-md mx-auto">
                Today&apos;s menu has not been published yet. Please check back
                shortly, or contact the restaurant directly for available
                options.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Contact Restaurant
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { listGallery } from "@/lib/blob";
import GalleryGrid from "./GalleryGrid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A glimpse into life at TCC — banquets, dining, swimming, sports, events, and cultural celebrations from the Telangana Contractors Cultural Club.",
  openGraph: {
    title: "TCC Gallery | Moments at the Club",
    description:
      "Photos from events, facilities, and celebrations at Telangana Contractors Cultural Club.",
    images: ["/images/ameneties.webp"],
  },
};

type LocalItem = {
  src: string;
  alt: string;
  category: string;
};

const localItems: LocalItem[] = [
  { src: "/images/banquets.webp",         alt: "Banquet Hall",         category: "Banquets" },
  { src: "/images/restaurantandbar.webp", alt: "Restaurant and Bar",   category: "Dining" },
  { src: "/images/swimmingpool.webp",     alt: "Swimming Pool",        category: "Swimming" },
  { src: "/images/gymandyoga.webp",       alt: "Gym and Yoga",         category: "Fitness" },
  { src: "/images/ameneties.webp",        alt: "World Class Amenities", category: "Amenities" },
  { src: "/images/membership.webp",       alt: "Memberships Open",     category: "Membership" },
];

export default async function GalleryPage() {
  const uploaded = await listGallery();

  return (
    <>
      <section className="relative bg-brand-ink py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl opacity-15" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-gold rounded-full blur-3xl opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-gold font-semibold tracking-widest uppercase text-sm mb-4">
            Moments at TCC
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Our <span className="gold-gradient-text">Gallery</span>
          </h1>
          <p className="text-brand-cream/80 text-lg max-w-3xl mx-auto leading-relaxed">
            A glimpse into the life, events, and facilities of the Telangana
            Contractors Cultural Club.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <GalleryGrid localItems={localItems} uploaded={uploaded} />
        </div>
      </section>
    </>
  );
}

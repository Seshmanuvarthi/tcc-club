import Image from "next/image";
import { listGallery } from "@/lib/blob";

export const dynamic = "force-dynamic";

type LocalItem = {
  src: string;
  alt: string;
  category: string;
};

const localItems: LocalItem[] = [
  { src: "/images/banquets.png",         alt: "Banquet Hall",         category: "Banquets" },
  { src: "/images/restaurantandbar.png", alt: "Restaurant and Bar",   category: "Dining" },
  { src: "/images/swimmingpool.png",     alt: "Swimming Pool",        category: "Swimming" },
  { src: "/images/gymandyoga.png",       alt: "Gym and Yoga",         category: "Fitness" },
  { src: "/images/ameneties.png",        alt: "World Class Amenities", category: "Amenities" },
  { src: "/images/membership.png",       alt: "Memberships Open",     category: "Membership" },
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {localItems.map((item, idx) => (
              <div
                key={`local-${idx}`}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-brand-gold/30 shadow-sm card-hover"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <p className="text-brand-gold text-xs uppercase tracking-widest font-semibold">
                    {item.category}
                  </p>
                  <p className="text-white text-sm font-bold">{item.alt}</p>
                </div>
              </div>
            ))}

            {uploaded.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-brand-gold/30 shadow-sm card-hover"
              >
                <Image
                  src={item.url}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <p className="text-white text-sm font-bold">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {uploaded.length === 0 && (
            <p className="text-center text-brand-ink/40 text-sm italic mt-10">
              More photos will appear here as they are added by the club.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

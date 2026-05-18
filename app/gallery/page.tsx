import Image from "next/image";
import { Camera } from "lucide-react";

type GalleryItem = {
  src?: string;
  alt: string;
  category: string;
};

const galleryItems: GalleryItem[] = [
  { src: "/images/banquets.png",        alt: "Banquet Hall",        category: "Banquets" },
  { src: "/images/restaurantandbar.png", alt: "Restaurant and Bar",  category: "Dining" },
  { src: "/images/swimmingpool.png",    alt: "Swimming Pool",        category: "Swimming" },
  { src: "/images/gymandyoga.png",      alt: "Gym and Yoga",         category: "Fitness" },
  { src: "/images/ameneties.png",       alt: "Amenities",            category: "Amenities" },
  { src: "/images/membership.png",      alt: "Membership",           category: "Membership" },
  { alt: "Cultural Event",      category: "Events" },
  { alt: "Family Day",          category: "Events" },
  { alt: "Indoor Games",        category: "Sports" },
  { alt: "Outdoor Sports",      category: "Sports" },
  { alt: "Festive Celebration", category: "Events" },
  { alt: "Lounge & Bar",        category: "Dining" },
];

export default function GalleryPage() {
  return (
    <>
      <section className="relative bg-brand-ink py-24 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-gold font-semibold tracking-widest uppercase text-sm mb-4">
            Moments at TCC
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Our <span className="gold-gradient-text">Gallery</span>
          </h1>
          <p className="text-brand-cream/80 text-lg max-w-3xl mx-auto leading-relaxed">
            A glimpse into the life, events, and facilities of the Telangana
            Contractors Cultural Club.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8 text-center">
            <p className="text-sm text-brand-ink/50 italic">
              [Placeholder gallery — official photographs will be added once
              shared by the club.]
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-brand-gold/30 shadow-sm card-hover"
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-cream to-brand-gold/20 flex flex-col items-center justify-center text-center p-4">
                    <Camera className="w-10 h-10 text-brand-gold-dark mb-2 opacity-60" />
                    <p className="text-xs font-semibold text-brand-ink/60 uppercase tracking-widest">
                      {item.category}
                    </p>
                    <p className="text-xs text-brand-ink/40 mt-1">
                      [Placeholder]
                    </p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <p className="text-brand-gold text-xs uppercase tracking-widest font-semibold">
                    {item.category}
                  </p>
                  <p className="text-white text-sm font-bold">{item.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

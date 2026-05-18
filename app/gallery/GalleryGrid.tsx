"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";
import type { GalleryItem } from "@/lib/blob";

type LocalItem = {
  src: string;
  alt: string;
  category: string;
};

type Open = { src: string; alt: string; caption?: string };

export default function GalleryGrid({
  localItems,
  uploaded,
}: {
  localItems: LocalItem[];
  uploaded: GalleryItem[];
}) {
  const [open, setOpen] = useState<Open | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {localItems.map((item, idx) => (
          <button
            type="button"
            key={`local-${idx}`}
            onClick={() =>
              setOpen({ src: item.src, alt: item.alt, caption: item.alt })
            }
            className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-brand-gold/30 shadow-sm card-hover cursor-zoom-in text-left"
            aria-label={`Open ${item.alt}`}
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
          </button>
        ))}

        {uploaded.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() =>
              setOpen({
                src: item.url,
                alt: item.caption,
                caption: item.caption,
              })
            }
            className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-brand-gold/30 shadow-sm card-hover cursor-zoom-in text-left"
            aria-label={`Open ${item.caption}`}
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
              <p className="text-white text-sm font-bold">{item.caption}</p>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        isOpen={!!open}
        src={open?.src ?? ""}
        alt={open?.alt ?? ""}
        caption={open?.caption}
        onClose={() => setOpen(null)}
      />
    </>
  );
}

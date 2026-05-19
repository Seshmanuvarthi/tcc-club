"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";
import type { GalleryItem } from "@/lib/blob";

type LocalItem = {
  src: string;
  alt: string;
  category: string;
};

type Open = { src: string; alt: string; caption?: string };

const UPLOADED_CATEGORY = "Latest";

type DisplayItem = {
  key: string;
  src: string;
  alt: string;
  category: string;
  showCategory?: boolean; // hide on uploaded photos in tile overlay
};

export default function GalleryGrid({
  localItems,
  uploaded,
}: {
  localItems: LocalItem[];
  uploaded: GalleryItem[];
}) {
  const [open, setOpen] = useState<Open | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const items: DisplayItem[] = useMemo(() => {
    const local = localItems.map((it, i) => ({
      key: `local-${i}`,
      src: it.src,
      alt: it.alt,
      category: it.category,
      showCategory: true,
    }));
    const blob = uploaded.map((it) => ({
      key: it.id,
      src: it.url,
      alt: it.caption,
      category: UPLOADED_CATEGORY,
      showCategory: false,
    }));
    return [...blob, ...local];
  }, [localItems, uploaded]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const it of items) set.add(it.category);
    // Preferred ordering: Latest first, then the local categories in original order
    const preferred = [
      UPLOADED_CATEGORY,
      "Banquets",
      "Dining",
      "Swimming",
      "Fitness",
      "Amenities",
      "Membership",
    ];
    const ordered = preferred.filter((c) => set.has(c));
    // append anything else
    for (const c of set) if (!ordered.includes(c)) ordered.push(c);
    return ordered;
  }, [items]);

  const visible = useMemo(() => {
    if (filter === "All") return items;
    return items.filter((it) => it.category === filter);
  }, [items, filter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: items.length };
    for (const it of items) c[it.category] = (c[it.category] ?? 0) + 1;
    return c;
  }, [items]);

  return (
    <>
      {/* Filter chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <FilterChip
          active={filter === "All"}
          count={counts.All ?? 0}
          onClick={() => setFilter("All")}
          label="All"
        />
        {categories.map((c) => (
          <FilterChip
            key={c}
            active={filter === c}
            count={counts[c] ?? 0}
            onClick={() => setFilter(c)}
            label={c}
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-center py-12 text-brand-ink/50 text-sm">
          No photos in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {visible.map((item) => {
            const isLocal = item.key.startsWith("local-");
            return (
              <button
                type="button"
                key={item.key}
                onClick={() =>
                  setOpen({
                    src: item.src,
                    alt: item.alt,
                    caption: item.alt,
                  })
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
                  unoptimized={!isLocal}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  {item.showCategory && (
                    <p className="text-brand-gold text-xs uppercase tracking-widest font-semibold">
                      {item.category}
                    </p>
                  )}
                  <p className="text-white text-sm font-bold">{item.alt}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

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

function FilterChip({
  active,
  count,
  onClick,
  label,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
        active
          ? "bg-brand-red text-white border-brand-red shadow-sm"
          : "bg-white text-brand-ink/70 border-brand-gold/30 hover:border-brand-red hover:text-brand-red"
      }`}
    >
      {label}{" "}
      <span className={active ? "text-white/80" : "text-brand-ink/40"}>
        ({count})
      </span>
    </button>
  );
}

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  FileText,
  Image as ImageIcon,
  Newspaper,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { NewsletterItem } from "@/lib/blob";

const PAGE_SIZE = 12;

export default function NewsletterList({
  items,
}: {
  items: NewsletterItem[];
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<"all" | "image" | "pdf">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (typeFilter === "image" && item.isPdf) return false;
      if (typeFilter === "pdf" && !item.isPdf) return false;
      if (!q) return true;
      const date = new Date(item.uploadedAt)
        .toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        })
        .toLowerCase();
      return (
        item.filename.toLowerCase().includes(q) ||
        date.includes(q) ||
        (item.isPdf ? "pdf" : "image").includes(q)
      );
    });
  }, [items, query, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 sm:p-16 border border-brand-gold/30 shadow-xl text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-brand-gold/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Newspaper className="w-10 h-10 text-brand-gold-dark" />
        </div>
        <h2 className="text-2xl font-bold text-brand-ink mb-3">
          No Newsletters Yet
        </h2>
        <p className="text-brand-ink/70 mb-2 max-w-md mx-auto">
          The newsletter archive is empty at the moment. Once the club posts an
          update, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Search + type filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-ink/40" />
          <input
            type="search"
            placeholder="Search newsletters by name or date..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-brand-gold/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
          />
        </div>
        <div className="flex gap-1.5">
          {(["all", "image", "pdf"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTypeFilter(t);
                setPage(1);
              }}
              className={`text-xs font-semibold px-3.5 py-2 rounded-xl border transition-colors ${
                typeFilter === t
                  ? "bg-brand-red text-white border-brand-red"
                  : "bg-white text-brand-ink/70 border-brand-gold/30 hover:border-brand-red"
              }`}
            >
              {t === "all" ? "All" : t === "image" ? "Images" : "PDFs"}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-brand-ink/60 mb-6">
        Showing <strong>{visible.length}</strong> of{" "}
        <strong>{filtered.length}</strong> result
        {filtered.length === 1 ? "" : "s"}
        {query && (
          <>
            {" "}
            for &ldquo;<span className="text-brand-red">{query}</span>&rdquo;
          </>
        )}
        .
      </p>

      {visible.length === 0 ? (
        <div className="text-center py-16 text-brand-ink/50 text-sm bg-white rounded-2xl border border-brand-gold/20">
          No newsletters match your search.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((item) => (
            <article
              key={item.url}
              className="bg-white rounded-2xl overflow-hidden border border-brand-gold/20 shadow-sm card-hover flex flex-col"
            >
              <div className="aspect-[4/3] bg-brand-cream relative">
                {item.isPdf ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-brand-red rounded-2xl flex items-center justify-center mb-3">
                      <FileText className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-brand-ink/60 text-sm font-semibold uppercase tracking-widest">
                      PDF Document
                    </p>
                  </div>
                ) : (
                  <Image
                    src={item.url}
                    alt={item.filename}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2 text-xs text-brand-gold-dark font-semibold uppercase tracking-widest">
                  {item.isPdf ? (
                    <FileText className="w-3.5 h-3.5" />
                  ) : (
                    <ImageIcon className="w-3.5 h-3.5" />
                  )}
                  {item.isPdf ? "PDF" : "Image"}
                </div>
                <p
                  className="text-brand-ink font-semibold text-sm mb-2 truncate"
                  title={item.filename}
                >
                  {item.filename}
                </p>
                <p className="text-brand-ink/50 text-xs mb-4">
                  Posted{" "}
                  {new Date(item.uploadedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "Asia/Kolkata",
                  })}
                </p>
                <div className="mt-auto flex gap-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-brand-red hover:bg-brand-red-dark text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    View
                  </a>
                  <a
                    href={item.url}
                    download
                    className="flex-1 text-center border border-brand-red text-brand-red hover:bg-brand-red hover:text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    Download
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold border border-brand-gold/30 rounded-lg bg-white text-brand-ink hover:border-brand-red hover:text-brand-red transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>
          <span className="text-sm text-brand-ink/70 px-3">
            Page <strong>{safePage}</strong> of <strong>{totalPages}</strong>
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold border border-brand-gold/30 rounded-lg bg-white text-brand-ink hover:border-brand-red hover:text-brand-red transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}

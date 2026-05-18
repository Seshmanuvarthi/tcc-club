"use client";

import { FileText, Image as ImageIcon, Copy, Check, ExternalLink } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/SocialIcons";
import { useState } from "react";
import type { NewsletterItem } from "@/lib/blob";

export default function NewsletterList({ items }: { items: NewsletterItem[] }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      window.prompt("Copy this URL:", url);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-brand-ink/50 text-sm">
        No newsletters uploaded yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const fbShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(item.url)}`;
        return (
          <div
            key={item.url}
            className="bg-brand-cream rounded-2xl p-4 sm:p-5 border border-brand-gold/20 flex flex-col sm:flex-row gap-4 items-start"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-brand-gold/30">
              {item.isPdf ? (
                <FileText className="w-10 h-10 text-brand-red" />
              ) : (
                <img
                  src={item.url}
                  alt={item.filename}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 text-xs text-brand-gold-dark font-semibold uppercase tracking-widest">
                {item.isPdf ? (
                  <FileText className="w-3.5 h-3.5" />
                ) : (
                  <ImageIcon className="w-3.5 h-3.5" />
                )}
                {item.isPdf ? "PDF" : "Image"}
              </div>
              <p className="text-brand-ink font-semibold text-sm mb-1 truncate" title={item.filename}>
                {item.filename}
              </p>
              <p className="text-brand-ink/50 text-xs mb-3">
                {new Date(item.uploadedAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: "Asia/Kolkata",
                })}{" "}
                IST
              </p>

              <div className="flex flex-wrap gap-2">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white border border-brand-gold/30 hover:border-brand-red text-brand-ink hover:text-brand-red text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-3 h-3" /> Open
                </a>
                <button
                  type="button"
                  onClick={() => copyUrl(item.url)}
                  className="inline-flex items-center gap-1.5 bg-white border border-brand-gold/30 hover:border-brand-red text-brand-ink hover:text-brand-red text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  {copied === item.url ? (
                    <>
                      <Check className="w-3 h-3" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy URL
                    </>
                  )}
                </button>
                <a
                  href="https://www.instagram.com/tccclub.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => copyUrl(item.url)}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                  title="Copies URL and opens Instagram in a new tab. Paste the image into a new post."
                >
                  <InstagramIcon className="w-3 h-3" /> Share to Instagram
                </a>
                <a
                  href={fbShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  <FacebookIcon className="w-3 h-3" /> Share to Facebook
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

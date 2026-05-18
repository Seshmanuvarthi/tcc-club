"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
};

export default function Lightbox({ isOpen, src, alt, caption, onClose }: Props) {
  // Two-phase mount so we can animate in (mount → next frame → enter classes)
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // Trigger transition on next paint
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    // Closing: trigger fade-out then unmount after transition
    setVisible(false);
    const id = setTimeout(() => setMounted(false), 250);
    return () => clearTimeout(id);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-6 transition-opacity duration-250 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-brand-ink/90 backdrop-blur-sm" />

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className={`absolute top-5 right-5 z-10 w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-250 ${
          visible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <X className="w-5 h-5" />
      </button>

      {/* Image container — clicking image itself does not close */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative z-0 flex flex-col items-center transition-all duration-300 ease-out ${
          visible
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-2"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-w-[70vw] max-h-[70vh] rounded-2xl shadow-2xl object-contain"
        />
        {caption && (
          <p className="text-white text-center mt-4 text-base sm:text-lg font-semibold drop-shadow-lg max-w-[70vw]">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}

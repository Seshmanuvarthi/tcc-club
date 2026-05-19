"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Slim top-of-page progress bar shown during internal navigation.
 * Started on any internal <a> click, finished when usePathname changes.
 */
export default function NavProgress() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const prev = useRef(pathname);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (e.button !== 0) return;
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      if (a.target === "_blank") return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      const url = new URL(href, window.location.origin);
      if (url.pathname === window.location.pathname) return;
      // Begin
      setVisible(true);
      setWidth(15);
      // Animate toward 70% to simulate progress
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setWidth(70))
      );
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // When pathname changes, navigation has landed — finish and hide.
  useEffect(() => {
    if (prev.current === pathname) return;
    prev.current = pathname;
    setWidth(100);
    const hide = setTimeout(() => setVisible(false), 250);
    const reset = setTimeout(() => setWidth(0), 550);
    return () => {
      clearTimeout(hide);
      clearTimeout(reset);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-0.5 z-[100] pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 250ms ease-out",
      }}
    >
      <div
        className="h-full bg-gradient-to-r from-brand-red via-brand-gold to-brand-red shadow-[0_0_8px_rgba(200,161,74,0.7)]"
        style={{
          width: `${width}%`,
          transition: "width 400ms ease-out",
        }}
      />
    </div>
  );
}

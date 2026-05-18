"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const navConfig: Array<
  | { label: string; href: string }
  | { label: string; dropdown: { label: string; href: string }[] }
> = [
  { label: "Home", href: "/" },
  { label: "Daily Menu", href: "/daily-menu" },
  { label: "Facilities", href: "/facilities" },
  { label: "About Us", href: "/about" },
  { label: "Committee", href: "/about/committee" },
  { label: "Gallery", href: "/gallery" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobileDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/images/logo.png"
              alt="TCC Logo"
              width={40}
              height={40}
              className="rounded-full"
              priority
            />
            <div className="leading-tight hidden sm:block">
              <div className="font-bold text-brand-red text-sm tracking-wide">
                Telangana Contractors
              </div>
              <div className="text-[10px] text-brand-gold-dark font-semibold tracking-widest uppercase">
                Cultural Club
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navConfig.map((item) =>
              "dropdown" in item ? (
                <div key={item.label} className="relative group">
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-brand-ink hover:text-brand-red rounded-md transition-colors">
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-0 pt-2 hidden group-hover:block nav-dropdown">
                    <div className="bg-white border border-brand-gold/30 shadow-xl rounded-xl overflow-hidden min-w-55">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-brand-ink hover:bg-brand-cream hover:text-brand-red border-l-2 border-transparent hover:border-brand-red transition-all"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-brand-ink hover:text-brand-red rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/online-payments"
              className="border-2 border-brand-gold text-brand-gold-dark hover:bg-brand-gold hover:text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
            >
              Online Payment
            </Link>
            <Link
              href="/online-booking"
              className="bg-brand-red hover:bg-brand-red-dark text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors shadow-sm"
            >
              Online Booking
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="lg:hidden p-2 rounded-md text-brand-ink hover:bg-brand-cream"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-brand-gold/30 bg-white shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {navConfig.map((item) =>
              "dropdown" in item ? (
                <div key={item.label}>
                  <button
                    onClick={() => toggleMobileDropdown(item.label)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-brand-ink hover:bg-brand-cream rounded-lg"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-brand-gold/40 pl-3">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-sm text-brand-ink/80 hover:text-brand-red rounded-md"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-brand-ink hover:bg-brand-cream rounded-lg"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <Link
                href="/online-payments"
                onClick={() => setMobileOpen(false)}
                className="text-center border-2 border-brand-gold text-brand-gold-dark font-semibold py-2.5 rounded-lg"
              >
                Payment
              </Link>
              <Link
                href="/online-booking"
                onClick={() => setMobileOpen(false)}
                className="text-center bg-brand-red text-white font-semibold py-2.5 rounded-lg"
              >
                Booking
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

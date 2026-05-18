import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/SocialIcons";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Daily Menu", href: "/daily-menu" },
  { label: "Facilities", href: "/facilities" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const memberLinks = [
  { label: "Online Booking", href: "/online-booking" },
  { label: "Online Payments", href: "/online-payments" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Board of Directors", href: "/about/directors" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-brand-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="TCC Logo"
                width={52}
                height={52}
                className="rounded-full"
              />
              <div className="leading-tight">
                <div className="font-bold text-white text-base">
                  Telangana Contractors
                </div>
                <div className="text-[11px] text-brand-gold font-semibold tracking-widest uppercase">
                  Cultural Club
                </div>
              </div>
            </div>
            <p className="text-brand-cream/60 text-sm leading-relaxed mb-6">
              A premier members&apos; club bringing together the Telangana
              contractors community through hospitality, culture, sports, and
              fine dining.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/tccclub.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-brand-red rounded-lg flex items-center justify-center transition-colors text-brand-cream/70 hover:text-white"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/5 hover:bg-brand-red rounded-lg flex items-center justify-center transition-colors text-brand-cream/70 hover:text-white"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-brand-gold inline-block" />
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-cream/60 hover:text-brand-gold transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Members */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-brand-gold inline-block" />
              Members
            </h3>
            <ul className="space-y-2.5">
              {memberLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-cream/60 hover:text-brand-gold transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-brand-gold inline-block" />
              Reach Us
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
                <span className="text-sm text-brand-cream/60">
                  Telangana Contractors Cultural Club,
                  <br />
                  Central Park, Serilingampalle (M),
                  <br />
                  Telangana 500084
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a
                  href="tel:+918121042251"
                  className="text-sm text-brand-cream/60 hover:text-brand-gold transition-colors"
                >
                  +91 81210 42251
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a
                  href="mailto:info@tccclub.in"
                  className="text-sm text-brand-cream/60 hover:text-brand-gold transition-colors"
                >
                  info@tccclub.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-cream/50">
            © {new Date().getFullYear()} Telangana Contractors Cultural Club.
            All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-brand-cream/50 hover:text-brand-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-brand-cream/50 hover:text-brand-gold transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NavProgress from "@/components/NavProgress";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tcc-club.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Telangana Contractors Cultural Club",
    template: "%s | TCCC",
  },
  description:
    "Telangana Contractors Cultural Club (TCCC) is Hyderabad's first vertical members' club at Central Park, Serilingampalle, offering world-class banquets, dining, swimming, gym, sports, and cultural facilities for members and their families.",
  keywords: [
    "TCCC Club",
    "Telangana Contractors Cultural Club",
    "TCCC Hyderabad",
    "Hyderabad members club",
    "Serilingampalle club",
    "Banquet halls Hyderabad",
    "Vertical club Hyderabad",
  ],
  authors: [{ name: "Telangana Contractors Cultural Club" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Telangana Contractors Cultural Club",
    title: "Telangana Contractors Cultural Club",
    description:
      "Hyderabad's first vertical members' club — banquets, dining, swimming, gym, sports, and cultural events under one roof.",
    images: [
      {
        url: "/images/logo.png",
        width: 480,
        height: 480,
        alt: "TCCC Club Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Telangana Contractors Cultural Club",
    description:
      "Hyderabad's first vertical members' club at Central Park, Serilingampalle.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen flex flex-col antialiased bg-brand-cream text-brand-ink">
        <NavProgress />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

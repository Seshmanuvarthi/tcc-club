import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { UtensilsCrossed, Newspaper, Camera, CalendarCheck2, ArrowRight } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default async function AdminDashboard() {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");

  return (
    <section className="bg-brand-cream min-h-[calc(100vh-4rem)] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-brand-gold-dark font-semibold uppercase tracking-widest text-xs mb-1">
              Admin Dashboard
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-ink">
              Welcome,{" "}
              <span className="text-brand-red">{session.username}</span>
            </h1>
          </div>
          <LogoutButton />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/menu"
            className="group bg-white rounded-3xl p-8 border border-brand-gold/30 shadow-sm card-hover"
          >
            <div className="w-16 h-16 bg-brand-red rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-brand-red/20">
              <UtensilsCrossed className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-brand-ink mb-2">
              Daily Menu
            </h2>
            <p className="text-brand-ink/60 mb-5">
              Upload today&apos;s menu image. The new image replaces the
              previous one.
            </p>
            <span className="inline-flex items-center gap-1 text-brand-red font-semibold group-hover:gap-2 transition-all">
              Manage Menu <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          <Link
            href="/admin/newsletter"
            className="group bg-white rounded-3xl p-8 border border-brand-gold/30 shadow-sm card-hover"
          >
            <div className="w-16 h-16 bg-brand-gold-dark rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-brand-gold/20">
              <Newspaper className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-brand-ink mb-2">
              Newsletter
            </h2>
            <p className="text-brand-ink/60 mb-5">
              Upload daily news as image or PDF. Past uploads are preserved.
            </p>
            <span className="inline-flex items-center gap-1 text-brand-red font-semibold group-hover:gap-2 transition-all">
              Manage Newsletter <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          <Link
            href="/admin/gallery"
            className="group bg-white rounded-3xl p-8 border border-brand-gold/30 shadow-sm card-hover"
          >
            <div className="w-16 h-16 bg-brand-ink rounded-2xl flex items-center justify-center mb-5 shadow-lg">
              <Camera className="w-8 h-8 text-brand-gold" />
            </div>
            <h2 className="text-2xl font-bold text-brand-ink mb-2">
              Gallery
            </h2>
            <p className="text-brand-ink/60 mb-5">
              Add, edit, or remove photos shown on the public gallery page.
            </p>
            <span className="inline-flex items-center gap-1 text-brand-red font-semibold group-hover:gap-2 transition-all">
              Manage Gallery <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          <Link
            href="/admin/bookings"
            className="group bg-white rounded-3xl p-8 border border-brand-gold/30 shadow-sm card-hover"
          >
            <div className="w-16 h-16 bg-brand-red-dark rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-brand-red/20">
              <CalendarCheck2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-brand-ink mb-2">
              Bookings
            </h2>
            <p className="text-brand-ink/60 mb-5">
              View, filter, and track all booking requests submitted from the
              website.
            </p>
            <span className="inline-flex items-center gap-1 text-brand-red font-semibold group-hover:gap-2 transition-all">
              View Bookings <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

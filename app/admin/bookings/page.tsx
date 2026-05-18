import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { listBookings } from "@/lib/blob";
import { ArrowLeft, CalendarCheck2 } from "lucide-react";
import BookingsAdminClient from "./BookingsAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");

  const bookings = await listBookings();

  return (
    <section className="bg-brand-cream min-h-[calc(100vh-4rem)] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-brand-red hover:text-brand-red-dark text-sm font-semibold mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-gold/30 shadow-xl mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-red rounded-2xl flex items-center justify-center">
              <CalendarCheck2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-brand-ink">Bookings</h1>
              <p className="text-brand-ink/60 text-sm">
                All booking requests submitted through the website.{" "}
                <strong>{bookings.length}</strong> total.
              </p>
            </div>
          </div>
        </div>

        <BookingsAdminClient bookings={bookings} />
      </div>
    </section>
  );
}

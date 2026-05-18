"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Trash2, Loader2, Phone, Mail, Calendar, Users, Search,
} from "lucide-react";
import type { BookingRecord, BookingStatus } from "@/lib/blob";

const STATUSES: { value: BookingStatus; label: string; classes: string }[] = [
  { value: "new",       label: "New",       classes: "bg-blue-100 text-blue-700 border-blue-200" },
  { value: "contacted", label: "Contacted", classes: "bg-amber-100 text-amber-800 border-amber-200" },
  { value: "confirmed", label: "Confirmed", classes: "bg-green-100 text-green-700 border-green-200" },
  { value: "cancelled", label: "Cancelled", classes: "bg-gray-100 text-gray-600 border-gray-200" },
];

export default function BookingsAdminClient({
  bookings,
}: {
  bookings: BookingRecord[];
}) {
  const router = useRouter();
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (filter !== "all" && b.status !== filter) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        b.memberName.toLowerCase().includes(q) ||
        b.memberId.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.bookingType.toLowerCase().includes(q) ||
        b.eventType.toLowerCase().includes(q)
      );
    });
  }, [bookings, filter, query]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: bookings.length };
    for (const s of STATUSES) c[s.value] = 0;
    for (const b of bookings) c[b.status] = (c[b.status] ?? 0) + 1;
    return c;
  }, [bookings]);

  const updateStatus = async (id: string, status: BookingStatus) => {
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Update failed");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (booking: BookingRecord) => {
    if (
      !confirm(
        `Delete booking from ${booking.memberName} (${booking.bookingType})?\n\nThis action cannot be undone.`
      )
    ) {
      return;
    }
    setBusyId(booking.id);
    try {
      const res = await fetch(
        `/api/admin/bookings?id=${encodeURIComponent(booking.id)}`,
        { method: "DELETE" }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Delete failed");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusyId(null);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-brand-gold/30 shadow-xl text-center">
        <p className="text-brand-ink/60">
          No bookings yet. Submissions from the website will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Filters */}
      <div className="bg-white rounded-3xl p-5 border border-brand-gold/30 shadow-sm mb-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-ink/40" />
            <input
              type="search"
              placeholder="Search by name, ID, phone, email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-brand-cream border border-brand-gold/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <FilterChip
              active={filter === "all"}
              count={counts.all}
              onClick={() => setFilter("all")}
              label="All"
            />
            {STATUSES.map((s) => (
              <FilterChip
                key={s.value}
                active={filter === s.value}
                count={counts[s.value] ?? 0}
                onClick={() => setFilter(s.value)}
                label={s.label}
              />
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-brand-gold/30 shadow-xl text-center text-brand-ink/60 text-sm">
          No bookings match the filter.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => {
            const statusMeta =
              STATUSES.find((s) => s.value === b.status) ?? STATUSES[0];
            const isBusy = busyId === b.id;
            return (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-5 border border-brand-gold/30 shadow-sm card-hover"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold-dark">
                        {b.bookingType}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${statusMeta.classes}`}
                      >
                        {statusMeta.label}
                      </span>
                    </div>
                    <h3 className="font-bold text-brand-ink text-lg">
                      {b.memberName}{" "}
                      <span className="text-brand-ink/40 text-sm font-normal">
                        · #{b.memberId}
                      </span>
                    </h3>
                    <p className="text-brand-ink/70 text-sm">
                      {b.eventType} · {b.persons} person{b.persons === 1 ? "" : "s"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={b.status}
                      onChange={(e) =>
                        updateStatus(b.id, e.target.value as BookingStatus)
                      }
                      disabled={isBusy}
                      className="text-xs bg-brand-cream border border-brand-gold/30 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-red disabled:opacity-60"
                    >
                      {STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => handleDelete(b)}
                      disabled={isBusy}
                      title="Delete booking"
                      className="p-2 bg-white border border-red-200 hover:bg-red-50 text-red-600 rounded-lg transition-colors disabled:opacity-60"
                    >
                      {isBusy ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2 text-sm pt-3 border-t border-brand-gold/20">
                  <div className="flex items-center gap-2 text-brand-ink/70">
                    <Calendar className="w-4 h-4 text-brand-red flex-shrink-0" />
                    <span>{formatDate(b.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-ink/70">
                    <Users className="w-4 h-4 text-brand-red flex-shrink-0" />
                    <span>{b.persons} guests</span>
                  </div>
                  <a
                    href={`tel:${b.phone}`}
                    className="flex items-center gap-2 text-brand-ink/70 hover:text-brand-red"
                  >
                    <Phone className="w-4 h-4 text-brand-red flex-shrink-0" />
                    <span>{b.phone}</span>
                  </a>
                  <a
                    href={`mailto:${b.email}`}
                    className="flex items-center gap-2 text-brand-ink/70 hover:text-brand-red min-w-0"
                  >
                    <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                    <span className="truncate">{b.email}</span>
                  </a>
                </div>

                <p className="text-xs text-brand-ink/40 mt-3">
                  Submitted{" "}
                  {new Date(b.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "Asia/Kolkata",
                  })}{" "}
                  IST
                </p>
              </div>
            );
          })}
        </div>
      )}
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
      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
        active
          ? "bg-brand-red text-white border-brand-red"
          : "bg-white text-brand-ink/70 border-brand-gold/30 hover:border-brand-red"
      }`}
    >
      {label}{" "}
      <span className={active ? "text-white/80" : "text-brand-ink/40"}>
        ({count})
      </span>
    </button>
  );
}

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });
  } catch {
    return d;
  }
}

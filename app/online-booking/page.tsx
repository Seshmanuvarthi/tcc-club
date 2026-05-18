"use client";

import { useState } from "react";
import {
  Building2, Bed, Crown, Utensils, Gamepad2, Trees,
  CheckCircle2, Loader2,
} from "lucide-react";

const bookingTypes = [
  { value: "Banquet Booking",        label: "Banquet Booking",        icon: Building2,  desc: "Reserve our banquet halls for weddings, receptions, and events." },
  { value: "Room Booking",           label: "Room Booking",           icon: Bed,        desc: "Book residential rooms for members and their guests." },
  { value: "Darbar Booking",         label: "Darbar Booking",         icon: Crown,      desc: "Reserve our Darbar hall for cultural or formal gatherings." },
  { value: "Table Booking",          label: "Table Booking",          icon: Utensils,   desc: "Reserve a table at the restaurant for an upcoming meal." },
  { value: "Indoor Games Booking",   label: "Indoor Games",           icon: Gamepad2,   desc: "Reserve indoor games slots — billiards, table tennis, and more." },
  { value: "Outdoor Games Booking",  label: "Outdoor Games",          icon: Trees,      desc: "Reserve outdoor courts and sports facilities." },
] as const;

type BookingType = (typeof bookingTypes)[number]["value"];

const eventTypeSuggestions = [
  "Wedding", "Reception", "Engagement", "Birthday", "Anniversary",
  "Corporate Meeting", "Family Gathering", "Cultural Event", "Other",
];

export default function OnlineBookingPage() {
  const [step, setStep] = useState<"select" | "form" | "done">("select");
  const [bookingType, setBookingType] = useState<BookingType | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      bookingType,
      memberId:   form.get("memberId"),
      memberName: form.get("memberName"),
      eventType:  form.get("eventType"),
      date:       form.get("date"),
      persons:    form.get("persons"),
      phone:      form.get("phone"),
      email:      form.get("email"),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-ink py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-gold font-semibold tracking-widest uppercase text-sm mb-4">
            Reservations
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Online <span className="gold-gradient-text">Booking</span>
          </h1>
          <p className="text-brand-cream/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Tell us what you&apos;d like to book, and our team will get back to
            you shortly to confirm your reservation.
          </p>
        </div>
      </section>

      {/* Step 1: Select booking type */}
      {step === "select" && (
        <section className="bg-brand-cream py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink mb-2">
                What would you like to book?
              </h2>
              <p className="text-brand-ink/60">
                Choose the type of booking to get started.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {bookingTypes.map(({ value, label, icon: Icon, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setBookingType(value);
                    setStep("form");
                  }}
                  className="group bg-white rounded-2xl p-6 text-left border border-brand-gold/20 shadow-sm card-hover"
                >
                  <div className="w-14 h-14 bg-brand-red/10 group-hover:bg-brand-red rounded-2xl flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-7 h-7 text-brand-red group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-brand-ink text-lg mb-1.5">
                    {label}
                  </h3>
                  <p className="text-brand-ink/60 text-sm leading-relaxed">
                    {desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Step 2: Form */}
      {step === "form" && bookingType && (
        <section className="bg-brand-cream py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <button
              type="button"
              onClick={() => {
                setBookingType(null);
                setStep("select");
                setError(null);
              }}
              className="text-brand-red hover:text-brand-red-dark text-sm font-semibold mb-4"
            >
              ← Change booking type
            </button>

            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-gold/30 shadow-xl">
              <div className="mb-8 pb-6 border-b border-brand-gold/20">
                <p className="text-brand-gold-dark text-xs font-semibold uppercase tracking-widest mb-1">
                  Booking Type
                </p>
                <h2 className="text-2xl font-bold text-brand-ink">
                  {bookingType}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Member ID" name="memberId" required />
                  <Field label="Member Name" name="memberName" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="Event Type"
                    name="eventType"
                    required
                    list="event-types"
                    placeholder="e.g. Wedding, Birthday, Meeting"
                  />
                  <datalist id="event-types">
                    {eventTypeSuggestions.map((s) => (
                      <option key={s} value={s} />
                    ))}
                  </datalist>
                  <Field label="Date" name="date" type="date" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="No. of Persons"
                    name="persons"
                    type="number"
                    min={1}
                    required
                  />
                  <Field
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                />

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                    {error}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-brand-red/25"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      "Submit Booking Request"
                    )}
                  </button>
                  <p className="text-center text-brand-ink/50 text-sm mt-3">
                    Our team will get back to you shortly.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Step 3: Done */}
      {step === "done" && (
        <section className="bg-brand-cream py-20 sm:py-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl p-10 sm:p-14 border-2 border-brand-gold/30 shadow-xl text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-brand-ink mb-3">
                Thank You!
              </h2>
              <p className="text-brand-ink/70 text-lg mb-8">
                Your booking request has been received. Our team will get back
                to you shortly to confirm.
              </p>
              <button
                type="button"
                onClick={() => {
                  setBookingType(null);
                  setStep("select");
                }}
                className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Make Another Booking
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  list,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  list?: string;
  min?: number;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-brand-ink mb-1.5">
        {label} {required && <span className="text-brand-red">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        list={list}
        min={min}
        className="w-full px-4 py-3 bg-brand-cream border border-brand-gold/30 rounded-xl text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-all"
      />
    </label>
  );
}

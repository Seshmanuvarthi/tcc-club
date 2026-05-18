import { Phone, Mail, MapPin, User, Briefcase, Calculator, Users, Building2, Utensils } from "lucide-react";

type Staff = {
  icon: React.ComponentType<{ className?: string }>;
  role: string;
  name: string;
  phone?: string;
  email?: string;
};

const staff: Staff[] = [
  {
    icon: Briefcase,
    role: "General Manager",
    name: "Mr. Sunil",
    phone: "[GM phone number to be added]",
    email: "gm@tccclub.in",
  },
  {
    icon: User,
    role: "Assistant General Manager",
    name: "[AGM Name]",
    phone: "[AGM phone number to be added]",
    email: "agm@tccclub.in",
  },
  {
    icon: Calculator,
    role: "Accounts",
    name: "Mr. Sai",
    phone: "[Accounts phone number to be added]",
    email: "accounts@tccclub.in",
  },
  {
    icon: Users,
    role: "HR Manager",
    name: "[HR Manager Name]",
    phone: "[HR phone number to be added]",
    email: "hr@tccclub.in",
  },
  {
    icon: Building2,
    role: "Room Bookings",
    name: "Front Desk",
    phone: "[Rooms reservation number to be added]",
    email: "rooms@tccclub.in",
  },
  {
    icon: Utensils,
    role: "Restaurant Reservations",
    name: "Restaurant Desk",
    phone: "[Restaurant reservation number to be added]",
    email: "dining@tccclub.in",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-ink py-24 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-gold font-semibold tracking-widest uppercase text-sm mb-4">
            Get In Touch
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Contact <span className="gold-gradient-text">TCC</span>
          </h1>
          <p className="text-brand-cream/80 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            For bookings, enquiries, memberships, or general questions — our
            team is here to help.
          </p>
        </div>
      </section>

      {/* Top contact cards */}
      <section className="bg-brand-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-brand-gold/20 shadow-sm text-center">
            <div className="w-14 h-14 bg-brand-red/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-brand-red" />
            </div>
            <h3 className="font-bold text-brand-ink mb-2">Call Us</h3>
            <a
              href="tel:+918121042251"
              className="text-brand-ink/70 hover:text-brand-red"
            >
              +91 81210 42251
            </a>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-brand-gold/20 shadow-sm text-center">
            <div className="w-14 h-14 bg-brand-red/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-brand-red" />
            </div>
            <h3 className="font-bold text-brand-ink mb-2">Email Us</h3>
            <a
              href="mailto:info@tccclub.in"
              className="text-brand-ink/70 hover:text-brand-red"
            >
              info@tccclub.in
            </a>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-brand-gold/20 shadow-sm text-center">
            <div className="w-14 h-14 bg-brand-red/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-brand-red" />
            </div>
            <h3 className="font-bold text-brand-ink mb-2">Visit Us</h3>
            <p className="text-brand-ink/70 text-sm">
              Hyderabad, Telangana
            </p>
          </div>
        </div>
      </section>

      {/* Staff Directory */}
      <section className="bg-white py-20 sm:py-24 border-y border-brand-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-3">
              Team Directory
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink mb-3">
              Speak to the Right Person
            </h2>
            <div className="divider-gold w-32 mx-auto" />
          </div>
          <div className="mb-8 text-center">
            <p className="text-sm text-brand-ink/50 italic">
              [Phone numbers are placeholders — final numbers will be updated
              once shared by the club.]
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-brand-cream rounded-2xl p-6 border border-brand-gold/20 shadow-sm card-hover"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-brand-gold-dark uppercase tracking-widest mb-1">
                        {s.role}
                      </p>
                      <h3 className="font-bold text-brand-ink leading-tight">
                        {s.name}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-2 pt-4 border-t border-brand-gold/20">
                    {s.phone && (
                      <p className="flex items-center gap-2 text-sm text-brand-ink/70">
                        <Phone className="w-4 h-4 text-brand-red flex-shrink-0" />
                        {s.phone.startsWith("[") ? (
                          <span className="italic text-brand-ink/40">
                            {s.phone}
                          </span>
                        ) : (
                          <a href={`tel:${s.phone}`} className="hover:text-brand-red">
                            {s.phone}
                          </a>
                        )}
                      </p>
                    )}
                    {s.email && (
                      <p className="flex items-center gap-2 text-sm text-brand-ink/70">
                        <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                        <a
                          href={`mailto:${s.email}`}
                          className="hover:text-brand-red break-all"
                        >
                          {s.email}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-brand-cream py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-3">
              Find Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink mb-3">
              Location on Map
            </h2>
            <div className="divider-gold w-32 mx-auto" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-brand-gold/20 h-[420px]">
            <iframe
              title="TCC Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.7259!2d78.4866713!3d17.385044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjEiTiA3OMKwMjknMTIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}

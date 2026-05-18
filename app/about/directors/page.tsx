import { User, Mail, Phone } from "lucide-react";

type Director = {
  name: string;
  role: string;
  bio?: string;
  email?: string;
  phone?: string;
};

const directors: Director[] = [
  {
    name: "[Director Name]",
    role: "President",
    bio: "Brief bio to be provided.",
  },
  {
    name: "[Director Name]",
    role: "Vice President",
    bio: "Brief bio to be provided.",
  },
  {
    name: "[Director Name]",
    role: "Secretary",
    bio: "Brief bio to be provided.",
  },
  {
    name: "[Director Name]",
    role: "Treasurer",
    bio: "Brief bio to be provided.",
  },
  {
    name: "[Director Name]",
    role: "Joint Secretary",
    bio: "Brief bio to be provided.",
  },
  {
    name: "[Director Name]",
    role: "Executive Committee Member",
    bio: "Brief bio to be provided.",
  },
];

export default function DirectorsPage() {
  return (
    <>
      <section className="relative bg-brand-ink py-24 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl opacity-15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-gold font-semibold tracking-widest uppercase text-sm mb-4">
            Leadership
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Board of <span className="gold-gradient-text">Directors</span>
          </h1>
          <p className="text-brand-cream/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Meet the leadership team guiding the Telangana Contractors Cultural
            Club.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center">
            <p className="text-sm text-brand-ink/50 italic">
              [Placeholder cards — official details and photographs will be
              added once shared by the club.]
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {directors.map((d, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border border-brand-gold/20 shadow-sm card-hover"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-10 h-10 text-brand-red" />
                  </div>
                  <div>
                    <h3 className="text-brand-ink font-bold text-lg leading-tight">
                      {d.name}
                    </h3>
                    <p className="text-brand-gold-dark text-sm font-semibold uppercase tracking-wider mt-1">
                      {d.role}
                    </p>
                  </div>
                </div>
                {d.bio && (
                  <p className="text-brand-ink/65 text-sm leading-relaxed mb-4">
                    {d.bio}
                  </p>
                )}
                {(d.email || d.phone) && (
                  <div className="space-y-1.5 pt-4 border-t border-brand-gold/20">
                    {d.email && (
                      <a
                        href={`mailto:${d.email}`}
                        className="flex items-center gap-2 text-sm text-brand-ink/70 hover:text-brand-red"
                      >
                        <Mail className="w-4 h-4" />
                        {d.email}
                      </a>
                    )}
                    {d.phone && (
                      <a
                        href={`tel:${d.phone}`}
                        className="flex items-center gap-2 text-sm text-brand-ink/70 hover:text-brand-red"
                      >
                        <Phone className="w-4 h-4" />
                        {d.phone}
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

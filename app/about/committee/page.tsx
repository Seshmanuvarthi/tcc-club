import type { Metadata } from "next";
import { listCommittee, type CommitteeMember } from "@/lib/blob";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Managing Committee",
  description:
    "Meet the elected managing committee of the Telangana Contractors Cultural Club for 2023 – 2028 — President, Secretary, Treasurer, and Directors leading TCCC.",
  openGraph: {
    title: "Managing Committee | TCCC",
    description:
      "The elected leadership behind the Telangana Contractors Cultural Club, guiding the club's vision and members' experience.",
  },
};

function initials(name: string) {
  return name
    .replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, "")
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function MemberCard({
  member,
  large = false,
}: {
  member: CommitteeMember;
  large?: boolean;
}) {
  const photoSize = large ? "w-32 h-32 sm:w-36 sm:h-36" : "w-24 h-24 sm:w-28 sm:h-28";
  const initialsText = large ? "text-3xl" : "text-2xl";
  const nameSize = large ? "text-base sm:text-lg" : "text-sm sm:text-base";

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-brand-gold/30 shadow-sm card-hover flex flex-col items-center text-center">
      <div
        className={`${photoSize} rounded-full overflow-hidden bg-gradient-to-br from-brand-gold via-brand-gold to-brand-gold-dark flex items-center justify-center text-white font-bold mb-4 ring-4 ring-brand-gold/20`}
      >
        {member.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.photoUrl}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className={initialsText}>{initials(member.name)}</span>
        )}
      </div>
      <h3 className={`${nameSize} font-bold text-brand-ink leading-tight mb-1.5`}>
        {member.name}
      </h3>
      <span
        className={`inline-block ${
          large ? "bg-brand-red text-white" : "bg-brand-gold/15 text-brand-gold-dark"
        } text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full`}
      >
        {member.designation}
      </span>
    </div>
  );
}

export default async function CommitteePage() {
  const members = await listCommittee();
  // Officers = those whose designation is NOT "Director" (case-insensitive)
  const officers = members.filter(
    (m) => m.designation.trim().toLowerCase() !== "director"
  );
  const directors = members.filter(
    (m) => m.designation.trim().toLowerCase() === "director"
  );

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-ink py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl opacity-15" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-gold rounded-full blur-3xl opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-gold font-semibold tracking-widest uppercase text-sm mb-4">
            Governance
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Managing <span className="gold-gradient-text">Committee</span>
          </h1>
          <p className="text-brand-cream/80 text-lg max-w-3xl mx-auto leading-relaxed">
            The elected managing committee responsible for the administration
            and development of the Telangana Contractors Cultural Club.
          </p>
        </div>
      </section>

      {/* Office Bearers */}
      {officers.length > 0 && (
        <section className="bg-brand-cream py-10 sm:py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-2">
                2023 – 2028
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink mb-3">
                Office Bearers
              </h2>
              <div className="divider-gold w-32 mx-auto" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {officers.map((m) => (
                <MemberCard key={m.id} member={m} large />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Directors */}
      {directors.length > 0 && (
        <section className="bg-white py-10 sm:py-14 border-t border-brand-gold/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink mb-3">
                Directors
              </h2>
              <div className="divider-gold w-32 mx-auto" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {directors.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          </div>
        </section>
      )}

      {members.length === 0 && (
        <section className="bg-brand-cream py-16">
          <div className="max-w-2xl mx-auto px-4 text-center text-brand-ink/60">
            <p>Committee members will be listed here once added by the club.</p>
          </div>
        </section>
      )}
    </>
  );
}

const members = [
  { sno: 1,  designation: "President",       mcode: "FM01",  name: "Mr. Bollineni Seenaiah" },
  { sno: 2,  designation: "Vice President",  mcode: "FM09",  name: "Mr. Sreepathi Narsimha Reddy" },
  { sno: 3,  designation: "Secretary",       mcode: "FM03",  name: "Mr. Nimma Sachitanand Reddy" },
  { sno: 4,  designation: "Joint Secretary", mcode: "FM04",  name: "Mr. Vemula Satya Murthy" },
  { sno: 5,  designation: "Treasurer",       mcode: "FM05",  name: "Mr. Balmuri Sugunakar Rao" },
  { sno: 6,  designation: "Director",        mcode: "FM02",  name: "Mr. Dachireddy Venkat Narsimha Reddy" },
  { sno: 7,  designation: "Director",        mcode: "FM17",  name: "Mr. Vaddi Bhaskar Reddy" },
  { sno: 8,  designation: "Director",        mcode: "FM14",  name: "Mr. Vanga Ravinder Reddy" },
  { sno: 9,  designation: "Director",        mcode: "FM12",  name: "Mr. Velpucherla Sudhakar" },
  { sno: 10, designation: "Director",        mcode: "FM16",  name: "Mr. Katukuri Devender Reddy" },
  { sno: 11, designation: "Director",        mcode: "FM11",  name: "Mr. Yavanamanda Sitarama Raju" },
  { sno: 12, designation: "Director",        mcode: "FM21",  name: "Mr. Uppula Surender" },
  { sno: 13, designation: "Director",        mcode: "FM08",  name: "Mr. Sankineni Krishna Rao" },
  { sno: 14, designation: "Director",        mcode: "FM-47", name: "Mr. Madireddy Narender Reddy" },
  { sno: 15, designation: "Director",        mcode: "FM13",  name: "Mr. Patlolla Janardhan Reddy" },
  { sno: 16, designation: "Director",        mcode: "FM07",  name: "Mr. Churukanti Pavan" },
  { sno: 17, designation: "Director",        mcode: "FM10",  name: "Mr. Nerella Janardana Rao" },
];

const isOfficer = (d: string) => d !== "Director";

export default function CommitteePage() {
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

      {/* Table */}
      <section className="bg-brand-cream py-8 sm:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-3">
              2024 – 2027
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink mb-3">
              Committee Members
            </h2>
            <div className="divider-gold w-32 mx-auto" />
          </div>

          <div className="rounded-2xl overflow-hidden border border-brand-gold/30 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-ink text-white">
                  <th className="text-center px-4 py-3 font-semibold uppercase tracking-wider text-xs w-12">S.No</th>
                  <th className="text-left px-4 py-3 font-semibold uppercase tracking-wider text-xs">Designation</th>
                  <th className="text-left px-4 py-3 font-semibold uppercase tracking-wider text-xs hidden sm:table-cell">Member Code</th>
                  <th className="text-left px-4 py-3 font-semibold uppercase tracking-wider text-xs">Name</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gold/15">
                {members.map((m) => (
                  <tr
                    key={m.mcode}
                    className={`transition-colors hover:bg-brand-gold/5 ${
                      isOfficer(m.designation) ? "bg-white" : "bg-brand-cream/50"
                    }`}
                  >
                    <td className="px-4 py-3 text-center text-brand-ink/40 text-xs font-medium">{m.sno}</td>
                    <td className="px-4 py-3 font-semibold">
                      <span className={isOfficer(m.designation) ? "text-brand-red" : "text-brand-gold-dark"}>
                        {m.designation}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-brand-ink/50 font-mono text-xs hidden sm:table-cell">{m.mcode}</td>
                    <td className="px-4 py-3 font-medium text-brand-ink">{m.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

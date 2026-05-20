import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { listCommittee } from "@/lib/blob";
import { ArrowLeft, UsersRound } from "lucide-react";
import CommitteeAdminClient from "./CommitteeAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminCommitteePage() {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");

  const members = await listCommittee();

  return (
    <section className="bg-brand-cream min-h-[calc(100vh-4rem)] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-brand-red hover:text-brand-red-dark text-sm font-semibold mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-gold/30 shadow-xl mb-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-brand-red rounded-2xl flex items-center justify-center flex-shrink-0">
              <UsersRound className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-brand-ink">
                Committee Manager
              </h1>
              <p className="text-brand-ink/60 text-sm">
                Add, edit, reorder, or remove committee members. Upload photos
                for each member — initials are shown when no photo is uploaded.
                ({members.length} total)
              </p>
              <p className="text-xs text-brand-ink/50 mt-2">
                <strong>Sort Order:</strong> smaller number = higher in
                hierarchy. Use 1–5 for office bearers (President, VP, Secretary,
                Joint Secretary, Treasurer) and 6+ for directors.
              </p>
            </div>
          </div>
        </div>

        <CommitteeAdminClient members={members} />
      </div>
    </section>
  );
}

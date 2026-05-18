import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { listNewsletters } from "@/lib/blob";
import { ArrowLeft, Newspaper } from "lucide-react";
import NewsletterUploadForm from "./NewsletterUploadForm";
import NewsletterList from "./NewsletterList";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");

  const items = await listNewsletters();

  return (
    <section className="bg-brand-cream min-h-[calc(100vh-4rem)] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-brand-red hover:text-brand-red-dark text-sm font-semibold mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-gold/30 shadow-xl mb-8">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-brand-gold/20">
            <div className="w-14 h-14 bg-brand-gold-dark rounded-2xl flex items-center justify-center">
              <Newspaper className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-brand-ink">
                Newsletter Upload
              </h1>
              <p className="text-brand-ink/60 text-sm">
                Upload daily news (image or PDF). Past uploads remain visible
                to members.
              </p>
            </div>
          </div>

          <NewsletterUploadForm />
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-gold/30 shadow-xl">
          <h2 className="text-xl font-bold text-brand-ink mb-1">
            Newsletter Archive ({items.length})
          </h2>
          <p className="text-brand-ink/60 text-sm mb-6">
            Use the share buttons to post any update to Instagram or Facebook.
          </p>
          <NewsletterList items={items} />
        </div>
      </div>
    </section>
  );
}

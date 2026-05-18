import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { getCurrentMenu } from "@/lib/blob";
import { ArrowLeft, UtensilsCrossed } from "lucide-react";
import MenuUploadForm from "./MenuUploadForm";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");

  const current = await getCurrentMenu();

  return (
    <section className="bg-brand-cream min-h-[calc(100vh-4rem)] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-brand-red hover:text-brand-red-dark text-sm font-semibold mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-gold/30 shadow-xl">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-brand-gold/20">
            <div className="w-14 h-14 bg-brand-red rounded-2xl flex items-center justify-center">
              <UtensilsCrossed className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-brand-ink">
                Daily Menu Upload
              </h1>
              <p className="text-brand-ink/60 text-sm">
                Uploading a new image will replace the previous menu.
              </p>
            </div>
          </div>

          {current && (
            <div className="mb-8">
              <p className="text-sm font-semibold text-brand-ink mb-3">
                Current menu:
              </p>
              <div className="bg-brand-cream rounded-2xl p-2 border border-brand-gold/20">
                <Image
                  src={current.url}
                  alt="Current menu"
                  width={800}
                  height={1000}
                  className="rounded-xl w-full h-auto max-h-96 object-contain"
                  unoptimized
                />
              </div>
              <p className="text-xs text-brand-ink/50 mt-2">
                Last updated:{" "}
                {new Date(current.uploadedAt).toLocaleString("en-IN")}
              </p>
            </div>
          )}

          <MenuUploadForm />
        </div>
      </div>
    </section>
  );
}

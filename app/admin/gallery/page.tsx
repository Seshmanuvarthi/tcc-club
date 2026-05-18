import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { listGallery } from "@/lib/blob";
import { ArrowLeft, Camera } from "lucide-react";
import GalleryAdminClient from "./GalleryAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");

  const items = await listGallery();

  return (
    <section className="bg-brand-cream min-h-[calc(100vh-4rem)] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-brand-red hover:text-brand-red-dark text-sm font-semibold mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-gold/30 shadow-xl">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 bg-brand-red rounded-2xl flex items-center justify-center">
              <Camera className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-brand-ink">
                Gallery Manager
              </h1>
              <p className="text-brand-ink/60 text-sm">
                Add new gallery photos with a short caption. Edit captions or
                remove photos any time. ({items.length} uploaded)
              </p>
            </div>
          </div>
          <p className="text-xs text-brand-ink/50 mt-3 ml-[72px]">
            Note: the 6 default TCC marketing images on the public gallery are
            permanent and managed in code. The photos you upload here appear
            after those.
          </p>
        </div>

        <GalleryAdminClient items={items} />
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, CheckCircle2 } from "lucide-react";

export default function NewsletterUploadForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "POST",
        body: form,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      setSuccess(true);
      formEl.reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <span className="block text-sm font-semibold text-brand-ink mb-2">
          Newsletter file (JPG, PNG, WEBP or PDF, max 25 MB)
        </span>
        <input
          name="file"
          type="file"
          required
          accept="image/jpeg,image/png,image/webp,application/pdf"
          className="w-full text-sm text-brand-ink file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:bg-brand-red file:text-white file:font-semibold hover:file:bg-brand-red-dark file:cursor-pointer cursor-pointer"
        />
      </label>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Newsletter uploaded. Scroll down to share to Instagram or Facebook.
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-brand-red/25"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" /> Upload Newsletter
          </>
        )}
      </button>
    </form>
  );
}

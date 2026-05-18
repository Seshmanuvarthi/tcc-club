"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, CheckCircle2 } from "lucide-react";

export default function MenuUploadForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/menu", {
        method: "POST",
        body: form,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      setSuccess(true);
      setPreview(null);
      (e.currentTarget as HTMLFormElement).reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <span className="block text-sm font-semibold text-brand-ink mb-2">
          New menu image (JPG, PNG, max 10 MB)
        </span>
        <input
          name="file"
          type="file"
          required
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-brand-ink file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:bg-brand-red file:text-white file:font-semibold hover:file:bg-brand-red-dark file:cursor-pointer cursor-pointer"
        />
      </label>

      {preview && (
        <div className="bg-brand-cream rounded-2xl p-2 border border-brand-gold/20">
          <img
            src={preview}
            alt="Preview"
            className="rounded-xl w-full h-auto max-h-80 object-contain"
          />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Menu uploaded successfully.
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
            <Upload className="w-4 h-4" /> Upload Menu
          </>
        )}
      </button>
    </form>
  );
}

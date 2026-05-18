"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload, Loader2, CheckCircle2, Trash2, Pencil, Check, X,
} from "lucide-react";
import type { GalleryItem } from "@/lib/blob";

export default function GalleryAdminClient({
  items,
}: {
  items: GalleryItem[];
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: form,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      setSuccess(true);
      setPreview(null);
      formEl.reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, caption: string) => {
    if (!confirm(`Delete "${caption}" from the gallery? This cannot be undone.`)) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/gallery?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Delete failed");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusyId(null);
    }
  };

  const startEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setEditText(item.caption);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = async (id: string) => {
    if (!editText.trim()) {
      alert("Caption can't be empty.");
      return;
    }
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, caption: editText.trim() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Update failed");
      setEditingId(null);
      setEditText("");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setSuccess(false);
    } else {
      setPreview(null);
    }
  };

  return (
    <>
      {/* Upload */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-gold/30 shadow-xl mt-6">
        <h2 className="text-lg font-bold text-brand-ink mb-4">Add a new photo</h2>

        <form onSubmit={handleUpload} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="block">
              <span className="block text-sm font-semibold text-brand-ink mb-2">
                Photo (JPG / PNG / WEBP, max 10 MB)
              </span>
              <input
                name="file"
                type="file"
                required
                accept="image/jpeg,image/png,image/webp"
                onChange={onFileChange}
                className="w-full text-sm text-brand-ink file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:bg-brand-red file:text-white file:font-semibold hover:file:bg-brand-red-dark file:cursor-pointer cursor-pointer"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-semibold text-brand-ink mb-2">
                Caption <span className="text-brand-red">*</span>
              </span>
              <input
                name="caption"
                type="text"
                required
                maxLength={100}
                placeholder="e.g. Diwali Celebration 2026"
                className="w-full px-4 py-3 bg-brand-cream border border-brand-gold/30 rounded-xl text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
              />
              <span className="block text-xs text-brand-ink/50 mt-1">
                Up to 100 characters.
              </span>
            </label>
          </div>

          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Preview"
              className="rounded-xl max-h-60 object-contain bg-brand-cream border border-brand-gold/20 p-2"
            />
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Photo added to gallery.
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-brand-red/20"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" /> Add Photo
              </>
            )}
          </button>
        </form>
      </div>

      {/* Uploaded photos list */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-gold/30 shadow-xl mt-6">
        <h2 className="text-lg font-bold text-brand-ink mb-1">
          Uploaded Photos ({items.length})
        </h2>
        <p className="text-brand-ink/60 text-sm mb-6">
          These show on the public gallery after the 6 default TCC images.
        </p>

        {items.length === 0 ? (
          <div className="text-center py-10 text-brand-ink/50 text-sm">
            No photos uploaded yet. Add one above.
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => {
              const isEditing = editingId === item.id;
              const isBusy = busyId === item.id;
              return (
                <li
                  key={item.id}
                  className="bg-brand-cream rounded-xl p-3 border border-brand-gold/20 flex items-center gap-4"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0 border border-brand-gold/30"
                  />
                  <div className="flex-1 min-w-0">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          maxLength={100}
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1 px-3 py-2 bg-white border border-brand-gold/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => saveEdit(item.id)}
                          disabled={isBusy}
                          className="p-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg disabled:opacity-60"
                          title="Save"
                        >
                          {isBusy ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="p-2 bg-white border border-brand-gold/30 text-brand-ink rounded-lg"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="font-semibold text-brand-ink truncate">
                          {item.caption}
                        </p>
                        <p className="text-xs text-brand-ink/50 mt-0.5">
                          Added{" "}
                          {new Date(item.uploadedAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                            timeZone: "Asia/Kolkata",
                          })}{" "}
                          IST
                        </p>
                      </>
                    )}
                  </div>
                  {!isEditing && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        disabled={isBusy}
                        className="p-2 bg-white border border-brand-gold/30 hover:border-brand-red text-brand-ink hover:text-brand-red rounded-lg transition-colors disabled:opacity-60"
                        title="Edit caption"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.caption)}
                        disabled={isBusy}
                        className="p-2 bg-white border border-red-200 hover:bg-red-50 text-red-600 rounded-lg transition-colors disabled:opacity-60"
                        title="Delete photo"
                      >
                        {isBusy ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus, Pencil, Trash2, Loader2, CheckCircle2, Upload, X,
} from "lucide-react";
import type { CommitteeMember } from "@/lib/blob";

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

type FormState = {
  name: string;
  designation: string;
  sortOrder: string;
  file: File | null;
  removePhoto: boolean;
};

const emptyForm: FormState = {
  name: "",
  designation: "",
  sortOrder: "",
  file: null,
  removePhoto: false,
};

export default function CommitteeAdminClient({
  members,
}: {
  members: CommitteeMember[];
}) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const openAdd = () => {
    setAdding(true);
    setEditingId(null);
    setForm({
      ...emptyForm,
      sortOrder: String(
        members.length === 0 ? 1 : Math.max(...members.map((m) => m.sortOrder)) + 1
      ),
    });
    setError(null);
    setSuccess(null);
  };

  const openEdit = (m: CommitteeMember) => {
    setAdding(false);
    setEditingId(m.id);
    setForm({
      name: m.name,
      designation: m.designation,
      sortOrder: String(m.sortOrder),
      file: null,
      removePhoto: false,
    });
    setError(null);
    setSuccess(null);
  };

  const closeForm = () => {
    setAdding(false);
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const fd = new FormData();
    fd.set("name", form.name);
    fd.set("designation", form.designation);
    fd.set("sortOrder", form.sortOrder);
    if (form.file) fd.set("photo", form.file);
    if (editingId) {
      fd.set("id", editingId);
      if (form.removePhoto) fd.set("removePhoto", "true");
    }

    try {
      const res = await fetch("/api/admin/committee", {
        method: editingId ? "PATCH" : "POST",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Save failed");
      setSuccess(editingId ? "Member updated" : "Member added");
      closeForm();
      router.refresh();
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (m: CommitteeMember) => {
    if (!confirm(`Delete ${m.name} from the committee? This cannot be undone.`))
      return;
    setBusyId(m.id);
    try {
      const res = await fetch(
        `/api/admin/committee?id=${encodeURIComponent(m.id)}`,
        { method: "DELETE" }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Delete failed");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusyId(null);
    }
  };

  const isFormOpen = adding || editingId !== null;

  return (
    <>
      {/* Action bar */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-brand-ink/60">
          {members.length} member{members.length === 1 ? "" : "s"}
        </p>
        {!isFormOpen && (
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors shadow"
          >
            <Plus className="w-4 h-4" /> Add Member
          </button>
        )}
      </div>

      {success && !isFormOpen && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {success}
        </div>
      )}

      {/* Form (add or edit) */}
      {isFormOpen && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-gold/30 shadow-xl mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-brand-ink">
              {editingId ? "Edit Committee Member" : "Add Committee Member"}
            </h2>
            <button
              type="button"
              onClick={closeForm}
              className="p-1.5 text-brand-ink/60 hover:text-brand-ink rounded-lg hover:bg-brand-cream"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-semibold text-brand-ink mb-1.5">
                  Name <span className="text-brand-red">*</span>
                </span>
                <input
                  type="text"
                  required
                  maxLength={120}
                  value={form.name}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, name: e.target.value }))
                  }
                  placeholder="e.g. Mr. Bollineni Seenaiah"
                  className="w-full px-3 py-2.5 bg-brand-cream border border-brand-gold/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                />
              </label>
              <label className="block">
                <span className="block text-sm font-semibold text-brand-ink mb-1.5">
                  Designation <span className="text-brand-red">*</span>
                </span>
                <input
                  type="text"
                  required
                  maxLength={60}
                  value={form.designation}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, designation: e.target.value }))
                  }
                  placeholder="e.g. President, Director"
                  className="w-full px-3 py-2.5 bg-brand-cream border border-brand-gold/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                />
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-semibold text-brand-ink mb-1.5">
                  Sort Order <span className="text-brand-red">*</span>
                </span>
                <input
                  type="number"
                  required
                  min={1}
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, sortOrder: e.target.value }))
                  }
                  className="w-full px-3 py-2.5 bg-brand-cream border border-brand-gold/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                />
                <span className="block text-xs text-brand-ink/50 mt-1">
                  Smaller number = higher in hierarchy.
                </span>
              </label>
              <label className="block">
                <span className="block text-sm font-semibold text-brand-ink mb-1.5">
                  Photo {editingId ? "(replace existing)" : "(optional)"}
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) =>
                    setForm((s) => ({
                      ...s,
                      file: e.target.files?.[0] ?? null,
                      removePhoto: false,
                    }))
                  }
                  className="w-full text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-brand-red file:text-white file:font-semibold file:cursor-pointer cursor-pointer"
                />
                {editingId && (
                  <label className="flex items-center gap-2 text-xs text-brand-ink/60 mt-2">
                    <input
                      type="checkbox"
                      checked={form.removePhoto}
                      onChange={(e) =>
                        setForm((s) => ({
                          ...s,
                          removePhoto: e.target.checked,
                          file: e.target.checked ? null : s.file,
                        }))
                      }
                      className="rounded border-brand-gold/30"
                    />
                    Remove existing photo (show initials)
                  </label>
                )}
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" /> {editingId ? "Update" : "Add"}{" "}
                    Member
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="px-5 py-2.5 border border-brand-gold/30 hover:border-brand-red text-brand-ink font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Members list */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-brand-gold/30 shadow-xl">
        {members.length === 0 ? (
          <div className="text-center py-10 text-brand-ink/50 text-sm">
            No members yet. Click &ldquo;Add Member&rdquo; to get started.
          </div>
        ) : (
          <ul className="divide-y divide-brand-gold/20">
            {members.map((m) => {
              const isBusy = busyId === m.id;
              return (
                <li
                  key={m.id}
                  className="py-3 flex items-center gap-3 sm:gap-4"
                >
                  {/* Avatar / Photo */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border-2 border-brand-gold/30 bg-gradient-to-br from-brand-gold to-brand-gold-dark flex items-center justify-center text-white font-bold">
                    {m.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={m.photoUrl}
                        alt={m.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm">{initials(m.name)}</span>
                    )}
                  </div>

                  {/* Sort badge */}
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-cream border border-brand-gold/30 flex items-center justify-center text-xs font-bold text-brand-ink/70">
                    {m.sortOrder}
                  </div>

                  {/* Name + designation */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-brand-ink truncate">
                      {m.name}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-dark mt-0.5">
                      {m.designation}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => openEdit(m)}
                      disabled={isBusy}
                      className="p-2 bg-white border border-brand-gold/30 hover:border-brand-red text-brand-ink hover:text-brand-red rounded-lg transition-colors disabled:opacity-60"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(m)}
                      disabled={isBusy}
                      className="p-2 bg-white border border-red-200 hover:bg-red-50 text-red-600 rounded-lg transition-colors disabled:opacity-60"
                      title="Delete"
                    >
                      {isBusy ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

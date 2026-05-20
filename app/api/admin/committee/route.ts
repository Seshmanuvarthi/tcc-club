import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import {
  addCommitteeMember,
  updateCommitteeMember,
  deleteCommitteeMember,
} from "@/lib/blob";

const ACCEPTED_PHOTO = ["image/jpeg", "image/png", "image/webp"];

function noToken() {
  return NextResponse.json(
    {
      error:
        "BLOB_READ_WRITE_TOKEN is not configured. Add it to .env.local (local) or to Vercel env vars (production).",
    },
    { status: 500 }
  );
}

function validatePhoto(file: File) {
  if (!ACCEPTED_PHOTO.includes(file.type)) {
    return "Photo must be a JPG, PNG, or WEBP image";
  }
  if (file.size > 5 * 1024 * 1024) {
    return "Photo too large (max 5 MB)";
  }
  return null;
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) return noToken();

  const form = await request.formData();
  const name = String(form.get("name") ?? "").trim();
  const designation = String(form.get("designation") ?? "").trim();
  const sortRaw = form.get("sortOrder");
  const sortOrder = Number(sortRaw);
  const photo = form.get("photo");

  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (!designation)
    return NextResponse.json({ error: "Designation is required" }, { status: 400 });
  if (!Number.isFinite(sortOrder))
    return NextResponse.json({ error: "Sort order must be a number" }, { status: 400 });

  let photoFile: File | null = null;
  if (photo instanceof File && photo.size > 0) {
    const err = validatePhoto(photo);
    if (err) return NextResponse.json({ error: err }, { status: 400 });
    photoFile = photo;
  }

  try {
    const member = await addCommitteeMember({
      name,
      designation,
      sortOrder,
      photoFile,
    });
    return NextResponse.json({ ok: true, member });
  } catch (err) {
    console.error("addCommitteeMember failed", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Create failed" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) return noToken();

  const form = await request.formData();
  const id = String(form.get("id") ?? "").trim();
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const update: Parameters<typeof updateCommitteeMember>[1] = {};
  const name = form.get("name");
  const designation = form.get("designation");
  const sortRaw = form.get("sortOrder");
  const removePhoto = form.get("removePhoto");
  const photo = form.get("photo");

  if (typeof name === "string" && name.trim()) update.name = name.trim();
  if (typeof designation === "string" && designation.trim())
    update.designation = designation.trim();
  if (sortRaw !== null && sortRaw !== undefined) {
    const n = Number(sortRaw);
    if (!Number.isFinite(n))
      return NextResponse.json(
        { error: "Sort order must be a number" },
        { status: 400 }
      );
    update.sortOrder = n;
  }
  if (removePhoto === "true" || removePhoto === "1") {
    update.removePhoto = true;
  }
  if (photo instanceof File && photo.size > 0) {
    const err = validatePhoto(photo);
    if (err) return NextResponse.json({ error: err }, { status: 400 });
    update.photoFile = photo;
  }

  try {
    const member = await updateCommitteeMember(id, update);
    return NextResponse.json({ ok: true, member });
  } catch (err) {
    console.error("updateCommitteeMember failed", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) return noToken();

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    await deleteCommitteeMember(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("deleteCommitteeMember failed", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Delete failed" },
      { status: 500 }
    );
  }
}

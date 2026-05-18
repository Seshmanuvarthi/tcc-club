import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import {
  addGalleryItem,
  deleteGalleryItem,
  updateGalleryCaption,
} from "@/lib/blob";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

function noToken() {
  return NextResponse.json(
    {
      error:
        "BLOB_READ_WRITE_TOKEN is not configured. Add it to .env.local (local) or to Vercel env vars (production).",
    },
    { status: 500 }
  );
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) return noToken();

  const form = await request.formData();
  const file = form.get("file");
  const caption = form.get("caption");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  if (!ACCEPTED.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPG, PNG, or WEBP images are accepted" },
      { status: 400 }
    );
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File too large (max 10 MB)" },
      { status: 400 }
    );
  }
  if (typeof caption !== "string" || !caption.trim()) {
    return NextResponse.json(
      { error: "Caption is required" },
      { status: 400 }
    );
  }

  try {
    const item = await addGalleryItem(file, caption.trim());
    return NextResponse.json({ ok: true, item });
  } catch (err) {
    console.error("addGalleryItem failed", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
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
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    await deleteGalleryItem(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("deleteGalleryItem failed", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) return noToken();

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { id, caption } = body;
  if (
    typeof id !== "string" ||
    typeof caption !== "string" ||
    !caption.trim()
  ) {
    return NextResponse.json(
      { error: "id and non-empty caption required" },
      { status: 400 }
    );
  }

  try {
    await updateGalleryCaption(id, caption.trim());
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("updateGalleryCaption failed", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { uploadNewsletter } from "@/lib/blob";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN is not configured. Add it to .env.local to enable uploads.",
      },
      { status: 500 }
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  if (!ACCEPTED.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPG, PNG, WEBP images or PDF files are accepted" },
      { status: 400 }
    );
  }
  if (file.size > 25 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File too large (max 25 MB)" },
      { status: 400 }
    );
  }

  try {
    const result = await uploadNewsletter(file);
    return NextResponse.json({ ok: true, url: result.url });
  } catch (err) {
    console.error("uploadNewsletter failed", err);
    return NextResponse.json(
      { error: "Upload failed. Check server logs." },
      { status: 500 }
    );
  }
}

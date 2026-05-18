import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { updateBookingStatus, deleteBooking } from "@/lib/blob";

const VALID_STATUSES = ["new", "contacted", "confirmed", "cancelled"] as const;
type Status = (typeof VALID_STATUSES)[number];

export async function PATCH(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "BLOB_READ_WRITE_TOKEN is not configured." },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.id !== "string" || typeof body.status !== "string") {
    return NextResponse.json({ error: "id and status required" }, { status: 400 });
  }
  if (!VALID_STATUSES.includes(body.status as Status)) {
    return NextResponse.json(
      { error: `status must be one of: ${VALID_STATUSES.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    await updateBookingStatus(body.id, body.status as Status);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("updateBookingStatus failed", err);
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
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "BLOB_READ_WRITE_TOKEN is not configured." },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    await deleteBooking(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("deleteBooking failed", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Delete failed" },
      { status: 500 }
    );
  }
}

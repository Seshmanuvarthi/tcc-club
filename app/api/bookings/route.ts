import { NextResponse } from "next/server";
import { addBooking } from "@/lib/blob";

const BOOKING_TYPES = [
  "Banquet Booking",
  "Room Booking",
  "Darbar Booking",
  "Table Booking",
  "Indoor Games Booking",
  "Outdoor Games Booking",
] as const;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    bookingType,
    memberId,
    memberName,
    eventType,
    date,
    persons,
    phone,
    email,
  } = body;

  if (
    !BOOKING_TYPES.includes(bookingType) ||
    !memberId ||
    !memberName ||
    !eventType ||
    !date ||
    !persons ||
    !phone ||
    !email
  ) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN is not configured — bookings cannot be saved.",
      },
      { status: 500 }
    );
  }

  try {
    const record = await addBooking({
      bookingType: String(bookingType),
      memberId: String(memberId),
      memberName: String(memberName),
      eventType: String(eventType),
      date: String(date),
      persons: Number(persons),
      phone: String(phone),
      email: String(email),
    });

    // TODO: when M365 SMTP credentials are configured, send a notification
    // email to bookings@tccclub.net here.

    return NextResponse.json({ ok: true, id: record.id });
  } catch (err) {
    console.error("Failed to save booking", err);
    return NextResponse.json(
      { error: "Could not save booking. Please try again later." },
      { status: 500 }
    );
  }
}

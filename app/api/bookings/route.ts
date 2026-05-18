import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const BOOKING_TYPES = [
  "Banquet Booking",
  "Room Booking",
  "Darbar Booking",
  "Table Booking",
  "Indoor Games Booking",
  "Outdoor Games Booking",
] as const;

type BookingType = (typeof BOOKING_TYPES)[number];

type Booking = {
  id: string;
  createdAt: string;
  bookingType: BookingType;
  memberId: string;
  memberName: string;
  eventType: string;
  date: string;
  persons: number;
  phone: string;
  email: string;
};

const dataFile = path.join(process.cwd(), "data", "bookings.json");

async function readBookings(): Promise<Booking[]> {
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeBookings(bookings: Booking[]) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(bookings, null, 2), "utf-8");
}

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

  const booking: Booking = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    bookingType,
    memberId: String(memberId),
    memberName: String(memberName),
    eventType: String(eventType),
    date: String(date),
    persons: Number(persons),
    phone: String(phone),
    email: String(email),
  };

  try {
    const existing = await readBookings();
    existing.push(booking);
    await writeBookings(existing);
    return NextResponse.json({ ok: true, id: booking.id });
  } catch (err) {
    console.error("Failed to save booking", err);
    return NextResponse.json(
      {
        error:
          "Could not save booking. On Vercel production, the filesystem is read-only — switch this to Vercel Blob or email before deploying.",
      },
      { status: 500 }
    );
  }
}

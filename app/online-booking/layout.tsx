import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Booking",
  description:
    "Reserve banquet halls, rooms, the Darbar hall, restaurant tables, indoor games, or outdoor games at TCCC. Our team will get back to you shortly to confirm.",
  openGraph: {
    title: "Online Booking | TCCC",
    description:
      "Book your venue, table, room, or game slot online — TCCC team responds quickly to confirm.",
  },
};

export default function OnlineBookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

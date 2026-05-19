import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Booking",
  description:
    "Reserve banquet halls, rooms, the Darbar hall, restaurant tables, indoor games, or outdoor games at TCC. Our team will get back to you shortly to confirm.",
  openGraph: {
    title: "Online Booking | TCC",
    description:
      "Book your venue, table, room, or game slot online — TCC team responds quickly to confirm.",
  },
};

export default function OnlineBookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SportsBook | Sports Field Management",
  description:
    "A sports field management system for venue owners and renters to manage listings, availability, and bookings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

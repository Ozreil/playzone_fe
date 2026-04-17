import type { Metadata } from "next";
import { Almarai } from "next/font/google";
import "./globals.css";

const almarai = Almarai({
  display: "swap",
  subsets: ["arabic", "latin"],
  variable: "--font-almarai",
  weight: ["300", "400", "700", "800"],
});

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
    <html lang="en" className={`h-full antialiased ${almarai.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

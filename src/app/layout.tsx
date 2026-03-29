import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Balance with Haidy",
  description: "Art Therapy, Coaching, Wellness and Personal Growth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

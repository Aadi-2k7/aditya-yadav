import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solar & Wind Deployment Intelligence",
  description:
    "AI-powered platform for identifying optimal solar and wind deployment sites.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

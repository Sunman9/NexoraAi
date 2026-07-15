import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXORA AI | The Operating System for Intelligent Real Estate",
  description:
    "NEXORA AI protects every lead, predicts every opportunity, and transforms every real estate transaction.",
  metadataBase: new URL("https://nexora.ai"),
  openGraph: {
    title: "NEXORA AI | Real Estate Intelligence Cloud",
    description:
      "An enterprise intelligence platform for secure, intelligent, autonomous real estate operations.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

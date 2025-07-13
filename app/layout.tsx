import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Posa Xrosto - Bill Splitter",
  description:
    "Easily calculate who owes what when sharing plates at a restaurant",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Posa Xrosto",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Posa Xrosto",
    title: "Posa Xrosto - Bill Splitter",
    description:
      "Easily calculate who owes what when sharing plates at a restaurant",
  },
  twitter: {
    card: "summary",
    title: "Posa Xrosto - Bill Splitter",
    description:
      "Easily calculate who owes what when sharing plates at a restaurant",
  },
  generator: "v0.dev",
};

export const viewport: Viewport = {
  themeColor: "#6a7fdb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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

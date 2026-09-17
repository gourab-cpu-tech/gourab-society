import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gourab-society.vercel.app"),
  other: {
    "google-site-verification": "gH3dHCwI6O-2IRNQjntTieVZrqb7_tf6vPd9kqUb0kk",
  },
  title: {
    default: "Gourab Society | Built for Warriors",
    template: "%s | Gourab Society",
  },
  description:
    "Gourab Society helps Warriors build a stronger mind, body, and presence through practical knowledge and guidance.",
  keywords: [
    "Gourab Society",
    "fitness",
    "self improvement",
    "confidence",
    "personal growth",
    "men's lifestyle",
  ],
  authors: [{ name: "Gourab Society" }],
  creator: "Gourab Society",
  openGraph: {
    title: "Gourab Society | Built for Warriors",
    description:
      "Build a stronger mind, body, and presence with Gourab Society.",
    siteName: "Gourab Society",
    locale: "en_US",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gourab Society | Built for Warriors",
    description:
      "Build a stronger mind, body, and presence with Gourab Society.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

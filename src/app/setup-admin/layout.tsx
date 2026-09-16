import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Admin Setup",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function SetupAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

import type { Metadata } from "next";
import "@fontsource/tajawal/400.css";
import "@fontsource/tajawal/500.css";
import "@fontsource/tajawal/700.css";
import "@fontsource/tajawal/800.css";
import "../globals.css";

export const metadata: Metadata = {
  title: "لوحة التحكم — Aysel Agency",
  robots: { index: false, follow: false },
  icons: { icon: "/icon.svg" },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  );
}

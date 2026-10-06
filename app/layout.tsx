import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sheila & Loïc Wedding Hub",
  description: "Site de mariage Sheila & Loïc — 02 & 03 Avril 2027",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PD Lite",
  description: "A modern application with green and gray theme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}


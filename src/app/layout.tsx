import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "fomantic-ui-css/semantic.min.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "the deep forest",
  description: "A game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

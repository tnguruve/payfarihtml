import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PayFari — One multi-currency account",
  description: "Join the PayFari waitlist. One account, multiple currencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

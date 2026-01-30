import type { Metadata } from "next";
import Script from "next/script";
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
        <Script
          src="https://payfari.kit.com/c7cd56d887/index.js"
          data-uid="c7cd56d887"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

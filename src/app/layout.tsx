import type { Metadata } from "next";
import "./globals.css";

const baseUrl = "https://waitlist.payfari.com";

export const metadata: Metadata = {
  title: "PayFari — One multi-currency account",
  description: "Join the PayFari waitlist. One account, multiple currencies.",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "PayFari — One multi-currency account",
    description: "Join the PayFari waitlist. One account, multiple currencies.",
    url: baseUrl,
    siteName: "PayFari",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PayFari — One multi-currency account",
    description: "Join the PayFari waitlist. One account, multiple currencies.",
  },
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

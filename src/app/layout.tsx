import type { Metadata } from "next";
import "./globals.css";

const baseUrl = "https://waitlist.payfari.com";

export const metadata: Metadata = {
  title: "PayFari — One multi-currency account",
  description: "Join the PayFari waitlist. One account, multiple currencies.",
  icons: {
    icon: "/services/images/Logo.png",
    apple: "/services/images/Logo.png",
  },
  openGraph: {
    title: "PayFari — One multi-currency account",
    description: "Join the PayFari waitlist. One account, multiple currencies.",
    url: baseUrl,
    siteName: "PayFari",
    images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630, alt: "PayFari" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PayFari — One multi-currency account",
    description: "Join the PayFari waitlist. One account, multiple currencies.",
    images: [`${baseUrl}/opengraph-image`],
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

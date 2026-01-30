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
    images: [{ url: `${baseUrl}/services/images/Logo.png`, width: 512, height: 512, alt: "PayFari" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "PayFari — One multi-currency account",
    description: "Join the PayFari waitlist. One account, multiple currencies.",
    images: ["/services/images/Logo.png"],
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

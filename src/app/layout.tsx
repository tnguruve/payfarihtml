import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "PayFari Waitlist | One Multi-Currency Account for Global Payments",
  description:
    "Join the PayFari waitlist and access localized global payments with USD, EUR, and USDC accounts and international prepaid debit cards.",
  metadataBase: new URL("https://waitlist.payfari.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PayFari Waitlist | One Multi-Currency Account for Global Payments",
    description: "Join the PayFari waitlist and access localized global payments with USD, EUR, and USDC accounts and international prepaid debit cards.",
    url: "https://payfari.com",
    siteName: "PayFari",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PayFari Waitlist | One Multi-Currency Account for Global Payments",
    description: "Join the PayFari waitlist and access localized global payments with USD, EUR, and USDC accounts and international prepaid debit cards.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}

"use client";

import Image from "next/image";
import Script from "next/script";
import { useState } from "react";

/* Placeholder icons for service cards - replace with real assets when available */
const ServiceIcons = {
  wallet: (
    <svg className="h-10 w-10 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M16 14h.01"/></svg>
  ),
  card: (
    <svg className="h-10 w-10 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 10h20"/></svg>
  ),
  cart: (
    <svg className="h-10 w-10 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
  ),
  link: (
    <svg className="h-10 w-10 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
  ),
  invoice: (
    <svg className="h-10 w-10 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
  ),
  payroll: (
    <svg className="h-10 w-10 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  bank: (
    <svg className="h-10 w-10 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M3 10h18"/><path d="M5 6l7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/><path d="M8 14v3"/><path d="M12 14v3"/><path d="M16 14v3"/></svg>
  ),
  repeat: (
    <svg className="h-10 w-10 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
  ),
  mobile: (
    <svg className="h-10 w-10 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>
  ),
};

/* Optional image: add image: "/services/your-file.png" when you export from Figma. Put files in public/services/ */
function ServiceCardMedia({
  service,
}: {
  service: { title: string; icon: keyof typeof ServiceIcons; image?: string };
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const useImage = service.image && !imgFailed;
  return (
    <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-[var(--radius)] bg-[var(--grey-100)]">
      {useImage ? (
        <Image
          src={service.image!}
          alt={service.title}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          {ServiceIcons[service.icon]}
        </div>
      )}
    </div>
  );
}

const SERVICES: Array<{ title: string; description: string; icon: keyof typeof ServiceIcons; image?: string }> = [
  { title: "Global accounts", description: "Hold and manage USD, EUR, and USDC balances from a PayFari account.", icon: "wallet", image: "/services/images/Global%20Account.png" },
  { title: "International prepaid cards", description: "Create virtual or physical debit cards for online and in-store spending.", icon: "card", image: "/services/images/International%20prepaid%20cards.png" },
  { title: "Checkout", description: "Accept online payments directly on your eCommerce website or app.", icon: "cart", image: "/services/images/Checkout.png" },
  { title: "Payment links", description: "Get paid on WhatsApp, email, SMS using shareable payment links.", icon: "link", image: "/services/images/Payment%20links.png" },
  { title: "Invoicing", description: "Send professional invoices and track payment status in real time.", icon: "invoice", image: "/services/images/Invoicing.png" },
  { title: "Payroll", description: "Schedule bulk payments to employees and contractors.", icon: "payroll", image: "/services/images/Payroll.png" },
  { title: "Bank transfers", description: "Send and receive bank transfers locally and internationally.", icon: "bank", image: "/services/images/Bank%20transfer.png" },
  { title: "Subscriptions", description: "Automate recurring payments for your SaaS business or memberships.", icon: "repeat", image: "/services/images/Subscriptions.png" },
  { title: "Local payments", description: "Send and receive payments via local banks and mobile money.", icon: "mobile", image: "/services/images/Local%20payments.png" },
];

function scrollToWaitlist(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  return (
    <div className="min-h-screen bg-grid-pattern text-[var(--foreground)]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex shrink-0 items-center">
            <Image
              src="/services/images/Logo.png"
              alt="PayFari"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          </a>
          <span className="rounded-full bg-[var(--primary)] px-4 py-1.5 text-sm font-medium text-[var(--primary-foreground)]">
            Launching in April 2026
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-28 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl lg:text-6xl">
            One multi-currency account for Global Payments and local spending
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--gray-600)] sm:text-xl">
            Open USD, EUR, or USDC accounts, spend with an international prepaid debit card, and get paid online using PayFari&apos;s billing tools.
          </p>

          {/* Waitlist form – styled to match PayFari */}
          <div id="waitlist" className="mt-10 max-w-2xl scroll-mt-[5.5rem]">
            <Script src="https://f.convertkit.com/ckjs/ck.5.js" strategy="afterInteractive" />
            <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--background-card)] shadow-sm">
              <form
                action="https://app.kit.com/forms/8974776/subscriptions"
                className="seva-form formkit-form waitlist-form"
                method="post"
                data-sv-form="8974776"
                data-uid="c7cd56d887"
                data-format="inline"
                data-version="5"
                data-options={JSON.stringify({
                  settings: {
                    after_subscribe: { action: "message", success_message: "Success! Now check your email to confirm your subscription.", redirect_url: "" },
                    analytics: { google: null, fathom: null, facebook: null, segment: null, pinterest: null, sparkloop: null, googletagmanager: null },
                    modal: { trigger: "timer", scroll_percentage: null, timer: 5, devices: "all", show_once_every: 15 },
                    powered_by: { show: true, url: "https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic" },
                    recaptcha: { enabled: false },
                    return_visitor: { action: "show", custom_content: "" },
                    slide_in: { display_in: "bottom_right", trigger: "timer", scroll_percentage: null, timer: 5, devices: "all", show_once_every: 15 },
                    sticky_bar: { display_in: "top", trigger: "timer", scroll_percentage: null, timer: 5, devices: "all", show_once_every: 15 },
                  },
                  version: "5",
                })}
                {...{ "data-min-width": "400 500 600 700 800" }}
              >
                <div data-style="clean" className="p-6 sm:p-8">
                  <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert" />
                  <div data-element="fields" data-stacked="false" className="seva-fields formkit-fields">
                    <div className="formkit-field">
                      <input
                        className="formkit-input"
                        aria-label="First and Last Name"
                        name="fields[first_name]"
                        placeholder="First and Last Name"
                        type="text"
                      />
                    </div>
                    <div className="formkit-field">
                      <input
                        className="formkit-input"
                        name="email_address"
                        aria-label="Email Address"
                        placeholder="Email address"
                        required
                        type="email"
                      />
                    </div>
                    <button data-element="submit" className="formkit-submit" type="submit">
                      <div className="formkit-spinner">
                        <div />
                        <div />
                        <div />
                      </div>
                      <span>Join Waitlist</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Gradient fade - grid becomes more solid toward services section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--background)]" />
      </section>

      {/* Services */}
      <section className="relative border-t border-[var(--border)] bg-[var(--grey-100)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
            Everything you need to get paid and spend globally
          </h2>
          <p className="mt-3 text-lg text-[var(--gray-600)]">
            With PayFari every payment is local
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--background-card)] p-6 shadow-sm"
              >
                <ServiceCardMedia service={service} />
                <h3 className="font-semibold text-[var(--foreground)]">{service.title}</h3>
                <p className="mt-2 text-[var(--gray-600)]">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[var(--primary)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-[var(--primary-foreground)]/90">
            Get notified first when we launch
          </p>
          <h2 className="mt-2 text-2xl font-bold leading-tight text-[var(--primary-foreground)] sm:text-3xl md:text-4xl">
            PayFari Is Bringing Back The Global In Payments For Everyone
          </h2>
          <a
            href="#waitlist"
            onClick={scrollToWaitlist}
            className="mt-8 inline-block min-h-[48px] min-w-[44px] rounded-[var(--radius)] border-2 border-white bg-white px-8 py-3 font-semibold text-[var(--primary)] shadow-sm transition-opacity hover:opacity-90"
            aria-label="Scroll to join the waitlist form"
          >
            Join the waitlist
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <a href="/" className="flex items-center">
            <Image
              src="/services/images/Logo.png"
              alt="PayFari"
              width={100}
              height={28}
              className="h-7 w-auto object-contain"
            />
          </a>
          <p className="mt-2 text-sm text-[var(--gray-600)]">
            Multi-currency accounts for global spending & local payments
          </p>
        </div>
      </footer>
    </div>
  );
}

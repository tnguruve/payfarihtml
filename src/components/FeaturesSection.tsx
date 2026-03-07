import Image from "next/image";

/* ─── Feature card data ─── */
const features = [
    {
        id: "global-accounts",
        title: "Global accounts",
        description: "Hold and manage USD, EUR, and USDC balances from a PayFari account.",
        image: "/global accounts.png",
    },
    {
        id: "prepaid-cards",
        title: "International prepaid cards",
        description: "Create virtual or physical debit cards for online and in-store spending.",
        image: "/internatinal prepaid cards.png",
    },
    {
        id: "checkout",
        title: "Checkout",
        description: "Accept online payments directly on your eCommerce website or app.",
        image: "/checkout.png",
    },
    {
        id: "payment-links",
        title: "Payment links",
        description: "Get paid on WhatsApp, email, SMS using shareable payment links.",
        image: "/payment links.png",
    },
    {
        id: "invoicing",
        title: "Invoicing",
        description: "Send professional invoices and track payment status in real time.",
        image: "/invoicing.png",
    },
    {
        id: "payroll",
        title: "Payroll",
        description: "Schedule bulk payments to employees and contractors.",
        image: "/payroll.png",
    },
    {
        id: "bank-transfers",
        title: "Bank transfers",
        description: "Send and receive bank transfers locally and internationally.",
        image: "/bank transfers.png",
    },
    {
        id: "subscriptions",
        title: "Subscriptions",
        description: "Automate recurring payments for your SaaS business or memberships.",
        image: "/subscriptions.png",
    },
    {
        id: "local-payments",
        title: "Local payments",
        description: "Send and receive payments via local banks and mobile money.",
        image: "/local payments.png",
    },
];

function FeatureCardMockup({ feature }: { feature: (typeof features)[number] }) {
    const imageSrc = feature.image;
    if (!imageSrc) return null;

    return (
        <div className="hifi-mockup-container">
            <Image
                src={imageSrc}
                alt={feature.title || "Feature mockup"}
                width={720}
                height={336}
                sizes="(max-width: 768px) 100vw, 400px"
                className="mockup-image"
                quality={100}
                unoptimized={true}
                style={{ width: "100%", height: "auto" }}
            />
        </div>
    );
}

export default function FeaturesSection() {
    return (
        <section className="features-section">
            <div className="container">
                <div className="features-heading">
                    <div className="text-4xl md:text-5xl font-bold">Everything you need to get <br />paid and spend globally</div>
                    <div className="text-lg md:text-xl">With PayFari every payment is local</div>
                </div>

                <div className="features-grid">
                    {features.map((feature) => (
                        <div className="feature-card" key={feature.id}>
                            <div style={{ flex: 1, minHeight: 0 }}>
                                <FeatureCardMockup feature={feature} />
                            </div>
                            <div style={{ padding: "0 8px" }}>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

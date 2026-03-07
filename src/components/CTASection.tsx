"use client";

export default function CTASection() {
    return (
        <div className="container">
            <section className="cta-section">
                <p className="cta-eyebrow">
                    <span className="cta-eyebrow-line" aria-hidden="true" />
                    Get notified first when we launch
                    <span className="cta-eyebrow-line" aria-hidden="true" />
                </p>
                <h2>
                    PayFari is bringing back
                    <br />
                    the global in payments
                    <br />
                    for everyone
                </h2>
                <button
                    type="button"
                    className="btn-white-pill"
                    id="cta-join-waitlist-btn"
                    onClick={() => {
                        document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });
                        document.getElementById('waitlist-email')?.focus();
                    }}
                >
                    Join the waitlist
                </button>
            </section>
        </div>
    );
}

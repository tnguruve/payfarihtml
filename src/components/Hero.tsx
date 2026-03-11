"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function Hero() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            });

            if (res.ok) {
                setStatus("success");
                setName("");
                setEmail("");
            } else {
                const data = await res.json();
                toast.error(data.error || "Something went wrong.");
                setStatus("idle");
            }
        } catch {
            toast.error("Failed to connect. Please try again.");
            setStatus("idle");
        }
    }

    return (
        <section className="hero" id="hero-section">
            <div className="container flex flex-col items-center gap-11">
                <div className="flex flex-col items-center gap-6 text-center w-full">
                    <h1>
                        One multi-currency{'\n'}account for global payments and local spending
                    </h1>
                    <p>
                        Open USD, EUR, or USDC accounts, spend with an international prepaid debit card, and get paid online using PayFari&apos;s billing tools.
                    </p>
                </div>

                {status === "success" ? (
                    <div className="w-full flex justify-center px-4">
  <div className="bg-green-100 text-green-800 p-6 rounded-2xl text-center w-full max-w-md animate-in fade-in zoom-in duration-300">
    <h3 className="text-xl font-bold mb-2">You&apos;re on the list! 🎉</h3>
    <p>We&apos;ll notify you as soon as we launch.</p>
    <button 
      onClick={() => setStatus("idle")} 
      className="text-sm underline mt-4 opacity-70 hover:opacity-100"
    >
      Add another email
    </button>
  </div>
</div>
                ) : (
                    <>
                        <form
                            className="waitlist-form"
                            onSubmit={handleSubmit}
                            aria-label="Join the waitlist"
                        >
                            <input
                                id="waitlist-name"
                                type="text"
                                placeholder="Full name"
                                aria-label="Full name"
                                required
                                minLength={2}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={status === "loading"}
                            />
                            <input
                                id="waitlist-email"
                                type="email"
                                placeholder="Email address"
                                aria-label="Email address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === "loading"}
                            />
                            <button
                                type="submit"
                                className="btn-orange disabled:opacity-50"
                                id="join-waitlist-btn"
                                disabled={status === "loading"}
                            >
                                {status === "loading" ? "Joining..." : "Join the waitlist"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </section>
    );
}

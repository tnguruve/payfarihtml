import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const KIT_API_KEY = process.env.WAITLIST_KIT_API_KEY;
const KIT_FORM_ID = process.env.WAITLIST_KIT_FORM_ID || "8974776";

// Lazily initialize the rate limiter to prevent build-time crashes if ENV vars are missing in CI
let ratelimit: Ratelimit | null = null;

export async function POST(request: NextRequest) {
    // 1. Rate Limiting Guard
    try {
        if (!ratelimit) {
            ratelimit = new Ratelimit({
                redis: Redis.fromEnv(),
                limiter: Ratelimit.slidingWindow(3, "24 h"),
                analytics: true,
                prefix: "@upstash/ratelimit",
            });
        }
        
        const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
        const { success, limit, reset, remaining } = await ratelimit.limit(ip);

        if (!success) {
            return NextResponse.json(
                { error: "Too many requests. Please try again in 24 hours." },
                { 
                    status: 429,
                    headers: {
                        "X-RateLimit-Limit": limit.toString(),
                        "X-RateLimit-Remaining": remaining.toString(),
                        "X-RateLimit-Reset": reset.toString(),
                    }
                }
            );
        }
    } catch (error) {
        console.warn("Rate limit check bypassed or failed (likely missing env vars):", error);
        // If Redis throws because of missing env vars, optionally fail open or close.
        // Failing open allows signups if the Upstash config is missing.
    }

    if (!KIT_API_KEY) {
        return NextResponse.json(
            { error: "Waitlist not configured. Add WAITLIST_KIT_API_KEY in Vercel Environment Variables." },
            { status: 500 }
        );
    }

    try {
        const body = await request.json();
        const { name, email } = body;
        const trimmedEmail = email?.trim() || "";
        const trimmedName = name?.trim() || "";

        console.log("Waitlist submission attempt:", { name: trimmedName, email: trimmedEmail, formId: KIT_FORM_ID });

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
            return NextResponse.json(
                { error: "Please provide a valid email address" },
                { status: 400 }
            );
        }

        if (!trimmedName || trimmedName.length < 2) {
            return NextResponse.json(
                { error: "Please provide your full name" },
                { status: 400 }
            );
        }

        // Kit API v4: Step 1 - Create or update the subscriber
        const subscriberUrl = "https://api.kit.com/v4/subscribers";
        console.log("Creating/Updating subscriber in Kit...");
        const subRes = await fetch(subscriberUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Kit-Api-Key": KIT_API_KEY,
            },
            body: JSON.stringify({
                email_address: trimmedEmail,
                first_name: trimmedName,
            }),
        });

        const subData = await subRes.json().catch(() => ({}));
        
        if (!subRes.ok || !subData.subscriber?.id) {
            console.error("Kit Subscriber API error:", { status: subRes.status, subData });
            return NextResponse.json(
                { error: subData.message || "Failed to create subscriber in Kit" },
                { status: subRes.status }
            );
        }

        const subscriberId = subData.subscriber.id;
        console.log("Subscriber ID obtained:", subscriberId);

        // Kit API v4: Step 2 - Add subscriber to form
        const formUrl = `https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers/${subscriberId}`;
        console.log("Adding subscriber to form:", formUrl);

        const formRes = await fetch(formUrl, {
            method: "POST",
            headers: {
                "X-Kit-Api-Key": KIT_API_KEY,
            },
        });

        const formData = await formRes.json().catch(() => ({}));

        if (formRes.ok) {
            console.log("Waitlist submission successful");
            return NextResponse.json({ success: true });
        }

        console.error("Kit Form API error:", { status: formRes.status, formData });
        return NextResponse.json(
            { error: formData.message || "Could not add you to the waitlist form." },
            { status: 502 }
        );
    } catch (err) {
        console.error("Waitlist submit exception:", err);
        return NextResponse.json(
            { error: "Internal server error during waitlist submission." },
            { status: 500 }
        );
    }
}
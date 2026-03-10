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
        
        // x-real-ip is set by Vercel and is more reliable than x-forwarded-for
        const ip = request.headers.get("x-real-ip") ?? 
                   request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? 
                   "127.0.0.1";
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
        // High-severity log for observability/alerting
        console.error("[CRITICAL] Rate limiter failed or bypassed (Redis unavailable or missing env vars):", error);
        
        // Fail closed for security - reject requests when rate limiting is unavailable
        return NextResponse.json(
            { error: "Service temporarily unavailable. Please try again later." },
            { status: 503 }
        );
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

        // Kit API v3: Subscribe to form in one step
        // This matches the endpoint provided: https://api.convertkit.com/v3/forms/[FORM_ID]/subscribe
        const kitUrl = `https://api.kit.com/v3/forms/${KIT_FORM_ID}/subscribe`;
        
        console.log("Subscribing to Kit form (v3)...");
        const kitRes = await fetch(kitUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                api_key: KIT_API_KEY, // Kit v3 usually takes the public API key in the body
                email: trimmedEmail,
                first_name: trimmedName,
            }),
        });

        const kitData = await kitRes.json().catch(() => ({}));

        if (kitRes.ok) {
            console.log("Waitlist submission successful");
            return NextResponse.json({ success: true });
        }

        console.error("Kit API v3 error:", { status: kitRes.status, kitData });
        return NextResponse.json(
            { error: kitData.message || "Could not add you to the waitlist. Please check your credentials." },
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
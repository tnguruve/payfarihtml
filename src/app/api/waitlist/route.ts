import { NextRequest, NextResponse } from "next/server";

const KIT_API_KEY = process.env.WAITLIST_KIT_API_KEY;
const KIT_FORM_ID = process.env.WAITLIST_KIT_FORM_ID || "8974776";

export async function POST(request: NextRequest) {
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
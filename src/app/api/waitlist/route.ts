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

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Kit API v4: add subscriber to form by email – this actually creates the subscriber
    const res = await fetch(`https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": KIT_API_KEY,
      },
      body: JSON.stringify({
        email_address: email.trim(),
        first_name: name && typeof name === "string" && name.trim() ? name.trim() : undefined,
      }),
    });

    const data = await res.json().catch(() => ({}));

    // 200 = already on form, 201 = newly added
    if (res.ok && (res.status === 200 || res.status === 201)) {
      return NextResponse.json({ success: true });
    }

    console.error("Kit API error:", res.status, data);
    return NextResponse.json(
      { error: "Could not add you to the waitlist. Please try again." },
      { status: 502 }
    );
  } catch (err) {
    console.error("Waitlist submit error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

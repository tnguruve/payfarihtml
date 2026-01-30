import { NextRequest, NextResponse } from "next/server";

const WAITLIST_FORM_URL = process.env.WAITLIST_FORM_URL;

export async function POST(request: NextRequest) {
  if (!WAITLIST_FORM_URL) {
    return NextResponse.json(
      { error: "Waitlist form URL not configured. Add WAITLIST_FORM_URL to .env.local" },
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

    // Most kit/form services accept form-urlencoded with email + name/first_name
    const formData = new URLSearchParams();
    formData.append("email", email.trim());
    if (name && typeof name === "string" && name.trim()) {
      formData.append("name", name.trim());
      formData.append("first_name", name.trim()); // some services expect first_name
    }

    const res = await fetch(WAITLIST_FORM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Waitlist provider error:", res.status, text);
      return NextResponse.json(
        { error: "Could not add you to the waitlist. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist submit error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

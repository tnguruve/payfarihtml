import { ImageResponse } from "next/og";

export const alt = "PayFari – One Multi-Currency Account for Global Payments";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-2px",
            marginBottom: 16,
          }}
        >
          PayFari
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a0aec0",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          One Multi-Currency Account for Global Payments
        </div>
        <div
          style={{
            marginTop: 40,
            padding: "12px 32px",
            background: "linear-gradient(90deg, #6c63ff, #4ecdc4)",
            borderRadius: 50,
            fontSize: 20,
            color: "#ffffff",
            fontWeight: 600,
          }}
        >
          Join the Waitlist
        </div>
      </div>
    ),
    { ...size }
  );
}
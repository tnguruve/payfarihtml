import { ImageResponse } from "next/og";

export const alt = "PayFari";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f97616",
        }}
      >
        <span
          style={{
            fontSize: 480,
            fontWeight: 700,
            color: "white",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          P
        </span>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

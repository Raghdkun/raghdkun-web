import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#070b1a",
          border: "6px solid rgba(96,179,255,0.7)",
          borderRadius: 36,
          color: "#60b3ff",
          fontSize: 84,
          fontWeight: 800,
          letterSpacing: 2,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        RK
      </div>
    ),
    { ...size },
  );
}

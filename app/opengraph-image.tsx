import { ImageResponse } from "next/og";

export const alt = "Raghdkun — Fullstack Developer · React, Next.js, Laravel, Flutter, AI workflows";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#070b1a";
const PANEL = "#0c1424";
const BLUE = "#60b3ff";
const TEXT = "#eef2fb";

function Corner({ style }: { style: React.CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 56,
        height: 56,
        borderColor: BLUE,
        borderStyle: "solid",
        borderWidth: 0,
        opacity: 0.8,
        ...style,
      }}
    />
  );
}

export default function OpenGraphImage() {
  const chips = ["NEXT.JS", "REACT", "LARAVEL", "FLUTTER", "n8n · DIFY"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // Satori needs the long-hand properties; the `background` shorthand with a colour is rejected.
          backgroundColor: NAVY,
          backgroundImage: "radial-gradient(ellipse at 50% -20%, rgba(96,179,255,0.18), transparent 55%)",
          color: TEXT,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          padding: 72,
          position: "relative",
        }}
      >
        <Corner style={{ top: 32, left: 32, borderTopWidth: 3, borderLeftWidth: 3 }} />
        <Corner style={{ top: 32, right: 32, borderTopWidth: 3, borderRightWidth: 3 }} />
        <Corner style={{ bottom: 32, left: 32, borderBottomWidth: 3, borderLeftWidth: 3 }} />
        <Corner style={{ bottom: 32, right: 32, borderBottomWidth: 3, borderRightWidth: 3 }} />

        {/* Top rail */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 8,
            color: BLUE,
            textTransform: "uppercase",
          }}
        >
          <span>UPLINK // 00.HERO</span>
          <span>STATUS — OPERATIONAL</span>
        </div>

        {/* Name + role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 132,
              fontWeight: 800,
              letterSpacing: 6,
              lineHeight: 0.95,
              textTransform: "uppercase",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            RAGHDKUN
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: 4,
              color: BLUE,
              textTransform: "uppercase",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {"// FULLSTACK DEVELOPER"}
          </div>
        </div>

        {/* Chips + location */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {chips.map((c) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  border: `1.5px solid rgba(96,179,255,0.45)`,
                  background: PANEL,
                  borderRadius: 6,
                  fontSize: 20,
                  letterSpacing: 4,
                  color: TEXT,
                }}
              >
                {c}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "rgba(238,242,251,0.65)" }}>
            AS SUWAYDA · SYRIA · REMOTE
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

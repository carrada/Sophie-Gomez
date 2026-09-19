import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sophie Gomez — Actrice & Modèle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Open Graph con paleta Stone Soft (gris clarito). */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px",
          background: "linear-gradient(165deg, #FAFAF9 0%, #F5F5F4 55%, #E7E5E4 100%)",
          color: "#1C1917",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 400,
            letterSpacing: "-0.01em",
            lineHeight: 1.05,
          }}
        >
          Sophie Gaëlle Gomez
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#4A4A4A",
            fontFamily: "sans-serif",
          }}
        >
          Actrice · Modèle · Silver Presence
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 16,
            letterSpacing: "0.08em",
            color: "#78716C",
            fontFamily: "sans-serif",
          }}
        >
          Mexico · Europe
        </div>
      </div>
    ),
    { ...size },
  );
}

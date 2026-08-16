import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sophie Gomez — Actrice & Modèle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "linear-gradient(160deg, #171717 0%, #0a0a0a 55%, #262626 100%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 600,
            letterSpacing: "0.08em",
            lineHeight: 1,
          }}
        >
          SOPHIE GOMEZ
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#a3a3a3",
          }}
        >
          Actrice · Modèle
        </div>
      </div>
    ),
    { ...size },
  );
}

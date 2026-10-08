import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Addis Eats — Ethiopian food delivery";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px",
        background: "#0A1F3D",
        color: "white",
      }}
    >
      <div style={{ fontSize: 96, fontWeight: 700 }}>Addis Eats</div>
      <div style={{ fontSize: 40, marginTop: 20 }}>
        Ethiopian food, delivered across Addis Ababa
      </div>
    </div>,
    size,
  );
}

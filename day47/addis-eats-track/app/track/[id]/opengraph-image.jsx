import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };

export default async function Image({ params }) {
  const { id } = await params;
  return new ImageResponse(
    <div
      style={{
        fontSize: 72,
        background: "#0A1F3D",
        color: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Order {id} · Addis Eats
    </div>,
    size,
  );
}

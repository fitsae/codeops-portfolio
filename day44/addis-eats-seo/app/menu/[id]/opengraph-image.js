import { ImageResponse } from "next/og";
import { getDishBySlug } from "@/lib/dishes";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = await params;
  const dish = getDishBySlug(id);

  const name = dish?.name ?? "Addis Eats";
  const price = dish ? `${dish.price} ETB` : "";

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
      <div style={{ fontSize: 80, fontWeight: 700 }}>{name}</div>
      <div style={{ fontSize: 48, marginTop: 20, color: "#fbbf24" }}>
        {price}
      </div>
      <div style={{ fontSize: 32, marginTop: 40, color: "#cbd5e1" }}>
        Addis Eats
      </div>
    </div>,
    size,
  );
}

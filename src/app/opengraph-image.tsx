import { ImageResponse } from "next/og";

export const alt = "Gourab Society | Built for Warriors";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #07111f 0%, #0b2747 58%, #12345d 100%)",
          color: "#f5f9ff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              width: "78px",
              height: "78px",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #b8dcff",
              borderRadius: "20px",
              background: "rgba(114, 183, 255, 0.22)",
              color: "#b8dcff",
              fontSize: "25px",
              fontWeight: 800,
              letterSpacing: "2px",
            }}
          >
            GS
          </div>
          <div style={{ fontSize: "28px", fontWeight: 700 }}>
            Gourab Society
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              color: "#b8dcff",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "5px",
            }}
          >
            BUILT FOR WARRIORS
          </div>
          <div
            style={{
              maxWidth: "850px",
              fontSize: "74px",
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: "-4px",
            }}
          >
            Become hard to replace.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
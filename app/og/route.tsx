import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#030303",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 72,
          fontWeight: 700,
        }}
      >
        UiCode.site
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
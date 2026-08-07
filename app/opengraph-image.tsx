import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** One pixel of the campfire, sized to a 16px grid. */
function Px({ x, y, w = 1, h = 1, fill }: { x: number; y: number; w?: number; h?: number; fill: string }) {
  const U = 14;
  return (
    <div
      style={{
        position: "absolute",
        left: x * U,
        top: y * U,
        width: w * U,
        height: h * U,
        backgroundColor: fill,
      }}
    />
  );
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#0b0b0c",
          color: "#ededec",
          padding: 72,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#6b6b68",
              display: "flex",
            }}
          >
            {site.role}
          </div>

          <div style={{ fontSize: 68, fontWeight: 600, marginTop: 18, letterSpacing: -2, display: "flex" }}>
            {site.name}
          </div>

          <div
            style={{
              fontSize: 32,
              lineHeight: 1.35,
              marginTop: 26,
              color: "#9a9a97",
              maxWidth: 640,
              display: "flex",
            }}
          >
            {site.headline}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 40 }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#d98a3d" }} />
            <div style={{ fontSize: 24, color: "#9a9a97", display: "flex" }}>{site.current}</div>
          </div>
        </div>

        {/* Campfire, drawn pixel by pixel so the OG card matches the site.
            Bands are painted outer -> mid -> hot, each inset by one pixel, so
            the flame stays solid with no gaps showing through. */}
        <div style={{ position: "relative", width: 320, height: 400, display: "flex" }}>
          {/* outer */}
          <Px x={7} y={3} w={1} h={1} fill="#a84d1c" />
          <Px x={6} y={4} w={3} h={2} fill="#a84d1c" />
          <Px x={5} y={6} w={5} h={2} fill="#a84d1c" />
          <Px x={4} y={8} w={7} h={5} fill="#a84d1c" />
          {/* mid */}
          <Px x={7} y={4} w={1} h={2} fill="#d8822f" />
          <Px x={6} y={6} w={3} h={2} fill="#d8822f" />
          <Px x={5} y={8} w={5} h={4} fill="#d8822f" />
          {/* hot core */}
          <Px x={7} y={7} w={1} h={1} fill="#f2c85c" />
          <Px x={6} y={8} w={3} h={3} fill="#f2c85c" />
          {/* logs and stones */}
          <Px x={2} y={13} w={11} h={2} fill="#5c4230" />
          <Px x={3} y={15} w={9} h={1} fill="#3f2e1e" />
          <Px x={1} y={17} w={2} h={1} fill="#43434d" />
          <Px x={4} y={17} w={2} h={1} fill="#43434d" />
          <Px x={7} y={17} w={2} h={1} fill="#43434d" />
          <Px x={10} y={17} w={2} h={1} fill="#43434d" />
          <Px x={13} y={17} w={2} h={1} fill="#43434d" />
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: 6,
            backgroundColor: "#d98a3d",
            display: "flex",
          }}
        />
      </div>
    ),
    size,
  );
}

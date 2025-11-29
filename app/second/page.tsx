"use client";

export default function SecondPage() {
  // Sample thumbnails and their names (replace with your actual images/names)
  const thumbnails = [
  { src: "/thumb1.jpg", name: "Jamdhani" },  // Product 1
  { src: "/thumb2.jpg", name: "Kanchi Pattu" },
  { src: "/thumb3.jpg", name: "Narayanpet" },
  { src: "/thumb4.jpg", name: "Pochampally" },
  { src: "/thumb5.jpg", name: "Gadwal" },
  { src: "/thumb6.jpg", name: "Venkatagiri" },
  { src: "/thumb7.jpg", name: "Kotha" },
  { src: "/thumb8.jpg", name: "Fancy" },
  { src: "/thumb9.jpg", name: "Viscos" },
  { src: "/thumb11.jpg", name: "Pure Georjet10" },
  { src: "/thumb12.jpg", name: "JimmiChoo" },
  { src: "/thumb13.jpg", name: "Designer Sarees" },
];


  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ffc0cb", // baby pink
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      {/* Thumbnails at the top with names */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "1rem",
          flexWrap: "nowrap",
          overflowX: "auto",
          padding: "0 1rem",
          maxWidth: "95vw",
          borderBottom: "2px solid black",
          paddingBottom: "0.5rem",
        }}
      >
        {thumbnails.map((thumb, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <img
              src={thumb.src}
              alt={thumb.name}
              style={{
                width: "auto",
                height: "auto",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <span style={{ marginTop: "0.3rem", fontSize: "0.9rem", color: "black", textAlign: "center" }}>
              {thumb.name}
            </span>
          </div>
        ))}
      </div>

      {/* Centered Title with wave (~) */}
      <h1 style={{ fontSize: "4rem", color: "black", textAlign: "center" }}>
        Vira{" "}
        <span
          style={{
            display: "inline-block",
            transform: "rotate(-10deg)",
            // animation: "wave 1s infinite alternate", // optional
          }}
        >
          ~
        </span>{" "}
        Weaves
      </h1>

      {/* Optional: Animated wave */}
      <style>
        {`
          @keyframes wave {
            0% { transform: rotate(-15deg); }
            50% { transform: rotate(15deg); }
            100% { transform: rotate(-15deg); }
          }
        `}
      </style>
    </div>
  );
}


"use client";

import Navbar from "./components/Navbar";


export default function SecondPage() {
  const thumbnails = [
    "Jamdhani",
    "Kanchi Pattu",
    "Narayanpet",
    "Pochampally",
    "Gadwal",
    "Venkatagiri",
    "Kotha",
    "Fancy",
    "Viscos",
    "Pure Georgette10",
    "JimmiChoo",
    "Designer Sarees",
  ];

  // Sample saree images (can replace with actual images)
  const sareeImages = [
    "/saree1.jpg",
    "/saree2.jpg",
    "/saree3.jpg",
    "/saree4.jpg",
    "/saree5.jpg",
    "/saree6.jpg",
  ];

  return (
    <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#ffc0cb" }}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div
        style={{
          marginTop: "80px", // spacing below fixed Navbar
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* Page Title */}
        <h1
          style={{
            fontSize: "3rem",
            color: "black",
            textAlign: "center",
            margin: 0,
            padding: 0,
            textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          Vira <span style={{ display: "inline-block", transform: "rotate(-10deg)", textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>~</span>{" "}
          Weaves
        </h1>

        {/* Subtitle */}
        <h2
          style={{
            fontSize: "1.5rem",
            color: "black",
            textAlign: "center",
            marginTop: "8px",
            marginBottom: "40px",
            fontWeight: 400,
            textShadow: "1px 1px 4px rgba(0,0,0,0.2)",
          }}
        >
          Drape Yourself in Perfection
        </h2>

        {/* Top Thumbnails Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "20px",
            width: "100%",
            maxWidth: "1000px",
            marginBottom: "40px",
          }}
        >
          {thumbnails.map((name, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
              }}
            >
              <img
                src={`/thumb${index + 1}.jpg`}
                alt={name}
                style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }}
              />
              <span
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.9rem",
                  color: "black",
                  textAlign: "center",
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* Horizontal Scrollable Saree Row */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            overflowX: "auto",
            paddingBottom: "10px",
            width: "100%",
            maxWidth: "1000px",
          }}
        >
          {sareeImages.map((src, index) => (
            <div
              key={index}
              style={{
                minWidth: "200px",
                flexShrink: 0,
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
              }}
            >
              <img
                src={src}
                alt={`Saree ${index + 1}`}
                style={{ width: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


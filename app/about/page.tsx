"use client";

import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#ffc0cb",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "calc(100vh - 80px)", // adjust if navbar height differs
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            color: "#000",
            marginBottom: "20px",
          }}
        >
          About Vira~Weaves
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            color: "#000",
            maxWidth: "800px",
            lineHeight: "1.8",
          }}
        >
          Welcome to Vira~Weaves, where tradition meets elegance. We bring you
          the finest handwoven sarees and fabrics, crafted with love and care by
          skilled artisans. Each weave tells a story of culture, comfort, and
          timeless style—made to drape you in grace.
        </p>
      </div>
    </div>
  );
}


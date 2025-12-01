"use client";

import Navbar from "../components/Navbar"; // Adjust path if needed

export default function AboutPage() {
  return (
    <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#ffc0cb" }}>
      {/* Navbar */}
      <Navbar />

      {/* Centered Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "calc(100vh - 80px)", // Adjust for navbar height
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ fontSize: "3rem", color: "black", marginBottom: "20px" }}>
          About Vira~Weaves
        </h1>
        <p style={{ fontSize: "1.2rem", color: "black", maxWidth: "800px" }}>
          Welcome to Vira~Weaves, where we bring you the finest handwoven sarees and fabrics.
          Explore our collections and drape yourself in perfection. Each piece is crafted with care
          to give you elegance, style, and comfort.
        </p>
      </div>
    </div>
  );
}


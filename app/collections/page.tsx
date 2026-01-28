"use client";

import Navbar from "../components/Navbar";
import Link from "next/link";

export default function CollectionsPage() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#ffe4e9", // soft pink background
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
          minHeight: "calc(100vh - 80px)",
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
          Our Collections
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            color: "#000",
            maxWidth: "800px",
            lineHeight: "1.8",
            marginBottom: "30px",
          }}
        >
          Discover our curated collections of handwoven sarees and fabrics.
          Each collection reflects timeless tradition, skilled craftsmanship,
          and modern elegance.
        </p>

        {/* Simple Navigation Buttons */}
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <Link href="/category/below-2k">
            <button style={buttonStyle}>Below ₹2K</button>
          </Link>

          <Link href="/category/below-5k">
            <button style={buttonStyle}>Below ₹5K</button>
          </Link>

          <Link href="/category/premium">
            <button style={buttonStyle}>Premium Collection</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: "12px 24px",
  fontSize: "1rem",
  backgroundColor: "#000",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};


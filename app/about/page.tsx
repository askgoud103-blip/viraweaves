"use client";

import Navbar from "../components/Navbar";
import { COLORS } from "@/lib/colors";

export default function AboutPage() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: COLORS.cream,
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
          minHeight: "calc(100vh - 70px)",
          padding: "40px 20px",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontSize: "2.4rem",
            color: COLORS.maroon,
            marginBottom: "20px",
          }}
        >
          About Vira~Weaves
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#333",
            maxWidth: "820px",
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


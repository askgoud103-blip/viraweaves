"use client";

import Navbar from "../components/Navbar";
import Link from "next/link";
import { COLORS } from "@/lib/colors";

// Consistent normalization to match your [slug] folder
const normalize = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replaces spaces with hyphens
    .replace(/-+/g, "-"); // Prevents double hyphens

const collections = [
  "Jamdhani",
  "Kanchi Pattu",
  "Narayanpet",
  "Pochampally",
  "Gadwal",
  "Venkatagiri",
  "Kotha",
  "Fancy",
  "Viscos",
  "Pure Georgette",
  "JimmiChoo",
  "Designer Sarees",
];

export default function CollectionsPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: COLORS.cream || "#fffafb" }}>
      <Navbar />

      {/* HEADER */}
      <section style={{ padding: "120px 20px 40px", textAlign: "center", background: "#fff" }}>
        <h1
          style={{
            fontFamily: "serif",
            fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
            color: COLORS.maroon,
            marginBottom: "10px",
          }}
        >
          Our Collections
        </h1>
        <div style={{ width: "60px", height: "2px", background: COLORS.gold, margin: "10px auto 20px" }}></div>
        <p style={{ color: "#555", maxWidth: "600px", margin: "0 auto", fontSize: "1.1rem" }}>
          Explore timeless Indian weaves curated for every occasion, from heritage silks to modern designer drapes.
        </p>
      </section>

      {/* COLLECTION GRID */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "30px",
          }}
        >
          {collections.map((name, i) => (
            <Link key={i} href={`/category/${normalize(name)}`} style={{ textDecoration: "none" }}>
              <div
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "#fff",
                  border: `1px solid #eee`,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.1)";
                  e.currentTarget.style.borderColor = COLORS.gold;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
                  e.currentTarget.style.borderColor = "#eee";
                }}
              >
                <div style={{ overflow: 'hidden', height: '300px' }}>
                    <img
                    src={`/thumb${i + 1}.jpg`}
                    alt={name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "0.5s" }}
                    />
                </div>

                <div
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    fontWeight: 700,
                    fontFamily: "serif",
                    fontSize: "1.2rem",
                    color: COLORS.maroon,
                    background: "#fff"
                  }}
                >
                  {name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* QUICK FILTERS (Shop by Price) */}
      <section style={{ background: COLORS.maroon, padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "serif", marginBottom: "30px", color: COLORS.gold, fontSize: "2rem" }}>
          Shop by Price
        </h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center", maxWidth: "1000px", margin: "0 auto" }}>
          {[
            { label: "Below ₹2,000", path: "/category/all?maxPrice=2000" },
            { label: "Below ₹5,000", path: "/category/all?maxPrice=5000" },
            { label: "₹10K – ₹15K", path: "/category/all?minPrice=10000&maxPrice=15000" },
            { label: "₹15K – ₹30K", path: "/category/all?minPrice=15000&maxPrice=30000" },
            { label: "₹30K – ₹45K", path: "/category/all?minPrice=30000&maxPrice=45000" },
            { label: "Above ₹45K", path: "/category/all?minPrice=45000" },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.path}
              style={{
                padding: "12px 28px",
                borderRadius: "8px",
                background: "transparent",
                border: `1px solid ${COLORS.gold}`,
                color: COLORS.gold,
                fontWeight: 600,
                textDecoration: "none",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.gold;
                e.currentTarget.style.color = COLORS.maroon;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = COLORS.gold;
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

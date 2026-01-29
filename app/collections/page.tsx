// app/collections/page.tsx

"use client";

import Navbar from "../components/Navbar";
import Link from "next/link";

// same normalizer you already use
const normalize = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s*to\s*/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

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
    <div style={{ minHeight: "100vh", backgroundColor: "#ffc0cb" }}>
      <Navbar />

      {/* HEADER */}
      <section style={{ padding: "120px 20px 40px", textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "serif",
            fontSize: "clamp(2rem, 6vw, 3rem)",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          Our Collections
        </h1>
        <p style={{ color: "#555", maxWidth: "520px", margin: "0 auto" }}>
          Explore timeless Indian weaves curated for every occasion
        </p>
      </section>

      {/* COLLECTION GRID */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px 60px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "22px",
          }}
        >
          {collections.map((name, i) => (
            <Link
              key={i}
              href={`/category/${normalize(name)}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-6px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <img
                  src={`/thumb${i + 1}.jpg`}
                  alt={name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    fontWeight: 700,
                    color: "#333",
                  }}
                >
                  {name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* QUICK FILTERS */}
      <section style={{ background: "#ffe4ec", padding: "40px 20px" }}>
        <h2
          style={{
            textAlign: "center",
            fontFamily: "serif",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          Shop by Price
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            justifyContent: "center",
          }}
        >
          {[
            { label: "Below ₹2,000", path: "/category/all?maxPrice=2000" },
            { label: "Below ₹5,000", path: "/category/all?maxPrice=5000" },
            { label: "₹10K – ₹15K", path: "/category/all?minPrice=10000&maxPrice=15000" },
            { label: "₹15K – ₹30K", path: "/category/all?minPrice=15000&maxPrice=30000" },
            { label: "Above ₹45K", path: "/category/all?minPrice=45000" },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.path}
              style={{
                padding: "14px 22px",
                borderRadius: "30px",
                background: "#ffb6c1",
                color: "#333",
                fontWeight: 700,
                textDecoration: "none",
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


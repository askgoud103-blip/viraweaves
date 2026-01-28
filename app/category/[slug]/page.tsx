"use client";

import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const slug = (params?.slug as string) || "collection";
  
  // Capture price filters from the URL (e.g., ?maxPrice=2000)
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  // Mock data - In a real app, you'd filter this based on the 'slug' and 'prices'
  const sareeItems = [
    { id: 1, src: "/sarees/s1.jpg", name: "Classic Weave", price: "₹2,500" },
    { id: 2, src: "/sarees/s2.jpg", name: "Royal Heritage", price: "₹4,200" },
    { id: 3, src: "/sarees/s3.jpg", name: "Modern Drape", price: "₹1,800" },
    { id: 4, src: "/sarees/s4.jpg", name: "Temple Border", price: "₹5,500" },
    { id: 5, src: "/sarees/s5.jpg", name: "Golden Zari", price: "₹3,100" },
    { id: 6, src: "/sarees/s6.jpg", name: "Evening Grace", price: "₹2,900" },
    // Doubling for grid fill
    { id: 7, src: "/sarees/s1.jpg", name: "Traditional Silk", price: "₹6,000" },
    { id: 8, src: "/sarees/s2.jpg", name: "Floral Print", price: "₹1,200" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffe4ec", paddingBottom: "50px" }}>
      <Navbar />

      {/* HEADER SECTION */}
      <section style={{ padding: "140px 20px 40px", textAlign: "center" }}>
        <h1 style={{ 
          fontFamily: "serif", 
          fontSize: "clamp(2rem, 5vw, 3rem)", 
          textTransform: "capitalize",
          color: "#333",
          marginBottom: "10px"
        }}>
          {slug.replace(/-/g, " ")}
        </h1>
        
        {/* Price Tag Indicator */}
        {(minPrice || maxPrice) && (
          <div style={{ marginBottom: "15px" }}>
            <span style={{ fontSize: "0.9rem", background: "#fff", padding: "5px 12px", borderRadius: "20px", color: "#d14d72", fontWeight: 600, border: "1px solid #ffb6c1" }}>
              {minPrice && !maxPrice && `Above ₹${minPrice}`}
              {!minPrice && maxPrice && `Under ₹${maxPrice}`}
              {minPrice && maxPrice && `₹${minPrice} - ₹${maxPrice}`}
            </span>
          </div>
        )}

        <p style={{ color: "#666", maxWidth: "600px", margin: "0 auto" }}>
          Discover the elegance of {slug.replace(/-/g, " ")}. Handpicked textures and timeless designs.
        </p>

        <Link href="/" style={{ 
          display: "inline-block", 
          marginTop: "20px", 
          color: "#d14d72", 
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "0.9rem"
        }}>
          ← Back to Home
        </Link>
      </section>

      {/* PRODUCT GRID */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "30px",
          }}
        >
          {sareeItems.map((item) => (
            <div
              key={item.id}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                border: "1px solid #eee"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.05)";
              }}
            >
              {/* Image Container */}
              <div style={{ position: "relative", height: "350px" }}>
                <img
                  src={item.src}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div style={{ 
                  position: "absolute", 
                  top: "15px", 
                  left: "15px", 
                  background: "rgba(255,255,255,0.9)", 
                  padding: "4px 10px", 
                  borderRadius: "6px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#d14d72",
                  letterSpacing: "1px"
                }}>
                  VIRAWEAVES
                </div>
              </div>

              {/* Text Info */}
              <div style={{ padding: "20px", textAlign: "center" }}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "1.1rem", color: "#333", fontFamily: "serif" }}>
                  {item.name}
                </h3>
                <p style={{ margin: 0, color: "#d14d72", fontWeight: 700, fontSize: "1.2rem" }}>
                  {item.price}
                </p>
                <button style={{
                  marginTop: "15px",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#ffe4ec",
                  color: "#d14d72",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#ffb6c1"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#ffe4ec"}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

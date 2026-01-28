"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import products from "@/data/products.json"; // Path to your fixed JSON

export default function ProductDetails() {
  const params = useParams();
  const slug = params?.id; // Assuming the URL is /product/[slug]

  // Find the specific product from your JSON
  const product = products.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <h2>Product not found</h2>
        <Link href="/">Return Home</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      <Navbar />
      
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "140px 20px 60px" }}>
        <Link href={`/category/${product.category}`} style={{ color: "#d14d72", textDecoration: "none", fontWeight: 600 }}>
          ← Back to {product.category}
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "60px", marginTop: "40px" }}>
          
          {/* IMAGE SECTION */}
          <div>
            <img 
              src={product.images[0]} 
              alt={product.title} 
              style={{ width: "100%", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }} 
            />
          </div>

          {/* CONTENT SECTION */}
          <div>
            <p style={{ color: "#d14d72", fontWeight: 700, letterSpacing: "2px", fontSize: "0.75rem", textTransform: "uppercase" }}>
              {product.weave} • {product.fabric}
            </p>
            <h1 style={{ fontFamily: "serif", fontSize: "2.8rem", margin: "10px 0", color: "#222" }}>
              {product.title}
            </h1>
            
            <div style={{ display: "flex", alignItems: "baseline", gap: "15px", margin: "20px 0" }}>
              <span style={{ fontSize: "2rem", color: "#d14d72", fontWeight: 700 }}>₹{product.price}</span>
              {product.originalPrice && (
                <span style={{ textDecoration: "line-through", color: "#999" }}>₹{product.originalPrice}</span>
              )}
            </div>

            <p style={{ lineHeight: "1.8", color: "#444", fontSize: "1.05rem" }}>{product.description}</p>

            <div style={{ marginTop: "30px", background: "#fdf2f5", padding: "25px", borderRadius: "16px", border: "1px solid #ffe4ec" }}>
              <h4 style={{ margin: "0 0 10px 0", fontSize: "0.9rem" }}>Product Specifications:</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.95rem", color: "#555" }}>
                <li style={{ marginBottom: "8px" }}>🧵 <strong>Fabric:</strong> {product.fabric}</li>
                <li style={{ marginBottom: "8px" }}>📏 <strong>Length:</strong> {product.length || "5.5 meters"}</li>
                <li style={{ marginBottom: "8px" }}>🎨 <strong>Color:</strong> {product.color || "Traditional"}</li>
                <li>✨ <strong>Blouse Piece:</strong> {product.blousePiece || "Available"}</li>
              </ul>
            </div>

            <button style={{
              marginTop: "40px",
              width: "100%",
              padding: "20px",
              borderRadius: "14px",
              border: "none",
              background: "#d14d72",
              color: "#fff",
              fontSize: "1.1rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(209, 77, 114, 0.4)"
            }}>
              Order on WhatsApp
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

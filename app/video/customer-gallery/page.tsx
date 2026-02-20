"use client";
import React from "react";
import Link from "next/link";

const COLORS = {
  maroon: "#800000",
  gold: "#D4AF37",
};

const customerVideos = [
  { id: 1, src: "/video/customer-review.mp4", name: "Ananya R.", subtitle: "Silk Saree Review" },
  { id: 2, src: "/video/customer2.mp4", name: "Meera K.", subtitle: "Wedding Collection" },
  // Add more customer videos here
];

export default function CustomerGallery() {
  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center", marginBottom: "50px" }}>
        <Link href="/" style={{ color: COLORS.maroon, textDecoration: "none", fontSize: "0.9rem", fontWeight: "bold" }}>
          ← BACK TO HOME
        </Link>
        <h1 style={{ fontFamily: "serif", color: COLORS.maroon, fontSize: "2.5rem", marginTop: "20px" }}>
          Customer Diaries
        </h1>
        <p style={{ color: "#666" }}>Real stories from our Viraweaves family</p>
      </div>

      <div style={{ 
        maxWidth: "1100px", 
        margin: "0 auto", 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
        gap: "25px" 
      }}>
        {customerVideos.map((video) => (
          <div key={video.id} style={{ backgroundColor: "#f9f9f9", borderRadius: "16px", padding: "15px", textAlign: "left" }}>
            <div style={{ 
              position: "relative", paddingBottom: "177.78%", height: 0, 
              overflow: "hidden", borderRadius: "12px", backgroundColor: "#000" 
            }}>
              <video controls playsInline style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}>
                <source src={video.src} type="video/mp4" />
              </video>
            </div>
            <h3 style={{ marginTop: "15px", color: COLORS.maroon, marginBottom: "2px" }}>{video.name}</h3>
            <p style={{ color: COLORS.gold, fontSize: "0.85rem", fontWeight: "600" }}>{video.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

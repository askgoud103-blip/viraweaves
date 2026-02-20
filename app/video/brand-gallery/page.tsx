"use client";
import React from "react";
import Link from "next/link";

const COLORS = {
  maroon: "#800000",
  gold: "#D4AF37",
};

const brandVideos = [
  { id: 1, src: "/video/brand1.mp4", title: "The Art of Weaving" },
  { id: 2, src: "/video/brand2.mp4", title: "Heritage Collection" },
  { id: 3, src: "/video/brand3.mp4", title: "Handloom Process" },
  // Add more as you upload them to public/video/
];

export default function BrandGallery() {
  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", padding: "40px 20px" }}>
      {/* Header */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center", marginBottom: "50px" }}>
        <Link href="/" style={{ color: COLORS.maroon, textDecoration: "none", fontSize: "0.9rem", fontWeight: "bold" }}>
          ← BACK TO HOME
        </Link>
        <h1 style={{ fontFamily: "serif", color: COLORS.maroon, fontSize: "2.5rem", marginTop: "20px" }}>
          Our Brand Stories
        </h1>
        <div style={{ width: "60px", height: "3px", backgroundColor: COLORS.gold, margin: "15px auto" }}></div>
      </div>

      {/* Video Grid */}
      <div style={{ 
        maxWidth: "1100px", 
        margin: "0 auto", 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "30px" 
      }}>
        {brandVideos.map((video) => (
          <div key={video.id} style={{ textAlign: "center" }}>
            <div style={{ 
              position: "relative", 
              paddingBottom: "177.78%", // Vertical 9:16 aspect ratio (common for mobile-shot videos)
              // Change to "56.25%" if your videos are horizontal (16:9)
              height: 0, 
              overflow: "hidden", 
              borderRadius: "12px", 
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              backgroundColor: "#000"
            }}>
              <video 
                controls 
                playsInline 
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
              >
                <source src={video.src} type="video/mp4" />
              </video>
            </div>
            <p style={{ marginTop: "15px", fontFamily: "serif", color: COLORS.maroon, fontWeight: "600" }}>
              {video.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

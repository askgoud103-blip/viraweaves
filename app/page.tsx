"use client";

import { useRef, useEffect, useState, MouseEvent, TouchEvent } from "react";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { normalize } from "@/lib/utils";
import { COLORS } from "@/lib/colors";
import products from "@/data/products.json";

// Centralized Data Arrays
const CATEGORIES = [
  "Jamdhani", "Banarasi", "Kanchi Pattu", "Narayanpet", "Pochampally", 
  "Gadwal", "Venkatagiri", "Kotha", "Fancy", "Viscos", 
  "Pure Georgette", "JimmiChoo", "Designer Sarees", "OfficeWear", "CasualWear"
];

const QUICK_FILTERS = [

  { label: "Below Rs.2K", cat: "jamdhani", params: "?maxPrice=2000" },
  { label: "Below Rs.5K", cat: "banarasi", params: "?maxPrice=5000" },
  { label: "Rs.10K – 15K", cat: "kanchi-pattu", params: "?minPrice=10000&maxPrice=15000" },
  { label: "Rs.15K – 30K", cat: "jamdhani", params: "?minPrice=15000&maxPrice=30000" },
  { label: "Above Rs.45K", cat: "kanchi-pattu", params: "?minPrice=45000" },
  { label: "New Arrivals", cat: "pochampally", params: "" },
  { label: "Trending", cat: "narayanpet", params: "" },
  { label: "Popular", cat: "gadwal", params: "" },
  { label: "Designer", cat: "designer-sarees", params: "" },
];

const ALL_IMAGES = products.flatMap(p => p.images);

export default function HomePage() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const speed = 0.5;
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      if (!isDragging && !isHovering) {
        setTranslateX((prev) => {
          let next = prev - speed;
          const total = container.scrollWidth / 2;
          if (Math.abs(next) >= total) next += total;
          return next;
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, [isDragging, isHovering]);

  // TypeScript-safe event handlers
  const handleMouseDown = (e: MouseEvent | TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    dragStartX.current = clientX;
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const delta = clientX - dragStartX.current;
    setTranslateX((prev) => prev + delta);
    dragStartX.current = clientX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: COLORS.cream, overflowX: "hidden" }}>
      <Navbar />

      {/* HERO SECTION */}
      <section
        style={{
          padding: "40px 6px 20px",
          textAlign: "center",
          background: `linear-gradient(to bottom, ${COLORS.cream}, #fff)`,
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span style={{ 
            textTransform: "uppercase", 
            letterSpacing: "3px", 
            fontSize: "0.75rem", 
            fontWeight: 600, 
            color: COLORS.gold 
          }}>
            Authentic Indian Heritage
          </span>
          <h1 style={{ 
            fontFamily: "serif", 
            fontSize: "clamp(2.5rem, 8vw, 4rem)", 
            margin: "15px 0", 
            color: COLORS.maroon 
          }}>
            Viraweaves
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#555", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            Timeless hand-woven traditions, crafted for the modern woman.
          </p>
        </div>
      </section>

      {/* SECTION 1: Auto Scroll */}
      <section style={{ textAlign: "center", paddingBottom: "40px" }}>
        <h2 style={{ fontFamily: "serif", fontSize: "2.2rem", fontWeight: 700, marginBottom: "30px", color: "#333" }}>
          Latest Arrivals
        </h2>
        <div
          ref={containerRef}
          style={{ overflow: "hidden", cursor: isDragging ? "grabbing" : "grab" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => { setIsHovering(false); handleMouseUp(); }}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <div style={{
            display: "flex",
            transform: `translateX(${translateX}px)`,
            transition: isDragging ? "none" : "transform 0.1s linear",
          }}>
            {[...ALL_IMAGES, ...ALL_IMAGES].map((src, i) => (
              <img 
                key={i} 
                src={src} 
                alt="Saree" 
                style={{ 
                  height: "320px", 
                  borderRadius: "12px", 
                  marginRight: "20px", 
                  boxShadow: "0 10px 20px rgba(0,0,0,0.05)", 
                  background: "white",
                  objectFit: "cover"
                }} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Categories Grid */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "15px", 
          maxWidth: "1200px", 
          margin: "0 auto" 
        }}>
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat} 
              href={`/category/${normalize(cat)}`} 
              className="cat-link"
              style={{
                padding: "15px 10px", 
                background: COLORS.maroon, 
                color: "#fff", 
                borderRadius: "8px",
                textDecoration: "none", 
                fontWeight: "bold", 
                fontSize: "0.8rem", 
                display: "flex",
                alignItems: "center", 
                justifyContent: "center", 
                transition: "all 0.3s ease",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}
            >
              {cat.toUpperCase()}
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: Quick Links */}
      <section style={{ margin: "60px auto", maxWidth: "1100px", padding: "0 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "2.2rem", fontFamily: "serif", marginBottom: "40px" }}>Quick Links</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
          {QUICK_FILTERS.map((item) => (
            <Link
              key={item.label}
              href={`/category/${item.cat}${item.params}`}
              style={{
                flex: "1 1 calc(20% - 15px)", 
                minWidth: "150px", 
                padding: "20px 10px",
                borderRadius: "12px", 
                background: "#fff", 
                textAlign: "center",
                fontWeight: 700, 
                textDecoration: "none", 
                color: COLORS.maroon, 
                border: `1px solid ${COLORS.gold}`,
                transition: "all 0.2s ease"
              }}
            >
              {item.label.toUpperCase()}
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 4: Coming Soon */}
      <section style={{ textAlign: "center", padding: "80px 20px", background: "rgba(255,255,255,0.5)" }}>
        <h2 style={{ fontSize: "2rem", color: COLORS.maroon, fontFamily: "serif" }}>Coming Soon</h2>
        <p style={{ fontStyle: "italic", color: "#555", marginTop: "10px" }}>Special Bridal Collections & Silk Weaves Launching Soon</p>
      </section>

      <style jsx global>{`
        .cat-link:hover { background: ${COLORS.gold} !important; color: ${COLORS.maroon} !important; transform: translateY(-3px); }
      `}</style>
    </div>
  );
}

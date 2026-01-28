"use client";

import { useRef, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Link from "next/link";

// Shared normalizer to ensure slugs match your category pages
const normalize = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s*to\s*/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export default function HomePage() {
  const [isHovering, setIsHovering] = useState(false);

  const thumbnails = [
    "Jamdhani", "Kanchi Pattu", "Narayanpet", "Pochampally",
    "Gadwal", "Venkatagiri", "Kotha", "Fancy",
    "Viscos", "Pure Georgette", "JimmiChoo", "Designer Sarees",
  ];

  const sareeImages = [
    "/dir.jpg", "/dir9.jpg", "/dir20.jpg", "/dir10.jpg",
    "/dir21.jpg", "/dir11.jpg", "/dir22.jpg", "/dir12.jpg",
    "/dir23.jpg", "/dir13.jpg", "/dir24.jpg", "/dir14.jpg",
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const prevTranslate = useRef(0);
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

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    dragStartX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const delta = currentX - dragStartX.current;
    setTranslateX(prevTranslate.current + delta);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    prevTranslate.current = translateX;
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: "#ffc0cb", overflowX: "hidden" }}>
      <Navbar />

      {/* HERO SECTION - Small & Elegant */}
      <section style={{ 
        padding: "120px 20px 40px", 
        textAlign: "center", 
        background: "linear-gradient(to bottom, #ffc0cb, #ffe4ec)" 
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span style={{ 
            textTransform: "uppercase", 
            letterSpacing: "3px", 
            fontSize: "0.75rem", 
            fontWeight: 600, 
            color: "#d14d72" 
          }}>
            Authentic Indian Heritage
          </span>
          <h1 style={{ 
            fontFamily: "serif", 
            fontSize: "clamp(2.2rem, 8vw, 3.5rem)", 
            lineHeight: "1.2", 
            margin: "10px 0", 
            color: "#333" 
          }}>
            Viraweaves
          </h1>
          <p style={{ 
            fontSize: "1rem", 
            color: "#555", 
            maxWidth: "500px", 
            margin: "0 auto", 
            lineHeight: "1.5" 
          }}>
            Timeless hand-woven traditions, crafted for the modern woman.
          </p>
        </div>
      </section>

      {/* SECTION 1: Auto Scroll Sarees (Latest Arrivals) */}
      <section style={{ paddingTop: "0px", paddingBottom: "0px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "serif", fontSize: "2rem", fontWeight: 700, marginBottom: "5px", color: "#333" }}>
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
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              transform: `translateX(${translateX}px)`,
              transition: isDragging ? "none" : "transform 0.1s linear",
            }}
          >
            {[...sareeImages, ...sareeImages].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Saree Arrival"
                style={{
                  height: "280px",
                  width: "auto",
                  flexShrink: 0,
                  borderRadius: "15px",
                  background: "white",
                  marginRight: "15px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
              />
            ))}
          </div>
        </div>
      </section>
      
     {/* SECTION 2: Explore Your Choice (Category Grid) */}
     <section style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 10px" }}>
        <h2 style={{ textAlign: "center" }}>Explore Your Choice</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "20px" }}>
          {thumbnails.map((name, i) => (
            <Link key={i} href={`/category/${normalize(name)}`} style={{ textDecoration: "none" }}>
              <div style={{ height: "150px", borderRadius: "12px", overflow: "hidden", position: "relative" }}>
                <img src={`/thumb${i + 1}.jpg`} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{
                  position: "absolute", bottom: 0, width: "100%",
                  background: "rgba(0,0,0,0.6)", color: "#fff",
                  textAlign: "center", padding: "6px", fontWeight: 600
                }}>
                  {name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: Quick Links (Price & Collection Filters) */}
<section id="quick-links" style={{ margin: "20px auto", maxWidth: "1100px", padding: "0 20px" }}>
  <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 700, marginBottom: "30px", color: "#333", fontFamily: "serif" }}>
    Quick Links
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
      { label: "Below Rs.2K", path: "/category/all?maxPrice=2000" },
      { label: "Below Rs.5K", path: "/category/all?maxPrice=5000" },
      { label: "Rs.10K – 15K", path: "/category/all?minPrice=10000&maxPrice=15000" },
      { label: "Rs.15K – 30K", path: "/category/all?minPrice=15000&maxPrice=30000" },
      { label: "Above Rs.45K", path: "/category/all?minPrice=45000" },
      { label: "New Arrivals", path: "/category/new-arrivals" },
      { label: "Trending", path: "/category/trending" },
      { label: "Popular", path: "/category/popular" },
      { label: "Designer", path: "/category/designer-sarees" },
      
    ].map((item, i) => (
      <Link
        key={i}
        href={item.path}
        style={{
          flex: "1 1 calc(25% - 15px)", // 4 items per row on desktop
          minWidth: "140px",
          padding: "18px 10px",
          borderRadius: "12px",
          background: "#ffe4ec",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          textAlign: "center",
          fontWeight: 700,
          textDecoration: "none",
          color: "#333",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          border: "1px solid #ffb6c1",
          fontSize: "0.85rem",
          letterSpacing: "0.5px"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#ffb6c1";
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#ffe4ec";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
        }}
      >
        {item.label.toUpperCase()}
      </Link>
    ))}
  </div>
</section>

      {/* SECTION 4: Coming Soon */}
      <section style={{ width: "100%", textAlign: "center", padding: "30px 10px", background: "rgba(255,255,255,0.3)" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "10px", color: "#333" }}>Coming Soon</h2>
        <p style={{ fontStyle: "italic", color: "#555", marginBottom: "30px" }}>Something beautiful is being crafted for you…</p>

        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            border: "2px dashed white",
            background: "rgba(255,255,255,0.5)",
            padding: "40px 20px",
            borderRadius: "18px",
            fontSize: "1.2rem",
            color: "#333"
          }}
        >
          Special Bridal Collections & Silk Weaves Launching Soon
        </div>
      </section>
    </div>
  );
}

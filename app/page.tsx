

"use client";

import { useRef, useEffect, useState, MouseEvent, TouchEvent, useMemo } from "react";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { normalize } from "@/lib/utils";
import { COLORS } from "@/lib/colors";
import products from "@/data/products.json";
import Reviews from "@/app/components/Reviews";

// Centralized Data Arrays
const CATEGORIES = [
  "Jamdhani", "Banarasi", "Kanchi Pattu", "Narayanpet", "Pochampally", 
  "Gadwal", "Venkatagiri", "Kotha", "Fancy", "Viscos", 
  "Pure Georgette", "JimmiChoo", "Designer Sarees", "OfficeWear", "CasualWear", "Chanderi"
];

const QUICK_FILTERS = [
  { label: "Below ₹2K", params: "?maxPrice=2000" },
  { label: "Below ₹5K", params: "?maxPrice=5000" },
  { label: "₹10K – ₹15K", params: "?minPrice=10000&maxPrice=15000" },
  { label: "₹15K – ₹30K", params: "?minPrice=15000&maxPrice=30000" },
  { label: "₹30K – ₹45K", params: "?minPrice=30000&maxPrice=45000" },
  { label: "Above ₹45K", params: "?minPrice=45000" },
];

export default function HomePage() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const animationRef = useRef<number>(0);

  // Optimization: Flatten images once
  const scrollData = useMemo(() => {
    const flattened = products.flatMap(p => 
      p.images.map(img => ({
        src: img,
        id: p.id,
        category: p.category || "all", // Fixes the Type Error
        title: p.title
      }))
    );
    return [...flattened, ...flattened]; // Duplicate for infinite scroll
  }, []);

  useEffect(() => {
    const speed = 0.5;
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      if (!isDragging && !isHovering) {
        setTranslateX((prev) => {
          let next = prev - speed;
          const total = container.scrollWidth / 2;
          if (Math.abs(next) >= total) next = 0; // Reset smoothly
          return next;
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, [isDragging, isHovering]);

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
/* --- ADD STEP 1 HERE --- */
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  /* --- END OF STEP 1 --- */

  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: COLORS.cream, overflowX: "hidden" }}>
      <Navbar />

    {/* --- START OF HERO SECTION --- */}
<section
  style={{
    position: "relative",
    width: "100%",
    height: "40vh", // Controlled height
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    overflow: "hidden",
    backgroundColor: COLORS.maroon, // Dark fallback
  }}
>
  {/* 1. Background Video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      minWidth: "100%",
      minHeight: "100%",
      width: "auto",
      height: "auto",
      objectFit: "cover",
      zIndex: 0,
    }}
  >
    <source src="/video/vw.mp4" type="video/mp4" />
  </video>

  {/* 2. Dark Overlay (Improves text readability) */}
  <div 
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))",
      zIndex: 1
    }}
  />

  {/* 3. Text Content */}
  <div style={{ position: "relative", zIndex: 2, padding: "0 20px" }}>
    <span style={{ 
      textTransform: "uppercase", 
      letterSpacing: "3px", 
      fontSize: "0.8rem", 
      fontWeight: 700, 
      color: COLORS.gold 
    }}>
      Authentic Indian Heritage
    </span>
    <h1 style={{ 
      fontFamily: "serif", 
      fontSize: "clamp(2rem, 6vw, 3.5rem)", 
      margin: "10px 0", 
      color: "#fff",
      textShadow: "2px 2px 4px rgba(0,0,0,0.3)" 
    }}>
      Viraweaves
    </h1>
    <p style={{ 
      fontSize: "1.1rem", 
      color: COLORS.cream, 
      maxWidth: "500px", 
      margin: "0 auto", 
      fontWeight: 500 
    }}>
      Timeless hand-woven traditions.
          </p>
          
          <p style={{ 
      fontSize: "1.1rem", 
      color: COLORS.cream, 
      maxWidth: "500px", 
      margin: "0 auto", 
      fontWeight: 500 
    }}> Premium Bridal & Designer Sarees Curated for Grand Occasions Across India </p>
  </div>
</section>
{/* --- END OF HERO SECTION --- */}

      {/* SECTION 1: Auto Scroll */}
      <section style={{ textAlign: "center", padding: "30px 0 20px" }}>
        <h2 style={{ 
          fontFamily: "serif", 
          fontSize: "2.2rem", 
          fontWeight: 700, 
          marginBottom: "20px", 
          color: COLORS.maroon 
        }}>
          Latest Arrivals
        </h2>

        <div
          ref={containerRef}
          style={{ 
            overflow: "hidden", 
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "pan-y" 
          }}
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
              transform: `translateX(${translateX}px)`,
              transition: isDragging ? "none" : "transform 0.1s linear",
            }}
          >
            {scrollData.map((item, i) => (
              <Link
                key={`${item.id}-${i}`}
                href={`/product/${normalize(item.category)}/${item.id}`}
                onClick={(e) => { if (isDragging) e.preventDefault(); }}
                style={{ display: "block", flexShrink: 0 }}
              >
                <img
  src={item.src}
  alt={item.title || "Saree"}
  style={{
    height: "320px",
    width: "auto",
    borderRadius: "12px",
    marginRight: "20px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
    background: "white",
    objectFit: "cover",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    willChange: "transform",
  }} // <--- The style object ends here
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.2)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1.0)";
    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.05)";
  }}
/>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Categories Grid */}
      <section style={{ padding: "20px 20px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "serif", fontSize: "2rem", fontWeight: 700, marginBottom: "10px", color: COLORS.maroon }}>
          Categories for Special Women
        </h2>
        <p style={{ fontSize: "1rem", color: "#555", marginBottom: "30px" }}>
          Explore our exclusive collection tailored for elegance and style
        </p>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "15px", 
          maxWidth: "1200px", 
          margin: "0 auto" 
        }}>
          {[...CATEGORIES, "Pre-Wed Spl", "Bridal Spl", "Bridal Sisters"].map((cat) => (
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
      <section style={{ margin: "20px 20px", padding: "0 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "2.2rem", fontFamily: "serif", marginBottom: "25px", color: COLORS.maroon }}>
          Quick Links
        </h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
          {QUICK_FILTERS.map((item) => (
            <Link 
              key={item.label} 
              href={`/category/all${item.params}`}
              className="quick-link"
              style={{
                flex: "1 1 calc(20% - 15px)",
                minWidth: "150px",
                padding: "18px 10px",
                borderRadius: "12px",
                backgroundColor: COLORS.maroon,
                textAlign: "center",
                fontWeight: 700,
                textDecoration: "none",
                color: COLORS.cream,
                border: `2px solid ${COLORS.gold}`,
                transition: "all 0.3s ease",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              {item.label.toUpperCase()}
            </Link>
          ))}
        </div>
      </section>
      
     {/* COMBINED SECTION 4 & 5: VIDEOS & BUTTONS */}
      <section style={{ maxWidth: "1100px", margin: "0 auto 40px", padding: "0 20px" }}>
     
        <h2 style={{ 
          textAlign: "center", 
          fontSize: "2.2rem", 
          fontFamily: "serif", 
          marginBottom: "40px", 
          color: COLORS.maroon 
        }}>
          Experience Viraweaves
        </h2>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "40px" 
        }}>
          
          {/* BRAND COLUMN */}
<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <h3 style={{ fontFamily: "serif", color: COLORS.maroon, marginBottom: "15px", fontSize: "1.4rem", fontWeight: 600 }}>
    Our Brand Story
  </h3>
  <div style={{ 
    position: "relative", paddingBottom: "56.25%", width: "100%", height: 0, 
    overflow: "hidden", borderRadius: "16px", boxShadow: "0 15px 35px rgba(0,0,0,0.12)", backgroundColor: "#000" 
  }}>
    {/* REMOVED autoPlay, muted, loop */}
    <video controls playsInline style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}>
      <source src="/video/brand1.mp4" type="video/mp4" />
    </video>
  </div>
  <Link href="/video/brand-gallery" className="quick-link" style={{ 
    marginTop: "25px", width: "100%", maxWidth: "280px", padding: "15px", 
    borderRadius: "12px", textDecoration: "none", textAlign: "center" 
  }}>
    EXPLORE BRAND VIDEOS
  </Link>
</div>

          {/* CUSTOMER COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3 style={{ fontFamily: "serif", color: COLORS.maroon, marginBottom: "15px", fontSize: "1.4rem", fontWeight: 600 }}>
              Customer Love
            </h3>
            <div style={{ 
              position: "relative", paddingBottom: "56.25%", width: "100%", height: 0, 
              overflow: "hidden", borderRadius: "16px", boxShadow: "0 15px 35px rgba(0,0,0,0.12)", backgroundColor: "#000" 
            }}>
              <video controls playsInline style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}>
                <source src="/video/customer-review.mp4" type="video/mp4" />
              </video>
            </div>
            {/* Button is now part of the Customer Column */}
            <Link href="/video/customer-gallery" className="quick-link" style={{ 
              marginTop: "25px", width: "100%", maxWidth: "280px", padding: "15px", 
              borderRadius: "12px", textDecoration: "none", textAlign: "center" 
            }}>
              EXPLORE CUSTOMER DIARIES
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 6: REVIEWS */}
      <Reviews />
      {/* SECTION 7: GRAND COLLECTION VIDEO */}
<section style={{
  width: "100%",
  margin: "20px 0 60px", 
  position: "relative",
}}>
  <div style={{
    maxWidth: "1200px", 
    margin: "0 auto",
    padding: "0 20px",
  }}>
    <h2 style={{
      fontFamily: "serif",
      fontSize: "2.4rem",
      marginBottom: "30px",
      color: COLORS.maroon,
      textAlign: "center"
    }}>
      The Grand Weave Collection
    </h2>

    <div style={{
      position: "relative",
      width: "100%",
      height: "60vh",
      overflow: "hidden",
      borderRadius: "24px", 
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
    }}>
      {/* REMOVED autoPlay, muted, loop AND ADDED controls */}
      <video
        controls
        playsInline
        poster="/video/grand-thumb.jpg"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      >
        <source src="/video/grand-collection.mp4" type="video/mp4" />
      </video>

      {/* Soft Gradient Overlay removed or kept based on preference; 
          usually better to remove if user needs to see play buttons clearly */}
    </div>
  </div>
</section>

      

      {/* Global CSS for Hovers */}
      <style jsx global>{`
        .cat-link:hover, .quick-link:hover { 
          background-color: ${COLORS.gold} !important; 
          color: ${COLORS.maroon} !important; 
          transform: translateY(-3px); 
        }
      `}</style>
      {/* --- ADD STEP 2 HERE --- */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            width: "50px",
            height: "50px",
            backgroundColor: COLORS.maroon,
            color: COLORS.gold,
            border: `2px solid ${COLORS.gold}`,
            borderRadius: "50%",
            zIndex: 1000,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
          }}
        >
          ↑
        </button>
      )}
      
    </div>
  );
}

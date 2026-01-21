"use client";

import { useRef, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Link from "next/link";


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

  // Continuous Auto Scroll with Hover Pause
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

  // Drag Handlers
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
    <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#ffc0cb" }}>
      <Navbar />

      {/* SECTION 1: Auto Scroll Sarees */}
      <section style={{ paddingTop: "140px", paddingBottom: "20px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600 }}>
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
                style={{
                  height: "110px",
                  width: "auto",
                  flexShrink: 0,
                  borderRadius: "10px",
                  background: "white",
                  marginRight: "2px",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Explore */}
      <section style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 10px" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 600 }}>
          Explore Your Choice
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "10px",
          }}
        >
          {thumbnails.map((name, idx) => (
            <div
              key={idx}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              <img
                src={`/thumb${idx + 1}.jpg`}
                style={{ width: "100%", height: "120px", objectFit: "cover" }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  background: "rgba(0,0,0,0.45)",
                  color: "white",
                  padding: "6px 0",
                  textAlign: "center",
                }}
              >
                {name}
              </div>
            </div>
          ))}
        </div>
      </section>


     

{/* SECTION 3: Quick Links */}
<section style={{ margin: "40px auto", maxWidth: "1100px" }}>
  <h2
    style={{
      textAlign: "center",
      fontSize: "2rem",
      fontWeight: 600,
      marginBottom: "20px",
    }}
  >
    Quick Links
  </h2>

  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      justifyContent: "center",
    }}
  >
    {[
      { label: "Below ₹2K", slug: "below-2k" },
      { label: "Below ₹5K", slug: "below-5k" },
      { label: "₹10K – ₹15K", slug: "10-to-15k" },
      { label: "₹15K – ₹30K", slug: "15-to-30k" },
      { label: "₹30K – ₹45K", slug: "30-to-45k" },
      { label: "Above ₹45K", slug: "above-45k" },
      { label: "New Arrivals", slug: "new-arrivals" },
      { label: "Trending", slug: "trending" },
      { label: "Popular", slug: "popular" },
      { label: "Designer", slug: "designer" },
    ].map((item, i) => (
      <Link
        key={i}
        href={`/product/${item.slug}/1`}
        style={{
          flex: "1 1 calc(20% - 10px)",
          minWidth: "110px",
          padding: "10px",
          borderRadius: "10px",
          background: "#ffe4ec",
          boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
          textAlign: "center",
          fontWeight: 600,
          textDecoration: "none",
          color: "#000",
        }}
      >
        {item.label.toUpperCase()}
      </Link>
    ))}
  </div>
</section>



      {/* SECTION 4: Coming Soon */}
      <section style={{ width: "100%", textAlign: "center", padding: "20px 0" }}>
        <h2>Coming Soon</h2>
        <p>Something beautiful is being crafted for you…</p>

        <div
          style={{
            border: "2px solid white",
            background: "rgba(255,255,255,0.6)",
            padding: "40px 20px",
            borderRadius: "18px",
            fontSize: "1.2rem",
          }}
        >
          New Features & Collections Will Appear Here
        </div>
      </section>
    </div>
  );
}


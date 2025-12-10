"use client";

import { useRef, useEffect, useState } from "react";
import Navbar from "./components/Navbar";

export default function HomePage() {
  const thumbnails = [
    "Jamdhani", "Kanchi Pattu", "Narayanpet", "Pochampally",
    "Gadwal", "Venkatagiri", "Kotha", "Fancy",
    "Viscos", "Pure Georgette", "JimmiChoo", "Designer Sarees",
  ];
  
   // 👇 Paste here
  const thumbnailImages = [
    "/thumbnails/jamdhani.jpg",
    "/thumbnails/kanchi.jpg",
    "/thumbnails/narayanpet.jpg",
    "/thumbnails/pochampally.jpg",
    "/thumbnails/gadwal.jpg",
    "/thumbnails/venkatagiri.jpg",
    "/thumbnails/kotha.jpg",
    "/thumbnails/fancy.jpg",
    "/thumbnails/viscos.jpg",
    "/thumbnails/puregeorgette.jpg",
    "/thumbnails/jimmichoo.jpg",
    "/thumbnails/designer.jpg",
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

  // Continuous auto scroll
  useEffect(() => {
    const speed = 0.5; // base speed per frame
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      if (!isDragging) {
        setTranslateX(prev => {
          let newTranslate = prev - speed;
          const totalWidth = container.scrollWidth / 2; // since images are duplicated
          if (Math.abs(newTranslate) >= totalWidth) {
            newTranslate += totalWidth;
          }
          return newTranslate;
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, [isDragging]);

  // Handle drag
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    if ("touches" in e) {
      dragStartX.current = e.touches[0].clientX;
    } else {
      dragStartX.current = e.clientX;
    }
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    let currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
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

{/* Section 1 - Latest Arrivals */}
<section style={{ paddingTop: "140px", paddingBottom: "20px", textAlign: "center" }}>
  <h2
    style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "2rem",
      fontWeight: 600,
      color: "black",
      margin: "0 0 8px 0",
      textShadow: "2px 2px 8px rgba(0,0,0,0.25)",
    }}
  >
    Latest Arrivals
  </h2>

  <div
    ref={containerRef}
    style={{
      overflow: "hidden",
      cursor: isDragging ? "grabbing" : "grab",
    }}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp}
    onTouchStart={handleMouseDown}
    onTouchMove={handleMouseMove}
    onTouchEnd={handleMouseUp}

    // ★ Hover pause (new)
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
  >
    <div
      style={{
        display: "flex",
        flexWrap: "nowrap",
        transform: `translateX(${translateX}px)`,
        transition: isDragging ? "none" : "transform 0.1s linear",
      }}
    >
      {[...sareeImages, ...sareeImages].map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Saree ${idx + 1}`}
          loading="lazy"
          style={{
            height: "110px",
            width: "auto",
            flexShrink: 0,
            borderRadius: "10px",
            objectFit: "contain",
            backgroundColor: "white",
            marginRight: "2px",
            cursor: "pointer",
          }}
          onClick={() => window.open(src, "_blank")}
        />
      ))}
    </div>
  </div>
</section>




     {/* Section 2 - Thumbnails */}
<section
  style={{
    maxWidth: "1000px",
    margin: "40px auto 20px auto",
    padding: "0 10px",
  }}
>
  <h2
    style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "2rem",
      fontWeight: 600,
      color: "black",
      textAlign: "center",
      margin: "20px 0 10px 0",
      textShadow: "2px 2px 8px rgba(0,0,0,0.25)",
    }}
  >
    Explore Your Choice
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
      gap: "10px",
    }}
  >
    {thumbnails.map((name, index) => (
      <div
        key={index}
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "12px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
        }}
      >
        {/* Thumbnail Image */}
        <img
          src={`/thumb${index + 1}.jpg`}
          alt={name}
          style={{
            width: "100%",
            height: "120px",
            objectFit: "cover",
            borderRadius: "12px",
            display: "block",
            transition: "transform 0.4s ease",
          }}
        />

        {/* Overlay Text */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: "6px 0",
            background: "rgba(0, 0, 0, 0.45)",
            color: "white",
            textAlign: "center",
            fontSize: "0.9rem",
            fontWeight: 500,
            letterSpacing: "0.5px",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
          }}
        >
          {name}
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Section 3 - Horizontal Buttons */}
      <section style={{ maxWidth: "1000px", margin: "20px auto 0 auto", padding: "0 10px", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2rem",
            fontWeight: 600,
            color: "black",
            marginBottom: "20px",
            textShadow: "2px 2px 8px rgba(0,0,0,0.25)",
          }}
        >
          Quick Links
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          {[
            "Below 2k", "Below 5k", "10-15k", "15-30k", "30-45k",
            "Above45k", "New Arrivals", "Trending", "Popular", "Designer",
          ].map((label, index) => (
            <button
              key={index}
              style={{
                flex: "1 1 calc(10% - 10px)",
                minWidth: "80px",
                padding: "10px 5px",
                fontSize: "14px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#f0f0f0",
                cursor: "pointer",
                boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 3px 6px rgba(0,0,0,0.2)";
              }}
            >
            
            

              {label}
            </button>
            
          ))}
        </div>
      </section>
    
    
   
{/* SECTION 4 – Centered Placeholder */}

<section
  style={{
    width: "100%",
    backgroundColor: "#ffc0cb", // ★ SAME as your page background
    padding: "0 0",
    display: "flex",
    justifyContent: "center",
  }}
>
  <div
    style={{
      width: "100%",
      maxWidth: "800px",
      textAlign: "center",
      padding: "0 20px",
    }}
  >
    <h2
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "2rem",
        fontWeight: 600,
        marginBottom: "10px",
        color: "black",
      }}
    >
      Coming Soon
    </h2>

    <p
      style={{
        fontSize: "1.1rem",
        color: "black",
        marginBottom: "30px",
      }}
    >
      Something beautiful is being crafted just for you…
    </p>

    <div
      style={{
        border: "2px solid white",
        background: "rgba(255,255,255,0.6)",
        padding: "40px 20px",
        borderRadius: "18px",
        fontSize: "1.2rem",
        fontWeight: 500,
        color: "#c2185b",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      New Features & Collections Will Appear Here
    </div>
  </div>
</section>







      
    </div>
  );
}


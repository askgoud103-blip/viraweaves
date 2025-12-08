"use client";

import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";

export default function HomePage() {
  const thumbnails = [
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

  const sareeImages = [
    "/dir.jpg",
    "/dir9.jpg",
    "/dir20.jpg",
    "/dir10.jpg",
    "/dir21.jpg",
    "/dir11.jpg",
    "/dir22.jpg",
    "/dir12.jpg",
    "/dir23.jpg",
    "/dir13.jpg",
    "/dir24.jpg",
    "/dir14.jpg",
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  // Smooth infinite auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animationFrame: number;
    const speed = 1.5;
    const scroll = () => {
      el.scrollLeft = (el.scrollLeft + speed) % el.scrollWidth;
      animationFrame = requestAnimationFrame(scroll);
    };
    scroll();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#ffe4ea" }}>
      <Navbar />

      {/* Wrapper with top padding to avoid navbar overlap */}
      <div style={{ paddingTop: "120px" }}>
        {/* Section 1 - Latest Arrivals */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
            marginBottom: "40px",
            width: "100%",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2rem",
              fontWeight: 600,
              color: "black",
              marginBottom: "16px",
              textShadow: "2px 2px 8px rgba(0,0,0,0.25)",
              textAlign: "center",
            }}
          >
            Latest Arrivals
          </h2>

          <div
            ref={scrollRef}
            style={{
              display: "flex",
              overflowX: "hidden",
              gap: "10px",
              paddingBottom: "10px",
              height: "130px",
              width: "95%",
              margin: "0 auto",
            }}
          >
            {[...sareeImages, ...sareeImages].map((src, index) => (
              <img
                key={index}
                src={src.startsWith("/") ? src : `/${src}`}
                alt={`Saree ${index + 1}`}
                style={{
                  height: "120px",
                  width: "auto",
                  objectFit: "contain",
                  borderRadius: "10px",
                  flexShrink: 0,
                  backgroundColor: "white",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              />
            ))}
          </div>
        </section>

        {/* Section 5 - Explore Thumbnails */}
        <section
          style={{
            maxWidth: "1000px",
            margin: "40px auto",
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
              marginBottom: "20px",
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
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  padding: "5px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  cursor: "pointer",
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
                <img
                  src={`/thumb${index + 1}.jpg`}
                  alt={name}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                <span
                  style={{
                    marginTop: "4px",
                    fontSize: "0.9rem",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


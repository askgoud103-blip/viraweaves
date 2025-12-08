"use client";

import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";

export default function HomePage() {
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

  const scrollRef = useRef<HTMLDivElement>(null);
  const stopScrollRef = useRef(false);

  // Continuous circular auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 1.5;

    const scroll = () => {
      if (!el) return;
      if (!stopScrollRef.current) {
        el.scrollLeft += speed;

        // Reset scrollLeft seamlessly when it reaches half the total scroll width
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }

      requestAnimationFrame(scroll);
    };

    scroll();
  }, []);

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

  <div style={{ overflow: "hidden", width: "100%" }}>
    <div
      style={{
        display: "flex",
        gap: "2px",
        animation: "scroll 20s linear infinite",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.animationPlayState = "paused";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.animationPlayState = "running";
      }}
    >
      {[...sareeImages, ...sareeImages].map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Saree ${idx + 1}`}
          style={{
            height: "110px",
            width: "auto",
            flexShrink: 0,
            borderRadius: "10px",
            objectFit: "contain",
            backgroundColor: "white",
          }}
        />
      ))}
    </div>
  </div>

  {/* CSS for animation */}
  <style jsx>{`
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `}</style>
</section>


      {/* Section 2 - Thumbnails */}
      <section style={{ maxWidth: "1000px", margin: "40px auto 20px auto", padding: "0 10px" }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "10px" }}>
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
              <img src={`/thumb${index + 1}.jpg`} alt={name} style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }} />
              <span style={{ marginTop: "2px", fontSize: "0.9rem", color: "black", textAlign: "center" }}>{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 - Horizontal Buttons */}
      <section style={{ maxWidth: "1000px", margin: "20px auto 40px auto", padding: "0 10px", textAlign: "center" }}>
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
    </div>
  );
}


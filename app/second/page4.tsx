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

  const sareeImages = ["/dir.jpg", 
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
  			"dir9.jpg", 
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
  			]; // Add more images

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animationFrame: number;
    const speed = 1.5; // pixels per frame
    const scroll = () => {
      el.scrollLeft += speed;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      }
      animationFrame = requestAnimationFrame(scroll);
    };
    scroll();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // ✅ Define buttonStyle inside the component
  const buttonStyle: React.CSSProperties = {
    padding: "10px 15px",
    backgroundColor: "#f0f0f0",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
    fontSize: "14px",
  };

  return (
    <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#ffc0cb" }}>
      <Navbar />

      {/* Section 1 - Hero */}
<section style={{ paddingTop: "120px", textAlign: "center" }}>
  <h1
    style={{
      fontSize: "3rem",
      color: "black",
      textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
      margin: 0,   // remove margin
      padding: 0,  // remove padding
    }}
  >
    Vira <span style={{ display: "inline-block", transform: "rotate(-10deg)" }}>~</span> Weaves
  </h1>
  <h3
    style={{
      fontSize: "1.5rem",
      textShadow: "1px 1px 4px rgba(0,0,0,0.2)",
      margin: 0,  // remove margin
      padding: 0, // remove padding
    }}
  >
    Drape Yourself in Perfection
  </h3>
</section>


      {/* Middle Sections: 2-3-4 */}
<div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "20px", marginTop: "20px" }}>
  {/* Section 2 - Left Buttons */}
  <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100px", alignItems: "center" }}>
    <button style={buttonStyle}>Left 1</button>
    <button style={buttonStyle}>Left 2</button>
    <button style={buttonStyle}>Left 3</button>
  </div>

  {/* Section 3 - Middle Latest Arrivals + Auto-Scroll */}
  <div style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", overflow: "hidden" }}>
    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, color: "black", marginBottom: "8px", textShadow: "2px 2px 8px rgba(0,0,0,0.25)" }}>
      Latest Arrivals
    </h2>

    <div
      ref={scrollRef}
      style={{
        display: "flex",
        overflowX: "hidden",
        gap: "2px",
        paddingBottom: "5px",
        height: "120px",
        width: "100%",
      }}
    >
      {[...sareeImages, ...sareeImages].map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Saree ${index + 1}`}
          style={{
            height: "110px",
            width: "auto",
            objectFit: "contain",
            borderRadius: "10px",
            flexShrink: 0,
            backgroundColor: "white",
          }}
        />
      ))}
    </div>
  </div>

  {/* Section 4 - Right Buttons */}
  <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100px", alignItems: "center" }}>
    <button style={buttonStyle}>Right 1</button>
    <button style={buttonStyle}>Right 2</button>
    <button style={buttonStyle}>Right 3</button>
  </div>
</div>



     {/* Section 5 - Thumbnails */}
<section style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 10px" }}>
  {/* Heading */}
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

  {/* Thumbnails Grid */}
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
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
            marginTop: "2px",
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
  );
}


"use client";

import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";

export default function SecondPage() {
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
  ];

  // Ref for auto-scroll
  const scrollRef = useRef<HTMLDivElement>(null);

  // ✅ Mobile-friendly auto-scroll using requestAnimationFrame
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrame: number;
    const speed = 1.5; // adjust speed here

    const scroll = () => {
      el.scrollLeft += speed;

      // infinite scroll wrap
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    scroll();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#ffc0cb",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div
        style={{
          paddingTop: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingLeft: "20px",
          paddingRight: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* Page Title */}
        <h1
          style={{
            fontSize: "3rem",
            color: "black",
            textAlign: "center",
            margin: 0,
            padding: 0,
            marginTop: "35px",
            textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          Vira{" "}
          <span
            style={{
              display: "inline-block",
              transform: "rotate(-10deg)",
              textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
            }}
          >
            ~
          </span>{" "}
          Weaves
        </h1>

        {/* Subtitle */}
        <h2
          style={{
            fontSize: "1.5rem",
            color: "black",
            textAlign: "center",
            marginTop: "8px",
            marginBottom: "40px",
            fontWeight: 400,
            textShadow: "1px 1px 4px rgba(0,0,0,0.2)",
          }}
        >
          Drape Yourself in Perfection
        </h2>

        {/* Thumbnails Grid */}
        <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",      // reduced from 20px → 10px
    width: "100%",
    maxWidth: "1000px",
    marginBottom: "10px", // reduced from 40px → 10px
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
{/* Latest Arrivals Title */}
<h2
  style={{
    fontFamily: "'Playfair Display', serif",
    fontSize: "2rem",
    fontWeight: "600",
    color: "black",
    textAlign: "center",
    marginBottom: "20px",
    textShadow: "2px 2px 8px rgba(0,0,0,0.25)",
    position: "relative",
  }}
>
  Latest Arrivals
  <span
    style={{
      display: "block",
      width: "80px",
      height: "3px",
      backgroundColor: "black",
      margin: "10px auto 0",
      borderRadius: "3px",
    }}
  ></span>
</h2>

        {/* ✔ Auto-scroll Saree Row (fixed) */}
        <div
          ref={scrollRef}
          style={{
            width: "100%",
            overflow: "hidden", // IMPORTANT for mobile
            whiteSpace: "nowrap",
            maxWidth: "1000px",
            marginBottom: "10px",
          }}
        >
          {[...sareeImages, ...sareeImages].map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Saree ${index + 1}`}
              style={{
                width: "200px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "10px",
                display: "inline-block",
                marginRight: "20px",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


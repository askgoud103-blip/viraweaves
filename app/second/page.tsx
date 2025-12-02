"use client";

import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";

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
    "Pure Georgette10",
    "JimmiChoo",
    "Designer Sarees",
  ];

  const sareeImages = [
    "/dir.jpg",
    "/sari.jpg",
    "/mani.jpg",
    // add more if you want
  ];

  // Ref for auto-scroll
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      el.scrollLeft += 1; // change speed here
    }, 20);

    return () => clearInterval(interval);
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
          paddingTop: "100px", // space below fixed navbar
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

        {/* Top Thumbnails Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "20px",
            width: "100%",
            maxWidth: "1000px",
            marginBottom: "40px",
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
                padding: "10px",
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
                  marginTop: "0.5rem",
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

        {/* Horizontal Auto-scroll Saree Row */}
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            marginBottom: "40px",
            maxWidth: "1000px",
          }}
        >
          <div
            ref={scrollRef}
            style={{
              display: "flex",
              gap: "20px",
              whiteSpace: "nowrap",
            }}
          >
            {[...sareeImages, ...sareeImages].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Saree ${index + 1}`}
                style={{
                  width: "200px",
                  height: "120px", // reduced height
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


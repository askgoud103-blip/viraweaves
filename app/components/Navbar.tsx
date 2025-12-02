"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const menuItems = ["Home", "Collections", "About", "Contact"];

  const handleNavigate = (item: string) => {
    if (item === "Home") router.push("/");
    else router.push(`/${item.toLowerCase()}`);
    setIsOpen(false);
  };

  return (
    <>
      <nav
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          backgroundColor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "12px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            onClick={() => router.push("/")}
          >
            Vira
            <span
              style={{
                display: "inline-block",
                color: "#ff79b0",
                animation: "wave 1.2s infinite ease-in-out",
              }}
            >
              ~
            </span>
            Weaves
          </h2>
          <img 
  src="/dir.jpg"
  alt="Logo Image"
  style={{
    height: "100px",     // you can change height
    width: "80px",
    borderRadius: "8px",
    margin: "0 15px",   // spacing left & right
  }}
/>


          {/* Desktop Menu */}
          <div
            className="desktopMenu"
            style={{ display: "flex", gap: "20px", alignItems: "center" }}
          >
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigate(item)}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "1rem",
                  padding: "4px 0",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff79b0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
              >
                {item}
              </button>
            ))}

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "12px", marginLeft: "20px" }}>
              <FaInstagram
                size={20}
                color="white"
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff79b0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
              />
              <FaWhatsapp
                size={20}
                color="white"
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff79b0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
              />
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: "none",
              fontSize: "1.8rem",
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            className="mobileHamburger"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100%",
              width: "220px",
              backgroundColor: "rgba(0,0,0,0.95)",
              display: "flex",
              flexDirection: "column",
              padding: "40px 20px",
              zIndex: 999,
              transition: "transform 0.3s ease",
            }}
          >
            <button
              style={{
                fontSize: "1.8rem",
                color: "white",
                background: "none",
                border: "none",
                alignSelf: "flex-end",
                cursor: "pointer",
                marginBottom: "30px",
              }}
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>

            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigate(item)}
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "white",
                  background: "none",
                  border: "none",
                  marginBottom: "20px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff79b0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
              >
                {item}
              </button>
            ))}

            {/* Social Icons Mobile */}
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <FaInstagram
                size={22}
                color="white"
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff79b0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
              />
              <FaWhatsapp
                size={22}
                color="white"
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff79b0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
              />
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @keyframes wave {
          0% { transform: rotate(-15deg) translateY(0); }
          50% { transform: rotate(15deg) translateY(-5px); }
          100% { transform: rotate(-15deg) translateY(0); }
        }

        @media (max-width: 768px) {
          .desktopMenu { display: none !important; }
          .mobileHamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const menuItems = ["Home", "Collections", "About", "Contact"];

  const handleNavigate = (item: string) => {
    router.push(item === "Home" ? "/" : `/${item.toLowerCase()}`);
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
          display: "flex",
          justifyContent: "center",
          padding: "12px 20px",
          height: "80px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <div
            style={{ cursor: "pointer", lineHeight: 1.2 }}
            onClick={() => router.push("/")}
          >
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: "bold",
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                margin: 0,
              }}
            >
              Vira{" "}
              <span
                style={{
                  color: "#ff79b0",
                  animation: "wave 1.2s infinite ease-in-out",
                }}
              >
                ~
              </span>{" "}
              Weaves
            </h2>
            <h4
              style={{
                color: "white",
                fontSize: "0.9rem",
                opacity: 0.9,
                marginTop: "-2px",
              }}
            >
              Drape Yourself in Perfection
            </h4>
          </div>

          {/* Desktop Menu */}
          <div
            className="desktopMenu"
            style={{
              display: "flex",
              gap: "25px",
              alignItems: "center",
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "500",
            }}
          >
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigate(item)}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {item}
              </button>
            ))}

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "12px", marginLeft: "20px" }}>
              <FaInstagram size={20} color="white" />
              <FaWhatsapp size={20} color="white" />
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobileHamburger"
            style={{
              display: "none",
              fontSize: "1.8rem",
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          style={{
            position: "fixed",
            top: 0,
            right: isOpen ? "0" : "-300px",
            height: "100vh",
            width: "230px",
            backgroundColor: "rgba(0,0,0,0.95)",
            display: "flex",
            flexDirection: "column",
            padding: "40px 20px",
            transition: "right 0.3s ease",
            zIndex: 2000,
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              fontSize: "1.8rem",
              color: "white",
              alignSelf: "flex-end",
              background: "none",
              border: "none",
              marginBottom: "30px",
              cursor: "pointer",
            }}
          >
            ×
          </button>

          {/* Mobile Links */}
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNavigate(item)}
              style={{
                marginBottom: "20px",
                color: "white",
                background: "none",
                border: "none",
                fontSize: "1.2rem",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              {item}
            </button>
          ))}

          {/* Social Icons */}
          <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
            <FaInstagram size={22} color="white" />
            <FaWhatsapp size={22} color="white" />
          </div>
        </div>
      </nav>

      {/* Keyframes for logo wave */}
      <style>{`
        @keyframes wave {
          0% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
          100% { transform: rotate(-15deg); }
        }

        @media (max-width: 768px) {
          .desktopMenu { display: none !important; }
          .mobileHamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}


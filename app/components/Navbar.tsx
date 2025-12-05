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
            Vira{" "}
            <span
              style={{
                display: "inline-block",
                color: "#ff79b0",
                animation: "wave 1.2s infinite ease-in-out",
              }}
            >
              ~
            </span>{" "}
            Weaves
          </h2>

          {/* Logo Image */}
          <img
  src="/dir.jpg"
  alt="Logo"
  style={{
    height: "80px",
    width: "65px",
    borderRadius: "8px",
    margin: "0 5px 0 -10px", // moved left
  }}
/>


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
  <button onClick={() => handleNavigate("Home")} className="menuItem">
    Home
  </button>
  <button onClick={() => handleNavigate("Collections")} className="menuItem">
    Collections
  </button>
  <button onClick={() => handleNavigate("About")} className="menuItem">
    About
  </button>
  <button onClick={() => handleNavigate("Contact")} className="menuItem">
    Contact
  </button>

  {/* Social Icons */}
  <div style={{ display: "flex", gap: "12px", marginLeft: "20px" }}>
    <FaInstagram size={20} color="white" style={{ cursor: "pointer" }} />
    <FaWhatsapp size={20} color="white" style={{ cursor: "pointer" }} />
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
          {/* Close */}
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
              className="mobileMenuItem"
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


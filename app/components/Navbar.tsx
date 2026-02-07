"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { COLORS } from "@/lib/colors";
import Image from "next/image";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const mainLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
  ];
  const hiddenLinks = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Close drawer if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        backgroundColor: COLORS.maroon,
        borderBottom: `2px solid ${COLORS.gold}`,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
       <Link href="/" style={{ display: "flex", alignItems: "center" }}>
  <Image
  src="/logo.png"
  alt="Viraweaves Logo"
  width={42}
  height={42}
  className="logoHover"
  style={{
    borderRadius: "50%",
    objectFit: "contain",
    cursor: "pointer",
  }}
/>

</Link>


        {/* Desktop Menu */}
        <div className="desktopMenu" style={{ display: "flex", gap: "28px" }}>
          {[...mainLinks, ...hiddenLinks].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              style={{
                color: COLORS.cream,
                fontSize: "0.95rem",
                fontWeight: 500,
                textDecoration: "none",
                borderBottom: "2px solid transparent",
                paddingBottom: "4px",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobileHamburger"
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: COLORS.cream,
            fontSize: "1.8rem",
          }}
        >
          ☰
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        style={{
          position: "fixed",
          top: 0,
          right: open ? 0 : "-250px",
          height: "100vh",
          width: "220px",
          backgroundColor: COLORS.maroon,
          padding: "60px 20px 20px", // top padding for contact visibility
          transition: "0.3s",
          boxShadow: "-5px 0 15px rgba(0,0,0,0.3)",
          borderLeft: `3px solid ${COLORS.gold}`,
          zIndex: 60,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          style={{
            background: "none",
            border: "none",
            color: COLORS.cream,
            fontSize: "1.6rem",
            marginBottom: "30px",
          }}
        >
          ×
        </button>

        {/* All links for mobile */}
        {[...mainLinks, ...hiddenLinks].map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              marginBottom: "20px",
              color: COLORS.cream,
              textDecoration: "none",
              fontSize: "1rem",
              wordBreak: "break-word",
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktopMenu { display:none !important; }
          .mobileHamburger { display:block !important; }
        }
      `}</style>
    </nav>
  );
}


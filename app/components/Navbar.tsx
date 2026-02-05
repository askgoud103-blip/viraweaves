"use client";

import { useState } from "react";
import Link from "next/link";
import { COLORS } from "@/lib/colors";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menu = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];


  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        backgroundColor: COLORS.maroon,
        borderBottom: `1px solid ${COLORS.gold}`,
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
        <Link
          href="/"
          style={{
            fontSize: "1.4rem",
            fontWeight: 700,
            letterSpacing: "1px",
            color: COLORS.cream,
            textDecoration: "none",
          }}
        >
          Viraweaves
        </Link>

        {/* Desktop Menu */}
        <div className="desktopMenu" style={{ display: "flex", gap: "28px" }}>
          {menu.map((item) => (
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

        {/* Hamburger */}
        <button
          className="mobileHamburger"
          onClick={() => setOpen(true)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: COLORS.cream,
            fontSize: "1.6rem",
          }}
        >
          ☰
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: open ? 0 : "-260px",
          height: "100vh",
          width: "220px",
          backgroundColor: COLORS.maroon,
          padding: "30px 20px",
          transition: "0.3s",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          style={{
            background: "none",
            border: "none",
            color: COLORS.cream,
            fontSize: "1.5rem",
            marginBottom: "30px",
          }}
        >
          ×
        </button>

        {menu.map((item) => (
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
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktopMenu { display:none }
          .mobileHamburger { display:block }
        }
      `}</style>
    </nav>
  );
}


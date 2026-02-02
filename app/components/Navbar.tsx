// app/components/Navbar.tsx

"use client";

import Link from "next/link";
import { COLORS } from "@/lib/colors";

export default function Navbar() {
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
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO / BRAND */}
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

        {/* MENU */}
        <div style={{ display: "flex", gap: "28px" }}>
          {[
            { name: "Collections", href: "/collections" },
            { name: "Sarees", href: "/category/sarees" },
            { name: "About", href: "/about" },
            { name: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              style={{
                color: COLORS.cream,
                fontSize: "0.95rem",
                fontWeight: 500,
                textDecoration: "none",
                borderBottom: "2px solid transparent",
                paddingBottom: "2px",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.borderBottom = `2px solid ${COLORS.gold}`)
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.borderBottom = "2px solid transparent")
              }
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}


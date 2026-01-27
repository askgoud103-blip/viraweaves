"use client";

import React from "react";

export default function SecondPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "3rem",
        fontWeight: 700,
      }}
    >
      Vira{" "}
      <span
        style={{
          display: "inline-block",
          transform: "rotate(-10deg)",
          color: "#ff69b4",
        }}
      >
        ~
      </span>
    </div>
  );
}


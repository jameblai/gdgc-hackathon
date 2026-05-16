// since it uses usestate and useRef, need use client

"use client";

// import shadcn libarries

import * as React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";


// textboxes default
function Input({ placeholder, value, onChange, type = "text" }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%",
        padding: "11px 14px",
        borderRadius: "8px",
        border: focused
          ? "1px solid rgba(255,255,255,0.6)"
          : "1px solid rgba(255,255,255,0.25)",
        background: focused
          ? "rgba(255,255,255,0.18)"
          : "rgba(255,255,255,0.12)",
        color: "#fff",
        fontSize: "14px",
        outline: "none",
        boxSizing: "border-box",
        transition: "all 0.2s ease",
        letterSpacing: "0.01em",
      }}
    />
  );
}

// font properties for headings and sub headings
function Label({ children, sub }) {
  return (
    <div style={{ marginBottom: sub ? "4px" : "8px" }}>
      <span
        style={{
          fontSize: sub ? "12px" : "14px",
          fontWeight: sub ? 400 : 600,
          color: sub ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.92)",
          letterSpacing: "0.02em",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {children}
      </span>
    </div>
  );
}

// orienting the textboxes and labels in a column, with spacing
function FieldGroup({ children, style }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", ...style }}>
      {children}
    </div>
  );
}

// regestry form
export default function LoginPage() {
  const [username, setUsername]   = useState("");
  const [password, setPassword]   = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a1628 0%, #0d2347 50%, #0a1a3a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 16px",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Card */}
      <div
        style={{
          width: "70%",
          maxWidth: "900px",
          minWidth: "320px",
          background:
            "linear-gradient(160deg, rgba(30,80,180,0.82) 0%, rgba(15,50,140,0.92) 60%, rgba(10,30,100,0.96) 100%)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          border: "1px solid rgba(100,160,255,0.2)",
          boxShadow: "0 8px 80px rgba(0,0,100,0.5), 0 2px 0 rgba(255,255,255,0.08) inset",
          padding: "0 0 48px 0",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {/* Top glow */}
        <div
          style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "60%", height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(120,180,255,0.8), transparent)",
          }}
        />

]

        {/* Heading */}
        <div style={{ textAlign: "center", padding: "16px 40px 28px" }}>
          <h1
            style={{
              margin: "0 0 10px",
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: 700, color: "#fff",
              letterSpacing: "-0.02em", lineHeight: 1.2,
            }}
          >
            Log into your account:
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "clamp(13px, 1.5vw, 15px)",
              color: "rgba(180,210,255,0.75)",
              lineHeight: 1.6, maxWidth: "520px", marginInline: "auto",
            }}
          >
            Input your username and password to log in.
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px", background: "rgba(100,160,255,0.15)",
            marginInline: "40px", marginBottom: "32px",
          }}
        />

        {/* Form */}
        <div style={{ padding: "0 40px", display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Username */}
          <FieldGroup>
            <Label>Username:</Label>
            <Input placeholder="Username" value={username} onChange={setUsername} />
          </FieldGroup>

          {/* Password */}
          <FieldGroup>
            <Label>Password:</Label>
            <Input placeholder="Password" type="password" value={password} onChange={setPassword} />
          </FieldGroup>

          {/* Log in */}
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "8px" }}>
            <button
              style={{
                padding: "14px 56px",
                background: "linear-gradient(135deg, #e02020 0%, #c0392b 100%)",
                color: "#fff", border: "none", borderRadius: "10px",
                fontSize: "16px", fontWeight: 700, letterSpacing: "0.04em",
                cursor: "pointer",
                boxShadow: "0 4px 24px rgba(200,30,30,0.45), 0 1px 0 rgba(255,255,255,0.15) inset",
                transition: "all 0.2s ease",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform  = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(200,30,30,0.55), 0 1px 0 rgba(255,255,255,0.15) inset";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform  = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(200,30,30,0.45), 0 1px 0 rgba(255,255,255,0.15) inset";
              }}
            >
              Register
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
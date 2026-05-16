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
        border: "1px solid #1A1A1A",
        background: "#FFFFFF",
        color: "#4f4f4f",
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
          color: "#1A1A1A",
          letterSpacing: "0.02em",
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
    <div
      style={{ display: "flex", flexDirection: "column", gap: "6px", ...style }}
    >
      {children}
    </div>
  );
}

// regestry form
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 16px",
        boxSizing: "border-box",
      }}
    >
      {/* Card */}
      <div
        style={{
          width: "70%",
          maxWidth: "500px",
          minWidth: "320px",
          background: "#FFFFFF",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          border: "1px solid #1A1A1A",
          padding: "0 0 48px 0",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {/* Heading */}
        <div style={{ textAlign: "center", padding: "16px 40px 28px" }}>
          <h1 className="py-6 md:py-10"
            
            style={{
              margin: "0 0 10px",
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: 700,
              color: "#1A1A1A",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Log into your account:
          </h1>
          <p
            
            style={{
              margin: 0,
              fontSize: "clamp(13px, 1.5vw, 15px)",
              color: "#1A1A1A",
              lineHeight: 1.6,
              maxWidth: "400px",
              marginInline: "auto",
            }}
          >
            Input your username and password to log in.
          </p>
        </div>
        {/* Form */}
        <div
          style={{
            padding: "0 40px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* Username */}
          <FieldGroup>
            <Label >Username:</Label>
            <Input
              
              placeholder="Username"
              value={username}
              onChange={setUsername}
            />
          </FieldGroup>

          {/* Password */}
          <FieldGroup>
            <Label >Password:</Label>
            <Input
              
              placeholder="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />
          </FieldGroup>

          {/* Log in */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "8px",
            }}
          >
            <button
              
              style={{
                padding: "14px 56px",
                background: "#1A1A1A",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Register
            </button>
          </div>
          {/* register instead */}
          <FieldGroup>
            <p style ={{ textAlign: "center" }}>Need an account? <a href="/features/register" style ={{ color: "#0867da" }}>Register here</a></  p>
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}

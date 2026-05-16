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

// ── Shadcn date picker ────────────────────────────────────────────────────────

interface DatePickerSimpleProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

// date time picker
export function DatePickerSimple({ date, setDate }: DatePickerSimpleProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Field>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            type="button" // Prevents accidental form submissions
            style={{
              width: "100%",
              justifyContent: "flex-start",
              fontWeight: 400,
              background: "rgba(255,255,255,0.12)",
              border: "5px solid rgba(255,255,255,0.25)",
              color: date ? "#fff" : "rgba(255,255,255,0.5)",
              borderRadius: "8px",
              padding: "11px 14px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            {date ? format(date, "PPP") : <span>Select date</span>}
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-auto p-0 overflow-hidden" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date || new Date()}
            captionLayout="dropdown"
            // Important for birthdates: sets the select dropdown ranges
            fromYear={1940} 
            toYear={new Date().getFullYear()}
            onSelect={(selectedDate) => {
              setDate(selectedDate)
              setOpen(false) // Automatically closes drop menu on select
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}

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
export default function RegistrationPage() {
  const [photo, setPhoto]         = useState(null);
  const [name, setName]           = useState("");
  const [username, setUsername]   = useState("");
  const [password, setPassword]   = useState("");
  const [dob, setDob]             = useState(undefined);   // ← replaces day/month/year
  const [skills, setSkills]       = useState("");
  const [occupation, setOccupation] = useState("");
  const [company, setCompany]     = useState("");
  const fileRef = useRef();

  const handlePhotoClick  = () => fileRef.current?.click();
  const handleFileChange  = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

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

        {/* Profile photo */}
        <div
          style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            paddingTop: "48px", paddingBottom: "8px",
          }}
        >
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <button
            onClick={handlePhotoClick}
            style={{
              width: "110px", height: "110px", borderRadius: "50%",
              background: photo
                ? `url(${photo}) center/cover`
                : "radial-gradient(circle at 60% 35%, rgba(120,170,255,0.25), rgba(30,60,160,0.6))",
              border: "3px solid rgba(120,180,255,0.45)",
              boxShadow: "0 4px 32px rgba(60,120,255,0.3), 0 0 0 6px rgba(60,120,255,0.08)",
              cursor: "pointer",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "6px", transition: "all 0.25s ease",
              position: "relative", overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(160,210,255,0.7)";
              e.currentTarget.style.transform   = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(120,180,255,0.45)";
              e.currentTarget.style.transform   = "scale(1)";
            }}
          >
            {!photo && (
              <>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.45)" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(255,255,255,0.35)" />
                </svg>
                <div
                  style={{
                    position: "absolute", bottom: "14px",
                    background: "rgba(60,130,255,0.85)",
                    borderRadius: "50%", width: "28px", height: "28px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,80,0.4)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 16 12 12 8 16" />
                    <line x1="12" y1="12" x2="12" y2="21" />
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                  </svg>
                </div>
              </>
            )}
            {photo && (
              <div
                style={{
                  position: "absolute", inset: 0,
                  background: "rgba(0,0,0,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "50%", opacity: 0, transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
            )}
          </button>
          <p style={{ marginTop: "10px", fontSize: "12px", color: "rgba(180,210,255,0.7)", letterSpacing: "0.04em" }}>
            Click to change photo
          </p>
        </div>

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
            Create your account:
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "clamp(13px, 1.5vw, 15px)",
              color: "rgba(180,210,255,0.75)",
              lineHeight: 1.6, maxWidth: "520px", marginInline: "auto",
            }}
          >
            Tell us about yourself to help you get verified, so that you can find the services you need.
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

          {/* Name */}
          <FieldGroup>
            <Label>Name:</Label>
            <Input placeholder="Your full name" value={name} onChange={setName} />
          </FieldGroup>

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

          {/* Date of birth — shadcn picker */}
          <FieldGroup>
            <Label>Date of Birth:</Label>
            <DatePickerSimple date={dob} setDate={setDob} />
          </FieldGroup>

          {/* Skills */}
          <FieldGroup>
            <Label>Skills:</Label>
            <Label sub>
              If you aren't interested in selling any services, you can leave this section empty. (if you intend on providing more than one service, separate them with commas)
            </Label>
            <Input
              placeholder="e.g. Web Design, Plumbing, Tutoring…"
              value={skills}
              onChange={setSkills}
            />
          </FieldGroup>

          {/* Occupation */}
          <FieldGroup>
            <Label>Occupation:</Label>
            <Input placeholder="Your current occupation" value={occupation} onChange={setOccupation} />
          </FieldGroup>

          {/* Company */}
          <FieldGroup>
            <Label>Company:</Label>
            <Input placeholder="Your company or organisation" value={company} onChange={setCompany} />
          </FieldGroup>

          {/* Register */}
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
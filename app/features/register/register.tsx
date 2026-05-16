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
<<<<<<< HEAD
  const [open, setOpen] = React.useState(false);
=======
  const [open, setOpen] = React.useState(false)
>>>>>>> 1c6a78d (Add registration page)

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
<<<<<<< HEAD

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
=======
        
        <PopoverContent className="w-auto p-0 overflow-hidden" align="start">
>>>>>>> 1c6a78d (Add registration page)
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date || new Date()}
            captionLayout="dropdown"
            // Important for birthdates: sets the select dropdown ranges
<<<<<<< HEAD
            fromYear={1940}
            toYear={new Date().getFullYear()}
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              setOpen(false); // Automatically closes drop menu on select
=======
            fromYear={1940} 
            toYear={new Date().getFullYear()}
            onSelect={(selectedDate) => {
              setDate(selectedDate)
              setOpen(false) // Automatically closes drop menu on select
>>>>>>> 1c6a78d (Add registration page)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </Field>
<<<<<<< HEAD
  );
=======
  )
>>>>>>> 1c6a78d (Add registration page)
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
<<<<<<< HEAD
    <div
      style={{ display: "flex", flexDirection: "column", gap: "6px", ...style }}
    >
=======
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", ...style }}>
>>>>>>> 1c6a78d (Add registration page)
      {children}
    </div>
  );
}

// regestry form
export default function RegistrationPage() {
<<<<<<< HEAD
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(undefined); // ← replaces day/month/year
  const [skills, setSkills] = useState("");
  const [occupation, setOccupation] = useState("");
  const [company, setCompany] = useState("");
  const fileRef = useRef();

  const handlePhotoClick = () => fileRef.current?.click();
  const handleFileChange = (e) => {
=======
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
>>>>>>> 1c6a78d (Add registration page)
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
<<<<<<< HEAD
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d2347 50%, #0a1a3a 100%)",
=======
        background: "linear-gradient(135deg, #0a1628 0%, #0d2347 50%, #0a1a3a 100%)",
>>>>>>> 1c6a78d (Add registration page)
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
<<<<<<< HEAD
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
=======
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
>>>>>>> 1c6a78d (Add registration page)
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
<<<<<<< HEAD
          boxShadow:
            "0 8px 80px rgba(0,0,100,0.5), 0 2px 0 rgba(255,255,255,0.08) inset",
=======
          boxShadow: "0 8px 80px rgba(0,0,100,0.5), 0 2px 0 rgba(255,255,255,0.08) inset",
>>>>>>> 1c6a78d (Add registration page)
          padding: "0 0 48px 0",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {/* Top glow */}
        <div
          style={{
<<<<<<< HEAD
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, rgba(120,180,255,0.8), transparent)",
=======
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "60%", height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(120,180,255,0.8), transparent)",
>>>>>>> 1c6a78d (Add registration page)
          }}
        />

        {/* Profile photo */}
        <div
          style={{
<<<<<<< HEAD
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "48px",
            paddingBottom: "8px",
=======
            display: "flex", flexDirection: "column", alignItems: "center",
            paddingTop: "48px", paddingBottom: "8px",
>>>>>>> 1c6a78d (Add registration page)
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
<<<<<<< HEAD
              width: "110px",
              height: "110px",
              borderRadius: "50%",
=======
              width: "110px", height: "110px", borderRadius: "50%",
>>>>>>> 1c6a78d (Add registration page)
              background: photo
                ? `url(${photo}) center/cover`
                : "radial-gradient(circle at 60% 35%, rgba(120,170,255,0.25), rgba(30,60,160,0.6))",
              border: "3px solid rgba(120,180,255,0.45)",
<<<<<<< HEAD
              boxShadow:
                "0 4px 32px rgba(60,120,255,0.3), 0 0 0 6px rgba(60,120,255,0.08)",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              transition: "all 0.25s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(160,210,255,0.7)";
              e.currentTarget.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(120,180,255,0.45)";
              e.currentTarget.style.transform = "scale(1)";
=======
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
>>>>>>> 1c6a78d (Add registration page)
            }}
          >
            {!photo && (
              <>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.45)" />
<<<<<<< HEAD
                  <path
                    d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                    fill="rgba(255,255,255,0.35)"
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    bottom: "14px",
                    background: "rgba(60,130,255,0.85)",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,80,0.4)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
=======
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
>>>>>>> 1c6a78d (Add registration page)
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
<<<<<<< HEAD
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  opacity: 0,
                  transition: "opacity 0.2s",
=======
                  position: "absolute", inset: 0,
                  background: "rgba(0,0,0,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "50%", opacity: 0, transition: "opacity 0.2s",
>>>>>>> 1c6a78d (Add registration page)
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              >
<<<<<<< HEAD
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                >
=======
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
>>>>>>> 1c6a78d (Add registration page)
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
            )}
          </button>
<<<<<<< HEAD
          <p
            style={{
              marginTop: "10px",
              fontSize: "12px",
              color: "rgba(180,210,255,0.7)",
              letterSpacing: "0.04em",
            }}
          >
=======
          <p style={{ marginTop: "10px", fontSize: "12px", color: "rgba(180,210,255,0.7)", letterSpacing: "0.04em" }}>
>>>>>>> 1c6a78d (Add registration page)
            Click to change photo
          </p>
        </div>

        {/* Heading */}
        <div style={{ textAlign: "center", padding: "16px 40px 28px" }}>
          <h1
            style={{
              margin: "0 0 10px",
              fontSize: "clamp(20px, 3vw, 28px)",
<<<<<<< HEAD
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
=======
              fontWeight: 700, color: "#fff",
              letterSpacing: "-0.02em", lineHeight: 1.2,
>>>>>>> 1c6a78d (Add registration page)
            }}
          >
            Create your account:
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "clamp(13px, 1.5vw, 15px)",
              color: "rgba(180,210,255,0.75)",
<<<<<<< HEAD
              lineHeight: 1.6,
              maxWidth: "520px",
              marginInline: "auto",
            }}
          >
            Tell us about yourself to help you get verified, so that you can
            find the services you need.
=======
              lineHeight: 1.6, maxWidth: "520px", marginInline: "auto",
            }}
          >
            Tell us about yourself to help you get verified, so that you can find the services you need.
>>>>>>> 1c6a78d (Add registration page)
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
<<<<<<< HEAD
            height: "1px",
            background: "rgba(100,160,255,0.15)",
            marginInline: "40px",
            marginBottom: "32px",
=======
            height: "1px", background: "rgba(100,160,255,0.15)",
            marginInline: "40px", marginBottom: "32px",
>>>>>>> 1c6a78d (Add registration page)
          }}
        />

        {/* Form */}
<<<<<<< HEAD
        <div
          style={{
            padding: "0 40px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* Name */}
          <FieldGroup>
            <Label>Name:</Label>
            <Input
              placeholder="Your full name"
              value={name}
              onChange={setName}
            />
=======
        <div style={{ padding: "0 40px", display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Name */}
          <FieldGroup>
            <Label>Name:</Label>
            <Input placeholder="Your full name" value={name} onChange={setName} />
>>>>>>> 1c6a78d (Add registration page)
          </FieldGroup>

          {/* Username */}
          <FieldGroup>
            <Label>Username:</Label>
<<<<<<< HEAD
            <Input
              placeholder="Username"
              value={username}
              onChange={setUsername}
            />
=======
            <Input placeholder="Username" value={username} onChange={setUsername} />
>>>>>>> 1c6a78d (Add registration page)
          </FieldGroup>

          {/* Password */}
          <FieldGroup>
            <Label>Password:</Label>
<<<<<<< HEAD
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />
=======
            <Input placeholder="Password" type="password" value={password} onChange={setPassword} />
>>>>>>> 1c6a78d (Add registration page)
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
<<<<<<< HEAD
              If you aren't interested in selling any services, you can leave
              this section empty. (if you intend on providing more than one
              service, separate them with commas)
=======
              If you aren't interested in selling any services, you can leave this section empty. (if you intend on providing more than one service, separate them with commas)
>>>>>>> 1c6a78d (Add registration page)
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
<<<<<<< HEAD
            <Input
              placeholder="Your current occupation"
              value={occupation}
              onChange={setOccupation}
            />
=======
            <Input placeholder="Your current occupation" value={occupation} onChange={setOccupation} />
>>>>>>> 1c6a78d (Add registration page)
          </FieldGroup>

          {/* Company */}
          <FieldGroup>
            <Label>Company:</Label>
<<<<<<< HEAD
            <Input
              placeholder="Your company or organisation"
              value={company}
              onChange={setCompany}
            />
          </FieldGroup>

          {/* Register */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "8px",
            }}
          >
=======
            <Input placeholder="Your company or organisation" value={company} onChange={setCompany} />
          </FieldGroup>

          {/* Register */}
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "8px" }}>
>>>>>>> 1c6a78d (Add registration page)
            <button
              style={{
                padding: "14px 56px",
                background: "linear-gradient(135deg, #e02020 0%, #c0392b 100%)",
<<<<<<< HEAD
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                cursor: "pointer",
                boxShadow:
                  "0 4px 24px rgba(200,30,30,0.45), 0 1px 0 rgba(255,255,255,0.15) inset",
=======
                color: "#fff", border: "none", borderRadius: "10px",
                fontSize: "16px", fontWeight: 700, letterSpacing: "0.04em",
                cursor: "pointer",
                boxShadow: "0 4px 24px rgba(200,30,30,0.45), 0 1px 0 rgba(255,255,255,0.15) inset",
>>>>>>> 1c6a78d (Add registration page)
                transition: "all 0.2s ease",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
<<<<<<< HEAD
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(200,30,30,0.55), 0 1px 0 rgba(255,255,255,0.15) inset";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 24px rgba(200,30,30,0.45), 0 1px 0 rgba(255,255,255,0.15) inset";
=======
                e.currentTarget.style.transform  = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(200,30,30,0.55), 0 1px 0 rgba(255,255,255,0.15) inset";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform  = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(200,30,30,0.45), 0 1px 0 rgba(255,255,255,0.15) inset";
>>>>>>> 1c6a78d (Add registration page)
              }}
            >
              Register
            </button>
          </div>
<<<<<<< HEAD
=======

>>>>>>> 1c6a78d (Add registration page)
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 1c6a78d (Add registration page)

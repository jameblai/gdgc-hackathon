// since it uses usestate and useRef, need use client

"use client";

// import shadcn libarries

import * as React from "react";
import { type CSSProperties, type ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
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
  const [open, setOpen] = React.useState(false);

  return (
    <Field>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              id="date"
              style={{
                width: "100%",
                justifyContent: "flex-start",
                fontWeight: 400,
                background: "rgb(255, 255, 255)",
                border: "1px solid rgb(0, 0, 0)",
                color: date ? "#000000" : "rgb(0, 0, 0)",
                borderRadius: "8px",
                padding: "11px 14px",
                fontSize: "14px",
                cursor: "pointer",
              }}
              type="button"
              variant="outline"
            />
          }
        >
          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
          {date ? format(date, "PPP") : <span>Select date</span>}
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date || new Date()}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              setOpen(false); // Automatically closes drop menu on select
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}

// textboxes default
function Input({
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  value: string;
}) {
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
        border: "1px solid rgb(0, 0, 0)",
        background: "rgb(255, 255, 255)",
        color: "#000000",
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
function Label({
  children,
  sub = false,
}: {
  children: React.ReactNode;
  sub?: boolean;
}) {
  return (
    <div style={{ marginBottom: sub ? "4px" : "8px" }}>
      <span
        style={{
          fontSize: sub ? "12px" : "14px",
          fontWeight: sub ? 400 : 600,
          color: "rbg(0,0,0)",
          letterSpacing: "0.02em",
        }}
      >
        {children}
      </span>
    </div>
  );
}

// orienting the textboxes and labels in a column, with spacing
function FieldGroup({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "6px", ...style }}
    >
      {children}
    </div>
  );
}

// regestry form
export default function RegistrationPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined); // ← replaces day/month/year
  const [domains, setDomains] = useState("");
  const [occupation, setOccupation] = useState("");
  const [company, setCompany] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => fileRef.current?.click();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "rgb(255,255,255)",
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
          maxWidth: "700px",
          minWidth: "320px",
          background: "#ffffff",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          border: "1px solid rgb(0, 0, 0)",
          padding: "0 0 48px 0",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {/* Profile photo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "48px",
            paddingBottom: "8px",
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
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              background: photo
                ? `url(${photo}) center/cover`
                : "radial-gradient(circle at 60% 35%, rgba(150, 150, 150, 1), rgba(150, 150, 150, 0.8))",
              border: "3px solid rgba(150, 150, 150, 0.6)",
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
          >
            {!photo && (
              <>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.45)" />
                  <path
                    d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                    fill="rgba(255,255,255,0.35)"
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    bottom: "14px",
                    background: "rgba(0,0,0)",
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
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  opacity: 0,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
            )}
          </button>
          <p
            style={{
              marginTop: "10px",
              fontSize: "12px",
              color: "rgb(0, 0, 0)",
              letterSpacing: "0.04em",
            }}
          >
            Click to change photo
          </p>
        </div>

        {/* Heading */}
        <div style={{ textAlign: "center", padding: "16px 40px 28px" }}>
          <h1
            style={{
              margin: "0 0 10px",
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: 700,
              color: "#000000",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Create your account:
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "clamp(13px, 1.5vw, 15px)",
              color: "rgb(0, 0, 0)",
              lineHeight: 1.6,
              maxWidth: "520px",
              marginInline: "auto",
            }}
          >
            Tell us about yourself to help you get verified, so that you can
            find the services you need.
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
          {/* Name */}
          <FieldGroup>
            <Label>Name:</Label>
            <Input
              placeholder="Your full name"
              value={name}
              onChange={setName}
            />
          </FieldGroup>

          {/* Username */}
          <FieldGroup>
            <Label>Username:</Label>
            <Input
              placeholder="Username"
              value={username}
              onChange={setUsername}
            />
          </FieldGroup>

          {/* Password */}
          <FieldGroup>
            <Label>Password:</Label>
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />
          </FieldGroup>

          {/* Date of birth — shadcn picker */}
          <FieldGroup>
            <Label>Date of Birth:</Label>
            <DatePickerSimple date={dob} setDate={setDob} />
          </FieldGroup>

          {/* Domains */}
          <FieldGroup>
            <Label>Domains:</Label>
            <Label sub>
              If you aren&apos;t interested in selling any services, you can
              leave this section empty. (if you intend on providing more than
              one domain, separate them with commas)
            </Label>
            <Input
              placeholder="e.g. Web Design, Plumbing, Tutoring…"
              value={domains}
              onChange={setDomains}
            />
          </FieldGroup>

          {/* Occupation */}
          <FieldGroup>
            <Label>Occupation:</Label>
            <Input
              placeholder="Your current occupation"
              value={occupation}
              onChange={setOccupation}
            />
          </FieldGroup>

          {/* Company */}
          <FieldGroup>
            <Label>Company:</Label>
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
            <button
              style={{
                padding: "14px 56px",
                background: "rgb(0, 0, 0)",
                color: "#fff",
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
          {/* login instead */}
          <FieldGroup>
            <p style={{ textAlign: "center" }}>
              Already a user?{" "}
              <a href="/features/login" style={{ color: "#0867da" }}>
                Login here
              </a>
            </p>
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}

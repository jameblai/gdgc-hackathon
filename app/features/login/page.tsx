// since it uses usestate and useRef, need use client

"use client";

// import shadcn libarries

<<<<<<< Updated upstream
import { type CSSProperties, type ReactNode } from "react";
import { useForm } from "@tanstack/react-form";
import { useAction } from "next-safe-action/hooks";

import { loginAction } from "@/lib/auth/actions";
import { loginSchema } from "@/lib/auth/schema";

// textboxes default
function Input({
  onBlur,
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  onBlur?: () => void;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  value: string;
}) {
  return (
    <input
=======
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
    <input  className = "tracking-tight"
>>>>>>> Stashed changes
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
<<<<<<< Updated upstream
      onBlur={onBlur}
=======
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
>>>>>>> Stashed changes
      style={{
        width: "100%",
        padding: "11px 14px",
        borderRadius: "8px",
        border: "1px solid #1A1A1A",
<<<<<<< Updated upstream
        background: "#FFFFFF",
=======
        background: "#F5F5f5",
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
function Label({
  children,
  sub = false,
}: {
  children: ReactNode;
  sub?: boolean;
}) {
  return (
    <div style={{ marginBottom: sub ? "4px" : "8px" }}>
      <span
=======
function Label({ children, sub }) {
  return (
    <div style={{ marginBottom: sub ? "4px" : "8px" }}>
      <span className = "tracking-tight"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
function FieldGroup({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "6px", ...style }}
    >
=======
function FieldGroup({ children, style }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", ...style }}>
>>>>>>> Stashed changes
      {children}
    </div>
  );
}

<<<<<<< Updated upstream
function renderFieldErrors(errors: unknown[]) {
  if (errors.length === 0) {
    return null;
  }

  const [error] = errors;
  const message =
    typeof error === "object" && error && "message" in error
      ? String(error.message)
      : String(error);

  return (
    <p style={{ color: "#b42318", fontSize: "12px", margin: "4px 0 0" }}>
      {message}
    </p>
  );
}

// regestry form
export default function LoginPage() {
  const action = useAction(loginAction);
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      action.execute(value);
    },
    validators: {
      onChange: loginSchema,
    },
  });

  const actionError = action.result.data?.error;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
=======
// regestry form
export default function LoginPage() {
  const [username, setUsername]   = useState("");
  const [password, setPassword]   = useState("");

  return (
    <div 
      style={{
        minHeight: "100vh",
        background: "#F5F5F5",
>>>>>>> Stashed changes
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 16px",
        boxSizing: "border-box",
      }}
    >
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
      {/* Card */}
      <div
        style={{
          width: "70%",
<<<<<<< Updated upstream
          maxWidth: "500px",
          minWidth: "320px",
          background: "#FFFFFF",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          border: "1px solid #1A1A1A",
=======
          maxWidth: "900px",
          minWidth: "320px",
          background:"#CCCCCC",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          border: "2px solid #1A1A1A",
>>>>>>> Stashed changes
          padding: "0 0 48px 0",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
<<<<<<< Updated upstream
        {/* Heading */}
        <div style={{ textAlign: "center", padding: "16px 40px 28px" }}>
          <h1
            className="py-6 md:py-10"
            style={{
              margin: "0 0 10px",
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: 700,
              color: "#1A1A1A",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
=======
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
          <h1 className = "tracking-tight"
            style={{
              margin: "0 0 10px",
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: 700, color: "#1A1A1A",
              letterSpacing: "-0.02em", lineHeight: 1.2,
>>>>>>> Stashed changes
            }}
          >
            Log into your account:
          </h1>
<<<<<<< Updated upstream
          <p
=======
          <p className = "tracking-tight"
>>>>>>> Stashed changes
            style={{
              margin: 0,
              fontSize: "clamp(13px, 1.5vw, 15px)",
              color: "#1A1A1A",
<<<<<<< Updated upstream
              lineHeight: 1.6,
              maxWidth: "400px",
              marginInline: "auto",
=======
              lineHeight: 1.6, maxWidth: "520px", marginInline: "auto",
>>>>>>> Stashed changes
            }}
          >
            Input your username and password to log in.
          </p>
        </div>
<<<<<<< Updated upstream
        {/* Form */}
        <form
          style={{
            padding: "0 40px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* Username */}
          <form.Field name="username">
            {(field) => (
              <FieldGroup>
                <Label>Username:</Label>
                <Input
                  onBlur={field.handleBlur}
                  placeholder="Username"
                  value={field.state.value}
                  onChange={field.handleChange}
                />
                {renderFieldErrors(field.state.meta.errors)}
              </FieldGroup>
            )}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => (
              <FieldGroup>
                <Label>Password:</Label>
                <Input
                  onBlur={field.handleBlur}
                  placeholder="Password"
                  type="password"
                  value={field.state.value}
                  onChange={field.handleChange}
                />
                {renderFieldErrors(field.state.meta.errors)}
              </FieldGroup>
            )}
          </form.Field>

          {actionError ? (
            <p style={{ color: "#b42318", fontSize: "12px", margin: 0 }}>
              {actionError}
            </p>
          ) : null}

          {/* Log in */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "8px",
            }}
          >
            <button
              disabled={action.isPending}
              type="submit"
              style={{
                padding: "14px 56px",
                background: "#1A1A1A",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "0.04em",
=======

        {/* Divider */}
        <div
          style={{
            height: "2px", background: "#1A1A1A",
            marginInline: "40px", marginBottom: "32px",
          }}
        />

        {/* Form */}
        <div style={{ padding: "0 40px", display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Username */}
          <FieldGroup>
            <Label className = "tracking-tight">Username:</Label>
            <Input className = "tracking-tight" placeholder="Username" value={username} onChange={setUsername} />
          </FieldGroup>

          {/* Password */}
          <FieldGroup>
            <Label className = "tracking-tight">Password:</Label>
            <Input className = "tracking-tight" placeholder="Password" type="password" value={password} onChange={setPassword} />
          </FieldGroup>

          {/* Log in */}
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "8px" }}>
            <button className = "tracking-tight"
              style={{
                padding: "14px 56px",
                background: "#1A1A1A",
                color: "#F5F5F5", border: "none", borderRadius: "10px",
                fontSize: "16px", fontWeight: 700, letterSpacing: "0.04em",
>>>>>>> Stashed changes
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
<<<<<<< Updated upstream
              {action.isPending ? "Logging in..." : "Log in"}
            </button>
          </div>
          {/* register instead */}
          <FieldGroup>
            <p style={{ textAlign: "center" }}>
              Need an account?{" "}
              <a href="/features/register" style={{ color: "#0867da" }}>
                Register here
              </a>
            </p>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
=======
              Register
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
>>>>>>> Stashed changes

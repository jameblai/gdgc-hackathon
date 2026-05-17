// since it uses usestate and useRef, need use client

"use client";

// import shadcn libarries

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
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
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
      {children}
    </div>
  );
}

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
          <h1
            className="py-6 md:py-10"
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
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {action.isPending ? "Logging in..." : "Log in"}
            </button>
          </div>
          {/* register instead */}
          <FieldGroup>
            <p style={{ textAlign: "center" }}>
              Need an account?{" "}
              <a href="/register" style={{ color: "#0867da" }}>
                Register here
              </a>
            </p>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}

// since it uses usestate and useRef, need use client

"use client";

// import shadcn libarries

import * as React from "react";
import { type CSSProperties, type ChangeEvent, useRef, useState } from "react";
<<<<<<< Updated upstream
import { useForm } from "@tanstack/react-form";
import { useAction } from "next-safe-action/hooks";
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
import { registerAction } from "@/lib/auth/actions";
import { registerSchema } from "@/lib/auth/schema";
import { TagsInput } from "@/components/ui/tags-input";
=======
>>>>>>> Stashed changes

// ── Shadcn date picker ────────────────────────────────────────────────────────

interface DatePickerSimpleProps {
  date: Date | undefined;
<<<<<<< Updated upstream
  onBlur?: () => void;
=======
>>>>>>> Stashed changes
  setDate: (date: Date | undefined) => void;
}

// date time picker
<<<<<<< Updated upstream
export function DatePickerSimple({
  date,
  onBlur,
  setDate,
}: DatePickerSimpleProps) {
=======
export function DatePickerSimple({ date, setDate }: DatePickerSimpleProps) {
>>>>>>> Stashed changes
  const [open, setOpen] = React.useState(false);

  return (
    <Field>
      <Popover open={open} onOpenChange={setOpen}>
<<<<<<< Updated upstream
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
              onBlur={onBlur}
              type="button"
              variant="outline"
            />
          }
        >
          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
          {date ? format(date, "PPP") : <span>Select date</span>}
=======
        <PopoverTrigger asChild>
          <Button
            className = "tracking-tight"
            variant="outline"
            id="date"
            type="button" // Prevents accidental form submissions
            style={{
              width: "100%",
              justifyContent: "flex-start",
              fontWeight: 400,
              background: "rgb(255, 255, 255)",
              border: "2px solid rgb(0, 0, 0)",
              color: date ? "#000000" : "rgb(0, 0, 0)",
              borderRadius: "8px",
              padding: "11px 14px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            {date ? format(date, "PPP") : <span>Select date</span>}
          </Button>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  onBlur,
=======
>>>>>>> Stashed changes
  placeholder,
  value,
  onChange,
  type = "text",
}: {
<<<<<<< Updated upstream
  onBlur?: () => void;
=======
>>>>>>> Stashed changes
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  value: string;
}) {
<<<<<<< Updated upstream
  return (
    <input
=======
  const [focused, setFocused] = useState(false);
  return (
    <input className = "tracking-tight"
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
<<<<<<< Updated upstream
        border: "1px solid rgb(0, 0, 0)",
=======
        border: "2px solid rgb(0, 0, 0)",
>>>>>>> Stashed changes
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

function validateWithSchema(schema: {
  safeParse: (
    value: unknown,
  ) =>
    | { success: true }
    | { error: { issues: Array<{ message: string }> }; success: false };
}) {
  return ({ value }: { value: unknown }) => {
    const result = schema.safeParse(value);

    if (result.success) {
      return undefined;
    }

    return result.error.issues[0]?.message;
  };
}

type RegisterFormValues = {
  company: string;
  dateOfBirth: Date | undefined;
  domains: string[];
  name: string;
  occupation: string;
  password: string;
  username: string;
};

=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      <span
=======
      <span className = "tracking-tight"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  const action = useAction(registerAction);
  const [photo, setPhoto] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const defaultValues: RegisterFormValues = {
    username: "",
    name: "",
    password: "",
    dateOfBirth: undefined,
    domains: [],
    occupation: "",
    company: "",
  };
  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      if (!value.dateOfBirth) {
        return;
      }

      action.execute({
        company: value.company,
        dateOfBirth: value.dateOfBirth,
        domains: value.domains,
        name: value.name,
        occupation: value.occupation,
        password: value.password,
        username: value.username,
      });
    },
  });

  const actionError = action.result.data?.error;
=======
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined); // ← replaces day/month/year
  const [skills, setSkills] = useState("");
  const [occupation, setOccupation] = useState("");
  const [company, setCompany] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
>>>>>>> Stashed changes

  const handlePhotoClick = () => fileRef.current?.click();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  return (
<<<<<<< Updated upstream
    <div
=======
    <div className = "tracking-tight"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
      {/* Card */}
      <div
        style={{
          width: "70%",
<<<<<<< Updated upstream
          maxWidth: "700px",
          minWidth: "320px",
          background: "#ffffff",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          border: "1px solid rgb(0, 0, 0)",
=======
          maxWidth: "900px",
          minWidth: "320px",
          background:"#CCCCCC",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          border: "2px solid rgb(0, 0, 0)",
>>>>>>> Stashed changes
          padding: "0 0 48px 0",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
<<<<<<< Updated upstream
=======
        {/* Top glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, rgba(179, 179, 179, 0.8), transparent)",
          }}
        />

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
              boxShadow:
                "0 4px 32px rgba(150, 150, 150, 0.4), 0 0 0 6px rgba(150, 150, 150, 0.2)",
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                    background: "rgba(0,0,0)",
=======
                    background: "rgba(71, 71, 71, 0.85)",
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
        {/* Form */}
        <form
=======
        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgb(0, 0, 0)",
            marginInline: "40px",
            marginBottom: "32px",
          }}
        />

        {/* Form */}
        <div
>>>>>>> Stashed changes
          style={{
            padding: "0 40px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
<<<<<<< Updated upstream
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* Name */}
          <form.Field
            name="name"
            validators={{
              onChange: validateWithSchema(registerSchema.shape.name),
              onSubmit: validateWithSchema(registerSchema.shape.name),
            }}
          >
            {(field) => (
              <FieldGroup>
                <Label>Name:</Label>
                <Input
                  onBlur={field.handleBlur}
                  placeholder="Your full name"
                  value={field.state.value}
                  onChange={field.handleChange}
                />
                {renderFieldErrors(field.state.meta.errors)}
              </FieldGroup>
            )}
          </form.Field>

          {/* Username */}
          <form.Field
            name="username"
            validators={{
              onChange: validateWithSchema(registerSchema.shape.username),
              onSubmit: validateWithSchema(registerSchema.shape.username),
            }}
          >
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
          <form.Field
            name="password"
            validators={{
              onChange: validateWithSchema(registerSchema.shape.password),
              onSubmit: validateWithSchema(registerSchema.shape.password),
            }}
          >
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

          {/* Date of birth — shadcn picker */}
          <form.Field
            name="dateOfBirth"
            validators={{
              onChange: validateWithSchema(registerSchema.shape.dateOfBirth),
              onSubmit: validateWithSchema(registerSchema.shape.dateOfBirth),
            }}
          >
            {(field) => (
              <FieldGroup>
                <Label>Date of Birth:</Label>
                <DatePickerSimple
                  date={field.state.value}
                  onBlur={field.handleBlur}
                  setDate={field.handleChange}
                />
                {renderFieldErrors(field.state.meta.errors)}
              </FieldGroup>
            )}
          </form.Field>

          {/* Domains */}
          <form.Field
            name="domains"
            validators={{
              onChange: validateWithSchema(registerSchema.shape.domains),
              onSubmit: validateWithSchema(registerSchema.shape.domains),
            }}
          >
            {(field) => (
              <FieldGroup>
                <Label>Domains:</Label>
                <Label sub>
                  If you aren&apos;t interested in selling any services, you can
                  leave this section empty. (if you intend on providing more
                  than one domain, press Enter or comma after each one)
                </Label>
                <TagsInput
                  className="min-h-[42px] rounded-[8px] border-black bg-white px-[14px] py-[8px] text-black"
                  id={field.name}
                  onBlur={field.handleBlur}
                  onValueChange={field.handleChange}
                  placeholder="e.g. Web Design, Plumbing, Tutoring..."
                  value={field.state.value}
                />
                {renderFieldErrors(field.state.meta.errors)}
              </FieldGroup>
            )}
          </form.Field>

          {/* Occupation */}
          <form.Field
            name="occupation"
            validators={{
              onChange: validateWithSchema(registerSchema.shape.occupation),
              onSubmit: validateWithSchema(registerSchema.shape.occupation),
            }}
          >
            {(field) => (
              <FieldGroup>
                <Label>Occupation:</Label>
                <Input
                  onBlur={field.handleBlur}
                  placeholder="Your current occupation"
                  value={field.state.value}
                  onChange={field.handleChange}
                />
                {renderFieldErrors(field.state.meta.errors)}
              </FieldGroup>
            )}
          </form.Field>

          {/* Company */}
          <form.Field
            name="company"
            validators={{
              onChange: validateWithSchema(registerSchema.shape.company),
              onSubmit: validateWithSchema(registerSchema.shape.company),
            }}
          >
            {(field) => (
              <FieldGroup>
                <Label>Company:</Label>
                <Input
                  onBlur={field.handleBlur}
                  placeholder="Your company or organisation"
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
=======
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

          {/* Skills */}
          <FieldGroup>
            <Label>Skills:</Label>
            <Label sub>
              If you aren&apos;t interested in selling any services, you can
              leave this section empty. (if you intend on providing more than
              one service, separate them with commas)
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
>>>>>>> Stashed changes

          {/* Register */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "8px",
            }}
          >
<<<<<<< Updated upstream
            <button
              disabled={action.isPending}
              type="submit"
=======
            <button className = "tracking-tight"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              {action.isPending ? "Creating account..." : "Register"}
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
        </form>
=======
              Register
            </button>
          </div>
        </div>
>>>>>>> Stashed changes
      </div>
    </div>
  );
}

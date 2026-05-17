// since it uses usestate and useRef, need use client

"use client";

import { useState } from "react";

// variables we will be using for verification bar

interface VerificationBarProps {
  label: string;
  subLabel: string;
  min: number;
  max: number;
  current: number;
  color?: "green" | "teal";
}

// listing info
interface Listing {
  id: number;
  title: string;
  location: string;
  imageUrl?: string;
}

// verification bar

function VerificationBar({
  label,
  subLabel,
  min,
  max,
  current,
  color = "green",
}: VerificationBarProps) {
  const pct = ((current - min) / (max - min)) * 100;

  const trackColor =
    color === "teal" ? "bg-teal-100" : "bg-emerald-100";
  const fillColor =
    color === "teal"
      ? "bg-gradient-to-r from-teal-400 to-teal-600"
      : "bg-gradient-to-r from-emerald-400 to-emerald-600";
  const dotColor =
    color === "teal" ? "bg-teal-500" : "bg-emerald-500";
  const labelColor =
    color === "teal" ? "text-teal-700" : "text-emerald-700";

  return (
    <div className="flex flex-col gap-1 min-w-[220px] w-full max-w-xs">
      <span className={`text-xs font-semibold tracking-wide ${labelColor}`}>
        {label}
      </span>
      <span className="text-[10px] text-stone-400 -mt-0.5">{subLabel}</span>
      <div className="relative flex items-center gap-2">
        {/* thumb left */}
        <span className="text-rose-500 text-base leading-none select-none">👎</span>
        {/* track */}
        <div className={`relative flex-1 h-1.5 rounded-full ${trackColor} overflow-hidden`}>
          <div
            className={`absolute left-0 top-0 h-full rounded-full ${fillColor} transition-all duration-700`}
            style={{ width: `${pct}%` }}
          />
        </div>
        {/* thumb right */}
        <span className="text-emerald-600 text-base leading-none select-none">👍</span>
      </div>
      <div className="flex justify-between text-[10px] text-stone-400 px-7">
        <span>{min}</span>
        <span className={`font-bold ${labelColor}`}>{current}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}


// listing cards
function ListingCard({ listing }: { listing: Listing }) {
  return (
    <div className="group flex flex-col gap-0 cursor-pointer">
      <div
        className="
          relative w-full h-[300px] rounded-t-2xl border-2 border-b-0 border-stone-200
          bg-stone-50 overflow-hidden
          transition-all duration-300
          group-hover:border-teal-400 group-hover:shadow-lg group-hover:-translate-y-1
        "
      >
        {listing.imageUrl ? (
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-12 h-12"
            >
              <rect x="6" y="6" width="36" height="36" rx="4" />
              <circle cx="18" cy="19" r="4" />
              <path d="M6 34 l10-10 8 8 6-6 12 10" />
            </svg>
          </div>
        )}
        {/* hover overlay */}
        <div className="absolute inset-0 bg-teal-500/0 group-hover:bg-teal-500/10 transition-all duration-300" />
      </div>

      <div className="
        rounded-b-2xl border-2 border-t-0 border-stone-200
        bg-white px-3 py-3
        transition-all duration-300
        group-hover:border-teal-400
      ">
        <p className="font-bold text-stone-800 text-sm leading-tight">
          {listing.title}
        </p>
        <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-3 h-3 text-teal-400 shrink-0"
          >
            <path d="M8 0a5 5 0 0 1 5 5c0 3-5 11-5 11S3 8 3 5a5 5 0 0 1 5-5zm0 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
          </svg>
          {listing.location}
        </p>
      </div>
    </div>
  );
}

// profile field row

interface ProfileFieldProps {
  label: string;
  value: string;
  verification?: React.ReactNode;
}

function ProfileField({ label, value, verification }: ProfileFieldProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-stone-100 gap-4">
      <div className="flex items-baseline gap-6 min-w-0">
        <span className="text-xs font-bold uppercase tracking-widest text-stone-400 shrink-0 w-28">
          {label}
        </span>
        <span className="text-stone-700 font-medium truncate">{value}</span>
      </div>
      {verification && (
        <div className="shrink-0">{verification}</div>
      )}
    </div>
  );
}

// listings data

const LISTINGS: Listing[] = [
  { id: 1, title: "Item / Service", location: "Auckland, NZ" },
  { id: 2, title: "Item / Service", location: "Wellington, NZ" },
  { id: 3, title: "Item / Service", location: "Christchurch, NZ" },
];

export default function ProfilePage() {
  const [chatHovered, setChatHovered] = useState(false);

  return (
    <div>
      {/* ── Page wrapper ── */}
      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="fade-up fade-up-1 flex items-center justify-between mb-10">
          {/* Avatar + name */}
          <div className="flex items-center gap-4">
            {/* Avatar ring */}
            <div
              className="
                w-16 h-16 rounded-full
                border-[3px] border-fuchsia-300
                bg-gradient-to-br from-fuchsia-100 to-pink-50
                flex items-center justify-center
                shadow-sm
              "
            >
              <span className="serif text-2xl italic text-fuchsia-400 select-none">K</span>
            </div>

            <div>
              <h1 className="serif text-3xl text-stone-800 leading-none">Kevin</h1>
              <p className="text-xs text-stone-400 mt-1 tracking-wide">
                Member since 16 / 05 / 2026
              </p>
            </div>
          </div>

          {/* Chat button */}
          <button
            onMouseEnter={() => setChatHovered(true)}
            onMouseLeave={() => setChatHovered(false)}
            className={`
              px-6 py-2.5 rounded-xl border-2 border-stone-800
              text-sm font-semibold tracking-wide
              transition-all duration-200
              ${chatHovered
                ? "bg-stone-800 text-white shadow-lg -translate-y-0.5"
                : "bg-transparent text-stone-800"}
            `}
          >
            {chatHovered ? "Start chat →" : "Chat"}
          </button>
        </div>

        {/* ── PROFILE FIELDS ────────────────────────────────── */}
        <div className="fade-up fade-up-2 bg-white rounded-2xl shadow-sm border border-stone-100 px-6 mb-8">
          <ProfileField
            label="Occupation"
            value="General Practitioner"
            verification={
              <VerificationBar
                label="Verified by 11 out of 12 other doctors"
                subLabel=""
                min={1}
                max={12}
                current={11}
                color="green"
              />
            }
          />
          <ProfileField
            label="Company"
            value="Auckland Medical Group"
            verification={
              <VerificationBar
                label="Verified by 5 coworkers"
                subLabel=""
                min={1}
                max={5}
                current={5}
                color="teal"
              />
            }
          />
          <ProfileField
            label="Skills"
            value="Diagnostics, Patient Care, Surgery"
            verification={
              <VerificationBar
                label="Approved by 9 out of 12 other doctors"
                subLabel=""
                min={3}
                max={12}
                current={9}
                color="green"
              />
            }
          />
          <ProfileField
            label="Seller approval"
            value="Approved seller"
            verification={
              <VerificationBar
                label="Approved by 9 out of 12 other doctors"
                subLabel=""
                min={3}
                max={12}
                current={9}
                color="green"
              />
            }
          />
        </div>

        {/* ── LISTINGS ─────────────────────────────────────── */}
        <div className="fade-up fade-up-3 ">
          <h2 className="serif text-2xl text-stone-800 mb-5">Listings</h2>

          <div className="grid grid-cols-1 display-flex gap-5" >
            {LISTINGS.map((listing, i) => (
              <div
                key={listing.id}
                className="fade-up"
                style={{ animationDelay: `${0.44 + i * 0.1}s` }}
              >
                <ListingCard listing={listing} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
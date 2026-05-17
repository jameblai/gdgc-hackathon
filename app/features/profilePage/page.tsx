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

  const trackColor = color === "teal" ? "bg-teal-100" : "bg-emerald-100";
  const fillColor =
    color === "teal"
      ? "bg-gradient-to-r from-teal-400 to-teal-600"
      : "bg-gradient-to-r from-emerald-400 to-emerald-600";
  const dotColor = color === "teal" ? "bg-teal-500" : "bg-emerald-500";
  const labelColor = color === "teal" ? "text-teal-700" : "text-emerald-700";

  return (
    <div className="flex w-full max-w-xs min-w-[220px] flex-col gap-1">
      <span className={`text-xs font-semibold tracking-wide ${labelColor}`}>
        {label}
      </span>
      <span className="-mt-0.5 text-[10px] text-stone-400">{subLabel}</span>
      <div className="relative flex items-center gap-2">
        {/* thumb left */}
        <span className="text-base leading-none text-rose-500 select-none">
          👎
        </span>
        {/* track */}
        <div
          className={`relative h-1.5 flex-1 rounded-full ${trackColor} overflow-hidden`}
        >
          <div
            className={`absolute top-0 left-0 h-full rounded-full ${fillColor} transition-all duration-700`}
            style={{ width: `${pct}%` }}
          />
        </div>
        {/* thumb right */}
        <span className="text-base leading-none text-emerald-600 select-none">
          👍
        </span>
      </div>
      <div className="flex justify-between px-7 text-[10px] text-stone-400">
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
    <div className="group flex cursor-pointer flex-col gap-0">
      <div className="relative h-[300px] w-full overflow-hidden rounded-t-2xl border-2 border-b-0 border-stone-200 bg-stone-50 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-teal-400 group-hover:shadow-lg">
        {listing.imageUrl ? (
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-stone-300">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-12 w-12"
            >
              <rect x="6" y="6" width="36" height="36" rx="4" />
              <circle cx="18" cy="19" r="4" />
              <path d="M6 34 l10-10 8 8 6-6 12 10" />
            </svg>
          </div>
        )}
        {/* hover overlay */}
        <div className="absolute inset-0 bg-teal-500/0 transition-all duration-300 group-hover:bg-teal-500/10" />
      </div>

      <div className="rounded-b-2xl border-2 border-t-0 border-stone-200 bg-white px-3 py-3 transition-all duration-300 group-hover:border-teal-400">
        <p className="text-sm leading-tight font-bold text-stone-800">
          {listing.title}
        </p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-stone-400">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-3 w-3 shrink-0 text-teal-400"
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
    <div className="flex items-center justify-between gap-4 border-b border-stone-100 py-4">
      <div className="flex min-w-0 items-baseline gap-6">
        <span className="w-28 shrink-0 text-xs font-bold tracking-widest text-stone-400 uppercase">
          {label}
        </span>
        <span className="truncate font-medium text-stone-700">{value}</span>
      </div>
      {verification && <div className="shrink-0">{verification}</div>}
    </div>
  );
}

// listings data

const LISTINGS: Listing[] = [
  {
    id: 1,
    title: "First aid kits",
    location: "Wellington CBD",
    imageUrl:
      "https://aoyko8hmkd.ufs.sh/f/StjbtwiwCO7WTOqlA8o3dVJiG42c9X0eayC6kfYgrMlvqsBL",
  },
];

export default function ProfilePage() {
  const [chatHovered, setChatHovered] = useState(false);

  return (
    <div>
      {/* ── Page wrapper ── */}
      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="fade-up fade-up-1 mb-10 flex items-center justify-between">
          {/* Avatar + name */}
          <div className="flex items-center gap-4">
            {/* Avatar ring */}
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-[3px] border-fuchsia-300 bg-gradient-to-br from-fuchsia-100 to-pink-50 shadow-sm">
              <img
                src="https://i.pravatar.cc/160?img=47"
                alt="Maya"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h1 className="serif text-3xl leading-none text-stone-800">
                Maya
              </h1>
              <p className="mt-1 text-xs tracking-wide text-stone-400">
                Member since 17 / 05 / 2026
              </p>
            </div>
          </div>

          {/* Chat button */}
          <button
            onMouseEnter={() => setChatHovered(true)}
            onMouseLeave={() => setChatHovered(false)}
            className={`rounded-xl border-2 border-stone-800 px-6 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 ${
              chatHovered
                ? "-translate-y-0.5 bg-stone-800 text-white shadow-lg"
                : "bg-transparent text-stone-800"
            } `}
          >
            {chatHovered ? "Start chat →" : "Chat"}
          </button>
        </div>

        {/* ── PROFILE FIELDS ────────────────────────────────── */}
        <div className="fade-up fade-up-2 mb-8 rounded-2xl border border-stone-100 bg-white px-6 shadow-sm">
          <ProfileField
            label="Occupation"
            value="Community Coordinator"
            verification={
              <VerificationBar
                label="Verified by 2 out of 2 community members"
                subLabel=""
                min={0}
                max={2}
                current={2}
                color="green"
              />
            }
          />
          <ProfileField
            label="Company"
            value="Wellington Mutual Aid Pantry"
            verification={
              <VerificationBar
                label="Verified by 2 community members"
                subLabel=""
                min={0}
                max={2}
                current={2}
                color="teal"
              />
            }
          />
          <ProfileField
            label="Domains"
            value="First aid"
            verification={
              <VerificationBar
                label="Verified by 1 community member"
                subLabel=""
                min={0}
                max={1}
                current={1}
                color="green"
              />
            }
          />
          <ProfileField
            label="Seller approval"
            value="Approved seller"
            verification={
              <VerificationBar
                label="Approved by 2 out of 2 community members"
                subLabel=""
                min={0}
                max={2}
                current={2}
                color="green"
              />
            }
          />
        </div>

        {/* ── LISTINGS ─────────────────────────────────────── */}
        <div className="fade-up fade-up-3">
          <h2 className="serif mb-5 text-2xl text-stone-800">Listings</h2>

          <div className="display-flex grid grid-cols-1 gap-5">
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

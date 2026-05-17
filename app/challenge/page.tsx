// since it uses usestate and useRef, need use client

"use client";

import { useState } from "react";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────────────────

type Status = "Claimed" | "Flagged";

interface Applicant {
  id: number;
  name: string;
  status: Status;
  canEdit: boolean;
  bio: string;
  profileImage: string;
  proofImages: string[];
}

// ── Data ──────────────────────────────────────────────────────────────────────

const APPLICANTS: Applicant[] = [
  {
    id: 1,
    name: "Maya",
    status: "Claimed",
    canEdit: false,
    bio: "Coordinates donations for the Wellington mutual aid pantry. Verified first aid domain.",
    profileImage: "https://i.pravatar.cc/160?img=47",
    proofImages: [
      "https://aoyko8hmkd.ufs.sh/f/StjbtwiwCO7WTOqlA8o3dVJiG42c9X0eayC6kfYgrMlvqsBL",
      "https://placehold.co/200x150/e0f2fe/0369a1?text=First+Aid+Kit",
      "https://placehold.co/200x150/dcfce7/15803d?text=Pantry+Photo",
    ],
  },
  {
    id: 2,
    name: "Noah",
    status: "Flagged",
    canEdit: true,
    bio: "Has a registered van available for local deliveries. Delivery domain specialist.",
    profileImage: "https://i.pravatar.cc/160?img=12",
    proofImages: [
      "https://aoyko8hmkd.ufs.sh/f/StjbtwiwCO7WArVBXEqHCIDw5eBQAWTZtGfLVUkbzvagXoMJ",
      "https://placehold.co/200x150/ffe4e6/be123c?text=Van+Registration",
      "https://placehold.co/200x150/fce7f3/9d174d?text=Delivery+Record",
    ],
  },
  {
    id: 3,
    name: "Ava",
    status: "Claimed",
    canEdit: true,
    bio: "Clothing domain. Providing warm winter jackets and apparel for the community.",
    profileImage: "https://i.pravatar.cc/160?img=32",
    proofImages: [
      "https://aoyko8hmkd.ufs.sh/f/StjbtwiwCO7WV3GfhAGyhx8HXEqien2UWuwYScfPot9dbVgp",
      "https://placehold.co/200x150/e0e7ff/3730a3?text=Jacket+Inventory",
      "https://placehold.co/200x150/cffafe/0e7490?text=Size+Chart",
    ],
  },
  {
    id: 4,
    name: "Leo",
    status: "Claimed",
    canEdit: true,
    bio: "Electronics domain. Portable power banks and small device support.",
    profileImage: "https://i.pravatar.cc/160?img=68",
    proofImages: [
      "https://placehold.co/800x600/png?text=Power+Banks",
      "https://placehold.co/200x150/fef3c7/92400e?text=Charging+Setup",
      "https://placehold.co/200x150/f0fdf4/14532d?text=Device+List",
    ],
  },
];

// ── Image Lightbox ────────────────────────────────────────────────────────────

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mx-6 w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt="enlarged proof"
          width={800}
          height={600}
          className="max-h-[80vh] w-full object-contain"
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-lg font-bold text-stone-700 shadow transition hover:bg-white"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-bold tracking-wide ${
        status === "Claimed"
          ? "border border-emerald-200 bg-emerald-50 text-emerald-600"
          : "border border-rose-200 bg-rose-50 text-rose-500"
      }`}
    >
      {status}
    </span>
  );
}

// ── Applicant Card (left list) ────────────────────────────────────────────────

function ApplicantCard({
  applicant,
  isSelected,
  onClick,
}: {
  applicant: Applicant;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 p-0 transition-all duration-200 ${
        isSelected
          ? "border-stone-800 shadow-md"
          : "border-stone-200 hover:border-stone-400 hover:shadow-sm"
      } `}
    >
      {/* Avatar area */}
      <div className="flex h-20 items-center justify-center overflow-hidden bg-gradient-to-br from-stone-100 to-stone-50">
        <Image
          src={applicant.profileImage}
          alt={applicant.name}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full border-2 border-white object-cover shadow"
        />
      </div>

      {/* Status badge — top right */}
      <div className="absolute top-2 right-2">
        <StatusBadge status={applicant.status} />
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between border-t border-stone-100 bg-white px-3 py-1.5">
        <span className="text-xs font-semibold text-stone-600">
          {applicant.name}
        </span>
        <span className="text-xs font-medium text-stone-400">
          {applicant.canEdit ? "Edit" : "View"}
        </span>
      </div>
    </div>
  );
}

// ── Detail Panel (right) ──────────────────────────────────────────────────────

function DetailPanel({ applicant }: { applicant: Applicant }) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleAsk = () => {
    if (!question.trim()) return;
    setSubmitted(question.trim());
    setQuestion("");
  };

  return (
    <div className="flex h-full flex-col gap-5">
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}

      {/* Profile image */}
      <div
        className="group relative flex h-44 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-stone-200 bg-gradient-to-br from-stone-100 to-stone-50 transition-all duration-200 hover:border-stone-400"
        onClick={() => setLightboxSrc(applicant.profileImage)}
      >
        <Image
          src={applicant.profileImage}
          alt={applicant.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-200 group-hover:bg-black/10">
          <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Enlarge
          </span>
        </div>
      </div>

      {/* Name + bio */}
      <div>
          <h2 className="mb-1 font-serif text-2xl font-semibold text-stone-800">
          {applicant.name}
        </h2>
        <p className="text-sm leading-relaxed text-stone-500">
          {applicant.bio}
        </p>
      </div>

      {/* Additional proofs */}
      <div>
        <p className="mb-2 text-xs font-bold tracking-widest text-stone-400 uppercase">
          Additional Proofs
        </p>
        <div className="flex gap-3">
          {applicant.proofImages.map((src, i) => (
            <div
              key={i}
              onClick={() => setLightboxSrc(src)}
              className="group/proof relative h-16 w-16 cursor-pointer overflow-hidden rounded-xl border-2 border-stone-200 transition-all duration-200 hover:border-teal-400 hover:shadow-md"
            >
              <Image
                src={src}
                alt={`Proof ${i + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-200 group-hover/proof:bg-black/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className="h-4 w-4 opacity-0 transition-opacity duration-200 group-hover/proof:opacity-100"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Question box */}
      <div className="mt-auto flex flex-col gap-2">
        {submitted && (
          <div className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-xs text-teal-700">
            ✓ Question sent: &ldquo;{submitted}&rdquo;
          </div>
        )}
        <div className="flex flex-col gap-2 rounded-xl border-2 border-stone-200 bg-stone-50 p-3">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={`Ask ${applicant.name} a question…`}
            rows={3}
            className="w-full resize-none bg-transparent text-sm leading-relaxed text-stone-700 placeholder-stone-400 outline-none"
          />
          <div className="flex justify-end">
            <button
              onClick={handleAsk}
              disabled={!question.trim()}
              className="rounded-lg border-2 border-stone-800 px-5 py-1.5 text-sm font-semibold text-stone-800 transition-all duration-200 hover:bg-stone-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PromptSkillsAssessment() {
  const [selected, setSelected] = useState<Applicant>(APPLICANTS[0]);

  return (
    <div className="flex min-h-screen items-start justify-center bg-[#F8F7F4] px-4 py-12">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border-2 border-stone-200 bg-white shadow-xl">
        {/* ── Header ── */}
        <div className="border-b-2 border-stone-100 px-8 py-5">
          <h1 className="text-center text-2xl font-serif text-stone-800">
            Prompt Skills Assessment
          </h1>
        </div>

        {/* ── Body ── */}
        <div className="flex gap-0 p-0">
          {/* Left: applicant list */}
          <div className="flex w-48 shrink-0 flex-col gap-3 border-r-2 border-stone-100 p-4">
            {APPLICANTS.map((a) => (
              <ApplicantCard
                key={a.id}
                applicant={a}
                isSelected={selected.id === a.id}
                onClick={() => setSelected(a)}
              />
            ))}
          </div>

          {/* Right: detail panel */}
          <div key={selected.id} className="fade-in flex-1 p-6">
            <DetailPanel applicant={selected} />
          </div>
        </div>
      </div>
    </div>
  );
}

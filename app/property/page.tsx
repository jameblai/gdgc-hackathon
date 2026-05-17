"use client";

import { Trash2 } from "lucide-react";
import { useRef, useState } from "react";

/* ================= TYPES ================= */

interface ClaimProp {
  text: string;
  domain: string;
}

interface PropertyProp {
  id: string;
  name: string;
  status: "FLAGGED" | "CLAIMED" | null;
  link: string;
}

/* ================= MAIN COMPONENT ================= */

export default function PropertyAssetsClaim() {
  const [properties, setProperties] = useState<PropertyProp[]>([
    { id: "1", name: "House #1", status: null, link: "" },
    { id: "2", name: "House #2", status: null, link: "" },
    { id: "3", name: "House #3", status: "FLAGGED", link: "" },
  ]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Property assets claim</h1>

      <div className="mt-4 flex flex-row gap-10">
        <AssetsListing properties={properties} />

        <CreateListing setProperties={setProperties} />
      </div>
    </div>
  );
}

/* ================= LISTING ================= */

function AssetsListing({ properties }: { properties: PropertyProp[] }) {
  return (
    <div className="w-1/2">
      <h2 className="mb-2 font-semibold">Properties</h2>

      <div className="flex flex-col gap-2">
        {properties.map((property) => (
          <PropertyItem key={property.id} propertyDetails={property} />
        ))}
      </div>
    </div>
  );
}

/* ================= PROPERTY ITEM ================= */

function PropertyItem({ propertyDetails }: { propertyDetails: PropertyProp }) {
  return (
    <div className="rounded border p-3">
      <p>
        <strong>Name:</strong> {propertyDetails.name}
      </p>
      <p>
        <strong>ID:</strong> {propertyDetails.id}
      </p>
      <p>
        <strong>Link:</strong> {propertyDetails.link || "N/A"}
      </p>
      <p>
        <strong>Status:</strong> {propertyDetails.status ?? "NONE"}
      </p>
    </div>
  );
}

/* ================= CREATE LISTING ================= */

function CreateListing({
  setProperties,
}: {
  setProperties: React.Dispatch<React.SetStateAction<PropertyProp[]>>;
}) {
  const [claims, setClaims] = useState<ClaimProp[]>([]);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<HTMLInputElement | null>(null);
  const domainRef = useRef<HTMLInputElement | null>(null);

  /* -------- ADD CLAIM -------- */
  function handleAddClaim() {
    const text = textRef.current?.value;
    const domain = domainRef.current?.value;

    if (!text || !domain) return;

    setClaims((prev) => [{ text, domain }, ...prev]);

    if (textRef.current) textRef.current.value = "";
    if (domainRef.current) domainRef.current.value = "";
  }

  /* -------- REMOVE CLAIM -------- */
  function removeClaim(index: number) {
    setClaims((prev) => prev.filter((_, i) => i !== index));
  }

  /* -------- SUBMIT PROPERTY -------- */
  function handleSubmit() {
    const name = nameRef.current?.value;
    if (!name) return;

    const newProperty: PropertyProp = {
      id: crypto.randomUUID(),
      name,
      status: null,
      link: "",
    };

    setProperties((prev) => [newProperty, ...prev]);

    if (nameRef.current) nameRef.current.value = "";
    setClaims([]);
  }

  return (
    <div className="flex w-1/2 flex-col gap-2">
      <h2 className="font-semibold">Create new listing</h2>

      {/* NAME */}
      <input
        ref={nameRef}
        type="text"
        placeholder="Property name"
        className="border p-2"
      />

      {/* CLAIM INPUT */}
      <input
        ref={textRef}
        type="text"
        placeholder="Claim text"
        className="border p-2"
      />

      <input
        ref={domainRef}
        type="text"
        placeholder="Claim domain"
        className="border p-2"
      />

      <button
        onClick={handleAddClaim}
        className="w-fit bg-green-600 p-2 text-white"
      >
        Add Claim
      </button>

      {/* CLAIM LIST */}
      <div className="mt-2 flex flex-col gap-2">
        {claims.map((claim, index) => (
          <ClaimItem
            key={`${claim.text}-${index}`}
            claimDetails={claim}
            onDelete={() => removeClaim(index)}
          />
        ))}
      </div>

      {/* FILE INPUT */}
      <input type="file" accept="image/*" />

      {/* SUBMIT */}
      <button onClick={handleSubmit} className="mt-2 w-fit bg-amber-400 p-2">
        Submit
      </button>
    </div>
  );
}

/* ================= CLAIM ITEM ================= */

function ClaimItem({
  claimDetails,
  onDelete,
}: {
  claimDetails: ClaimProp;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between border p-2">
      <div>
        <p>{claimDetails.text}</p>
        <p className="text-sm opacity-60">{claimDetails.domain}</p>
      </div>

      <button onClick={onDelete}>
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type TagsInputProps = {
  className?: string;
  disabled?: boolean;
  id?: string;
  onBlur?: () => void;
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  value: string[];
};

function parseTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function TagsInput({
  className,
  disabled = false,
  id,
  onBlur,
  onValueChange,
  placeholder = "Add a tag",
  value,
}: TagsInputProps) {
  const [draft, setDraft] = useState("");

  const addTags = (input: string) => {
    const nextTags = parseTags(input);

    if (nextTags.length === 0) {
      return;
    }

    const normalized = new Set(value.map((tag) => tag.toLowerCase()));
    const uniqueTags = nextTags.filter((tag) => {
      const key = tag.toLowerCase();

      if (normalized.has(key)) {
        return false;
      }

      normalized.add(key);
      return true;
    });

    if (uniqueTags.length > 0) {
      onValueChange([...value, ...uniqueTags]);
    }

    setDraft("");
  };

  const removeTag = (tagToRemove: string) => {
    onValueChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div
      className={cn(
        "border-input focus-within:border-ring focus-within:ring-ring/50 flex min-h-8 w-full flex-wrap items-center gap-1.5 rounded-lg border px-2 py-1 transition-colors focus-within:ring-3",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {value.map((tag) => (
        <span
          className="bg-secondary text-secondary-foreground inline-flex max-w-full items-center gap-1 rounded-md px-2 py-0.5 text-sm"
          key={tag}
        >
          <span className="truncate">{tag}</span>
          <button
            aria-label={`Remove ${tag}`}
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 rounded-sm outline-none focus-visible:ring-2"
            disabled={disabled}
            onClick={() => removeTag(tag)}
            type="button"
          >
            <XIcon className="size-3" />
          </button>
        </span>
      ))}
      <input
        className="placeholder:text-muted-foreground min-w-28 flex-1 bg-transparent text-base outline-none md:text-sm"
        disabled={disabled}
        id={id}
        onBlur={() => {
          addTags(draft);
          onBlur?.();
        }}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            addTags(draft);
            return;
          }

          if (event.key === "Backspace" && draft.length === 0) {
            onValueChange(value.slice(0, -1));
          }
        }}
        placeholder={value.length === 0 ? placeholder : "Add another"}
        value={draft}
      />
    </div>
  );
}

export { TagsInput };

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  attestations,
  attestationType,
  chatParticipants,
  chatMessages,
  chats,
  claims,
  listingCategory,
  listingMedia,
  listingMediaType,
  listings,
  users,
} from "@/lib/db/schema";

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type Listing = InferSelectModel<typeof listings>;
export type NewListing = InferInsertModel<typeof listings>;
export type ListingCategory = (typeof listingCategory.enumValues)[number];

export type Chat = InferSelectModel<typeof chats>;
export type NewChat = InferInsertModel<typeof chats>;

export type ChatParticipant = InferSelectModel<typeof chatParticipants>;
export type NewChatParticipant = InferInsertModel<typeof chatParticipants>;

export type ChatMessage = InferSelectModel<typeof chatMessages>;
export type NewChatMessage = InferInsertModel<typeof chatMessages>;

export type ListingMedia = InferSelectModel<typeof listingMedia>;
export type NewListingMedia = InferInsertModel<typeof listingMedia>;
export type ListingMediaType = (typeof listingMediaType.enumValues)[number];

export type Claim = InferSelectModel<typeof claims>;
export type NewClaim = InferInsertModel<typeof claims>;

export type Attestation = InferSelectModel<typeof attestations>;
export type NewAttestation = InferInsertModel<typeof attestations>;

export type AttestationType = (typeof attestationType.enumValues)[number];

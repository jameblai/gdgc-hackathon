import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  assetCategory,
  assetEvidence,
  assetEvidenceType,
  assets,
  attestations,
  attestationType,
  chatParticipants,
  chatMessages,
  chats,
  claims,
  listingCategory,
  listingPhotos,
  listingStatus,
  listings,
  users,
} from "@/lib/db/schema";

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type Listing = InferSelectModel<typeof listings>;
export type NewListing = InferInsertModel<typeof listings>;
export type ListingCategory = (typeof listingCategory.enumValues)[number];
export type ListingStatus = (typeof listingStatus.enumValues)[number];

export type Asset = InferSelectModel<typeof assets>;
export type NewAsset = InferInsertModel<typeof assets>;
export type AssetCategory = (typeof assetCategory.enumValues)[number];

export type AssetEvidence = InferSelectModel<typeof assetEvidence>;
export type NewAssetEvidence = InferInsertModel<typeof assetEvidence>;
export type AssetEvidenceType = (typeof assetEvidenceType.enumValues)[number];

export type Chat = InferSelectModel<typeof chats>;
export type NewChat = InferInsertModel<typeof chats>;

export type ChatParticipant = InferSelectModel<typeof chatParticipants>;
export type NewChatParticipant = InferInsertModel<typeof chatParticipants>;

export type ChatMessage = InferSelectModel<typeof chatMessages>;
export type NewChatMessage = InferInsertModel<typeof chatMessages>;

export type ListingPhoto = InferSelectModel<typeof listingPhotos>;
export type NewListingPhoto = InferInsertModel<typeof listingPhotos>;

export type Claim = InferSelectModel<typeof claims>;
export type NewClaim = InferInsertModel<typeof claims>;

export type Attestation = InferSelectModel<typeof attestations>;
export type NewAttestation = InferInsertModel<typeof attestations>;

export type AttestationType = (typeof attestationType.enumValues)[number];

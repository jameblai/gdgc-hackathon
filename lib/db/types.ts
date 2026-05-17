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
  claimTypeEnum,
  claims,
  listingCategory,
  listingPhotos,
  listingStatus,
  listings,
  sessions,
  userDomains,
  users,
} from "@/lib/db/schema";

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type UserDomain = InferSelectModel<typeof userDomains>;
export type NewUserDomain = InferInsertModel<typeof userDomains>;
export type UserWithDomains = User & { domains: UserDomain[] };
export type UserWithListings = User & { listings: Listing[] };
export type UserWithListingsAndDomains = UserWithListings & {
  domains: UserDomain[];
};
export type UserWithAssets = User & { assets: Asset[] };
export type UserWithChatParticipants = User & {
  chatParticipants: ChatParticipant[];
};
export type UserWithChatMessages = User & { chatMessages: ChatMessage[] };
export type UserWithClaims = User & { claims: Claim[] };
export type UserWithAttestations = User & { attestations: Attestation[] };
export type UserWithSessions = User & { sessions: Session[] };
export type UserWithDomainsAndTrust = User & { domains: UserDomain[] };
export type UserDomainWithUser = UserDomain & { user: User };
export type UserWithClaimsAndAttestations = User & {
  claims: ClaimWithAttestations[];
  attestations: AttestationWithClaim[];
};

export type Session = InferSelectModel<typeof sessions>;
export type NewSession = InferInsertModel<typeof sessions>;
export type SessionWithUser = Session & { user: User };

export type Listing = InferSelectModel<typeof listings>;
export type NewListing = InferInsertModel<typeof listings>;
export type ListingCategory = (typeof listingCategory.enumValues)[number];
export type ListingStatus = (typeof listingStatus.enumValues)[number];
export type ListingWithUser = Listing & { user: User };
export type ListingWithPhotos = Listing & { photos: ListingPhoto[] };
export type ListingWithUserAndPhotos = ListingWithUser & {
  photos: ListingPhoto[];
};

export type Asset = InferSelectModel<typeof assets>;
export type NewAsset = InferInsertModel<typeof assets>;
export type AssetCategory = (typeof assetCategory.enumValues)[number];
export type AssetWithUser = Asset & { user: User };
export type AssetWithEvidence = Asset & { evidence: AssetEvidence[] };
export type AssetWithUserAndEvidence = AssetWithUser & {
  evidence: AssetEvidence[];
};

export type AssetEvidence = InferSelectModel<typeof assetEvidence>;
export type NewAssetEvidence = InferInsertModel<typeof assetEvidence>;
export type AssetEvidenceType = (typeof assetEvidenceType.enumValues)[number];
export type AssetEvidenceWithAsset = AssetEvidence & { asset: Asset };

export type Chat = InferSelectModel<typeof chats>;
export type NewChat = InferInsertModel<typeof chats>;
export type ChatWithParticipants = Chat & {
  participants: ChatParticipantWithUser[];
};
export type ChatWithMessages = Chat & { messages: ChatMessageWithSender[] };
export type ChatWithParticipantsAndMessages = ChatWithParticipants & {
  messages: ChatMessageWithSender[];
};

export type ChatParticipant = InferSelectModel<typeof chatParticipants>;
export type NewChatParticipant = InferInsertModel<typeof chatParticipants>;
export type ChatParticipantWithChat = ChatParticipant & { chat: Chat };
export type ChatParticipantWithUser = ChatParticipant & { user: User };
export type ChatParticipantWithChatAndUser = ChatParticipantWithChat & {
  user: User;
};

export type ChatMessage = InferSelectModel<typeof chatMessages>;
export type NewChatMessage = InferInsertModel<typeof chatMessages>;
export type ChatMessageWithChat = ChatMessage & { chat: Chat };
export type ChatMessageWithSender = ChatMessage & { sender: User };
export type ChatMessageWithChatAndSender = ChatMessageWithChat & {
  sender: User;
};

export type ListingPhoto = InferSelectModel<typeof listingPhotos>;
export type NewListingPhoto = InferInsertModel<typeof listingPhotos>;
export type ListingPhotoWithListing = ListingPhoto & { listing: Listing };

export type Claim = InferSelectModel<typeof claims>;
export type NewClaim = InferInsertModel<typeof claims>;
export type ClaimWithUser = Claim & { user: User };
export type ClaimWithAttestations = Claim & { attestations: Attestation[] };
export type ClaimWithUserAndAttestations = ClaimWithUser & {
  attestations: AttestationWithUser[];
};

export type Attestation = InferSelectModel<typeof attestations>;
export type NewAttestation = InferInsertModel<typeof attestations>;
export type AttestationWithUser = Attestation & { user: User };
export type AttestationWithClaim = Attestation & { claim: Claim };
export type AttestationWithUserAndClaim = AttestationWithUser & {
  claim: Claim;
};

export type AttestationType = (typeof attestationType.enumValues)[number];
export type ClaimType = (typeof claimTypeEnum.enumValues)[number];

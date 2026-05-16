import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { attestations, attestationType, claims, users } from "@/lib/db/schema";

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type Claim = InferSelectModel<typeof claims>;
export type NewClaim = InferInsertModel<typeof claims>;

export type Attestation = InferSelectModel<typeof attestations>;
export type NewAttestation = InferInsertModel<typeof attestations>;

export type AttestationType = (typeof attestationType.enumValues)[number];

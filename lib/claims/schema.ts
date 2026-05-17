import { z } from "zod";

import { attestationType } from "@/lib/db/schema";

export const createClaimSchema = z.object({
  details: z.string().trim().min(1, "Enter claim details.").max(2000),
});

export const deleteClaimSchema = z.object({
  id: z.string().min(1),
});

export const createOrUpdateAttestationSchema = z.object({
  claimId: z.string().min(1),
  type: z.enum(attestationType.enumValues),
});

export const deleteAttestationSchema = z.object({
  id: z.string().min(1),
});

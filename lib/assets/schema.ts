import { z } from "zod";

import { assetCategory, assetEvidenceType } from "@/lib/db/schema";

export const createAssetSchema = z.object({
  category: z.enum(assetCategory.enumValues),
  name: z.string().trim().min(1, "Enter an asset name.").max(160),
});

export const updateAssetSchema = createAssetSchema.extend({
  id: z.string().min(1),
});

export const deleteAssetSchema = z.object({
  id: z.string().min(1),
});

export const addAssetEvidenceSchema = z.object({
  assetId: z.string().min(1),
  type: z.enum(assetEvidenceType.enumValues),
  url: z.string().url(),
});

export const updateAssetEvidenceSchema = z.object({
  id: z.string().min(1),
  type: z.enum(assetEvidenceType.enumValues),
  url: z.string().url(),
});

export const deleteAssetEvidenceSchema = z.object({
  id: z.string().min(1),
});

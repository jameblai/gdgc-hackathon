import { z } from "zod";

import { listingCategory } from "@/lib/db/schema";

export const uploadedImageSchema = z.object({
  fileKey: z.string().min(1),
  url: z.string().url(),
});

export const listingFieldsSchema = z.object({
  category: z.enum(listingCategory.enumValues),
  description: z.string().trim().min(1, "Enter a description.").max(2000),
  images: z.array(uploadedImageSchema).max(6).default([]),
  location: z.string().trim().min(1, "Enter a location.").max(160),
  name: z.string().trim().min(1, "Enter a name.").max(160),
});

export const updateListingSchema = listingFieldsSchema.extend({
  existingPhotoIds: z.array(z.string().min(1)).default([]),
  id: z.string().min(1),
});

export const deleteListingSchema = z.object({
  id: z.string().min(1),
});

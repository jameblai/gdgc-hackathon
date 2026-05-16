"use server";

import { and, eq, inArray } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { listingCategory, listingPhotos, listings } from "@/lib/db/schema";
import { actionClient } from "@/lib/safe-action";
import { utapi } from "@/lib/uploadthing-server";

const uploadedImageSchema = z.object({
  fileKey: z.string().min(1),
  url: z.string().url(),
});

const listingFieldsSchema = z.object({
  category: z.enum(listingCategory.enumValues),
  description: z.string().trim().min(1, "Enter a description.").max(2000),
  images: z.array(uploadedImageSchema).max(6).default([]),
  location: z.string().trim().min(1, "Enter a location.").max(160),
  name: z.string().trim().min(1, "Enter a name.").max(160),
});

const updateListingSchema = listingFieldsSchema.extend({
  existingPhotoIds: z.array(z.string().min(1)).default([]),
  id: z.string().min(1),
});

const deleteListingSchema = z.object({
  id: z.string().min(1),
});

async function requireUser() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export const createListingAction = actionClient
  .inputSchema(listingFieldsSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const [listing] = await db
      .insert(listings)
      .values({
        category: parsedInput.category,
        description: parsedInput.description,
        location: parsedInput.location,
        name: parsedInput.name,
        userId: user.id,
      })
      .returning({ id: listings.id });

    if (parsedInput.images.length > 0) {
      await db.insert(listingPhotos).values(
        parsedInput.images.map((image, index) => ({
          fileKey: image.fileKey,
          listingId: listing.id,
          sortOrder: index,
          url: image.url,
        })),
      );
    }

    return { id: listing.id };
  });

export const updateListingAction = actionClient
  .inputSchema(updateListingSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const listing = await db.query.listings.findFirst({
      where: and(eq(listings.id, parsedInput.id), eq(listings.userId, user.id)),
      with: {
        photos: true,
      },
    });

    if (!listing) {
      return { error: "Listing not found." };
    }

    if (parsedInput.existingPhotoIds.length + parsedInput.images.length > 6) {
      return { error: "Listings can have up to 6 images." };
    }

    const keptPhotoIds = new Set(parsedInput.existingPhotoIds);
    const removedPhotos = listing.photos.filter(
      (photo) => !keptPhotoIds.has(photo.id),
    );

    await db.transaction(async (tx) => {
      await tx
        .update(listings)
        .set({
          category: parsedInput.category,
          description: parsedInput.description,
          location: parsedInput.location,
          name: parsedInput.name,
          updatedAt: new Date(),
        })
        .where(eq(listings.id, listing.id));

      if (removedPhotos.length > 0) {
        await tx.delete(listingPhotos).where(
          inArray(
            listingPhotos.id,
            removedPhotos.map((photo) => photo.id),
          ),
        );
      }

      if (parsedInput.images.length > 0) {
        const keptCount = listing.photos.length - removedPhotos.length;
        await tx.insert(listingPhotos).values(
          parsedInput.images.map((image, index) => ({
            fileKey: image.fileKey,
            listingId: listing.id,
            sortOrder: keptCount + index,
            url: image.url,
          })),
        );
      }
    });

    const removedFileKeys = removedPhotos
      .map((photo) => photo.fileKey)
      .filter((fileKey): fileKey is string => Boolean(fileKey));

    if (removedFileKeys.length > 0) {
      try {
        await utapi.deleteFiles(removedFileKeys);
      } catch {
        // Database ownership is authoritative; storage cleanup can be retried later.
      }
    }

    return { id: listing.id };
  });

export const deleteListingAction = actionClient
  .inputSchema(deleteListingSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const listing = await db.query.listings.findFirst({
      where: and(eq(listings.id, parsedInput.id), eq(listings.userId, user.id)),
      with: {
        photos: true,
      },
    });

    if (!listing) {
      return { error: "Listing not found." };
    }

    await db.delete(listings).where(eq(listings.id, listing.id));

    const fileKeys = listing.photos
      .map((photo) => photo.fileKey)
      .filter((fileKey): fileKey is string => Boolean(fileKey));

    if (fileKeys.length > 0) {
      try {
        await utapi.deleteFiles(fileKeys);
      } catch {
        // Database ownership is authoritative; storage cleanup can be retried later.
      }
    }

    return { success: true };
  });

"use server";

import { and, eq } from "drizzle-orm";

import { requireUser } from "@/lib/auth/require-user";
import { db } from "@/lib/db";
import { assetEvidence, assets } from "@/lib/db/schema";
import { actionClient } from "@/lib/safe-action";

import {
  addAssetEvidenceSchema,
  createAssetSchema,
  deleteAssetEvidenceSchema,
  deleteAssetSchema,
  updateAssetEvidenceSchema,
  updateAssetSchema,
} from "./schema";

export async function getCurrentUserAssets() {
  const user = await requireUser();

  return db.query.assets.findMany({
    where: eq(assets.userId, user.id),
    with: {
      evidence: true,
    },
  });
}

export async function getAssetByIdForCurrentUser(id: string) {
  const user = await requireUser();

  return db.query.assets.findFirst({
    where: and(eq(assets.id, id), eq(assets.userId, user.id)),
    with: {
      evidence: true,
    },
  });
}

export const createAssetAction = actionClient
  .inputSchema(createAssetSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const [asset] = await db
      .insert(assets)
      .values({
        category: parsedInput.category,
        name: parsedInput.name,
        userId: user.id,
      })
      .returning({ id: assets.id });

    return { id: asset.id };
  });

export const updateAssetAction = actionClient
  .inputSchema(updateAssetSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const [asset] = await db
      .update(assets)
      .set({
        category: parsedInput.category,
        name: parsedInput.name,
        updatedAt: new Date(),
      })
      .where(and(eq(assets.id, parsedInput.id), eq(assets.userId, user.id)))
      .returning({ id: assets.id });

    if (!asset) {
      return { error: "Asset not found." };
    }

    return { id: asset.id };
  });

export const deleteAssetAction = actionClient
  .inputSchema(deleteAssetSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const [asset] = await db
      .delete(assets)
      .where(and(eq(assets.id, parsedInput.id), eq(assets.userId, user.id)))
      .returning({ id: assets.id });

    if (!asset) {
      return { error: "Asset not found." };
    }

    return { success: true };
  });

export const addAssetEvidenceAction = actionClient
  .inputSchema(addAssetEvidenceSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const asset = await db.query.assets.findFirst({
      where: and(
        eq(assets.id, parsedInput.assetId),
        eq(assets.userId, user.id),
      ),
    });

    if (!asset) {
      return { error: "Asset not found." };
    }

    const [evidence] = await db
      .insert(assetEvidence)
      .values({
        assetId: asset.id,
        type: parsedInput.type,
        url: parsedInput.url,
      })
      .returning({ id: assetEvidence.id });

    return { id: evidence.id };
  });

export const deleteAssetEvidenceAction = actionClient
  .inputSchema(deleteAssetEvidenceSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const evidence = await db.query.assetEvidence.findFirst({
      where: eq(assetEvidence.id, parsedInput.id),
      with: {
        asset: true,
      },
    });

    if (!evidence || evidence.asset.userId !== user.id) {
      return { error: "Asset evidence not found." };
    }

    await db.delete(assetEvidence).where(eq(assetEvidence.id, evidence.id));

    return { success: true };
  });

export const updateAssetEvidenceAction = actionClient
  .inputSchema(updateAssetEvidenceSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const evidence = await db.query.assetEvidence.findFirst({
      where: eq(assetEvidence.id, parsedInput.id),
      with: {
        asset: true,
      },
    });

    if (!evidence || evidence.asset.userId !== user.id) {
      return { error: "Asset evidence not found." };
    }

    const [updatedEvidence] = await db
      .update(assetEvidence)
      .set({
        type: parsedInput.type,
        updatedAt: new Date(),
        url: parsedInput.url,
      })
      .where(eq(assetEvidence.id, evidence.id))
      .returning({ id: assetEvidence.id });

    await db
      .update(assets)
      .set({ updatedAt: new Date() })
      .where(eq(assets.id, evidence.assetId));

    return { id: updatedEvidence.id };
  });

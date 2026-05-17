"use server";

import { and, eq } from "drizzle-orm";

import { requireUser } from "@/lib/auth/require-user";
import { db } from "@/lib/db";
import { attestations, claims } from "@/lib/db/schema";
import { actionClient } from "@/lib/safe-action";

import {
  createClaimSchema,
  createOrUpdateAttestationSchema,
  deleteAttestationSchema,
  deleteClaimSchema,
} from "./schema";

export async function getClaimsWithUsers() {
  return db.query.claims.findMany({
    with: {
      user: true,
    },
  });
}

export async function getCurrentUserClaims() {
  const user = await requireUser();

  return db.query.claims.findMany({
    where: eq(claims.userId, user.id),
    with: {
      attestations: true,
    },
  });
}

export async function getClaimWithAttestations(id: string) {
  return db.query.claims.findFirst({
    where: eq(claims.id, id),
    with: {
      attestations: {
        with: {
          user: true,
        },
      },
      user: true,
    },
  });
}

export const createClaimAction = actionClient
  .inputSchema(createClaimSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const [claim] = await db
      .insert(claims)
      .values({
        details: parsedInput.details,
        userId: user.id,
      })
      .returning({ id: claims.id });

    return { id: claim.id };
  });

export const deleteClaimAction = actionClient
  .inputSchema(deleteClaimSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const [claim] = await db
      .delete(claims)
      .where(and(eq(claims.id, parsedInput.id), eq(claims.userId, user.id)))
      .returning({ id: claims.id });

    if (!claim) {
      return { error: "Claim not found." };
    }

    return { success: true };
  });

export const createOrUpdateAttestationAction = actionClient
  .inputSchema(createOrUpdateAttestationSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const claim = await db.query.claims.findFirst({
      where: eq(claims.id, parsedInput.claimId),
    });

    if (!claim) {
      return { error: "Claim not found." };
    }

    const [attestation] = await db
      .insert(attestations)
      .values({
        claimId: parsedInput.claimId,
        type: parsedInput.type,
        userId: user.id,
      })
      .onConflictDoUpdate({
        set: {
          type: parsedInput.type,
          updatedAt: new Date(),
        },
        target: [attestations.userId, attestations.claimId],
      })
      .returning({ id: attestations.id });

    return { id: attestation.id };
  });

export const deleteAttestationAction = actionClient
  .inputSchema(deleteAttestationSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const [attestation] = await db
      .delete(attestations)
      .where(
        and(
          eq(attestations.id, parsedInput.id),
          eq(attestations.userId, user.id),
        ),
      )
      .returning({ id: attestations.id });

    if (!attestation) {
      return { error: "Attestation not found." };
    }

    return { success: true };
  });

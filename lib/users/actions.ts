"use server";

import { and, eq } from "drizzle-orm";

import { requireUser } from "@/lib/auth/require-user";
import { db } from "@/lib/db";
import { userDomains, users } from "@/lib/db/schema";
import { actionClient } from "@/lib/safe-action";

import {
  createCurrentUserDomainSchema,
  deleteCurrentUserDomainSchema,
  replaceCurrentUserDomainsSchema,
  updateCurrentUserDomainSchema,
  updateCurrentUserProfileSchema,
} from "./schema";

export async function getCurrentUserWithDomains() {
  const user = await requireUser();

  return db.query.users.findFirst({
    where: eq(users.id, user.id),
    with: {
      domains: true,
    },
  });
}

export const updateCurrentUserProfileAction = actionClient
  .inputSchema(updateCurrentUserProfileSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const [updatedUser] = await db
      .update(users)
      .set({
        avatarUrl: parsedInput.avatarUrl,
        company: parsedInput.company,
        dateOfBirth: parsedInput.dateOfBirth,
        name: parsedInput.name,
        occupation: parsedInput.occupation,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id))
      .returning({ id: users.id });

    return { id: updatedUser.id };
  });

export const replaceCurrentUserDomainsAction = actionClient
  .inputSchema(replaceCurrentUserDomainsSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();
    const domains = [...new Set(parsedInput.domains)];

    await db.transaction(async (tx) => {
      await tx.delete(userDomains).where(eq(userDomains.userId, user.id));

      if (domains.length > 0) {
        await tx.insert(userDomains).values(
          domains.map((domain) => ({
            domain,
            userId: user.id,
          })),
        );
      }

      await tx
        .update(users)
        .set({ updatedAt: new Date() })
        .where(eq(users.id, user.id));
    });

    return { success: true };
  });

export const createCurrentUserDomainAction = actionClient
  .inputSchema(createCurrentUserDomainSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const [domain] = await db
      .insert(userDomains)
      .values({
        domain: parsedInput.domain,
        userId: user.id,
      })
      .onConflictDoNothing()
      .returning({ id: userDomains.id });

    await db
      .update(users)
      .set({ updatedAt: new Date() })
      .where(eq(users.id, user.id));

    return { id: domain?.id ?? null };
  });

export const updateCurrentUserDomainAction = actionClient
  .inputSchema(updateCurrentUserDomainSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const [domain] = await db
      .update(userDomains)
      .set({
        domain: parsedInput.domain,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(userDomains.id, parsedInput.id),
          eq(userDomains.userId, user.id),
        ),
      )
      .returning({ id: userDomains.id });

    if (!domain) {
      return { error: "Domain not found." };
    }

    await db
      .update(users)
      .set({ updatedAt: new Date() })
      .where(eq(users.id, user.id));

    return { id: domain.id };
  });

export const deleteCurrentUserDomainAction = actionClient
  .inputSchema(deleteCurrentUserDomainSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const [domain] = await db
      .delete(userDomains)
      .where(
        and(
          eq(userDomains.id, parsedInput.id),
          eq(userDomains.userId, user.id),
        ),
      )
      .returning({ id: userDomains.id });

    if (!domain) {
      return { error: "Domain not found." };
    }

    await db
      .update(users)
      .set({ updatedAt: new Date() })
      .where(eq(users.id, user.id));

    return { success: true };
  });

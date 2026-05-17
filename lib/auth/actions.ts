"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSessionCookie,
  getUserByUsername,
  lucia,
  validateRequest,
} from "@/lib/auth";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { db } from "@/lib/db";
import { users, userDomains } from "@/lib/db/schema";
import { actionClient } from "@/lib/safe-action";
import { loginSchema, registerSchema } from "./schema";
import { INCORRECT_USERNAME_OR_PASSWORD } from "./constants";

export const registerAction = actionClient
  .inputSchema(registerSchema)
  .action(
    async ({
      parsedInput: {
        company,
        dateOfBirth,
        domains,
        name,
        occupation,
        password,
        username,
      },
    }) => {
      const passwordHash = await hashPassword(password);

      try {
        const user = await db.transaction(async (tx) => {
          const [createdUser] = await tx
            .insert(users)
            .values({
              company,
              dateOfBirth,
              name,
              occupation,
              passwordHash,
              username,
            })
            .returning({ id: users.id });

          if (domains.length > 0) {
            await tx.insert(userDomains).values(
              domains.map((domain) => ({
                domain,
                userId: createdUser.id,
              })),
            );
          }

          return createdUser;
        });

        await createSessionCookie(user.id);
      } catch {
        return {
          error: "An account already exists for that username.",
        };
      }

      redirect("/claims");
    },
  );

export const loginAction = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput: { username, password } }) => {
    const user = await getUserByUsername(username);

    if (!user) {
      return {
        error: INCORRECT_USERNAME_OR_PASSWORD,
      };
    }

    const validPassword = await verifyPassword(user.passwordHash, password);

    if (!validPassword) {
      return {
        error: INCORRECT_USERNAME_OR_PASSWORD,
      };
    }

    await createSessionCookie(user.id);
    redirect("/claims");
  });

export const logoutAction = actionClient.action(async () => {
  const { session } = await validateRequest();

  if (!session) {
    return { error: "Unauthorized." };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  const cookieStore = await cookies();
  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/login");
});

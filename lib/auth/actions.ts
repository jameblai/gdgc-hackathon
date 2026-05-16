"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  createSessionCookie,
  getUserByEmail,
  lucia,
  validateRequest,
} from "@/lib/auth";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { actionClient } from "@/lib/safe-action";

export type AuthActionData = {
  error?: string;
  values?: {
    email?: string;
    name?: string;
  };
};

const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address.")),
  name: z.string().trim().min(1, "Enter your name.").max(120),
  password: z
    .string()
    .min(6, "Password must be between 6 and 255 characters.")
    .max(255, "Password must be between 6 and 255 characters."),
});

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Incorrect email or password.")),
  password: z
    .string()
    .min(6, "Incorrect email or password.")
    .max(255, "Incorrect email or password."),
});

export const registerAction = actionClient
  .inputSchema(registerSchema)
  .action(async ({ parsedInput: { email, name, password } }) => {
    const values = { email, name };
    const passwordHash = await hashPassword(password);

    try {
      const [user] = await db
        .insert(users)
        .values({
          email,
          name,
          passwordHash,
        })
        .returning({ id: users.id });

      await createSessionCookie(user.id);
    } catch {
      return {
        error: "An account already exists for that email.",
        values,
      };
    }

    redirect("/");
  });

export const loginAction = actionClient
  .inputSchema(loginSchema)
  .action(
    async ({ parsedInput: { email, password } }): Promise<AuthActionData> => {
      const user = await getUserByEmail(email);

      if (!user) {
        return {
          error: "Incorrect email or password.",
          values: { email },
        };
      }

      const validPassword = await verifyPassword(user.passwordHash, password);

      if (!validPassword) {
        return {
          error: "Incorrect email or password.",
          values: { email },
        };
      }

      await createSessionCookie(user.id);
      redirect("/");
    },
  );

export const logoutAction = actionClient.action(
  async (): Promise<AuthActionData> => {
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

    redirect("/features/login");
  },
);

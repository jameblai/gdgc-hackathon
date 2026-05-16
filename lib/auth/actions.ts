"use server";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSessionCookie,
  getUserByEmail,
  lucia,
  validateRequest,
} from "@/lib/auth";
import {
  hashPassword,
  isValidEmail,
  isValidPassword,
  verifyPassword,
} from "@/lib/auth/password";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export type AuthActionState = {
  error?: string;
  values?: {
    email?: string;
    name?: string;
  };
};

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function registerAction(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = readString(formData, "email").toLowerCase();
  const name = readString(formData, "name");
  const password = readString(formData, "password");

  if (!name || name.length > 120) {
    return { error: "Enter your name.", values: { email, name } };
  }

  if (!isValidEmail(email)) {
    return { error: "Enter a valid email address.", values: { email, name } };
  }

  if (!isValidPassword(password)) {
    return {
      error: "Password must be between 6 and 255 characters.",
      values: { email, name },
    };
  }

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
      values: { email, name },
    };
  }

  redirect("/");
}

export async function loginAction(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = readString(formData, "email").toLowerCase();
  const password = readString(formData, "password");

  if (!isValidEmail(email) || !isValidPassword(password)) {
    return {
      error: "Incorrect email or password.",
      values: { email },
    };
  }

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
}

export async function logoutAction(): Promise<AuthActionState> {
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
}

export async function updateUserEmail(userId: string, email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!isValidEmail(normalizedEmail)) {
    return { error: "Enter a valid email address." };
  }

  await db
    .update(users)
    .set({ email: normalizedEmail, updatedAt: new Date() })
    .where(eq(users.id, userId));

  return {};
}

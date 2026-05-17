import "server-only";

import { redirect } from "next/navigation";

import { validateRequest } from "@/lib/auth";

async function requireUser() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export { requireUser };

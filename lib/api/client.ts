import { treaty } from "@elysia/eden";
import type { app } from "@/server";
import { env } from "@/lib/env";

export const api = treaty<typeof app>(env.NEXT_PUBLIC_SITE_URL).api;

import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { env } from "@/lib/env";

export const db = drizzle(env.DATABASE_URL);

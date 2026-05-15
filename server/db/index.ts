import "dotenv/config";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { env } from "@/lib/env";

const sqlite = new Database(env.DB_FILE_NAME);
export const db = drizzle({ client: sqlite });

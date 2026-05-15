import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    DB_FILE_NAME: z.string().min(1).default("db.sqlite"),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().min(1).default("http://localhost:3000"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
});

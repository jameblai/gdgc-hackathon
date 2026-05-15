import { treaty } from "@elysia/eden";
import { app } from "@/server";

export const api = treaty(app).api;

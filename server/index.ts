import Elysia from "elysia";
import { health } from "./modules/health";

export const app = new Elysia({ prefix: "/api" }).use(health);

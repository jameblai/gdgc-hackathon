import { Elysia } from "elysia";

import { HealthModel } from "./model";
import { Health } from "./service";

export const health = new Elysia({ prefix: "/health" }).get(
  "/",
  () => Health.check(),
  { response: HealthModel.checkResponse },
);

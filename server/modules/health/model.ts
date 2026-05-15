import { t, type UnwrapSchema } from "elysia";

export const HealthModel = {
  checkResponse: t.Object({
    status: t.Literal("ok"),
  }),
} as const;

export type HealthModel = {
  [k in keyof typeof HealthModel]: UnwrapSchema<(typeof HealthModel)[k]>;
};

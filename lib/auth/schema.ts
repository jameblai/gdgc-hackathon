import z from "zod";

import { PASSWORD_REQUIREMENT, USERNAME_REQUIREMENT } from "./constants";

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, USERNAME_REQUIREMENT)
    .max(26, USERNAME_REQUIREMENT),
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(255, "Name must be between 1 and 255 characters."),
  password: z
    .string()
    .min(6, PASSWORD_REQUIREMENT)
    .max(255, PASSWORD_REQUIREMENT),
  dateOfBirth: z.date(),
  domains: z.array(z.string()),
  occupation: z.string(),
  company: z.string(),
});

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, USERNAME_REQUIREMENT)
    .max(26, USERNAME_REQUIREMENT),
  password: z
    .string()
    .min(6, PASSWORD_REQUIREMENT)
    .max(255, PASSWORD_REQUIREMENT),
});

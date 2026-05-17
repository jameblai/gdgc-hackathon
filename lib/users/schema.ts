import { z } from "zod";

export const updateCurrentUserProfileSchema = z.object({
  avatarUrl: z.string().url().nullable(),
  company: z.string().trim().max(255),
  dateOfBirth: z.date().nullable(),
  name: z.string().trim().min(1, "Name is required.").max(255),
  occupation: z.string().trim().max(255),
});

export const replaceCurrentUserDomainsSchema = z.object({
  domains: z.array(z.string().trim().min(1).max(160)).max(50).default([]),
});

export const createCurrentUserDomainSchema = z.object({
  domain: z.string().trim().min(1).max(160),
});

export const updateCurrentUserDomainSchema =
  createCurrentUserDomainSchema.extend({
    id: z.string().min(1),
  });

export const deleteCurrentUserDomainSchema = z.object({
  id: z.string().min(1),
});

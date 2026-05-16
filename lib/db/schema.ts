import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  claims: many(claims),
  attestations: many(attestations),
}));

export const attestationType = pgEnum("attestation_type", [
  "attest",
  "denounce",
  "unsure",
]);

export const claims = pgTable(
  "claims",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    details: text("details").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("claims_user_id_idx").on(table.userId)],
);

export const claimsRelations = relations(claims, ({ one, many }) => ({
  user: one(users, {
    fields: [claims.userId],
    references: [users.id],
  }),
  attestations: many(attestations),
}));

export const attestations = pgTable(
  "attestations",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    claimId: integer("claim_id")
      .notNull()
      .references(() => claims.id, { onDelete: "cascade" }),
    type: attestationType("type").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("attestations_claim_id_idx").on(table.claimId),
    uniqueIndex("attestations_user_id_claim_id_unique").on(
      table.userId,
      table.claimId,
    ),
  ],
);

export const attestationsRelations = relations(attestations, ({ one }) => ({
  user: one(users, {
    fields: [attestations.userId],
    references: [users.id],
  }),
  claim: one(claims, {
    fields: [attestations.claimId],
    references: [claims.id],
  }),
}));

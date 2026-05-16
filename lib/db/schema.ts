import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createId } from "@/lib/db/id";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    name: text("name").notNull(),
    avatarUrl: text("avatar_url"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [uniqueIndex("users_email_unique").on(table.email)],
);

export const sessions = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (table) => [index("sessions_user_id_idx").on(table.userId)],
);

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  listings: many(listings),
  assets: many(assets),
  chatParticipants: many(chatParticipants),
  chatMessages: many(chatMessages),
  claims: many(claims),
  attestations: many(attestations),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const listingCategory = pgEnum("listing_category", [
  "medical",
  "food",
  "apparel",
  "electronics",
  "entertainment",
]);

export const listingStatus = pgEnum("listing_status", [
  "active",
  "sold",
  "archived",
]);

export const listings = pgTable(
  "listings",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    location: text("location").notNull(),
    description: text("description").notNull(),
    category: listingCategory("category").notNull(),
    status: listingStatus("status").notNull().default("active"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("listings_user_id_idx").on(table.userId),
    index("listings_category_idx").on(table.category),
  ],
);

export const listingsRelations = relations(listings, ({ one, many }) => ({
  user: one(users, {
    fields: [listings.userId],
    references: [users.id],
  }),
  photos: many(listingPhotos),
}));

export const assetCategory = pgEnum("asset_category", ["house", "vehicle"]);

export const assets = pgTable(
  "assets",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    category: assetCategory("category").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("assets_user_id_idx").on(table.userId),
    index("assets_category_idx").on(table.category),
  ],
);

export const assetsRelations = relations(assets, ({ one, many }) => ({
  user: one(users, {
    fields: [assets.userId],
    references: [users.id],
  }),
  evidence: many(assetEvidence),
}));

export const assetEvidenceType = pgEnum("asset_evidence_type", [
  "pdf",
  "image",
]);

export const assetEvidence = pgTable(
  "asset_evidence",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    assetId: text("asset_id")
      .notNull()
      .references(() => assets.id, { onDelete: "cascade" }),
    type: assetEvidenceType("type").notNull(),
    url: text("url").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("asset_evidence_asset_id_idx").on(table.assetId)],
);

export const assetEvidenceRelations = relations(assetEvidence, ({ one }) => ({
  asset: one(assets, {
    fields: [assetEvidence.assetId],
    references: [assets.id],
  }),
}));

export const chats = pgTable("chats", {
  id: text("id").primaryKey().$defaultFn(createId),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const chatsRelations = relations(chats, ({ many }) => ({
  participants: many(chatParticipants),
  messages: many(chatMessages),
}));

export const chatParticipants = pgTable(
  "chat_participants",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    chatId: text("chat_id")
      .notNull()
      .references(() => chats.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("chat_participants_chat_id_idx").on(table.chatId),
    index("chat_participants_user_id_idx").on(table.userId),
    uniqueIndex("chat_participants_chat_id_user_id_unique").on(
      table.chatId,
      table.userId,
    ),
  ],
);

export const chatParticipantsRelations = relations(
  chatParticipants,
  ({ one }) => ({
    chat: one(chats, {
      fields: [chatParticipants.chatId],
      references: [chats.id],
    }),
    user: one(users, {
      fields: [chatParticipants.userId],
      references: [users.id],
    }),
  }),
);

export const chatMessages = pgTable(
  "chat_messages",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    chatId: text("chat_id")
      .notNull()
      .references(() => chats.id, { onDelete: "cascade" }),
    senderId: text("sender_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    text: text("text").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("chat_messages_chat_id_idx").on(table.chatId),
    index("chat_messages_sender_id_idx").on(table.senderId),
  ],
);

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  chat: one(chats, {
    fields: [chatMessages.chatId],
    references: [chats.id],
  }),
  sender: one(users, {
    fields: [chatMessages.senderId],
    references: [users.id],
  }),
}));

export const listingPhotos = pgTable(
  "listing_photos",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    listingId: text("listing_id")
      .notNull()
      .references(() => listings.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("listing_photos_listing_id_idx").on(table.listingId)],
);

export const listingPhotosRelations = relations(listingPhotos, ({ one }) => ({
  listing: one(listings, {
    fields: [listingPhotos.listingId],
    references: [listings.id],
  }),
}));

export const attestationType = pgEnum("attestation_type", [
  "attest",
  "denounce",
  "unsure",
]);

export const claims = pgTable(
  "claims",
  {
    id: text("id").primaryKey().$defaultFn(createId),
    userId: text("user_id")
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
    id: text("id").primaryKey().$defaultFn(createId),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    claimId: text("claim_id")
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

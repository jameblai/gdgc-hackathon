import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import {
  assetEvidence,
  assets,
  attestations,
  chatMessages,
  chatParticipants,
  chats,
  claims,
  listingPhotos,
  listings,
  users,
} from "@/lib/db/schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const pool = new Pool({ connectionString: databaseUrl });
const db = drizzle(pool);

const now = new Date();

async function seed() {
  await db.transaction(async (tx) => {
    await tx.delete(attestations);
    await tx.delete(claims);
    await tx.delete(chatMessages);
    await tx.delete(chatParticipants);
    await tx.delete(chats);
    await tx.delete(assetEvidence);
    await tx.delete(assets);
    await tx.delete(listingPhotos);
    await tx.delete(listings);
    await tx.delete(users);

    await tx.insert(users).values([
      {
        id: "user_maya",
        name: "Maya Patel",
        avatarUrl: "https://i.pravatar.cc/160?img=47",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "user_noah",
        name: "Noah Williams",
        avatarUrl: "https://i.pravatar.cc/160?img=12",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "user_ava",
        name: "Ava Chen",
        avatarUrl: "https://i.pravatar.cc/160?img=32",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "user_leo",
        name: "Leo Thompson",
        avatarUrl: "https://i.pravatar.cc/160?img=68",
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await tx.insert(listings).values([
      {
        id: "listing_first_aid",
        userId: "user_maya",
        name: "First aid kits",
        location: "Wellington CBD",
        description:
          "Three sealed first aid kits with bandages, antiseptic wipes, and gloves.",
        category: "medical",
        status: "active",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "listing_meal_boxes",
        userId: "user_noah",
        name: "Shelf-stable meal boxes",
        location: "Lower Hutt",
        description:
          "Twenty meal boxes with canned food, crackers, and bottled water.",
        category: "food",
        status: "active",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "listing_winter_jackets",
        userId: "user_ava",
        name: "Warm winter jackets",
        location: "Porirua",
        description:
          "Clean adult jackets in mixed sizes, suitable for cold weather.",
        category: "apparel",
        status: "active",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "listing_power_banks",
        userId: "user_leo",
        name: "Portable power banks",
        location: "Kapiti Coast",
        description:
          "Four charged USB power banks for phones and small devices.",
        category: "electronics",
        status: "sold",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "listing_board_games",
        userId: "user_maya",
        name: "Board games and cards",
        location: "Newtown",
        description:
          "A small set of board games and playing cards for community spaces.",
        category: "entertainment",
        status: "archived",
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await tx.insert(listingPhotos).values([
      {
        id: "photo_first_aid_1",
        listingId: "listing_first_aid",
        url: "https://placehold.co/800x600/png?text=First+Aid+Kits",
        sortOrder: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "photo_meal_boxes_1",
        listingId: "listing_meal_boxes",
        url: "https://placehold.co/800x600/png?text=Meal+Boxes",
        sortOrder: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "photo_jackets_1",
        listingId: "listing_winter_jackets",
        url: "https://placehold.co/800x600/png?text=Winter+Jackets",
        sortOrder: 0,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "photo_power_banks_1",
        listingId: "listing_power_banks",
        url: "https://placehold.co/800x600/png?text=Power+Banks",
        sortOrder: 0,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await tx.insert(assets).values([
      {
        id: "asset_community_hall",
        userId: "user_maya",
        name: "Community hall",
        category: "house",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "asset_delivery_van",
        userId: "user_noah",
        name: "Delivery van",
        category: "vehicle",
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await tx.insert(assetEvidence).values([
      {
        id: "evidence_hall_photo",
        assetId: "asset_community_hall",
        type: "image",
        url: "https://placehold.co/800x600/png?text=Community+Hall",
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await tx.insert(chats).values([
      {
        id: "chat_meal_pickup",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "chat_jackets",
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await tx.insert(chatParticipants).values([
      {
        id: "participant_meal_maya",
        chatId: "chat_meal_pickup",
        userId: "user_maya",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "participant_meal_noah",
        chatId: "chat_meal_pickup",
        userId: "user_noah",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "participant_jackets_ava",
        chatId: "chat_jackets",
        userId: "user_ava",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "participant_jackets_leo",
        chatId: "chat_jackets",
        userId: "user_leo",
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await tx.insert(chatMessages).values([
      {
        id: "message_meal_1",
        chatId: "chat_meal_pickup",
        senderId: "user_maya",
        text: "Are the meal boxes still available for pickup today?",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "message_meal_2",
        chatId: "chat_meal_pickup",
        senderId: "user_noah",
        text: "Yes, I can meet at the Lower Hutt community centre after 4.",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "message_jackets_1",
        chatId: "chat_jackets",
        senderId: "user_leo",
        text: "Could I collect two medium jackets tomorrow morning?",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "message_jackets_2",
        chatId: "chat_jackets",
        senderId: "user_ava",
        text: "That works. I will set two aside for you.",
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await tx.insert(claims).values([
      {
        id: "claim_maya_verified",
        userId: "user_maya",
        details:
          "Maya coordinates donations for the Wellington mutual aid pantry.",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "claim_noah_vehicle",
        userId: "user_noah",
        details: "Noah has a registered van available for local deliveries.",
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await tx.insert(attestations).values([
      {
        id: "attestation_noah_maya",
        userId: "user_noah",
        claimId: "claim_maya_verified",
        type: "attest",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "attestation_ava_maya",
        userId: "user_ava",
        claimId: "claim_maya_verified",
        type: "attest",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "attestation_maya_noah",
        userId: "user_maya",
        claimId: "claim_noah_vehicle",
        type: "unsure",
        createdAt: now,
        updatedAt: now,
      },
    ]);
  });
}

seed()
  .then(() => {
    console.log("Database seeded successfully.");
  })
  .catch((error: unknown) => {
    console.error("Failed to seed database.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });

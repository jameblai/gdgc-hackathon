"use server";

import { and, desc, eq } from "drizzle-orm";

import { requireUser } from "@/lib/auth/require-user";
import { db } from "@/lib/db";
import { chatMessages, chatParticipants, chats } from "@/lib/db/schema";
import { actionClient } from "@/lib/safe-action";

import {
  chatIdSchema,
  chatParticipantSchema,
  createChatSchema,
  deleteChatMessageSchema,
  sendChatMessageSchema,
  updateChatMessageSchema,
} from "./schema";

async function requireChatParticipant(chatId: string, userId: string) {
  return db.query.chatParticipants.findFirst({
    where: and(
      eq(chatParticipants.chatId, chatId),
      eq(chatParticipants.userId, userId),
    ),
  });
}

export async function getCurrentUserChats() {
  const user = await requireUser();

  const participations = await db.query.chatParticipants.findMany({
    where: eq(chatParticipants.userId, user.id),
    with: {
      chat: {
        with: {
          messages: {
            orderBy: desc(chatMessages.createdAt),
            with: {
              sender: true,
            },
          },
          participants: {
            with: {
              user: true,
            },
          },
        },
      },
    },
  });

  return participations.map((participation) => participation.chat);
}

export async function getChatWithMessages(id: string) {
  const user = await requireUser();
  const participant = await requireChatParticipant(id, user.id);

  if (!participant) {
    return null;
  }

  return db.query.chats.findFirst({
    where: eq(chats.id, id),
    with: {
      messages: {
        orderBy: chatMessages.createdAt,
        with: {
          sender: true,
        },
      },
      participants: {
        with: {
          user: true,
        },
      },
    },
  });
}

export const createChatAction = actionClient
  .inputSchema(createChatSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();
    const participantUserIds = [
      ...new Set([user.id, ...parsedInput.participantUserIds]),
    ];

    const chat = await db.transaction(async (tx) => {
      const [createdChat] = await tx.insert(chats).values({}).returning();

      await tx.insert(chatParticipants).values(
        participantUserIds.map((participantUserId) => ({
          chatId: createdChat.id,
          userId: participantUserId,
        })),
      );

      if (parsedInput.initialMessage) {
        await tx.insert(chatMessages).values({
          chatId: createdChat.id,
          senderId: user.id,
          text: parsedInput.initialMessage,
        });
      }

      return createdChat;
    });

    return chat;
  });

export const sendChatMessageAction = actionClient
  .inputSchema(sendChatMessageSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();
    const participant = await requireChatParticipant(
      parsedInput.chatId,
      user.id,
    );

    if (!participant) {
      return { error: "Chat not found." };
    }

    const [message] = await db
      .insert(chatMessages)
      .values({
        chatId: parsedInput.chatId,
        senderId: user.id,
        text: parsedInput.text,
      })
      .returning();

    await db
      .update(chats)
      .set({ updatedAt: new Date() })
      .where(eq(chats.id, parsedInput.chatId));

    return message;
  });

export const updateChatMessageAction = actionClient
  .inputSchema(updateChatMessageSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const message = await db.query.chatMessages.findFirst({
      where: and(
        eq(chatMessages.id, parsedInput.id),
        eq(chatMessages.senderId, user.id),
      ),
    });

    if (!message) {
      return { error: "Message not found." };
    }

    const [updatedMessage] = await db
      .update(chatMessages)
      .set({
        text: parsedInput.text,
        updatedAt: new Date(),
      })
      .where(eq(chatMessages.id, message.id))
      .returning();

    await db
      .update(chats)
      .set({ updatedAt: new Date() })
      .where(eq(chats.id, message.chatId));

    return updatedMessage;
  });

export const deleteChatMessageAction = actionClient
  .inputSchema(deleteChatMessageSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();

    const [message] = await db
      .delete(chatMessages)
      .where(
        and(
          eq(chatMessages.id, parsedInput.id),
          eq(chatMessages.senderId, user.id),
        ),
      )
      .returning();

    if (!message) {
      return { error: "Message not found." };
    }

    await db
      .update(chats)
      .set({ updatedAt: new Date() })
      .where(eq(chats.id, message.chatId));

    return message;
  });

export const addChatParticipantAction = actionClient
  .inputSchema(chatParticipantSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();
    const participant = await requireChatParticipant(
      parsedInput.chatId,
      user.id,
    );

    if (!participant) {
      return { error: "Chat not found." };
    }

    const [createdParticipant] = await db
      .insert(chatParticipants)
      .values({
        chatId: parsedInput.chatId,
        userId: parsedInput.userId,
      })
      .onConflictDoNothing()
      .returning();

    await db
      .update(chats)
      .set({ updatedAt: new Date() })
      .where(eq(chats.id, parsedInput.chatId));

    if (createdParticipant) {
      return createdParticipant;
    }

    // Participant already existed — fetch and return the existing one
    const existingParticipant = await db.query.chatParticipants.findFirst({
      where: and(
        eq(chatParticipants.chatId, parsedInput.chatId),
        eq(chatParticipants.userId, parsedInput.userId),
      ),
    });

    return existingParticipant;
  });

export const removeChatParticipantAction = actionClient
  .inputSchema(chatParticipantSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();
    const participant = await requireChatParticipant(
      parsedInput.chatId,
      user.id,
    );

    if (!participant) {
      return { error: "Chat not found." };
    }

    const [removedParticipant] = await db
      .delete(chatParticipants)
      .where(
        and(
          eq(chatParticipants.chatId, parsedInput.chatId),
          eq(chatParticipants.userId, parsedInput.userId),
        ),
      )
      .returning();

    await db
      .update(chats)
      .set({ updatedAt: new Date() })
      .where(eq(chats.id, parsedInput.chatId));

    return removedParticipant;
  });

export const deleteChatAction = actionClient
  .inputSchema(chatIdSchema)
  .action(async ({ parsedInput }) => {
    const user = await requireUser();
    const participant = await requireChatParticipant(parsedInput.id, user.id);

    if (!participant) {
      return { error: "Chat not found." };
    }

    const [chat] = await db
      .delete(chats)
      .where(eq(chats.id, parsedInput.id))
      .returning();

    return chat;
  });

import { z } from "zod";

export const createChatSchema = z.object({
  initialMessage: z.string().trim().min(1).max(4000).optional(),
  participantUserIds: z.array(z.string().min(1)).min(1).max(20),
});

export const chatIdSchema = z.object({
  id: z.string().min(1),
});

export const sendChatMessageSchema = z.object({
  chatId: z.string().min(1),
  text: z.string().trim().min(1, "Enter a message.").max(4000),
});

export const updateChatMessageSchema = z.object({
  id: z.string().min(1),
  text: z.string().trim().min(1, "Enter a message.").max(4000),
});

export const deleteChatMessageSchema = z.object({
  id: z.string().min(1),
});

export const chatParticipantSchema = z.object({
  chatId: z.string().min(1),
  userId: z.string().min(1),
});

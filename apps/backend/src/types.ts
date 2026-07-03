import { z } from "zod";

export const CreateUserSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(20),
});

export const CreateAvatarSchema = z.object({
  name: z.string().min(3).max(20),
  description: z.string().min(10).max(200),
  imageUrl: z.string().url(),
  userId: z.number(),
});

import { z } from "zod";
export const createUserValidation = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
    role: z.enum(["admin", "candidate", "employee"]),
    email: z.string().email(),
    password: z.string().min(8),
    avatar: z.string().url(),
  }),
});

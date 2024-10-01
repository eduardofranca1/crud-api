import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Invalid email address." }),
  password: z.string({ message: "Password is required." }),
});

export type AuthSchema = z.infer<typeof authSchema>;

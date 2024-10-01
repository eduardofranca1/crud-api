import { z } from "zod";
import { checkUserEmail } from "../Validations/StringSchema";

export const updateUserSchema = z.object({
  name: z.string({
    required_error: "Name is required.",
  }),
  email: checkUserEmail,
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

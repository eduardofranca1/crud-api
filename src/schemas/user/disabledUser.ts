import { z } from "zod";

export const disabledUserSchema = z.object({
  _id: z.string({ required_error: "ID is required" }).length(24),
});

export type DisabledUserSchema = z.infer<typeof disabledUserSchema>;

import { z } from "zod";

export const queryIdSchema = z.object({
  _id: z.string({ required_error: "ID is required" }).length(24),
});

export type QueryIdSchema = z.infer<typeof queryIdSchema>;

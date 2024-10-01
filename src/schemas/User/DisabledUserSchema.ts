import { z } from "zod";

export const disabledUserSchema = z.object({
  disabled: z.boolean({
    required_error: "Disabled is required",
  }),
});

export type DisabledUserSchema = z.infer<typeof disabledUserSchema>;

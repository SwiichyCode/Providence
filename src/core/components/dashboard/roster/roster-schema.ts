import * as z from "zod";

export const formSchema = z.object({
  roster: z.boolean().default(false).optional(),
});

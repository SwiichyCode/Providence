import * as z from "zod";

export const formSchema = z.object({
  deposit: z.boolean().default(false).optional(),
});

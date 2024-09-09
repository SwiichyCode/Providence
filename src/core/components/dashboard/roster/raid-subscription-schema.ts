import * as z from "zod";

export const formSchema = z.object({
  rosterSubscribed: z.boolean().default(false).optional(),
});

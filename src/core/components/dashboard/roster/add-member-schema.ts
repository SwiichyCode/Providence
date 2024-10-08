import * as z from "zod";

export const formSchema = z.object({
  pseudo: z.string().min(1),
  class: z.string().min(1),
  specialization: z.string().optional(),
  role: z.string().min(1),
  appreciation: z.string().optional(),
});

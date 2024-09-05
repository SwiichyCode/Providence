import * as z from "zod";

export const formSchema = z.object({
  pseudo: z.string().min(1),
  battleTag: z.string().min(1),
  discord: z.string().min(1),
  class: z.string().min(1),
  specialization: z.string().min(1),
  faction: z.string().min(1),
  raiderIo: z.string().url().or(z.literal("")),
  warcraftLogs: z.string().url().or(z.literal("")),
  presentation: z.string().min(1),
  motivation: z.string().min(1),
});

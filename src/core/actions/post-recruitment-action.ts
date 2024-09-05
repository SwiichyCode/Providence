"use server";

import {
  actionClient,
  ServerActionError,
} from "@/config/libs/next-safe-action";
import { db } from "@/config/server/db";
import * as z from "zod";

const schema = z.object({
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

export const postRecruitmentAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    try {
      await db.recruitment.create({
        data: {
          pseudo: parsedInput.pseudo,
          battleTag: parsedInput.battleTag,
          discord: parsedInput.discord,
          class: parsedInput.class,
          specialization: parsedInput.specialization,
          faction: parsedInput.faction,
          raiderIo: parsedInput.raiderIo,
          warcraftLogs: parsedInput.warcraftLogs,
          presentation: parsedInput.presentation,
          motivation: parsedInput.motivation,
        },
      });
    } catch (error) {
      throw new ServerActionError(`Error while posting recruitment`);
    }
  });

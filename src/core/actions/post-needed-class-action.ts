"use server";

import { revalidatePath } from "next/cache";
import { adminAction, ServerActionError } from "@/config/libs/next-safe-action";
import { db } from "@/config/server/db";
import { URL } from "@/config/constants/url";
import * as z from "zod";

const schema = z.object({
  id: z.string().optional(),
  class: z.array(z.string()),
});

export const postNeededClassAction = adminAction
  .schema(schema)
  .action(async ({ parsedInput }) => {
    try {
      if (parsedInput.id) {
        const existingEntry = await db.neededClass.findUnique({
          where: { id: parsedInput.id },
        });

        if (existingEntry) {
          await db.neededClass.update({
            where: { id: parsedInput.id },
            data: { class: parsedInput.class },
          });
        } else {
          await db.neededClass.create({
            data: { id: parsedInput.id, class: parsedInput.class },
          });
        }
      } else {
        await db.neededClass.create({
          data: { class: parsedInput.class },
        });
      }

      revalidatePath(URL.SETTINGS);
    } catch (error) {
      throw new ServerActionError("Error while posting needed class");
    }
  });

import * as z from "zod";

const class_ = [
  "Death Knight",
  "Demon Hunter",
  "Druid",
  "Evoker",
  "Hunter",
  "Mage",
  "Monk",
  "Paladin",
  "Priest",
  "Rogue",
  "Shaman",
  "Warlock",
  "Warrior",
] as const;

export type ClassType = (typeof class_)[number];

export const formSchema = z.object({
  class: z.enum(class_).array(),
});

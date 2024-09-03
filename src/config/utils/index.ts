import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function classColor(className: string) {
  switch (className) {
    case "Death Knight":
      return "#C41E3A";
    case "Demon Hunter":
      return "#A330C9";
    case "Druid":
      return "#FF7C0A";
    case "Evoker":
      return "#FF7C0A";
    case "Hunter":
      return "#AAD372";
    case "Mage":
      return "#3FC7EB";
    case "Monk":
      return "#00DC4F";
    case "Paladin":
      return "#F48CBA";
    case "Priest":
      return "#FFF1C5";
    case "Rogue":
      return "#FFF468";
    case "Shaman":
      return "#0070DD";
    case "Warlock":
      return "#8788E7";
    case "Warrior":
      return "#C69B6D";
    default:
      return "#000000";
  }
}

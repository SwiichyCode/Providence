import { createBlizzardApiClient } from "@blizzard-api/client";

export const blizzardClient = await createBlizzardApiClient({
  key: "43eca12a73724da6963915525aeff34f",
  secret: "WDQp02XVVFvzp0woWVEnizKaQWQHhx4V",
  origin: "eu",
});

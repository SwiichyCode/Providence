import { blizzardClient } from "@/config/libs/blizzard-api";
import { wow } from "@blizzard-api/wow";

export default async function Page() {
  const response = await blizzardClient.getAccessToken();

  const guildResponse = await blizzardClient.sendRequest(
    wow.guild("les-clairvoyants", "prøvidence"),
    {
      token: response.data.access_token,
      locale: "fr_FR",
    },
  );

  const guildRosterResponse = await blizzardClient.sendRequest(
    wow.guildRoster("les-clairvoyants", "prøvidence"),
    {
      token: response.data.access_token,
      locale: "fr_FR",
    },
  );

  return (
    <div>
      <h1>Blizzard</h1>
    </div>
  );
}

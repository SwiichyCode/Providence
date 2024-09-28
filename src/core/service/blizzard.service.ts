import { blizzardClient } from "@/config/libs/blizzard-api";
import { wow } from "@blizzard-api/wow";
import { GUILD } from "@/config/constants/guild";

class BlizzardService {
  private accessToken: string;

  constructor() {
    this.accessToken = "";
  }

  async initialize() {
    const response = await blizzardClient.getAccessToken();
    this.accessToken = response.data.access_token;
  }

  async getGuildRoster(guildName: string, realm: string) {
    await this.initialize();

    try {
      const response = await blizzardClient.sendRequest(
        wow.guildRoster(realm, guildName),
        {
          token: this.accessToken,
          locale: "fr_FR",
        },
      );

      return response.data.members;
    } catch (error) {
      console.error(`Error fetching guild roster:`, error);
    }
  }

  async getMembersProfile() {
    const members = (await this.getGuildRoster(GUILD.NAME, GUILD.REALM)) ?? [];

    const rosterRank = 3;
    const rosterIlvl = 610;

    const filteredMembers = members.filter(
      (member) => member.rank <= rosterRank,
    );

    try {
      return await Promise.all(
        filteredMembers.map(async (member) => {
          const response = await blizzardClient.sendRequest(
            wow.characterProfileSummary(
              member.character.realm.slug,
              member.character.name,
            ),
            {
              token: this.accessToken,
              locale: "en_US",
            },
          );

          return {
            name: member.character.name,
            ilvl: response.data.equipped_item_level,
            class: response.data.character_class.name,
            spec: response.data.active_spec.name,
            realm: member.character.realm.slug,
          };
        }),
      );
    } catch (error) {
      console.error(`Error fetching members profile:`, error);
    }
  }
}

export const blizzardService = new BlizzardService();

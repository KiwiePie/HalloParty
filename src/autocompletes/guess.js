import UserManager from '../managers/user_manager';
import PartyManager from '../managers/party_manager';

export const guess = {
  /** @param { import('discord.js').AutocompleteInteraction } interaction */
  handle: async function (interaction) {
    const partyId = await UserManager.getParty(interaction.user.id);
    if (!partyId) return await interaction.respond([]);

    const party = await PartyManager.fetchParty(interaction.client, partyId);
    const allPlayers = await party.getAllplayers();
    const plrs = allPlayers.filter(p => p._id !== interaction.user.id);
    return await interaction.respond(
      plrs.map(p => ({ name: p.clone, value: p.clone }))
    );
  },
};

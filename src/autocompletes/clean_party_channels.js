import PartyManager from '../managers/party_manager';

export const clean_party_channels = {
  /** @param { import('discord.js').AutocompleteInteraction } interaction */
  handle: async function (interaction) {
    const parties = await PartyManager.fetchParties(interaction.guildId);
    const p = parties.map(party => ({ name: party.name, value: party._id }));
    await interaction.respond(p);
  },
};

import PartyManager from '../managers/party_manager';

export const clean_party_cahnnels = {
  data: {
    name: 'clean_party_channels',
    description: 'Mod command for deleting a party and related channels',
    options: [
      {
        type: 3,
        name: 'party',
        description: 'Choose the party to delete',
        autocomplete: true,
      },
    ],
  },

  /** @param { import('discord.js').ChatInputCommandInteraction } interaction */
  handle: async function (interaction) {
    const i = await interaction.deferReply({ ephemeral: true });

    const partyId = interaction.options.get('party').value;
    if (!partyId)
      return await i.interaction.editReply({
        content: 'Something went wrong, party doesnt exist',
      });
    const partyManager = await PartyManager.fetchParty(
      interaction.client,
      partyId
    );
    await partyManager.removeParty();
    await i.interaction.editReply({
      content: 'Removed party',
    });
  },
};

import PartyManager from '../managers/party_manager';
import UserManager from '../managers/user_manager';

export const leave_party = {
  data: {
    name: 'leave_party',
    description: 'Leave the party',
  },

  /** @param { import('discord.js').ChatInputCommandInteraction } interaction */
  handle: async function (interaction) {
    const i = await interaction.deferReply({ ephemeral: true });
    const partyId = UserManager.getParty(interaction.user.id);
    if (!partyId)
      return await i.interaction.editReply({
        content: 'You are not in any party',
      });
    const partyManager = await PartyManager.fetchParty(
      interaction.client,
      partyId
    );
    const cloneName = await UserManager.getCloneName(interaction.user.id);
    partyManager.systemMessage(`**${cloneName}** left the party.`);

    await partyManager.removePlayer(interaction.user.id);
    i.interaction.editReply({ content: 'You were removed from the party' });
  },
};

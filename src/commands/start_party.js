import PartyManager from '../managers/party_manager';
import UserManager from '../managers/user_manager';

export const start_party = {
  data: {
    name: 'start_party',
    description: 'start a party!',
    options: [
      {
        name: 'name',
        description: 'Party name',
        type: 3,
        required: true,
      },
    ],
  },

  /**
   * @param { import('discord.js').ChatInputCommandInteraction } interaction
   * This commented out stuff provides intellisense
   * You can ignore this
   */
  handle: async function (interaction) {
    const i = await interaction.deferReply({ ephemeral: true });
    if (await UserManager.getParty(interaction.user.id))
      return await i.interaction.update({
        content: 'You are already in a party',
      });

    const party = await PartyManager.start(
      interaction.client,
      interaction.guild.id,
      interaction.options.get('name').value
    );

    const channel = await party.addPlayer(interaction.user.id);
    // await (
    //   await PartyManager.fetchParty(interaction.client, party.partyId)
    // ).send(interaction.user.id, 'I joined');

    i.interaction.editReply({
      content: `Party was started! You were added. Your channel is <#${channel.id}>`,
    });
  },
};

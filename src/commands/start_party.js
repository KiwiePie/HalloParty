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
    if (await UserManager.getParty(interaction.user.id))
      return await interaction.reply({
        content: 'You are already in a party',
        ephemeral: true,
      });

    const party = await PartyManager.start(
      interaction.client,
      interaction.guild.id,
      interaction.options.get('name').value
    );

    await party.addPlayer(interaction.user.id);

    interaction.reply({ content: 'Party was started!' });
  },
};

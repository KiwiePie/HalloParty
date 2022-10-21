import UserManager from '../managers/user_manager';

export const costume = {
  data: {
    name: 'costume',
    description: 'Put on a costume!',
  },

  /**
   * @param { import('discord.js').ChatInputCommandInteraction } interaction
   * This commented out stuff provides intellisense
   * You can ignore this
   */
  handle: async function (interaction) {
    const partyId = await UserManager.getParty(interaction.user.id);
    if (partyId)
      return await interaction.reply({
        content: 'You cant change costume or name while you are in a party',
        ephemeral: true,
      });

    interaction.reply({
      ephemeral: true,
      components: [
        {
          type: 1,
          components: [
            {
              type: 3,
              custom_id: 'costume_0',
              options: [
                {
                  label: 'Choose costume',
                  value: 'choose',
                  description: 'Choose one of the default costumes',
                },
                {
                  label: 'Build costume',
                  value: 'build',
                  description: 'Build your custom costume',
                },
              ],
            },
          ],
        },
      ],
    });
  },
};

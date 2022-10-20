import UserManager from '../managers/user_manager';

export const get_started = {
  data: {
    name: 'get_started',
    description: 'Make a clone of yourself!',
    options: [
      {
        name: 'clone_name',
        description: 'Username of your clone',
        type: 3,
        required: true,
      },
      {
        name: 'costume',
        description: 'Choose a costume',
        type: 3,
        required: true,
        choices: [
          {
            name: 'Costume 1',
            value: 'costume_1',
          },
          {
            name: 'Costume 2',
            value: 'costume_2',
          },

          {
            name: 'Costume 3',
            value: 'costume_3',
          },
        ],
      },
    ],
  },

  /**
   * @param { import('discord.js').ChatInputCommandInteraction } interaction
   * This commented out stuff provides intellisense
   * You can ignore this
   */
  handle: async function (interaction) {
    const user = new UserManager(interaction.client, interaction.user.id);
    await user.getStarted(
      interaction.options.get('clone_name').value,
      interaction.options.get('costume').value
    );
    interaction.reply({ content: 'Clone created', ephemeral: true });
  },
};

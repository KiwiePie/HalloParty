import UserManager from '../managers/user_manager';

export const guess = {
  data: {
    name: 'guess',
    description: 'Guess a player',
    options: [
      {
        type: 3,
        name: 'player',
        description: 'Choose the player guess',
        required: true,
        autocomplete: true,
      },
      {
        type: 6,
        name: 'user',
        description: 'Select user to make the guess',
        required: true,
      },
    ],
  },

  /** @param { import('discord.js').ChatInputCommandInteraction } interaction */
  handle: async function (interaction) {
    const cloneGuess = interaction.options.get('player').value;
    const user = interaction.options.getUser('user');
    const cloneName = await UserManager.getCloneName(user.id);
    if (cloneGuess === cloneName)
      return await interaction.reply({
        content: 'con grtulations, you guessed right',
        ephemeral: true,
      });
    return await interaction.reply({ content: 'wrong guess', ephemeral: true });
  },
};

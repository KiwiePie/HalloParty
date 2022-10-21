import PartyManager from '../managers/party_manager';
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
    const i = await interaction.deferReply({ ephemeral: true });

    const cloneGuess = interaction.options.get('player').value;
    const user = interaction.options.getUser('user');
    const cloneName = await UserManager.getCloneName(user.id);
    const partyId = await UserManager.getParty(interaction.user.id);

    if (cloneGuess === cloneName) {
      const partyManager = await PartyManager.fetchParty(
        interaction.client,
        partyId
      );

      const guesserCloneName = await UserManager.getCloneName(
        interaction.user.id
      );
      await partyManager.systemMessage(
        `**${guesserCloneName}** guessed ${cloneName} (${user})`
      );
      await partyManager.removeGuessedPlayer(user.id);

      return await i.interaction.editReply({
        content: 'congratulations, you guessed right',
        ephemeral: true,
      });
    }
    return await i.interaction.editReply({
      content: 'wrong guess',
      ephemeral: true,
    });
  },
};

import PartyManager from '../managers/party_manager';
import UserManager from '../managers/user_manager';

export const join_party = {
  data: {
    name: 'join_party',
    description: 'Join a party in the server',
    options: [
      {
        name: 'party',
        description: 'Select a party to join',
        type: 3,
        required: true,
        autocomplete: true,
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

    if (!(await UserManager.getUser(interaction.user.id)))
      return i.interaction.editReply({
        content:
          'You are not registered yet!. Use the </costume:1032293823755321444> command to get registered',
        ephemeral: true,
      });
    if (await UserManager.getParty(interaction.user.id))
      return i.interaction.editReply({
        content: 'You are already in a party',
        ephemeral: true,
      });
    const user = new UserManager(interaction.client, interaction.user.id);
    const partyId = interaction.options.get('party')?.value;
    if (!partyId)
      return await i.interaction.editReply({
        content: 'Something went wrong, party was not found',
        ephemeral: true,
      });

    const gp = await PartyManager.getAllGuessedPlayers(partyId);
    if (gp?.includes(interaction.user.id))
      return await i.interaction.editReply({
        content: 'You were guessed in that party, cannot join back',
        ephemeral: true,
      });

    const channel = await user.joinParty(partyId);

    i.interaction.editReply({
      content: `Joined party. Your channel is <#${channel.id}>`,
      ephemeral: true,
    });

    const partyManager = await PartyManager.fetchParty(
      interaction.client,
      partyId
    );
    const cloneName = await UserManager.getCloneName(interaction.user.id);
    partyManager.systemMessage(`**${cloneName}** has entered the party.`);
  },
};

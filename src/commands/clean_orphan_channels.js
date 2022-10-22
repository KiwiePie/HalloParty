import PartyManager from '../managers/party_manager';

export const clean_orphan_channels = {
  data: {
    name: 'clean_orphan_channels',
    description: 'Clean all channels of users who are not in a party',
  },

  /** @param { import('discord.js').ChatInputCommandInteraction }  interaction */
  handle: async function (interaction) {
    const i = await interaction.deferReply({ ephemeral: true });

    if (!interaction.member.permissions.has(16n))
      return await i.interaction.editReply({
        content:
          'You dont have the permission. You need the MANAGE_CHANNELS permision.',
      });

    await PartyManager.cleanOrphans(interaction.guild);
    i.interaction.editReply({
      content: 'Removed all.',
    });
  },
};

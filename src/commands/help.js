export const help = {
  data: {
    name: 'help',
    description: 'Show HalloParty help',
  },

  /** @param { import('discord.js').ChatInputCommandInteraction } interaction */
  handle: async function (interaction) {
    interaction.reply({
      content: `List of commands:

</costume:1032293823755321444> :: to set a costume and alias
</start_party:1030382597093740596> :: to start a party
</join_party:1030498468801810464> :: to join a party
</guess:1032633629450436729> :: to expose someone
</leave_party:1033076644149219388> :: to leave the party
</clean_party_channels:1033076638860181566> :: for mods (with MANAGE_CHANNELS perm) to delete a party and all related channels
</clean_orphan_channels:1033094490807873566> :: for mods (with MANAGE_CHANNELS perm) to delete all channels of users who are not in a party
    `,
    });
  },
};

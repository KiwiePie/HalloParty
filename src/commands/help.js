export const help = {
  data: {
    name: 'help',
    description: 'Show HalloParty help',
  },

  /** @param { import('discord.js').ChatInputCommandInteraction } interaction */
  handle: async function (interaction) {
    interaction.reply({
      content: `List of commands:

</costume:> :: to set a costume and alias
</start_party:> :: to start a party
</join_party:> :: to join a party
</guess:> :: to expose someone
</leave_party:> :: to leave the party
</cleanPartyChannels:> :: for mods to delete a party and all related channels
    `,
    });
  },
};

export const ping = {
  /** @param { import('discord.js').ButtonInteraction } interaction */
  handle: async function (interaction, params) {
    console.log(params);
    await interaction.reply('Ping Pong!');
  },
};

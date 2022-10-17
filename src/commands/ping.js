import { SlashCommandBuilder } from 'discord.js';

export const ping = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping!')
    .toJSON(),

  /**
   * @param { import('discord.js').ChatInputCommandInteraction } interaction
   * This commented out stuff provides intellisense
   */
  handle: function (interaction) {
    interaction.reply({ content: 'Pong!' });
  },
};

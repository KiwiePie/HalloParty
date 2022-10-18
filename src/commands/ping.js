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
    interaction.reply({
      content: 'Pong!',
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: 'Ping',
              style: 3,
              custom_id: JSON.stringify({ name: 'ping', a: 'hi' }),
            },
          ],
        },
      ],
    });
  },
};

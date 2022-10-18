import * as buttons from '../buttons';

/** @param { import('discord.js').ButtonInteraction } interaction */
export default async function (interaction) {
  const params = JSON.parse(interaction.customId);
  const button = buttons[params.name];
  if (!button)
    return interaction.reply({
      content: "This button isn't handled... smh dev",
      ephemeral: true,
    });
  return await button.handle(interaction, params);
}

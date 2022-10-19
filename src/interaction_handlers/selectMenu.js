import * as selectMenus from '../select_menus';

/** @param { import('discord.js').SelectMenuInteraction } interaction */
export default async function (interaction) {
  const selectMenu = selectMenus[interaction.customId];
  if (!selectMenu)
    return interaction.reply({
      content: "This menu isn't handled... smh dev",
      ephemeral: true,
    });
  return await selectMenu.handle(interaction);
}

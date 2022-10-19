import chatInputCommand from './chatInputCommand';
import button from './button';
import autocomplete from './autocomplete';
import selectMenu from './selectMenu';
import modalSubmit from './modalSubmit';

/** @param { import('discord.js').BaseInteraction } interaction */
export default async function (interaction) {
  if (interaction.isChatInputCommand())
    return await chatInputCommand(interaction);
  if (interaction.isButton()) return await button(interaction);
  if (interaction.isAutocomplete()) return await autocomplete(interaction);
  if (interaction.isSelectMenu()) return await selectMenu(interaction);
  if (interaction.isModalSubmit()) return await modalSubmit(interaction);
}

import chatInputCommand from './chatInputCommand';
import button from './button';
import autocomplete from './autocomplete';

/** @param { import('discord.js').BaseInteraction } interaction */
export default async function (interaction) {
  if (interaction.isChatInputCommand())
    return await chatInputCommand(interaction);
  if (interaction.isButton()) return await button(interaction);
  if (interaction.isAutocomplete()) return await autocomplete(interaction);
}

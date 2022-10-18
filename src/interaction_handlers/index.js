import chatInputCommand from './chatInputCommand';
import button from './button';

/** @param { import('discord.js').BaseInteraction } interaction */
export default async function (interaction) {
  if (interaction.isChatInputCommand())
    return await chatInputCommand(interaction);
  if (interaction.isButton()) return await button(interaction);
}

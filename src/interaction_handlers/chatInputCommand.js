import * as commands from '../commands';

/** @param { import('discord.js').ChatInputCommandInteraction } interaction */
export default async function (interaction) {
  const command = commands[interaction.commandName];
  if (!command)
    return interaction.reply({
      content: 'Command isnt handled, smh dev',
      ephemeral: true,
    });
  return await command.handle(interaction);
}

import * as autocompletes from '../autocompletes';

/** @param { import('discord.js').AutocompleteInteraction } interaction */
export default async function(interaction) {
  const autocomplete = autocompletes[interaction.commandName];
  if (!autocomplete) {
    console.log(`Autocomplete for ${interaction.commandName} is not handled`);
    return interaction.respond([]);
  }
  return await autocomplete.handle(interaction);
}

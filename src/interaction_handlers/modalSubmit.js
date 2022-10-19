import * as modalSubmits from '../modalSubmits';

/** @param { import('discord.js').ModalSubmitInteraction } interaction */
export default async function (interaction) {
  const modalSubmit = modalSubmits[interaction.customId];
  if (!modalSubmit)
    return interaction.reply({
      content: "This modal isn't handled... smh dev",
      ephemeral: true,
    });
  return await modalSubmit.handle(interaction);
}

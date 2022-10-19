import UserManager from '../managers/user_manager';

export const choose_cost = {
  /** @param { import('discord.js').ModalSubmitInteraction } interaction */
  handle: async function (interaction) {
    const cloneName = interaction.fields.getField('clone_name').value;
    const userManager = new UserManager(
      interaction.client,
      interaction.user.id
    );
    await userManager.changeCloneName(cloneName);

    interaction.reply({
      content: `done`,
      ephemeral: true,
    });
  },
};

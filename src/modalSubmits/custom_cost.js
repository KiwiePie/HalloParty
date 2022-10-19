import UserManager from '../managers/user_manager';

export const custom_cost = {
  /** @param { import('discord.js').ModalSubmitInteraction } interaction */
  handle: async function (interaction) {
    const imageLink = interaction.fields.getField('cost_image_link').value;
    const cloneName = interaction.fields.getField('clone_name').value;
    const userManager = new UserManager(
      interaction.client,
      interaction.user.id
    );
    await userManager.changeCloneName(cloneName);
    const costume = await userManager.registerCostume(
      cloneName,
      'custom',
      imageLink
    );
    await userManager.changeCostume(costume._id);

    interaction.reply({
      content: `done`,
      ephemeral: true,
    });
  },
};

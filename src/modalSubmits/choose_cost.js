import UserManager from '../managers/user_manager';

export const choose_cost = {
  /** @param { import('discord.js').ModalSubmitInteraction } interaction */
  handle: async function (interaction) {
    const cloneName = interaction.fields.getField('clone_name').value;
    const costumeId = interaction.fields.getField('cost_id').value;
    const userManager = new UserManager(
      interaction.client,
      interaction.user.id
    );
    const costume = userManager.getCostume(costumeId);
    if (!costume)
      return await interaction.reply({
        content: `error: please dont change the costume id`,
        ephemeral: true,
      });
    await userManager.changeCloneName(cloneName);
    await userManager.changeCostume(costumeId);

    interaction.reply({
      content: `done`,
      ephemeral: true,
    });
  },
};

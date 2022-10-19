import UserManager from '../managers/user_manager';

export const costume_0 = {
  /** @param { import('discord.js').SelectMenuInteraction } interaction */
  handle: async function (interaction) {
    const costumes = await UserManager.getDefaultCostumes();

    switch (interaction.values[0]) {
      case 'choose':
        await interaction.update({
          embeds: [
            {
              title: costumes[0].name,
              image: { url: costumes[0].img_src },
            },
          ],
          components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  label: 'Select',
                  style: 3,
                  custom_id: JSON.stringify({
                    name: 'cost_select',
                    id: costumes[0]._id,
                  }),
                },
                {
                  type: 2,
                  label: 'Next',
                  style: 3,
                  custom_id: JSON.stringify({ name: 'cost_next', p: 1 }),
                },
              ],
            },
          ],
        });
        break;
      case 'build':
        await interaction.showModal({
          title: 'Custom Costume',
          custom_id: 'custom_cost',
          components: [
            {
              type: 1,
              components: [
                {
                  type: 4,
                  custom_id: 'clone_name',
                  style: 1,
                  label: 'Insert an alias for your anonymous self',
                },
              ],
            },
            {
              type: 1,
              components: [
                {
                  type: 4,
                  custom_id: 'cost_image_link',
                  style: 1,
                  label: 'Insert direct image link',
                },
              ],
            },
          ],
        });
        break;
    }
  },
};

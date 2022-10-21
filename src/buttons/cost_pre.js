import UserManager from '../managers/user_manager';

export const cost_pre = {
  /** @param { import('discord.js').ButtonInteraction } interaction */
  handle: async function (interaction, params) {
    const costumes = await UserManager.getDefaultCostumes();
    const max = costumes.length;

    await interaction.update({
      embeds: [
        {
          title: costumes[params.p].name,
          image: { url: costumes[params.p].img_src },
        },
      ],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: 'Previous',
              style: 3,
              custom_id: JSON.stringify({ name: 'cost_pre', p: params.p - 1 }),
              disabled: params.p <= 0,
            },
            {
              type: 2,
              label: 'Select',
              style: 3,
              custom_id: JSON.stringify({
                name: 'cost_select',
                id: costumes[params.p]._id,
              }),
            },
            {
              type: 2,
              label: 'Next',
              style: 3,
              custom_id: JSON.stringify({ name: 'cost_next', p: params.p + 1 }),
              disabled: params.p >= max,
            },
          ],
        },
      ],
    });
  },
};

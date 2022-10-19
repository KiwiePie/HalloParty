import { Collection } from 'discord.js';

/** @type { import('./types').Cache } */
const cache = {
  parties: new Collection(),
  non_party_channels: [],
  default_costumes: new Collection(),
};

export default cache;

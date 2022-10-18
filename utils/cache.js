import { Collection } from 'discord.js';

/** @type { import('./types').Cache } */
const cache = {
  parties: new Collection(),
  non_party_channels: [],
};

export default cache;

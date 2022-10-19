import { Client } from 'discord.js';
import envMissingErr from '../utils/env_missing_err';
import mongoose from 'mongoose';
import interactionHandler from './interaction_handlers';
import { messageCreate as messageCreateHandler } from './other_event_handlers';

if (!process.env.TOKEN) envMissingErr('TOKEN');

const client = new Client({ intents: 1 | (1 << 9) | (1 << 15) });

console.log(
  'Wait for the database to get connected and the bot to get ready...'
);

client.once('ready', () => {
  console.log('Bot ready...');
});

client.on('interactionCreate', async interaction => {
  await interactionHandler(interaction);
});

client.on('messageCreate', messageCreateHandler);

client.on('error', console.log);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected...'));

client.login(process.env.TOKEN);

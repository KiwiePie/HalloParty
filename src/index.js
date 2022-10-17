import { Client } from 'discord.js';
import * as commands from './commands';
import envMissingErr from '../utils/env_missing_err';
import mongoose from 'mongoose';

if (!process.env.TOKEN) envMissingErr('TOKEN');

const client = new Client({ intents: [] });

client.once('ready', () => {
  console.log('Ready...');
});

client.on('interactionCreate', async interaction => {
  if (interaction.isCommand) {
    const command = commands[interaction.commandName];
    await command.handle(interaction);
  }
});

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
client.login(process.env.TOKEN);

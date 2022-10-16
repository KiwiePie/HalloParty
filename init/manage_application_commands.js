import inquirer from 'inquirer';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import * as localCommands from '../src/commands';
import envMissingErr from '../utils/env_missing_err';

if (!process.env.TOKEN) envMissingErr('TOKEN');
if (!process.env.CLIENT_ID) envMissingErr('CLIENT_ID');

const rest = new REST({ version: 10 }).setToken(process.env.TOKEN);

const answers = await inquirer.prompt([
  {
    type: 'list',
    name: 'type',
    message: 'Type of the commands to manage',
    choices: [
      { value: 0, name: 'Global' },
      { value: 1, name: 'Guild' },
    ],
  },
  {
    type: 'input',
    name: 'guild_id',
    when: ans => ans.type,
    deafult: process.env.GUILD_ID,
    message: 'Provide Guild ID. (Press return to use the one in env var)',
    validate: input =>
      Boolean(process.env.GUILD_ID) ||
      Boolean(input) ||
      'Either set a GUILD_ID env variable or enter a guild id here',
  },
  {
    type: 'list',
    name: 'function',
    message: 'Select an operation',
    choices: [
      { name: 'View all', value: 0 },
      { name: 'View One (details)', value: 1 },
      { name: 'Add or Update', value: 2 },
      { name: 'Delete', value: 3 },
    ],
  },
  {
    type: 'list',
    name: 'view_1_choice',
    when: ans => ans.function === 1,
    message: 'Select a command',
    choices: async function (ans) {
      const route = ['applicationCommands', 'applicationGuildCommands'][
        ans.type
      ];
      const commands = await rest.get(
        Routes[route](
          process.env.CLIENT_ID,
          process.env.GUILD_ID || ans.guild_id
        )
      );
      if (!commands.length) {
        console.error('No commands to view');
        process.exit(404);
      }
      return commands.map(cmd => ({ value: cmd.id, name: cmd.name }));
    },
  },
  {
    type: 'checkbox',
    name: 'add_choice',
    when: ans => ans.function === 2,
    message: 'Select a command',
    choices: function () {
      const a = Object.entries(localCommands).map(([key, val]) => ({
        value: key,
        name: val.data.name,
      }));
      if (!a.length) {
        console.error('No commands to found to add');
        process.exit(404);
      }
      return a;
    },
  },
  {
    type: 'checkbox',
    name: 'del_choice',
    when: ans => ans.function === 3,
    message: 'Select a command',
    choices: async function (ans) {
      const route = ['applicationCommands', 'applicationGuildCommands'][
        ans.type
      ];
      const commands = await rest.get(
        Routes[route](
          process.env.CLIENT_ID,
          process.env.GUILD_ID || ans.guild_id
        )
      );
      if (!commands.length) {
        console.error('No commands found to delete');
        process.exit(404);
      }
      return commands.map(cmd => ({ value: cmd.id, name: cmd.name }));
    },
  },
]);

const pRoute = ['applicationCommands', 'applicationGuildCommands'][
  answers.type
];
const sRoute = ['applicationCommand', 'applicationGuildCommand'][answers.type];

switch (answers.function) {
  case 0:
    const commands = await rest.get(
      Routes[pRoute](
        process.env.CLIENT_ID,
        process.env.GUILD_ID || answers.guild_id
      )
    );
    console.log(`Showing all ${answers.type ? 'guild' : 'global'} commands:\n`);
    console.log(
      commands
        .map(
          cmd => `ID: ${cmd.id}\nName: ${cmd.name}\nDesc: ${cmd.description}`
        )
        .join('\n\n')
    );
    break;
  case 1:
    const command = await rest.get(
      Routes[sRoute](
        ...[
          process.env.CLIENT_ID,
          (answers.type && process.env.GUILD_ID) || answers.guild_id,
          answers.view_1_choice,
        ].filter(Boolean)
      )
    );
    console.log(command);
    break;
  case 2:
    for (let cmd of answers.add_choice) {
      await rest
        .post(
          Routes[pRoute](
            process.env.CLIENT_ID,
            process.env.GUILD_ID || answers.guild_id
          ),
          { body: localCommands[cmd].data }
        )
        .then(() => console.log(`Added command: ${cmd}`))
        .catch(e => console.log(`Couldn't add command: ${cmd} : ${e}`));
    }
    break;
  case 3:
    for (let cmd of answers.del_choice) {
      await rest
        .delete(
          Routes[sRoute](
            ...[
              process.env.CLIENT_ID,
              (answers.type && process.env.GUILD_ID) || answers.guild_id,
              cmd,
            ].filter(Boolean)
          )
        )
        .then(() => console.log(`Deleted command. ID: ${cmd}`))
        .catch(e => console.log(`Couldn't delete command. ID: ${cmd} : ${e}`));
    }
    break;
}

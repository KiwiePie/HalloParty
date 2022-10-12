const prompt = require('prompt-sync')(); //package for requesting user input
const fs = require('fs');
const defaultCostumes = require('./default-costumes.json'); //load default halloween costumes
const { REST, Routes } = require('discord.js');

if(!fs.existsSync('./client-info.json')) { //check if client information file exists
    var id = prompt("Paste Discord Bot ID: ");
    var token = prompt("Paste Discord Bot Token: ");
    var botInfo = {
        clientId: id,
        clientToken: token,
    };
    const jsonString = JSON.stringify(botInfo);
    console.log(jsonString);
    fs.writeFileSync('./client-info.json', jsonString)
}
 const data = fs.readFileSync('./client-info.json');
 const clientInfo = JSON.parse(data);
 const CLIENT_ID = clientInfo.clientId;
 const TOKEN = clientInfo.clientToken; 

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents:  [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
]});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

const Costume = require("./costume.js")

client.on('messageCreate', message =>{
    console.log(message.content);
    message.channel.send(message.author.username);
} )


client.login(TOKEN);

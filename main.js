const prompt = require('prompt-sync')(); //package for requesting user input
const fs = require('fs');
const CostumeManager = require("./costume-manager.js") //calls costume manager
const PartyManager = require("./party-manager.js"); //calls party manager
const defaultCostumes = require('./default-costumes.json'); //load default halloween costumes
const { REST, Routes, WebhookClient } = require('discord.js');

//set up bot token and id
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


//bot commands
const commands = [
  {
    name: 'wear_costume',
    description: 'put on your disguise!',
  },
  {
    name: 'start_party',
    description: 'start a party!',
  },
  {
    name: 'guess_player',
    description: 'expose someone!',
  },
  {
    name: 'candies',
    description: 'show how many candies you have in your basket!',
  },
];

//set up slash commands
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

//set up client
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

//event triggered when a command is used
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'wear_costume'){
    if(!CostumeManager.fetchCostume(interaction.user.id)){

      //code for setting up costume

    } else {

      const costume = CostumeManager.fetchCostume(interaction.user.id); // put on pre-saved costume
      await interaction.channel.createWebhook({
        name: costume.userCostumeName,
        avatar: costume.userCostumeURL,
      }).then(webhook => {
        webhook.send("hi");
      })

    }
  }
  if (interaction.commandName == 'start_party'){

    //code for party mechanism

  }
});

client.login(TOKEN);



//helper functions

//test if image url is valid
function testUrlImage(url){

}


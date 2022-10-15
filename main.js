// Libaries
require('dotenv').config(); // dotenv package for configuring environment variables
const prompt = require('prompt-sync')(); //package for requesting user input

const CostumeManager = require("./costume-manager.js"); //calls costume manager
const PartyManager = require("./party-manager.js"); //calls party manager
const defaultCostumes = require('./default-costumes.json'); //load default halloween costumes
const { REST, Routes, WebhookClient } = require('discord.js');

// Variables
const {BOT_ID, BOT_TOKEN} = process.env;

//set up bot token and id
if(!BOT_ID || !BOT_TOKEN) { //check if client information file exists
  return console.log("Create a file called .env and do BOT_TOKEN=token and on new line (no comma semi colon or anything), BOT_ID = id")
}

//bot commands
const commands = [
  {
    name: "choose_costume",
    description: "wear one of our default costumes!"
  },
  {
    name: 'build_costume',
    description: 'wear your own disguise!',
    options: [
      {
        name: "costume_name",
        description: "the name of your costume",
        type: 3,
        required: true,
      },
      {
        name: "avatar_url",
        description: "URL of your image",
        type: 3,
        required: true,
      },
    ],
    
  },
  {
    name: 'start_party',
    description: 'start a party!',
  },
  {
    name: 'join_party',
    description: 'join someone\'s party!',
  },
  {
    name: 'party_players',
    description: 'show all players in your party!',
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
const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);
(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(BOT_ID), { body: commands });
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
  
  if(interaction.commandName === 'choose_costume'){

    //code for choosing default costume
  }

  if (interaction.commandName === 'build_costume'){
    var name = interaction.options.data[0].value; 
    var url = interaction.options.data[1].value;
    // to add url image tester
    // to add name validator (has to be fewer than 32 characters)
    CostumeManager.wear(url, name, interaction.user.id);
    await interaction.reply({content: "You've put on your custom-made costume! Nice!", ephemeral: true})
  }


  if (interaction.commandName == 'start_party'){

    if(PartyManager.start(interaction.guildId, interaction.user.id) == false ) {
      await interaction.reply({content: "You are already in a party!"});
    }
    else{
      PartyManager.start(interaction.guildId, interaction.user.id);
      await interaction.reply({content: "You've started a party! Invite some friends!"});
    }
    
  }

  if(interaction.commandName == "join_party"){

    //code for joining parties

    //just as a demonstration of party manager: this code shows all the indexes of all the parties in a server 
    await interaction.reply({content: PartyManager.fetchServer(interaction.guildId).parties.map((x,y )=> y).join(" ")});
  }

});

client.login(BOT_TOKEN);



//helper functions

//test if image url is valid
function testUrlImage(url){

}

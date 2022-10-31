//import file system and path modules
const fs = require("node:fs");
const path = require("node:path");
//import the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
//import the token from the config.json
const { token } = require("./config.json");

//create new client instance
// Intents also define which events Discord should send to your bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});
console.log(token);
//load the command files on the startup
client.commands = new Collection();
//get the path of the command folder
const commandsPath = path.join(__dirname, "commands");
//read all the files into command files array
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  //get the single file path
  const filePath = path.join(commandsPath, file);
  //get the exported data in the file
  const command = require(filePath);
  // console.log(command);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}
//executing the commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

//login into the Discord with client's token
client.login(token);

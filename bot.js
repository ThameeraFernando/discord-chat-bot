//import the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");
//import the token from the config.json
const { token } = require("./config.json");

//create new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

//login into the Discord with client's token
client.login(token);

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong"),
  async execute(interaction) {
    console.log("hit the function");
    await interaction.reply("Pong!");
  },
};

const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("./ping");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("provide information about the user."),
  async execute(interaction) {
    await interaction.reply(
      // interaction.user is the object representing the User who ran the command
      // interaction.member is the GuildMember object, which represents the user in the specific guild
      `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}`
    );
  },
};

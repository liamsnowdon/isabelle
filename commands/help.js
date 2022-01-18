const { SlashCommandBuilder, inlineCode, userMention } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Information about the Isabelle Bot.'),

  async execute(interaction) {
    const user = userMention(interaction.user.id);

    await interaction.reply(`Hi, ${user}! My name is Isabelle and I'm a bot for ${interaction.guild.name}.\n\nI have the following commands:\n\n${inlineCode('/birthday <name>')} - replies with the birthday for the villager provided.\n${inlineCode('/island')} - replies with the island information`);
  },
};

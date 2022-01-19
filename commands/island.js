const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('island')
    .setDescription('Replies with island info!'),

  async execute(interaction) {
    await interaction.reply(`Island name: ${interaction.guild.name}\nTotal residents: ${interaction.guild.memberCount}`);
  },
};

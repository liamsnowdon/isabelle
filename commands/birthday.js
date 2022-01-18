const { SlashCommandBuilder } = require('@discordjs/builders');
const villagers = require('../data/villagers.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('birthday')
    .setDescription('Replies with birthday info for a villager.')
    .addStringOption((option) =>
      option.setName('name')
        .setDescription('The name of the villager')
        .setRequired(true)),

  async execute(interaction) {
    const name = interaction.options.getString('name');
    const villager = villagers.find(v => v.name['name-EUen'].toLowerCase() === name.toLowerCase());

    if (!villager) {
      await interaction.reply(`Hmmm... I can't seem to find a villager named "${name}", sorry!`);
    } else {
      await interaction.reply(`Let's see... ${villager.name['name-EUen']}'s birthday is ${villager['birthday-string']}.`);
    }
  },
};

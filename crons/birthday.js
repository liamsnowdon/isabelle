require('dotenv').config();

const { MessageEmbed } = require('discord.js');
const villagers = require('../data/villagers.json');

function createEmbed (villager) {
  const wikiUrl = `https://animalcrossing.fandom.com/wiki/${villager.name['name-EUen']}`;

  const exampleEmbed = new MessageEmbed()
    .setColor(villager['bubble-color'])
    .setTitle(`Happy Birthday, ${villager.name['name-EUen']}!`)
    .setDescription('Hope you have a great day!')
    .setThumbnail(villager.icon_uri)
    .addFields(
      { name: '\u200B', value: '\u200B' },
      { name: 'Wiki Page', value: wikiUrl },
      { name: '\u200B', value: '\u200B' },
      { name: 'Personality', value: villager.personality, inline: true },
      { name: 'Species', value: villager.species, inline: true },
      { name: 'Hobby', value: villager.hobby, inline: true },
    )
    .setImage(villager.image_uri);

  return exampleEmbed;
}

module.exports = {
  schedule: '40 * * * *',

  async execute (client) {
    const channel = client.channels.cache.get(process.env.CHANNEL_ID);

    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const birthday = `${day}/${month}`;

    const villager = villagers.find(v => v.birthday === birthday);

    if (villager) {
      const embed = createEmbed(villager);
      await channel.send({ embeds: [embed] });
    } else {
      await channel.send('No birthdays today.');
    }
  },
};

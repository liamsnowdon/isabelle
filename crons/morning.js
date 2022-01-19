/**
 * Cron: Morning
 *
 * This cron runs every morning and displays a nice morning message.
 */

require('dotenv').config();

const { MessageEmbed } = require('discord.js');
const villagers = require('../data/villagers.json');

/**
 * Creates birthday Discord MessageEmbeds from an array of villagers
 *
 * @param {Array} villagers - villagers with birthdays on the current date
 * @returns {Array}
 */
function createEmbeds (villagers) {
  const embeds = villagers.map((villager) => {
    const wikiUrl = `https://animalcrossing.fandom.com/wiki/${villager.name['name-EUen']}`;

    const embed = new MessageEmbed()
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

    return embed;
  });

  return embeds;
}

/**
 * Creates the string to use in the morning cron message
 *
 * @param {Array} villagers - villagers with birthdays on the current date
 * @returns {string}
 */
function createMessage (villagers) {
  const date = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[date.getDay()];

  let message = `Good morning, everyone! It's ${day}!`;

  // Day specific text
  message = appendDaySpecificText(message, day);

  // Villager birthday text
  message = appendBirthdayText(message, villagers);

  // Outro text
  message = message.concat(' That\'s all for now... have a great day everyone!');

  return message;
}

/**
 * Appends some day specific text to the message
 *
 * @param {string} message - message text
 * @param {string} day - current day
 * @returns {string}
 */
function appendDaySpecificText (message, day) {
  switch (day) {
    case 'Sunday':
      return message.concat(' Be sure to stop by Daisy Mae to pick up some turnips before 12PM; you\'ll find her wandering around the island.');
    case 'Friday':
      return message.concat(' K.K. Slider is performing all day outside the Resident Services building, lucky us! Don\'t forget to stop by, he might even be taking song requests!');
    default:
      return message;
  }
}

/**
 * Appends some birthday text to the message containing the names of the villager's who have their birthday on the current date.
 *
 * @param {string} message
 * @param {Array} villagers
 * @returns {string}
 */
function appendBirthdayText (message, villagers) {
  if (villagers.length === 0) {
    return message;
  }

  if (villagers.length > 1) {
    const names = villagers.map(villager => villager.name['name-EUen']).join(' and ');

    message = message.concat(` Today we're celebrating some people's birthdays! Everyone send their best wishes to ${names}!`);
  } else {
    const name = villagers[0].name['name-EUen'];

    message = message.concat(` Today we're celebrating ${name}'s birthday! Happy birthday, ${name}!`);
  }

  return message;
}

module.exports = {
  schedule: '0 9 * * *',

  async execute (client) {
    const channel = client.channels.cache.get(process.env.CHANNEL_ID);

    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const birthday = `${day}/${month}`;

    const filteredVillagers = villagers.filter(v => v.birthday === birthday);
    const content = createMessage(filteredVillagers);
    const embeds = createEmbeds(filteredVillagers);

    channel.send({
      content,
      embeds,
    });
  },
};

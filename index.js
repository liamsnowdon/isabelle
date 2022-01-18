require('dotenv').config();

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const nodeCron = require('node-cron');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const cronFiles = fs.readdirSync('./crons').filter(file => file.endsWith('.js'));

// Register commands
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.data.name, command);
}

// Register events
for (const file of eventFiles) {
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Register crons
for (const file of cronFiles) {
  const cron = require(`./crons/${file}`);

  nodeCron.schedule(cron.schedule, () => cron.execute(client));
}

// Login to Discord with your client's token
client.login(process.env.TOKEN);

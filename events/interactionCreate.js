require('dotenv').config();

module.exports = {
  name: 'interactionCreate',

  async execute (interaction) {
    if (Number(interaction.channelId) !== Number(process.env.CHANNEL_ID)) return;
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  },
};

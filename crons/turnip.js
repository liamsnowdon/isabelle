/**
 * Cron: Turnip Sale End
 *
 * This cron runs every Sunday at 12PM when you can no longer buy turnips.
 */

require('dotenv').config();

module.exports = {
  schedule: '* 12 * * Sunday',

  async execute (client) {
    const channel = client.channels.cache.get(process.env.CHANNEL_ID);

    channel.send('Daisy Mae has left the island! I hope you all got the opportunity to buy some turnips for the week! Keep an eye on the turnip prices at Nook\'s Cranny; you can get different prices in the morning and afternoon!');
  },
};

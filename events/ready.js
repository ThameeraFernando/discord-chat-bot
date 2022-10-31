const { Events } = require("discord.js");

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(c) {
    console.log(`Ready! Logged in as ${c.user.tag}`);
  },
};

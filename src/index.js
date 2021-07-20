const { Client } = require("discord.js");
const { token } = require("./config");
const alive = require("./../server")
const client = new Client();

require("./core/loadWidgetListeners")(client);

client.on('ready', () => {
  client.user.setPresence({
    status: 'idle',
    activity: {
        name: 'My Citizen',
        type: 'WATCHING',
        url: 'https://www.twitch.tv/kouma98'
    }
  })
});

client.login(token).catch((error) => {
  console.error(error);
  process.exit(1);
});



alive()
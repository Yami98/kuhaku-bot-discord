const CommandBuilder = require("../classes/CommandBuilder");

module.exports = new CommandBuilder()
  .setName("hello")
  .setAliases(["h"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  // eslint-disable-next-line no-unused-vars
  .setExecute(async (message, user, args) => {
    await message.channel.send("Hello~");
  });

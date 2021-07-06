const CommandBuilder = require("../classes/CommandBuilder");

module.exports = new CommandBuilder()
  .setName("pat")
  .setAliases(["p"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  // eslint-disable-next-line no-unused-vars
  .setExecute(async (message, user, args) => {
    await message.channel.send("Do you want pat?", {files: ["https://media.tenor.com/images/ad8357e58d35c1d63b570ab7e587f212/tenor.gif"]});
  });

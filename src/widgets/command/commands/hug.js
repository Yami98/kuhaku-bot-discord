const CommandBuilder = require("../classes/CommandBuilder");

module.exports = new CommandBuilder()
  .setName("hug")
  .setAliases(["hg"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  // eslint-disable-next-line no-unused-vars
  .setExecute(async (message, user, args) => {
    await message.channel.send("Come here, i will hug you~", {files: ["https://media.indiedb.com/cache/images/groups/1/25/24269/thumb_620x2000/ezgif.com-624b1ca218.gif"]});
  });

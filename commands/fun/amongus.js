const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sus")
    .setDescription("Replies with random things.")
    .setDMPermission(false),
  async execute(interaction, client) {
    const amogus = ["amogus", "amongus", "sus", "skibidi is better", "among us", "wawa better", "swagong better", "i am sigma"];
    const message = amogus[Math.floor(Math.random() * amogus.length)]

    interaction.reply(`${message}`)
  },
};

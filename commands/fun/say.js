const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { startTyping } = require("../../helpers/startTyping.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Bot says whatever the message is")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("What should the bot say?")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reply")
      .setDescription("Who should the bot reply to?")
    ),
  async execute(interaction, client) {
    const { guild, options, channel } = interaction;
    const text = options.getString("text");
    const role = guild.roles.cache.get("1202138500598865950");

    const messagelink = options.getString("reply");

    if (messagelink) {
      const badEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("Invalid ID/Link...make sure you put the correct [messagelink](https://www.droplet.gg/docs/what-is-a-message-link-and-how-to-get-one/)");

      const messageId = (messagelink.match(/\d{10,}/g) || []).pop();
      if (!messageId)
        return interaction.reply({ embeds: [badEmbed], ephemeral: true });

      const replyMessage = await channel.messages.fetch(messageId);
      await replyMessage.reply(text);
    }

    const permissionEmbed = new EmbedBuilder()
      .setColor("Red")
      .setDescription(
        "You need to have `Those Guys` role in order to execute this Command."
      );
    if (!interaction.member.roles.cache.has(role.id))
      return interaction.reply({ embeds: [permissionEmbed], ephemeral: true });

    if (!messagelink) {
      startTyping(channel);
      setTimeout(async () => {
        await channel.send({ content: `${text}` });
      }, 1000);
    }
  },
};
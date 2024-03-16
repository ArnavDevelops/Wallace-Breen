//Imports
const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
require("dotenv").config()
const guildId = process.env.guildId

// Reaction role
module.exports = {
    //name: Events.ClientReady,
    //once: true,
    async execute(client) {
        const guild = client.guilds.cache.get(guildId);
        const channel = guild.channels.cache.get("1216894438337544312");

        const loreButton = new ButtonBuilder()
            .setEmoji("📁")
            .setStyle(ButtonStyle.Primary)
            .setCustomId("lore")
        const row = new ActionRowBuilder().addComponents(loreButton);

        const embed = new EmbedBuilder()
            .setTitle("Reaction Roles")
            .setDescription("Get the Roles you need!")
            .addFields(
                {
                    name: "📁 Lore Ping",
                    value: "Get notified when new lore drops or when the document gets updated!"
                }
            )
            .setColor("Aqua")
        channel.send({ embeds: [embed], components: [row] })
    }
}
//Imports
const { EmbedBuilder, ChatInputCommandInteraction, Events } = require("discord.js");
const guildId = process.env.guildId

//Interaction Create event
module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    const guild = client.guilds.cache.get(guildId);

    if(interaction.customId === "lore") {
        const role = guild.roles.cache.get('1216895398753468427');        

        if(interaction.member.roles.cache.has(role.id)) {
          interaction.member.roles.remove(role)
          interaction.reply({ content: `Successfully removed \`${role.name}\``, ephemeral:  true})
        } else {
          interaction.member.roles.add(role)
          interaction.reply({ content: `Successfully added \`${role.name}\``, ephemeral:  true})
        }
    }
  }
}
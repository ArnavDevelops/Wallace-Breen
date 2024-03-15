//Imports
const { EmbedBuilder, Events } = require("discord.js");
require("dotenv").config();
const guildId = process.env.guildId

//GuildMemberAdd event
module.exports = {
  name: Events.GuildMemberAdd,
    /**
  * @param {GuildMember} member
  * @param {Client} client
  */
  async execute(member, client) {
    //Misc
    if (member.user.bot) return;
    const guild = client.guilds.cache.get(guildId);

    //Channel
    const channel = guild.channels.cache.get("1217072239439122453");
    if (!channel) return;

    //Role IDs
    const role = [
      "1202138132208947280",
    ];

    //PSF
    if(member.guild.id === guild.id) {
      await member.roles.add(role)
      const msg = await channel.send(`Welcome <@${member.user.id}>. We hope you enjoy your stay.`)
      try {
        await msg.react("<:blob_cozy_coffee:1218075432188903424>")
      } catch(err) {
        console.error(err)
      }
    }
  }
};
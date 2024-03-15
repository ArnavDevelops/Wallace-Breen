//Imports
const { ActivityType, Events } = require("discord.js");
const { logMessage } = require("../../helpers/logging.js");
require("dotenv").config()
const guildId = process.env.guildId

//Ready event
module.exports = {
  name: Events.ClientReady,
  once: true,
  /**
  * @param {Client} client
  */
  async execute(client) {
    const guild = client.guilds.cache.get(guildId);

    //Status | Array
    const statusArray = [
      {
        type: ActivityType.Playing,
        content: "Warfare Tycoon",
      },
      {
        type: ActivityType.Watching,
        content: `Over ${guild.memberCount} members in Proelia Archives!`,
      },
      {
        type: ActivityType.Listening,
        content: `Proelia Radio`,
      },
      {
        type: ActivityType.Competing,
        content: `Faction wars`,
      },
    ];

    //Status | Main function
    async function pickPresence() {
      const option = Math.floor(Math.random() * statusArray.length);
      try {
        await client.user.setPresence({
          activities: [
            {
              name: statusArray[option].content,
              type: statusArray[option].type,
            },
          ],
        });
      } catch (error) {
        return;
      }
    }
    setInterval(pickPresence, 8 * 1000);

    //Bot startup
    logMessage(`${client.user.username} is now in the Citadel!`, "INFO");
  },
};

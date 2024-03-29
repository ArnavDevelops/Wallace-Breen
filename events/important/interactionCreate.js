//Imports
const { EmbedBuilder, ChatInputCommandInteraction, Events } = require("discord.js");

//Interaction Create event
module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    //Application Commands
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error)
      }
    }

    //Buttons
    else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error("There is no code for this button");

      try {
        await button.execute(interaction, client);
      } catch (err) {
        console.log(err);
      }
    }

    //Context menus
    else if (interaction.isContextMenuCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const contextCommand = commands.get(commandName);
      if (!contextCommand) return;

      try {
        await contextCommand.execute(interaction, client);
      } catch (error) {
        console.error(error);
        const commandErrorEmbed = new EmbedBuilder()
          .setColor(`Red`)
          .setDescription(
            "***:warning: Something went wrong while executing this context menu***"
          );
        await interaction.reply({
          embeds: [commandErrorEmbed],
          ephemeral: true,
        });
      }
    }
  },
};

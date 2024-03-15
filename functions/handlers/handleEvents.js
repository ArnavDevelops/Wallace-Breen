//Imports
const { readdirSync } = require("fs");

//Event handler
module.exports = (client) => {
  client.handleEvents = async () => {
    const eventFolders = readdirSync("./events");
    for (const folder of eventFolders) {
      const eventFiles = readdirSync(`./events/${folder}`).filter((file) =>
        file.endsWith(`js`)
      );
      switch (folder) {
        //Main folder
        case "important":
          for (const file of eventFiles) {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once)
              client.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            else
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
          }
          break;
      }
    }
  };
};
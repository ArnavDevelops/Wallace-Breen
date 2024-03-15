console.clear();

//A.1: Imports
const process = require(`node:process`);
require("dotenv").config();
const mongoToken = process.env.mongoToken;
const Token = process.env.Token;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { readdirSync } = require("fs");
const { logMessage } = require("./helpers/logging.js");
const { 
    DefaultWebSocketManagerOptions: { 
        identifyProperties 
    } 
} = require("@discordjs/ws");
console.log();

//A.2: Client
const client = new Client({
    intents: Object.values(GatewayIntentBits).reduce((a, b) => a | b, 0),
    ws: identifyProperties.browser = "Discord Android",
});
client.commands = new Collection();
client.commandArray = [];
client.buttons = new Collection();
client.selectMenus = new Collection();

//B.2: Functions folder
const functionFolders = readdirSync(`./functions`);
for (const folder of functionFolders) {
    const functionFolders = readdirSync(`./functions/${folder}`).filter((file) =>
    file.endsWith(".js")
    );
    for (const file of functionFolders)
        try {
        require(`./functions/${folder}/${file}`)(client);
    } catch (err) {
        return;
    }
}

// ===============================================
// C: Error handling
// ===============================================

//C.1: UnhandledRejection
process.on("unhandledRejection", (err) => {
    console.error(err.stack);
});

//C.2: UncaughtException
process.on("uncaughtException", (err) => {
    console.error(err.stack);
});

// ===============================================
// D: Startup
// ===============================================
client.handleEvents();
client.handleCommands();

//D.1: Bot start-up
logMessage(`Initializing Command and Event handlers...`, "INFO");
client.login(Token);

//Process exit
process.on("exit", (code) => {
    console.log(`Process exited with code ${code}`);
    mongoose.connection.close();
});

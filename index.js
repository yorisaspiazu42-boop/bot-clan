require("./server");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const {
    Client,
    Collection,
    GatewayIntentBits
} = require("discord.js");

const logger = require("./utils/logger");
const cargarBotones = require("./buttons");

const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,

        GatewayIntentBits.GuildMembers,

        GatewayIntentBits.GuildMessages,

        GatewayIntentBits.MessageContent

    ]

});

// Colección de comandos
client.commands = new Collection();



// ===============================
// CARGAR COMANDOS
// ===============================

const commandsPath = path.join(__dirname, "commands");

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(path.join(commandsPath, file));

    if ("data" in command && "execute" in command) {

        client.commands.set(command.data.name, command);

        logger.info(`Comando cargado: ${command.data.name}`);

    }

}



// ===============================
// CARGAR EVENTOS
// ===============================

const eventsPath = path.join(__dirname, "events");

const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {

    const event = require(path.join(eventsPath, file));

    if (event.once) {

        client.once(event.name, (...args) => event.execute(...args));

    } else {

        client.on(event.name, (...args) => event.execute(...args));

    }

}


// ===============================
// CARGAR BOTONES
// ===============================

cargarBotones(client);

// ===============================
// LOGIN
// ===============================

client.login(process.env.TOKEN)
    .catch(error => {

        logger.error(error);

    });
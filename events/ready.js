const logger = require("../utils/logger");
const config = require("../config");
const publicarPanel = require("../utils/publicarPanel");
module.exports = {
    name: "clientReady",
    once: true,

    async execute(client) {

        logger.success(`${config.BOT.NOMBRE} iniciado correctamente.`);

        console.log("========================================");
        console.log(`🤖 Bot: ${client.user.tag}`);
        console.log(`🆔 ID: ${client.user.id}`);
        console.log(`📦 Versión: ${config.BOT.VERSION}`);
        console.log(`👨‍💻 Desarrollador: ${config.BOT.DESARROLLADOR}`);
        console.log(`🌐 Servidores: ${client.guilds.cache.size}`);
        console.log("========================================");

        client.user.setPresence({
            activities: [
                {
                    name: "las solicitudes del clan",
                    type: 3
                }
            ],
            status: "online"
        });

        await publicarPanel(client);

    }
};
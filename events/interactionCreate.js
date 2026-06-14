const logger = require("../utils/logger");

module.exports = {
    name: "interactionCreate",

    async execute(interaction) {

        try {

            // ===========================
            // COMANDOS
            // ===========================
            if (interaction.isChatInputCommand()) {

                const command = interaction.client.commands.get(interaction.commandName);

                if (!command) return;

                return await command.execute(interaction);

            }

            // ===========================
            // BOTONES
            // ===========================
            if (interaction.isButton()) {

                const button = interaction.client.buttons.get(interaction.customId);

                if (!button) return;

                return await button.execute(interaction);

            }

            // ===========================
            // MODALES
            // ===========================
            if (interaction.isModalSubmit()) {

                // Aquí irá el modal de /solicitud
                return;

            }

        } catch (error) {

            logger.error(error.stack);

            if (interaction.deferred || interaction.replied) {

                await interaction.editReply({
                    content: "❌ Ocurrió un error."
                }).catch(() => {});

            } else {

                await interaction.reply({
                    content: "❌ Ocurrió un error.",
                    ephemeral: true
                }).catch(() => {});

            }

        }

    }

};
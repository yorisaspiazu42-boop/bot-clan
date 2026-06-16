const logger = require("../utils/logger");
const config = require("../config");
const embeds = require("../utils/embeds");

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

                if (interaction.customId !== "modalSolicitud") return;

                const idJugador = interaction.fields.getTextInputValue("idJugador");
                const rango = interaction.fields.getTextInputValue("rangoJugador");
                const modo = interaction.fields.getTextInputValue("modoJuego");

                const canal = interaction.guild.channels.cache.get(
                    config.CANALES.SOLICITUDES
                );

                if (!canal) {

                    return interaction.reply({

                        content: "❌ No se encontró el canal de solicitudes.",

                        ephemeral: true

                    });

                }

                await canal.send({

                    embeds: [

                        embeds.nuevaSolicitud(

                            interaction.user,

                            idJugador,

                            rango,

                            modo

                        )

                    ]

                });

                return interaction.reply({

                    content: "✅ Tu solicitud fue enviada correctamente.",

                    ephemeral: true

                });

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
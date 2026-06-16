const config = require("../config");
const embeds = require("../utils/embeds");
const helpers = require("../utils/helpers");

module.exports = {

    customId: "rechazar",

    async execute(interaction) {

        // Solo Evaluadores (5 estrellas)
        if (!interaction.member.roles.cache.has(config.ROLES.EVALUADOR)) {

            return interaction.reply({
                content: "❌ Solo los evaluadores de 5⭐ pueden rechazar solicitudes.",
                ephemeral: true
            });

        }

        const usuarioId = interaction.channel.topic;

        if (!usuarioId) {

            return interaction.reply({
                content: "❌ No se pudo identificar al jugador.",
                ephemeral: true
            });

        }

        const miembro = await helpers.obtenerMiembro(
            interaction.guild,
            usuarioId
        );

        if (!miembro) {

            return interaction.reply({
                content: "❌ El jugador ya no está en el servidor.",
                ephemeral: true
            });

        }

        await interaction.update({

            embeds: [

                embeds.rechazado(
                    miembro.user,
                    interaction.user
                )

            ],

            components: []

        });

        await helpers.eliminarCanal(interaction.channel);

    }

};
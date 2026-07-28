const config = require("../config");
const embeds = require("../utils/embeds");
const helpers = require("../utils/helpers");

module.exports = {

    customId: "aprobar",

    async execute(interaction) {

        // Solo Evaluadores (5 estrellas)
        if (!interaction.member.roles.cache.has(config.ROLES.EVALUADOR)) {

            return interaction.reply({
                content: "❌ Solo los evaluadores de 5⭐ pueden aprobar solicitudes.",
                flags: 64
            });

        }

        const usuarioId = interaction.channel.topic;

        if (!usuarioId) {

            return interaction.reply({
                content: "❌ No se pudo identificar al jugador.",
                flags: 64
            });

        }

        const miembro = await helpers.obtenerMiembro(
            interaction.guild,
            usuarioId
        );

        if (!miembro) {

            return interaction.reply({
                content: "❌ El jugador ya no está en el servidor.",
                flags: 64
            });

        }

        try {

            // Dar rol ★★★ Integrante del clan
            await miembro.roles.add(config.ROLES.INTEGRANTE);

            console.log(`✅ Rol ★★★ dado a ${miembro.user.tag}`);

        } catch (error) {

            console.error("❌ Error al asignar el rol:", error);

            return interaction.reply({
                content: "❌ No pude asignar el rol. Revisa los permisos del bot.",
                flags: 64
            });

        }

        await interaction.update({

            embeds: [

                embeds.aprobado(
                    miembro.user,
                    interaction.user
                )

            ],

            components: []

        });

        await helpers.eliminarCanal(interaction.channel);

    }

};
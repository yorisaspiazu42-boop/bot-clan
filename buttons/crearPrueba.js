const config = require("../config");
const crearCanalPrueba = require("../utils/crearCanalPrueba");

module.exports = {

    customId: "crearPrueba",

    async execute(interaction) {

        // Solo Evaluadores
        if (!interaction.member.roles.cache.has(config.ROLES.EVALUADOR)) {

            return interaction.reply({
                content: "❌ Solo los evaluadores de 5⭐ pueden crear una prueba.",
                ephemeral: true
            });

        }

        const usuarioId = interaction.customId.split("_")[1];

        const usuario = await interaction.guild.members.fetch(usuarioId).catch(() => null);

        if (!usuario) {

            return interaction.reply({
                content: "❌ No se encontró al jugador.",
                ephemeral: true
            });

        }

        const resultado = await crearCanalPrueba(

            interaction.guild,
            usuario,
            interaction.user

        );

        if (!resultado.ok) {

            return interaction.reply({

                content: resultado.mensaje,

                ephemeral: true

            });

        }

        await interaction.update({

            components: []

        });

        await interaction.followUp({

            content: `✅ Canal creado correctamente: ${resultado.canal}`,

            ephemeral: true

        });

    }

};